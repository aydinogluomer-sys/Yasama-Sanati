import React from "react";
import SubPageLayout from "@/components/Server/SubPageLayout";

export default function CommunityPage() {
  return (
    <SubPageLayout
      title="Topluluk"
      description="Hayata, paylaşıma ve içimizdeki sınırsız potansiyele değer veren bütünsel bir topluluk"
    >
      <div className="max-w-5xl mx-auto space-y-24">
        {/* Join Community */}
        <section className="space-y-12">
          <h2 className="text-3xl md:text-52 font-light text-white border-b border-[#ced1bf]/15 pb-4">
            Yaşama Sanatı Topluluğu'na Katılın
          </h2>
          <p className="text-lg md:text-xl font-light leading-relaxed text-[#ced1bf]/80">
            Hayata, bağ kurmaya ve içimizdeki sınırsız potansiyele değer veren bütünsel bir topluluğun parçası olun. Birlikte, uyum ve dengeyle dolu bir geleceği şekillendiriyoruz. Topluluğumuzun bir parçası olarak, esenlik, derin farkındalık ve güçlü bağlarla dolu bir yaşama doğru ilk adımı atın.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="p-6 bg-[#ced1bf]/5 rounded border border-[#ced1bf]/10 space-y-4">
              <h3 className="text-xl font-medium text-white">Bütünsel Esenlik Buluşmaları</h3>
              <p className="text-base font-light leading-relaxed text-[#ced1bf]/70">
                Fiziksel, zihinsel ve enerjetik bütünlüğü artırmak için özel olarak tasarlanmıştır. Sizinle benzer arayışlarda olan bireylerle derinlemesine bağlantı kurun.
              </p>
            </div>
            
            <div className="p-6 bg-[#ced1bf]/5 rounded border border-[#ced1bf]/10 space-y-4">
              <h3 className="text-xl font-medium text-white">Doğal Yaşam ve Farkındalık</h3>
              <p className="text-base font-light leading-relaxed text-[#ced1bf]/70">
                Değerlerinizle uyumlu, sakinleştirici, doğayla dost ve farkındalık odaklı modern yaşam pratiklerini keşfedin.
              </p>
            </div>
            
            <div className="p-6 bg-[#ced1bf]/5 rounded border border-[#ced1bf]/10 space-y-4">
              <h3 className="text-xl font-medium text-white">Özel İnzivalar</h3>
              <p className="text-base font-light leading-relaxed text-[#ced1bf]/70">
                Zihni sakinleştiren, yaşamı kolaylaştıran pratiklerin, bütünsel sağlık atölyelerinin ve grup inziva programlarının bir parçası olun.
              </p>
            </div>
            
            <div className="p-6 bg-[#ced1bf]/5 rounded border border-[#ced1bf]/10 space-y-4">
              <h3 className="text-xl font-medium text-white">Bütünsel Şifa Paylaşımı</h3>
              <p className="text-base font-light leading-relaxed text-[#ced1bf]/70">
                Bilinçli yaşam, ortak meditasyonlar, şifa çemberleri ve destekleyici topluluk bağlarının mükemmel bir şekilde birleştiği güvenli bir alan.
              </p>
            </div>
          </div>
        </section>

        {/* Weekly Circles & Retreats */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-4">
            <h3 className="text-2xl font-light text-white border-b border-[#ced1bf]/15 pb-2">Haftalık Paylaşım Çemberleri</h3>
            <p className="text-base font-light leading-relaxed text-[#ced1bf]/80">
              Her hafta belirli temalar etrafında toplanıyor; deneyimlerimizi, hislerimizi ve içsel yolculuklarımızı güvenli, yargısız bir alanda paylaşıyoruz. Nefes, meditasyon ve zihinsel dönüşüm yöntemlerini grup enerjisiyle uygulayarak bireysel farkındalığımızı kolektif olarak destekliyoruz.
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-2xl font-light text-white border-b border-[#ced1bf]/15 pb-2">Topluluk İnzivaları</h3>
            <p className="text-base font-light leading-relaxed text-[#ced1bf]/80">
              Şehrin koşturmacasından uzaklaşarak doğanın kollarında gerçekleştirdiğimiz sessizlik inzivaları, meridyen dengeleme kampları ve yoğunlaştırılmış nefes günleri. Kendinizi doğanın akışına bırakarak, benzer vizyonu paylaşan dostlarla birlikte yenilenmenin en yalın halini tecrübe edin.
            </p>
          </div>
        </section>

        {/* Podcast Section */}
        <section className="p-8 bg-[#ced1bf]/5 rounded border border-[#ced1bf]/10 space-y-6 pb-12">
          <h2 className="text-2xl md:text-3xl font-light text-white border-b border-[#ced1bf]/15 pb-2">
            Yaşama Sanatı — Podcast
          </h2>
          <p className="text-base font-light leading-relaxed text-[#ced1bf]/80">
            Zihinsel berraklık, fiziksel canlılık, bütünsel şifa, nefes koçluğu ve kadim felsefeler gibi çeşitli konulara değinen, esenliğe doğru yaptığımız sesli yolculuk serisi. Podcast yayınımızda akademimizin eğitmenleri ve alanında uzman konuklarla şifa pratiklerini, klinik yaklaşımları ve gündelik yaşam ipuçlarını konuşuyoruz.
          </p>
          <div className="pt-2">
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-[#ced1bf] text-[#2b3530] font-medium text-sm rounded hover:bg-[#b0b3a2] transition-colors"
            >
              YouTube Kanalımızı Ziyaret Edin
            </a>
          </div>
        </section>
      </div>
    </SubPageLayout>
  );
}
