import crypto from "crypto";
import { prisma } from "../index";
import { logger } from "../config/logger";
import { PhoneAuthService } from "./phoneAuthService";

export interface CreateWalletData {
  userId: string;
  walletType?: "STANDARD" | "SOCIAL_GOOGLE" | "SOCIAL_PHONE" | "MULTISIG";
  metadata?: Record<string, any>;
}

export interface SocialWalletData {
  provider: "GOOGLE" | "PHONE";
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

export class WalletService {
  /**
   * Encrypt private key for secure storage
   */
  static encryptPrivateKey(privateKey: string): string {
    const algorithm = "aes-256-cbc";
    const key = crypto.scryptSync(
      process.env.ENCRYPTION_KEY || "default-key",
      "salt",
      32
    );
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, key, iv);

    let encrypted = cipher.update(privateKey, "utf8", "hex");
    encrypted += cipher.final("hex");

    return iv.toString("hex") + ":" + encrypted;
  }

  /**
   * Decrypt private key
   */
  static decryptPrivateKey(encryptedKey: string): string {
    const algorithm = "aes-256-cbc";
    const key = crypto.scryptSync(
      process.env.ENCRYPTION_KEY || "default-key",
      "salt",
      32
    );

    const [ivHex, encrypted] = encryptedKey.split(":");
    const iv = Buffer.from(ivHex, "hex");
    const decipher = crypto.createDecipheriv(algorithm, key, iv);

    let decrypted = decipher.update(encrypted, "hex", "utf8");
    decrypted += decipher.final("utf8");

    return decrypted;
  }

  /**
   * Generate deterministic wallet keys for social authentication
   */
  static generateDeterministicWalletKeys(
    provider: string,
    providerId: string,
    userSalt?: string
  ): WalletKeys {
    // Create deterministic seed from provider data
    const seedData = `${provider}:${providerId}:${userSalt || process.env.WALLET_SEED_SALT || 'default-salt'}`;
    const seed = crypto.createHash('sha256').update(seedData).digest();
    
    // Generate deterministic private key
    const privateKey = crypto.createHash('sha256').update(seed).digest('hex');
    
    // In a real implementation, you would use proper Stacks key generation
    // This is a simplified version for demonstration
    const publicKeyHash = crypto.createHash('sha256').update(privateKey + 'public').digest();
    const publicKey = publicKeyHash.toString('hex').substring(0, 66); // 33 bytes * 2
    
    const addressHash = crypto.createHash('ripemd160').update(publicKeyHash).digest();
    const address = addressHash.toString('hex').substring(0, 38); // 19 bytes * 2

    return {
      address: `ST${address.toUpperCase()}`,
      publicKey,
      privateKey,
    };
  }

  /**
   * Generate random wallet keys for standard wallets (simplified - in production use proper Stacks key generation)
   */
  static generateWalletKeys(): WalletKeys {
    // This is a simplified implementation
    // In production, use proper Stacks key generation libraries
    const privateKey = crypto.randomBytes(32).toString("hex");
    const publicKey = crypto.randomBytes(33).toString("hex");
    const address = "ST" + crypto.randomBytes(19).toString("hex").toUpperCase();

    return {
      address,
      publicKey,
      privateKey,
    };
  }

  /**
   * Create a new wallet
   */
  static async createWallet(data: CreateWalletData): Promise<WalletResponse> {
    const { userId, walletType = "STANDARD", metadata = {} } = data;

    // Check if user has reached wallet limit
    const existingWalletsCount = await prisma.wallet.count({
      where: {
        userId,
        isActive: true,
      },
    });

    const maxWallets = parseInt(process.env.MAX_WALLETS_PER_USER || "5");
    if (existingWalletsCount >= maxWallets) {
      throw new Error("WALLET_LIMIT_REACHED");
    }

    // Generate random wallet keys for standard wallets
    const walletKeys = this.generateWalletKeys();
    const encryptedPrivateKey = this.encryptPrivateKey(walletKeys.privateKey);

    // Create wallet record
    const wallet = await prisma.wallet.create({
      data: {
        address: walletKeys.address,
        publicKey: walletKeys.publicKey,
        encryptedPrivateKey,
        walletType,
        metadata,
        userId,
      },
    });

    logger.info(`Wallet created: ${wallet.id} for user: ${userId}`);

    return {
      id: wallet.id,
      address: wallet.address,
      walletType: wallet.walletType,
      isActive: wallet.isActive,
      metadata: wallet.metadata as Record<string, any>,
      createdAt: wallet.createdAt,
      updatedAt: wallet.updatedAt,
    };
  }

