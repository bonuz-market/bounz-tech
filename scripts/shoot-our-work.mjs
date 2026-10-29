// Retakes the "Our work" card screenshots (public/work/<key>.webp).
// 1280x720 headless Chromium, orientation card pre-closed. Not part of the build:
// run with a throwaway `npm i playwright-core` and CHROME=<path to Chromium>.

import { chromium } from 'playwright-core';
import fs from 'node:fs';
const __dirname = new URL('.', import.meta.url).pathname;
const sites = {
  wallet: 'https://bonuz.xyz', id: 'https://bonuz.id', life: 'https://bonuz.life',
  dashboard: 'https://app.bonuz.market', events: 'https://app.bonuz.xyz', swapz: 'https://swapz.bonuz.market',
  pqWallet: 'https://pq-wallet.com', btxscan: 'https://btxscan.io', pqWiki: 'https://postquantum.wiki',
  habibiPass: 'https://habibipass.bonuz.xyz', uae971: 'https://uae971.social', chess: 'https://onchainchess.com',
  kilocorn: 'https://kilocorn.com', skyShield: 'https://skyshield.bonuz.tech',
};
const only = process.argv.slice(2);
(async () => {
  const exe = process.env.CHROME;
  const browser = await chromium.launch({ executablePath: exe });
  fs.mkdirSync(__dirname + '/raw', { recursive: true }); // then: cwebp -q 78 -resize 960 540 raw/<key>.png -o public/work/<key>.webp
  for (const [k, url] of Object.entries(sites)) {
    if (only.length && !only.includes(k)) continue;
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 1, colorScheme: 'dark', locale: 'en-US' });
    await ctx.addInitScript(() => { try { localStorage.setItem('bonuz:orientation:closed', '2026-s1-world-map'); } catch { /* storage blocked */ } });
    const page = await ctx.newPage();
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 }).catch(e => console.log(k, 'nav', e.message.split('\n')[0]));
      await page.waitForTimeout(4000);
      await page.screenshot({ path: `${__dirname}/raw/${k}.png` });
      console.log(k, 'ok', page.url());
    } catch (e) { console.log(k, 'FAIL', e.message.split('\n')[0]); }
    await ctx.close();
  }
  await browser.close();
})();
