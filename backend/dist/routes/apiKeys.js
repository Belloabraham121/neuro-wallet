"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const auth_1 = require("../middleware/auth");
const apiKeyController_1 = require("../controllers/apiKeyController");
const router = (0, express_1.Router)();
const createApiKeyValidation = [
    (0, express_validator_1.body)("name")
        .trim()
        .isLength({ min: 1, max: 100 })
        .withMessage("Name must be between 1 and 100 characters"),
    (0, express_validator_1.body)("permissions")
        .optional()
        .isObject()
        .withMessage("Permissions must be an object"),
    (0, express_validator_1.body)("expiresAt")
        .optional()
        .isISO8601()
        .withMessage("Expires at must be a valid date"),
];
router.post("/", auth_1.authenticateJWT, createApiKeyValidation, apiKeyController_1.ApiKeyController.createApiKey);
router.get("/", auth_1.authenticateJWT, apiKeyController_1.ApiKeyController.getApiKeys);
router.get("/:id", auth_1.authenticateJWT, apiKeyController_1.ApiKeyController.getApiKey);
router.put("/:id", auth_1.authenticateJWT, apiKeyController_1.ApiKeyController.updateApiKey);
router.delete("/:id", auth_1.authenticateJWT, apiKeyController_1.ApiKeyController.deleteApiKey);
router.post("/validate", apiKeyController_1.ApiKeyController.validateApiKey);
exports.default = router;
//# sourceMappingURL=apiKeys.js.map