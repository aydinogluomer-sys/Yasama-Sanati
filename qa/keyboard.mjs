/**
 * Klavye ve zoom denetimi (RELEASE-PLAN §13).
 *
 * Kontroller:
 *  1. Skip link ilk Tab'da geliyor ve #main-content'e götürüyor mu
 *  2. Tab sırası görünür odak halkası üretiyor mu (outline/box-shadow/ring)
 *  3. Mobil menü: açılıyor, odak içeride kapanıyor (trap), ESC kapatıyor, odak geri dönüyor
 *  4. %200 ve %400 zoom'da yatay taşma oluşuyor mu
 */
import { chromium } from "playwright";

const BASE = process.argv[2] || "http://127.0.0.1:3400";
const CHANNEL = process.env.PW_CHANNEL ?? "chrome";
const browser = await chromium.launch(CHANNEL === "chromium" ? {} : { channel: CHANNEL });
let fail = 0;
const say = (ok, msg) => {
  if (!ok) fail++;
  console.log(`  ${ok ? "OK   " : "HATA "} ${msg}`);
};

// ---------- 1 + 2: skip link ve odak görünürlüğü ----------
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.waitForTimeout(800);

  console.log("\n— Skip link ve odak halkası —");
  await page.keyboard.press("Tab");
  const first = await page.evaluate(() => {
    const el = document.activeElement;
    return { tag: el?.tagName, text: (el?.textContent || "").trim().slice(0, 30), href: el?.getAttribute?.("href") };
  });
  say(first.href === "#main-content", `ilk Tab skip link: ${first.text || first.tag} → ${first.href}`);

  // İlk 25 odaklanabilir öğede görünür odak göstergesi var mı
  let noRing = [];
  for (let i = 0; i < 25; i++) {
    const info = await page.evaluate(() => {
      const el = document.activeElement;
      if (!el || el === document.body) return null;
      const cs = getComputedStyle(el);
      const visible =
        (cs.outlineStyle !== "none" && parseFloat(cs.outlineWidth) > 0) ||
        cs.boxShadow !== "none";
      return { visible, tag: el.tagName, text: (el.textContent || "").trim().slice(0, 24) };
    });
    if (info && !info.visible) noRing.push(`${info.tag}:${info.text}`);
    await page.keyboard.press("Tab");
  }
  say(noRing.length === 0, `25 öğede görünür odak — halkasız: ${noRing.length ? noRing.slice(0, 3).join(", ") : "yok"}`);
  await ctx.close();
}

// ---------- 3: mobil menü focus trap / ESC / odak iadesi ----------
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const page = await ctx.newPage();
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.waitForTimeout(800);

  console.log("\n— Mobil menü —");
  await page.evaluate(() => {
    const b = [...document.querySelectorAll("button")].find((x) =>
      (x.getAttribute("aria-label") || "").toLowerCase().includes("men"),
    );
    b?.click();
  });
  await page.waitForTimeout(1200);

  const opened = await page.evaluate(() => !!document.querySelector('[role="dialog"]'));
  say(opened, "menü açılıyor (role=dialog)");

  // 30 Tab sonra odak hâlâ dialog içinde mi
  for (let i = 0; i < 30; i++) await page.keyboard.press("Tab");
  const trapped = await page.evaluate(() => {
    const d = document.querySelector('[role="dialog"]');
    return !!d && d.contains(document.activeElement);
  });
  say(trapped, "odak 30 Tab sonra hâlâ menü içinde (trap)");

  await page.keyboard.press("Escape");
  await page.waitForTimeout(900);
  const closed = await page.evaluate(() => !document.querySelector('[role="dialog"]'));
  say(closed, "ESC menüyü kapatıyor");

  const restored = await page.evaluate(() => {
    const el = document.activeElement;
    return (el?.getAttribute?.("aria-label") || "").toLowerCase().includes("men");
  });
  say(restored, "odak menü düğmesine geri döndü");
  await ctx.close();
}

// ---------- 4: zoom ----------
for (const [label, w, h] of [["%200", 720, 450], ["%400", 360, 225]]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h } });
  const page = await ctx.newPage();
  console.log(`\n— ${label} zoom (efektif ${w}×${h}) —`);
  for (const route of ["/", "/on-gorusme", "/sss"]) {
    await page.goto(BASE + route, { waitUntil: "networkidle" });
    await page.waitForTimeout(600);
    const m = await page.evaluate(() => ({
      docW: document.documentElement.scrollWidth,
      winW: window.innerWidth,
    }));
    say(m.docW <= m.winW + 1, `${route} yatay taşma yok (${m.docW}/${m.winW})`);
  }
  await ctx.close();
}

await browser.close();
console.log(`\nsorun: ${fail}`);
process.exit(fail > 0 ? 1 : 0);
