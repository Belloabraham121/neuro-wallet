# Neuro Wallet SDK

AI-Powered Onchain SDK for Wallets, Gasless Transactions & Compliance with HIRO Stacks.js integration.

## Features

- 🔐 **Wallet Management** - Create, import, and manage Stacks wallets
- ⚡ **Gasless Transactions** - Sponsored transactions for seamless UX
- 🤖 **AI-Powered Compliance** - Intelligent risk assessment and fraud detection
- 📊 **Analytics Dashboard** - Comprehensive transaction and wallet analytics
- 🧠 **AI Assistant** - Natural language transaction processing
- 🔗 **Stacks Connect** - Easy wallet connection integration
- 🛡️ **Security First** - Built with security best practices

## Installation

```bash
npm install @neuro-wallet/sdk
# or
yarn add @neuro-wallet/sdk
# or
pnpm add @neuro-wallet/sdk
```

## Quick Start

```typescript
import { NeuroWalletClient, createClient } from '@neuro-wallet/sdk';
import { StacksTestnet } from '@stacks/network';

// Create a client
const client = createClient({
  apiKey: 'your-api-key',
  network: new StacksTestnet(),
  enableAnalytics: true,
  enableCompliance: true,
  aiAssistant: {
    enabled: true,
    apiKey: 'your-ai-api-key'
  }
});

// Or use the class directly
const client = new NeuroWalletClient({
  apiKey: 'your-api-key',
  network: new StacksTestnet()
});
```

## Usage Examples

### Wallet Management

```typescript
// Create a new wallet
const wallet = await client.wallet.createWallet({
  walletType: 'CUSTODIAL',
  metadata: { name: 'My Wallet' }
});

// Import existing wallet
const importedWallet = await client.wallet.importWallet('private-key-here');

// Get wallet info
const walletInfo = await client.wallet.getWallet('wallet-address');

// List all wallets
const wallets = await client.wallet.listWallets();
```

### Transactions

```typescript
// Send STX
const result = await client.transaction.sendSTX({
  recipient: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
  amount: '1.5', // STX amount
  memo: 'Payment for services',
  sponsored: true // Enable gasless transaction
});

// Call smart contract
const contractResult = await client.transaction.callContract({
  contractAddress: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
  contractName: 'my-contract',
  functionName: 'transfer',
  functionArgs: [/* contract arguments */],
  sponsored: true
});

// Get transaction status
const txStatus = await client.transaction.getTransaction('transaction-id');
```

### AI-Powered Compliance

```typescript
// Assess transaction risk
const riskAssessment = await client.compliance.assessTransactionRisk({
  recipient: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
  amount: '1000'
});

console.log(`Risk Score: ${riskAssessment.riskScore}/100`);
console.log(`Risk Level: ${riskAssessment.riskLevel}`);
console.log(`Explanation: ${riskAssessment.explanation}`);

// Check address compliance
const complianceCheck = await client.compliance.checkAddress(
  'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM'
);

if (complianceCheck.isBlacklisted) {
  console.log('⚠️ Address is blacklisted!');
}
```

### AI Assistant

```typescript
// Process natural language commands
const response = await client.ai.processCommand(
  "Send 5 STX to Alice's wallet for the consulting work",
  { userWallets: wallets }
);

if (response.success) {
  console.log('✅ Transaction executed:', response.result);
  console.log('💡 Explanation:', response.explanation);
} else {
  console.log('❌ Error:', response.error);
}

// Get AI insights
const insights = await client.ai.getInsights({
  walletAddress: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
  timeRange: '30d'
});
```

### Analytics

```typescript
// Get transaction analytics
const txAnalytics = await client.analytics.getTransactionAnalytics({
  start: new Date('2024-01-01'),
  end: new Date('2024-01-31')
});

console.log(`Total Transactions: ${txAnalytics.totalTransactions}`);
console.log(`Total Volume: ${txAnalytics.totalVolume} STX`);
console.log(`Success Rate: ${txAnalytics.successRate}%`);

// Get wallet analytics
const walletAnalytics = await client.analytics.getWalletAnalytics();
console.log(`Active Wallets: ${walletAnalytics.activeWallets}`);
```

