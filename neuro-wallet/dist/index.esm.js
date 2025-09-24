import axios from 'axios';
import { EventEmitter } from 'eventemitter3';

// Note: These imports will be available after npm install
// import { StacksNetwork } from '@stacks/network';
// import { TransactionVersion } from '@stacks/transactions';
// Error Types
class NeuroWalletError extends Error {
    constructor(message, code, details) {
        super(message);
        this.name = 'NeuroWalletError';
        this.code = code;
        this.details = details;
    }
}

/**
 * Wallet Manager - Handles wallet creation, import, and management
 */
class WalletManager extends EventEmitter {
    constructor(client) {
        super();
        this.client = client;
    }
    /**
     * Create a new wallet
     */
    async createWallet(_options = {}) {
        try {
            // Implementation will be added
            throw new NeuroWalletError("Not implemented yet", "NOT_IMPLEMENTED");
        }
        catch (error) {
            this.emit("error", error);
            throw error;
        }
    }
    /**
     * Import an existing wallet
     */
    async importWallet(_privateKey) {
        try {
            // Implementation will be added
            throw new NeuroWalletError("Not implemented yet", "NOT_IMPLEMENTED");
        }
        catch (error) {
            this.emit("error", error);
            throw error;
        }
    }
    /**
     * Get wallet information
     */
    async getWallet(_address) {
        try {
            // Implementation will be added
            throw new NeuroWalletError("Not implemented yet", "NOT_IMPLEMENTED");
        }
        catch (error) {
            this.emit("error", error);
            throw error;
        }
    }
    /**
     * List all wallets
     */
    async listWallets() {
        try {
            // Implementation will be added
            throw new NeuroWalletError("Not implemented yet", "NOT_IMPLEMENTED");
        }
        catch (error) {
            this.emit("error", error);
            throw error;
        }
    }
    /**
     * Create a social wallet with Google authentication
     */
    async createSocialWalletGoogle(options) {
        try {
            const response = await this.client.api.post('/wallets/social/google', {
                provider: 'GOOGLE',
                providerId: options.userInfo?.email || 'google_user',
                providerData: {
                    googleToken: options.googleToken,
                    userInfo: options.userInfo,
                },
            });
            const result = {
                wallet: {
                    address: response.data.wallet.address,
                    publicKey: response.data.wallet.publicKey,
                    walletType: 'SOCIAL',
                    isActive: response.data.wallet.isActive,
                    metadata: response.data.wallet.metadata,
                },
                user: response.data.user,
                tokens: response.data.tokens,
            };
            this.emit('wallet:social:created', result);
            return result;
        }
        catch (error) {
            this.emit('error', error);
            throw new NeuroWalletError(error instanceof Error ? error.message : 'Failed to create Google social wallet', 'SOCIAL_WALLET_CREATION_FAILED');
        }
    }
    /**
     * Create a social wallet with phone authentication
     */
    async createSocialWalletPhone(options) {
        try {
            if (!options.verificationCode) {
                throw new NeuroWalletError('Verification code is required for phone authentication', 'VERIFICATION_CODE_REQUIRED');
            }
            const response = await this.client.api.post('/wallets/social/phone', {
                provider: 'PHONE',
                providerId: options.phoneNumber,
                verificationCode: options.verificationCode,
            });
            const result = {
                wallet: {
                    address: response.data.wallet.address,
                    publicKey: response.data.wallet.publicKey,
                    walletType: 'SOCIAL',
                    isActive: response.data.wallet.isActive,
                    metadata: response.data.wallet.metadata,
                },
                user: response.data.user,
                tokens: response.data.tokens,
            };
            this.emit('wallet:social:created', result);
            return result;
        }
        catch (error) {
            this.emit('error', error);
            throw new NeuroWalletError(error instanceof Error ? error.message : 'Failed to create phone social wallet', 'SOCIAL_WALLET_CREATION_FAILED');
        }
    }
    /**
     * Create a social wallet with generic social auth options
     */
    async createSocialWallet(options) {
        try {
            if (options.provider === 'GOOGLE') {
                if (!options.providerData?.['googleToken']) {
                    throw new NeuroWalletError('Google token is required', 'GOOGLE_TOKEN_REQUIRED');
                }
                return this.createSocialWalletGoogle({
                    googleToken: options.providerData['googleToken'],
                    userInfo: options.providerData['userInfo'],
                });
            }
            else if (options.provider === 'PHONE') {
                if (!options.verificationCode) {
                    throw new NeuroWalletError('Verification code is required for phone authentication', 'VERIFICATION_CODE_REQUIRED');
                }
                return this.createSocialWalletPhone({
                    phoneNumber: options.providerId,
                    verificationCode: options.verificationCode,
                });
            }
            else {
                throw new NeuroWalletError(`Unsupported social provider: ${options.provider}`, 'UNSUPPORTED_PROVIDER');
            }
        }
        catch (error) {
            this.emit('error', error);
            throw error;
        }
    }
}

