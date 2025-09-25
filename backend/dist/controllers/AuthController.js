"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const express_validator_1 = require("express-validator");
const authService_1 = require("../services/authService");
const phoneAuthService_1 = require("../services/phoneAuthService");
const logger_1 = require("../config/logger");
class AuthController {
    static async register(req, res, next) {
        try {
            const errors = (0, express_validator_1.validationResult)(req);
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
            const result = await authService_1.AuthService.registerUser({ email, password, firstName, lastName }, ipAddress, userAgent);
            res.status(201).json({
                success: true,
                data: result,
            });
        }
        catch (error) {
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
    static async login(req, res, next) {
        try {
            const errors = (0, express_validator_1.validationResult)(req);
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
            const result = await authService_1.AuthService.loginUser({ email, password }, ipAddress, userAgent);
            res.json({
                success: true,
                data: result,
            });
        }
        catch (error) {
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
    static async googleCallback(req, res, next) {
        try {
            const user = req.user;
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
            const result = await authService_1.AuthService.handleGoogleAuth(user, ipAddress, userAgent);
            const frontendUrl = process.env.CORS_ORIGIN || 'http://localhost:3000';
            const redirectUrl = `${frontendUrl}/auth/callback?token=${result.tokens.accessToken}&refresh=${result.tokens.refreshToken}`;
            res.redirect(redirectUrl);
        }
        catch (error) {
            logger_1.logger.error('Google OAuth error:', error);
            const frontendUrl = process.env.CORS_ORIGIN || 'http://localhost:3000';
            res.redirect(`${frontendUrl}/auth/error?message=authentication_failed`);
        }
    }
    static async refreshToken(req, res, next) {
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
            const tokens = await authService_1.AuthService.refreshToken(refreshToken);
            res.json({
                success: true,
                data: { tokens },
            });
        }
        catch (error) {
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
    static async logout(req, res, next) {
        try {
            const { refreshToken } = req.body;
            const userId = req.user?.id;
            if (!refreshToken || !userId) {
                return res.status(400).json({
                    success: false,
                    error: {
                        message: 'Refresh token and user ID are required',
                        code: 'MISSING_REQUIRED_FIELDS',
                    },
                });
            }
            await authService_1.AuthService.logoutUser(refreshToken);
            res.json({
                success: true,
                message: 'Logged out successfully',
            });
        }
        catch (error) {
            return next(error);
        }
    }
    static async sendPhoneVerificationCode(req, res, next) {
        try {
            const errors = (0, express_validator_1.validationResult)(req);
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
            const { phoneNumber } = req.body;
            await phoneAuthService_1.PhoneAuthService.sendVerificationCode({ phoneNumber });
            res.json({
                success: true,
                message: 'Verification code sent successfully',
            });
        }
        catch (error) {
            if (error.message === 'RATE_LIMITED') {
                return res.status(429).json({
                    success: false,
                    error: {
                        message: 'Too many requests. Please try again later.',
                        code: 'RATE_LIMITED',
                    },
                });
            }
            return next(error);
        }
    }
    static async verifyPhoneNumber(req, res, next) {
        try {
            const errors = (0, express_validator_1.validationResult)(req);
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
            const { phoneNumber, verificationCode } = req.body;
            const result = await phoneAuthService_1.PhoneAuthService.verifyPhoneNumber({ phoneNumber, verificationCode });
            const isValid = result.success;
            if (!isValid) {
                return res.status(400).json({
                    success: false,
                    error: {
                        message: 'Invalid or expired verification code',
                        code: 'INVALID_CODE',
                    },
                });
            }
            res.json({
                success: true,
                message: 'Phone number verified successfully',
            });
        }
        catch (error) {
            return next(error);
        }
    }
    static async phoneLogin(req, res, next) {
        try {
            const errors = (0, express_validator_1.validationResult)(req);
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
            const { phoneNumber, verificationCode } = req.body;
            const ipAddress = req.ip;
            const userAgent = req.get('User-Agent');
            const verifyResult = await phoneAuthService_1.PhoneAuthService.verifyPhoneNumber({ phoneNumber, verificationCode });
            if (!verifyResult.success) {
                return res.status(400).json({
                    success: false,
                    error: {
                        message: 'Invalid or expired verification code',
                        code: 'INVALID_CODE',
                    },
                });
            }
            const result = await authService_1.AuthService.handlePhoneAuth(phoneNumber, ipAddress, userAgent);
            res.json({
                success: true,
                data: result,
            });
        }
        catch (error) {
            return next(error);
        }
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=AuthController.js.map