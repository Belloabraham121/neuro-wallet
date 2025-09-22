import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { AuthService } from '../services/authService';
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

      if (!refreshToken) {
        return res.status(400).json({
          success: false,
          error: {
            message: 'Refresh token is required',
            code: 'REFRESH_TOKEN_REQUIRED',
          },
        });
      }

      await AuthService.logoutUser(refreshToken);

      res.json({
        success: true,
        data: {
          message: 'Logged out successfully',
        },
      });
    } catch (error) {
      return next(error);
    }
  }
}