/**
 * Transaction Manager - Handles transaction creation, signing, and broadcasting
 */
class TransactionManager extends EventEmitter {
    constructor(client) {
        super();
        this._client = client;
    }
    /**
     * Send STX tokens
     */
    async sendSTX(_options) {
        try {
            // Implementation will be added
            throw new NeuroWalletError("Not implemented yet", "NOT_IMPLEMENTED");
        }
        catch (error) {
            this.emit("error", error);
            throw error;
        }
    }
    /**
     * Call a smart contract function
     */
    async callContract(_options) {
        try {
            // Implementation will be added
            throw new NeuroWalletError("Not implemented yet", "NOT_IMPLEMENTED");
        }
        catch (error) {
            this.emit("error", error);
            throw error;
        }
    }
    /**
     * Get transaction status
     */
    async getTransaction(_txId) {
        try {
            // Implementation will be added
            throw new NeuroWalletError("Not implemented yet", "NOT_IMPLEMENTED");
        }
        catch (error) {
            this.emit("error", error);
            throw error;
        }
    }
    /**
     * Estimate transaction fee
     */
    async estimateFee(_options) {
        try {
            // Implementation will be added
            throw new NeuroWalletError("Not implemented yet", "NOT_IMPLEMENTED");
        }
        catch (error) {
            this.emit("error", error);
            throw error;
        }
    }
}

/**
 * Authentication Manager - Handles Stacks Connect integration
 */
