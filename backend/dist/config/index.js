"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const requiredEnvVars = ["DATABASE_URL", "JWT_SECRET", "JWT_REFRESH_SECRET"];
const missingEnvVars = requiredEnvVars.filter((envVar) => !process.env[envVar]);
if (missingEnvVars.length > 0) {
    console.error("Missing required environment variables:", missingEnvVars);
    if (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME) {
        throw new Error(`Missing required environment variables: ${missingEnvVars.join(", ")}`);
    }
    else {
        process.exit(1);
    }
}
exports.config = {
    port: parseInt(process.env.PORT || "3000"),
    nodeEnv: process.env.NODE_ENV || "development",
    apiVersion: process.env.API_VERSION || "1.0.0",
    baseUrl: process.env.BASE_URL || "http://localhost:3000",
    databaseUrl: process.env.DATABASE_URL,
    jwtSecret: process.env.JWT_SECRET,
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || "15m",
    jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    googleCallbackUrl: process.env.GOOGLE_CALLBACK_URL,
    frontendUrl: process.env.FRONTEND_URL || "http://localhost:3001",
    allowedOrigins: process.env.ALLOWED_ORIGINS?.split(",") || [
        "http://localhost:3001",
        "http://localhost:3000",
    ],
    rateLimitWindow: parseInt(process.env.RATE_LIMIT_WINDOW || "900000"),
    rateLimitMax: parseInt(process.env.RATE_LIMIT_MAX || "100"),
    authRateLimitMax: parseInt(process.env.AUTH_RATE_LIMIT_MAX || "5"),
    apiKeyRateLimitMax: parseInt(process.env.API_KEY_RATE_LIMIT_MAX || "10"),
    walletRateLimitMax: parseInt(process.env.WALLET_RATE_LIMIT_MAX || "20"),
    apiKeyPrefix: process.env.API_KEY_PREFIX || "sk_",
    apiKeyLength: parseInt(process.env.API_KEY_LENGTH || "32"),
    bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS || "12"),
    sessionSecret: process.env.SESSION_SECRET || "your-session-secret",
    adminEmails: process.env.ADMIN_EMAILS?.split(",") || [],
    logLevel: process.env.LOG_LEVEL || "info",
    logFile: process.env.LOG_FILE || "logs/app.log",
    twilioAccountSid: process.env.TWILIO_ACCOUNT_SID,
    twilioAuthToken: process.env.TWILIO_AUTH_TOKEN,
    twilioPhoneNumber: process.env.TWILIO_PHONE_NUMBER,
    smtpHost: process.env.SMTP_HOST,
    smtpPort: parseInt(process.env.SMTP_PORT || "587"),
    smtpUser: process.env.SMTP_USER,
    smtpPassword: process.env.SMTP_PASSWORD,
    emailFrom: process.env.EMAIL_FROM || "noreply@neurowallet.com",
    stacksNetwork: process.env.STACKS_NETWORK || "testnet",
    stacksApiUrl: process.env.STACKS_API_URL || "https://stacks-node-api.testnet.stacks.co",
    isDevelopment: process.env.NODE_ENV === "development",
    isProduction: process.env.NODE_ENV === "production",
    isTest: process.env.NODE_ENV === "test",
};
exports.default = exports.config;
//# sourceMappingURL=index.js.map