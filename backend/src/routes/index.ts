import express from "express";
import authRoutes from "./auth";
import apiKeyRoutes from "./apiKeys";
import walletRoutes from "./wallets";
import transactionRoutes from "./transactions";

const router = express.Router();

// Health check endpoint
router.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "Neuro Wallet API is running",
    timestamp: new Date().toISOString(),
    version: process.env.API_VERSION || "1.0.0",
  });
});

// API routes
router.use("/auth", authRoutes);
router.use("/keys", apiKeyRoutes);
router.use("/wallets", walletRoutes);
router.use("/transactions", transactionRoutes);

export default router;
