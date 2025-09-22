import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../index';
import { logger } from '../config/logger';

interface AuthUser {
  id: string;
  email: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface AuthApiKey {
  id: string;
  name: string;
  permissions: any;
  rateLimit?: number;
}

// Extend Request interface to include user
declare module 'express-serve-static-core' {
  interface Request {
    user?: AuthUser;
    apiKey?: AuthApiKey;
  }
}

// JWT Authentication middleware
export const authenticateJWT = async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({
        success: false,
        error: {
          message: 'Access token is required',
          code: 'TOKEN_REQUIRED',
        },
      });
    }

    const jwtSecret = process.env.JWT_SECRET as string;
    if (!jwtSecret) {
      logger.error('JWT_SECRET is not configured');
      return res.status(500).json({
        success: false,
        error: {
          message: 'Server configuration error',
          code: 'SERVER_ERROR',
        },
      });
    }

    const decoded = jwt.verify(token, jwtSecret) as any;
    
    // Fetch user from database to ensure they still exist and are active
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        error: {
          message: 'User not found',
          code: 'USER_NOT_FOUND',
        },
      });
    }

    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        error: {
          message: 'User account is deactivated',
          code: 'USER_DEACTIVATED',
        },
      });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        success: false,
        error: {
          message: 'Invalid token',
          code: 'INVALID_TOKEN',
        },
      });
    }

    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        success: false,
        error: {
          message: 'Token has expired',
          code: 'TOKEN_EXPIRED',
        },
      });
    }

    logger.error('JWT authentication error:', error);
    return res.status(500).json({
      success: false,
      error: {
        message: 'Authentication failed',
        code: 'AUTH_ERROR',
      },
    });
  }
};

// API Key Authentication middleware
export const authenticateAPIKey = async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
  try {
    const apiKey = req.headers['x-api-key'] as string;

    if (!apiKey) {
      return res.status(401).json({
        success: false,
        error: {
          message: 'API key is required',
          code: 'API_KEY_REQUIRED',
        },
      });
    }

    // Validate API key using internal validation endpoint
    const response = await fetch(`${process.env.BASE_URL || 'http://localhost:3000'}/api/keys/validate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ apiKey }),
    });

    const result = await response.json() as any;

    if (!result.success) {
      return res.status(401).json(result);
    }

    req.user = result.data.user;
    req.apiKey = result.data.apiKey;
    next();
  } catch (error) {
    logger.error('API key authentication error:', error);
    return res.status(500).json({
      success: false,
      error: {
        message: 'Authentication failed',
        code: 'AUTH_ERROR',
      },
    });
  }
};

// Optional JWT Authentication (doesn't fail if no token)
export const optionalJWT = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return next(); // Continue without authentication
    }

    const jwtSecret = process.env.JWT_SECRET as string;
    if (!jwtSecret) {
      return next(); // Continue without authentication
    }

    const decoded = jwt.verify(token, jwtSecret) as any;
    
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (user && user.isActive) {
      req.user = user;
    }

    next();
  } catch (error) {
    // Continue without authentication on any error
    next();
  }
};

// Admin role check middleware (use after JWT authentication)
export const requireAdmin = (req: Request, res: Response, next: NextFunction): void | Response => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      error: {
        message: 'Authentication required',
        code: 'AUTH_REQUIRED',
      },
    });
  }

  // Check if user has admin role (you might need to add role field to User model)
  // For now, we'll check if user email is in admin list from environment
  const adminEmails = (process.env.ADMIN_EMAILS || '').split(',').map(email => email.trim());
  
  if (!adminEmails.includes(req.user.email)) {
    return res.status(403).json({
      success: false,
      error: {
        message: 'Admin access required',
        code: 'ADMIN_REQUIRED',
      },
    });
  }

  next();
};

// Rate limiting check for API keys
export const checkAPIKeyRateLimit = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.apiKey) {
      return next(); // Skip if no API key
    }

    const { rateLimit } = req.apiKey;
    
    if (!rateLimit) {
      return next(); // No rate limit set
    }

    // Simple in-memory rate limiting (in production, use Redis)
    // This is a basic implementation - you should use a proper rate limiting solution
    const now = Date.now();
    const windowMs = 60 * 1000; // 1 minute window
    
    // You would implement proper rate limiting logic here
    // For now, we'll just continue
    next();
  } catch (error) {
    logger.error('Rate limit check error:', error);
    next();
  }
};