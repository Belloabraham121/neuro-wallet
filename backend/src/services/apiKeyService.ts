import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { prisma } from '../index';
import { logger } from '../config/logger';

export interface CreateApiKeyData {
  name: string;
  permissions?: Record<string, any>;
  expiresAt?: Date;
  userId: string;
}

export interface UpdateApiKeyData {
  name?: string;
  permissions?: Record<string, any>;
  isActive?: boolean;
}

export interface ApiKeyResponse {
  id: string;
  name: string;
  keyPrefix: string;
  permissions: Record<string, any>;
  isActive: boolean;
  expiresAt: Date | null;
  lastUsedAt: Date | null;
  createdAt: Date;
}

export interface CreateApiKeyResult {
  apiKey: string;
  keyData: ApiKeyResponse;
}

export class ApiKeyService {
  /**
   * Generate a new API key
   */
  static generateApiKey(): string {
    const prefix = process.env.API_KEY_PREFIX || 'sk_';
    const length = parseInt(process.env.API_KEY_LENGTH || '32');
    const randomBytes = crypto.randomBytes(length);
    const apiKey = prefix + randomBytes.toString('hex');
    return apiKey;
  }

  /**
   * Hash API key for secure storage
   */
  static async hashApiKey(apiKey: string): Promise<string> {
    const saltRounds = parseInt(process.env.BCRYPT_ROUNDS || '12');
    return await bcrypt.hash(apiKey, saltRounds);
  }

  /**
   * Verify API key against hash
   */
  static async verifyApiKey(apiKey: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(apiKey, hash);
  }

  /**
   * Create a preview of the API key (first 8 chars + ...)
   */
  static createKeyPrefix(apiKey: string): string {
    return apiKey.substring(0, 8);
  }

  /**
   * Create a new API key
   */
  static async createApiKey(data: CreateApiKeyData): Promise<CreateApiKeyResult> {
    const { name, permissions = {}, expiresAt, userId } = data;

    // Check if user has reached API key limit
    const existingKeysCount = await prisma.apiKey.count({
      where: {
        userId,
        isActive: true,
      },
    });

    const maxApiKeys = parseInt(process.env.MAX_API_KEYS_PER_USER || '10');
    if (existingKeysCount >= maxApiKeys) {
      throw new Error('API_KEY_LIMIT_REACHED');
    }

    // Generate API key
    const apiKey = this.generateApiKey();
    const hashedKey = await this.hashApiKey(apiKey);
    const keyPrefix = this.createKeyPrefix(apiKey);

    // Create API key record
    const keyData = await prisma.apiKey.create({
      data: {
        name,
        keyHash: hashedKey,
        keyPrefix,
        permissions,
        expiresAt,
        userId,
      },
    });

    logger.info(`API key created: ${keyData.id} for user: ${userId}`);

    return {
      apiKey,
      keyData: {
        id: keyData.id,
        name: keyData.name,
        keyPrefix: keyData.keyPrefix,
        permissions: keyData.permissions as Record<string, any>,
        isActive: keyData.isActive,
        expiresAt: keyData.expiresAt,
        lastUsedAt: keyData.lastUsedAt,
        createdAt: keyData.createdAt,
      },
    };
  }

  /**
   * Get all API keys for a user
   */
  static async getUserApiKeys(userId: string): Promise<ApiKeyResponse[]> {
    const apiKeys = await prisma.apiKey.findMany({
      where: {
        userId,
        isActive: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return apiKeys.map((key: any) => ({
      id: key.id,
      name: key.name,
      keyPrefix: key.keyPrefix,
      permissions: key.permissions as Record<string, any>,
      isActive: key.isActive,
      expiresAt: key.expiresAt,
      lastUsedAt: key.lastUsedAt,
      createdAt: key.createdAt,
    }));
  }

  /**
   * Get a specific API key by ID
   */
  static async getApiKeyById(keyId: string, userId: string): Promise<ApiKeyResponse | null> {
    const apiKey = await prisma.apiKey.findFirst({
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
      permissions: apiKey.permissions as Record<string, any>,
      isActive: apiKey.isActive,
      expiresAt: apiKey.expiresAt,
      lastUsedAt: apiKey.lastUsedAt,
      createdAt: apiKey.createdAt,
    };
  }

  /**
   * Update an API key
   */
  static async updateApiKey(
    keyId: string,
    userId: string,
    updateData: UpdateApiKeyData
  ): Promise<ApiKeyResponse> {
    const apiKey = await prisma.apiKey.findFirst({
      where: {
        id: keyId,
        userId,
        isActive: true,
      },
    });

    if (!apiKey) {
      throw new Error('API_KEY_NOT_FOUND');
    }

    const updatedKey = await prisma.apiKey.update({
      where: { id: keyId },
      data: updateData,
    });

    logger.info(`API key updated: ${keyId}`);

    return {
      id: updatedKey.id,
      name: updatedKey.name,
      keyPrefix: updatedKey.keyPrefix,
      permissions: updatedKey.permissions as Record<string, any>,
      isActive: updatedKey.isActive,
      expiresAt: updatedKey.expiresAt,
      lastUsedAt: updatedKey.lastUsedAt,
      createdAt: updatedKey.createdAt,
    };
  }

  /**
   * Delete (deactivate) an API key
   */
  static async deleteApiKey(keyId: string, userId: string): Promise<void> {
    const apiKey = await prisma.apiKey.findFirst({
      where: {
        id: keyId,
        userId,
        isActive: true,
      },
    });

    if (!apiKey) {
      throw new Error('API_KEY_NOT_FOUND');
    }

    await prisma.apiKey.update({
      where: { id: keyId },
      data: { isActive: false },
    });

    logger.info(`API key deleted: ${keyId}`);
  }

  /**
   * Validate an API key and return associated user
   */
  static async validateApiKey(apiKey: string) {
    if (!apiKey) {
      throw new Error('API_KEY_REQUIRED');
    }

    // Find API key by prefix (first 8 characters)
    const keyPrefix = this.createKeyPrefix(apiKey);
    const apiKeyRecord = await prisma.apiKey.findFirst({
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
    }) as any;

    if (!apiKeyRecord) {
      throw new Error('INVALID_API_KEY');
    }

    // Verify the full API key
    const isValid = await this.verifyApiKey(apiKey, apiKeyRecord.keyHash);
    if (!isValid) {
      throw new Error('INVALID_API_KEY');
    }

    // Update last used timestamp
    await prisma.apiKey.update({
      where: { id: apiKeyRecord.id },
      data: { lastUsedAt: new Date() },
    });

    return {
      apiKey: {
        id: apiKeyRecord.id,
        name: apiKeyRecord.name,
        permissions: apiKeyRecord.permissions as Record<string, any>,
      },
      user: {
        id: apiKeyRecord.user.id,
        email: apiKeyRecord.user.email,
        firstName: apiKeyRecord.user.firstName || null,
        lastName: apiKeyRecord.user.lastName || null,
      },
    };
  }

  /**
   * Check if API key has specific permission
   */
  static hasPermission(
    permissions: Record<string, any>,
    requiredPermission: string
  ): boolean {
    if (!permissions || typeof permissions !== 'object') {
      return false;
    }

    // If permissions is empty or has 'all' permission, allow everything
    if (Object.keys(permissions).length === 0 || permissions.all === true) {
      return true;
    }

    // Check specific permission
    return permissions[requiredPermission] === true;
  }
}