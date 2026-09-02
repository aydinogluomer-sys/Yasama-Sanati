/**
 * Tipografik seslerin GERÇEKTEN uygulandığını doğrular.
 *
 * NEDEN AYRI BİR KAPI VAR
 * Sitenin üç sesi var: Ogg (serif başlık), Basis Grotesque (gövde) ve Space
 * Mono (mikro-etiket: 01/02 indeksleri, kicker'lar, tarihler). Bunlardan Space
 * Mono **hiçbir zaman render edilmiyordu** ve bunu hiçbir kapı yakalamadı:
 *
 *   • `build` yakalamaz — CSS geçerli, yalnız bir custom property zincirinin
 *     ucu tanımsız.
 *   • `lint`/`typecheck` yakalamaz — sorun CSS kaskadında.
 *   • `test:a11y` yakalamaz — yanlış yazı tipi bir erişilebilirlik ihlali değil.
 *   • `test:visual` yakalamaz — ilk anlık görüntü zaten bozuk halde alınmıştı,
 *     yani bozukluk "referans" olmuştu.
 *
 * Kök neden: next/font değişkenleri (`--font-space-mono` vb.) `<body>`nin
 * class'ıyla basılıyor, Tailwind `@theme` bloğu ise `:root` üzerinde
 * değerlendiriliyor. `@theme` içinde `var(--font-space-mono)` yazınca değişken
 * o seviyede TANIMSIZ oluyor, `--font-mono` "guaranteed-invalid" değere düşüyor
 * ve `.font-mono` kuralı sessizce hiç uygulanmıyor. Hata mesajı yok; yalnız
 * yanlış yazı tipi.
 *
 * ÖLÇÜM: computed `font-family`. Sınıf listesine değil, tarayıcının gerçekten
 * hesapladığı değere bakılıyor — tek güvenilir kanıt bu.
 */
import { chromium } from "playwright";

const BASE = process.argv[2] || "http://127.0.0.1:3400";

/** class -> computed font-family içinde bulunması gereken aile adı. */
const VOICES = [
  { cls: "font-mono", bekleniyor: "Space Mono", ad: "mikro-etiket" },
  { cls: "font-serif", bekleniyor: "ogg", ad: "başlık" },
  { cls: "font-sans", bekleniyor: "basisGrotesque", ad: "gövde" },
];

const ROUTES = [
  "/",
  "/sss",
  "/the-story",
  "/community",
  "/blog",
  "/egitmenler",
  "/programlar",
  "/programlar/reiki",
  "/kvkk",
];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

let failures = 0;
for (const route of ROUTES) {
  await page.goto(BASE + route, { waitUntil: "networkidle" });
  await page.waitForTimeout(700);

  for (const voice of VOICES) {
    const r = await page.evaluate((cls) => {
      const els = [...document.querySelectorAll("*")].filter((el) =>
        el.classList.contains(cls),
      );
      return {
        n: els.length,
        fams: [...new Set(els.map((el) => getComputedStyle(el).fontFamily))],
      };
    }, voice.cls);

    // Sayfada o ses hiç kullanılmıyorsa geçerli bir durum — atla.
    if (r.n === 0) continue;

    const bad = r.fams.filter(
      (f) => !f.toLowerCase().includes(voice.bekleniyor.toLowerCase()),
    );
    if (bad.length) {
      failures++;
      console.log(
        `HATA ${route.padEnd(22)} .${voice.cls} (${voice.ad}) ${r.n} eleman -> ${bad.join(" | ")}`,
      );
    } else {
      console.log(
        `OK   ${route.padEnd(22)} .${voice.cls} (${voice.ad}) ${String(r.n).padStart(2)} eleman`,
      );
    }
  }

  /* SINIF DEĞİL, GERÇEKTEN OKUNAN METİN.
     Yukarıdaki döngü `font-sans` sınıfını TAŞIYAN elemana bakar. Asıl hasar ise
     mirasta oluşuyordu: `SubPageLayout`in kök div'i `font-sans` alıp Tailwind'in
     varsayılan sistem yığınına düşünce, altındaki bütün paragraflar işletim
     sistemi fontuyla yazılıyordu. Sınıf denetimi bunu göremez — o yüzden sayfanın
     gerçek gövde metni ayrıca örnekleniyor. */
  const govde = await page.evaluate(() => {
    const paras = [...document.querySelectorAll("main p, article p")].slice(0, 15);
    const sayim = {};
    for (const el of paras) {
      const f = getComputedStyle(el).fontFamily.split(",")[0].replace(/"/g, "");
      sayim[f] = (sayim[f] || 0) + 1;
    }
    return sayim;
  });

  const izinli = ["basisGrotesque", "ogg", "Space Mono"];
  const yabanci = Object.keys(govde).filter((f) => !izinli.includes(f));
  if (yabanci.length) {
    failures++;
    console.log(
      `HATA ${route.padEnd(22)} gövde paragrafları marka fontunda değil -> ${yabanci
        .map((f) => `${f} (${govde[f]})`)
        .join(", ")}`,
    );
  } else if (Object.keys(govde).length) {
    console.log(
      `OK   ${route.padEnd(22)} gövde paragrafları -> ${Object.entries(govde)
        .map(([f, n]) => `${f} x${n}`)
        .join(", ")}`,
    );
  }
}

await browser.close();
console.log(`\n${ROUTES.length} rota — cozulmeyen tipografik ses: ${failures}`);
process.exit(failures ? 1 : 0);
