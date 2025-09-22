import { Request, Response, NextFunction } from 'express';
interface AuthUser {
    id: string;
    email: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
interface AuthApiKey {
    id: string;
    name: string;
    permissions: any;
    rateLimit?: number;
}
declare module 'express-serve-static-core' {
    interface Request {
        user?: AuthUser;
        apiKey?: AuthApiKey;
    }
}
export declare const authenticateJWT: (req: Request, res: Response, next: NextFunction) => Promise<void | Response>;
export declare const authenticateAPIKey: (req: Request, res: Response, next: NextFunction) => Promise<void | Response>;
export declare const optionalJWT: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const requireAdmin: (req: Request, res: Response, next: NextFunction) => void | Response;
export declare const checkAPIKeyRateLimit: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export {};
//# sourceMappingURL=auth.d.ts.map