  /**
   * Create social wallet with Google authentication
   */
  static async createSocialWalletGoogle(
    socialData: SocialWalletData
  ): Promise<WalletResponse> {
    const { provider, providerId, providerData = {} } = socialData;

    if (provider !== "GOOGLE") {
      throw new Error("INVALID_PROVIDER");
    }

    // Check if social auth mapping already exists
    const existingSocialMapping = await prisma.socialAuthMapping.findFirst({
      where: {
        provider,
        providerId,
      },
    });

    if (existingSocialMapping) {
      throw new Error("SOCIAL_WALLET_EXISTS");
    }

    // For Google, we would typically verify the Google token here
    // This is a simplified implementation

    // Create or find user based on Google data
    const email = providerData.email as string;
    if (!email) {
      throw new Error("EMAIL_REQUIRED");
    }

    let user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // Create new user
      user = await prisma.user.create({
        data: {
          email,
          firstName: (providerData.firstName as string) || "",
          lastName: (providerData.lastName as string) || "",
        },
      });
    }

    // Generate deterministic wallet keys for phone auth
    const walletKeys = this.generateDeterministicWalletKeys(
      provider,
      providerId,
      user.id // Use user ID as additional salt
    );
    const encryptedPrivateKey = this.encryptPrivateKey(walletKeys.privateKey);

    // Create wallet
    const wallet = await prisma.wallet.create({
      data: {
        address: walletKeys.address,
        publicKey: walletKeys.publicKey,
        encryptedPrivateKey,
        walletType: "SOCIAL_GOOGLE",
        metadata: { provider, providerId },
        userId: user.id,
      },
    });

    // Create social auth mapping record
    await prisma.socialAuthMapping.create({
      data: {
        provider,
        providerId,
        providerData,
        walletId: wallet.id,
        userId: user.id,
        isVerified: true,
      },
    });

    logger.info(
      `Social wallet created: ${wallet.id} for provider: ${provider}`
    );

