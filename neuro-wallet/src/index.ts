/**
 * Neuro Wallet SDK - AI-Powered Onchain SDK for Wallets, Gasless Transactions & Compliance
 * 
 * This SDK provides a comprehensive solution for building blockchain applications
 * with integrated AI-powered compliance, analytics, and wallet management.
 */

// Core client
export { NeuroWalletClient as default, NeuroWalletClient } from './core/client';

// Module managers
export { WalletManager } from './wallet';
export { TransactionManager } from './transaction';
export { AuthManager } from './auth';
export { ComplianceManager } from './compliance';
export { AnalyticsManager } from './analytics';
export { AIAssistant } from './ai';

// Types and interfaces
export * from './types';
export type {
  SocialAuthOptions,
  GoogleAuthOptions,
  PhoneAuthOptions,
  SocialWalletResult,
  PhoneVerificationResult,
} from './types';

// Utilities
export * from './utils/index';

// Constants
export * from './constants/index';

// Error classes
export { NeuroWalletError } from './types';

// Version
export const SDK_VERSION = '1.0.0';

// Import for function
import { NeuroWalletClient } from './core/client';
import type { NeuroWalletConfig } from './types';

/**
 * Quick start function to create a client
 */
export function createClient(config: NeuroWalletConfig) {
  return new NeuroWalletClient(config);
}