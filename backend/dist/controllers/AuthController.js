"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const express_validator_1 = require("express-validator");
const authService_1 = require("../services/authService");
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
            if (!refreshToken) {
                return res.status(400).json({
                    success: false,
                    error: {
                        message: 'Refresh token is required',
                        code: 'REFRESH_TOKEN_REQUIRED',
                    },
                });
            }
            await authService_1.AuthService.logoutUser(refreshToken);
            res.json({
                success: true,
                data: {
                    message: 'Logged out successfully',
                },
            });
        }
        catch (error) {
            return next(error);
        }
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=AuthController.js.map