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
export declare class PhoneAuthService {
    private static readonly MAX_ATTEMPTS;
    private static readonly CODE_EXPIRY_MINUTES;
    private static readonly RATE_LIMIT_MINUTES;
    private static generateVerificationCode;
    private static validatePhoneNumber;
    private static sendSMS;
    private static checkRateLimit;
    static sendVerificationCode(data: PhoneVerificationData): Promise<PhoneAuthResult>;
    static verifyPhoneNumber(data: VerifyPhoneData): Promise<PhoneAuthResult>;
    static isPhoneVerified(phoneNumber: string): Promise<boolean>;
    static cleanupExpiredSessions(): Promise<void>;
    static getVerificationSession(sessionId: string): Promise<VerificationSession | null>;
    static resendVerificationCode(phoneNumber: string): Promise<PhoneAuthResult>;
}
//# sourceMappingURL=phoneAuthService.d.ts.map