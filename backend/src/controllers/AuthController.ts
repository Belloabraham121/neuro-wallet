import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { AuthService } from '../services/authService';
import { PhoneAuthService } from '../services/phoneAuthService';
import { logger } from '../config/logger';

export class AuthController {
  /**
   * Register a new user
   */
  static async register(req: Request, res: Response, next: NextFunction) {
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

      const { email, password, firstName, lastName } = req.body;
      const ipAddress = req.ip;
      const userAgent = req.get('User-Agent');

      const result = await AuthService.registerUser(
        { email, password, firstName, lastName },
        ipAddress,
        userAgent
      );

      res.status(201).json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      if (error.message === 'USER_EXISTS') {
        return res.status(409).json({
          success: false,
          error: {
            message: 'User already exists with this email',
            code: 'USER_EXISTS',
          },
        });
      }
      return next(error);
    }
  }

  /**
   * Login user
   */
  static async login(req: Request, res: Response, next: NextFunction) {
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

      const { email, password } = req.body;
      const ipAddress = req.ip;
      const userAgent = req.get('User-Agent');

      const result = await AuthService.loginUser(
        { email, password },
        ipAddress,
        userAgent
      );

      res.json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      if (error.message === 'INVALID_CREDENTIALS') {
        return res.status(401).json({
          success: false,
          error: {
            message: 'Invalid email or password',
            code: 'INVALID_CREDENTIALS',
          },
        });
      }
      return next(error);
    }
  }

  /**
   * Handle Google OAuth callback
   */
  static async googleCallback(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const user = req.user as any;
      if (!user) {
        return res.status(401).json({
          success: false,
          error: {
            message: 'Google authentication failed',
            code: 'GOOGLE_AUTH_FAILED',
          },
        });
      }

      const ipAddress = req.ip;
      const userAgent = req.get('User-Agent');

      const result = await AuthService.handleGoogleAuth(
        user,
        ipAddress,
        userAgent
      );

      // Redirect to frontend with tokens
      const frontendUrl = process.env.CORS_ORIGIN || 'http://localhost:3000';
      const redirectUrl = `${frontendUrl}/auth/callback?token=${result.tokens.accessToken}&refresh=${result.tokens.refreshToken}`;
      
      res.redirect(redirectUrl);
    } catch (error: any) {
      logger.error('Google OAuth error:', error);
      const frontendUrl = process.env.CORS_ORIGIN || 'http://localhost:3000';
      res.redirect(`${frontendUrl}/auth/error?message=authentication_failed`);
    }
  }

  /**
   * Refresh access token
   */
  static async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        return res.status(400).json({
          success: false,
          error: {
            message: 'Refresh token is required',
            code: 'REFRESH_TOKEN_REQUIRED',
          },
        });
      }

      const tokens = await AuthService.refreshToken(refreshToken);

      res.json({
        success: true,
        data: { tokens },
      });
    } catch (error: any) {
      if (error.message === 'INVALID_REFRESH_TOKEN') {
        return res.status(401).json({
          success: false,
          error: {
            message: 'Invalid or expired refresh token',
            code: 'INVALID_REFRESH_TOKEN',
          },
        });
      }
      return next(error);
    }
  }

  /**
   * Logout user
   */
  static async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.body;
      const userId = (req as any).user?.id;

      if (!refreshToken || !userId) {
        return res.status(400).json({
          success: false,
          error: {
            message: 'Refresh token and user ID are required',
            code: 'MISSING_REQUIRED_FIELDS',
          },
        });
      }

      await AuthService.logoutUser(refreshToken);

      res.json({
        success: true,
        message: 'Logged out successfully',
      });
    } catch (error: any) {
      return next(error);
    }
  }

  /**
   * Send phone verification code
   */
  static async sendPhoneVerificationCode(req: Request, res: Response, next: NextFunction) {
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

      const { phoneNumber } = req.body;
      await PhoneAuthService.sendVerificationCode({ phoneNumber });

      res.json({
        success: true,
        message: 'Verification code sent successfully',
      });
    } catch (error: any) {
      if (error.message === 'RATE_LIMITED') {
        return res.status(429).json({
          success: false,
          error: {
            message: 'Too many requests. Please try again later.',
            code: 'RATE_LIMITED',
          },
        });
      }
      return next(error);
    }
  }

  /**
   * Verify phone number
   */
  static async verifyPhoneNumber(req: Request, res: Response, next: NextFunction) {
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

      const { phoneNumber, verificationCode } = req.body;
      const result = await PhoneAuthService.verifyPhoneNumber({ phoneNumber, verificationCode });
      const isValid = result.success;

      if (!isValid) {
        return res.status(400).json({
          success: false,
          error: {
            message: 'Invalid or expired verification code',
            code: 'INVALID_CODE',
          },
        });
      }

      res.json({
        success: true,
        message: 'Phone number verified successfully',
      });
    } catch (error: any) {
      return next(error);
    }
  }

  /**
   * Phone login
   */
  static async phoneLogin(req: Request, res: Response, next: NextFunction) {
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

      const { phoneNumber, verificationCode } = req.body;
      const ipAddress = req.ip;
      const userAgent = req.get('User-Agent');

      // Verify the code first
      const verifyResult = await PhoneAuthService.verifyPhoneNumber({ phoneNumber, verificationCode });
      if (!verifyResult.success) {
        return res.status(400).json({
          success: false,
          error: {
            message: 'Invalid or expired verification code',
            code: 'INVALID_CODE',
          },
        });
      }

      // Handle phone authentication (create user if doesn't exist)
      const result = await AuthService.handlePhoneAuth(
        phoneNumber,
        ipAddress,
        userAgent
      );

      res.json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      return next(error);
    }
  }
}