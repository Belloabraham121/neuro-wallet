import { EventEmitter } from 'eventemitter3';

interface StacksNetwork {
    version: any;
    chainId: any;
    coreApiUrl: string;
    getBroadcastApiUrl(): string;
    getTransferFeeEstimateApiUrl(): string;
    getAccountApiUrl(address: string): string;
    getAbiApiUrl(address: string, contract: string): string;
    getReadOnlyFunctionCallApiUrl(address: string, contract: string, fn: string): string;
}
interface TransactionVersion {
    mainnet: number;
    testnet: number;
}
interface NeuroWalletConfig {
    apiKey: string;
    baseUrl?: string;
    network: StacksNetwork;
    enableAnalytics?: boolean;
    enableCompliance?: boolean;
    aiAssistant?: {
        enabled: boolean;
        apiKey?: string;
    };
}
interface NetworkConfig {
    network: StacksNetwork;
    coreApiUrl: string;
    broadcastEndpoint: string;
    transferFeeEstimateEndpoint: string;
    accountEndpoint: string;
    contractAbiEndpoint: string;
    readOnlyFunctionCallEndpoint: string;
    transactionVersion: TransactionVersion;
}
interface WalletInfo {
    address: string;
    publicKey: string;
    walletType: 'CUSTODIAL' | 'NON_CUSTODIAL' | 'SOCIAL';
    isActive: boolean;
    metadata?: Record<string, any>;
}
interface CreateWalletOptions {
    walletType?: 'CUSTODIAL' | 'NON_CUSTODIAL' | 'SOCIAL';
    socialProvider?: 'GOOGLE' | 'PHONE' | 'EMAIL';
    metadata?: Record<string, any>;
}
interface WalletKeys {
    privateKey: string;
    publicKey: string;
    address: string;
    mnemonic?: string;
}
interface TransactionOptions {
    recipient: string;
    amount: string | number;
    memo?: string;
    fee?: string | number;
    nonce?: number;
    sponsored?: boolean;
    postConditions?: any[];
}
interface ContractCallOptions {
    contractAddress: string;
    contractName: string;
    functionName: string;
    functionArgs: any[];
    fee?: string | number;
    nonce?: number;
    sponsored?: boolean;
    postConditions?: any[];
}
interface TransactionResult {
    txId: string;
    status: 'PENDING' | 'SUCCESS' | 'FAILED';
    blockHeight?: number;
    fee: string;
    gasUsed?: number;
    error?: string;
}
interface RiskAssessment {
    riskScore: number;
    riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    flags: string[];
    explanation: string;
    recommendations: string[];
}
interface ComplianceCheck {
    address: string;
    isBlacklisted: boolean;
    isSanctioned: boolean;
    riskFactors: string[];
    confidence: number;
}
interface TransactionAnalytics {
    totalTransactions: number;
    totalVolume: string;
    averageTransactionSize: string;
    successRate: number;
    timeRange: {
        start: Date;
        end: Date;
    };
}
interface WalletAnalytics {
    totalWallets: number;
    activeWallets: number;
    walletsByType: Record<string, number>;
    totalBalance: string;
}
interface AICommand {
    command: string;
    parameters?: Record<string, any>;
    context?: Record<string, any>;
}
interface AIResponse {
    success: boolean;
    result?: any;
    explanation: string;
    suggestions?: string[];
    error?: string;
}
interface AuthOptions {
    appDetails: {
        name: string;
        icon: string;
    };
    redirectTo?: string;
    manifestPath?: string;
    sendToSignIn?: boolean;
    userSession?: any;
}
interface AuthResult {
    userSession: any;
    userData: any;
    appPrivateKey: string;
}
declare class NeuroWalletError extends Error {
    code: string;
    details?: any;
    constructor(message: string, code: string, details?: any);
}
interface SDKEvents {
    'wallet:created': WalletInfo;
    'wallet:imported': WalletInfo;
    'transaction:sent': TransactionResult;
    'transaction:confirmed': TransactionResult;
    'transaction:failed': TransactionResult;
    'compliance:flagged': RiskAssessment;
    'auth:connected': AuthResult;
    'auth:disconnected': void;
    'error': NeuroWalletError;
}
type EventCallback<T = any> = (data: T) => void;
type NetworkType = 'mainnet' | 'testnet' | 'devnet' | 'mocknet';
type WalletType = 'CUSTODIAL' | 'NON_CUSTODIAL' | 'SOCIAL';
type TransactionStatus = 'PENDING' | 'SUCCESS' | 'FAILED';
type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

