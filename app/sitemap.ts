import type { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/utils/blogData";

const SITE_URL = "https://yasamasanati.com";

/**
 * Statik rotalar — her birinin kendi `page.tsx`'i var.
 *
 * `lastModified` neden sabit: eskiden burada `new Date()` vardı ve her build'de
 * TÜM rotalar "az önce güncellendi" gibi görünüyordu. Bu, tarama bütçesi açısından
 * gürültüdür ve arama motoruna yalan sinyal verir. İçerik gerçekten değiştiğinde
 * bu tarih elle güncellenmelidir.
 */
const CONTENT_REVISION = "2026-08-22";

const ROUTES: { path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }[] = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/programlar", changeFrequency: "monthly", priority: 0.9 },
  { path: "/programlar/nefes-koclugu", changeFrequency: "monthly", priority: 0.8 },
  { path: "/programlar/reiki", changeFrequency: "monthly", priority: 0.8 },
  { path: "/programlar/meridyen-terapi", changeFrequency: "monthly", priority: 0.8 },
  { path: "/programlar/mucizeler-kursu", changeFrequency: "monthly", priority: 0.8 },
  { path: "/programlar/hipnoterapi", changeFrequency: "monthly", priority: 0.8 },
  { path: "/programlar/yasam-kocu", changeFrequency: "monthly", priority: 0.8 },
  { path: "/on-gorusme", changeFrequency: "monthly", priority: 0.9 },
  { path: "/egitmenler", changeFrequency: "monthly", priority: 0.7 },
  { path: "/the-story", changeFrequency: "yearly", priority: 0.6 },
  { path: "/sss", changeFrequency: "monthly", priority: 0.6 },
  { path: "/community", changeFrequency: "monthly", priority: 0.5 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.6 },
  { path: "/kvkk", changeFrequency: "yearly", priority: 0.2 },
  { path: "/privacy-terms", changeFrequency: "yearly", priority: 0.2 },
];

const TR_MONTHS: Record<string, number> = {
  ocak: 0, şubat: 1, mart: 2, nisan: 3, mayıs: 4, haziran: 5,
  temmuz: 6, ağustos: 7, eylül: 8, ekim: 9, kasım: 10, aralık: 11,
};

/**
 * `blogData.ts` tarihleri "24 Mayıs 2026" biçiminde Türkçe metin. Sitemap ISO
 * tarih ister. Ayrıştırılamayan bir tarih olursa o yazı tarihsiz yayınlanır —
 * uydurma tarih vermektense alanı boş bırakmak doğru.
 */
function parseTurkishDate(value: string): Date | undefined {
  const m = value.trim().toLowerCase().match(/^(\d{1,2})\s+(\S+)\s+(\d{4})$/);
  if (!m) return undefined;
  const month = TR_MONTHS[m[2]];
  if (month === undefined) return undefined;
  const d = new Date(Date.UTC(Number(m[3]), month, Number(m[1])));
  return Number.isNaN(d.getTime()) ? undefined : d;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const revision = new Date(CONTENT_REVISION);

  const staticEntries = ROUTES.map(({ path, changeFrequency, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: revision,
    changeFrequency,
    priority,
  }));

  // Blog yazıları artık dışarıda değil: veri kaynağı repoda (`utils/blogData.ts`)
  // ve `generateStaticParams` bu slug'ların hepsini zaten prerender ediyor.
  const blogEntries = BLOG_POSTS.map((post) => {
    const published = parseTurkishDate(post.date);
    return {
      url: `${SITE_URL}/blog/${post.slug}`,
      ...(published ? { lastModified: published } : {}),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    };
  });

  return [...staticEntries, ...blogEntries];
}
