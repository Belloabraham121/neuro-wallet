export interface RegisterUserData {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}
export interface LoginUserData {
    email: string;
    password: string;
}
export interface TokenPair {
    accessToken: string;
    refreshToken: string;
}
export interface UserResponse {
    id: string;
    email: string;
    firstName: string | null;
    lastName: string | null;
    createdAt: Date;
}
export interface AuthResult {
    user: UserResponse;
    tokens: TokenPair;
}
export declare class AuthService {
    static generateTokens(userId: string): TokenPair;
    static hashPassword(password: string): Promise<string>;
    static verifyPassword(password: string, hash: string): Promise<boolean>;
    static createSession(refreshToken: string, userId: string, ipAddress?: string, userAgent?: string): Promise<{
        userAgent: string | null;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        token: string;
        expiresAt: Date;
        ipAddress: string | null;
    }>;
    static registerUser(userData: RegisterUserData, ipAddress?: string, userAgent?: string): Promise<AuthResult>;
    static loginUser(loginData: LoginUserData, ipAddress?: string, userAgent?: string): Promise<AuthResult>;
    static refreshToken(refreshToken: string): Promise<TokenPair>;
    static logoutUser(refreshToken: string): Promise<void>;
    static handleGoogleAuth(googleProfile: any, ipAddress?: string, userAgent?: string): Promise<AuthResult>;
}
//# sourceMappingURL=authService.d.ts.map