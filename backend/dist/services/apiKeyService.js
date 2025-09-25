"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiKeyService = void 0;
const crypto_1 = __importDefault(require("crypto"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const index_1 = require("../index");
const logger_1 = require("../config/logger");
class ApiKeyService {
    static generateApiKey() {
        const prefix = process.env.API_KEY_PREFIX || 'sk_';
        const length = parseInt(process.env.API_KEY_LENGTH || '32');
        const randomBytes = crypto_1.default.randomBytes(length);
        const apiKey = prefix + randomBytes.toString('hex');
        return apiKey;
    }
    static async hashApiKey(apiKey) {
        const saltRounds = parseInt(process.env.BCRYPT_ROUNDS || '12');
        return await bcryptjs_1.default.hash(apiKey, saltRounds);
    }
    static async verifyApiKey(apiKey, hash) {
        return await bcryptjs_1.default.compare(apiKey, hash);
    }
    static createKeyPrefix(apiKey) {
        return apiKey.substring(0, 8);
    }
    static async createApiKey(data) {
        const { name, permissions = {}, expiresAt, userId } = data;
        const existingKeysCount = await index_1.prisma.apiKey.count({
            where: {
                userId,
                isActive: true,
            },
        });
        const maxApiKeys = parseInt(process.env.MAX_API_KEYS_PER_USER || '10');
        if (existingKeysCount >= maxApiKeys) {
            throw new Error('API_KEY_LIMIT_REACHED');
        }
        const apiKey = this.generateApiKey();
        const hashedKey = await this.hashApiKey(apiKey);
        const keyPrefix = this.createKeyPrefix(apiKey);
        const keyData = await index_1.prisma.apiKey.create({
            data: {
                name,
                keyHash: hashedKey,
                keyPrefix,
                permissions,
                expiresAt,
                userId,
            },
        });
        logger_1.logger.info(`API key created: ${keyData.id} for user: ${userId}`);
        return {
            apiKey,
            keyData: {
                id: keyData.id,
                name: keyData.name,
                keyPrefix: keyData.keyPrefix,
                permissions: keyData.permissions,
                isActive: keyData.isActive,
                expiresAt: keyData.expiresAt,
                lastUsedAt: keyData.lastUsedAt,
                createdAt: keyData.createdAt,
            },
        };
    }
    static async getUserApiKeys(userId) {
        const apiKeys = await index_1.prisma.apiKey.findMany({
            where: {
                userId,
                isActive: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        return apiKeys.map((key) => ({
            id: key.id,
            name: key.name,
            keyPrefix: key.keyPrefix,
            permissions: key.permissions,
            isActive: key.isActive,
            expiresAt: key.expiresAt,
            lastUsedAt: key.lastUsedAt,
            createdAt: key.createdAt,
        }));
    }
    static async getApiKeyById(keyId, userId) {
        const apiKey = await index_1.prisma.apiKey.findFirst({
            where: {
                id: keyId,
                userId,
                isActive: true,
            },
        });
        if (!apiKey) {
            return null;
        }
        return {
            id: apiKey.id,
            name: apiKey.name,
            keyPrefix: apiKey.keyPrefix,
            permissions: apiKey.permissions,
            isActive: apiKey.isActive,
            expiresAt: apiKey.expiresAt,
            lastUsedAt: apiKey.lastUsedAt,
            createdAt: apiKey.createdAt,
        };
    }
    static async updateApiKey(keyId, userId, updateData) {
        const apiKey = await index_1.prisma.apiKey.findFirst({
            where: {
                id: keyId,
                userId,
                isActive: true,
            },
        });
        if (!apiKey) {
            throw new Error('API_KEY_NOT_FOUND');
        }
        const updatedKey = await index_1.prisma.apiKey.update({
            where: { id: keyId },
            data: updateData,
        });
        logger_1.logger.info(`API key updated: ${keyId}`);
        return {
            id: updatedKey.id,
            name: updatedKey.name,
            keyPrefix: updatedKey.keyPrefix,
            permissions: updatedKey.permissions,
            isActive: updatedKey.isActive,
            expiresAt: updatedKey.expiresAt,
            lastUsedAt: updatedKey.lastUsedAt,
            createdAt: updatedKey.createdAt,
        };
    }
    static async deleteApiKey(keyId, userId) {
        const apiKey = await index_1.prisma.apiKey.findFirst({
            where: {
                id: keyId,
                userId,
                isActive: true,
            },
        });
        if (!apiKey) {
            throw new Error('API_KEY_NOT_FOUND');
        }
        await index_1.prisma.apiKey.update({
            where: { id: keyId },
            data: { isActive: false },
        });
        logger_1.logger.info(`API key deleted: ${keyId}`);
    }
    static async validateApiKey(apiKey) {
        if (!apiKey) {
            throw new Error('API_KEY_REQUIRED');
        }
        const keyPrefix = this.createKeyPrefix(apiKey);
        const apiKeyRecord = await index_1.prisma.apiKey.findFirst({
            where: {
                keyPrefix,
                isActive: true,
                OR: [
                    { expiresAt: null },
                    { expiresAt: { gt: new Date() } },
                ],
            },
            include: {
                user: true,
            },
        });
        if (!apiKeyRecord) {
            throw new Error('INVALID_API_KEY');
        }
        const isValid = await this.verifyApiKey(apiKey, apiKeyRecord.keyHash);
        if (!isValid) {
            throw new Error('INVALID_API_KEY');
        }
        await index_1.prisma.apiKey.update({
            where: { id: apiKeyRecord.id },
            data: { lastUsedAt: new Date() },
        });
        return {
            apiKey: {
                id: apiKeyRecord.id,
                name: apiKeyRecord.name,
                permissions: apiKeyRecord.permissions,
            },
            user: {
                id: apiKeyRecord.user.id,
                email: apiKeyRecord.user.email,
                firstName: apiKeyRecord.user.firstName || null,
                lastName: apiKeyRecord.user.lastName || null,
            },
        };
    }
    static hasPermission(permissions, requiredPermission) {
        if (!permissions || typeof permissions !== 'object') {
            return false;
        }
        if (Object.keys(permissions).length === 0 || permissions.all === true) {
            return true;
        }
        return permissions[requiredPermission] === true;
    }
    static async logApiKeyUsage(apiKeyId, endpoint, method, userId, status, ipAddress, userAgent, responseTime) {
        try {
            await index_1.prisma.apiKeyUsage.create({
                data: {
                    apiKeyId,
                    endpoint,
                    method,
                    userId,
                    status,
                    ipAddress,
                    userAgent,
                    responseTime,
                },
            });
            logger_1.logger.info(`API key usage logged: ${apiKeyId} for endpoint ${endpoint}`);
        }
        catch (error) {
            logger_1.logger.error(`Failed to log API key usage: ${error}`);
        }
    }
    static async getApiKeyUsages(apiKeyId, userId, limit = 100, startDate, endDate) {
        const whereClause = {
            apiKeyId,
            apiKey: {
                userId,
            },
        };
        if (startDate) {
            whereClause.createdAt = { ...whereClause.createdAt, gte: startDate };
        }
        if (endDate) {
            whereClause.createdAt = { ...whereClause.createdAt, lte: endDate };
        }
        const usages = await index_1.prisma.apiKeyUsage.findMany({
            where: whereClause,
            include: {
                apiKey: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
                user: {
                    select: {
                        id: true,
                        email: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
            take: limit,
        });
        return usages;
    }
    static async getApiKeyUsageStats(apiKeyId, userId, days = 30) {
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - days);
        const [totalRequests, successCount, errorCount, avgResponseTime] = await Promise.all([
            index_1.prisma.apiKeyUsage.count({
                where: {
                    apiKeyId,
                    apiKey: { userId },
                    createdAt: { gte: startDate },
                },
            }),
            index_1.prisma.apiKeyUsage.count({
                where: {
                    apiKeyId,
                    apiKey: { userId },
                    createdAt: { gte: startDate },
                    status: 'success',
                },
            }),
            index_1.prisma.apiKeyUsage.count({
                where: {
                    apiKeyId,
                    apiKey: { userId },
                    createdAt: { gte: startDate },
                    status: 'error',
                },
            }),
            index_1.prisma.apiKeyUsage.aggregate({
                where: {
                    apiKeyId,
                    apiKey: { userId },
                    createdAt: { gte: startDate },
                    status: 'success',
                },
                _avg: {
                    responseTime: true,
                },
            }),
        ]);
        return {
            apiKeyId,
            periodDays: days,
            totalRequests,
            successRate: totalRequests > 0 ? (successCount / totalRequests) * 100 : 0,
            errorRate: totalRequests > 0 ? (errorCount / totalRequests) * 100 : 0,
            avgResponseTime: avgResponseTime._avg.responseTime || 0,
        };
    }
}
exports.ApiKeyService = ApiKeyService;
exports.default = ApiKeyService;
//# sourceMappingURL=apiKeyService.js.map