class AuthManager extends EventEmitter {
    constructor(client) {
        super();
        this._client = client;
    }
    /**
     * Connect to a Stacks wallet
     */
    async connect(_options) {
        try {
            // Implementation will be added
            throw new NeuroWalletError('Not implemented yet', 'NOT_IMPLEMENTED');
        }
        catch (error) {
            this.emit('error', error);
            throw error;
        }
    }
    /**
     * Disconnect from wallet
     */
    async disconnect() {
        try {
            // Implementation will be added
            throw new NeuroWalletError('Not implemented yet', 'NOT_IMPLEMENTED');
        }
        catch (error) {
            this.emit('error', error);
            throw error;
        }
    }
    /**
     * Check if user is authenticated
     */
    isAuthenticated() {
        // Implementation will be added
        return false;
    }
    /**
     * Get current user session
     */
    getUserSession() {
        // Implementation will be added
        return null;
    }
    /**
     * Send phone verification code
     */
    async sendPhoneVerificationCode(phoneNumber) {
        try {
            const response = await this._client.api.post('/auth/phone/send-code', {
                phoneNumber,
            });
            this.emit('phone:verification:sent', { phoneNumber });
            return {
                success: true,
                message: response.data.message || 'Verification code sent successfully',
            };
        }
        catch (error) {
            this.emit('error', error);
            throw new NeuroWalletError(error instanceof Error ? error.message : 'Failed to send verification code', 'PHONE_VERIFICATION_FAILED');
        }
    }
    /**
     * Verify phone number with code
     */
    async verifyPhoneNumber(phoneNumber, verificationCode) {
        try {
            const response = await this._client.api.post('/auth/phone/verify', {
                phoneNumber,
                verificationCode,
            });
            const result = {
                success: response.data.success,
                verified: response.data.verified,
                message: response.data.message || 'Phone verification completed',
                user: response.data.user,
                tokens: response.data.tokens,
            };
            if (result.success) {
                this.emit('phone:verification:success', result);
            }
            else {
                this.emit('phone:verification:failed', { phoneNumber });
            }
            return result;
        }
        catch (error) {
            this.emit('error', error);
            throw new NeuroWalletError(error instanceof Error ? error.message : 'Failed to verify phone number', 'PHONE_VERIFICATION_FAILED');
        }
    }
    /**
     * Login with phone number (after verification)
     */
    async loginWithPhone(phoneNumber, verificationCode) {
        try {
            const response = await this._client.api.post('/auth/phone/login', {
                phoneNumber,
                verificationCode,
            });
            this.emit('auth:login:success', response.data);
            return response.data;
        }
        catch (error) {
            this.emit('error', error);
            throw new NeuroWalletError(error instanceof Error ? error.message : 'Failed to login with phone', 'PHONE_LOGIN_FAILED');
        }
    }
}

/**
 * Compliance Manager - Handles regulatory compliance and risk assessment
 */
class ComplianceManager extends EventEmitter {
    constructor(client) {
        super();
        this._client = client;
    }
    /**
     * Assess transaction risk before execution
     */
    async assessTransactionRisk(_transaction) {
        try {
            // Implementation will be added
            throw new NeuroWalletError('Not implemented yet', 'NOT_IMPLEMENTED');
        }
        catch (error) {
            this.emit('error', error);
            throw error;
        }
    }
    /**
     * Check if address is compliant
     */
    async checkAddress(_address) {
        try {
            // Implementation will be added
            throw new NeuroWalletError('Not implemented yet', 'NOT_IMPLEMENTED');
        }
        catch (error) {
            this.emit('error', error);
            throw error;
        }
    }
    /**
     * Monitor transaction for compliance
     */
    async monitorTransaction(_txId) {
        try {
            // Implementation will be added
            throw new NeuroWalletError('Not implemented yet', 'NOT_IMPLEMENTED');
        }
        catch (error) {
            this.emit('error', error);
            throw error;
        }
    }
}

/**
 * Analytics Manager - Handles transaction and wallet analytics
 */
class AnalyticsManager extends EventEmitter {
    constructor(client) {
        super();
        this._client = client;
    }
    /**
     * Get transaction analytics
     */
    async getTransactionAnalytics(_timeRange) {
        try {
            // Implementation will be added
            throw new NeuroWalletError('Not implemented yet', 'NOT_IMPLEMENTED');
        }
        catch (error) {
            this.emit('error', error);
            throw error;
        }
    }
    /**
     * Get wallet analytics
     */
    async getWalletAnalytics() {
        try {
            // Implementation will be added
            throw new NeuroWalletError('Not implemented yet', 'NOT_IMPLEMENTED');
        }
        catch (error) {
            this.emit('error', error);
            throw error;
        }
    }
    /**
     * Track custom event
     */
    async trackEvent(_event, _data) {
        try {
            // Implementation will be added
            throw new NeuroWalletError('Not implemented yet', 'NOT_IMPLEMENTED');
        }
        catch (error) {
            this.emit('error', error);
            throw error;
        }
    }
}

/**
 * AI Assistant - Handles natural language commands and intelligent automation
 */
