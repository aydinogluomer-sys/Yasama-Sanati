/**
 * SEO doğrulama kapısı (FINAL-VERIFICATION H bölümü).
 *
 * Kontroller:
 *  1. sitemap.xml ayrıştırılabiliyor, tüm <loc> mutlak ve 200 dönüyor
 *  2. sitemap'teki rota sayısı uygulamadaki rota sayısıyla tutarlı
 *  3. robots.txt ayrıştırılabiliyor ve sitemap'i işaret ediyor
 *  4. her rotada tek bir <title>, bir meta description ve bir canonical var
 *  5. canonical mutlak ve sayfanın kendi adresini gösteriyor
 *  6. her JSON-LD bloğu geçerli JSON ve @context/@type taşıyor
 */
import { ROUTES } from "./routes.mjs";

const BASE = process.argv[2] || "http://127.0.0.1:3400";
const SITE = "https://yasamasanati.com";
let fail = 0;
const say = (ok, msg) => {
  if (!ok) fail++;
  console.log(`  ${ok ? "OK   " : "HATA "} ${msg}`);
};

const text = async (p) => (await fetch(BASE + p)).text();

// ---------- sitemap ----------
console.log("\n— sitemap.xml —");
const xml = await text("/sitemap.xml");
const locs = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1].trim());
say(locs.length > 0, `ayristirilabiliyor, ${locs.length} <loc>`);
say(
  locs.every((l) => l.startsWith("https://")),
  `tum loc'lar mutlak`,
);

const badStatus = [];
for (const loc of locs) {
  const path = loc.replace(SITE, "") || "/";
  const r = await fetch(BASE + path, { redirect: "follow" });
  if (r.status !== 200) badStatus.push(`${r.status} ${path}`);
}
say(badStatus.length === 0, `sitemap'teki tum adresler 200 ${badStatus.length ? "-> " + badStatus.slice(0, 3).join(", ") : ""}`);

// Uygulamadaki rotalar sitemap'te var mı? (blog detayları hariç tutulmaz —
// routes.mjs örnek bir blog yazısı taşır, o da sitemap'te olmalı.)
const inSitemap = new Set(locs.map((l) => l.replace(SITE, "") || "/"));
const missing = ROUTES.filter((r) => !inSitemap.has(r));
say(missing.length === 0, `uygulamadaki rotalar sitemap'te ${missing.length ? "-> eksik: " + missing.join(", ") : ""}`);

const dupes = locs.filter((l, i) => locs.indexOf(l) !== i);
say(dupes.length === 0, `sitemap'te tekrar eden adres yok ${dupes.length ? "-> " + dupes[0] : ""}`);

// ---------- robots ----------
console.log("\n— robots.txt —");
const robots = await text("/robots.txt");
say(/user-?agent/i.test(robots), `User-agent satiri var`);
say(robots.includes("/sitemap.xml"), `sitemap'i isaret ediyor`);

// ---------- sayfa metadata + JSON-LD ----------
console.log("\n— rota metadata ve JSON-LD —");
for (const route of ROUTES) {
  const html = await text(route);
  const titles = [...html.matchAll(/<title[^>]*>(.*?)<\/title>/gs)].map((m) => m[1]);
  const desc = [...html.matchAll(/<meta name="description" content="(.*?)"/gs)].map((m) => m[1]);
  const canon = [...html.matchAll(/<link rel="canonical" href="(.*?)"/gs)].map((m) => m[1]);

  const problems = [];
  if (titles.length !== 1) problems.push(`title x${titles.length}`);
  else if (titles[0].trim().length < 8) problems.push(`title cok kisa`);
  if (desc.length !== 1) problems.push(`description x${desc.length}`);
  if (canon.length !== 1) problems.push(`canonical x${canon.length}`);
  else {
    const expected = `${SITE}${route === "/" ? "" : route}`;
    if (canon[0] !== expected && canon[0] !== expected + "/") {
      problems.push(`canonical uyusmuyor: ${canon[0]}`);
    }
  }

  const blocks = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)].map((m) => m[1]);
  const types = [];
  for (const b of blocks) {
    try {
      const j = JSON.parse(b.replace(/&quot;/g, '"'));
      if (!j["@context"] || !j["@type"]) problems.push("JSON-LD @context/@type eksik");
      types.push(j["@type"]);
    } catch {
      problems.push("JSON-LD gecersiz JSON");
    }
  }

  say(problems.length === 0, `${route.padEnd(46)} ld:[${types.join(",") || "-"}] ${problems.join(" · ")}`);
}

console.log(`\nsorun: ${fail}`);
process.exit(fail > 0 ? 1 : 0);
