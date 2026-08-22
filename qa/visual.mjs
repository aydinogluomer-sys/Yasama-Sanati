/**
 * Görsel regresyon (FINAL-VERIFICATION C-06).
 *
 * Kritik sayfaların 4 viewport'taki görünümünü baseline PNG'lerle karşılaştırır.
 * Baseline yoksa oluşturur ve "yeni baseline" der (ilk çalıştırma). Sonraki
 * çalıştırmalarda piksel farkı eşiği aşarsa kapıyı kapatır ve fark görüntüsünü
 * qa/visual/diff/ altına yazar.
 *
 * Kullanım:
 *   node qa/visual.mjs                 karşılaştır
 *   node qa/visual.mjs --update        baseline'ları yenile (kasıtlı tasarım değişikliği sonrası)
 *
 * Kararlılık için: animasyonlar durdurulur (reduced-motion + CSS ile animation/
 * transition kapatma), tembel görseller yüklensin diye sayfa bir kez gezilir,
 * sonra başa dönülür. Aksi halde scroll'a bağlı hareket her turda farklı kare verir.
 */
import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";

const BASE = process.argv.find((a) => a.startsWith("http")) || "http://127.0.0.1:3400";
const UPDATE = process.argv.includes("--update");
const CHANNEL = process.env.PW_CHANNEL ?? "chrome";

const DIR = path.join("qa", "visual");
const BASELINE = path.join(DIR, "baseline");
const DIFF = path.join(DIR, "diff");
fs.mkdirSync(BASELINE, { recursive: true });
fs.mkdirSync(DIFF, { recursive: true });

const VIEWPORTS = [
  ["390x844", 390, 844, true],
  ["768x1024", 768, 1024, false],
  ["1440x900", 1440, 900, false],
  ["1920x1080", 1920, 1080, false],
];
const ROUTES = ["/", "/programlar", "/programlar/reiki", "/on-gorusme"];

// Farkın anlamlı sayılması için eşik: pikselin %0.15'i. Font hinting ve
// görüntü kod çözme farkları bu bandın altında kalır.
const THRESHOLD_RATIO = 0.0015;

const browser = await chromium.launch(CHANNEL === "chromium" ? {} : { channel: CHANNEL });
let failures = 0;
let created = 0;

for (const [vpLabel, width, height, mobile] of VIEWPORTS) {
  const ctx = await browser.newContext({
    viewport: { width, height },
    isMobile: mobile,
    hasTouch: mobile,
    deviceScaleFactor: 1,
    reducedMotion: "reduce",
  });
  const page = await ctx.newPage();

  for (const route of ROUTES) {
    await page.goto(BASE + route, { waitUntil: "networkidle" });
    // Tembel görselleri tetikle, sonra başa dön.
    await page.evaluate(async () => {
      const H = document.body.scrollHeight;
      for (let y = 0; y < H; y += 600) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 40));
      }
      window.scrollTo(0, 0);
    });
    // Kalan her hareketi dondur — aksi halde kare kare fark oluşur.
    await page.addStyleTag({
      content: `*, *::before, *::after {
        animation-duration: 0s !important;
        animation-delay: 0s !important;
        transition-duration: 0s !important;
        transition-delay: 0s !important;
        caret-color: transparent !important;
      }`,
    });
    await page.waitForTimeout(1200);

    const name = `${route === "/" ? "home" : route.replace(/\//g, "_").replace(/^_/, "")}__${vpLabel}.png`;
    const basePath = path.join(BASELINE, name);
    // NavBar maskelenir. Hareketi Motion ile JS üzerinden sürülüyor; yukarıdaki
    // CSS enjeksiyonu onu durdurmuyor ve bekleme süresini uzatmak da deterministik
    // hale getirmedi (ölçüldü: turlar arası %0.308 fark, tamamı logo/CTA/hamburger).
    // Kararsız bölgeyi maskelemek görsel regresyonda standart yaklaşımdır; nav'ın
    // kendisi qa/e2e.mjs (varlık) ve qa/keyboard.mjs (odak/trap) kapılarında
    // zaten doğrulanıyor.
    const shot = await page.screenshot({
      fullPage: false,
      mask: [page.locator("header").first()],
      maskColor: "#000000",
    });

    if (!fs.existsSync(basePath) || UPDATE) {
      fs.writeFileSync(basePath, shot);
      created++;
      console.log(`YENI  ${name}`);
      continue;
    }

    const a = PNG.sync.read(fs.readFileSync(basePath));
    const b = PNG.sync.read(shot);
    if (a.width !== b.width || a.height !== b.height) {
      failures++;
      console.log(`HATA  ${name} boyut degisti ${a.width}x${a.height} -> ${b.width}x${b.height}`);
      continue;
    }
    const diff = new PNG({ width: a.width, height: a.height });
    const changed = pixelmatch(a.data, b.data, diff.data, a.width, a.height, { threshold: 0.12 });
    const ratio = changed / (a.width * a.height);
    const ok = ratio <= THRESHOLD_RATIO;
    if (!ok) {
      failures++;
      fs.writeFileSync(path.join(DIFF, name), PNG.sync.write(diff));
      console.log(`HATA  ${name} degisen piksel %${(ratio * 100).toFixed(3)} (esik %${(THRESHOLD_RATIO * 100).toFixed(3)}) -> qa/visual/diff/${name}`);
    } else {
      console.log(`OK    ${name} degisen piksel %${(ratio * 100).toFixed(3)}`);
    }
  }
  await ctx.close();
}

await browser.close();
if (created) console.log(`\n${created} baseline olusturuldu (ilk calistirma veya --update).`);
console.log(`\n${VIEWPORTS.length} viewport x ${ROUTES.length} rota — gorsel regresyon sorunu: ${failures}`);
process.exit(failures > 0 ? 1 : 0);
