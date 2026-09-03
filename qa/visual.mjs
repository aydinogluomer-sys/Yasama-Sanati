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
// Kapsam 4 -> 8 rota (docs/AWWWARDS-90-BLOCKERS.md Faz 3 kapısı).
// Eklenenler tam da bu turda yeniden kurgulanan sayfalar: /community ve
// /the-story (kutu ızgarasından editoryal akışa), /blog (öne çıkan kart),
// /kvkk (yapışkan içindekiler). Değişen sayfa izlenmiyorsa kapı boş kapıdır.
const ROUTES = [
  "/",
  "/programlar",
  "/programlar/reiki",
  "/on-gorusme",
  "/community",
  "/the-story",
  "/blog",
  "/kvkk",
];

// Farkın anlamlı sayılması için eşik: pikselin %0.15'i. Font hinting ve
// görüntü kod çözme farkları bu bandın altında kalır.
const THRESHOLD_RATIO = 0.0015;

/**
 * Kareyi zamana değil ANİMASYONUN BİTMİŞ OLMASINA bağlar.
 *
 * Önce yalnız `animation-duration: 0s` enjekte ediliyordu. Bu bir YARIŞ
 * bırakıyor: kural enjekte edildiğinde animasyon henüz başlamamışsa öge son
 * kareye değil TABAN stiline düşer. Ölçüldü — aynı derlemede, üründe hiçbir
 * değişiklik yokken:
 *   home__390x844      %2,385  (hero başlığı taban konumunda kalmış)
 *   programlar__1440x900 %12,956 (nav maskesi farklı kutuya oturmuş)
 * Makine yüklüyken (bu turda boş RAM 0,65 GB) yarışı kaybetme olasılığı artıyor.
 *
 * Doğrusu: WAAPI üzerinden her animasyonu tek tek bitirmek. `finish()` ögeyi
 * son kareye ışınlar. Sonsuz döngüler (nefes, pulse) bitirilemez — onlar
 * duraklatılıp başa alınır ki her koşuda AYNI karede dursunlar.
 * Motion'ın JS ile sürdüğü nav animasyonları da WAAPI olduğu için bu listeye
 * dâhil; maskenin kutusu böylece koşular arasında sabitleniyor.
 */
async function animasyonlariOturt(page) {
  await page.evaluate(() => {
    for (const a of document.getAnimations()) {
      const sonsuz = a.effect?.getTiming?.().iterations === Infinity;
      try {
        if (sonsuz) {
          a.pause();
          a.currentTime = 0;
        } else {
          a.finish();
        }
      } catch {
        /* iptal edilmiş / hazır olmayan animasyon — atla */
      }
    }
  });
}

/**
 * ±1 PİKSEL DİKEY KAYMA TOLERANSI — ısınma turundan SONRA kalan artık için.
 *
 * Mekanizma ölçüldü: park noktası `footer.belgeKonumu - viewportYuksekligi`
 * ile hesaplanıyor ve bu KESİRLİ bir sayı (ör. 14851,359 / 14851,547).
 * Tamsayı kaydırmaya çevirmek zorunlu, dolayısıyla yerleşimdeki 0,2 px'lik
 * bir salınım yuvarlama sınırında TAM BİR PİKSELE büyüyebiliyor. Isınma turu
 * bu salınımın ana kaynağını (ilk yükleme) kaldırdı; kalan artık için kare
 * ±1 px kaydırılıp en iyi eşleşme alınıyor.
 *
 * KABUL EDİLEN BEDEL — açıkça yazılıyor: gerçek bir 1 piksellik DİKEY kayma
 * regresyonu bu kapıdan geçer. Renk, içerik, tipografi, yatay kayma ve 1px'ten
 * büyük her dikey kayma yakalanmaya devam eder.
 */
function kirp(png, y0, h) {
  const out = new PNG({ width: png.width, height: h });
  png.data.copy(out.data, 0, y0 * png.width * 4, (y0 + h) * png.width * 4);
  return out;
}

function farkOrani(a, b, dy) {
  const h = a.height - Math.abs(dy);
  const aa = dy === 0 ? a : kirp(a, dy > 0 ? dy : 0, h);
  const bb = dy === 0 ? b : kirp(b, dy > 0 ? 0 : -dy, h);
  const diff = new PNG({ width: a.width, height: h });
  const changed = pixelmatch(aa.data, bb.data, diff.data, a.width, h, {
    threshold: 0.12,
  });
  return { oran: changed / (a.width * h), diff };
}

