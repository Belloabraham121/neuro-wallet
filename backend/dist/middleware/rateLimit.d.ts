import { Request, Response, NextFunction } from 'express';
export declare const validateRateLimit: (action: string) => (req: Request, res: Response, next: NextFunction) => void | Response<any, Record<string, any>>;
//# sourceMappingURL=rateLimit.d.ts.map