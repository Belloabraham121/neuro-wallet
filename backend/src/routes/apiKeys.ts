import { Router } from "express";
import { body } from "express-validator";
import { authenticateJWT } from "../middleware/auth";
import { ApiKeyController } from "../controllers/apiKeyController";
import { apiKeyRateLimit } from "../config/rateLimit";

const router = Router();

// Validation middleware
const createApiKeyValidation = [
  body("name")
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage("Name must be between 1 and 100 characters"),
  body("permissions")
    .optional()
    .isObject()
    .withMessage("Permissions must be an object"),
  body("expiresAt")
    .optional()
    .isISO8601()
    .withMessage("Expires at must be a valid date"),
];



// Create API key
router.post(
  "/",
  authenticateJWT,
  apiKeyRateLimit,
  createApiKeyValidation,
  ApiKeyController.createApiKey
);

// Get all API keys for authenticated user
router.get(
  "/",
  authenticateJWT,
  ApiKeyController.getApiKeys
);

// Get specific API key
router.get(
  "/:id",
  authenticateJWT,
  ApiKeyController.getApiKey
);

// Update API key
router.put(
  "/:id",
  authenticateJWT,
  apiKeyRateLimit,
  ApiKeyController.updateApiKey
);

// Delete (deactivate) API key
router.delete(
  "/:id",
  authenticateJWT,
  apiKeyRateLimit,
  ApiKeyController.deleteApiKey
);

// Validate API key (internal endpoint for middleware)
router.post(
  "/validate",
  ApiKeyController.validateApiKey
);

export default router;