/**
 * Wallet Manager - Handles wallet creation, import, and management
 */
declare class WalletManager extends EventEmitter<SDKEvents> {
    private client;
    constructor(client: any);
    /**
     * Create a new wallet
     */
    createWallet(options?: CreateWalletOptions): Promise<WalletInfo>;
    /**
     * Import an existing wallet
     */
    importWallet(privateKey: string): Promise<WalletInfo>;
    /**
     * Get wallet information
     */
    getWallet(address: string): Promise<WalletInfo>;
    /**
     * List all wallets
     */
    listWallets(): Promise<WalletInfo[]>;
}

/**
 * Transaction Manager - Handles transaction creation, signing, and broadcasting
 */
declare class TransactionManager extends EventEmitter<SDKEvents> {
    private client;
    constructor(client: any);
    /**
     * Send STX tokens
     */
    sendSTX(options: TransactionOptions): Promise<TransactionResult>;
    /**
     * Call a smart contract function
     */
    callContract(options: ContractCallOptions): Promise<TransactionResult>;
    /**
     * Get transaction status
     */
    getTransaction(txId: string): Promise<TransactionResult>;
    /**
     * Estimate transaction fee
     */
    estimateFee(options: TransactionOptions | ContractCallOptions): Promise<string>;
}

/**
 * Authentication Manager - Handles Stacks Connect integration
 */
declare class AuthManager extends EventEmitter<SDKEvents> {
    private client;
    constructor(client: any);
    /**
     * Connect to a Stacks wallet
     */
    connect(options: AuthOptions): Promise<AuthResult>;
    /**
     * Disconnect from wallet
     */
    disconnect(): Promise<void>;
    /**
     * Check if user is authenticated
     */
    isAuthenticated(): boolean;
    /**
     * Get current user session
     */
    getUserSession(): any;
}

/**
 * Compliance Manager - Handles AI-powered compliance and risk assessment
 */
declare class ComplianceManager extends EventEmitter<SDKEvents> {
    private client;
    constructor(client: any);
    /**
     * Assess transaction risk
     */
    assessTransactionRisk(transaction: any): Promise<RiskAssessment>;
    /**
     * Check address compliance
     */
    checkAddress(address: string): Promise<ComplianceCheck>;
    /**
     * Monitor transactions for compliance
     */
    monitorTransaction(txId: string): Promise<RiskAssessment>;
}

/**
 * Analytics Manager - Handles transaction and wallet analytics
 */
declare class AnalyticsManager extends EventEmitter<SDKEvents> {
    private client;
    constructor(client: any);
    /**
     * Get transaction analytics
     */
    getTransactionAnalytics(timeRange?: {
        start: Date;
        end: Date;
    }): Promise<TransactionAnalytics>;
    /**
     * Get wallet analytics
     */
    getWalletAnalytics(): Promise<WalletAnalytics>;
    /**
     * Track custom event
     */
    trackEvent(event: string, data?: any): Promise<void>;
}

/**
 * AI Assistant - Handles natural language commands and intelligent automation
 */
declare class AIAssistant extends EventEmitter<SDKEvents> {
    private client;
    constructor(client: any);
    /**
     * Process a natural language command
     */
    processCommand(command: string, context?: any): Promise<AIResponse>;
    /**
     * Get AI-powered insights
     */
    getInsights(data: any): Promise<AIResponse>;
    /**
     * Generate transaction explanation
     */
    explainTransaction(txId: string): Promise<string>;
}

/**
 * Main NeuroWallet SDK Client
 * Provides a unified interface for all wallet, transaction, and compliance operations
 */
