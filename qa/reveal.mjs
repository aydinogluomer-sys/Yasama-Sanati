/**
 * Faz 2 doğrulaması — alt sayfa açılımı ÜÇ motorda da çalışıyor mu?
 *
 * İddia: `animation-timeline: view()` yalnız Chromium'da var; ScrollRevealBridge
 * diğerlerinde aynı hareketi veriyor. Bu probe onu ölçer, varsayamaz.
 *
 * Ölçüm yöntemi: sayfanın ALTINDAKİ bir bölümün transform'una bak. Kaydırmadan
 * önce yerinden kaymış (translateY != 0) olmalı; kaydırdıktan sonra yerine
 * oturmuş olmalı.
 */
import { chromium, firefox, webkit } from "playwright";

const BASE = process.argv[2] || "http://127.0.0.1:3400";
const ROUTE = "/the-story";

const engines = { chromium, firefox, webkit };
let problems = 0;

for (const [name, engine] of Object.entries(engines)) {
  const browser = await engine.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(BASE + ROUTE, { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);

  const supportsCss = await page.evaluate(() =>
    CSS.supports?.("animation-timeline", "view()") ?? false,
  );
  const bridgeActive = await page.evaluate(() =>
    document.querySelector(".reveal-sections")?.classList.contains("reveal-js") ?? false,
  );

  // Sayfanın altındaki son bölümü seç.
  const sel = ".reveal-sections > * > *";
  const before = await page.evaluate((s) => {
    const els = [...document.querySelectorAll(s)];
    const el = els[els.length - 1];
    if (!el) return null;
    const m = new DOMMatrixReadOnly(getComputedStyle(el).transform);
    return { n: els.length, y: Math.round(m.m42) };
  }, sel);

  // Dibe kaydır, animasyonun oturmasını bekle.
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1600);

  const after = await page.evaluate((s) => {
    const els = [...document.querySelectorAll(s)];
    const el = els[els.length - 1];
    if (!el) return null;
    const m = new DOMMatrixReadOnly(getComputedStyle(el).transform);
    return { y: Math.round(m.m42) };
  }, sel);

  const moved = before && after && Math.abs(before.y) > 2 && Math.abs(after.y) <= 2;
  if (!moved) problems++;

  console.log(
    `${name.padEnd(9)} css:${String(supportsCss).padEnd(5)} kopru:${String(bridgeActive).padEnd(5)} ` +
      `hedef:${before?.n ?? 0} once:${before?.y ?? "?"}px sonra:${after?.y ?? "?"}px  ` +
      (moved ? "HAREKET VAR" : "HAREKET YOK <-"),
  );

  await browser.close();
}

console.log(`\n3 motor — acilim calismayan: ${problems}`);
process.exit(problems ? 1 : 0);
