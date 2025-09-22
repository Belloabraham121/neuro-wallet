"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAPIKeyRateLimit = exports.requireAdmin = exports.optionalJWT = exports.authenticateAPIKey = exports.authenticateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const index_1 = require("../index");
const logger_1 = require("../config/logger");
const authenticateJWT = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({
                success: false,
                error: {
                    message: 'Access token is required',
                    code: 'TOKEN_REQUIRED',
                },
            });
        }
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            logger_1.logger.error('JWT_SECRET is not configured');
            return res.status(500).json({
                success: false,
                error: {
                    message: 'Server configuration error',
                    code: 'SERVER_ERROR',
                },
            });
        }
        const decoded = jsonwebtoken_1.default.verify(token, jwtSecret);
        const user = await index_1.prisma.user.findUnique({
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
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            return res.status(401).json({
                success: false,
                error: {
                    message: 'Invalid token',
                    code: 'INVALID_TOKEN',
                },
            });
        }
        if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
            return res.status(401).json({
                success: false,
                error: {
                    message: 'Token has expired',
                    code: 'TOKEN_EXPIRED',
                },
            });
        }
        logger_1.logger.error('JWT authentication error:', error);
        return res.status(500).json({
            success: false,
            error: {
                message: 'Authentication failed',
                code: 'AUTH_ERROR',
            },
        });
    }
};
exports.authenticateJWT = authenticateJWT;
const authenticateAPIKey = async (req, res, next) => {
    try {
        const apiKey = req.headers['x-api-key'];
        if (!apiKey) {
            return res.status(401).json({
                success: false,
                error: {
                    message: 'API key is required',
                    code: 'API_KEY_REQUIRED',
                },
            });
        }
        const response = await fetch(`${process.env.BASE_URL || 'http://localhost:3000'}/api/keys/validate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ apiKey }),
        });
        const result = await response.json();
        if (!result.success) {
            return res.status(401).json(result);
        }
        req.user = result.data.user;
        req.apiKey = result.data.apiKey;
        next();
    }
    catch (error) {
        logger_1.logger.error('API key authentication error:', error);
        return res.status(500).json({
            success: false,
            error: {
                message: 'Authentication failed',
                code: 'AUTH_ERROR',
            },
        });
    }
};
exports.authenticateAPIKey = authenticateAPIKey;
const optionalJWT = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            return next();
        }
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            return next();
        }
        const decoded = jsonwebtoken_1.default.verify(token, jwtSecret);
        const user = await index_1.prisma.user.findUnique({
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
    }
    catch (error) {
        next();
    }
};
exports.optionalJWT = optionalJWT;
const requireAdmin = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({
            success: false,
            error: {
                message: 'Authentication required',
                code: 'AUTH_REQUIRED',
            },
        });
    }
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
exports.requireAdmin = requireAdmin;
const checkAPIKeyRateLimit = async (req, res, next) => {
    try {
        if (!req.apiKey) {
            return next();
        }
        const { rateLimit } = req.apiKey;
        if (!rateLimit) {
            return next();
        }
        const now = Date.now();
        const windowMs = 60 * 1000;
        next();
    }
    catch (error) {
        logger_1.logger.error('Rate limit check error:', error);
        next();
    }
};
exports.checkAPIKeyRateLimit = checkAPIKeyRateLimit;
//# sourceMappingURL=auth.js.map