import rateLimit from 'express-rate-limit';
import { Request, Response } from 'express';
import { logger } from '../config/logger';

// General API rate limiter
export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    success: false,
    error: {
      message: 'Too many requests from this IP, please try again later.',
      code: 'RATE_LIMITED',
    },
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req: Request, res: Response) => {
    logger.warn(`Rate limit exceeded for IP: ${req.ip}`);
    res.status(429).json({
      success: false,
      error: {
        message: 'Too many requests from this IP, please try again later.',
        code: 'RATE_LIMITED',
      },
    });
  },
});

// Strict rate limiter for authentication endpoints
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 auth requests per windowMs
  message: {
    success: false,
    error: {
      message: 'Too many authentication attempts, please try again later.',
      code: 'AUTH_RATE_LIMITED',
    },
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true, // Don't count successful requests
  handler: (req: Request, res: Response) => {
    logger.warn(`Auth rate limit exceeded for IP: ${req.ip}`);
    res.status(429).json({
      success: false,
      error: {
        message: 'Too many authentication attempts, please try again later.',
        code: 'AUTH_RATE_LIMITED',
      },
    });
  },
});

// Phone verification rate limiter
export const phoneVerificationLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 1, // Limit each IP to 1 phone verification request per minute
  message: {
    success: false,
    error: {
      message: 'Please wait before requesting another verification code.',
      code: 'PHONE_RATE_LIMITED',
    },
  },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req: Request) => {
    // Rate limit by phone number if provided, otherwise by IP
    const phoneNumber = req.body?.phoneNumber;
    return phoneNumber ? `phone:${phoneNumber}` : `ip:${req.ip}`;
  },
  handler: (req: Request, res: Response) => {
    const phoneNumber = req.body?.phoneNumber;
    logger.warn(`Phone verification rate limit exceeded for ${phoneNumber ? `phone: ${phoneNumber}` : `IP: ${req.ip}`}`);
    res.status(429).json({
      success: false,
      error: {
        message: 'Please wait before requesting another verification code.',
        code: 'PHONE_RATE_LIMITED',
      },
    });
  },
});

// Wallet creation rate limiter
export const walletCreationLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // Limit each IP to 10 wallet creations per hour
  message: {
    success: false,
    error: {
      message: 'Too many wallet creation attempts, please try again later.',
      code: 'WALLET_CREATION_RATE_LIMITED',
    },
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req: Request, res: Response) => {
    logger.warn(`Wallet creation rate limit exceeded for IP: ${req.ip}`);
    res.status(429).json({
      success: false,
      error: {
        message: 'Too many wallet creation attempts, please try again later.',
        code: 'WALLET_CREATION_RATE_LIMITED',
      },
    });
  },
});

// API key rate limiter (more generous for authenticated requests)
export const apiKeyLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // Limit each API key to 1000 requests per windowMs
  message: {
    success: false,
    error: {
      message: 'API rate limit exceeded, please try again later.',
      code: 'API_RATE_LIMITED',
    },
  },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req: Request) => {
    // Rate limit by API key if provided, otherwise by IP
    const apiKey = req.headers['x-api-key'] as string;
    return apiKey ? `api:${apiKey}` : `ip:${req.ip}`;
  },
  handler: (req: Request, res: Response) => {
    const apiKey = req.headers['x-api-key'] as string;
    logger.warn(`API rate limit exceeded for ${apiKey ? `API key: ${apiKey.substring(0, 8)}...` : `IP: ${req.ip}`}`);
    res.status(429).json({
      success: false,
      error: {
        message: 'API rate limit exceeded, please try again later.',
        code: 'API_RATE_LIMITED',
      },
    });
  },
});