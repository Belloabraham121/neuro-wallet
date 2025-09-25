"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhoneAuthService = void 0;
const index_1 = require("../index");
const logger_1 = require("../config/logger");
const crypto_1 = __importDefault(require("crypto"));
const twilio_1 = __importDefault(require("twilio"));
class PhoneAuthService {
    static generateVerificationCode() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }
    static validatePhoneNumber(phoneNumber) {
        const phoneRegex = /^\+[1-9]\d{1,14}$/;
        return phoneRegex.test(phoneNumber);
    }
    static async sendSMS(phoneNumber, message) {
        if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN || !process.env.TWILIO_PHONE_NUMBER) {
            throw new Error('Twilio configuration missing');
        }
        const client = (0, twilio_1.default)(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
        try {
            await client.messages.create({
                body: message,
                from: process.env.TWILIO_PHONE_NUMBER,
                to: phoneNumber
            });
            logger_1.logger.info(`SMS sent successfully to ${phoneNumber}`);
        }
        catch (error) {
            logger_1.logger.error(`Failed to send SMS to ${phoneNumber}:`, error);
            throw new Error('Failed to send verification code via SMS');
        }
    }
    static async checkRateLimit(phoneNumber) {
        const recentSession = await index_1.prisma.phoneVerification.findFirst({
            where: {
                phoneNumber,
                createdAt: {
                    gte: new Date(Date.now() - this.RATE_LIMIT_MINUTES * 60 * 1000),
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        return !recentSession;
    }
    static async sendVerificationCode(data) {
        const { phoneNumber } = data;
        if (!this.validatePhoneNumber(phoneNumber)) {
            return {
                success: false,
                message: 'Invalid phone number format. Please use E.164 format (+1234567890)',
            };
        }
        const canSend = await this.checkRateLimit(phoneNumber);
        if (!canSend) {
            return {
                success: false,
                message: 'Please wait before requesting another verification code',
            };
        }
        const verificationCode = this.generateVerificationCode();
        const expiresAt = new Date(Date.now() + this.CODE_EXPIRY_MINUTES * 60 * 1000);
        const sessionId = crypto_1.default.randomUUID();
        try {
            await index_1.prisma.phoneVerification.create({
                data: {
                    id: sessionId,
                    phoneNumber,
                    code: verificationCode,
                    expiresAt,
                    attempts: 0,
                    isVerified: false,
                },
            });
            await this.sendSMS(phoneNumber, `Your Neuro Wallet verification code is: ${verificationCode}`);
            return {
                success: true,
                message: 'Verification code sent successfully',
                sessionId,
                expiresAt,
            };
        }
        catch (error) {
            logger_1.logger.error('Error sending verification code:', error);
            return {
                success: false,
                message: 'Failed to send verification code',
            };
        }
    }
    static async verifyPhoneNumber(data) {
        const { phoneNumber, verificationCode } = data;
        try {
            const session = await index_1.prisma.phoneVerification.findFirst({
                where: {
                    phoneNumber,
                    isVerified: false,
                    expiresAt: {
                        gt: new Date(),
                    },
                },
                orderBy: {
                    createdAt: 'desc',
                },
            });
            if (!session) {
                return {
                    success: false,
                    message: 'No active verification session found or session expired',
                };
            }
            if (session.attempts >= this.MAX_ATTEMPTS) {
                await index_1.prisma.phoneVerification.update({
                    where: { id: session.id },
                    data: { isVerified: false },
                });
                return {
                    success: false,
                    message: 'Maximum verification attempts exceeded',
                };
            }
            await index_1.prisma.phoneVerification.update({
                where: { id: session.id },
                data: { attempts: session.attempts + 1 },
            });
            if (session.code !== verificationCode) {
                return {
                    success: false,
                    message: 'Invalid verification code',
                };
            }
            await index_1.prisma.phoneVerification.update({
                where: { id: session.id },
                data: { isVerified: true },
            });
            logger_1.logger.info(`Phone number verified successfully: ${phoneNumber}`);
            return {
                success: true,
                message: 'Phone number verified successfully',
                sessionId: session.id,
            };
        }
        catch (error) {
            logger_1.logger.error('Error verifying phone number:', error);
            return {
                success: false,
                message: 'Failed to verify phone number',
            };
        }
    }
    static async isPhoneVerified(phoneNumber) {
        const verifiedSession = await index_1.prisma.phoneVerification.findFirst({
            where: {
                phoneNumber,
                isVerified: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        return !!verifiedSession;
    }
    static async cleanupExpiredSessions() {
        try {
            const result = await index_1.prisma.phoneVerification.deleteMany({
                where: {
                    expiresAt: {
                        lt: new Date(),
                    },
                },
            });
            logger_1.logger.info(`Cleaned up ${result.count} expired verification sessions`);
        }
        catch (error) {
            logger_1.logger.error('Error cleaning up expired sessions:', error);
        }
    }
    static async getVerificationSession(sessionId) {
        try {
            const session = await index_1.prisma.phoneVerification.findUnique({
                where: { id: sessionId },
            });
            if (!session) {
                return null;
            }
            return {
                id: session.id,
                phoneNumber: session.phoneNumber,
                code: session.code,
                attempts: session.attempts,
                expiresAt: session.expiresAt,
                isVerified: session.isVerified,
            };
        }
        catch (error) {
            logger_1.logger.error('Error getting verification session:', error);
            return null;
        }
    }
    static async resendVerificationCode(phoneNumber) {
        await index_1.prisma.phoneVerification.updateMany({
            where: {
                phoneNumber,
                isVerified: false,
            },
            data: {
                isVerified: false,
                expiresAt: new Date(),
            },
        });
        return await this.sendVerificationCode({ phoneNumber });
    }
}
exports.PhoneAuthService = PhoneAuthService;
PhoneAuthService.MAX_ATTEMPTS = 3;
PhoneAuthService.CODE_EXPIRY_MINUTES = 10;
PhoneAuthService.RATE_LIMIT_MINUTES = 1;
//# sourceMappingURL=phoneAuthService.js.map