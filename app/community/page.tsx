import type { Metadata } from "next";
import heroImage from "@/public/SideBar/topluluk.jpg";
import React from "react";
import SubPageLayout from "@/components/Server/SubPageLayout";

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

export default function CommunityPage() {
  return (
    <SubPageLayout
      heroImage={heroImage}
      title="Topluluk"
      description="Hayata, paylaşıma ve içimizdeki sınırsız potansiyele değer veren bütünsel bir topluluk"
    >
      <div className="max-w-5xl mx-auto space-y-24">
        {/* Join Community */}
        <section className="space-y-12">
          <h2 className="text-30 md:text-52 font-light text-white border-b border-[#ced1bf]/15 pb-4">
            Yaşama Sanatı Topluluğu'na Katılın
          </h2>
          <p className="text-lg md:text-xl font-light leading-relaxed text-[#ced1bf]/80">
            Hayata, bağ kurmaya ve içimizdeki sınırsız potansiyele değer veren bütünsel bir topluluğun parçası olun. Birlikte, uyum ve dengeyle dolu bir geleceği şekillendiriyoruz. Topluluğumuzun bir parçası olarak, esenlik, derin farkındalık ve güçlü bağlarla dolu bir yaşama doğru ilk adımı atın.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="p-6 bg-[#ced1bf]/5 rounded border border-[#ced1bf]/10 space-y-4">
              <h3 className="text-xl font-medium text-white">Bütünsel Esenlik Buluşmaları</h3>
              <p className="text-base font-light leading-relaxed text-[#ced1bf]/82">
                Fiziksel, zihinsel ve enerjetik bütünlüğü artırmak için özel olarak tasarlanmıştır. Sizinle benzer arayışlarda olan bireylerle derinlemesine bağlantı kurun.
              </p>
            </div>
            
            <div className="p-6 bg-[#ced1bf]/5 rounded border border-[#ced1bf]/10 space-y-4">
              <h3 className="text-xl font-medium text-white">Doğal Yaşam ve Farkındalık</h3>
              <p className="text-base font-light leading-relaxed text-[#ced1bf]/82">
                Değerlerinizle uyumlu, sakinleştirici, doğayla dost ve farkındalık odaklı modern yaşam pratiklerini keşfedin.
              </p>
            </div>
            
            <div className="p-6 bg-[#ced1bf]/5 rounded border border-[#ced1bf]/10 space-y-4">
              <h3 className="text-xl font-medium text-white">Özel İnzivalar</h3>
              <p className="text-base font-light leading-relaxed text-[#ced1bf]/82">
                Zihni sakinleştiren, yaşamı kolaylaştıran pratiklerin, bütünsel sağlık atölyelerinin ve grup inziva programlarının bir parçası olun.
              </p>
            </div>
            
            <div className="p-6 bg-[#ced1bf]/5 rounded border border-[#ced1bf]/10 space-y-4">
              <h3 className="text-xl font-medium text-white">Bütünsel Şifa Paylaşımı</h3>
              <p className="text-base font-light leading-relaxed text-[#ced1bf]/82">
                Bilinçli yaşam, ortak meditasyonlar, şifa çemberleri ve destekleyici topluluk bağlarının mükemmel bir şekilde birleştiği güvenli bir alan.
              </p>
            </div>
          </div>
        </section>

        {/* Weekly Circles & Retreats */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-4">
            <h3 className="text-24 font-light text-white border-b border-[#ced1bf]/15 pb-2">Haftalık Paylaşım Çemberleri</h3>
            <p className="text-base font-light leading-relaxed text-[#ced1bf]/80">
              Her hafta belirli temalar etrafında toplanıyor; deneyimlerimizi, hislerimizi ve içsel yolculuklarımızı güvenli, yargısız bir alanda paylaşıyoruz. Nefes, meditasyon ve zihinsel dönüşüm yöntemlerini grup enerjisiyle uygulayarak bireysel farkındalığımızı kolektif olarak destekliyoruz.
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-24 font-light text-white border-b border-[#ced1bf]/15 pb-2">Topluluk İnzivaları</h3>
            <p className="text-base font-light leading-relaxed text-[#ced1bf]/80">
              Şehrin koşturmacasından uzaklaşarak doğanın kollarında gerçekleştirdiğimiz sessizlik inzivaları, meridyen dengeleme kampları ve yoğunlaştırılmış nefes günleri. Kendinizi doğanın akışına bırakarak, benzer vizyonu paylaşan dostlarla birlikte yenilenmenin en yalın halini tecrübe edin.
            </p>
          </div>
        </section>

        {/* Podcast Section */}
        <section className="p-8 bg-[#ced1bf]/5 rounded border border-[#ced1bf]/10 space-y-6 pb-12">
          <h2 className="text-24 md:text-30 font-light text-white border-b border-[#ced1bf]/15 pb-2">
            Yaşama Sanatı — Podcast
          </h2>
          <p className="text-base font-light leading-relaxed text-[#ced1bf]/80">
            Zihinsel berraklık, fiziksel canlılık, bütünsel şifa, nefes koçluğu ve kadim felsefeler gibi çeşitli konulara değinen, esenliğe doğru yaptığımız sesli yolculuk serisi. Podcast yayınımızda akademimizin eğitmenleri ve alanında uzman konuklarla şifa pratiklerini, klinik yaklaşımları ve gündelik yaşam ipuçlarını konuşuyoruz.
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
