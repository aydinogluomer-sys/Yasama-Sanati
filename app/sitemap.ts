import type { MetadataRoute } from "next";

const SITE_URL = "https://yasamasanati.com";

/**
 * Static routes confirmed present in the app (each has its own `page.tsx`).
 * Dynamic content routes (e.g. blog/[slug]) are intentionally omitted here to
 * avoid inventing content; they can be enumerated later from their data source.
 */
const ROUTES = [
  "",
  "/the-story",
  "/egitmenler",
  "/programlar",
  "/programlar/nefes-koclugu",
  "/programlar/reiki",
  "/programlar/meridyen-terapi",
  "/programlar/mucizeler-kursu",
  "/programlar/hipnoterapi",
  "/programlar/yasam-kocu",
  "/wellness",
  "/innovation",
  "/sustainability",
  "/community",
  "/destinations",
  "/new-developments",
  "/press",
  "/careers",
  "/blog",
  "/sss",
  "/kvkk",
  "/privacy-terms",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ROUTES.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.6,
  }));
}
