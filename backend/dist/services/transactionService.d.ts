import { TransactionStatus, TransactionType } from '@prisma/client';
import { StacksTransaction } from '@stacks/transactions';
export interface CreateTransactionData {
    fromWalletId: string;
    toAddress: string;
    amount: number;
    memo?: string;
    userId: string;
}
export interface TransactionResponse {
    id: string;
    txId: string | null;
    fromAddress: string | null;
    toAddress: string | null;
    amount: string | null;
    type: TransactionType;
    status: TransactionStatus;
    memo?: string;
    createdAt: Date;
}
export declare class TransactionService {
    static createAndSignSTXTransfer(data: CreateTransactionData): Promise<{
        transaction: StacksTransaction;
        txId: string;
        wallet: any;
    }>;
    static broadcastSTXTransfer(transaction: StacksTransaction, txId: string, data: CreateTransactionData & {
        wallet: any;
    }): Promise<TransactionResponse>;
    static getNextNonce(address: string): Promise<number>;
    static decryptPrivateKey(encryptedKey: string, userId: string): Promise<string>;
    static getUserTransactions(userId: string): Promise<TransactionResponse[]>;
    static updateTransactionStatus(txId: string, status: 'CONFIRMED' | 'FAILED'): Promise<TransactionStatus>;
}
export default TransactionService;
//# sourceMappingURL=transactionService.d.ts.map