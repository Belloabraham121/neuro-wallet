"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletService = void 0;
const crypto_1 = __importDefault(require("crypto"));
const index_1 = require("../index");
const logger_1 = require("../config/logger");
class WalletService {
    static encryptPrivateKey(privateKey) {
        const algorithm = 'aes-256-cbc';
        const key = crypto_1.default.scryptSync(process.env.ENCRYPTION_KEY || 'default-key', 'salt', 32);
        const iv = crypto_1.default.randomBytes(16);
        const cipher = crypto_1.default.createCipher(algorithm, key);
        let encrypted = cipher.update(privateKey, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return iv.toString('hex') + ':' + encrypted;
    }
    static decryptPrivateKey(encryptedKey) {
        const algorithm = 'aes-256-cbc';
        const key = crypto_1.default.scryptSync(process.env.ENCRYPTION_KEY || 'default-key', 'salt', 32);
        const [ivHex, encrypted] = encryptedKey.split(':');
        const iv = Buffer.from(ivHex, 'hex');
        const decipher = crypto_1.default.createDecipher(algorithm, key);
        let decrypted = decipher.update(encrypted, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }
    static generateWalletKeys() {
        const privateKey = crypto_1.default.randomBytes(32).toString('hex');
        const publicKey = crypto_1.default.randomBytes(33).toString('hex');
        const address = 'ST' + crypto_1.default.randomBytes(19).toString('hex').toUpperCase();
        return {
            address,
            publicKey,
            privateKey,
        };
    }
    static async createWallet(data) {
        const { userId, walletType = 'STANDARD', metadata = {} } = data;
        const existingWalletsCount = await index_1.prisma.wallet.count({
            where: {
                userId,
                isActive: true,
            },
        });
        const maxWallets = parseInt(process.env.MAX_WALLETS_PER_USER || '5');
        if (existingWalletsCount >= maxWallets) {
            throw new Error('WALLET_LIMIT_REACHED');
        }
        const walletKeys = this.generateWalletKeys();
        const encryptedPrivateKey = this.encryptPrivateKey(walletKeys.privateKey);
        const wallet = await index_1.prisma.wallet.create({
            data: {
                address: walletKeys.address,
                publicKey: walletKeys.publicKey,
                encryptedPrivateKey,
                walletType,
                metadata,
                userId,
            },
        });
        logger_1.logger.info(`Wallet created: ${wallet.id} for user: ${userId}`);
        return {
            id: wallet.id,
            address: wallet.address,
            walletType: wallet.walletType,
            isActive: wallet.isActive,
            metadata: wallet.metadata,
            createdAt: wallet.createdAt,
            updatedAt: wallet.updatedAt,
        };
    }
    static async createSocialWalletGoogle(socialData) {
        const { provider, providerId, providerData = {} } = socialData;
        if (provider !== 'GOOGLE') {
            throw new Error('INVALID_PROVIDER');
        }
        const existingSocialMapping = await index_1.prisma.socialAuthMapping.findFirst({
            where: {
                provider,
                providerId,
            },
        });
        if (existingSocialMapping) {
            throw new Error('SOCIAL_WALLET_EXISTS');
        }
        const email = providerData.email;
        if (!email) {
            throw new Error('EMAIL_REQUIRED');
        }
        let user = await index_1.prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            user = await index_1.prisma.user.create({
                data: {
                    email,
                    firstName: providerData.firstName || '',
                    lastName: providerData.lastName || '',
                },
            });
        }
        const walletKeys = this.generateWalletKeys();
        const encryptedPrivateKey = this.encryptPrivateKey(walletKeys.privateKey);
        const wallet = await index_1.prisma.wallet.create({
            data: {
                address: walletKeys.address,
                publicKey: walletKeys.publicKey,
                encryptedPrivateKey,
                walletType: 'SOCIAL_GOOGLE',
                metadata: { provider, providerId },
                userId: user.id,
            },
        });
        await index_1.prisma.socialAuthMapping.create({
            data: {
                provider,
                providerId,
                providerData,
                walletId: wallet.id,
                userId: user.id,
                isVerified: true,
            },
        });
        logger_1.logger.info(`Social wallet created: ${wallet.id} for provider: ${provider}`);
        return {
            id: wallet.id,
            address: wallet.address,
            walletType: wallet.walletType,
            isActive: wallet.isActive,
            metadata: wallet.metadata,
            createdAt: wallet.createdAt,
            updatedAt: wallet.updatedAt,
        };
    }
    static async createSocialWalletPhone(socialData) {
        const { provider, providerId, verificationCode, providerData = {} } = socialData;
        if (provider !== 'PHONE') {
            throw new Error('INVALID_PROVIDER');
        }
        const phoneRegex = /^\+[1-9]\d{1,14}$/;
        if (!phoneRegex.test(providerId)) {
            throw new Error('INVALID_PHONE_FORMAT');
        }
        if (!verificationCode) {
            const code = Math.floor(100000 + Math.random() * 900000).toString();
            logger_1.logger.info(`Verification code for ${providerId}: ${code}`);
            throw new Error('VERIFICATION_CODE_SENT');
        }
        if (verificationCode.length !== 6) {
            throw new Error('INVALID_VERIFICATION_CODE');
        }
        const existingSocialMapping = await index_1.prisma.socialAuthMapping.findFirst({
            where: {
                provider,
                providerId,
            },
        });
        if (existingSocialMapping) {
            throw new Error('SOCIAL_WALLET_EXISTS');
        }
        const user = await index_1.prisma.user.create({
            data: {
                email: `${providerId.replace('+', '')}@phone.local`,
                firstName: 'Phone',
                lastName: 'User',
            },
        });
        const walletKeys = this.generateWalletKeys();
        const encryptedPrivateKey = this.encryptPrivateKey(walletKeys.privateKey);
        const wallet = await index_1.prisma.wallet.create({
            data: {
                address: walletKeys.address,
                publicKey: walletKeys.publicKey,
                encryptedPrivateKey,
                walletType: 'SOCIAL_PHONE',
                metadata: { provider, providerId },
                userId: user.id,
            },
        });
        await index_1.prisma.socialAuthMapping.create({
            data: {
                provider,
                providerId,
                providerData,
                walletId: wallet.id,
                userId: user.id,
                isVerified: true,
            },
        });
        logger_1.logger.info(`Social wallet created: ${wallet.id} for phone: ${providerId}`);
        return {
            id: wallet.id,
            address: wallet.address,
            walletType: wallet.walletType,
            isActive: wallet.isActive,
            metadata: wallet.metadata,
            createdAt: wallet.createdAt,
            updatedAt: wallet.updatedAt,
        };
    }
    static async getUserWallets(userId) {
        const wallets = await index_1.prisma.wallet.findMany({
            where: {
                userId,
                isActive: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        return wallets.map((wallet) => ({
            id: wallet.id,
            address: wallet.address,
            walletType: wallet.walletType,
            isActive: wallet.isActive,
            metadata: wallet.metadata,
            createdAt: wallet.createdAt,
            updatedAt: wallet.updatedAt,
        }));
    }
    static async getWalletById(walletId, userId) {
        const wallet = await index_1.prisma.wallet.findFirst({
            where: {
                id: walletId,
                userId,
                isActive: true,
            },
        });
        if (!wallet) {
            return null;
        }
        return {
            id: wallet.id,
            address: wallet.address,
            walletType: wallet.walletType,
            isActive: wallet.isActive,
            metadata: wallet.metadata,
            createdAt: wallet.createdAt,
            updatedAt: wallet.updatedAt,
        };
    }
    static async updateWallet(walletId, userId, metadata) {
        const wallet = await index_1.prisma.wallet.findFirst({
            where: {
                id: walletId,
                userId,
                isActive: true,
            },
        });
        if (!wallet) {
            throw new Error('WALLET_NOT_FOUND');
        }
        const updatedWallet = await index_1.prisma.wallet.update({
            where: { id: walletId },
            data: { metadata },
        });
        logger_1.logger.info(`Wallet updated: ${walletId}`);
        return {
            id: updatedWallet.id,
            address: updatedWallet.address,
            walletType: updatedWallet.walletType,
            isActive: updatedWallet.isActive,
            metadata: updatedWallet.metadata,
            createdAt: updatedWallet.createdAt,
            updatedAt: updatedWallet.updatedAt,
        };
    }
    static async deleteWallet(walletId, userId) {
        const wallet = await index_1.prisma.wallet.findFirst({
            where: {
                id: walletId,
                userId,
                isActive: true,
            },
        });
        if (!wallet) {
            throw new Error('WALLET_NOT_FOUND');
        }
        await index_1.prisma.wallet.update({
            where: { id: walletId },
            data: { isActive: false },
        });
        logger_1.logger.info(`Wallet deleted: ${walletId}`);
    }
    static async getWalletPrivateKey(walletId, userId) {
        const wallet = await index_1.prisma.wallet.findFirst({
            where: {
                id: walletId,
                userId,
                isActive: true,
            },
        });
        if (!wallet) {
            throw new Error('WALLET_NOT_FOUND');
        }
        return this.decryptPrivateKey(wallet.encryptedPrivateKey);
    }
}
exports.WalletService = WalletService;
//# sourceMappingURL=walletService.js.map