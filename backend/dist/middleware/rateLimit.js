"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRateLimit = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const rateLimiters = {
    'transaction_create': (0, express_rate_limit_1.default)({
        windowMs: 15 * 60 * 1000,
        max: 10,
        message: 'Too many transaction creation attempts from this IP, please try again later.',
        standardHeaders: true,
        legacyHeaders: false,
        handler: (req, res, next) => {
            res.status(429).json({
                error: 'Rate limit exceeded',
                message: 'Too many transaction creation attempts from this IP, please try again later.'
            });
        }
    }),
    'transaction_read': (0, express_rate_limit_1.default)({
        windowMs: 15 * 60 * 1000,
        max: 100,
        message: 'Too many transaction read attempts from this IP, please try again later.',
        standardHeaders: true,
        legacyHeaders: false,
        handler: (req, res, next) => {
            res.status(429).json({
                error: 'Rate limit exceeded',
                message: 'Too many transaction read attempts from this IP, please try again later.'
            });
        }
    }),
};
const validateRateLimit = (action) => {
    return (req, res, next) => {
        const limiter = rateLimiters[action];
        if (!limiter) {
            return res.status(400).json({
                error: 'Invalid rate limit action',
                message: `Rate limiting not configured for action: ${action}`
            });
        }
        return limiter(req, res, next);
    };
};
exports.validateRateLimit = validateRateLimit;
//# sourceMappingURL=rateLimit.js.map