import type { Metadata } from "next";
import heroImage from "@/public/akademi-hikayesi/picture-1.jpg";
import React from "react";
import SubPageLayout from "@/components/Server/SubPageLayout";
import SectionHeading from "@/components/Server/SectionHeading";
import TherapyScene3DWrapper from "@/components/Client/TherapyScene3DWrapper";

export const metadata: Metadata = {
  title: "Hikayemiz | Yaşama Sanatı",
  description:
    "Yaşama Sanatı'nın kuruluş hikâyesi, bütünsel yaklaşımı ve akademi olarak duruşu.",
  alternates: { canonical: "/the-story" },
  openGraph: {
    title: "Hikayemiz | Yaşama Sanatı",
    description:
      "Yaşama Sanatı'nın kuruluş hikâyesi, bütünsel yaklaşımı ve akademi olarak duruşu.",
    url: "/the-story",
  },
};

/** Yaklaşımın dört sütunu. Eskiden dört eş kutuydu; artık numaralı akış. */
const PILLARS = [
  {
    title: "Kadim Bilgelik",
    body: "Geleneksel Çin Tıbbı, meridyen hatları, reiki ve enerji bedeni teorileri gibi binlerce yıllık deneyimlerden süzülen kadim öğretileri temel alıyoruz. Uygulamalarımızı aslına sadık kalarak, en duru haliyle öğretiyoruz.",
  },
  {
    title: "Çağdaş Entegrasyon",
    body: "Kadim pratikleri bütünsel kinesiyoloji, modern nefes bilimleri, koçluk metodolojileri ve klinik hipnoterapi teknikleriyle birleştirerek rasyonel, ölçülebilir ve günlük yaşama entegre edilebilir kılavuzlar sunuyoruz.",
  },
  {
    title: "Destekleyici Alan",
    body: "Katılımcılarımızın kendilerini güvende, yargısız ve samimi bir ortamda hissetmeleri önceliğimizdir. Eğitim sonrasındaki süpervizyonlar ve paylaşım çemberleri ile kalıcı bir yol arkadaşlığı sağlıyoruz.",
  },
  {
    title: "Sertifikalı Dönüşüm",
    body: "Sadece kişisel dönüşüm sunmakla kalmıyor, bu pratikleri meslek haline getirmek veya mevcut terapistlik yetkinliklerini artırmak isteyenlere akademi sertifikasyonu sağlıyoruz.",
  },
];

/**
 * Rehber kadro. İsimler gerçek kamusal isimlerdir; akademiyle resmî ilişki
 * repodan doğrulanamıyor (bkz. docs/TRUST-PROOF-MATRIX.md). Bu yüzden uydurma
 * portre veya uydurma unvan EKLENMEZ; baş harf kullanılır.
 */
const TEAM = [
  { name: "Nevşah F. Karamehmet", role: "Kurucu & Nefes Enstitüsü Başkanı" },
  { name: "Dr. Nilgün Metin", role: "Kurucu Ortak & Tıbbi Bütünsel Koordinatör" },
  { name: "Cem Şen", role: "Eğitim Stratejileri ve Enerji Çalışmaları Rehberi" },
  { name: "Hale Caneroğlu", role: "Bütünsel Gelişim & Yaşam Koçluğu Koordinatörü" },
  { name: "Dr. Bülent Uran", role: "Bilinçaltı & Hipnoterapi Çalışmaları Danışmanı" },
];

const PARTNERS = [
  { name: "Matlas Akademi", role: "Klinik Kinesiyoloji ve Uygulama Partneri" },
  { name: "Nevsah Enstitü", role: "Nefes ve Zihinsel Dönüşüm Bilimsel Araştırma Ortağı" },
];

export default function TheStoryPage() {
  return (
    <SubPageLayout
      heroImage={heroImage}
      heroImageAlt="Pencereden gelen sabah ışığında, üzerinde açık defter ve seramik testi bulunan ahşap masa"
      title="Hikayemiz"
      description="Zihinsel, bedensel ve enerjetik dönüşüm için kadim bilgelik ve modern bilim sentezi"
    >
      {/* `mx-auto` yok: gövde hero başlığıyla AYNI sol eksende akıyor. */}
      <div className="max-w-wide space-y-32 md:space-y-40">
        <section className="max-w-measure space-y-10">
          <SectionHeading index="01" kicker="Vizyon" rule>
            Vizyonumuz ve Yaklaşımımız
          </SectionHeading>
          <p className="max-w-editorial text-body-lg font-light text-cream/80">
            Yaşama Sanatı Akademisi, insanın özündeki dengeye dönmesinin bir
            teknikten ziyade bir yaşam sanatı olduğu felsefesiyle kuruldu. Nefes,
            enerji meridyenleri, bilinçaltı dönüşüm pratikleri ve kadim öğretileri
            tek bir çatı altında birleştirerek, bireylerin kendi kendilerini
            iyileştirme ve yaşamlarını tam potansiyeliyle yaşama becerilerini
            geliştirmeyi amaçlıyoruz.
          </p>

          {/* Dört eş "kart" yerine numaralı editoryal akış: kutu yok, yalnız
              ince üst kural + mono indeks + serif başlık. */}
          <div className="grid grid-cols-1 gap-x-12 gap-y-14 pt-6 md:grid-cols-2">
            {PILLARS.map((p, i) => (
              <div key={p.title} className="border-t border-cream/15 pt-6">
                <span className="font-mono text-3xs tracking-[0.2em] text-copper-text">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-serif text-display-s font-normal leading-[1.08] text-white">
                  {p.title}
                </h3>
                <p className="mt-4 text-base font-light leading-relaxed text-cream/78">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <TherapyScene3DWrapper />
        </section>

        <section className="space-y-10">
          <SectionHeading index="02" kicker="Rehber Kadro" rule>
            Rehber Kadromuz
          </SectionHeading>
          <ul className="grid grid-cols-1 gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {TEAM.map((member) => (
              <li
                key={member.name}
                className="flex items-start gap-4 border-t border-cream/12 pt-5"
              >
                <span
                  aria-hidden
                  className="mt-1 flex size-11 shrink-0 items-center justify-center border border-copper/40 font-serif text-xl text-copper-text"
                >
                  {member.name[0]}
                </span>
                <div>
                  <h3 className="font-serif text-24 font-normal leading-tight text-white">
                    {member.name}
                  </h3>
                  <p className="mt-1.5 text-sm font-light text-cream/72">
                    {member.role}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-10 pb-4">
          <SectionHeading index="03" kicker="Çözüm Ortakları" rule>
            Akreditasyon ve Çözüm Ortaklarımız
          </SectionHeading>
          <ul className="grid grid-cols-1 gap-x-12 gap-y-10 sm:grid-cols-2">
            {PARTNERS.map((partner) => (
              <li key={partner.name} className="border-t border-cream/12 pt-5">
                <h3 className="font-serif text-24 font-normal leading-tight text-white">
                  {partner.name}
                </h3>
                <p className="mt-1.5 text-sm font-light text-cream/72">
                  {partner.role}
                </p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </SubPageLayout>
  );
}
