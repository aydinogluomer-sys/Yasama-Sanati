/**
 * Site geneli imleç yoldaşı GERÇEKTEN çalışıyor mu — davranış olarak ölçer.
 *
 * NEDEN AYRI BİR KAPI VAR
 * Plan maddesi 7 (A6) "imleci siteye yay" diyordu ve bir tur boyunca
 * yapılmadığı hâlde faz tamamlandı diye raporlandı. Ayrıca bu depoda üç kez
 * "sınıf yazılmış ama stil hiç uygulanmamış" hatası çıktı (D073/D074). Bu kapı
 * ikisini birden engelliyor: bileşenin VARLIĞINA değil, DAVRANIŞINA bakıyor.
 *
 * Doğrulananlar:
 *  1. Fare hareketiyle halka beliriyor ve fareyi takip ediyor (konum değişiyor).
 *  2. Etkileşimli öge üzerinde büyüyor (ölçek artıyor).
 *  3. Birden çok rotada var — yani gerçekten site geneli, yalnız ana sayfada değil.
 *  4. Dokunmatik / kaba işaretçide HİÇ render edilmiyor.
 *  5. Hareket azaltma tercihinde HİÇ render edilmiyor.
 *  6. Yerli imleç gizlenmiyor (`cursor: none` yok) — JS gelmezse kullanıcı
 *     işaretçisiz kalmamalı.
 */
import { chromium } from "playwright";

const BASE = process.argv[2] || "http://127.0.0.1:3400";
const SEC = 'div[aria-hidden][class*="rounded-full"][class*="z-[60]"]';
const ROTALAR = ["/", "/programlar", "/blog", "/the-story"];

const browser = await chromium.launch();
let bad = 0;
const yaz = (ok, mesaj) => {
  if (!ok) bad++;
  console.log(`${ok ? "OK  " : "HATA"}  ${mesaj}`);
};

/** Halkanın ekrandaki kutusunu döndürür (yoksa null). */
async function halka(p) {
  return p.evaluate((sec) => {
    const el = document.querySelector(sec);
    if (!el) return null;
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    return {
      x: Math.round(r.x + r.width / 2),
      y: Math.round(r.y + r.height / 2),
      w: Math.round(r.width),
      opacity: Number(cs.opacity),
    };
  }, SEC);
}

// 1-3 — masaüstü, ince işaretçi
for (const rota of ROTALAR) {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const p = await ctx.newPage();
  await p.goto(BASE + rota, { waitUntil: "networkidle" });
  await p.waitForTimeout(900);

  await p.mouse.move(300, 300);
  await p.waitForTimeout(500);
  const a = await halka(p);

  await p.mouse.move(800, 550);
  await p.waitForTimeout(600);
  const b = await halka(p);

  if (!a || !b) {
    yaz(false, `${rota.padEnd(14)} halka DOM'da yok — site geneli degil`);
    await ctx.close();
    continue;
  }
  const takip = Math.abs(b.x - a.x) > 100 && Math.abs(b.y - a.y) > 100;
  const gorunur = b.opacity > 0.5;
  yaz(
    takip && gorunur,
    `${rota.padEnd(14)} halka fareyi takip ediyor (${a.x},${a.y} -> ${b.x},${b.y}) opacity ${b.opacity}`,
  );
  await ctx.close();
}

// 2 — etkileşimli öge üzerinde büyüme
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const p = await ctx.newPage();
  await p.goto(BASE + "/", { waitUntil: "networkidle" });
  await p.waitForTimeout(900);
  await p.mouse.move(640, 700);
  await p.waitForTimeout(500);
  const notr = await halka(p);

  const link = await p.evaluate(() => {
    const el = [...document.querySelectorAll("a, button")].find((e) => {
      const r = e.getBoundingClientRect();
      return r.width > 40 && r.height > 20 && r.top > 0 && r.top < 700;
    });
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { x: Math.round(r.x + r.width / 2), y: Math.round(r.y + r.height / 2) };
  });
  if (!link) {
    yaz(false, "buyume testi icin uygun link bulunamadi");
  } else {
    await p.mouse.move(link.x, link.y);
    await p.waitForTimeout(700);
    const uzerinde = await halka(p);
    yaz(
      notr && uzerinde && uzerinde.w > notr.w * 1.2,
      `etkilesimli oge uzerinde buyuyor (${notr?.w}px -> ${uzerinde?.w}px)`,
    );
  }
  await ctx.close();
}

// 4 — dokunmatik: hiç render edilmemeli
{
  const ctx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });
  const p = await ctx.newPage();
  await p.goto(BASE + "/", { waitUntil: "networkidle" });
  await p.waitForTimeout(900);
  const v = await halka(p);
  yaz(v === null, `dokunmatikte render EDILMIYOR (${v === null ? "yok" : "VAR - hata"})`);
  await ctx.close();
}

// 5 — hareket azaltma: hiç render edilmemeli
{
  const ctx = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    reducedMotion: "reduce",
  });
  const p = await ctx.newPage();
  await p.goto(BASE + "/", { waitUntil: "networkidle" });
  await p.waitForTimeout(900);
  await p.mouse.move(400, 400);
  await p.waitForTimeout(400);
  const v = await halka(p);
  yaz(v === null, `hareket azaltmada render EDILMIYOR (${v === null ? "yok" : "VAR - hata"})`);
  await ctx.close();
}

// 6 — yerli imleç gizlenmemeli
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const p = await ctx.newPage();
  await p.goto(BASE + "/", { waitUntil: "networkidle" });
  await p.waitForTimeout(700);
  const gizli = await p.evaluate(() => {
    const b = getComputedStyle(document.body).cursor;
    const h = getComputedStyle(document.documentElement).cursor;
    return b === "none" || h === "none";
  });
  yaz(!gizli, "yerli imlec gizlenmiyor (cursor: none yok)");
  await ctx.close();
}

await browser.close();
console.log(`\nimlec kapisi — sorun: ${bad}`);
process.exit(bad ? 1 : 0);
