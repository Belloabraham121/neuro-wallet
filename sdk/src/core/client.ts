import { EventEmitter } from "eventemitter3";
// Note: These imports will be available after npm install
// import { StacksMainnet, StacksTestnet, StacksDevnet, StacksMocknet } from '@stacks/network';

// Temporary network implementations
class StacksMainnet {
  coreApiUrl = "https://api.mainnet.hiro.so";
  version = { mainnet: 1, testnet: 0 };
  chainId = 1;
  getBroadcastApiUrl() {
    return `${this.coreApiUrl}/v2/transactions`;
  }
  getTransferFeeEstimateApiUrl() {
    return `${this.coreApiUrl}/v2/fees/transfer`;
  }
  getAccountApiUrl(address: string) {
    return `${this.coreApiUrl}/v2/accounts/${address}`;
  }
  getAbiApiUrl(address: string, contract: string) {
    return `${this.coreApiUrl}/v2/contracts/interface/${address}/${contract}`;
  }
  getReadOnlyFunctionCallApiUrl(address: string, contract: string, fn: string) {
    return `${this.coreApiUrl}/v2/contracts/call-read/${address}/${contract}/${fn}`;
  }
}

class StacksTestnet {
  coreApiUrl = "https://api.testnet.hiro.so";
  version = { mainnet: 0, testnet: 1 };
  chainId = 2147483648;
  getBroadcastApiUrl() {
    return `${this.coreApiUrl}/v2/transactions`;
  }
  getTransferFeeEstimateApiUrl() {
    return `${this.coreApiUrl}/v2/fees/transfer`;
  }
  getAccountApiUrl(address: string) {
    return `${this.coreApiUrl}/v2/accounts/${address}`;
  }
  getAbiApiUrl(address: string, contract: string) {
    return `${this.coreApiUrl}/v2/contracts/interface/${address}/${contract}`;
  }
  getReadOnlyFunctionCallApiUrl(address: string, contract: string, fn: string) {
    return `${this.coreApiUrl}/v2/contracts/call-read/${address}/${contract}/${fn}`;
  }
}

class StacksDevnet {
  coreApiUrl = "http://localhost:3999";
  version = { mainnet: 0, testnet: 1 };
  chainId = 2147483648;
  getBroadcastApiUrl() {
    return `${this.coreApiUrl}/v2/transactions`;
  }
  getTransferFeeEstimateApiUrl() {
    return `${this.coreApiUrl}/v2/fees/transfer`;
  }
  getAccountApiUrl(address: string) {
    return `${this.coreApiUrl}/v2/accounts/${address}`;
  }
  getAbiApiUrl(address: string, contract: string) {
    return `${this.coreApiUrl}/v2/contracts/interface/${address}/${contract}`;
  }
  getReadOnlyFunctionCallApiUrl(address: string, contract: string, fn: string) {
    return `${this.coreApiUrl}/v2/contracts/call-read/${address}/${contract}/${fn}`;
  }
}

class StacksMocknet {
  coreApiUrl = "http://localhost:3999";
  version = { mainnet: 0, testnet: 1 };
  chainId = 2147483648;
  getBroadcastApiUrl() {
    return `${this.coreApiUrl}/v2/transactions`;
  }
  getTransferFeeEstimateApiUrl() {
    return `${this.coreApiUrl}/v2/fees/transfer`;
  }
  getAccountApiUrl(address: string) {
    return `${this.coreApiUrl}/v2/accounts/${address}`;
  }
  getAbiApiUrl(address: string, contract: string) {
    return `${this.coreApiUrl}/v2/contracts/interface/${address}/${contract}`;
  }
  getReadOnlyFunctionCallApiUrl(address: string, contract: string, fn: string) {
    return `${this.coreApiUrl}/v2/contracts/call-read/${address}/${contract}/${fn}`;
  }
}
import {
  NeuroWalletConfig,
  NetworkConfig,
  NetworkType,
  SDKEvents,
  NeuroWalletError,
  StacksNetwork,
} from "../types";
import { WalletManager } from "../wallet/index";
import { TransactionManager } from "../transaction/index";
import { AuthManager } from "../auth/index";
import { ComplianceManager } from "../compliance/index";
import { AnalyticsManager } from "../analytics/index";
import { AIAssistant } from "../ai/index";

/**
 * Main NeuroWallet SDK Client
 * Provides a unified interface for all wallet, transaction, and compliance operations
 */
export class NeuroWalletClient extends EventEmitter<SDKEvents> {
  private config: NeuroWalletConfig;
  private networkConfig: NetworkConfig;

  // Module managers
  public readonly wallet: WalletManager;
  public readonly transaction: TransactionManager;
  public readonly auth: AuthManager;
  public readonly compliance: ComplianceManager;
  public readonly analytics: AnalyticsManager;
  public readonly ai: AIAssistant;

