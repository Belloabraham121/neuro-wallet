import { prisma } from '../index';
import { logger } from '../config/logger';
import crypto from 'crypto';
import twilio from 'twilio';

export interface PhoneVerificationData {
  phoneNumber: string;
  countryCode?: string;
}

export interface VerifyPhoneData {
  phoneNumber: string;
  verificationCode: string;
}

export interface PhoneAuthResult {
  success: boolean;
  message: string;
  sessionId?: string;
  expiresAt?: Date;
}

export interface VerificationSession {
  id: string;
  phoneNumber: string;
  code: string;
  attempts: number;
  expiresAt: Date;
  isVerified: boolean;
}

export class PhoneAuthService {
  private static readonly MAX_ATTEMPTS = 3;
  private static readonly CODE_EXPIRY_MINUTES = 10;
  private static readonly RATE_LIMIT_MINUTES = 1;

  /**
   * Generate a 6-digit verification code
   */
  private static generateVerificationCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  /**
   * Validate phone number format
   */
  private static validatePhoneNumber(phoneNumber: string): boolean {
    // E.164 format: +[country code][number]
    const phoneRegex = /^\+[1-9]\d{1,14}$/;
    return phoneRegex.test(phoneNumber);
  }

  /**
   * Send SMS via Twilio
   */
  private static async sendSMS(phoneNumber: string, message: string): Promise<void> {
    if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN || !process.env.TWILIO_PHONE_NUMBER) {
      throw new Error('Twilio configuration missing');
    }

    const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

    try {
      await client.messages.create({
        body: message,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: phoneNumber
      });
      logger.info(`SMS sent successfully to ${phoneNumber}`);
    } catch (error) {
      logger.error(`Failed to send SMS to ${phoneNumber}:`, error);
      throw new Error('Failed to send verification code via SMS');
    }
  }

  /**
   * Check rate limiting for phone number
   */
  private static async checkRateLimit(phoneNumber: string): Promise<boolean> {
    const recentSession = await prisma.phoneVerification.findFirst({
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

  /**
   * Send verification code to phone number
   */
  static async sendVerificationCode(
    data: PhoneVerificationData
  ): Promise<PhoneAuthResult> {
    const { phoneNumber } = data;

    // Validate phone number format
    if (!this.validatePhoneNumber(phoneNumber)) {
      return {
        success: false,
        message: 'Invalid phone number format. Please use E.164 format (+1234567890)',
      };
    }

    // Check rate limiting
    const canSend = await this.checkRateLimit(phoneNumber);
    if (!canSend) {
      return {
        success: false,
        message: 'Please wait before requesting another verification code',
      };
    }

    // Generate verification code
    const verificationCode = this.generateVerificationCode();
    const expiresAt = new Date(Date.now() + this.CODE_EXPIRY_MINUTES * 60 * 1000);
    const sessionId = crypto.randomUUID();

    try {
      // Store verification session
      await prisma.phoneVerification.create({
        data: {
          id: sessionId,
          phoneNumber,
          code: verificationCode,
          expiresAt,
          attempts: 0,
          isVerified: false,
        },
      });

      // For testing: Log the verification code
      logger.info(`Test verification code for ${phoneNumber}: ${verificationCode}`);

      // Send SMS via Twilio (commented for testing)
      // await this.sendSMS(phoneNumber, `Your Neuro Wallet verification code is: ${verificationCode}`);

      return {
        success: true,
        message: 'Verification code sent successfully',
        sessionId,
        expiresAt,
      };
    } catch (error) {
      logger.error('Error sending verification code:', error);
      return {
        success: false,
        message: 'Failed to send verification code',
      };
    }
  }

  /**
   * Verify phone number with code
   */
  static async verifyPhoneNumber(
    data: VerifyPhoneData
  ): Promise<PhoneAuthResult> {
    const { phoneNumber, verificationCode } = data;

    try {
      // Find active verification session
      const session = await prisma.phoneVerification.findFirst({
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

      // Check attempts limit
      if (session.attempts >= this.MAX_ATTEMPTS) {
        await prisma.phoneVerification.update({
          where: { id: session.id },
          data: { isVerified: false },
        });

        return {
          success: false,
          message: 'Maximum verification attempts exceeded',
        };
      }

      // Increment attempts
      await prisma.phoneVerification.update({
        where: { id: session.id },
        data: { attempts: session.attempts + 1 },
      });

      // Verify code
      if (session.code !== verificationCode) {
        return {
          success: false,
          message: 'Invalid verification code',
        };
      }

      // Mark as verified
      await prisma.phoneVerification.update({
        where: { id: session.id },
        data: { isVerified: true },
      });

      logger.info(`Phone number verified successfully: ${phoneNumber}`);

      return {
        success: true,
        message: 'Phone number verified successfully',
        sessionId: session.id,
      };
    } catch (error) {
      logger.error('Error verifying phone number:', error);
      return {
        success: false,
        message: 'Failed to verify phone number',
      };
    }
  }

  /**
   * Check if phone number is verified
   */
  static async isPhoneVerified(phoneNumber: string): Promise<boolean> {
    const verifiedSession = await prisma.phoneVerification.findFirst({
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

  /**
   * Clean up expired verification sessions
   */
  static async cleanupExpiredSessions(): Promise<void> {
    try {
      const result = await prisma.phoneVerification.deleteMany({
        where: {
          expiresAt: {
            lt: new Date(),
          },
        },
      });

      logger.info(`Cleaned up ${result.count} expired verification sessions`);
    } catch (error) {
      logger.error('Error cleaning up expired sessions:', error);
    }
  }

  /**
   * Get verification session by ID
   */
  static async getVerificationSession(
    sessionId: string
  ): Promise<VerificationSession | null> {
    try {
      const session = await prisma.phoneVerification.findUnique({
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
    } catch (error) {
      logger.error('Error getting verification session:', error);
      return null;
    }
  }

  /**
   * Resend verification code
   */
  static async resendVerificationCode(
    phoneNumber: string
  ): Promise<PhoneAuthResult> {
    // Invalidate existing sessions
    await prisma.phoneVerification.updateMany({
      where: {
        phoneNumber,
        isVerified: false,
      },
      data: {
        isVerified: false,
        expiresAt: new Date(), // Expire immediately
      },
    });

    // Send new verification code
    return await this.sendVerificationCode({ phoneNumber });
  }
}