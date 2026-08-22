/**
 * Performans profili (FINAL-VERIFICATION E-01..E-04).
 *
 * Önceki sürüm (qa/mainthread.mjs) yalnız CPU kısıtı uyguluyordu; ağ kısıtı yoktu.
 * Bu haliyle "mid-range mobile" iddiası eksikti: localhost'ta ağ gecikmesi sıfırdır
 * ve gerçek bir telefonun yaşadığı en büyük maliyet ölçüm dışı kalıyordu.
 *
 * Bu script üç koşulda ölçer:
 *   1. masaüstü        1440×900, kısıt yok, soğuk önbellek
 *   2. mobil 4× CPU    390×844, ağ kısıtı yok  (eski koşulla karşılaştırılabilsin)
 *   3. mobil Slow 4G   390×844, 4× CPU + 1.6Mbps/750kbps/150ms RTT, soğuk önbellek
 *
 * Soğuk önbellek: her koşu yeni bir context (paylaşılan disk cache yok) ve ayrıca
 * CDP Network.clearBrowserCache. Ölçüm öncesi ısıtma turu YAPILMAZ.
 *
 * ÖNEMLİ — terminoloji: buradaki tüm sayılar LAB ölçümüdür. Gerçek kullanıcı
 * dağılımı (p75) DEĞİLDİR. Alan verisi olmadan "p75" denmemelidir.
 */
import { chromium } from "playwright";

const BASE = process.argv[2] || "http://127.0.0.1:3400";
const CHANNEL = process.env.PW_CHANNEL ?? "chrome";
const ROUTE = process.env.PERF_ROUTE ?? "/";

// Chrome DevTools "Slow 4G" ön ayarı.
const SLOW_4G = {
  offline: false,
  downloadThroughput: (1.6 * 1024 * 1024) / 8, // 1.6 Mbps -> bayt/sn
  uploadThroughput: (750 * 1024) / 8, // 750 Kbps -> bayt/sn
  latency: 150, // ms RTT
};

const CONDITIONS = [
  { label: "masaustu (kisitsiz, soguk cache)", w: 1440, h: 900, mobile: false, cpu: 1, net: null },
  { label: "mobil 4x CPU (ag kisitsiz)", w: 390, h: 844, mobile: true, cpu: 4, net: null },
  { label: "mobil 4x CPU + Slow 4G (soguk cache)", w: 390, h: 844, mobile: true, cpu: 4, net: SLOW_4G },
];

const browser = await chromium.launch(CHANNEL === "chromium" ? {} : { channel: CHANNEL });

for (const c of CONDITIONS) {
  const ctx = await browser.newContext({
    viewport: { width: c.w, height: c.h },
    isMobile: c.mobile,
    hasTouch: c.mobile,
    deviceScaleFactor: c.mobile ? 2 : 1,
  });
  const page = await ctx.newPage();
  const cdp = await ctx.newCDPSession(page);

  await cdp.send("Network.enable");
  await cdp.send("Network.clearBrowserCache");
  await cdp.send("Network.setCacheDisabled", { cacheDisabled: true });
  if (c.cpu > 1) await cdp.send("Emulation.setCPUThrottlingRate", { rate: c.cpu });
  if (c.net) await cdp.send("Network.emulateNetworkConditions", c.net);

  // Transfer boyutları: kaynak türüne göre ayrıştır.
  const bytes = { js: 0, css: 0, img: 0, font: 0, other: 0 };
  let requests = 0;
  page.on("response", async (r) => {
    requests++;
    const ct = (r.headers()["content-type"] || "").toLowerCase();
    let len = Number(r.headers()["content-length"] || 0);
    if (!len) {
      try {
        len = (await r.body()).length;
      } catch {
        len = 0;
      }
    }
    if (ct.includes("javascript")) bytes.js += len;
    else if (ct.includes("css")) bytes.css += len;
    else if (ct.startsWith("image/")) bytes.img += len;
    else if (ct.includes("font")) bytes.font += len;
    else bytes.other += len;
  });

  await page.addInitScript(() => {
    window.__long = [];
    window.__lcp = 0;
    window.__cls = 0;
    window.__lcpEl = "";
    try {
      new PerformanceObserver((l) => {
        for (const e of l.getEntries()) window.__long.push(Math.round(e.duration));
      }).observe({ entryTypes: ["longtask"] });
    } catch {}
    new PerformanceObserver((l) => {
      const e = l.getEntries();
      const last = e[e.length - 1];
      window.__lcp = Math.round(last.startTime);
      const el = last.element;
      window.__lcpEl = el
        ? `${el.tagName}${el.className ? "." + String(el.className).split(/\s+/).slice(0, 2).join(".") : ""}`
        : "(element yok)";
    }).observe({ type: "largest-contentful-paint", buffered: true });
    new PerformanceObserver((l) => {
      for (const e of l.getEntries()) if (!e.hadRecentInput) window.__cls += e.value;
    }).observe({ type: "layout-shift", buffered: true });
  });

  const t0 = Date.now();
  await page.goto(BASE + ROUTE, { waitUntil: "load" });
  // CLS ve LCP'nin oturması için bekle — KAYDIRMA YOK. Kaydırırsak scroll'a bağlı
  // hareketler layout shift olarak sayılır ve CLS yapay biçimde şişer (daha önce
  // bu yüzden 0.46 gibi yanlış bir değer ölçülmüştü).
  await page.waitForTimeout(c.net ? 6000 : 3500);

  const m = await page.evaluate(() => ({
    long: window.__long,
    lcp: window.__lcp,
    lcpEl: window.__lcpEl,
    cls: +window.__cls.toFixed(4),
    // INP yerine yaklaşık gösterge: uzun görevlerin toplamı (TBT benzeri).
    nav: (() => {
      const n = performance.getEntriesByType("navigation")[0];
      return n ? { dcl: Math.round(n.domContentLoadedEventEnd), load: Math.round(n.loadEventEnd) } : null;
    })(),
  }));

  const tbt = m.long.filter((d) => d > 50).reduce((a, d) => a + (d - 50), 0);
  const kb = (n) => Math.round(n / 1024);
  const total = Object.values(bytes).reduce((a, b) => a + b, 0);

  console.log(`\n=== ${c.label} ===`);
  console.log(`  LCP ${m.lcp} ms   CLS ${m.cls}   TBT ~${tbt} ms   load ${m.nav?.load ?? "?"} ms   duvar saati ${Date.now() - t0} ms`);
  console.log(`  LCP ogesi: ${m.lcpEl}`);
  console.log(`  uzun gorev >50ms: ${m.long.filter((d) => d > 50).length}   >200ms: ${m.long.filter((d) => d > 200).length}`);
  console.log(`  transfer  toplam ${kb(total)} KB  (js ${kb(bytes.js)} · css ${kb(bytes.css)} · img ${kb(bytes.img)} · font ${kb(bytes.font)} · diger ${kb(bytes.other)})   istek ${requests}`);

  await ctx.close();
}

await browser.close();
console.log(`\nNot: bu degerler LAB olcumudur (localhost + emulasyon), p75 alan verisi DEGILDIR.`);