declare class NeuroWalletClient extends EventEmitter<SDKEvents> {
    private config;
    private networkConfig;
    readonly wallet: WalletManager;
    readonly transaction: TransactionManager;
    readonly auth: AuthManager;
    readonly compliance: ComplianceManager;
    readonly analytics: AnalyticsManager;
    readonly ai: AIAssistant;
    constructor(config: NeuroWalletConfig);
    /**
     * Get the current configuration
     */
    getConfig(): NeuroWalletConfig;
    /**
     * Get the network configuration
     */
    getNetworkConfig(): NetworkConfig;
    /**
     * Update the API key
     */
    updateApiKey(apiKey: string): void;
    /**
     * Switch to a different network
     */
    switchNetwork(network: StacksNetwork): void;
    /**
     * Get the current network type
     */
    getNetworkType(): NetworkType;
    /**
     * Check if the SDK is properly configured
     */
    isConfigured(): boolean;
    /**
     * Get SDK version and status
     */
    getStatus(): {
        version: string;
        network: NetworkType;
        configured: boolean;
        modules: {
            wallet: boolean;
            transaction: boolean;
            auth: boolean;
            compliance: boolean;
            analytics: boolean;
            ai: boolean;
        };
    };
    /**
     * Validate the configuration
     */
    private validateConfig;
    /**
     * Create network configuration from Stacks network
     */
    private createNetworkConfig;
    /**
     * Set up global error handling
     */
    private setupErrorHandling;
    /**
     * Create a new NeuroWallet client instance
     */
    static create(config: NeuroWalletConfig): NeuroWalletClient;
    /**
     * Create a client with predefined network configurations
     */
    static createForMainnet(apiKey: string, options?: Partial<NeuroWalletConfig>): NeuroWalletClient;
    static createForTestnet(apiKey: string, options?: Partial<NeuroWalletConfig>): NeuroWalletClient;
    static createForDevnet(apiKey: string, options?: Partial<NeuroWalletConfig>): NeuroWalletClient;
    static createForMocknet(apiKey: string, options?: Partial<NeuroWalletConfig>): NeuroWalletClient;
}

/**
 * Utility functions for the Neuro Wallet SDK
 */
/**
 * Validate a Stacks address
 */
declare function isValidStacksAddress(address: string): boolean;
/**
 * Format STX amount from microSTX
 */
declare function formatSTX(microSTX: string | number): string;
/**
 * Convert STX to microSTX
 */
declare function toMicroSTX(stx: string | number): string;
/**
 * Generate a random hex string
 */
declare function randomHex(length: number): string;
/**
 * Sleep utility
 */
declare function sleep(ms: number): Promise<void>;
/**
 * Retry utility
 */
declare function retry<T>(fn: () => Promise<T>, maxAttempts?: number, delay?: number): Promise<T>;
/**
 * Deep clone utility
 */
declare function deepClone<T>(obj: T): T;

