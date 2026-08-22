/**
 * İç bağlantı denetimi (FINAL-VERIFICATION C-05).
 *
 * Tüm rotaları gezer, her <a href> toplar, iç bağlantıların hepsine HEAD/GET
 * atar. 404/500 dönen tek bir iç bağlantı bile kapıyı kapatır. Silinen şablon
 * rotalarına (careers, destinations, innovation, press, sustainability,
 * wellness, new-developments) kalıntı link olmadığını da ayrıca doğrular.
 *
 * Dış bağlantılar raporlanır ama ağ kırılganlığı yüzünden kapıyı kapatmaz.
 */
import { chromium } from "playwright";
import { ROUTES } from "./routes.mjs";

const BASE = process.argv[2] || "http://127.0.0.1:3400";
const CHANNEL = process.env.PW_CHANNEL ?? "chrome";
const DELETED = ["careers", "destinations", "innovation", "press", "sustainability", "wellness", "new-developments"];

const browser = await chromium.launch(CHANNEL === "chromium" ? {} : { channel: CHANNEL });
const page = await (await browser.newContext()).newPage();

const internal = new Map(); // href -> [bulunduğu rotalar]
const external = new Set();

for (const route of ROUTES) {
  await page.goto(BASE + route, { waitUntil: "networkidle" });
  // Menü içindeki bağlantılar da sayılsın diye mobil menüyü açmayı dene.
  const hrefs = await page.evaluate(() =>
    [...document.querySelectorAll("a[href]")].map((a) => a.getAttribute("href")),
  );
  for (const h of hrefs) {
    if (!h || h.startsWith("#") || h.startsWith("mailto:") || h.startsWith("tel:")) continue;
    // Host'a bak, ham metne değil: paylaş linkleri (twitter/intent, wa.me/send)
    // hedef adresi query string'de taşıdığı için substring kontrolü onları
    // yanlışlıkla iç bağlantı sayıyordu.
    if (/^https?:\/\//i.test(h)) {
      let host = "";
      try { host = new URL(h).hostname.replace(/^www\./, ""); } catch { external.add(h); continue; }
      if (host !== "yasamasanati.com") { external.add(h); continue; }
    }
    const path = h.replace(/^https?:\/\/[^/]+/i, "").split("#")[0] || "/";
    if (!path.startsWith("/")) continue;
    if (!internal.has(path)) internal.set(path, []);
    if (!internal.get(path).includes(route)) internal.get(path).push(route);
  }
}
await browser.close();

let failures = 0;
console.log(`toplanan benzersiz ic baglanti: ${internal.size}\n`);
const broken = [];
for (const [path, from] of [...internal].sort()) {
  const r = await fetch(BASE + path, { redirect: "follow" });
  if (r.status >= 400) {
    broken.push([path, r.status, from]);
    failures++;
  }
}
if (broken.length) {
  console.log("KIRIK IC BAGLANTILAR:");
  for (const [p, s, from] of broken) console.log(`  ${s}  ${p}   <- ${from.slice(0, 3).join(", ")}`);
} else {
  console.log("OK    kirik ic baglanti yok");
}

const residue = [...internal.keys()].filter((p) => DELETED.some((d) => p === `/${d}` || p.startsWith(`/${d}/`)));
if (residue.length) {
  failures += residue.length;
  console.log(`\nHATA  silinen sablon rotalarina kalinti link: ${residue.join(", ")}`);
} else {
  console.log("OK    silinen sablon rotalarina kalinti link yok");
}

console.log(`\ndis baglanti (kapiyi kapatmaz): ${external.size}`);
for (const e of [...external].slice(0, 6)) console.log(`  ${e.slice(0, 78)}`);
console.log(`\nsorun: ${failures}`);
process.exit(failures > 0 ? 1 : 0);
