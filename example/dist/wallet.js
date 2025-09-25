import { createClient } from "neuro-stacks-sdk";
// Create a compatible network object for the SDK
class StacksTestnetCompatible {
    coreApiUrl = "https://api.testnet.hiro.so";
    version = { mainnet: 0, testnet: 1 }; // Adjusted for testnet
    chainId = 2147483648;
    bnsLookupUrl = "https://stacks-node-api.testnet.stacks.co";
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
    // Additional methods if needed
    getPoxInfoApiUrl() {
        return `${this.coreApiUrl}/v2/info/pox`;
    }
    getBurnchainBlockApiUrl(blockHash) {
        return `${this.coreApiUrl}/v2/burnchain/${blockHash}`;
    }
}
const network = new StacksTestnetCompatible();
const client = createClient({
    apiKey: "sk_9fa94fe3b894f4a9c8fd171a67876c8c54b4b1cd71185fe385890d7b091fa6b4",
    network,
});
// Example usage
client.auth.sendPhoneVerificationCode("15551234567").then((result) => {
    console.log("Verification code sent:", result);
});
(async () => {
    // Test phone auth and social wallet
    await client.auth.sendPhoneVerificationCode("+1234567890");
    const verification = await client.auth.verifyPhoneNumber("+1234567890", "123456");
    console.log("Verification: ", verification);
    const wallet = await client.auth.loginWithPhone("+1234567890", "123456");
    console.log("Wallet Address:", wallet.address);
})();