### Authentication (Stacks Connect)

```typescript
// Connect to user's wallet
const authResult = await client.auth.connect({
  appDetails: {
    name: 'My DApp',
    icon: 'https://myapp.com/icon.png'
  }
});

if (authResult.userSession) {
  console.log('✅ User connected:', authResult.userData);
}

// Check authentication status
if (client.auth.isAuthenticated()) {
  const userSession = client.auth.getUserSession();
  console.log('User is authenticated:', userSession);
}
```

## Event Handling

```typescript
// Listen to SDK events
client.on('wallet:created', (wallet) => {
  console.log('New wallet created:', wallet.address);
});

client.on('transaction:confirmed', (result) => {
  console.log('Transaction confirmed:', result.txId);
});

client.on('compliance:flagged', (assessment) => {
  console.log('⚠️ High-risk transaction detected:', assessment);
});

client.on('error', (error) => {
  console.error('SDK Error:', error.message);
});
```

## Network Configuration

```typescript
import { StacksMainnet, StacksTestnet } from '@stacks/network';

// Mainnet
const mainnetClient = NeuroWalletClient.createForMainnet('your-api-key');

// Testnet
const testnetClient = NeuroWalletClient.createForTestnet('your-api-key');

// Custom network
const customClient = new NeuroWalletClient({
  apiKey: 'your-api-key',
  network: new StacksTestnet({ url: 'https://custom-node.com' })
});

// Switch networks
client.switchNetwork(new StacksMainnet());
```

## Error Handling

```typescript
import { NeuroWalletError } from '@neuro-wallet/sdk';

try {
  const result = await client.transaction.sendSTX({
    recipient: 'invalid-address',
    amount: '1.0'
  });
} catch (error) {
  if (error instanceof NeuroWalletError) {
    console.log('Error Code:', error.code);
    console.log('Error Message:', error.message);
    console.log('Error Details:', error.details);
  }
}
```

## Configuration Options

```typescript
interface NeuroWalletConfig {
  apiKey: string;                    // Required: Your API key
  baseUrl?: string;                  // Optional: Custom API base URL
  network: StacksNetwork;            // Required: Stacks network
  enableAnalytics?: boolean;         // Optional: Enable analytics (default: true)
  enableCompliance?: boolean;        // Optional: Enable compliance (default: true)
  aiAssistant?: {                    // Optional: AI assistant configuration
    enabled: boolean;
    apiKey?: string;
  };
}
```

## TypeScript Support

The SDK is built with TypeScript and provides full type definitions:

```typescript
import type {
  NeuroWalletConfig,
  WalletInfo,
  TransactionResult,
  RiskAssessment,
  AIResponse
} from '@neuro-wallet/sdk';
```

## API Reference

### NeuroWalletClient

- `wallet: WalletManager` - Wallet management operations
- `transaction: TransactionManager` - Transaction operations
- `auth: AuthManager` - Authentication operations
- `compliance: ComplianceManager` - Compliance and risk assessment
- `analytics: AnalyticsManager` - Analytics and reporting
- `ai: AIAssistant` - AI-powered features

### Methods

- `getConfig()` - Get current configuration
- `getNetworkConfig()` - Get network configuration
- `updateApiKey(apiKey)` - Update API key
- `switchNetwork(network)` - Switch to different network
- `getNetworkType()` - Get current network type
- `isConfigured()` - Check if SDK is properly configured
- `getStatus()` - Get SDK status and version info

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Support

- 📧 Email: support@neurowallet.com
- 💬 Discord: [Join our community](https://discord.gg/neurowallet)
- 📖 Documentation: [docs.neurowallet.com](https://docs.neurowallet.com)
- 🐛 Issues: [GitHub Issues](https://github.com/neuro-wallet/sdk/issues)

## Roadmap

- [ ] Enhanced AI compliance features
- [ ] Multi-chain support
- [ ] Advanced analytics dashboard
- [ ] Mobile SDK
- [ ] Hardware wallet integration
- [ ] DeFi protocol integrations

---

**Built with ❤️ by the Neuro Wallet Team**