import { createClient } from "neuro-stacks-sdk";
import { StacksTestnet } from "@stacks/network";
const client = createClient({
    apiKey: "sk_9fa94fe3b894f4a9c8fd171a67876c8c54b4b1cd71185fe385890d7b091fa6b4",
    network: new StacksTestnet(),
});
(async () => {
    // Test phone auth and social wallet
    await client.auth.sendPhoneVerificationCode("+1234567890");
    const verification = await client.auth.verifyPhoneNumber("+1234567890", "123456");
    console.log("Verification: ", verification);
    const wallet = await client.auth.loginWithPhone("+1234567890", "123456");
    console.log("Wallet Address:", wallet.address);
})();
