"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletService = void 0;
const crypto_1 = __importDefault(require("crypto"));
const index_1 = require("../index");
const logger_1 = require("../config/logger");
const phoneAuthService_1 = require("./phoneAuthService");
const transactions_1 = require("@stacks/transactions");
class WalletService {
    static encryptPrivateKey(privateKey) {
        const algorithm = "aes-256-cbc";
        const key = crypto_1.default.scryptSync(process.env.ENCRYPTION_KEY || "default-key", "salt", 32);
        const iv = crypto_1.default.randomBytes(16);
        const cipher = crypto_1.default.createCipheriv(algorithm, key, iv);
        let encrypted = cipher.update(privateKey, "utf8", "hex");
        encrypted += cipher.final("hex");
        return iv.toString("hex") + ":" + encrypted;
    }
    static decryptPrivateKey(encryptedKey) {
        const algorithm = "aes-256-cbc";
        const key = crypto_1.default.scryptSync(process.env.ENCRYPTION_KEY || "default-key", "salt", 32);
        const [ivHex, encrypted] = encryptedKey.split(":");
        const iv = Buffer.from(ivHex, "hex");
        const decipher = crypto_1.default.createDecipheriv(algorithm, key, iv);
        let decrypted = decipher.update(encrypted, "hex", "utf8");
        decrypted += decipher.final("utf8");
        return decrypted;
    }
    static doubleSHA256(data) {
        let hash = crypto_1.default.createHash("sha256").update(data).digest();
        return crypto_1.default.createHash("sha256").update(hash).digest();
    }
    static hash160(data) {
        const sha = crypto_1.default.createHash("sha256").update(data).digest();
        return crypto_1.default.createHash("ripemd160").update(sha).digest();
    }
    static c32encode(inputBytes) {
        const chars = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";
        let value = BigInt(0);
        for (const byte of inputBytes) {
            value = value * BigInt(256) + BigInt(byte);
        }
        let encoded = "";
        if (value === BigInt(0)) {
            return chars[0];
        }
        while (value > BigInt(0)) {
            const remainder = Number(value % BigInt(32));
            encoded = chars[remainder] + encoded;
            value = value / BigInt(32);
        }
        let zeroCount = 0;
        for (const byte of inputBytes) {
            if (byte !== 0)
                break;
            zeroCount++;
        }
        const zeroChars = Math.ceil((zeroCount * 8) / 5);
        encoded = chars[0].repeat(zeroChars) + encoded;
        return encoded;
    }
    static getAddress(pubkeyHex) {
        const publicKeyBytes = new Uint8Array(Buffer.from(pubkeyHex, 'hex'));
        return (0, transactions_1.getAddressFromPublicKey)(publicKeyBytes, transactions_1.TransactionVersion.Testnet);
    }
    static generateDeterministicWalletKeys(provider, providerId, userSalt) {
        const seedData = `${provider}:${providerId}:${userSalt || process.env.WALLET_SEED_SALT || "default-salt"}`;
        const seed = crypto_1.default.createHash("sha256").update(seedData).digest();
        const privateKey = crypto_1.default.createHash("sha256").update(seed).digest("hex");
        const privBuf = Buffer.from(privateKey, "hex");
        const ecdh = crypto_1.default.createECDH("secp256k1");
        ecdh.setPrivateKey(privBuf);
        const pubBuf = ecdh.getPublicKey(null, "compressed");
        const publicKey = pubBuf.toString("hex");
        const address = WalletService.getAddress(publicKey);
        return {
            address,
            publicKey,
            privateKey,
        };
    }
    static generateWalletKeys() {
        const privateKeyBuf = crypto_1.default.randomBytes(32);
        const privateKey = privateKeyBuf.toString("hex");
        const ecdh = crypto_1.default.createECDH("secp256k1");
        ecdh.setPrivateKey(privateKeyBuf);
        const pubBuf = ecdh.getPublicKey(null, "compressed");
        const publicKey = pubBuf.toString("hex");
        const address = WalletService.getAddress(publicKey);
        return {
            address,
            publicKey,
            privateKey,
        };
    }
    static async createWallet(data) {
        const { userId, apiKeyId, walletType = "STANDARD", metadata = {} } = data;
        if (apiKeyId) {
            const currentUser = await index_1.prisma.user.findUnique({
                where: { id: userId },
                select: { apiKeyId: true },
            });
            if (currentUser?.apiKeyId && currentUser.apiKeyId !== apiKeyId) {
                throw new Error("INVALID_API_KEY_FOR_USER");
            }
            if (!currentUser?.apiKeyId) {
                await index_1.prisma.user.update({
                    where: { id: userId },
                    data: { apiKeyId },
                });
            }
        }
        const existingWalletsCount = await index_1.prisma.wallet.count({
            where: {
                userId,
                isActive: true,
            },
        });
        const maxWallets = parseInt(process.env.MAX_WALLETS_PER_USER || "5");
        if (existingWalletsCount >= maxWallets) {
            throw new Error("WALLET_LIMIT_REACHED");
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
        const { provider, providerId, providerData = {}, apiKeyId } = socialData;
        if (provider !== "GOOGLE") {
            throw new Error("INVALID_PROVIDER");
        }
        const existingSocialMapping = await index_1.prisma.socialAuthMapping.findFirst({
            where: {
                provider,
                providerId,
            },
        });
        if (existingSocialMapping) {
            throw new Error("SOCIAL_WALLET_EXISTS");
        }
        const email = providerData.email;
        if (!email) {
            throw new Error("EMAIL_REQUIRED");
        }
        let user = await index_1.prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            user = await index_1.prisma.user.create({
                data: {
                    email,
                    firstName: providerData.firstName || "",
                    lastName: providerData.lastName || "",
                    apiKeyId,
                },
            });
        }
        else if (!user.apiKeyId) {
            user = await index_1.prisma.user.update({
                where: { id: user.id },
                data: { apiKeyId },
            });
        }
        const walletKeys = this.generateDeterministicWalletKeys(provider, providerId, user.id);
        const encryptedPrivateKey = this.encryptPrivateKey(walletKeys.privateKey);
        const wallet = await index_1.prisma.wallet.create({
            data: {
                address: walletKeys.address,
                publicKey: walletKeys.publicKey,
                encryptedPrivateKey,
                walletType: "SOCIAL_GOOGLE",
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
        const { provider, providerId, verificationCode, providerData = {}, apiKeyId, } = socialData;
        if (provider !== "PHONE") {
            throw new Error("INVALID_PROVIDER");
        }
        const phoneRegex = /^\+[1-9]\d{1,14}$/;
        if (!phoneRegex.test(providerId)) {
            throw new Error("INVALID_PHONE_FORMAT");
        }
        if (!verificationCode) {
            const result = await phoneAuthService_1.PhoneAuthService.sendVerificationCode({
                phoneNumber: providerId,
            });
            if (!result.success) {
                throw new Error(result.message);
            }
            throw new Error("VERIFICATION_CODE_SENT");
        }
        const verificationResult = await phoneAuthService_1.PhoneAuthService.verifyPhoneNumber({
            phoneNumber: providerId,
            verificationCode,
        });
        if (!verificationResult.success) {
            throw new Error(verificationResult.message);
        }
        const existingSocialMapping = await index_1.prisma.socialAuthMapping.findFirst({
            where: {
                provider,
                providerId,
            },
        });
        if (existingSocialMapping) {
            throw new Error("SOCIAL_WALLET_EXISTS");
        }
        const user = await index_1.prisma.user.create({
            data: {
                email: `${providerId.replace("+", "")}@phone.local`,
                firstName: "Phone",
                lastName: "User",
                apiKeyId,
            },
        });
        const walletKeys = this.generateWalletKeys();
        const encryptedPrivateKey = this.encryptPrivateKey(walletKeys.privateKey);
        const wallet = await index_1.prisma.wallet.create({
            data: {
                address: walletKeys.address,
                publicKey: walletKeys.publicKey,
                encryptedPrivateKey,
                walletType: "SOCIAL_PHONE",
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
    static async createSocialWalletTwitter(socialData) {
        const { provider, providerId, providerData = {}, apiKeyId, } = socialData;
        if (provider !== "TWITTER") {
            throw new Error("INVALID_PROVIDER");
        }
        const existingSocialMapping = await index_1.prisma.socialAuthMapping.findFirst({
            where: {
                provider,
                providerId,
            },
        });
        if (existingSocialMapping) {
            throw new Error("SOCIAL_WALLET_EXISTS");
        }
        const email = providerData.email || `${providerId}@twitter.local`;
        let user = await index_1.prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            user = await index_1.prisma.user.create({
                data: {
                    email,
                    firstName: providerData.name ? providerData.name.split(' ')[0] : 'Twitter',
                    lastName: providerData.name ? providerData.name.split(' ').slice(1).join(' ') : 'User',
                    apiKeyId,
                },
            });
        }
        else if (!user.apiKeyId) {
            user = await index_1.prisma.user.update({
                where: { id: user.id },
                data: { apiKeyId },
            });
        }
        const walletKeys = this.generateDeterministicWalletKeys(provider, providerId, user.id);
        const encryptedPrivateKey = this.encryptPrivateKey(walletKeys.privateKey);
        const wallet = await index_1.prisma.wallet.create({
            data: {
                address: walletKeys.address,
                publicKey: walletKeys.publicKey,
                encryptedPrivateKey,
                walletType: "SOCIAL_TWITTER",
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
    static async getUserWallets(userId) {
        const wallets = await index_1.prisma.wallet.findMany({
            where: {
                userId,
                isActive: true,
            },
            orderBy: {
                createdAt: "desc",
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
            throw new Error("WALLET_NOT_FOUND");
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
            throw new Error("WALLET_NOT_FOUND");
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
            throw new Error("WALLET_NOT_FOUND");
        }
        return this.decryptPrivateKey(wallet.encryptedPrivateKey);
    }
}
exports.WalletService = WalletService;
//# sourceMappingURL=walletService.js.map