/* METİN RASTERLEŞTİRMESİ BAYRAKLA SABİTLENİYOR.
   Chrome Windows'ta alt piksel (LCD) yumuşatma kullanır ve bir öge kompozit
   katmana taşındığında (ana sayfada parallax bunu yapıyor) gri yumuşatmaya
   düşer. Aynı metin iki farklı kenarla rasterleşir; görsel kapı bunu ürün
   değişikliği sanır.
   CSS ile denendi ve İŞE YARAMADI: `-webkit-font-smoothing` Windows'ta yok
   sayılır — o satır kaldırıldı, çünkü işe yaramayan bir önlemi dosyada
   bırakmak sonraki turda "bu zaten hallediliyor" yanılgısı üretir.
   Doğru kaldıraç tarayıcı bayrağıdır: `--disable-lcd-text` her yerde gri
   yumuşatma verir; `--force-color-profile=srgb` ekran profilinden bağımsız
   renk.

   ÜÇÜNCÜSÜ ASIL SEBEP İÇİN: `--disable-font-subpixel-positioning`.
   Ölçüldü — sayfanın yerleşimi koşular arasında ALT PİKSEL kadar oynuyor:
   ana sayfada form sütununun tepesi bir koşuda -543,703, ötekinde -543,859
   (0,156 px). Aynı koşu içinde arka arkaya alınan dört kare ise birbirinin
   aynısı (%0,005) — yani sayfa park edildikten sonra durgun, oynayan şey
   YÜKLEMEDEN YÜKLEMEYE yerleşimin kesirli kısmı. Glif konumları kesirli
   izlenirse bu 0,156 px her harfi biraz farklı rasterleştirir ve kapı bunu
   %0,6 fark olarak görür. Bayrak glifleri tam piksele oturtur; 0,156 px'lik
   kayma aynı tamsayıya yuvarlanır ve kare değişmez. */
const BAYRAKLAR = [
  "--disable-lcd-text",
  "--disable-font-subpixel-positioning",
  "--force-color-profile=srgb",
];
const browser = await chromium.launch(
  CHANNEL === "chromium" ? { args: BAYRAKLAR } : { channel: CHANNEL, args: BAYRAKLAR },
);
let failures = 0;
let created = 0;

