import rateLimit from 'express-rate-limit';

import { Request, Response, NextFunction } from 'express';

// Rate limiting configuration for different actions
const rateLimiters = {
  'transaction_create': rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // limit each IP to 10 requests per windowMs
    message: 'Too many transaction creation attempts from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req: Request, res: Response, next: NextFunction) => {
      res.status(429).json({
        error: 'Rate limit exceeded',
        message: 'Too many transaction creation attempts from this IP, please try again later.'
      });
    }
  }),
  'transaction_read': rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many transaction read attempts from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req: Request, res: Response, next: NextFunction) => {
      res.status(429).json({
        error: 'Rate limit exceeded',
        message: 'Too many transaction read attempts from this IP, please try again later.'
      });
    }
  }),
  // Add more actions as needed
};

/**
 * Validate and apply rate limiting based on the action
 */
export const validateRateLimit = (action: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const limiter = rateLimiters[action as keyof typeof rateLimiters];
    if (!limiter) {
      return res.status(400).json({
        error: 'Invalid rate limit action',
        message: `Rate limiting not configured for action: ${action}`
      });
    }
    return limiter(req, res, next);
  };
};