class AIAssistant extends EventEmitter {
    constructor(client) {
        super();
        this._client = client;
    }
    /**
     * Process a natural language command
     */
    async processCommand(_command, _context) {
        try {
            // Implementation will be added
            throw new NeuroWalletError('Not implemented yet', 'NOT_IMPLEMENTED');
        }
        catch (error) {
            this.emit('error', error);
            throw error;
        }
    }
    /**
     * Get AI-powered insights
     */
    async getInsights(_data) {
        try {
            // Implementation will be added
            throw new NeuroWalletError('Not implemented yet', 'NOT_IMPLEMENTED');
        }
        catch (error) {
            this.emit('error', error);
            throw error;
        }
    }
    /**
     * Generate transaction explanation
     */
    async explainTransaction(_txId) {
        try {
            // Implementation will be added
            throw new NeuroWalletError('Not implemented yet', 'NOT_IMPLEMENTED');
        }
        catch (error) {
            this.emit('error', error);
            throw error;
        }
    }
}

// Note: These imports will be available after npm install
// import { StacksMainnet, StacksTestnet, StacksDevnet, StacksMocknet } from '@stacks/network';
// Temporary network implementations
class StacksMainnet {
    constructor() {
        this.coreApiUrl = "https://api.mainnet.hiro.so";
        this.version = { mainnet: 1, testnet: 0 };
        this.chainId = 1;
    }
    getBroadcastApiUrl() {
        return `${this.coreApiUrl}/v2/transactions`;
    }
    getTransferFeeEstimateApiUrl() {
        return `${this.coreApiUrl}/v2/fees/transfer`;
    }
    getAccountApiUrl(address) {
        return `${this.coreApiUrl}/v2/accounts/${address}`;
    }
    getAbiApiUrl(address, contract) {
        return `${this.coreApiUrl}/v2/contracts/interface/${address}/${contract}`;
    }
    getReadOnlyFunctionCallApiUrl(address, contract, fn) {
        return `${this.coreApiUrl}/v2/contracts/call-read/${address}/${contract}/${fn}`;
    }
}
class StacksTestnet {
    constructor() {
        this.coreApiUrl = "https://api.testnet.hiro.so";
        this.version = { mainnet: 0, testnet: 1 };
        this.chainId = 2147483648;
    }
    getBroadcastApiUrl() {
        return `${this.coreApiUrl}/v2/transactions`;
    }
    getTransferFeeEstimateApiUrl() {
        return `${this.coreApiUrl}/v2/fees/transfer`;
    }
    getAccountApiUrl(address) {
        return `${this.coreApiUrl}/v2/accounts/${address}`;
    }
    getAbiApiUrl(address, contract) {
        return `${this.coreApiUrl}/v2/contracts/interface/${address}/${contract}`;
    }
    getReadOnlyFunctionCallApiUrl(address, contract, fn) {
        return `${this.coreApiUrl}/v2/contracts/call-read/${address}/${contract}/${fn}`;
    }
}
class StacksDevnet {
    constructor() {
        this.coreApiUrl = "http://localhost:3999";
        this.version = { mainnet: 0, testnet: 1 };
        this.chainId = 2147483648;
    }
    getBroadcastApiUrl() {
        return `${this.coreApiUrl}/v2/transactions`;
    }
    getTransferFeeEstimateApiUrl() {
        return `${this.coreApiUrl}/v2/fees/transfer`;
    }
    getAccountApiUrl(address) {
        return `${this.coreApiUrl}/v2/accounts/${address}`;
    }
    getAbiApiUrl(address, contract) {
        return `${this.coreApiUrl}/v2/contracts/interface/${address}/${contract}`;
    }
    getReadOnlyFunctionCallApiUrl(address, contract, fn) {
        return `${this.coreApiUrl}/v2/contracts/call-read/${address}/${contract}/${fn}`;
    }
}
class StacksMocknet {
    constructor() {
        this.coreApiUrl = "http://localhost:3999";
        this.version = { mainnet: 0, testnet: 1 };
        this.chainId = 2147483648;
    }
    getBroadcastApiUrl() {
        return `${this.coreApiUrl}/v2/transactions`;
    }
    getTransferFeeEstimateApiUrl() {
        return `${this.coreApiUrl}/v2/fees/transfer`;
    }
    getAccountApiUrl(address) {
        return `${this.coreApiUrl}/v2/accounts/${address}`;
    }
    getAbiApiUrl(address, contract) {
        return `${this.coreApiUrl}/v2/contracts/interface/${address}/${contract}`;
    }
    getReadOnlyFunctionCallApiUrl(address, contract, fn) {
        return `${this.coreApiUrl}/v2/contracts/call-read/${address}/${contract}/${fn}`;
    }
}
/**
 * Main NeuroWallet SDK Client
 * Provides a unified interface for all wallet, transaction, and compliance operations
 */
