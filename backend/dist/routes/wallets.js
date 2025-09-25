"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const auth_1 = require("../middleware/auth");
const WalletController_1 = require("../controllers/WalletController");
const rateLimiter_1 = require("../middleware/rateLimiter");
const router = (0, express_1.Router)();
const createWalletValidation = [
    (0, express_validator_1.body)("walletType")
        .isIn(["STANDARD", "SOCIAL"])
        .withMessage("Invalid wallet type"),
    (0, express_validator_1.body)("metadata")
        .optional()
        .isObject()
        .withMessage("Metadata must be an object"),
];
const createSocialWalletGoogleValidation = [
    (0, express_validator_1.body)("provider").equals("GOOGLE").withMessage("Provider must be GOOGLE"),
    (0, express_validator_1.body)("providerId")
        .trim()
        .isLength({ min: 1 })
        .withMessage("Provider ID is required"),
    (0, express_validator_1.body)("providerData").isObject().withMessage("Provider data is required"),
    (0, express_validator_1.body)("providerData.email").isEmail().withMessage("Valid email is required"),
];
const createSocialWalletPhoneValidation = [
    (0, express_validator_1.body)("provider").equals("PHONE").withMessage("Provider must be PHONE"),
    (0, express_validator_1.body)("providerId")
        .isMobilePhone("any")
        .withMessage("Valid phone number is required"),
    (0, express_validator_1.body)("verificationCode")
        .optional()
        .isLength({ min: 4, max: 8 })
        .withMessage("Invalid verification code"),
    (0, express_validator_1.body)("providerData").isObject().withMessage("Provider data is required"),
];
router.post("/wallet", auth_1.authenticateAPIKey, auth_1.authenticateJWT, rateLimiter_1.walletCreationLimiter, createWalletValidation, WalletController_1.WalletController.createWallet);
router.get("/wallet", auth_1.authenticateJWT, WalletController_1.WalletController.getUserWallets);
router.get("/wallet/:id", auth_1.authenticateJWT, WalletController_1.WalletController.getWalletById);
router.put("/wallet/:id", auth_1.authenticateJWT, WalletController_1.WalletController.updateWallet);
router.delete("/wallet/:id", auth_1.authenticateJWT, WalletController_1.WalletController.deleteWallet);
router.post("/social/google", auth_1.authenticateAPIKey, rateLimiter_1.walletCreationLimiter, createSocialWalletGoogleValidation, WalletController_1.WalletController.createSocialWalletGoogle);
router.post("/social/phone", auth_1.authenticateAPIKey, rateLimiter_1.walletCreationLimiter, createSocialWalletPhoneValidation, WalletController_1.WalletController.createSocialWalletPhone);
exports.default = router;
//# sourceMappingURL=wallets.js.map