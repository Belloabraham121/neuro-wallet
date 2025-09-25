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
export declare class ApiKeyService {
    static generateApiKey(): string;
    static hashApiKey(apiKey: string): Promise<string>;
    static verifyApiKey(apiKey: string, hash: string): Promise<boolean>;
    static createKeyPrefix(apiKey: string): string;
    static createApiKey(data: CreateApiKeyData): Promise<CreateApiKeyResult>;
    static getUserApiKeys(userId: string): Promise<ApiKeyResponse[]>;
    static getApiKeyById(keyId: string, userId: string): Promise<ApiKeyResponse | null>;
    static updateApiKey(keyId: string, userId: string, updateData: UpdateApiKeyData): Promise<ApiKeyResponse>;
    static deleteApiKey(keyId: string, userId: string): Promise<void>;
    static validateApiKey(apiKey: string): Promise<{
        apiKey: {
            id: any;
            name: any;
            permissions: Record<string, any>;
        };
        user: {
            id: any;
            email: any;
            firstName: any;
            lastName: any;
        };
    }>;
    static hasPermission(permissions: Record<string, any>, requiredPermission: string): boolean;
    static logApiKeyUsage(apiKeyId: string, endpoint: string, method: string, userId: string, status: string, ipAddress: string, userAgent: string, responseTime: number): Promise<void>;
    static getApiKeyUsages(apiKeyId: string, userId: string, limit?: number, startDate?: Date, endDate?: Date): Promise<any[]>;
    static getApiKeyUsageStats(apiKeyId: string, userId: string, days?: number): Promise<any>;
}
export default ApiKeyService;
//# sourceMappingURL=apiKeyService.d.ts.map