class NeuroWalletClient extends EventEmitter {
    constructor(config) {
        super();
        this.validateConfig(config);
        this.config = config;
        this.networkConfig = this.createNetworkConfig(config.network);
        // Initialize HTTP client for API calls
        this.api = axios.create({
            baseURL: "https://neuro-wallet-hzim.vercel.app/api", // Adjust to your backend API URL
            headers: {
                Authorization: `Bearer ${config.apiKey}`,
                "Content-Type": "application/json",
            },
        });
        // Initialize module managers
        this.wallet = new WalletManager(this);
        this.transaction = new TransactionManager(this);
        this.auth = new AuthManager(this);
        this.compliance = new ComplianceManager(this);
        this.analytics = new AnalyticsManager(this);
        this.ai = new AIAssistant(this);
        // Set up error handling
        this.setupErrorHandling();
    }
    /**
     * Get the current configuration
     */
    getConfig() {
        return { ...this.config };
    }
    /**
     * Get the network configuration
     */
    getNetworkConfig() {
        return { ...this.networkConfig };
    }
    /**
     * Update the API key
     */
    updateApiKey(apiKey) {
        this.config.apiKey = apiKey;
    }
    /**
     * Switch to a different network
     */
    switchNetwork(network) {
        this.config.network = network;
        this.networkConfig = this.createNetworkConfig(network);
        // Note: 'network:changed' event will be added to SDKEvents interface
    }
    /**
     * Get the current network type
     */
    getNetworkType() {
        const url = this.config.network.coreApiUrl;
        if (url.includes("mainnet"))
            return "mainnet";
        if (url.includes("testnet"))
            return "testnet";
        if (url.includes("devnet"))
            return "devnet";
        return "mocknet";
    }
    /**
     * Check if the SDK is properly configured
     */
    isConfigured() {
        return !!(this.config.apiKey && this.config.network);
    }
    /**
     * Get SDK version and status
     */
    getStatus() {
        return {
            version: "1.0.0",
            network: this.getNetworkType(),
            configured: this.isConfigured(),
            modules: {
                wallet: true,
                transaction: true,
                auth: true,
                compliance: this.config.enableCompliance ?? true,
                analytics: this.config.enableAnalytics ?? true,
                ai: this.config.aiAssistant?.enabled ?? false,
            },
        };
    }
    /**
     * Validate the configuration
     */
    validateConfig(config) {
        if (!config.apiKey) {
            throw new NeuroWalletError("API key is required", "INVALID_CONFIG");
        }
        if (!config.network) {
            throw new NeuroWalletError("Network configuration is required", "INVALID_CONFIG");
        }
        if (config.aiAssistant?.enabled && !config.aiAssistant.apiKey) {
            throw new NeuroWalletError("AI Assistant API key is required when AI is enabled", "INVALID_CONFIG");
        }
    }
    /**
     * Create network configuration from Stacks network
     */
    createNetworkConfig(network) {
        return {
            network,
            coreApiUrl: network.coreApiUrl,
            broadcastEndpoint: network.getBroadcastApiUrl(),
            transferFeeEstimateEndpoint: network.getTransferFeeEstimateApiUrl(),
            accountEndpoint: network.getAccountApiUrl(""),
            contractAbiEndpoint: network.getAbiApiUrl("", ""),
            readOnlyFunctionCallEndpoint: network.getReadOnlyFunctionCallApiUrl("", "", ""),
            transactionVersion: network.version,
        };
    }
    /**
     * Set up global error handling
     */
    setupErrorHandling() {
        // Handle uncaught errors from modules
        this.wallet.on("error", (error) => this.emit("error", error));
        this.transaction.on("error", (error) => this.emit("error", error));
        this.auth.on("error", (error) => this.emit("error", error));
        this.compliance.on("error", (error) => this.emit("error", error));
        this.analytics.on("error", (error) => this.emit("error", error));
        this.ai.on("error", (error) => this.emit("error", error));
    }
    /**
     * Create a new NeuroWallet client instance
     */
    static create(config) {
        return new NeuroWalletClient(config);
    }
    /**
     * Create a client with predefined network configurations
     */
    static createForMainnet(apiKey, options) {
        return new NeuroWalletClient({
            apiKey,
            network: new StacksMainnet(),
            ...options,
        });
    }
    static createForTestnet(apiKey, options) {
        return new NeuroWalletClient({
            apiKey,
            network: new StacksTestnet(),
            ...options,
        });
    }
    static createForDevnet(apiKey, options) {
        return new NeuroWalletClient({
            apiKey,
            network: new StacksDevnet(),
            ...options,
        });
    }
    static createForMocknet(apiKey, options) {
        return new NeuroWalletClient({
            apiKey,
            network: new StacksMocknet(),
            ...options,
        });
    }
}

