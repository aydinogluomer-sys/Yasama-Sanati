/**
 * Ana iş parçacığı ve hydration profili (RELEASE-PLAN §4.3).
 *
 * Ölçülenler: uzun görevler (>200ms ve >50ms), LCP, CLS, transfer edilen JS,
 * ve WebGL/Three.js'in görünürlüğe yaklaşmadan mount edilip edilmediği.
 */
import { chromium } from "playwright";

const BASE = process.argv[2] || "http://127.0.0.1:3400";
const CHANNEL = process.env.PW_CHANNEL ?? "chrome";
const browser = await chromium.launch(CHANNEL === "chromium" ? {} : { channel: CHANNEL });

for (const [label, width, height, mobile, cpu] of [
  ["masaüstü", 1440, 900, false, 1],
  ["mobil (4× CPU kısıtı)", 390, 844, true, 4],
]) {
  const ctx = await browser.newContext({
    viewport: { width, height },
    isMobile: mobile,
    hasTouch: mobile,
  });
  const page = await ctx.newPage();

  const cdp = await ctx.newCDPSession(page);
  if (cpu > 1) await cdp.send("Emulation.setCPUThrottlingRate", { rate: cpu });

  let js = 0;
  page.on("response", async (r) => {
    const ct = r.headers()["content-type"] || "";
    if (ct.includes("javascript")) {
      try {
        js += (await r.body()).length;
      } catch {}
    }
  });

  await page.addInitScript(() => {
    window.__long = [];
    window.__lcp = 0;
    window.__cls = 0;
    new PerformanceObserver((l) => {
      for (const e of l.getEntries()) window.__long.push(Math.round(e.duration));
    }).observe({ entryTypes: ["longtask"] });
    new PerformanceObserver((l) => {
      const e = l.getEntries();
      window.__lcp = Math.round(e[e.length - 1].startTime);
    }).observe({ type: "largest-contentful-paint", buffered: true });
    new PerformanceObserver((l) => {
      for (const e of l.getEntries()) if (!e.hadRecentInput) window.__cls += e.value;
    }).observe({ type: "layout-shift", buffered: true });
  });

  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.waitForTimeout(2500);

  // WebGL sayfa açılışında mı mount ediliyor, yoksa görünürlüğe yaklaşınca mı?
  const canvasAtTop = await page.evaluate(() => document.querySelectorAll("canvas").length);
  await page.evaluate(async () => {
    const H = document.body.scrollHeight;
    for (let y = 0; y < H; y += 800) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
  });
  await page.waitForTimeout(1500);

  const m = await page.evaluate(() => ({
    long: window.__long,
    lcp: window.__lcp,
    cls: +window.__cls.toFixed(4),
    canvas: document.querySelectorAll("canvas").length,
  }));

  const over200 = m.long.filter((d) => d > 200);
  const over50 = m.long.filter((d) => d > 50);
  console.log(`\n=== ${label} ===`);
  console.log(`  LCP: ${m.lcp} ms   CLS: ${m.cls}   JS transfer: ${Math.round(js / 1024)} KB`);
  console.log(`  uzun görev >50ms: ${over50.length}   >200ms: ${over200.length}${over200.length ? " → " + over200.join(", ") : ""}`);
  console.log(`  canvas — açılışta: ${canvasAtTop}, tam kaydırma sonrası: ${m.canvas}  ${canvasAtTop === 0 && m.canvas > 0 ? "(lazy ✓)" : canvasAtTop > 0 ? "(açılışta mount ⚠)" : "(canvas yok)"}`);

  await ctx.close();
}
await browser.close();
