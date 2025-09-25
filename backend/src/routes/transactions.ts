import { Router } from 'express';
import { body, param } from 'express-validator';
import { TransactionController } from '../controllers/TransactionController';
import { authenticateJWT, authenticateAPIKey, checkAPIKeyRateLimit } from '../middleware/auth';
import { validateRateLimit } from '../middleware/rateLimit';

const router = Router();

// Create STX transfer
router.post('/stx-transfer',
  authenticateJWT,
  checkAPIKeyRateLimit,
  validateRateLimit('transaction_create'),
  [
    body('fromWalletId').isUUID().withMessage('Valid wallet ID is required'),
    body('toAddress').isString().notEmpty().withMessage('Recipient address is required'),
    body('amount').isFloat({ min: 0 }).withMessage('Amount must be a positive number'),
    body('memo').optional().isString().withMessage('Memo must be a string'),
  ],
  TransactionController.createSTXTransfer
);

// Get user's transactions
router.get('/',
  authenticateJWT,
  checkAPIKeyRateLimit,
  validateRateLimit('transaction_read'),
  TransactionController.getUserTransactions
);

// Get specific transaction by ID
router.get('/:id',
  authenticateJWT,
  checkAPIKeyRateLimit,
  validateRateLimit('transaction_read'),
  [
    param('id').isUUID().withMessage('Valid transaction ID is required'),
  ],
  TransactionController.getTransactionById
);

// Update transaction status (admin or callback endpoint)
router.patch('/:id/status',
  authenticateJWT,
  checkAPIKeyRateLimit,
  [
    param('id').isUUID().withMessage('Valid transaction ID is required'),
    body('status').isIn(['confirmed', 'failed']).withMessage('Status must be confirmed or failed'),
  ],
  TransactionController.updateTransactionStatus
);

export default router;