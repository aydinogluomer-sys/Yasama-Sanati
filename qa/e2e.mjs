/**
 * E2E smoke (FINAL-VERIFICATION C-04).
 *
 * Her rotada yapısal sözleşmeyi doğrular: sayfa 200 dönüyor mu, tek bir <main>
 * landmark'ı ve tek bir <h1> var mı, nav ve footer duruyor mu, sayfanın kritik
 * CTA'sı erişilebilir mi. Konsol hatası ve hydration uyarısı da toplanır.
 *
 * PW_BROWSER=chromium|firefox|webkit ile motor seçilir (varsayılan chromium/chrome).
 */
import { chromium, firefox, webkit } from "playwright";
import { ROUTES } from "./routes.mjs";

const BASE = process.argv[2] || "http://127.0.0.1:3400";
const ENGINE = process.env.PW_BROWSER ?? "chromium";
const CHANNEL = process.env.PW_CHANNEL ?? (ENGINE === "chromium" ? "chrome" : undefined);
const launcher = { chromium, firefox, webkit }[ENGINE];
if (!launcher) throw new Error(`Bilinmeyen PW_BROWSER: ${ENGINE}`);

const browser = await launcher.launch(CHANNEL ? { channel: CHANNEL } : {});
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();

let failures = 0;
const say = (ok, route, msg) => {
  if (!ok) failures++;
  if (!ok) console.log(`  HATA  ${route} — ${msg}`);
};

console.log(`motor: ${ENGINE}${CHANNEL ? " (" + CHANNEL + ")" : ""}\n`);

for (const route of ROUTES) {
  const errs = [];
  const onConsole = (m) => {
    const t = m.text();
    // Uzak görsel/analytics gibi dış kaynaklı 4xx'ler bu kapının konusu değil;
    // onları qa/images.mjs ölçüyor.
    if (m.type() === "error" || /hydrat/i.test(t)) errs.push(t.slice(0, 100));
  };
  page.on("console", onConsole);
  const onPageError = (e) => errs.push("PAGEERROR: " + e.message.slice(0, 90));
  page.on("pageerror", onPageError);

  const resp = await page.goto(BASE + route, { waitUntil: "networkidle" });
  await page.waitForTimeout(400);

  const m = await page.evaluate(() => ({
    status: document.readyState,
    mains: document.querySelectorAll("main").length,
    h1s: [...document.querySelectorAll("h1")].map((h) => (h.textContent || "").trim().slice(0, 40)),
    nav: !!document.querySelector("nav, header"),
    footer: !!document.querySelector("footer"),
    title: document.title,
    // Sayfadan çıkışı sağlayan birincil eylem. /on-gorusme çok adımlı bir form
    // olduğu için submit düğmesi ilk adımda DOM'da yok; <form> varlığı da
    // birincil eylem sayılır.
    ctas:
      document.querySelectorAll(
        'a[href*="on-gorusme"], a[href*="#on-kayit"], button[type="submit"]',
      ).length + (document.querySelector("form") ? 1 : 0),
  }));

  page.off("console", onConsole);
  page.off("pageerror", onPageError);

  const ok = resp?.status();
  say(ok === 200, route, `HTTP ${ok}`);
  say(m.mains === 1, route, `<main> sayisi ${m.mains} (1 olmali)`);
  say(m.h1s.length === 1, route, `<h1> sayisi ${m.h1s.length} (1 olmali) -> ${m.h1s.join(" | ")}`);
  say(m.nav, route, "nav/header yok");
  say(m.footer, route, "footer yok");
  say(!!m.title && m.title.length > 5, route, `<title> zayif: "${m.title}"`);
  say(m.ctas > 0, route, "sayfada birincil CTA yok");
  const uniq = [...new Set(errs)];
  say(uniq.length === 0, route, `konsol/hydration hatasi: ${uniq[0] ?? ""}`);

  if (ok === 200 && m.mains === 1 && m.h1s.length === 1 && m.nav && m.footer && m.ctas > 0 && uniq.length === 0) {
    console.log(`OK    ${route.padEnd(46)} h1="${m.h1s[0]}"  cta=${m.ctas}`);
  }
}

await browser.close();
console.log(`\n${ROUTES.length} rota × ${ENGINE} — sorun: ${failures}`);
process.exit(failures > 0 ? 1 : 0);