/**
 * Utility functions for the Neuro Wallet SDK
 */
/**
 * Validate a Stacks address
 */
function isValidStacksAddress(address) {
    // Basic validation - will be enhanced with proper Stacks validation
    return /^S[0-9A-Z]{25,34}$/.test(address) || /^ST[0-9A-Z]{25,34}$/.test(address);
}
/**
 * Format STX amount from microSTX
 */
function formatSTX(microSTX) {
    const amount = typeof microSTX === 'string' ? parseInt(microSTX) : microSTX;
    return (amount / 1000000).toFixed(6);
}
/**
 * Convert STX to microSTX
 */
function toMicroSTX(stx) {
    const amount = typeof stx === 'string' ? parseFloat(stx) : stx;
    return Math.floor(amount * 1000000).toString();
}
/**
 * Generate a random hex string
 */
function randomHex(length) {
    const chars = '0123456789abcdef';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
}
/**
 * Sleep utility
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
/**
 * Retry utility
 */
async function retry(fn, maxAttempts = 3, delay = 1000) {
    let lastError;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            return await fn();
        }
        catch (error) {
            lastError = error;
            if (attempt === maxAttempts)
                break;
            await sleep(delay * attempt);
        }
    }
    throw lastError;
}
/**
 * Deep clone utility
 */
function deepClone(obj) {
    if (obj === null || typeof obj !== 'object')
        return obj;
    if (obj instanceof Date)
        return new Date(obj.getTime());
    if (obj instanceof Array)
        return obj.map(item => deepClone(item));
    if (typeof obj === 'object') {
        const cloned = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                cloned[key] = deepClone(obj[key]);
            }
        }
        return cloned;
    }
    return obj;
}

/**
 * Constants for the Neuro Wallet SDK
 */
