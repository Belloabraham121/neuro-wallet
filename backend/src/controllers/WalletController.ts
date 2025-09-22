import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { WalletService } from '../services/walletService';

export class WalletController {
  /**
   * Create a new wallet
   */
  static async createWallet(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
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

      const { walletType, metadata } = req.body;
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

      const wallet = await WalletService.createWallet({
        userId,
        walletType,
        metadata,
      });

      res.status(201).json({
        success: true,
        data: { wallet },
      });
    } catch (error: any) {
      if (error.message === 'WALLET_LIMIT_REACHED') {
        return res.status(400).json({
          success: false,
          error: {
            message: 'Maximum number of wallets reached',
            code: 'WALLET_LIMIT_REACHED',
          },
        });
      }
      return next(error);
    }
  }

  /**
   * Create social wallet with Google
   */
  static async createSocialWalletGoogle(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
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

      const { provider, providerId, providerData } = req.body;

      const wallet = await WalletService.createSocialWalletGoogle({
        provider,
        providerId,
        providerData,
      });

      res.status(201).json({
        success: true,
        data: { wallet },
      });
    } catch (error: any) {
      if (error.message === 'INVALID_PROVIDER') {
        return res.status(400).json({
          success: false,
          error: {
            message: 'Invalid provider. Must be GOOGLE',
            code: 'INVALID_PROVIDER',
          },
        });
      }
      if (error.message === 'SOCIAL_WALLET_EXISTS') {
        return res.status(409).json({
          success: false,
          error: {
            message: 'Social wallet already exists for this provider',
            code: 'SOCIAL_WALLET_EXISTS',
          },
        });
      }
      if (error.message === 'EMAIL_REQUIRED') {
        return res.status(400).json({
          success: false,
          error: {
            message: 'Email is required from Google provider',
            code: 'EMAIL_REQUIRED',
          },
        });
      }
      return next(error);
    }
  }

  /**
   * Create social wallet with phone
   */
  static async createSocialWalletPhone(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
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

      const { provider, providerId, verificationCode, providerData } = req.body;

      const wallet = await WalletService.createSocialWalletPhone({
        provider,
        providerId,
        verificationCode,
        providerData,
      });

      res.status(201).json({
        success: true,
        data: { wallet },
      });
    } catch (error: any) {
      if (error.message === 'INVALID_PROVIDER') {
        return res.status(400).json({
          success: false,
          error: {
            message: 'Invalid provider. Must be PHONE',
            code: 'INVALID_PROVIDER',
          },
        });
      }
      if (error.message === 'INVALID_PHONE_FORMAT') {
        return res.status(400).json({
          success: false,
          error: {
            message: 'Invalid phone number format. Use international format (+1234567890)',
            code: 'INVALID_PHONE_FORMAT',
          },
        });
      }
      if (error.message === 'VERIFICATION_CODE_SENT') {
        return res.status(200).json({
          success: true,
          data: {
            message: 'Verification code sent to phone number',
            requiresVerification: true,
          },
        });
      }
      if (error.message === 'INVALID_VERIFICATION_CODE') {
        return res.status(400).json({
          success: false,
          error: {
            message: 'Invalid verification code',
            code: 'INVALID_VERIFICATION_CODE',
          },
        });
      }
      if (error.message === 'SOCIAL_WALLET_EXISTS') {
        return res.status(409).json({
          success: false,
          error: {
            message: 'Social wallet already exists for this phone number',
            code: 'SOCIAL_WALLET_EXISTS',
          },
        });
      }
      return next(error);
    }
  }

  /**
   * Get all wallets for the authenticated user
   */
  static async getUserWallets(req: Request, res: Response, next: NextFunction) {
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

      const wallets = await WalletService.getUserWallets(userId);

      res.json({
        success: true,
        data: {
          wallets,
          total: wallets.length,
        },
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * Get a specific wallet by ID
   */
  static async getWalletById(req: Request, res: Response, next: NextFunction) {
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

      const wallet = await WalletService.getWalletById(id, userId);

      if (!wallet) {
        return res.status(404).json({
          success: false,
          error: {
            message: 'Wallet not found',
            code: 'WALLET_NOT_FOUND',
          },
        });
      }

      res.json({
        success: true,
        data: { wallet },
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * Update wallet metadata
   */
  static async updateWallet(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { metadata } = req.body;
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

      if (!metadata || typeof metadata !== 'object') {
        return res.status(400).json({
          success: false,
          error: {
            message: 'Metadata is required and must be an object',
            code: 'INVALID_METADATA',
          },
        });
      }

      const wallet = await WalletService.updateWallet(id, userId, metadata);

      res.json({
        success: true,
        data: { wallet },
      });
    } catch (error: any) {
      if (error.message === 'WALLET_NOT_FOUND') {
        return res.status(404).json({
          success: false,
          error: {
            message: 'Wallet not found',
            code: 'WALLET_NOT_FOUND',
          },
        });
      }
      return next(error);
    }
  }

  /**
   * Delete a wallet
   */
  static async deleteWallet(req: Request, res: Response, next: NextFunction) {
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

      await WalletService.deleteWallet(id, userId);

      res.json({
        success: true,
        data: {
          message: 'Wallet deleted successfully',
        },
      });
    } catch (error: any) {
      if (error.message === 'WALLET_NOT_FOUND') {
        return res.status(404).json({
          success: false,
          error: {
            message: 'Wallet not found',
            code: 'WALLET_NOT_FOUND',
          },
        });
      }
      return next(error);
    }
  }
}