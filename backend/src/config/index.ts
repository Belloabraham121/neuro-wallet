import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Validate required environment variables
const requiredEnvVars = ["DATABASE_URL", "JWT_SECRET", "JWT_REFRESH_SECRET"];

const missingEnvVars = requiredEnvVars.filter((envVar) => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.error("Missing required environment variables:", missingEnvVars);
  // In serverless environments, throw an error instead of exiting
  if (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME) {
    throw new Error(
      `Missing required environment variables: ${missingEnvVars.join(", ")}`
    );
  } else {
    process.exit(1);
  }
}

export const config = {
  // Server
  port: parseInt(process.env.PORT || "3000"),
  nodeEnv: process.env.NODE_ENV || "development",
  apiVersion: process.env.API_VERSION || "1.0.0",
  baseUrl:
    process.env.BASE_URL || `http://localhost:${process.env.PORT || 3001}`,

  // Database
  databaseUrl: process.env.DATABASE_URL!,

  // JWT
  jwtSecret: process.env.JWT_SECRET!,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET!,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "15m",
  jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",

  // Google OAuth
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  googleCallbackUrl: process.env.GOOGLE_CALLBACK_URL,

  // CORS
  frontendUrl: process.env.FRONTEND_URL || "http://localhost:3001",
  allowedOrigins: process.env.ALLOWED_ORIGINS?.split(",") || [
    "http://localhost:3001",
    "http://localhost:3000",
  ],

  // Rate Limiting
  rateLimitWindow: parseInt(process.env.RATE_LIMIT_WINDOW || "900000"), // 15 minutes
  rateLimitMax: parseInt(process.env.RATE_LIMIT_MAX || "100"),
  authRateLimitMax: parseInt(process.env.AUTH_RATE_LIMIT_MAX || "5"),
  apiKeyRateLimitMax: parseInt(process.env.API_KEY_RATE_LIMIT_MAX || "10"),
  walletRateLimitMax: parseInt(process.env.WALLET_RATE_LIMIT_MAX || "20"),

  // API Keys
  apiKeyPrefix: process.env.API_KEY_PREFIX || "sk_",
  apiKeyLength: parseInt(process.env.API_KEY_LENGTH || "32"),

  // Security
  bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS || "12"),
  sessionSecret: process.env.SESSION_SECRET || "your-session-secret",

  // Admin
  adminEmails: process.env.ADMIN_EMAILS?.split(",") || [],

  // Logging
  logLevel: process.env.LOG_LEVEL || "info",
  logFile: process.env.LOG_FILE || "logs/app.log",

  // Phone verification (for future SMS integration)
  twilioAccountSid: process.env.TWILIO_ACCOUNT_SID,
  twilioAuthToken: process.env.TWILIO_AUTH_TOKEN,
  twilioPhoneNumber: process.env.TWILIO_PHONE_NUMBER,

  // Email verification (for future email integration)
  smtpHost: process.env.SMTP_HOST,
  smtpPort: parseInt(process.env.SMTP_PORT || "587"),
  smtpUser: process.env.SMTP_USER,
  smtpPassword: process.env.SMTP_PASSWORD,
  emailFrom: process.env.EMAIL_FROM || "noreply@neurowallet.com",

  // Stacks blockchain (for future integration)
  stacksNetwork: process.env.STACKS_NETWORK || "testnet",
  stacksApiUrl:
    process.env.STACKS_API_URL || "https://stacks-node-api.testnet.stacks.co",

  // Development
  isDevelopment: process.env.NODE_ENV === "development",
  isProduction: process.env.NODE_ENV === "production",
  isTest: process.env.NODE_ENV === "test",
};

export default config;
