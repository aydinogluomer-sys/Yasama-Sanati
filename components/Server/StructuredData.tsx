/**
 * JSON-LD structured data.
 *
 * Kural: yalnızca **doğrulanmış** ürün gerçeği yayınlanır (PRODUCT.md). Bu yüzden burada
 * fiyat/`offers` yok (fiyatlar teyit edilmedi — D042), yalnızca IECCERT akreditasyon iddiası
 * geçer (Meridyen Terapi), ve FAQ şeması sadece sayfada **görünen** soruları taşır.
 * Kayıtlı ticaret unvanı ve adres henüz belirlenmediği için Organization'da yer almıyor.
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
