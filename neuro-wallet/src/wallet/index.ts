import { EventEmitter } from "eventemitter3";
import {
  WalletInfo,
  CreateWalletOptions,
  NeuroWalletError,
  SDKEvents,
  SocialAuthOptions,
  SocialWalletResult,
  GoogleAuthOptions,
  PhoneAuthOptions,
} from "../types";

/**
 * Wallet Manager - Handles wallet creation, import, and management
 */
export class WalletManager extends EventEmitter<SDKEvents> {
  private client: any; // Will be properly typed when client is complete

  constructor(client: any) {
    super();
    this.client = client;
  }

  /**
   * Create a new wallet
   */
  async createWallet(_options: CreateWalletOptions = {}): Promise<WalletInfo> {
    try {
      // Implementation will be added
      throw new NeuroWalletError("Not implemented yet", "NOT_IMPLEMENTED");
    } catch (error) {
      this.emit("error", error);
      throw error;
    }
  }

  /**
   * Import an existing wallet
   */
  async importWallet(_privateKey: string): Promise<WalletInfo> {
    try {
      // Implementation will be added
      throw new NeuroWalletError("Not implemented yet", "NOT_IMPLEMENTED");
    } catch (error) {
      this.emit("error", error);
      throw error;
    }
  }

  /**
   * Get wallet information
   */
  async getWallet(_address: string): Promise<WalletInfo> {
    try {
      // Implementation will be added
      throw new NeuroWalletError("Not implemented yet", "NOT_IMPLEMENTED");
    } catch (error) {
      this.emit("error", error);
      throw error;
    }
  }

  /**
   * List all wallets
   */
  async listWallets(): Promise<WalletInfo[]> {
    try {
      // Implementation will be added
      throw new NeuroWalletError("Not implemented yet", "NOT_IMPLEMENTED");
    } catch (error) {
      this.emit("error", error);
      throw error;
    }
  }

  /**
   * Create a social wallet with Google authentication
   */
  async createSocialWalletGoogle(options: GoogleAuthOptions): Promise<SocialWalletResult> {
    try {
      const response = await this.client.api.post('/wallets/social/google', {
        provider: 'GOOGLE',
        providerId: options.userInfo?.email || 'google_user',
        providerData: {
          googleToken: options.googleToken,
          userInfo: options.userInfo,
        },
      });

      const result: SocialWalletResult = {
        wallet: {
          address: response.data.wallet.address,
          publicKey: response.data.wallet.publicKey,
          walletType: 'SOCIAL',
          isActive: response.data.wallet.isActive,
          metadata: response.data.wallet.metadata,
        },
        user: response.data.user,
        tokens: response.data.tokens,
      };

      this.emit('wallet:social:created', result);
      return result;
    } catch (error) {
      this.emit('error', error);
      throw new NeuroWalletError(
        error instanceof Error ? error.message : 'Failed to create Google social wallet',
        'SOCIAL_WALLET_CREATION_FAILED'
      );
    }
  }

  /**
   * Create a social wallet with phone authentication
   */
  async createSocialWalletPhone(options: PhoneAuthOptions): Promise<SocialWalletResult> {
    try {
      if (!options.verificationCode) {
        throw new NeuroWalletError('Verification code is required for phone authentication', 'VERIFICATION_CODE_REQUIRED');
      }

      const response = await this.client.api.post('/wallets/social/phone', {
        provider: 'PHONE',
        providerId: options.phoneNumber,
        verificationCode: options.verificationCode,
      });

      const result: SocialWalletResult = {
        wallet: {
          address: response.data.wallet.address,
          publicKey: response.data.wallet.publicKey,
          walletType: 'SOCIAL',
          isActive: response.data.wallet.isActive,
          metadata: response.data.wallet.metadata,
        },
        user: response.data.user,
        tokens: response.data.tokens,
      };

      this.emit('wallet:social:created', result);
      return result;
    } catch (error) {
      this.emit('error', error);
      throw new NeuroWalletError(
        error instanceof Error ? error.message : 'Failed to create phone social wallet',
        'SOCIAL_WALLET_CREATION_FAILED'
      );
    }
  }

  /**
   * Create a social wallet with generic social auth options
   */
  async createSocialWallet(options: SocialAuthOptions): Promise<SocialWalletResult> {
    try {
      if (options.provider === 'GOOGLE') {
         if (!options.providerData?.['googleToken']) {
           throw new NeuroWalletError('Google token is required', 'GOOGLE_TOKEN_REQUIRED');
         }
         return this.createSocialWalletGoogle({
           googleToken: options.providerData['googleToken'],
           userInfo: options.providerData['userInfo'],
         });
      } else if (options.provider === 'PHONE') {
        if (!options.verificationCode) {
          throw new NeuroWalletError('Verification code is required for phone authentication', 'VERIFICATION_CODE_REQUIRED');
        }
        return this.createSocialWalletPhone({
          phoneNumber: options.providerId,
          verificationCode: options.verificationCode,
        });
      } else {
        throw new NeuroWalletError(`Unsupported social provider: ${options.provider}`, 'UNSUPPORTED_PROVIDER');
      }
    } catch (error) {
      this.emit('error', error);
      throw error;
    }
  }
}

export * from "../types";
