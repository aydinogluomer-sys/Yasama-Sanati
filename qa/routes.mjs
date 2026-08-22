/**
 * Uygulamanın TÜM rotaları — QA scriptlerinin ortak kaynağı.
 *
 * ELLE YAZILMIYOR. Daha önce burada elle tutulan bir liste vardı ve iki kez aynı
 * sınıf hataya yol açtı:
 *   • `/blog` listede yoktu → blog görsellerinin kırıldığı regresyon kaçtı
 *   • 5 blog yazısından yalnız 1'i listedeydi → diğer 4'ü hiç test edilmedi
 *
 * Artık iki kaynaktan türetiliyor:
 *   1. `app/**\/page.tsx` dosya sistemi taraması → statik rotalar
 *   2. `utils/blogData.ts` içindeki `slug:` alanları → dinamik blog rotaları
 *
 * Böylece yeni bir sayfa veya blog yazısı eklendiğinde QA kapsamı kendiliğinden
 * genişler; kimsenin listeyi güncellemeyi hatırlaması gerekmez.
 *
 * Next internals'ına bağlı kırılgan bir parser yazılmadı: yalnız klasör adları ve
 * `slug: "..."` deseni okunuyor.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const APP = path.join(HERE, "..", "app");

/** app dizinini gezip `page.tsx` taşıyan segmentleri rotaya çevirir. */
function discoverStaticRoutes(dir = APP, segments = []) {
  const out = [];
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return out;
  }

  if (entries.some((e) => e.isFile() && /^page\.(tsx|ts|jsx|js)$/.test(e.name))) {
    // Dinamik segment ([slug]) içeren rotalar burada üretilmez; onlar veri
    // kaynağından gelir.
    if (!segments.some((s) => s.startsWith("["))) {
      out.push("/" + segments.join("/"));
    }
  }

  for (const e of entries) {
    if (!e.isDirectory()) continue;
    // route group `(pazarlama)` ve özel klasörler segment üretmez
    if (e.name.startsWith("_") || e.name.startsWith(".")) continue;
    const isGroup = e.name.startsWith("(") && e.name.endsWith(")");
    out.push(
      ...discoverStaticRoutes(
        path.join(dir, e.name),
        isGroup ? segments : [...segments, e.name],
      ),
    );
  }
  return out;
}

/** blogData.ts içindeki slug alanlarını okur. */
function discoverBlogRoutes() {
  const file = path.join(HERE, "..", "utils", "blogData.ts");
  let src = "";
  try {
    src = fs.readFileSync(file, "utf8");
  } catch {
    return [];
  }
  const slugs = [...src.matchAll(/^\s*slug:\s*"([^"]+)"/gm)].map((m) => m[1]);
  return [...new Set(slugs)].map((s) => `/blog/${s}`);
}

const staticRoutes = discoverStaticRoutes()
  .map((r) => (r === "/" ? "/" : r.replace(/\/$/, "")))
  .filter((r) => r !== "");

export const STATIC_ROUTES = [...new Set(["/", ...staticRoutes])].sort((a, b) =>
  a === "/" ? -1 : b === "/" ? 1 : a.localeCompare(b),
);

export const BLOG_ROUTES = discoverBlogRoutes();

export const ROUTES = [...STATIC_ROUTES, ...BLOG_ROUTES];

// Keşfin sessizce boşalmasına karşı emniyet: bir refactor app/ yapısını
// değiştirirse testler "0 rota, 0 sorun" diye yeşil görünmemeli.
if (ROUTES.length < 10) {
  throw new Error(
    `qa/routes.mjs: yalnız ${ROUTES.length} rota bulundu — keşif bozulmuş olabilir.`,
  );
}