/* ISINMA TURU — ilk yükleme ötekilerden FARKLI ölçülüyor.
 *
 * Ölçüm (aynı kare, altı ayrı tarayıcı açılışı, ürün değişmeden):
 *   çekim 0 : footer belge konumu 14851,547 -> park scrollY 14008
 *   çekim 1..5: footer belge konumu 14851,359 -> park scrollY 14007
 *   0 vs 1..5 : %2,003 (beşi de) · 1..5 kendi aralarında fark yok
 * Yani ilk açılışta yerleşim 0,188 px farklı oturuyor ve park noktası
 * yuvarlanırken bu fark TAM BİR PİKSELE büyüyor; kare bir satır kayıyor ve
 * metin yoğun bir ekranda bu %2 değişen piksel demek.
 *
 * Kapıda ilk çekilen kare tam da bu: ilk viewport'un ilk rotası. Bu yüzden
 * "ana sayfanın mobil karesi" her turda, referans nasıl üretilirse üretilsin,
 * AYNI %2,003 ile patlıyordu — kararsızlık değil, ısınmamış ilk yükleme.
 *
 * Denenip ELENEN açıklamalar (dosyada iz bırakmasınlar diye yazılıyor):
 * animasyon yarışı · nav maskesi · alt piksel metin konumlandırma ·
 * `--update` ile karşılaştırma turunun CPU profili farkı · 1px kayma
 * toleransı. Hiçbiri bu kareyi düzeltmedi; ölçüm düzeltti.
 */
{
  const isinma = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const sayfa = await isinma.newPage();
  await sayfa.goto(BASE + ROUTES[0], { waitUntil: "networkidle" });
  await sayfa.waitForTimeout(1200);
  await isinma.close();
}

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
    // ÖNCE animasyonları bitir (yarışı kapatır), SONRA yeni doğacakları dondur.
    await page.waitForTimeout(300);
    await animasyonlariOturt(page);
    // Kalan her hareketi dondur — aksi halde kare kare fark oluşur.
    await page.addStyleTag({
      content: `*, *::before, *::after {
        animation-duration: 0s !important;
        animation-delay: 0s !important;
        transition-duration: 0s !important;
        transition-delay: 0s !important;
        caret-color: transparent !important;
      }
      /* NAV KAREDEN ÇIKARILIYOR — maskelemek yetmedi, gerekçe aşağıda. */
      header { display: none !important; }
`,
    });
    await page.waitForTimeout(1200);

    const taban = `${route === "/" ? "home" : route.replace(/\//g, "_").replace(/^_/, "")}__${vpLabel}`;

    /* İKİ KARE: sayfa BAŞI ve SON İÇERİK EKRANI.

       BİRİNCİ HATA (düzeltilmişti): kapı yalnız ilk ekranı çekiyordu, yani
       ekran altındaki hiçbir değişikliği görmüyordu.

       İKİNCİ HATA (bu turda ölçüldü): düzeltme olarak eklenen "sayfa sonu"
       karesi `scrollTo(scrollHeight)` ile alınıyordu ve o noktada ekranda
       NEREDEYSE YALNIZ FOOTER kalıyor — footer çoğu viewport'ta bir ekrandan
       uzun. Footer da her rotada aynı olduğu için o kare hiçbir şey ölçmüyordu.
       Kanıt: alt sayfaların kapanış bandı baştan aşağı değiştiği (168px dikiş
       silindi, üst boşluk +80px) hâlde kapı o karelerde %0,000 dedi; buna
       karşılık hiç dokunulmayan ana sayfanın aynı karesi %0,517 fark verdi,
       çünkü kaydırma noktası sayfa yüksekliğine bağlıydı ve metin 1px kayıyordu.
       Yani kare hem KÖR hem KARARSIZDI.

       ŞİMDİ: ikinci kare belge yüksekliğine değil FOOTER ÖGESİNE sabitleniyor —
       footer'ın üstü viewport'un altına park ediliyor. Kare böylece sayfanın son
       içerik ekranını gösterir (kapanış bandı dâhil) ve konumu sayfa
       yüksekliğinden bağımsızdır.

       KAPSAM UYARISI: footer pikselleri artık bu kapıda DEĞİL. Bilerek — footer
       sekiz rotada birebir aynı, sekiz kez ölçmenin bilgi değeri yok ve varlığı
       e2e / keyboard / links / a11y kapılarında zaten doğrulanıyor. Ama şu
       açıkça bilinsin: footer'ın GÖRÜNÜMÜNÜ değiştiren biri bu kapıdan geçer. */
    const kareler = [
      [`${taban}.png`, false],
      [`${taban}__kapanis.png`, true],
    ];

    /* ÖNCE HEPSİNİ ÇEK, SONRA KARŞILAŞTIR — ve bu bir üslup tercihi değil.
       Önce çekim ile karşılaştırma iç içeydi: bir kare çekiliyor, hemen PNG
       çözülüp pixelmatch koşuyor, sonra ikinci kare çekiliyordu. Bu, iki çekim
       arasına SAYFA YÜKLENDİKTEN SONRA GEÇEN SÜREYİ moda göre değiştiriyordu —
       `--update` turunda karşılaştırma yok, yani ikinci kare erken çekiliyor;
       karşılaştırma turunda pixelmatch'in CPU'su araya saniyeler koyuyor.
       Ölçüldü: ana sayfanın kapanış kareleri iki ARDIŞIK karşılaştırma turunda
       AYNI yüzdelerle patladı — %2,179 / %0,667 / %0,538. Aynı yüzdenin
       tekrarlaması kararsızlık değil, iki KARARLI ama FARKLI durumdur; yani
       referans ile karşılaştırma farklı anlarda çekiliyordu.
       Çekim ayrılınca her iki mod da aynı zaman çizgisini izler. */
    const cekimler = [];
    for (const [name, kapanis] of kareler) {
      if (kapanis) {
        /* İKİ KEZ PARK EDİLİYOR: yükseklik geç oturursa (font/görsel yerleşmesi)
           ilk hesap kayar; ikincisi oturmuş yerleşimle yapılır. */
        const park = () =>
          page.evaluate(() => {
            const f = document.querySelector("footer");
            const hedef = f
              ? f.getBoundingClientRect().top + window.scrollY - window.innerHeight
              : document.body.scrollHeight;
            window.scrollTo(0, Math.max(0, Math.round(hedef)));
          });
        await park();
        await page.waitForTimeout(500);
        await park();
        await page.waitForTimeout(700);
        // Kaydırmak yeni animasyon doğurur (reveal-sections, nav gizle/göster).
        await animasyonlariOturt(page);
        await page.waitForTimeout(200);
      }
      const basePath = path.join(BASELINE, name);
      /* NAV MASKELENMİYOR, GİZLENİYOR.
         Önce Playwright `mask` ile üzeri siyaha boyanıyordu. Maske ögenin O
         ANKİ sınır kutusuna çizilir; `motion.header` ise `fixed` ve konumu JS
         ile sürülüyor. Sonuç ölçüldü — üründe hiçbir değişiklik yokken, aynı
         derlemede iki ardışık koşu arasında:
           home__1440x900   %12,661   home__768x1024  %10,753
           programlar__1440x900 %12,956
         ve farkın TAMAMI 116px'lik üst bant, yani maskenin kendisiydi: bir
         koşuda nav görünür kutuya, ötekinde gizli kutuya oturuyordu.
         (Animasyonları `finish()` ile bitirmek bunu ÇÖZMEDİ; hatta uçuşan bir
         "gizle" animasyonunu bitirmek nav'ı bazen gizli son karesine götürüyor.)
         `display: none` konumdan bağımsızdır ve nav `fixed` olduğu için
         yerleşimi kaydırmaz — altındaki hero pikselleri deterministik.
         Kapsam: nav'ın görünümü bu kapıda YOK. Maskeliyken de yoktu; varlığı ve
         odak sırası qa/e2e.mjs ile qa/keyboard.mjs kapılarında doğrulanıyor. */
      cekimler.push([name, basePath, await page.screenshot({ fullPage: false })]);
    }

    for (const [name, basePath, shot] of cekimler) {
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
      let en = farkOrani(a, b, 0);
      let kaydi = 0;
      // ±1px yalnız GEREKİRSE denenir: sağlam kareler ek CPU ödemesin.
      if (en.oran > THRESHOLD_RATIO) {
        for (const dy of [-1, 1]) {
          const aday = farkOrani(a, b, dy);
          if (aday.oran < en.oran) {
            en = aday;
            kaydi = dy;
          }
        }
      }
      const ratio = en.oran;
      const not = kaydi ? ` [${kaydi > 0 ? "+" : ""}${kaydi}px hizalandi]` : "";
      if (ratio > THRESHOLD_RATIO) {
        failures++;
        fs.writeFileSync(path.join(DIFF, name), PNG.sync.write(en.diff));
        console.log(`HATA  ${name} degisen piksel %${(ratio * 100).toFixed(3)} (esik %${(THRESHOLD_RATIO * 100).toFixed(3)})${not} -> qa/visual/diff/${name}`);
      } else {
        console.log(`OK    ${name} degisen piksel %${(ratio * 100).toFixed(3)}${not}`);
      }
    }
  }
  await ctx.close();
}

