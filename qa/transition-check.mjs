/**
 * Sayfa geçişinin GERÇEKTEN çalıştığını ve JS'siz de içeriği gizlemediğini ölçer.
 *
 * İki soru sorar:
 *   1. `.page-enter` üzerinde `pageEnter` animasyonu tanımlı mı?
 *   2. JAVASCRIPT KAPALIYKEN h1 görünür son duruma ulaşıyor mu?
 *
 * 2. soru neden var: Motion'ın `initial={{opacity:0}}` prop'u SUNUCU HTML'ine
 * `opacity:0` olarak yazılır. Hidrasyon herhangi bir nedenle başarısız olursa
 * sayfa boş kalır. Bu yüzden geçiş saf CSS ile yapılıyor (bkz. app/template.tsx)
 * ve bu kapı o kararı koruyor.
 *
 * ÖLÇÜM YÖNTEMİ DÜZELTİLDİ (2026-09-02).
 * Önceki sürüm `domcontentloaded` sonrası SABİT 1500 ms bekleyip opaklığı
 * okuyordu. Oysa `.animate-hero-title` animasyonu **1400 ms** sürüyor — yani
 * pay yalnızca 100 ms'ti. Makine biraz yavaşladığında kapı animasyonun ORTASINI
 * ölçüyor ve "içerik gizli" diyordu:
 *
 *     temiz koşu A: opacity 0.99976  -> GEÇTİ
 *     temiz koşu B: opacity 0.973683 -> KALDI   (aynı derleme, aynı kod)
 *
 * İkisi de aynı şeyi gösteriyordu: içerik görünür ve animasyon son durumuna
 * gidiyor. Kapı yanlış anı ölçüyordu.
 *
 * Artık opaklık, DEĞİŞMEYİ BIRAKANA kadar yoklanıyor (ya da 8 sn tavana kadar).
 * Ölçülen şey artık "şu anki kare" değil, animasyonun oturduğu SON DURUM —
 * kapının en başından beri sormak istediği soru buydu.
 */
import { chromium } from "playwright";

const B = process.argv[2] || "http://127.0.0.1:3400";
let bad = 0;

// 1) Geçiş animasyonu tanımlı mı?
{
  const br = await chromium.launch();
  const p = await br.newPage();
  await p.goto(B + "/the-story", { waitUntil: "domcontentloaded" });
  const r = await p.evaluate(() => {
    const el = document.querySelector(".page-enter");
    if (!el) return null;
    const cs = getComputedStyle(el);
    return { name: cs.animationName, dur: cs.animationDuration };
  });
  console.log("gecis:", JSON.stringify(r));
  if (!r || r.name !== "pageEnter") {
    bad++;
    console.log("  <- gecis YOK");
  }
  await br.close();
}

// 2) JS KAPALIYKEN içerik son durumda görünür mü?
{
  const br = await chromium.launch();
  const ctx = await br.newContext({ javaScriptEnabled: false });
  const p = await ctx.newPage();
  await p.goto(B + "/the-story", { waitUntil: "domcontentloaded" });

  const oku = () =>
    p.evaluate(() => {
      const h = document.querySelector("h1");
      if (!h) return null;
      const cs = getComputedStyle(h);
      const rect = h.getBoundingClientRect();
      return {
        op: Number(cs.opacity),
        vis: cs.visibility,
        w: Math.round(rect.width),
        h: Math.round(rect.height),
      };
    });

  // Opaklık iki ardışık okumada aynı kalana kadar yokla (tavan 8 sn).
  // Sabit bir bekleme değil, animasyonun oturması bekleniyor.
  let r = await oku();
  let onceki = null;
  const deadline = Date.now() + 8000;
  while (Date.now() < deadline) {
    await p.waitForTimeout(250);
    onceki = r;
    r = await oku();
    if (r && onceki && Math.abs(r.op - onceki.op) < 0.001) break;
  }

  console.log("JS kapali h1 (son durum):", JSON.stringify(r));
  if (!r || r.op < 0.99 || r.vis === "hidden" || r.w < 10) {
    bad++;
    console.log("  <- icerik GIZLI");
  }
  await br.close();
}

console.log("\nsorun:", bad);
process.exit(bad ? 1 : 0);