  constructor(config: NeuroWalletConfig) {
    super();

    this.validateConfig(config);
    this.config = config;
    this.networkConfig = this.createNetworkConfig(config.network);

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
  public getConfig(): NeuroWalletConfig {
    return { ...this.config };
  }

  /**
   * Get the network configuration
   */
  public getNetworkConfig(): NetworkConfig {
    return { ...this.networkConfig };
  }

  /**
   * Update the API key
   */
  public updateApiKey(apiKey: string): void {
    this.config.apiKey = apiKey;
  }

  /**
   * Switch to a different network
   */
  public switchNetwork(network: StacksNetwork): void {
    this.config.network = network;
    this.networkConfig = this.createNetworkConfig(network);
    // Note: 'network:changed' event will be added to SDKEvents interface
  }

  /**
   * Get the current network type
   */
  public getNetworkType(): NetworkType {
    const url = this.config.network.coreApiUrl;

    if (url.includes("mainnet")) return "mainnet";
    if (url.includes("testnet")) return "testnet";
    if (url.includes("devnet")) return "devnet";
    return "mocknet";
  }

  /**
   * Check if the SDK is properly configured
   */
  public isConfigured(): boolean {
    return !!(this.config.apiKey && this.config.network);
  }

  /**
   * Get SDK version and status
   */
  public getStatus() {
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
  private validateConfig(config: NeuroWalletConfig): void {
    if (!config.apiKey) {
      throw new NeuroWalletError("API key is required", "INVALID_CONFIG");
    }

    if (!config.network) {
      throw new NeuroWalletError(
        "Network configuration is required",
        "INVALID_CONFIG"
      );
    }

    if (config.aiAssistant?.enabled && !config.aiAssistant.apiKey) {
      throw new NeuroWalletError(
        "AI Assistant API key is required when AI is enabled",
        "INVALID_CONFIG"
      );
    }
  }

  /**
   * Create network configuration from Stacks network
   */
  private createNetworkConfig(network: StacksNetwork): NetworkConfig {
    return {
      network,
      coreApiUrl: network.coreApiUrl,
      broadcastEndpoint: network.getBroadcastApiUrl(),
      transferFeeEstimateEndpoint: network.getTransferFeeEstimateApiUrl(),
      accountEndpoint: network.getAccountApiUrl(""),
      contractAbiEndpoint: network.getAbiApiUrl("", ""),
      readOnlyFunctionCallEndpoint: network.getReadOnlyFunctionCallApiUrl(
        "",
        "",
        ""
      ),
      transactionVersion: network.version,
    };
  }

  /**
   * Set up global error handling
   */
  private setupErrorHandling(): void {
    // Handle uncaught errors from modules
    this.wallet.on("error", (error: NeuroWalletError) =>
      this.emit("error", error)
    );
    this.transaction.on("error", (error: NeuroWalletError) =>
      this.emit("error", error)
    );
    this.auth.on("error", (error: NeuroWalletError) =>
      this.emit("error", error)
    );
    this.compliance.on("error", (error: NeuroWalletError) =>
      this.emit("error", error)
    );
    this.analytics.on("error", (error: NeuroWalletError) =>
      this.emit("error", error)
    );
    this.ai.on("error", (error: NeuroWalletError) => this.emit("error", error));
  }

  /**
   * Create a new NeuroWallet client instance
   */
  static create(config: NeuroWalletConfig): NeuroWalletClient {
    return new NeuroWalletClient(config);
  }

  /**
   * Create a client with predefined network configurations
   */
  static createForMainnet(
    apiKey: string,
    options?: Partial<NeuroWalletConfig>
  ): NeuroWalletClient {
    return new NeuroWalletClient({
      apiKey,
      network: new StacksMainnet(),
      ...options,
    });
  }

  static createForTestnet(
    apiKey: string,
    options?: Partial<NeuroWalletConfig>
  ): NeuroWalletClient {
    return new NeuroWalletClient({
      apiKey,
      network: new StacksTestnet(),
      ...options,
    });
  }

  static createForDevnet(
    apiKey: string,
    options?: Partial<NeuroWalletConfig>
  ): NeuroWalletClient {
    return new NeuroWalletClient({
      apiKey,
      network: new StacksDevnet(),
      ...options,
    });
  }

  static createForMocknet(
    apiKey: string,
    options?: Partial<NeuroWalletConfig>
  ): NeuroWalletClient {
    return new NeuroWalletClient({
      apiKey,
      network: new StacksMocknet(),
      ...options,
    });
  }
}

// Export the main client as default
export default NeuroWalletClient;
