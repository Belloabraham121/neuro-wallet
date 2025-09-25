"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const TransactionController_1 = require("../controllers/TransactionController");
const auth_1 = require("../middleware/auth");
const rateLimit_1 = require("../middleware/rateLimit");
const router = (0, express_1.Router)();
router.post('/stx-transfer', auth_1.authenticateJWT, auth_1.checkAPIKeyRateLimit, (0, rateLimit_1.validateRateLimit)('transaction_create'), [
    (0, express_validator_1.body)('fromWalletId').isUUID().withMessage('Valid wallet ID is required'),
    (0, express_validator_1.body)('toAddress').isString().notEmpty().withMessage('Recipient address is required'),
    (0, express_validator_1.body)('amount').isFloat({ min: 0 }).withMessage('Amount must be a positive number'),
    (0, express_validator_1.body)('memo').optional().isString().withMessage('Memo must be a string'),
], TransactionController_1.TransactionController.createSTXTransfer);
router.get('/', auth_1.authenticateJWT, auth_1.checkAPIKeyRateLimit, (0, rateLimit_1.validateRateLimit)('transaction_read'), TransactionController_1.TransactionController.getUserTransactions);
router.get('/:id', auth_1.authenticateJWT, auth_1.checkAPIKeyRateLimit, (0, rateLimit_1.validateRateLimit)('transaction_read'), [
    (0, express_validator_1.param)('id').isUUID().withMessage('Valid transaction ID is required'),
], TransactionController_1.TransactionController.getTransactionById);
router.patch('/:id/status', auth_1.authenticateJWT, auth_1.checkAPIKeyRateLimit, [
    (0, express_validator_1.param)('id').isUUID().withMessage('Valid transaction ID is required'),
    (0, express_validator_1.body)('status').isIn(['confirmed', 'failed']).withMessage('Status must be confirmed or failed'),
], TransactionController_1.TransactionController.updateTransactionStatus);
exports.default = router;
//# sourceMappingURL=transactions.js.map