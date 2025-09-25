export interface CreateWalletData {
    userId: string;
    apiKeyId?: string;
    walletType?: "STANDARD" | "SOCIAL_GOOGLE" | "SOCIAL_PHONE" | "SOCIAL_TWITTER" | "MULTISIG";
    metadata?: Record<string, any>;
}
export interface SocialWalletData {
    provider: "GOOGLE" | "PHONE" | "TWITTER";
    providerId: string;
    providerData?: Record<string, any>;
    verificationCode?: string;
    apiKeyId: string;
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
    static doubleSHA256(data: Buffer): Buffer;
    static hash160(data: Buffer): Buffer;
    static c32encode(inputBytes: Buffer): string;
    static getAddress(pubkeyHex: string): string;
    static generateDeterministicWalletKeys(provider: string, providerId: string, userSalt?: string): WalletKeys;
    static generateWalletKeys(): WalletKeys;
    static createWallet(data: CreateWalletData): Promise<WalletResponse>;
    static createSocialWalletGoogle(socialData: SocialWalletData): Promise<WalletResponse>;
    static createSocialWalletPhone(socialData: SocialWalletData): Promise<WalletResponse>;
    static createSocialWalletTwitter(socialData: SocialWalletData): Promise<WalletResponse>;
    static getUserWallets(userId: string): Promise<WalletResponse[]>;
    static getWalletById(walletId: string, userId: string): Promise<WalletResponse | null>;
    static updateWallet(walletId: string, userId: string, metadata: Record<string, any>): Promise<WalletResponse>;
    static deleteWallet(walletId: string, userId: string): Promise<void>;
    static getWalletPrivateKey(walletId: string, userId: string): Promise<string>;
}
//# sourceMappingURL=walletService.d.ts.map