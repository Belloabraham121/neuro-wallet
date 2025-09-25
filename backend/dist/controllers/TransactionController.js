"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionController = void 0;
const express_validator_1 = require("express-validator");
const transactionService_1 = require("../services/transactionService");
const logger_1 = require("../config/logger");
class TransactionController {
    static async createSTXTransfer(req, res, next) {
        try {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    error: {
                        message: 'Validation failed',
                        code: 'VALIDATION_ERROR',
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
                        message: 'User not authenticated',
                        code: 'UNAUTHORIZED',
                    },
                });
            }
            const data = {
                fromWalletId,
                toAddress,
                amount,
                memo,
                userId,
            };
            const { serializedTx, txId, wallet } = await transactionService_1.TransactionService.createAndSignSTXTransfer(data);
            const transaction = await transactionService_1.TransactionService.broadcastSTXTransfer(serializedTx, txId, { ...data, wallet });
            logger_1.logger.info(`STX transfer transaction created and broadcasted: ${txId}`);
            return res.status(201).json({
                success: true,
                data: transaction,
            });
        }
        catch (error) {
            logger_1.logger.error('STX transfer creation failed:', error);
            if (error.message.startsWith('WALLET_NOT_FOUND')) {
                return res.status(404).json({
                    success: false,
                    error: {
                        message: 'Wallet not found',
                        code: 'WALLET_NOT_FOUND',
                    },
                });
            }
            if (error.message.startsWith('BROADCAST_FAILED')) {
                return res.status(500).json({
                    success: false,
                    error: {
                        message: 'Failed to broadcast transaction',
                        code: 'BROADCAST_FAILED',
                    },
                });
            }
            return next(error);
        }
    }
    static async getUserTransactions(req, res, next) {
        try {
            const userId = req.user?.id;
            if (!userId) {
                return res.status(401).json({
                    success: false,
                    error: {
                        message: 'User not authenticated',
                        code: 'UNAUTHORIZED',
                    },
                });
            }
            const transactions = await transactionService_1.TransactionService.getUserTransactions(userId);
            return res.status(200).json({
                success: true,
                data: {
                    transactions,
                    count: transactions.length,
                },
            });
        }
        catch (error) {
            logger_1.logger.error('Failed to get user transactions:', error);
            return next(error);
        }
    }
    static async getTransactionById(req, res, next) {
        try {
            const { id } = req.params;
            const userId = req.user?.id;
            if (!userId) {
                return res.status(401).json({
                    success: false,
                    error: {
                        message: 'User not authenticated',
                        code: 'UNAUTHORIZED',
                    },
                });
            }
            const transactions = await transactionService_1.TransactionService.getUserTransactions(userId);
            const transaction = transactions.find(t => t.id === id);
            if (!transaction) {
                return res.status(404).json({
                    success: false,
                    error: {
                        message: 'Transaction not found',
                        code: 'TRANSACTION_NOT_FOUND',
                    },
                });
            }
            return res.status(200).json({
                success: true,
                data: transaction,
            });
        }
        catch (error) {
            logger_1.logger.error('Failed to get transaction:', error);
            return next(error);
        }
    }
    static async updateTransactionStatus(req, res, next) {
        try {
            const { id } = req.params;
            const { status } = req.body;
            const userId = req.user?.id;
            if (!userId || !['confirmed', 'failed'].includes(status)) {
                return res.status(400).json({
                    success: false,
                    error: {
                        message: 'Invalid request',
                        code: 'INVALID_REQUEST',
                    },
                });
            }
            const dbStatus = status === 'confirmed' ? 'CONFIRMED' : 'FAILED';
            const txId = id;
            await transactionService_1.TransactionService.updateTransactionStatus(txId, dbStatus);
            return res.status(200).json({
                success: true,
                message: `Transaction status updated to ${status}`,
            });
        }
        catch (error) {
            logger_1.logger.error('Failed to update transaction status:', error);
            return next(error);
        }
    }
}
exports.TransactionController = TransactionController;
//# sourceMappingURL=TransactionController.js.map