// SDK Information
const SDK_NAME = "@neuro-wallet/sdk";
// Network URLs
const NETWORK_URLS = {
    MAINNET: "https://api.mainnet.hiro.so",
    TESTNET: "https://api.testnet.hiro.so",
    DEVNET: "http://localhost:3999",
    MOCKNET: "http://localhost:3999",
};
// Chain IDs
const CHAIN_IDS = {
    MAINNET: 1,
    TESTNET: 2147483648,
};
// Transaction Types
const TRANSACTION_TYPES = {
    STX_TRANSFER: "stx_transfer",
    CONTRACT_CALL: "contract_call",
    CONTRACT_DEPLOY: "contract_deploy",
    COINBASE: "coinbase",
    POISON_MICROBLOCK: "poison_microblock",
};
// Transaction Status
const TRANSACTION_STATUS = {
    PENDING: "pending",
    SUCCESS: "success",
    FAILED: "failed",
    DROPPED: "dropped",
    ABORT_BY_RESPONSE: "abort_by_response",
    ABORT_BY_POST_CONDITION: "abort_by_post_condition",
};
// Wallet Types
const WALLET_TYPES = {
    CUSTODIAL: "CUSTODIAL",
    NON_CUSTODIAL: "NON_CUSTODIAL",
    SOCIAL: "SOCIAL",
};
// Risk Levels
const RISK_LEVELS = {
    LOW: "LOW",
    MEDIUM: "MEDIUM",
    HIGH: "HIGH",
    CRITICAL: "CRITICAL",
};
// Risk Score Thresholds
const RISK_THRESHOLDS = {
    LOW: 25,
    MEDIUM: 50,
    HIGH: 75,
    CRITICAL: 90,
};
// Social Providers
const SOCIAL_PROVIDERS = {
    GOOGLE: "GOOGLE",
    PHONE: "PHONE",
    EMAIL: "EMAIL",
};
// Error Codes
const ERROR_CODES = {
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
};
// API Endpoints
const API_ENDPOINTS = {
    TRANSACTIONS: "/v2/transactions",
    ACCOUNTS: "/v2/accounts",
    CONTRACTS: "/v2/contracts",
    FEES: "/v2/fees",
    INFO: "/v2/info",
    BLOCKS: "/v2/blocks",
};
// Default Configuration
const DEFAULT_CONFIG = {
    ENABLE_ANALYTICS: true,
    ENABLE_COMPLIANCE: true,
    REQUEST_TIMEOUT: 30000,
    MAX_RETRIES: 3,
    RETRY_DELAY: 1000,
};
// STX Precision
const STX_DECIMALS = 6;
const MICRO_STX_PER_STX = 1000000;
// Gas Limits
const GAS_LIMITS = {
    DEFAULT: 10000,
    CONTRACT_CALL: 15000,
    CONTRACT_DEPLOY: 50000,
};
// Fee Estimates
const FEE_ESTIMATES = {
    LOW: 1000,
    MEDIUM: 2000,
    HIGH: 5000,
};

/**
 * Neuro Wallet SDK - AI-Powered Onchain SDK for Wallets, Gasless Transactions & Compliance
 *
 * This SDK provides a comprehensive solution for building blockchain applications
 * with integrated AI-powered compliance, analytics, and wallet management.
 */
// Core client
// Version
const SDK_VERSION = '1.0.0';
/**
 * Quick start function to create a client
 */
function createClient(config) {
    return new NeuroWalletClient(config);
}

export { AIAssistant, API_ENDPOINTS, AnalyticsManager, AuthManager, CHAIN_IDS, ComplianceManager, DEFAULT_CONFIG, ERROR_CODES, FEE_ESTIMATES, GAS_LIMITS, MICRO_STX_PER_STX, NETWORK_URLS, NeuroWalletClient, NeuroWalletError, RISK_LEVELS, RISK_THRESHOLDS, SDK_NAME, SDK_VERSION, SOCIAL_PROVIDERS, STX_DECIMALS, TRANSACTION_STATUS, TRANSACTION_TYPES, TransactionManager, WALLET_TYPES, WalletManager, createClient, deepClone, NeuroWalletClient as default, formatSTX, isValidStacksAddress, randomHex, retry, sleep, toMicroSTX };
//# sourceMappingURL=index.esm.js.map
