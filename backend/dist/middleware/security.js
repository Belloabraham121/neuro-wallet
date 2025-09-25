"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestSizeLimiter = exports.ipWhitelist = exports.securityHeaders = exports.requestLogger = exports.sanitizeInput = exports.helmetConfig = exports.corsOptions = void 0;
const helmet_1 = __importDefault(require("helmet"));
const logger_1 = require("../config/logger");
exports.corsOptions = {
    origin: function (origin, callback) {
        if (!origin)
            return callback(null, true);
        const allowedOrigins = [
            'http://localhost:3000',
            'http://localhost:3001',
            'http://localhost:5173',
            'https://localhost:3000',
            'https://localhost:3001',
            'https://localhost:5173',
        ];
        const prodOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [];
        allowedOrigins.push(...prodOrigins);
        if (allowedOrigins.indexOf(origin) !== -1) {
            return callback(null, true);
        }
        else {
            logger_1.logger.warn(`CORS blocked origin: ${origin}`);
            return callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200,
};
exports.helmetConfig = (0, helmet_1.default)({
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
const sanitizeInput = (req, res, next) => {
    if (req.body && typeof req.body === 'object') {
        req.body = sanitizeObject(req.body);
    }
    if (req.query && typeof req.query === 'object') {
        req.query = sanitizeObject(req.query);
    }
    next();
};
exports.sanitizeInput = sanitizeInput;
function sanitizeObject(obj) {
    if (typeof obj !== 'object' || obj === null) {
        return sanitizeString(obj);
    }
    if (Array.isArray(obj)) {
        return obj.map(item => sanitizeObject(item));
    }
    const sanitized = {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            sanitized[key] = sanitizeObject(obj[key]);
        }
    }
    return sanitized;
}
function sanitizeString(value) {
    if (typeof value !== 'string') {
        return value;
    }
    return value
        .replace(/<script[^>]*>.*?<\/script>/gi, '')
        .replace(/<[^>]+>/g, '')
        .replace(/javascript:/gi, '')
        .replace(/on\w+\s*=/gi, '')
        .trim();
}
const requestLogger = (req, res, next) => {
    const start = Date.now();
    const { method, url, ip } = req;
    const userAgent = req.get('User-Agent') || 'Unknown';
    logger_1.logger.info(`${method} ${url} - IP: ${ip} - User-Agent: ${userAgent}`);
    res.on('finish', () => {
        const duration = Date.now() - start;
        const { statusCode } = res;
        if (statusCode >= 400) {
            logger_1.logger.warn(`${method} ${url} - ${statusCode} - ${duration}ms - IP: ${ip}`);
        }
        else {
            logger_1.logger.info(`${method} ${url} - ${statusCode} - ${duration}ms - IP: ${ip}`);
        }
    });
    next();
};
exports.requestLogger = requestLogger;
const securityHeaders = (req, res, next) => {
    res.removeHeader('X-Powered-By');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
    next();
};
exports.securityHeaders = securityHeaders;
const ipWhitelist = (allowedIPs) => {
    return (req, res, next) => {
        const clientIP = req.ip || req.connection.remoteAddress || '';
        if (process.env.NODE_ENV === 'development') {
            const localhostIPs = ['127.0.0.1', '::1', '::ffff:127.0.0.1'];
            if (localhostIPs.includes(clientIP)) {
                return next();
            }
        }
        if (!allowedIPs.includes(clientIP)) {
            logger_1.logger.warn(`Access denied for IP: ${clientIP}`);
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
exports.ipWhitelist = ipWhitelist;
const requestSizeLimiter = (maxSize = '10mb') => {
    return (req, res, next) => {
        const contentLength = req.get('content-length');
        if (contentLength) {
            const sizeInBytes = parseInt(contentLength);
            const maxSizeInBytes = parseSize(maxSize);
            if (sizeInBytes > maxSizeInBytes) {
                logger_1.logger.warn(`Request size exceeded: ${sizeInBytes} bytes from IP: ${req.ip}`);
                return res.status(413).json({
                    success: false,
                    error: {
                        message: 'Request entity too large',
                        code: 'REQUEST_TOO_LARGE',
                    },
                });
            }
        }
        next();
    };
};
exports.requestSizeLimiter = requestSizeLimiter;
function parseSize(size) {
    const units = {
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
//# sourceMappingURL=security.js.map