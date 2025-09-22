import { Request, Response, NextFunction } from 'express';
export declare class ApiKeyController {
    static createApiKey(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
    static getApiKeys(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
    static getApiKey(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
    static updateApiKey(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
    static deleteApiKey(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
    static validateApiKey(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
}
//# sourceMappingURL=apiKeyController.d.ts.map