/**
 * Zoom ve reflow denetimi (FINAL-VERIFICATION D-03).
 *
 * Önceki sürüm yalnız viewport küçültüyordu ve buna "%400 zoom" diyordu. Bu iki
 * ayrı başarı ölçütünü birbirine karıştırmaktı:
 *
 *  1) WCAG 1.4.10 Reflow — 1280px viewport'ta %400 zoom, CSS piksel cinsinden
 *     320px genişliğe denktir. Viewport'u 320 CSS px'e indirmek bunun RESMİ
 *     eşdeğeridir; burada da öyle ölçülüyor ve adı doğru konuyor.
 *
 *  2) WCAG 1.4.4 Resize Text — yalnız YAZI %200 büyütülür, düzen değil. Viewport
 *     küçültmek bunu HİÇ simüle etmez. Asıl eksik olan buydu; artık kök font
 *     boyutu gerçekten iki katına çıkarılarak ölçülüyor.
 *
 * Ek olarak: sabit konumlu katmanların içeriği örtüp örtmediği ve kırpılan metin.
 */
import { chromium } from "playwright";

const BASE = process.argv[2] || "http://127.0.0.1:3400";
const CHANNEL = process.env.PW_CHANNEL ?? "chrome";
const ROUTES = ["/", "/programlar", "/programlar/reiki", "/on-gorusme", "/sss", "/blog"];

const browser = await chromium.launch(CHANNEL === "chromium" ? {} : { channel: CHANNEL });
let fail = 0;
const say = (ok, msg) => { if (!ok) fail++; console.log(`  ${ok ? "OK   " : "HATA "} ${msg}`); };

/** Yatay taşma + kırpılmış metin + sabit katman örtmesi. */
async function probe(page) {
  return page.evaluate(() => {
    const docW = document.documentElement.scrollWidth;
    const winW = window.innerWidth;
    // Metin kırpılması: overflow gizliyken içerik kutusundan taşan blok metinler.
    const clipped = [...document.querySelectorAll("p, h1, h2, h3, li, button, a, label")]
      .filter((el) => {
        const cs = getComputedStyle(el);
        if (cs.overflow === "visible" || el.clientHeight === 0) return false;
        if ((el.textContent || "").trim().length < 8) return false;
        // Ekran okuyucuya özel gizli metin (sr-only: 1x1px + overflow hidden)
        // bilinçli olarak kırpılır; kusur değil, doğru desendir. Sınıf adına
        // değil kutu boyutuna bakıyoruz ki isimlendirmeden bağımsız olsun.
        if (el.clientWidth <= 4 || el.clientHeight <= 4) return false;
        // -webkit-line-clamp bilinçli kısaltmadır, kırpma sayılmaz.
        if (cs.webkitLineClamp && cs.webkitLineClamp !== "none") return false;
        return el.scrollHeight > el.clientHeight + 4 || el.scrollWidth > el.clientWidth + 4;
      })
      .slice(0, 3)
      .map((el) => `${el.tagName}:${(el.textContent || "").trim().slice(0, 26)}`);
    // Sabit katmanların ekranın ne kadarını kapladığı (kontrolleri örtme riski).
    const fixedCover = [...document.querySelectorAll("*")]
      .filter((el) => {
        const cs = getComputedStyle(el);
        return cs.position === "fixed" && cs.visibility !== "hidden" && +cs.opacity > 0.1;
      })
      .reduce((acc, el) => {
        const r = el.getBoundingClientRect();
        if (r.width <= 0 || r.height <= 0) return acc;
        return acc + Math.min(r.height, innerHeight) * Math.min(r.width, innerWidth);
      }, 0) / (innerWidth * innerHeight);
    return { docW, winW, clipped, fixedCover: +fixedCover.toFixed(2) };
  });
}

// ---------- 1) WCAG 1.4.10 Reflow: 320 CSS px (= 1280px'te %400 zoom) ----------
for (const [label, w, h] of [["reflow 640px (=%200)", 640, 512], ["reflow 320px (=%400)", 320, 256]]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h } });
  const page = await ctx.newPage();
  console.log(`\n— WCAG 1.4.10 ${label} —`);
  for (const route of ROUTES) {
    await page.goto(BASE + route, { waitUntil: "networkidle" });
    await page.waitForTimeout(500);
    const m = await probe(page);
    say(m.docW <= m.winW + 1, `${route} yatay tasma yok (${m.docW}/${m.winW})`);
    say(m.clipped.length === 0, `${route} kirpilmis metin yok ${m.clipped.length ? "-> " + m.clipped.join(", ") : ""}`);
    say(m.fixedCover < 0.85, `${route} sabit katman ekrani ortmuyor (%${Math.round(m.fixedCover * 100)})`);
  }
  await ctx.close();
}

// ---------- 2) WCAG 1.4.4 Resize Text: yalnız yazi %200 ----------
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  console.log(`\n— WCAG 1.4.4 yalniz yazi %200 (duzen degismiyor) —`);
  for (const route of ROUTES) {
    await page.goto(BASE + route, { waitUntil: "networkidle" });
    // Kök font boyutunu gerçekten iki katına çıkar; rem tabanlı her şey büyür.
    await page.addStyleTag({ content: `html { font-size: 200% !important; }` });
    await page.waitForTimeout(600);
    const m = await probe(page);
    say(m.docW <= m.winW + 1, `${route} yatay tasma yok (${m.docW}/${m.winW})`);
    say(m.clipped.length === 0, `${route} kirpilmis metin yok ${m.clipped.length ? "-> " + m.clipped.join(", ") : ""}`);
  }
  await ctx.close();
}

await browser.close();
console.log(`\nsorun: ${fail}`);
process.exit(fail > 0 ? 1 : 0);
