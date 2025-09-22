import { Request, Response, NextFunction } from 'express';
export declare class WalletController {
    static createWallet(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
    static createSocialWalletGoogle(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
    static createSocialWalletPhone(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
    static getUserWallets(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
    static getWalletById(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
    static updateWallet(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
    static deleteWallet(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
}
//# sourceMappingURL=WalletController.d.ts.map