/**
 * Hero fotoğrafı ÜZERİNDEKİ metnin kontrastını ölçer.
 *
 * Bu kapı neden var: axe fotoğraf üzerindeki metnin kontrastını HESAPLAYAMAZ.
 * Alt sayfaların hepsinde başlık ve açıklama bir fotoğrafın üstünde duruyor,
 * yani otomatik erişilebilirlik taraması bu yüzeyi hiç görmüyor.
 *
 * YÖNTEM — tamamen piksel tabanlı, bilerek.
 * İlk sürüm metin rengini `getComputedStyle().color` ile alıyordu ve YANLIŞ
 * ÖLÇTÜ: Tailwind v4 rengi `oklab(0.85339 -0.0102 0.0224 / 0.9)` olarak
 * döndürüyor, sayı çıkaran bir regex bunu RGB sanıp neredeyse siyah okuyor.
 * Sonuç sekiz rotada da sahte bir 1.7:1'di.
 *
 * Artık hiçbir renk dizgisi ayrıştırılmıyor. Metin kutusunun ekran görüntüsü
 * alınıp:
 *   • arka plan = en koyu %50'nin ortancası
 *   • metin     = en açık %3'ün ortancası (glif çekirdekleri)
 * Kenar yumuşatma piksellerinin ikisine de karışmaması için uçlar alınıyor.
 */
import { chromium } from "playwright";
import { PNG } from "pngjs";

const BASE = process.argv[2] || "http://127.0.0.1:3400";
const ROUTES = [
  "/community",
  "/the-story",
  "/programlar",
  "/programlar/reiki",
  "/programlar/nefes-koclugu",
  "/sss",
  "/blog",
  "/egitmenler",
];

const lin = (c) => {
  c /= 255;
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
};
const L = (r, g, b) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
const median = (a) => a[Math.floor(a.length / 2)];

const browser = await chromium.launch();
let bad = 0;

for (const route of ROUTES) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(BASE + route, { waitUntil: "networkidle" });
  // Hero görselinin yüklenmesi ve yerleşme animasyonunun başlaması.
  await page.waitForTimeout(2500);

  const box = await page.evaluate(() => {
    const h1 = document.querySelector("h1");
    const desc = h1?.parentElement?.querySelector("p");
    if (!desc) return null;
    const r = desc.getBoundingClientRect();
    return {
      x: Math.round(r.x),
      y: Math.round(r.y),
      w: Math.round(r.width),
      h: Math.round(r.height),
    };
  });

  if (!box || box.h < 8) {
    console.log(route.padEnd(28), "hero açıklaması yok — atlandı");
    await page.close();
    continue;
  }

  const buf = await page.screenshot({
    clip: { x: box.x, y: box.y, width: Math.min(box.w, 900), height: box.h },
  });
  const png = PNG.sync.read(buf);

  const lums = [];
  for (let i = 0; i < png.data.length; i += 4) {
    lums.push(L(png.data[i], png.data[i + 1], png.data[i + 2]));
  }
  lums.sort((a, b) => a - b);

  const bgL = median(lums.slice(0, Math.floor(lums.length * 0.5)));
  const fgL = median(lums.slice(Math.floor(lums.length * 0.97)));
  const ratio = (Math.max(fgL, bgL) + 0.05) / (Math.min(fgL, bgL) + 0.05);

  const ok = ratio >= 4.5;
  if (!ok) bad++;
  console.log(
    route.padEnd(28),
    ratio.toFixed(2) + ":1",
    ok ? "GECER" : "KALIR <-",
  );
  await page.close();
}

await browser.close();
console.log(`\n${ROUTES.length} hero — metin kontrasti tabanin altinda: ${bad}`);
process.exit(bad ? 1 : 0);
