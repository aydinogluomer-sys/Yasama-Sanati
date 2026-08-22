/**
 * Kırık görsel denetimi (FINAL-VERIFICATION V-01).
 *
 * Neden ayrı bir kapı: axe kırık bir <img>'i ihlal saymaz (alt metni doğruysa
 * erişilebilirlik açısından geçerlidir) ve viewport kapısı konsol hatası toplasa
 * da her rotayı gezmez. /blog görselleri tam bu boşluktan kırık gitti.
 *
 * Ölçülen: her rotada naturalWidth === 0 kalan <img> sayısı ve /_next/image
 * optimizer'ından dönen >=400 yanıtlar.
 */
import { chromium } from "playwright";
import { ROUTES } from "./routes.mjs";

const BASE = process.argv[2] || "http://127.0.0.1:3400";
const CHANNEL = process.env.PW_CHANNEL ?? "chrome";
const browser = await chromium.launch(CHANNEL === "chromium" ? {} : { channel: CHANNEL });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();

let failures = 0;
for (const route of ROUTES) {
  const bad = [];
  const onResp = (r) => {
    if (r.url().includes("/_next/image") && r.status() >= 400) {
      bad.push(`${r.status()} ${decodeURIComponent(r.url()).slice(-60)}`);
    }
  };
  page.on("response", onResp);
  await page.goto(BASE + route, { waitUntil: "networkidle" });
  // Tembel yüklenen görseller için sayfayı bir kez baştan sona gez.
  await page.evaluate(async () => {
    const H = document.body.scrollHeight;
    for (let y = 0; y < H; y += 900) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(900);
  page.off("response", onResp);

  const m = await page.evaluate(() => {
    const imgs = [...document.querySelectorAll("img")];
    return {
      total: imgs.length,
      broken: imgs.filter((i) => i.complete && i.naturalWidth === 0).length,
    };
  });

  const ok = m.broken === 0 && bad.length === 0;
  if (!ok) failures += m.broken + bad.length;
  console.log(
    `${ok ? "OK   " : "HATA "} ${route.padEnd(46)} img ${String(m.total).padStart(3)}  kirik ${m.broken}  optimizer>=400 ${bad.length}`,
  );
  for (const b of bad.slice(0, 2)) console.log(`         ${b}`);
}

await browser.close();
console.log(`\n${ROUTES.length} rota — kirik gorsel + optimizer hatasi: ${failures}`);
process.exit(failures > 0 ? 1 : 0);
