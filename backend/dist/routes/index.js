"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("./auth"));
const apiKeys_1 = __importDefault(require("./apiKeys"));
const wallets_1 = __importDefault(require("./wallets"));
const router = express_1.default.Router();
router.get("/health", (req, res) => {
    res.json({
        success: true,
        message: "Neuro Wallet API is running",
        timestamp: new Date().toISOString(),
        version: process.env.API_VERSION || "1.0.0",
    });
});
router.use("/auth", auth_1.default);
router.use("/keys", apiKeys_1.default);
router.use("/wallets", wallets_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map