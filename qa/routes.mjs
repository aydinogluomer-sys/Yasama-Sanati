/**
 * Uygulamanın TÜM rotaları — QA scriptlerinin ortak kaynağı.
 *
 * Neden tek dosya: rota listeleri script'lere dağıtılmıştı ve `/blog`
 * viewport kapısının listesinde yoktu; kırık görsel regresyonu bu boşluktan
 * geçti. Yeni bir `page.tsx` eklendiğinde buraya da eklenmelidir.
 */
export const ROUTES = [
  "/",
  "/the-story",
  "/egitmenler",
  "/programlar",
  "/programlar/nefes-koclugu",
  "/programlar/reiki",
  "/programlar/meridyen-terapi",
  "/programlar/mucizeler-kursu",
  "/programlar/hipnoterapi",
  "/programlar/yasam-kocu",
  "/community",
  "/blog",
  "/blog/sifa-bir-teknik-degildir-butunsel-saglik",
  "/sss",
  "/on-gorusme",
  "/kvkk",
  "/privacy-terms",
];