    return {
      id: wallet.id,
      address: wallet.address,
      walletType: wallet.walletType,
      isActive: wallet.isActive,
      metadata: wallet.metadata as Record<string, any>,
      createdAt: wallet.createdAt,
      updatedAt: wallet.updatedAt,
    };
  }

  /**
   * Create social wallet with phone authentication
   */
  static async createSocialWalletPhone(
    socialData: SocialWalletData
  ): Promise<WalletResponse> {
    const {
      provider,
      providerId,
      verificationCode,
      providerData = {},
    } = socialData;

    if (provider !== "PHONE") {
      throw new Error("INVALID_PROVIDER");
    }

    // Verify phone number format
    const phoneRegex = /^\+[1-9]\d{1,14}$/;
    if (!phoneRegex.test(providerId)) {
      throw new Error("INVALID_PHONE_FORMAT");
    }

    if (!verificationCode) {
      // Send verification code using PhoneAuthService
      const result = await PhoneAuthService.sendVerificationCode({
        phoneNumber: providerId,
      });
      
      if (!result.success) {
        throw new Error(result.message);
      }
      
      throw new Error("VERIFICATION_CODE_SENT");
    }

    // Verify the code using PhoneAuthService
    const verificationResult = await PhoneAuthService.verifyPhoneNumber({
      phoneNumber: providerId,
      verificationCode,
    });

    if (!verificationResult.success) {
      throw new Error(verificationResult.message);
    }

    // Check if social auth mapping already exists
    const existingSocialMapping = await prisma.socialAuthMapping.findFirst({
      where: {
        provider,
        providerId,
      },
    });

    if (existingSocialMapping) {
      throw new Error("SOCIAL_WALLET_EXISTS");
    }

    // Create user for phone authentication
    const user = await prisma.user.create({
      data: {
        email: `${providerId.replace("+", "")}@phone.local`, // Temporary email
        firstName: "Phone",
        lastName: "User",
      },
    });

    // Generate wallet keys
    const walletKeys = this.generateWalletKeys();
    const encryptedPrivateKey = this.encryptPrivateKey(walletKeys.privateKey);

    // Create wallet
    const wallet = await prisma.wallet.create({
      data: {
        address: walletKeys.address,
        publicKey: walletKeys.publicKey,
        encryptedPrivateKey,
        walletType: "SOCIAL_PHONE",
        metadata: { provider, providerId },
        userId: user.id,
      },
    });

    // Create social auth mapping record
    await prisma.socialAuthMapping.create({
      data: {
        provider,
        providerId,
        providerData,
        walletId: wallet.id,
        userId: user.id,
        isVerified: true,
      },
    });

    logger.info(`Social wallet created: ${wallet.id} for phone: ${providerId}`);

    return {
      id: wallet.id,
      address: wallet.address,
      walletType: wallet.walletType,
      isActive: wallet.isActive,
      metadata: wallet.metadata as Record<string, any>,
      createdAt: wallet.createdAt,
      updatedAt: wallet.updatedAt,
    };
  }

  /**
   * Get all wallets for a user
   */
  static async getUserWallets(userId: string): Promise<WalletResponse[]> {
    const wallets = await prisma.wallet.findMany({
      where: {
        userId,
        isActive: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return wallets.map((wallet: any) => ({
      id: wallet.id,
      address: wallet.address,
      walletType: wallet.walletType,
      isActive: wallet.isActive,
      metadata: wallet.metadata as Record<string, any>,
      createdAt: wallet.createdAt,
      updatedAt: wallet.updatedAt,
    }));
  }

  /**
   * Get a specific wallet by ID
   */
  static async getWalletById(
    walletId: string,
    userId: string
  ): Promise<WalletResponse | null> {
    const wallet = await prisma.wallet.findFirst({
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
      metadata: wallet.metadata as Record<string, any>,
      createdAt: wallet.createdAt,
      updatedAt: wallet.updatedAt,
    };
  }

  /**
   * Update wallet metadata
   */
  static async updateWallet(
    walletId: string,
    userId: string,
    metadata: Record<string, any>
  ): Promise<WalletResponse> {
    const wallet = await prisma.wallet.findFirst({
      where: {
        id: walletId,
        userId,
        isActive: true,
      },
    });

    if (!wallet) {
      throw new Error("WALLET_NOT_FOUND");
    }

    const updatedWallet = await prisma.wallet.update({
      where: { id: walletId },
      data: { metadata },
    });

    logger.info(`Wallet updated: ${walletId}`);

    return {
      id: updatedWallet.id,
      address: updatedWallet.address,
      walletType: updatedWallet.walletType,
      isActive: updatedWallet.isActive,
      metadata: updatedWallet.metadata as Record<string, any>,
      createdAt: updatedWallet.createdAt,
      updatedAt: updatedWallet.updatedAt,
    };
  }

  /**
   * Delete (deactivate) a wallet
   */
  static async deleteWallet(walletId: string, userId: string): Promise<void> {
    const wallet = await prisma.wallet.findFirst({
      where: {
        id: walletId,
        userId,
        isActive: true,
      },
    });

    if (!wallet) {
      throw new Error("WALLET_NOT_FOUND");
    }

    await prisma.wallet.update({
      where: { id: walletId },
      data: { isActive: false },
    });

    logger.info(`Wallet deleted: ${walletId}`);
  }

  /**
   * Get wallet private key (decrypted)
   */
  static async getWalletPrivateKey(
    walletId: string,
    userId: string
  ): Promise<string> {
    const wallet = await prisma.wallet.findFirst({
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
