/**
 * Marka seçim rengi üç motorda da GERÇEKTEN uygulanıyor mu — pikselden okur.
 *
 * NEDEN AYRI BİR KAPI VAR
 * `::selection` sessiz kırılan bir yüzeydir: kural uygulanmazsa konsola bir şey
 * yazılmaz, derleme geçer, erişilebilirlik taraması görmez; yalnız marka
 * detayı kaybolur. Üstelik motorlar arasında davranış farkı var.
 *
 * ÖLÇÜT — TAM RENK DEĞİL, KAYMA.
 * İlk sürüm seçim zemininin tam krem (#ced1bf) olmasını bekliyordu ve WebKit'te
 * %0 okuyup "Safari'de seçim rengi hiç çalışmıyor" gibi YANLIŞ bir sonuca
 * götürdü. Gerçek şu: WebKit highlight'ı ~%48 alfayla harmanlıyor, yani doğru
 * çalışırken bile tam renk hiç çıkmıyor.
 *
 *     webkit  seçimsiz 45,55,50  ->  seçili 122,129,109   (doğru davranış)
 *     chromium seçimsiz 45,55,50 ->  seçili 205,208,191   (tam renk)
 *
 * Bu yüzden ölçülen şey: seçili hâlin baskın rengi, seçimsiz hâle göre KREME
 * DOĞRU anlamlı biçimde kaydı mı. Tanımsız bir token'la yapılan kontrol
 * denemesinde kayma 0 çıkıyor, yani ölçüm gerçek başarısızlığı yakalıyor.
 *
 * `getComputedStyle(el, "::selection")` KULLANILMIYOR: tarayıcılar çoğu zaman
 * elemanın kendi stilini döndürür.
 */
import { chromium, firefox, webkit } from "playwright";
import { PNG } from "pngjs";

const BASE = process.argv[2] || "http://127.0.0.1:3400";
const ENGINES = [
  ["chromium", chromium],
  ["firefox", firefox],
  ["webkit", webkit],
];

// --color-cream = #ced1bf
const KREM = [206, 209, 191];
// Kayma bu eşiğin altındaysa seçim rengi uygulanmıyor demektir. Ölçülen
// değerler 120+ bandında; tanımsız token kontrolünde 0.
const MIN_KAYMA = 40;

/** Kırpılmış karenin en sık görülen rengi. */
async function baskinRenk(p, secili) {
  const box = await p.evaluate((sec) => {
    const el = [...document.querySelectorAll("main p")].find(
      (e) => e.innerText.trim().length > 60,
    );
    if (!el) return null;
    el.scrollIntoView({ block: "center" });
    const s = window.getSelection();
    s.removeAllRanges();
    if (sec) {
      const r = document.createRange();
      r.selectNodeContents(el);
      s.addRange(r);
    }
    const b = el.getBoundingClientRect();
    return {
      x: Math.round(b.x),
      y: Math.round(b.y),
      w: Math.round(b.width),
      h: Math.round(b.height),
      secili: (s.toString() || "").length,
    };
  }, secili);
  if (!box) return null;
  await p.waitForTimeout(350);
  const buf = await p.screenshot({
    clip: {
      x: box.x,
      y: box.y,
      width: Math.min(box.w, 600),
      height: Math.min(box.h, 100),
    },
  });
  const png = PNG.sync.read(buf);
  const say = new Map();
  for (let i = 0; i < png.data.length; i += 4) {
    const k = `${png.data[i]},${png.data[i + 1]},${png.data[i + 2]}`;
    say.set(k, (say.get(k) || 0) + 1);
  }
  const [k] = [...say.entries()].sort((a, b) => b[1] - a[1])[0];
  return { renk: k.split(",").map(Number), secili: box.secili };
}

let bad = 0;
for (const [ad, motor] of ENGINES) {
  const br = await motor.launch();
  const p = await br.newPage({ viewport: { width: 1280, height: 800 } });
  await p.goto(BASE + "/the-story", { waitUntil: "networkidle" });
  await p.waitForTimeout(1200);

  const yok = await baskinRenk(p, false);
  const var_ = await baskinRenk(p, true);

  if (!yok || !var_ || var_.secili < 20) {
    console.log(`${ad.padEnd(9)} secilebilir paragraf bulunamadi — ATLANDI`);
    await br.close();
    continue;
  }

  const kayma = Math.round(
    Math.hypot(
      var_.renk[0] - yok.renk[0],
      var_.renk[1] - yok.renk[1],
      var_.renk[2] - yok.renk[2],
    ),
  );
  // Kayma kreme DOĞRU mu? Seçili renk, seçimsiz renge kıyasla kreme yakınlaşmalı.
  const uzaklik = (c) => Math.hypot(c[0] - KREM[0], c[1] - KREM[1], c[2] - KREM[2]);
  const kremeYaklasti = uzaklik(var_.renk) < uzaklik(yok.renk);

  const ok = kayma >= MIN_KAYMA && kremeYaklasti;
  if (!ok) bad++;
  console.log(
    `${ad.padEnd(9)} ${yok.renk.join(",").padEnd(12)} -> ${var_.renk.join(",").padEnd(14)} kayma ${String(kayma).padStart(3)}  ${ok ? "GECER" : "KALIR <- secim rengi uygulanmiyor"}`,
  );
  await br.close();
}

console.log(`\n3 motor — secim rengi cozulmeyen: ${bad}`);
process.exit(bad ? 1 : 0);
