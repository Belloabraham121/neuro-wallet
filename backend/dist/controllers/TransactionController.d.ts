import { Request, Response, NextFunction } from 'express';
export declare class TransactionController {
    static createSTXTransfer(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
    static getUserTransactions(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
    static getTransactionById(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
    static updateTransactionStatus(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
}
//# sourceMappingURL=TransactionController.d.ts.map