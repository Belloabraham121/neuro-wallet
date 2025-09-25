import { Router } from "express";
import { body } from "express-validator";
import { authenticateJWT, authenticateAPIKey } from "../middleware/auth";
import { WalletController } from "../controllers/WalletController";
import { walletCreationLimiter } from "../middleware/rateLimiter";

const router = Router();

// Validation middleware
const createWalletValidation = [
  body("walletType")
    .isIn(["STANDARD", "SOCIAL"])
    .withMessage("Invalid wallet type"),
  body("metadata")
    .optional()
    .isObject()
    .withMessage("Metadata must be an object"),
];

const createSocialWalletGoogleValidation = [
  body("provider").equals("GOOGLE").withMessage("Provider must be GOOGLE"),
  body("providerId")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Provider ID is required"),
  body("providerData").isObject().withMessage("Provider data is required"),
  body("providerData.email").isEmail().withMessage("Valid email is required"),
];

const createSocialWalletPhoneValidation = [
  body("provider").equals("PHONE").withMessage("Provider must be PHONE"),
  body("providerId")
    .isMobilePhone("any")
    .withMessage("Valid phone number is required"),
  body("verificationCode")
    .optional()
    .isLength({ min: 4, max: 8 })
    .withMessage("Invalid verification code"),
  body("providerData").isObject().withMessage("Provider data is required"),
];

// Create a new wallet
router.post(
  "/wallet",
  authenticateAPIKey,
  authenticateJWT,
  walletCreationLimiter,
  createWalletValidation,
  WalletController.createWallet
);

// Get all wallets for authenticated user
router.get("/wallet", authenticateJWT, WalletController.getUserWallets);

// Get specific wallet by ID
router.get("/wallet/:id", authenticateJWT, WalletController.getWalletById);

// Update wallet metadata
router.put("/wallet/:id", authenticateJWT, WalletController.updateWallet);

// Delete wallet
router.delete("/wallet/:id", authenticateJWT, WalletController.deleteWallet);

// Social wallet routes
router.post(
  "/social/google",
  authenticateAPIKey,
  walletCreationLimiter,
  createSocialWalletGoogleValidation,
  WalletController.createSocialWalletGoogle
);

router.post(
  "/social/phone",
  authenticateAPIKey,
  walletCreationLimiter,
  createSocialWalletPhoneValidation,
  WalletController.createSocialWalletPhone
);

export default router;
