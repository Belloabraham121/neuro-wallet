"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionService = void 0;
const index_1 = require("../index");
const client_1 = require("@prisma/client");
const logger_1 = require("../config/logger");
const walletService_1 = require("./walletService");
const transactions_1 = require("@stacks/transactions");
const encoding_1 = require("@stacks/encoding");
class TransactionService {
    static async createAndSignSTXTransfer(data) {
        const { fromWalletId, toAddress, amount, memo, userId } = data;
        const wallet = await walletService_1.WalletService.getWalletById(fromWalletId, userId);
        if (!wallet) {
            throw new Error('WALLET_NOT_FOUND');
        }
        const privateKey = await TransactionService.decryptPrivateKey(wallet.encryptedPrivateKey, userId);
        const senderKey = privateKey;
        const amountMicroBigInt = BigInt(amount) * 1000000n;
        const amountMicro = amountMicroBigInt.toString();
        const nonce = await TransactionService.getNextNonce(wallet.address);
        const fee = new transactions_1.Uint128(1000n);
        const transaction = await (0, transactions_1.createSTXTokenTransfer)({
            recipient: toAddress,
            amount: new transactions_1.Uint128(amountMicroBigInt),
            senderKey,
            nonce,
            fee,
            memo: memo ? (0, encoding_1.utf8ToBytes)(memo) : undefined,
            postConditionMode: transactions_1.PostConditionMode.AllowMode,
            postConditions: [
                (0, transactions_1.makeSTXFungiblePostCondition)(wallet.address, transactions_1.FungibleConditionCode.GreaterEqual, new transactions_1.Uint128(amountMicroBigInt)),
            ],
            sponsored: false,
            network: new transactions_1.StacksMainnet(),
            version: transactions_1.TransactionVersion.Mainnet,
        });
        const txId = transaction.txid();
        return { transaction, txId, wallet };
    }
    static async broadcastSTXTransfer(transaction, txId, data) {
        const { fromWalletId, toAddress, amount, memo, userId, wallet } = data;
        const amountMicroBigInt = BigInt(amount) * 1000000n;
        const amountMicro = amountMicroBigInt.toString();
        try {
            const dbTransaction = await index_1.prisma.transaction.create({
                data: {
                    txId: null,
                    type: 'STX_TRANSFER',
                    fromAddress: wallet.address,
                    toAddress,
                    amount: amountMicro,
                    status: client_1.TransactionStatus.PENDING,
                    memo,
                    walletId: fromWalletId,
                },
            });
            const broadcastResult = await (0, transactions_1.broadcastTransaction)(transaction, new transactions_1.StacksMainnet());
            if (broadcastResult.error) {
                await index_1.prisma.transaction.update({
                    where: { id: dbTransaction.id },
                    data: { status: client_1.TransactionStatus.FAILED },
                });
                logger_1.logger.error(`Broadcast failed: ${broadcastResult.error}`);
                throw new Error(`BROADCAST_FAILED: ${broadcastResult.error}`);
            }
            await index_1.prisma.transaction.update({
                where: { id: dbTransaction.id },
                data: { txId },
            });
            logger_1.logger.info(`Transaction broadcasted: ${txId}`);
            return {
                id: dbTransaction.id,
                txId,
                type: dbTransaction.type,
                fromAddress: dbTransaction.fromAddress,
                toAddress: dbTransaction.toAddress,
                amount: dbTransaction.amount,
                status: dbTransaction.status,
                memo: dbTransaction.memo ?? undefined,
                createdAt: dbTransaction.createdAt,
            };
        }
        catch (error) {
            const errMsg = error instanceof Error ? error.message : String(error);
            logger_1.logger.error('Broadcast failed:', error);
            throw new Error(`BROADCAST_FAILED: ${errMsg}`);
        }
    }
    static async getNextNonce(address) {
        return 0;
    }
    static async decryptPrivateKey(encryptedKey, userId) {
        return encryptedKey.replace(/encrypted:/, '');
    }
    static async getUserTransactions(userId) {
        const transactions = await index_1.prisma.transaction.findMany({
            where: {
                wallet: { userId }
            },
            orderBy: { createdAt: 'desc' },
        });
        return transactions.map(tx => ({
            id: tx.id,
            txId: tx.txId,
            fromAddress: tx.fromAddress,
            toAddress: tx.toAddress,
            amount: tx.amount,
            type: tx.type,
            status: tx.status,
            memo: tx.memo ?? undefined,
            createdAt: tx.createdAt,
        }));
    }
    static async updateTransactionStatus(txId, status) {
        const dbStatus = status;
        const updated = await index_1.prisma.transaction.updateMany({
            where: { txId },
            data: { status: dbStatus },
        });
        if (updated.count > 0) {
            if (status === 'CONFIRMED') {
                logger_1.logger.info(`Transaction ${txId} confirmed`);
            }
            else {
                logger_1.logger.warn(`Transaction ${txId} failed`);
            }
        }
        return dbStatus;
    }
}
exports.TransactionService = TransactionService;
exports.default = TransactionService;
//# sourceMappingURL=transactionService.js.map