import { createBentoSdk } from '@bento.fun/sdk';
import * as dotenv from 'dotenv';
dotenv.config();

async function main() {
  const apiKey = process.env.testnet_builder_api_key;
  const sdk = createBentoSdk({
    baseUrl: 'https://internal-server.bento.fun',
    apiKey: apiKey,
  });

  try {
    const catalog = await sdk.public.markets.list();
    console.log("\n--- RAW API RESPONSE ---");
    console.log(JSON.stringify(catalog, null, 2));
  } catch (err) {
    console.error("Error:", err);
  }
}

main().catch(console.error);
