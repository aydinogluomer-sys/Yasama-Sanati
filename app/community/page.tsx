import type { Metadata } from "next";
import heroImage from "@/public/SideBar/topluluk.jpg";
import React from "react";
import SubPageLayout from "@/components/Server/SubPageLayout";
import SectionHeading from "@/components/Server/SectionHeading";

export const metadata: Metadata = {
  title: "Topluluk | Yaşama Sanatı",
  description:
    "Bütünsel esenlik buluşmaları, doğal yaşam ve farkındalık paylaşımları; Yaşama Sanatı topluluğuna katılın.",
  alternates: { canonical: "/community" },
  openGraph: {
    title: "Topluluk | Yaşama Sanatı",
    description:
      "Bütünsel esenlik buluşmaları, doğal yaşam ve farkındalık paylaşımları; Yaşama Sanatı topluluğuna katılın.",
    url: "/community",
  },
};

/**
 * Topluluğun dört alanı.
 *
 * Eskiden dört eş `bg-cream/5 rounded border` kutusuydu ve sayfanın tamamı
 * yedi aynı kutudan ibaretti (docs/AWWWARDS-90-BLOCKERS.md A9). Artık
 * numaralı editoryal akış: kutu yok, ince kural + mono indeks + serif başlık.
 */
const AREAS = [
  {
    title: "Bütünsel Esenlik Buluşmaları",
    body: "Fiziksel, zihinsel ve enerjetik bütünlüğü artırmak için özel olarak tasarlanmıştır. Sizinle benzer arayışlarda olan bireylerle derinlemesine bağlantı kurun.",
  },
  {
    title: "Doğal Yaşam ve Farkındalık",
    body: "Değerlerinizle uyumlu, sakinleştirici, doğayla dost ve farkındalık odaklı modern yaşam pratiklerini keşfedin.",
  },
  {
    title: "Özel İnzivalar",
    body: "Zihni sakinleştiren, yaşamı kolaylaştıran pratiklerin, bütünsel sağlık atölyelerinin ve grup inziva programlarının bir parçası olun.",
  },
  {
    title: "Bütünsel Şifa Paylaşımı",
    body: "Bilinçli yaşam, ortak meditasyonlar, şifa çemberleri ve destekleyici topluluk bağlarının mükemmel bir şekilde birleştiği güvenli bir alan.",
  },
];

const RITUALS = [
  {
    title: "Haftalık Paylaşım Çemberleri",
    body: "Her hafta belirli temalar etrafında toplanıyor; deneyimlerimizi, hislerimizi ve içsel yolculuklarımızı güvenli, yargısız bir alanda paylaşıyoruz. Nefes, meditasyon ve zihinsel dönüşüm yöntemlerini grup enerjisiyle uygulayarak bireysel farkındalığımızı kolektif olarak destekliyoruz.",
  },
  {
    title: "Topluluk İnzivaları",
    body: "Şehrin koşturmacasından uzaklaşarak doğanın kollarında gerçekleştirdiğimiz sessizlik inzivaları, meridyen dengeleme kampları ve yoğunlaştırılmış nefes günleri. Kendinizi doğanın akışına bırakarak, benzer vizyonu paylaşan dostlarla birlikte yenilenmenin en yalın halini tecrübe edin.",
  },
];

export default function CommunityPage() {
  return (
    <SubPageLayout
      heroImage={heroImage}
      heroImageAlt="Taş bir avluda halka olmuş, ortasında zeytin dalı bulunan bir paylaşım çemberi"
      title="Topluluk"
      description="Hayata, paylaşıma ve içimizdeki sınırsız potansiyele değer veren bütünsel bir topluluk"
    >
      {/* `mx-auto` yok: gövde hero başlığıyla AYNI sol eksende akıyor. */}
      <div className="max-w-wide space-y-32 md:space-y-40">
        <section className="space-y-10">
          <SectionHeading index="01" kicker="Davet" rule>
            Yaşama Sanatı Topluluğu&apos;na Katılın
          </SectionHeading>
          <p className="max-w-editorial text-body-lg font-light text-cream/80">
            Hayata, bağ kurmaya ve içimizdeki sınırsız potansiyele değer veren
            bütünsel bir topluluğun parçası olun. Birlikte, uyum ve dengeyle dolu
            bir geleceği şekillendiriyoruz. Topluluğumuzun bir parçası olarak,
            esenlik, derin farkındalık ve güçlü bağlarla dolu bir yaşama doğru
            ilk adımı atın.
          </p>

          <div className="grid grid-cols-1 gap-x-12 gap-y-14 pt-6 md:grid-cols-2">
            {AREAS.map((area, i) => (
              <div key={area.title} className="border-t border-cream/15 pt-6">
                <span className="font-mono text-3xs tracking-[0.2em] text-copper-text">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-serif text-display-s font-normal leading-[1.08] text-white">
                  {area.title}
                </h3>
                <p className="mt-4 text-base font-light leading-relaxed text-cream/78">
                  {area.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Asimetrik ritim: başlık solda dar sütunda, gövde sağda geniş sütunda.
            Sayfanın tekdüze iki sütunluk temposunu kıran tek yer burası. */}
        <section className="space-y-16">
          <SectionHeading index="02" kicker="Ritim" rule>
            Düzenli Buluşmalarımız
          </SectionHeading>
          {RITUALS.map((r) => (
            <div
              key={r.title}
              className="grid grid-cols-1 gap-x-12 gap-y-4 md:grid-cols-12"
            >
              <h3 className="font-serif text-24 font-normal leading-tight text-white md:col-span-4 md:text-28">
                {r.title}
              </h3>
              <p className="text-base font-light leading-relaxed text-cream/78 md:col-span-8 md:max-w-editorial">
                {r.body}
              </p>
            </div>
          ))}
        </section>

        <section className="space-y-8 pb-4">
          <SectionHeading index="03" kicker="Ses" rule>
            Yaşama Sanatı — Podcast
          </SectionHeading>
          <p className="max-w-editorial text-base font-light leading-relaxed text-cream/78">
            Zihinsel berraklık, fiziksel canlılık, bütünsel şifa, nefes koçluğu ve
            kadim felsefeler gibi çeşitli konulara değinen, esenliğe doğru
            yaptığımız sesli yolculuk serisi. Podcast yayınımızda akademimizin
            eğitmenleri ve alanında uzman konuklarla şifa pratiklerini, klinik
            yaklaşımları ve gündelik yaşam ipuçlarını konuşuyoruz.
          </p>
          {/* CTA kaldırıldı: "YouTube Kanalımızı Ziyaret Edin" düğmesi doğrulanmış bir
              kanal adresine değil, youtube.com ana sayfasına gidiyordu — sahip olunmayan
              bir kanalı varmış gibi gösteren bir vaat. Aynı ilke components/SVGComponents/
              socials/index.tsx içinde de uygulanıyor: yalnız akademinin gerçekten sahip
              olduğu kanallar bağlanır. Gerçek kanal URL'i doğrulandığında buraya geri
              eklenmeli. Kayıt: FINAL-VERIFICATION J-11. */}
        </section>
      </div>
    </SubPageLayout>
  );
}