await browser.close();
if (created) console.log(`\n${created} baseline olusturuldu (ilk calistirma veya --update).`);
// Kapsam açıkça yazılıyor: rota başına İKİ kare — sayfa başı + SON İÇERİK
// ekranı (footer ögesine sabitli). Footer'ın kendi pikselleri kapsam dışı;
// gerekçe ve bu kararın riski yukarıdaki kare tanımının yanında yazılı.
console.log(
  `\n${VIEWPORTS.length} viewport x ${ROUTES.length} rota x 2 kare (bas + kapanis; footer kapsam disi) — gorsel regresyon sorunu: ${failures}`,
);
// Baseline yoksa bu bir KARŞILAŞTIRMA değildir; "PASS" demek yanıltıcı olur.
// Daha önce baseline'ı olmayan kareler sessizce üretilip kapı yeşil görünüyordu.
if (created > 0 && !UPDATE) {
  console.log(
    `
BASELINE MISSING — ${created} kare ilk kez üretildi, karşılaştırma YAPILMADI.
` +
      `Bu koşu bir regresyon kapısı değildir. Kareleri gözle onayladıktan sonra tekrar
` +
      `çalıştırın; ikinci koşu gerçek karşılaştırmadır.`,
  );
  process.exit(2);
}
process.exit(failures > 0 ? 1 : 0);
