"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiKeyLimiter = exports.walletCreationLimiter = exports.phoneVerificationLimiter = exports.authLimiter = exports.generalLimiter = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const logger_1 = require("../config/logger");
exports.generalLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: {
        success: false,
        error: {
            message: 'Too many requests from this IP, please try again later.',
            code: 'RATE_LIMITED',
        },
    },
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
        logger_1.logger.warn(`Rate limit exceeded for IP: ${req.ip}`);
        res.status(429).json({
            success: false,
            error: {
                message: 'Too many requests from this IP, please try again later.',
                code: 'RATE_LIMITED',
            },
        });
    },
});
exports.authLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: {
        success: false,
        error: {
            message: 'Too many authentication attempts, please try again later.',
            code: 'AUTH_RATE_LIMITED',
        },
    },
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: true,
    handler: (req, res) => {
        logger_1.logger.warn(`Auth rate limit exceeded for IP: ${req.ip}`);
        res.status(429).json({
            success: false,
            error: {
                message: 'Too many authentication attempts, please try again later.',
                code: 'AUTH_RATE_LIMITED',
            },
        });
    },
});
exports.phoneVerificationLimiter = (0, express_rate_limit_1.default)({
    windowMs: 60 * 1000,
    max: 1,
    message: {
        success: false,
        error: {
            message: 'Please wait before requesting another verification code.',
            code: 'PHONE_RATE_LIMITED',
        },
    },
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: (req) => {
        const phoneNumber = req.body?.phoneNumber;
        return phoneNumber ? `phone:${phoneNumber}` : `ip:${req.ip}`;
    },
    handler: (req, res) => {
        const phoneNumber = req.body?.phoneNumber;
        logger_1.logger.warn(`Phone verification rate limit exceeded for ${phoneNumber ? `phone: ${phoneNumber}` : `IP: ${req.ip}`}`);
        res.status(429).json({
            success: false,
            error: {
                message: 'Please wait before requesting another verification code.',
                code: 'PHONE_RATE_LIMITED',
            },
        });
    },
});
exports.walletCreationLimiter = (0, express_rate_limit_1.default)({
    windowMs: 60 * 60 * 1000,
    max: 10,
    message: {
        success: false,
        error: {
            message: 'Too many wallet creation attempts, please try again later.',
            code: 'WALLET_CREATION_RATE_LIMITED',
        },
    },
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
        logger_1.logger.warn(`Wallet creation rate limit exceeded for IP: ${req.ip}`);
        res.status(429).json({
            success: false,
            error: {
                message: 'Too many wallet creation attempts, please try again later.',
                code: 'WALLET_CREATION_RATE_LIMITED',
            },
        });
    },
});
exports.apiKeyLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 1000,
    message: {
        success: false,
        error: {
            message: 'API rate limit exceeded, please try again later.',
            code: 'API_RATE_LIMITED',
        },
    },
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: (req) => {
        const apiKey = req.headers['x-api-key'];
        return apiKey ? `api:${apiKey}` : `ip:${req.ip}`;
    },
    handler: (req, res) => {
        const apiKey = req.headers['x-api-key'];
        logger_1.logger.warn(`API rate limit exceeded for ${apiKey ? `API key: ${apiKey.substring(0, 8)}...` : `IP: ${req.ip}`}`);
        res.status(429).json({
            success: false,
            error: {
                message: 'API rate limit exceeded, please try again later.',
                code: 'API_RATE_LIMITED',
            },
        });
    },
});
//# sourceMappingURL=rateLimiter.js.map