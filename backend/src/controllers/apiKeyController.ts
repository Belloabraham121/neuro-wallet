import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { ApiKeyService } from '../services/apiKeyService';

export class ApiKeyController {
  /**
   * Create a new API key
   */
  static async createApiKey(req: Request, res: Response, next: NextFunction) {
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

      const { name, permissions, expiresAt } = req.body;
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

      const result = await ApiKeyService.createApiKey({
        userId,
        name,
        permissions,
        expiresAt,
      });

      res.status(201).json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      if (error.message === 'API_KEY_LIMIT_REACHED') {
        return res.status(400).json({
          success: false,
          error: {
            message: 'Maximum number of API keys reached',
            code: 'API_KEY_LIMIT_REACHED',
          },
        });
      }
      return next(error);
    }
  }

  /**
   * Get all API keys for authenticated user
   */
  static async getApiKeys(req: Request, res: Response, next: NextFunction) {
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

      const apiKeys = await ApiKeyService.getUserApiKeys(userId);

      res.json({
        success: true,
        data: {
          apiKeys,
          total: apiKeys.length,
        },
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * Get specific API key by ID
   */
  static async getApiKey(req: Request, res: Response, next: NextFunction) {
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

      const apiKey = await ApiKeyService.getApiKeyById(id, userId);

      if (!apiKey) {
        return res.status(404).json({
          success: false,
          error: {
            message: 'API key not found',
            code: 'API_KEY_NOT_FOUND',
          },
        });
      }

      res.json({
        success: true,
        data: { apiKey },
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * Update API key
   */
  static async updateApiKey(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { name, permissions } = req.body;
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

      const apiKey = await ApiKeyService.updateApiKey(id, userId, { name, permissions });

      res.json({
        success: true,
        data: { apiKey },
      });
    } catch (error: any) {
      if (error.message === 'API_KEY_NOT_FOUND') {
        return res.status(404).json({
          success: false,
          error: {
            message: 'API key not found',
            code: 'API_KEY_NOT_FOUND',
          },
        });
      }
      return next(error);
    }
  }

  /**
   * Delete API key
   */
  static async deleteApiKey(req: Request, res: Response, next: NextFunction) {
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

      await ApiKeyService.deleteApiKey(id, userId);

      res.json({
        success: true,
        data: {
          message: 'API key deleted successfully',
        },
      });
    } catch (error: any) {
      if (error.message === 'API_KEY_NOT_FOUND') {
        return res.status(404).json({
          success: false,
          error: {
            message: 'API key not found',
            code: 'API_KEY_NOT_FOUND',
          },
        });
      }
      return next(error);
    }
  }

  /**
   * Validate API key
   */
  static async validateApiKey(req: Request, res: Response, next: NextFunction) {
    try {
      const { apiKey } = req.body;

      if (!apiKey) {
        return res.status(400).json({
          success: false,
          error: {
            message: 'API key is required',
            code: 'API_KEY_REQUIRED',
          },
        });
      }

      const result = await ApiKeyService.validateApiKey(apiKey);

      if (!result) {
        return res.status(401).json({
          success: false,
          error: {
            message: 'Invalid API key',
            code: 'INVALID_API_KEY',
          },
        });
      }

      res.json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      if (error.message === 'API_KEY_EXPIRED') {
        return res.status(401).json({
          success: false,
          error: {
            message: 'API key has expired',
            code: 'API_KEY_EXPIRED',
          },
        });
      }
      if (error.message === 'USER_DEACTIVATED') {
        return res.status(401).json({
          success: false,
          error: {
            message: 'User account is deactivated',
            code: 'USER_DEACTIVATED',
          },
        });
      }
      return next(error);
    }
  }
}