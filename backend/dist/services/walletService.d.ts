export interface CreateWalletData {
    userId: string;
    walletType?: 'STANDARD' | 'SOCIAL_GOOGLE' | 'SOCIAL_PHONE' | 'MULTISIG';
    metadata?: Record<string, any>;
}
export interface SocialWalletData {
    provider: 'GOOGLE' | 'PHONE';
    providerId: string;
    providerData?: Record<string, any>;
    verificationCode?: string;
}
export interface WalletResponse {
    id: string;
    address: string;
    walletType: string;
    isActive: boolean;
    metadata: Record<string, any>;
    createdAt: Date;
    updatedAt: Date;
}
export interface WalletKeys {
    address: string;
    publicKey: string;
    privateKey: string;
}
export declare class WalletService {
    static encryptPrivateKey(privateKey: string): string;
    static decryptPrivateKey(encryptedKey: string): string;
    static generateWalletKeys(): WalletKeys;
    static createWallet(data: CreateWalletData): Promise<WalletResponse>;
    static createSocialWalletGoogle(socialData: SocialWalletData): Promise<WalletResponse>;
    static createSocialWalletPhone(socialData: SocialWalletData): Promise<WalletResponse>;
    static getUserWallets(userId: string): Promise<WalletResponse[]>;
    static getWalletById(walletId: string, userId: string): Promise<WalletResponse | null>;
    static updateWallet(walletId: string, userId: string, metadata: Record<string, any>): Promise<WalletResponse>;
    static deleteWallet(walletId: string, userId: string): Promise<void>;
    static getWalletPrivateKey(walletId: string, userId: string): Promise<string>;
}
//# sourceMappingURL=walletService.d.ts.map