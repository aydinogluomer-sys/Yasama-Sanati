/**
 * Viewport matrisi (RELEASE-PLAN §18).
 *
 * Her boyutta her rotada: yatay taşma, konsol hatası, hydration uyarısı ve
 * yatay kaydırma genişliği ölçülür. Taşma veya hata varsa çıkış kodu 1.
 * Kullanım: prod sunucu ayaktayken `node qa/viewports.mjs [baseUrl]`.
 */
import { chromium } from "playwright";

const BASE = process.argv[2] || "http://127.0.0.1:3400";
const CHANNEL = process.env.PW_CHANNEL ?? "chrome";

const VIEWPORTS = [
  ["390×844", 390, 844, true],
  ["430×932", 430, 932, true],
  ["768×1024", 768, 1024, false],
  ["1024×768", 1024, 768, false],
  ["1366×768", 1366, 768, false],
  ["1440×900", 1440, 900, false],
  ["1600×900", 1600, 900, false],
  ["1920×1080", 1920, 1080, false],
];

const ROUTES = ["/", "/programlar", "/programlar/reiki", "/on-gorusme", "/sss", "/the-story"];

const browser = await chromium.launch(CHANNEL === "chromium" ? {} : { channel: CHANNEL });
let failures = 0;

for (const [label, width, height, mobile] of VIEWPORTS) {
  const ctx = await browser.newContext({
    viewport: { width, height },
    isMobile: mobile,
    hasTouch: mobile,
    deviceScaleFactor: mobile ? 2 : 1,
  });
  const page = await ctx.newPage();
  const problems = [];

  for (const route of ROUTES) {
    const errs = [];
    const onConsole = (m) => {
      const t = m.text();
      if (m.type() === "error" || /hydrat/i.test(t)) errs.push(t.slice(0, 90));
    };
    page.on("console", onConsole);
    page.on("pageerror", (e) => errs.push("PAGEERROR: " + e.message.slice(0, 80)));

    await page.goto(BASE + route, { waitUntil: "networkidle" });
    await page.waitForTimeout(700);

    const m = await page.evaluate(async () => {
      const H = document.body.scrollHeight;
      for (let y = 0; y < H; y += 900) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 40));
      }
      window.scrollTo(0, 0);
      return {
        docW: document.documentElement.scrollWidth,
        winW: window.innerWidth,
      };
    });

    page.off("console", onConsole);
    if (m.docW > m.winW + 1) problems.push(`${route} taşma ${m.docW}>${m.winW}`);
    if (errs.length) problems.push(`${route} ${[...new Set(errs)][0]}`);
  }

  const ok = problems.length === 0;
  if (!ok) failures += problems.length;
  console.log(`${ok ? "OK   " : "HATA "} ${label.padEnd(10)} ${ok ? "temiz" : problems.join(" · ")}`);
  await ctx.close();
}

await browser.close();
console.log(`\n${VIEWPORTS.length} viewport × ${ROUTES.length} rota — sorun: ${failures}`);
process.exit(failures > 0 ? 1 : 0);