declare const SDK_NAME = "@neuro-wallet/sdk";
declare const NETWORK_URLS: {
    readonly MAINNET: "https://api.mainnet.hiro.so";
    readonly TESTNET: "https://api.testnet.hiro.so";
    readonly DEVNET: "http://localhost:3999";
    readonly MOCKNET: "http://localhost:3999";
};
declare const CHAIN_IDS: {
    readonly MAINNET: 1;
    readonly TESTNET: 2147483648;
};
declare const TRANSACTION_TYPES: {
    readonly STX_TRANSFER: "stx_transfer";
    readonly CONTRACT_CALL: "contract_call";
    readonly CONTRACT_DEPLOY: "contract_deploy";
    readonly COINBASE: "coinbase";
    readonly POISON_MICROBLOCK: "poison_microblock";
};
declare const TRANSACTION_STATUS: {
    readonly PENDING: "pending";
    readonly SUCCESS: "success";
    readonly FAILED: "failed";
    readonly DROPPED: "dropped";
    readonly ABORT_BY_RESPONSE: "abort_by_response";
    readonly ABORT_BY_POST_CONDITION: "abort_by_post_condition";
};
declare const WALLET_TYPES: {
    readonly CUSTODIAL: "CUSTODIAL";
    readonly NON_CUSTODIAL: "NON_CUSTODIAL";
    readonly SOCIAL: "SOCIAL";
};
declare const RISK_LEVELS: {
    readonly LOW: "LOW";
    readonly MEDIUM: "MEDIUM";
    readonly HIGH: "HIGH";
    readonly CRITICAL: "CRITICAL";
};
declare const RISK_THRESHOLDS: {
    readonly LOW: 25;
    readonly MEDIUM: 50;
    readonly HIGH: 75;
    readonly CRITICAL: 90;
};
declare const SOCIAL_PROVIDERS: {
    readonly GOOGLE: "GOOGLE";
    readonly PHONE: "PHONE";
    readonly EMAIL: "EMAIL";
};
declare const ERROR_CODES: {
    readonly INVALID_CONFIG: "INVALID_CONFIG";
    readonly NETWORK_ERROR: "NETWORK_ERROR";
    readonly AUTHENTICATION_ERROR: "AUTHENTICATION_ERROR";
    readonly WALLET_ERROR: "WALLET_ERROR";
    readonly TRANSACTION_ERROR: "TRANSACTION_ERROR";
    readonly COMPLIANCE_ERROR: "COMPLIANCE_ERROR";
    readonly AI_ERROR: "AI_ERROR";
    readonly NOT_IMPLEMENTED: "NOT_IMPLEMENTED";
    readonly INSUFFICIENT_FUNDS: "INSUFFICIENT_FUNDS";
    readonly INVALID_ADDRESS: "INVALID_ADDRESS";
    readonly INVALID_AMOUNT: "INVALID_AMOUNT";
    readonly RATE_LIMITED: "RATE_LIMITED";
};
declare const API_ENDPOINTS: {
    readonly TRANSACTIONS: "/v2/transactions";
    readonly ACCOUNTS: "/v2/accounts";
    readonly CONTRACTS: "/v2/contracts";
    readonly FEES: "/v2/fees";
    readonly INFO: "/v2/info";
    readonly BLOCKS: "/v2/blocks";
};
declare const DEFAULT_CONFIG: {
    readonly ENABLE_ANALYTICS: true;
    readonly ENABLE_COMPLIANCE: true;
    readonly REQUEST_TIMEOUT: 30000;
    readonly MAX_RETRIES: 3;
    readonly RETRY_DELAY: 1000;
};
declare const STX_DECIMALS = 6;
declare const MICRO_STX_PER_STX = 1000000;
declare const GAS_LIMITS: {
    readonly DEFAULT: 10000;
    readonly CONTRACT_CALL: 15000;
    readonly CONTRACT_DEPLOY: 50000;
};
declare const FEE_ESTIMATES: {
    readonly LOW: 1000;
    readonly MEDIUM: 2000;
    readonly HIGH: 5000;
};

/**
 * Neuro Wallet SDK - AI-Powered Onchain SDK for Wallets, Gasless Transactions & Compliance
 *
 * This SDK provides a comprehensive solution for building blockchain applications
 * with integrated AI-powered compliance, analytics, and wallet management.
 */

declare const SDK_VERSION = "1.0.0";

/**
 * Quick start function to create a client
 */
declare function createClient(config: NeuroWalletConfig): NeuroWalletClient;

export { AIAssistant, API_ENDPOINTS, AnalyticsManager, AuthManager, CHAIN_IDS, ComplianceManager, DEFAULT_CONFIG, ERROR_CODES, FEE_ESTIMATES, GAS_LIMITS, MICRO_STX_PER_STX, NETWORK_URLS, NeuroWalletClient, NeuroWalletError, RISK_LEVELS, RISK_THRESHOLDS, SDK_NAME, SDK_VERSION, SOCIAL_PROVIDERS, STX_DECIMALS, TRANSACTION_STATUS, TRANSACTION_TYPES, TransactionManager, WALLET_TYPES, WalletManager, createClient, deepClone, NeuroWalletClient as default, formatSTX, isValidStacksAddress, randomHex, retry, sleep, toMicroSTX };
export type { AICommand, AIResponse, AuthOptions, AuthResult, ComplianceCheck, ContractCallOptions, CreateWalletOptions, EventCallback, NetworkConfig, NetworkType, NeuroWalletConfig, RiskAssessment, RiskLevel, SDKEvents, StacksNetwork, TransactionAnalytics, TransactionOptions, TransactionResult, TransactionStatus, TransactionVersion, WalletAnalytics, WalletInfo, WalletKeys, WalletType };
