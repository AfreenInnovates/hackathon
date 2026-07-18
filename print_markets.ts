import { createBentoSdk } from '@bento.fun/sdk';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
dotenv.config();

async function main() {
  const apiKey = process.env.testnet_builder_api_key;
  const sdk = createBentoSdk({
    baseUrl: 'https://internal-server.bento.fun',
    apiKey: apiKey,
  });

  try {
    const catalog = await sdk.public.markets.list();
    
    // Find the array dynamically
    let markets: any[] = [];
    if (Array.isArray(catalog)) {
        markets = catalog;
    } else {
        for (const key of Object.keys(catalog)) {
            if (Array.isArray(catalog[key])) {
                markets = catalog[key];
                break;
            }
        }
    }
    
    let markdown = "# Live Bento Markets (Testnet)\n\n";
    markdown += "| Category | Market Description / Question | Options | Total Wagered |\n";
    markdown += "| :--- | :--- | :--- | :--- |\n";

    for (const m of markets) {
        const title = (m.description || m.betString || m.id || '').replace(/\n/g, ' ').substring(0, 80);
        const options = (m.options || []).join(' vs ');
        markdown += `| ${m.category || 'N/A'} | ${title} | ${options} | ${m.totalBetAmount} |\n`;
    }

    const outputPath = 'C:\\Users\\ADMIN\\Desktop\\Afreen\\bento-ana\\markets_list.md';
    fs.writeFileSync(outputPath, markdown);

    // Print top 10 for the terminal output
    markets.slice(0, 10).forEach((m: any, i: number) => {
        const title = (m.description || m.betString || '').replace(/\n/g, ' ');
        console.log(`${i+1}. [${m.category || 'misc'}] ${title} (Pool: ${m.totalBetAmount})`);
    });

  } catch (err) {
    console.error("Error:", err);
  }
}

main().catch(console.error);
