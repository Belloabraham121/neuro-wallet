import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import {
  TransactionService,
  CreateTransactionData,
  TransactionResponse,
} from "../services/transactionService";
import { WalletService } from "../services/walletService";
import { logger } from "../config/logger";

export class TransactionController {
  /**
   * Create a new STX transfer transaction
   */
  static async createSTXTransfer(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          error: {
            message: "Validation failed",
            code: "VALIDATION_ERROR",
            details: errors.array(),
          },
        });
      }

      const { fromWalletId, toAddress, amount, memo } = req.body;
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({
          success: false,
          error: {
            message: "User not authenticated",
            code: "UNAUTHORIZED",
          },
        });
      }

      const data: CreateTransactionData = {
        fromWalletId,
        toAddress,
        amount,
        memo,
        userId,
      };

      // Create and sign transaction
      const { transaction, txId, wallet } =
        await TransactionService.createAndSignSTXTransfer(data);

      // Broadcast transaction
      const transactionResult = await TransactionService.broadcastSTXTransfer(
        transaction,
        txId,
        { ...data, wallet }
      );

      logger.info(`STX transfer transaction created and broadcasted: ${txId}`);

      return res.status(201).json({
        success: true,
        data: transactionResult,
      });
    } catch (error: any) {
      logger.error("STX transfer creation failed:", error);
      if (error.message.startsWith("WALLET_NOT_FOUND")) {
        return res.status(404).json({
          success: false,
          error: {
            message: "Wallet not found",
            code: "WALLET_NOT_FOUND",
          },
        });
      }
      if (error.message.startsWith("BROADCAST_FAILED")) {
        return res.status(500).json({
          success: false,
          error: {
            message: "Failed to broadcast transaction",
            code: "BROADCAST_FAILED",
          },
        });
      }
      return next(error);
    }
  }

  /**
   * Get all transactions for the authenticated user
   */
  static async getUserTransactions(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({
          success: false,
          error: {
            message: "User not authenticated",
            code: "UNAUTHORIZED",
          },
        });
      }

      const transactions: TransactionResponse[] =
        await TransactionService.getUserTransactions(userId);

      return res.status(200).json({
        success: true,
        data: {
          transactions,
          count: transactions.length,
        },
      });
    } catch (error: any) {
      logger.error("Failed to get user transactions:", error);
      return next(error);
    }
  }

  /**
   * Get a specific transaction by ID
   */
  static async getTransactionById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({
          success: false,
          error: {
            message: "User not authenticated",
            code: "UNAUTHORIZED",
          },
        });
      }

      // Use the dedicated method if available, otherwise fallback to getUserTransactions
      const transaction = await TransactionService.getTransactionById(
        id,
        userId
      );

      if (!transaction) {
        return res.status(404).json({
          success: false,
          error: {
            message: "Transaction not found",
            code: "TRANSACTION_NOT_FOUND",
          },
        });
      }

      return res.status(200).json({
        success: true,
        data: transaction,
      });
    } catch (error: any) {
      logger.error("Failed to get transaction:", error);
      return next(error);
    }
  }

  /**
   * Update transaction status (e.g., after confirmation)
   */
  static async updateTransactionStatus(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const { status } = req.body; // 'confirmed' or 'failed'
      const userId = req.user?.id;

      if (!userId || !["confirmed", "failed"].includes(status)) {
        return res.status(400).json({
          success: false,
          error: {
            message: "Invalid request",
            code: "INVALID_REQUEST",
          },
        });
      }

      // Map to uppercase enum
      const dbStatus =
        status === "confirmed" ? "CONFIRMED" : ("FAILED" as const);

      // Fetch transaction by database ID with ownership check
      const dbTransaction = await TransactionService.getTransactionById(
        id,
        userId
      );

      if (!dbTransaction) {
        return res.status(404).json({
          success: false,
          error: {
            message: "Transaction not found",
            code: "TRANSACTION_NOT_FOUND",
          },
        });
      }

      if (!dbTransaction.txId) {
        return res.status(400).json({
          success: false,
          error: {
            message: "Transaction has no blockchain txId",
            code: "NO_TXID",
          },
        });
      }

      await TransactionService.updateTransactionStatus(
        dbTransaction.txId,
        dbStatus
      );

      return res.status(200).json({
        success: true,
        message: `Transaction status updated to ${status}`,
      });
    } catch (error: any) {
      logger.error("Failed to update transaction status:", error);
      return next(error);
    }
  }
}
