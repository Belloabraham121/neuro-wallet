import { prisma } from "../index";
import { TransactionStatus, TransactionType } from "@prisma/client";
import { logger } from "../config/logger";
import { WalletService } from "./walletService";
import {
  makeSTXTokenTransfer,
  broadcastTransaction,
  StacksTransaction,
} from "@stacks/transactions";
import { StacksMainnet } from "@stacks/network";

export interface CreateTransactionData {
  fromWalletId: string;
  toAddress: string;
  amount: number; // in STX
  memo?: string;
  userId: string;
}

export interface TransactionResponse {
  id: string;
  walletId: string;
  fromWalletId: string;
  txId: string | null;
  fromAddress: string | null;
  toAddress: string | null;
  amount: string | null;
  type: TransactionType;
  status: TransactionStatus;
  memo?: string;
  createdAt: Date;
}

export class TransactionService {
  /**
   * Create, sign, and prepare a STX transfer transaction
   */
  static async createAndSignSTXTransfer(
    data: CreateTransactionData
  ): Promise<{ transaction: StacksTransaction; txId: string; wallet: any }> {
    const { fromWalletId, toAddress, amount, memo, userId } = data;

    // Get wallet
    const wallet = await WalletService.getWalletById(fromWalletId, userId);
    if (!wallet) {
      throw new Error("WALLET_NOT_FOUND");
    }

    // Decrypt private key (implement proper decryption)
    const privateKey = await WalletService.getWalletPrivateKey(
      fromWalletId,
      userId
    );
    const senderKey = privateKey; // hex string

    const amountMicroBigInt = BigInt(amount) * 1000000n;
    const nonce = await TransactionService.getNextNonce(wallet.address);
    const fee = 1000n; // 1000 microSTX fee

    // Create transaction
    const transaction: StacksTransaction = await makeSTXTokenTransfer({
      recipient: toAddress,
      amount: amountMicroBigInt, // Use BigInt directly, not uintCV
      senderKey, // Use the hex string directly
      nonce,
      anchorMode: 3,
      fee,
      memo: memo || undefined, // Use string directly, not encoded bytes
      sponsored: false,
      network: new StacksMainnet(),
    });

    const txId = transaction.txid();

    return { transaction, txId, wallet };
  }

  /**
   * Broadcast signed transaction
   */
  static async broadcastSTXTransfer(
    transaction: StacksTransaction,
    txId: string,
    data: CreateTransactionData & { wallet: any }
  ): Promise<TransactionResponse> {
    const { fromWalletId, toAddress, amount, memo, userId, wallet } = data;

    const amountMicroBigInt = BigInt(amount) * 1000000n;
    const amountMicro = amountMicroBigInt.toString();

    try {
      // Create pending transaction first
      const dbTransaction = await prisma.transaction.create({
        data: {
          txId: null,
          type: "STX_TRANSFER" as TransactionType,
          recipient: toAddress,
          amount: amountMicro,
          status: TransactionStatus.PENDING,
          walletId: fromWalletId,
        },
      });

      const broadcastResult = await broadcastTransaction(
        transaction,
        new StacksMainnet()
      );

      if (broadcastResult.error) {
        await prisma.transaction.update({
          where: { id: dbTransaction.id },
          data: { status: TransactionStatus.FAILED },
        });
        logger.error(`Broadcast failed: ${broadcastResult.error}`);
        throw new Error(`BROADCAST_FAILED: ${broadcastResult.error}`);
      }

      // Update with txId
      await prisma.transaction.update({
        where: { id: dbTransaction.id },
        data: { txId },
      });

      logger.info(`Transaction broadcasted: ${txId}`);
      return {
        id: dbTransaction.id,
        walletId: dbTransaction.walletId,
        fromWalletId: dbTransaction.walletId,
        txId,
        type: dbTransaction.type,
        fromAddress: wallet.address,
        toAddress: dbTransaction.recipient,
        amount: dbTransaction.amount,
        status: dbTransaction.status,
        memo: undefined,
        createdAt: dbTransaction.createdAt,
      };
    } catch (error: unknown) {
      const errMsg = error instanceof Error ? error.message : String(error);
      logger.error("Broadcast failed:", error);
      throw new Error(`BROADCAST_FAILED: ${errMsg}`);
    }
  }

