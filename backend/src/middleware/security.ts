import { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { logger } from '../config/logger';

// CORS configuration
export const corsOptions = {
  origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:5173',
      'https://localhost:3000',
      'https://localhost:3001',
      'https://localhost:5173',
    ];
    
    // Add production origins from environment
    const prodOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [];
    allowedOrigins.push(...prodOrigins);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    } else {
      logger.warn(`CORS blocked origin: ${origin}`);
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

// Helmet configuration for security headers
export const helmetConfig = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
    },
  },
  crossOriginEmbedderPolicy: false,
});

// Request sanitization middleware
export const sanitizeInput = (req: Request, res: Response, next: NextFunction) => {
  // Remove any potential XSS attempts from request body
  if (req.body && typeof req.body === 'object') {
    req.body = sanitizeObject(req.body);
  }
  
  // Sanitize query parameters
  if (req.query && typeof req.query === 'object') {
    req.query = sanitizeObject(req.query);
  }
  
  next();
};

// Helper function to sanitize objects recursively
function sanitizeObject(obj: any): any {
  if (typeof obj !== 'object' || obj === null) {
    return sanitizeString(obj);
  }
  
  if (Array.isArray(obj)) {
    return obj.map(item => sanitizeObject(item));
  }
  
  const sanitized: any = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      sanitized[key] = sanitizeObject(obj[key]);
    }
  }
  
  return sanitized;
}

// Helper function to sanitize strings
function sanitizeString(value: any): any {
  if (typeof value !== 'string') {
    return value;
  }
  
  // Remove potential XSS patterns
  return value
    .replace(/<script[^>]*>.*?<\/script>/gi, '')
    .replace(/<[^>]+>/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .trim();
}

// Request logging middleware
export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  const { method, url, ip } = req;
  const userAgent = req.get('User-Agent') || 'Unknown';
  
  // Log request
  logger.info(`${method} ${url} - IP: ${ip} - User-Agent: ${userAgent}`);
  
  // Log response when finished
  res.on('finish', () => {
    const duration = Date.now() - start;
    const { statusCode } = res;
    
    if (statusCode >= 400) {
      logger.warn(`${method} ${url} - ${statusCode} - ${duration}ms - IP: ${ip}`);
    } else {
      logger.info(`${method} ${url} - ${statusCode} - ${duration}ms - IP: ${ip}`);
    }
  });
  
  next();
};

// Security headers middleware
export const securityHeaders = (req: Request, res: Response, next: NextFunction) => {
  // Remove server information
  res.removeHeader('X-Powered-By');
  
  // Add custom security headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
  
  next();
};

// IP whitelist middleware (for admin endpoints)
export const ipWhitelist = (allowedIPs: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const clientIP = req.ip || req.connection.remoteAddress || '';
    
    // Allow localhost in development
    if (process.env.NODE_ENV === 'development') {
      const localhostIPs = ['127.0.0.1', '::1', '::ffff:127.0.0.1'];
      if (localhostIPs.includes(clientIP)) {
        return next();
      }
    }
    
    if (!allowedIPs.includes(clientIP)) {
      logger.warn(`Access denied for IP: ${clientIP}`);
      return res.status(403).json({
        success: false,
        error: {
          message: 'Access denied',
          code: 'IP_NOT_ALLOWED',
        },
      });
    }
    
    next();
  };
};

// Request size limiter
export const requestSizeLimiter = (maxSize: string = '10mb') => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const contentLength = req.get('content-length');
    
    if (contentLength) {
      const sizeInBytes = parseInt(contentLength);
      const maxSizeInBytes = parseSize(maxSize);
      
      if (sizeInBytes > maxSizeInBytes) {
        logger.warn(`Request size exceeded: ${sizeInBytes} bytes from IP: ${req.ip}`);
        return res.status(413).json({
          success: false,
          error: {
            message: 'Request entity too large',
            code: 'REQUEST_TOO_LARGE',
          },
        }) as any;
      }
    }
    
    next();
  };
};

// Helper function to parse size strings (e.g., '10mb', '1gb')
function parseSize(size: string): number {
  const units: { [key: string]: number } = {
    b: 1,
    kb: 1024,
    mb: 1024 * 1024,
    gb: 1024 * 1024 * 1024,
  };
  
  const match = size.toLowerCase().match(/^(\d+(?:\.\d+)?)\s*(b|kb|mb|gb)$/);
  if (!match) {
    throw new Error(`Invalid size format: ${size}`);
  }
  
  const value = parseFloat(match[1]);
  const unit = match[2];
  
  return Math.floor(value * units[unit]);
}