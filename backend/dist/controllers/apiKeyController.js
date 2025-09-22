"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiKeyController = void 0;
const express_validator_1 = require("express-validator");
const apiKeyService_1 = require("../services/apiKeyService");
class ApiKeyController {
    static async createApiKey(req, res, next) {
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
            const { name, permissions, expiresAt } = req.body;
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
            const result = await apiKeyService_1.ApiKeyService.createApiKey({
                userId,
                name,
                permissions,
                expiresAt,
            });
            res.status(201).json({
                success: true,
                data: result,
            });
        }
        catch (error) {
            if (error.message === 'API_KEY_LIMIT_REACHED') {
                return res.status(400).json({
                    success: false,
                    error: {
                        message: 'Maximum number of API keys reached',
                        code: 'API_KEY_LIMIT_REACHED',
                    },
                });
            }
            return next(error);
        }
    }
    static async getApiKeys(req, res, next) {
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
            const apiKeys = await apiKeyService_1.ApiKeyService.getUserApiKeys(userId);
            res.json({
                success: true,
                data: {
                    apiKeys,
                    total: apiKeys.length,
                },
            });
        }
        catch (error) {
            return next(error);
        }
    }
    static async getApiKey(req, res, next) {
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
            const apiKey = await apiKeyService_1.ApiKeyService.getApiKeyById(id, userId);
            if (!apiKey) {
                return res.status(404).json({
                    success: false,
                    error: {
                        message: 'API key not found',
                        code: 'API_KEY_NOT_FOUND',
                    },
                });
            }
            res.json({
                success: true,
                data: { apiKey },
            });
        }
        catch (error) {
            return next(error);
        }
    }
    static async updateApiKey(req, res, next) {
        try {
            const { id } = req.params;
            const { name, permissions } = req.body;
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
            const apiKey = await apiKeyService_1.ApiKeyService.updateApiKey(id, userId, { name, permissions });
            res.json({
                success: true,
                data: { apiKey },
            });
        }
        catch (error) {
            if (error.message === 'API_KEY_NOT_FOUND') {
                return res.status(404).json({
                    success: false,
                    error: {
                        message: 'API key not found',
                        code: 'API_KEY_NOT_FOUND',
                    },
                });
            }
            return next(error);
        }
    }
    static async deleteApiKey(req, res, next) {
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
            await apiKeyService_1.ApiKeyService.deleteApiKey(id, userId);
            res.json({
                success: true,
                data: {
                    message: 'API key deleted successfully',
                },
            });
        }
        catch (error) {
            if (error.message === 'API_KEY_NOT_FOUND') {
                return res.status(404).json({
                    success: false,
                    error: {
                        message: 'API key not found',
                        code: 'API_KEY_NOT_FOUND',
                    },
                });
            }
            return next(error);
        }
    }
    static async validateApiKey(req, res, next) {
        try {
            const { apiKey } = req.body;
            if (!apiKey) {
                return res.status(400).json({
                    success: false,
                    error: {
                        message: 'API key is required',
                        code: 'API_KEY_REQUIRED',
                    },
                });
            }
            const result = await apiKeyService_1.ApiKeyService.validateApiKey(apiKey);
            if (!result) {
                return res.status(401).json({
                    success: false,
                    error: {
                        message: 'Invalid API key',
                        code: 'INVALID_API_KEY',
                    },
                });
            }
            res.json({
                success: true,
                data: result,
            });
        }
        catch (error) {
            if (error.message === 'API_KEY_EXPIRED') {
                return res.status(401).json({
                    success: false,
                    error: {
                        message: 'API key has expired',
                        code: 'API_KEY_EXPIRED',
                    },
                });
            }
            if (error.message === 'USER_DEACTIVATED') {
                return res.status(401).json({
                    success: false,
                    error: {
                        message: 'User account is deactivated',
                        code: 'USER_DEACTIVATED',
                    },
                });
            }
            return next(error);
        }
    }
}
exports.ApiKeyController = ApiKeyController;
//# sourceMappingURL=apiKeyController.js.map