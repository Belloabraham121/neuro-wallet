import { EventEmitter } from 'eventemitter3';
import {
  AuthOptions,
  AuthResult,
  NeuroWalletError,
  SDKEvents,
  PhoneVerificationResult
} from '../types';

/**
 * Authentication Manager - Handles Stacks Connect integration
 */
export class AuthManager extends EventEmitter<SDKEvents> {
  private _client: any; // Will be properly typed when client is complete

  constructor(client: any) {
    super();
    this._client = client;
  }

  /**
   * Connect to a Stacks wallet
   */
  async connect(_options: AuthOptions): Promise<AuthResult> {
    try {
      // Implementation will be added
      throw new NeuroWalletError('Not implemented yet', 'NOT_IMPLEMENTED');
    } catch (error) {
      this.emit('error', error);
      throw error;
    }
  }

  /**
   * Disconnect from wallet
   */
  async disconnect(): Promise<void> {
    try {
      // Implementation will be added
      throw new NeuroWalletError('Not implemented yet', 'NOT_IMPLEMENTED');
    } catch (error) {
      this.emit('error', error);
      throw error;
    }
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    // Implementation will be added
    return false;
  }

  /**
   * Get current user session
   */
  getUserSession(): any {
    // Implementation will be added
    return null;
  }

  /**
   * Send phone verification code
   */
  async sendPhoneVerificationCode(phoneNumber: string): Promise<{ success: boolean; message: string }> {
    try {
      const response = await this._client.api.post('/auth/phone/send-code', {
        phoneNumber,
      });

      this.emit('phone:verification:sent', { phoneNumber });
      return {
        success: true,
        message: response.data.message || 'Verification code sent successfully',
      };
    } catch (error) {
      this.emit('error', error);
      throw new NeuroWalletError(
        error instanceof Error ? error.message : 'Failed to send verification code',
        'PHONE_VERIFICATION_FAILED'
      );
    }
  }

  /**
   * Verify phone number with code
   */
  async verifyPhoneNumber(phoneNumber: string, verificationCode: string): Promise<PhoneVerificationResult> {
    try {
      const response = await this._client.api.post('/auth/phone/verify', {
        phoneNumber,
        verificationCode,
      });

      const result: PhoneVerificationResult = {
         success: response.data.success,
         verified: response.data.verified,
         message: response.data.message || 'Phone verification completed',
         user: response.data.user,
         tokens: response.data.tokens,
       };

      if (result.success) {
        this.emit('phone:verification:success', result);
      } else {
        this.emit('phone:verification:failed', { phoneNumber });
      }

      return result;
    } catch (error) {
      this.emit('error', error);
      throw new NeuroWalletError(
        error instanceof Error ? error.message : 'Failed to verify phone number',
        'PHONE_VERIFICATION_FAILED'
      );
    }
  }

  /**
   * Login with phone number (after verification)
   */
  async loginWithPhone(phoneNumber: string, verificationCode: string): Promise<any> {
    try {
      const response = await this._client.api.post('/auth/phone/login', {
        phoneNumber,
        verificationCode,
      });

      this.emit('auth:login:success', response.data);
      return response.data;
    } catch (error) {
      this.emit('error', error);
      throw new NeuroWalletError(
        error instanceof Error ? error.message : 'Failed to login with phone',
        'PHONE_LOGIN_FAILED'
      );
    }
  }
}

export * from '../types';