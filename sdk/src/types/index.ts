// Note: These imports will be available after npm install
// import { StacksNetwork } from '@stacks/network';
// import { TransactionVersion } from '@stacks/transactions';

// Temporary type definitions until packages are installed
export interface StacksNetwork {
  version: any;
  chainId: any;
  coreApiUrl: string;
  getBroadcastApiUrl(): string;
  getTransferFeeEstimateApiUrl(): string;
  getAccountApiUrl(address: string): string;
  getAbiApiUrl(address: string, contract: string): string;
  getReadOnlyFunctionCallApiUrl(address: string, contract: string, fn: string): string;
}

export interface TransactionVersion {
  mainnet: number;
  testnet: number;
}

// Core SDK Configuration
export interface NeuroWalletConfig {
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

// Network Configuration
export interface NetworkConfig {
  network: StacksNetwork;
  coreApiUrl: string;
  broadcastEndpoint: string;
  transferFeeEstimateEndpoint: string;
  accountEndpoint: string;
  contractAbiEndpoint: string;
  readOnlyFunctionCallEndpoint: string;
  transactionVersion: TransactionVersion;
}

// Wallet Types
export interface WalletInfo {
  address: string;
  publicKey: string;
  walletType: 'CUSTODIAL' | 'NON_CUSTODIAL' | 'SOCIAL';
  isActive: boolean;
  metadata?: Record<string, any>;
}

export interface CreateWalletOptions {
  walletType?: 'CUSTODIAL' | 'NON_CUSTODIAL' | 'SOCIAL';
  socialProvider?: 'GOOGLE' | 'PHONE' | 'EMAIL';
  metadata?: Record<string, any>;
}

export interface WalletKeys {
  privateKey: string;
  publicKey: string;
  address: string;
  mnemonic?: string;
}

// Transaction Types
export interface TransactionOptions {
  recipient: string;
  amount: string | number;
  memo?: string;
  fee?: string | number;
  nonce?: number;
  sponsored?: boolean;
  postConditions?: any[];
}

export interface ContractCallOptions {
  contractAddress: string;
  contractName: string;
  functionName: string;
  functionArgs: any[];
  fee?: string | number;
  nonce?: number;
  sponsored?: boolean;
  postConditions?: any[];
}

export interface TransactionResult {
  txId: string;
  status: 'PENDING' | 'SUCCESS' | 'FAILED';
  blockHeight?: number;
  fee: string;
  gasUsed?: number;
  error?: string;
}

// Compliance Types
export interface RiskAssessment {
  riskScore: number; // 0-100
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  flags: string[];
  explanation: string;
  recommendations: string[];
}

export interface ComplianceCheck {
  address: string;
  isBlacklisted: boolean;
  isSanctioned: boolean;
  riskFactors: string[];
  confidence: number;
}

// Analytics Types
export interface TransactionAnalytics {
  totalTransactions: number;
  totalVolume: string;
  averageTransactionSize: string;
  successRate: number;
  timeRange: {
    start: Date;
    end: Date;
  };
}

export interface WalletAnalytics {
  totalWallets: number;
  activeWallets: number;
  walletsByType: Record<string, number>;
  totalBalance: string;
}

// AI Assistant Types
export interface AICommand {
  command: string;
  parameters?: Record<string, any>;
  context?: Record<string, any>;
}

export interface AIResponse {
  success: boolean;
  result?: any;
  explanation: string;
  suggestions?: string[];
  error?: string;
}

// Authentication Types
export interface AuthOptions {
  appDetails: {
    name: string;
    icon: string;
  };
  redirectTo?: string;
  manifestPath?: string;
  sendToSignIn?: boolean;
  userSession?: any;
}

export interface AuthResult {
  userSession: any;
  userData: any;
  appPrivateKey: string;
}

// Error Types
export class NeuroWalletError extends Error {
  code: string;
  details?: any;

  constructor(message: string, code: string, details?: any) {
    super(message);
    this.name = 'NeuroWalletError';
    this.code = code;
    this.details = details;
  }
}

// Event Types
export interface SDKEvents {
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

// Utility Types
export type EventCallback<T = any> = (data: T) => void;
export type NetworkType = 'mainnet' | 'testnet' | 'devnet' | 'mocknet';
export type WalletType = 'CUSTODIAL' | 'NON_CUSTODIAL' | 'SOCIAL';
export type TransactionStatus = 'PENDING' | 'SUCCESS' | 'FAILED';
export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';