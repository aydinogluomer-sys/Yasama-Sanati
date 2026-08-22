/**
 * Otomatik erişilebilirlik taraması (axe-core).
 *
 * Kullanım: prod sunucu ayaktayken `node qa/a11y.mjs [baseUrl]`.
 * Çıkış kodu: serious/critical bulgu varsa 1, yoksa 0 — CI'da kapı olarak kullanılabilir.
 */
import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";

const BASE = process.argv[2] || "http://127.0.0.1:3400";
const ROUTES = [
  "/",
  "/programlar",
  "/programlar/reiki",
  "/on-gorusme",
  "/sss",
  "/egitmenler",
  "/the-story",
  "/blog",
  "/community",
  "/kvkk",
  "/privacy-terms",
];
const VIEWPORTS = [
  ["masaustu", 1440, 900],
  ["mobil", 390, 844],
];

// Yerelde sistem Chrome, CI'da Playwright'in paketli chromium'u kullanilir.
const CHANNEL = process.env.PW_CHANNEL ?? "chrome";
const browser = await chromium.launch(CHANNEL === "chromium" ? {} : { channel: CHANNEL });
let serious = 0;
let total = 0;
const detail = [];

for (const [vpName, width, height] of VIEWPORTS) {
  const ctx = await browser.newContext({
    viewport: { width, height },
    isMobile: vpName === "mobil",
    hasTouch: vpName === "mobil",
    // Scroll'a bağlı sahnelerin son hâline oturması için hareket kapalı taranır.
    reducedMotion: "reduce",
  });
  const page = await ctx.newPage();

  for (const route of ROUTES) {
    await page.goto(BASE + route, { waitUntil: "networkidle" });
    await page.waitForTimeout(900);

    const { violations } = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    for (const v of violations) {
      total += v.nodes.length;
      if (v.impact === "serious" || v.impact === "critical") {
        serious += v.nodes.length;
        detail.push(`  [${v.impact}] ${vpName} ${route} — ${v.id}: ${v.help} (${v.nodes.length})`);
      }
    }
  }
  await ctx.close();
}

await browser.close();

console.log(`\nToplam bulgu: ${total} | serious+critical: ${serious}`);
if (detail.length) {
  console.log("\nCiddi bulgular:");
  for (const d of detail) console.log(d);
}
process.exit(serious > 0 ? 1 : 0);
