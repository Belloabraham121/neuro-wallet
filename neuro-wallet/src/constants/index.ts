/**
 * Constants for the Neuro Wallet SDK
 */

// SDK Information
export const SDK_VERSION = "1.0.1";
export const SDK_NAME = "@neuro-wallet/sdk";

// Network URLs
export const NETWORK_URLS = {
  MAINNET: "https://api.mainnet.hiro.so",
  TESTNET: "https://api.testnet.hiro.so",
  DEVNET: "http://localhost:3999",
  MOCKNET: "http://localhost:3999",
} as const;

// Chain IDs
export const CHAIN_IDS = {
  MAINNET: 1,
  TESTNET: 2147483648,
} as const;

// Transaction Types
export const TRANSACTION_TYPES = {
  STX_TRANSFER: "stx_transfer",
  CONTRACT_CALL: "contract_call",
  CONTRACT_DEPLOY: "contract_deploy",
  COINBASE: "coinbase",
  POISON_MICROBLOCK: "poison_microblock",
} as const;

// Transaction Status
export const TRANSACTION_STATUS = {
  PENDING: "pending",
  SUCCESS: "success",
  FAILED: "failed",
  DROPPED: "dropped",
  ABORT_BY_RESPONSE: "abort_by_response",
  ABORT_BY_POST_CONDITION: "abort_by_post_condition",
} as const;

// Wallet Types
export const WALLET_TYPES = {
  CUSTODIAL: "CUSTODIAL",
  NON_CUSTODIAL: "NON_CUSTODIAL",
  SOCIAL: "SOCIAL",
} as const;

// Risk Levels
export const RISK_LEVELS = {
  LOW: "LOW",
  MEDIUM: "MEDIUM",
  HIGH: "HIGH",
  CRITICAL: "CRITICAL",
} as const;

// Risk Score Thresholds
export const RISK_THRESHOLDS = {
  LOW: 25,
  MEDIUM: 50,
  HIGH: 75,
  CRITICAL: 90,
} as const;

// Social Providers
export const SOCIAL_PROVIDERS = {
  GOOGLE: "GOOGLE",
  PHONE: "PHONE",
  EMAIL: "EMAIL",
} as const;

// Error Codes
export const ERROR_CODES = {
  INVALID_CONFIG: "INVALID_CONFIG",
  NETWORK_ERROR: "NETWORK_ERROR",
  AUTHENTICATION_ERROR: "AUTHENTICATION_ERROR",
  WALLET_ERROR: "WALLET_ERROR",
  TRANSACTION_ERROR: "TRANSACTION_ERROR",
  COMPLIANCE_ERROR: "COMPLIANCE_ERROR",
  AI_ERROR: "AI_ERROR",
  NOT_IMPLEMENTED: "NOT_IMPLEMENTED",
  INSUFFICIENT_FUNDS: "INSUFFICIENT_FUNDS",
  INVALID_ADDRESS: "INVALID_ADDRESS",
  INVALID_AMOUNT: "INVALID_AMOUNT",
  RATE_LIMITED: "RATE_LIMITED",
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  TRANSACTIONS: "/v2/transactions",
  ACCOUNTS: "/v2/accounts",
  CONTRACTS: "/v2/contracts",
  FEES: "/v2/fees",
  INFO: "/v2/info",
  BLOCKS: "/v2/blocks",
} as const;

// Default Configuration
export const DEFAULT_CONFIG = {
  ENABLE_ANALYTICS: true,
  ENABLE_COMPLIANCE: true,
  REQUEST_TIMEOUT: 30000,
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000,
} as const;

// STX Precision
export const STX_DECIMALS = 6;
export const MICRO_STX_PER_STX = 1000000;

// Gas Limits
export const GAS_LIMITS = {
  DEFAULT: 10000,
  CONTRACT_CALL: 15000,
  CONTRACT_DEPLOY: 50000,
} as const;

// Fee Estimates
export const FEE_ESTIMATES = {
  LOW: 1000,
  MEDIUM: 2000,
  HIGH: 5000,
} as const;
