"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const auth_1 = require("../middleware/auth");
const WalletController_1 = require("../controllers/WalletController");
const router = (0, express_1.Router)();
const createWalletValidation = [
    (0, express_validator_1.body)('walletType').isIn(['STANDARD', 'SOCIAL']).withMessage('Invalid wallet type'),
    (0, express_validator_1.body)('metadata').optional().isObject().withMessage('Metadata must be an object'),
];
const createSocialWalletGoogleValidation = [
    (0, express_validator_1.body)('provider').equals('GOOGLE').withMessage('Provider must be GOOGLE'),
    (0, express_validator_1.body)('providerId').trim().isLength({ min: 1 }).withMessage('Provider ID is required'),
    (0, express_validator_1.body)('providerData').isObject().withMessage('Provider data is required'),
    (0, express_validator_1.body)('providerData.email').isEmail().withMessage('Valid email is required'),
];
const createSocialWalletPhoneValidation = [
    (0, express_validator_1.body)('provider').equals('PHONE').withMessage('Provider must be PHONE'),
    (0, express_validator_1.body)('providerId').isMobilePhone('any').withMessage('Valid phone number is required'),
    (0, express_validator_1.body)('verificationCode').optional().isLength({ min: 4, max: 8 }).withMessage('Invalid verification code'),
    (0, express_validator_1.body)('providerData').isObject().withMessage('Provider data is required'),
];
router.post('/', auth_1.authenticateJWT, createWalletValidation, WalletController_1.WalletController.createWallet);
router.get('/', auth_1.authenticateJWT, WalletController_1.WalletController.getUserWallets);
router.get('/:id', auth_1.authenticateJWT, WalletController_1.WalletController.getWalletById);
router.put('/:id', auth_1.authenticateJWT, WalletController_1.WalletController.updateWallet);
router.delete('/:id', auth_1.authenticateJWT, WalletController_1.WalletController.deleteWallet);
router.post('/social/google', createSocialWalletGoogleValidation, WalletController_1.WalletController.createSocialWalletGoogle);
router.post('/social/phone', createSocialWalletPhoneValidation, WalletController_1.WalletController.createSocialWalletPhone);
exports.default = router;
//# sourceMappingURL=wallets.js.map