"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletController = void 0;
const express_validator_1 = require("express-validator");
const walletService_1 = require("../services/walletService");
class WalletController {
    static async createWallet(req, res, next) {
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
            const { walletType, metadata } = req.body;
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
            const wallet = await walletService_1.WalletService.createWallet({
                userId,
                walletType,
                metadata,
            });
            res.status(201).json({
                success: true,
                data: { wallet },
            });
        }
        catch (error) {
            if (error.message === 'WALLET_LIMIT_REACHED') {
                return res.status(400).json({
                    success: false,
                    error: {
                        message: 'Maximum number of wallets reached',
                        code: 'WALLET_LIMIT_REACHED',
                    },
                });
            }
            return next(error);
        }
    }
    static async createSocialWalletGoogle(req, res, next) {
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
            const { provider, providerId, providerData } = req.body;
            const wallet = await walletService_1.WalletService.createSocialWalletGoogle({
                provider,
                providerId,
                providerData,
            });
            res.status(201).json({
                success: true,
                data: { wallet },
            });
        }
        catch (error) {
            if (error.message === 'INVALID_PROVIDER') {
                return res.status(400).json({
                    success: false,
                    error: {
                        message: 'Invalid provider. Must be GOOGLE',
                        code: 'INVALID_PROVIDER',
                    },
                });
            }
            if (error.message === 'SOCIAL_WALLET_EXISTS') {
                return res.status(409).json({
                    success: false,
                    error: {
                        message: 'Social wallet already exists for this provider',
                        code: 'SOCIAL_WALLET_EXISTS',
                    },
                });
            }
            if (error.message === 'EMAIL_REQUIRED') {
                return res.status(400).json({
                    success: false,
                    error: {
                        message: 'Email is required from Google provider',
                        code: 'EMAIL_REQUIRED',
                    },
                });
            }
            return next(error);
        }
    }
    static async createSocialWalletPhone(req, res, next) {
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
            const { provider, providerId, verificationCode, providerData } = req.body;
            const wallet = await walletService_1.WalletService.createSocialWalletPhone({
                provider,
                providerId,
                verificationCode,
                providerData,
            });
            res.status(201).json({
                success: true,
                data: { wallet },
            });
        }
        catch (error) {
            if (error.message === 'INVALID_PROVIDER') {
                return res.status(400).json({
                    success: false,
                    error: {
                        message: 'Invalid provider. Must be PHONE',
                        code: 'INVALID_PROVIDER',
                    },
                });
            }
            if (error.message === 'INVALID_PHONE_FORMAT') {
                return res.status(400).json({
                    success: false,
                    error: {
                        message: 'Invalid phone number format. Use international format (+1234567890)',
                        code: 'INVALID_PHONE_FORMAT',
                    },
                });
            }
            if (error.message === 'VERIFICATION_CODE_SENT') {
                return res.status(200).json({
                    success: true,
                    data: {
                        message: 'Verification code sent to phone number',
                        requiresVerification: true,
                    },
                });
            }
            if (error.message === 'INVALID_VERIFICATION_CODE') {
                return res.status(400).json({
                    success: false,
                    error: {
                        message: 'Invalid verification code',
                        code: 'INVALID_VERIFICATION_CODE',
                    },
                });
            }
            if (error.message === 'SOCIAL_WALLET_EXISTS') {
                return res.status(409).json({
                    success: false,
                    error: {
                        message: 'Social wallet already exists for this phone number',
                        code: 'SOCIAL_WALLET_EXISTS',
                    },
                });
            }
            return next(error);
        }
    }
    static async getUserWallets(req, res, next) {
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
            const wallets = await walletService_1.WalletService.getUserWallets(userId);
            res.json({
                success: true,
                data: {
                    wallets,
                    total: wallets.length,
                },
            });
        }
        catch (error) {
            return next(error);
        }
    }
    static async getWalletById(req, res, next) {
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
            const wallet = await walletService_1.WalletService.getWalletById(id, userId);
            if (!wallet) {
                return res.status(404).json({
                    success: false,
                    error: {
                        message: 'Wallet not found',
                        code: 'WALLET_NOT_FOUND',
                    },
                });
            }
            res.json({
                success: true,
                data: { wallet },
            });
        }
        catch (error) {
            return next(error);
        }
    }
    static async updateWallet(req, res, next) {
        try {
            const { id } = req.params;
            const { metadata } = req.body;
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
            if (!metadata || typeof metadata !== 'object') {
                return res.status(400).json({
                    success: false,
                    error: {
                        message: 'Metadata is required and must be an object',
                        code: 'INVALID_METADATA',
                    },
                });
            }
            const wallet = await walletService_1.WalletService.updateWallet(id, userId, metadata);
            res.json({
                success: true,
                data: { wallet },
            });
        }
        catch (error) {
            if (error.message === 'WALLET_NOT_FOUND') {
                return res.status(404).json({
                    success: false,
                    error: {
                        message: 'Wallet not found',
                        code: 'WALLET_NOT_FOUND',
                    },
                });
            }
            return next(error);
        }
    }
    static async deleteWallet(req, res, next) {
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
            await walletService_1.WalletService.deleteWallet(id, userId);
            res.json({
                success: true,
                data: {
                    message: 'Wallet deleted successfully',
                },
            });
        }
        catch (error) {
            if (error.message === 'WALLET_NOT_FOUND') {
                return res.status(404).json({
                    success: false,
                    error: {
                        message: 'Wallet not found',
                        code: 'WALLET_NOT_FOUND',
                    },
                });
            }
            return next(error);
        }
    }
}
exports.WalletController = WalletController;
//# sourceMappingURL=WalletController.js.map