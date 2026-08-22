/**
 * JSON-LD structured data.
 *
 * Kural: yalnızca **doğrulanmış** ürün gerçeği yayınlanır (PRODUCT.md).
 *
 * Bilerek DIŞARIDA bırakılanlar ve nedenleri:
 *  • `offers` / fiyat — fiyatlar teyit edilmedi (D042). Uydurma fiyat schema'da
 *    yalan beyandır ve zengin sonuçta görünür.
 *  • Kayıtlı ticaret unvanı, sokak adresi, vergi/sicil bilgisi — hukuki bilgi,
 *    kullanıcıdan doğrulanmış olarak gelmeli.
 *  • `sameAs` — akademinin doğrulanmış sosyal profil URL'i yok. WhatsApp bir
 *    profil URL'i değildir.
 *  • `Person` (eğitmen) şeması — eğitmenlerin bu akademiyle bağı repodan
 *    doğrulanamıyor; doğrulanmadan Person yayınlanmaz.
 *  • Article'da `author` — blog yazar kimlikleri şu an doğrulanmış değil
 *    (FINAL-VERIFICATION J-08), bu yüzden yazar alanı yayınlanmıyor.
 *
 * İÇERİDE olan ve neden meşru: `addressLocality: "İzmir"` — markanın kendi
 * konum beyanı ("Online ve İzmir'de") ile birebir aynı; sokak adresi değil,
 * hizmet verilen şehir. (Bu dosyanın eski başlığı "adres yer almıyor" diyordu
 * ama kod adresi yayınlıyordu; çelişki giderildi.)
 *
 * Akreditasyon: yalnızca IECCERT ve yalnızca Meridyen Terapi için — PRODUCT.md'nin
 * tek doğrulanmış akreditasyon gerçeği budur.
 */

const SITE = "https://yasamasanati.com";

function Ld({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // İçerik sabit ve bu dosyada üretiliyor; kullanıcı girdisi taşımıyor.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationSchema() {
  return (
    <Ld
      data={{
        "@context": "https://schema.org",
        "@type": "EducationalOrganization",
        name: "Yaşama Sanatı",
        alternateName: "Yaşama Sanatı Akademisi",
        url: SITE,
        description:
          "Beden, zihin ve enerji disiplinlerini tek bir eğitim yolunda buluşturan bütünsel şifa ve eğitim akademisi.",
        email: "info@yasamasanati.com",
        telephone: "+90 532 789 37 53",
        areaServed: "TR",
        address: {
          "@type": "PostalAddress",
          addressLocality: "İzmir",
          addressCountry: "TR",
        },
      }}
    />
  );
}

export function CourseSchema({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return (
    <Ld
      data={{
        "@context": "https://schema.org",
        "@type": "Course",
        name,
        description,
        url: `${SITE}${path}`,
        inLanguage: "tr",
        provider: {
          "@type": "EducationalOrganization",
          name: "Yaşama Sanatı",
          url: SITE,
        },
      }}
    />
  );
}

export function FaqSchema({ items }: { items: { q: string; a: string }[] }) {
  return (
    <Ld
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map(({ q, a }) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
      }}
    />
  );
}

/**
 * Breadcrumb. Arama sonucunda site hiyerarşisini gösterir ve kullanıcıya
 * sayfanın nereye ait olduğunu söyler. `items` sırası kök -> yaprak.
 */
export function BreadcrumbSchema({ items }: { items: { name: string; path: string }[] }) {
  return (
    <Ld
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((it, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: it.name,
          item: `${SITE}${it.path}`,
        })),
      }}
    />
  );
}

/**
 * Blog yazısı. `author` bilerek yok — bkz. dosya başlığı ve
 * FINAL-VERIFICATION J-08. Yayıncı olarak akademi verilir; bu doğrulanmış.
 */
export function ArticleSchema({
  headline,
  description,
  path,
  datePublished,
  image,
}: {
  headline: string;
  description: string;
  path: string;
  datePublished?: string;
  image?: string;
}) {
  return (
    <Ld
      data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline,
        description,
        url: `${SITE}${path}`,
        mainEntityOfPage: `${SITE}${path}`,
        inLanguage: "tr",
        ...(datePublished ? { datePublished } : {}),
        ...(image ? { image } : {}),
        publisher: {
          "@type": "EducationalOrganization",
          name: "Yaşama Sanatı",
          url: SITE,
        },
      }}
    />
  );
}