  /**
   * Get next nonce for address (placeholder - implement with API call)
   */
  static async getNextNonce(address: string): Promise<number> {
    const apiUrl = `https://stacks-node-api.mainnet.stacks.co/v2/accounts/${address}`;
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch nonce: ${response.statusText}`);
      }
      const data = await response.json();
      return Number(data.nonce);
    } catch (error) {
      logger.error(`Error fetching nonce for ${address}:`, error);
      throw new Error(
        `NONCE_FETCH_FAILED: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  }

  /**
   * Get user transactions
   */
  static async getUserTransactions(
    userId: string
  ): Promise<TransactionResponse[]> {
    const transactions = await prisma.transaction.findMany({
      where: {
        wallet: { userId },
      },
      include: { wallet: true },
      orderBy: { createdAt: "desc" },
    });

    return transactions.map((tx) => ({
      id: tx.id,
      walletId: tx.walletId,
      fromWalletId: tx.walletId,
      txId: tx.txId,
      fromAddress: tx.wallet.address,
      toAddress: tx.recipient,
      amount: tx.amount,
      type: tx.type,
      status: tx.status,
      memo: undefined,
      createdAt: tx.createdAt,
    }));
  }

  /**
   * Update transaction status (for confirmation polling)
   */
  static async updateTransactionStatus(
    txId: string,
    status: "CONFIRMED" | "FAILED"
  ): Promise<TransactionStatus> {
    const dbStatus = status as TransactionStatus;
    const updated = await prisma.transaction.updateMany({
      where: { txId },
      data: { status: dbStatus },
    });

    if (updated.count > 0) {
      if (status === "CONFIRMED") {
        logger.info(`Transaction ${txId} confirmed`);
      } else {
        logger.warn(`Transaction ${txId} failed`);
      }
    }

    return dbStatus;
  }

  /**
   * Check transaction status on Stacks chain and update database
   */
  static async checkTransactionStatus(
    txId: string
  ): Promise<TransactionStatus> {
    const apiUrl = `https://stacks-node-api.mainnet.stacks.co/v2/tx/${txId}`;
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch tx status: ${response.statusText}`);
      }
      const txData = await response.json();

      let status: TransactionStatus;
      if (txData.tx_status === "success") {
        status = TransactionStatus.CONFIRMED;
      } else if (
        txData.tx_status === "abort_by_response" ||
        txData.tx_status === "abort_by_post_condition"
      ) {
        status = TransactionStatus.FAILED;
      } else {
        status = TransactionStatus.PENDING;
      }

      if (status !== TransactionStatus.PENDING) {
        await TransactionService.updateTransactionStatus(
          txId,
          status === TransactionStatus.CONFIRMED ? "CONFIRMED" : "FAILED"
        );
      }

      logger.info(`Transaction ${txId} status: ${txData.tx_status}`);
      return status;
    } catch (error) {
      logger.error(`Error checking status for ${txId}:`, error);
      throw new Error(
        `STATUS_CHECK_FAILED: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  }

  /**
   * Get transaction by database ID
   */
  static async getTransactionById(
    id: string,
    userId: string
  ): Promise<TransactionResponse | null> {
    const transaction = await prisma.transaction.findUnique({
      where: { id },
      include: { wallet: true },
    });

    if (!transaction || transaction.wallet.userId !== userId) {
      return null;
    }

    return {
      id: transaction.id,
      walletId: transaction.walletId,
      fromWalletId: transaction.walletId,
      txId: transaction.txId,
      fromAddress: transaction.wallet.address,
      toAddress: transaction.recipient,
      amount: transaction.amount,
      type: transaction.type,
      status: transaction.status,
      memo: undefined,
      createdAt: transaction.createdAt,
    };
  }
}

export default TransactionService;
