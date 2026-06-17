import React from "react";
import SubPageLayout from "@/components/Server/SubPageLayout";

export default function InnovationPage() {
  return (
    <SubPageLayout
      title="İnovasyon"
      description="Lüks yaşam standartlarını sürdürülebilirlikle harmanlayan ileri teknolojiler"
    >
      <div className="max-w-5xl mx-auto space-y-24">
        {/* Innovation Culture */}
        <section className="space-y-12">
          <h2 className="text-3xl md:text-52 font-light text-white border-b border-[#ced1bf]/15 pb-4">
            ELEMENTIS İnovasyon Kültürü
          </h2>
          <p className="text-lg md:text-xl font-light leading-relaxed text-[#ced1bf]/80">
            Yüksek kaliteli lamine ahşap (glulam), Low-E güneş kontrollü camlar ve yenilikçi iklimlendirme sistemleri kullanarak konforlu ve lüks bir yaşam ortamı için yeni standartlar belirliyoruz. Dünyada bir ilk olan güneş enerjisi sistemimiz, daha yeşil bir gelecek için yenilikçi çözümler bulmaya olan bağlılığımızın bir kanıtıdır. Yenilikçi teknolojileri ve entelektüel cesaret kültürünü benimseyerek, sağlıklı ve sürdürülebilir bir geleceği şekillendiriyoruz.
          </p>
        </section>

        {/* Exceptional Wood Construction */}
        <section className="space-y-12">
          <h2 className="text-3xl md:text-52 font-light text-white border-b border-[#ced1bf]/15 pb-4">
            Olağanüstü Ahşap Yapı
          </h2>
          <p className="text-base font-light leading-relaxed text-[#ced1bf]/80">
            Tropikal iklim yapıları için benzersiz şekilde uygun olan ve eşsiz faydalar sunan yüksek kaliteli lamine ahşap (glulam) kullanımına öncelik veriyoruz:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-6">
            {[
              "Saf doğal malzeme",
              "Premium yüzey kalitesi",
              "Maksimum yangın direnci",
              "En yüksek rüzgar direnci",
              "Yüksek sismik (deprem) dayanıklılık",
              "Maksimum nem direnci",
              "Zararlı mantarlara karşı doğal koruma",
              "Ekolojik ve çevre dostu",
              "Kusursuz işçilik ve estetik"
            ].map((feature, i) => (
              <div key={i} className="p-4 bg-[#ced1bf]/5 rounded border border-[#ced1bf]/10 text-center">
                <span className="text-base font-light text-white">{feature}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Glass & Climate Control */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h3 className="text-2xl font-light text-white border-b border-[#ced1bf]/15 pb-2">Yenilikçi Cam Çözümleri</h3>
            <p className="text-base font-light leading-relaxed text-[#ced1bf]/80">
              Tropikal bölgelerde konforlu, enerji tasarruflu ve görsel olarak çarpıcı bir yaşam ortamı sunan Low-E güneş kontrollü camları kullanıyoruz:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-base font-light text-[#ced1bf]/70">
              <li>Güneşin kızılötesi ısı enerjisinin %70'ini bloke eder.</li>
              <li>Isı yalıtımını artırır.</li>
              <li>Doğal gün ışığını maksimuma çıkarır.</li>
              <li>Güneş ısısını yansıtır.</li>
              <li>Daha serin iç mekanlar ve azaltılmış enerji maliyetleri sağlar.</li>
              <li>Geleneksel duvarlar yerine nefes kesici doğal manzaralar sunar.</li>
            </ul>
          </div>
          
          <div className="space-y-6">
            <h3 className="text-2xl font-light text-white border-b border-[#ced1bf]/15 pb-2">Dünyada Bir İlk: İklim Kontrolü</h3>
            <p className="text-base font-light leading-relaxed text-[#ced1bf]/80">
              Diğer tüm sistemlerden daha iyi performans gösteren, küf oluşumuna karşı savaşı tamamen bitiren ve sonsuz derecede sağlıklı bir deneyim sunan yenilikçi iklimlendirme sistemimiz:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-base font-light text-[#ced1bf]/70">
              <li>Entegre nem kontrolü.</li>
              <li>Dahili hava sirkülasyon sistemi.</li>
              <li>Küfe karşı mutlak koruma.</li>
              <li>Sessiz ve şık tasarım.</li>
              <li>50 yıllık yaşam beklentisi.</li>
              <li>Zehirli olmayan, geri dönüştürülebilir ve alev almaz bileşenler.</li>
              <li>Güneş enerjisiyle çalışır; sadece 30% enerji ile 36 saate kadar çalışabilir.</li>
            </ul>
          </div>
        </section>

        {/* State-of-the-Art Design */}
        <section className="space-y-12 pb-12">
          <h2 className="text-3xl md:text-52 font-light text-white border-b border-[#ced1bf]/15 pb-4">
            Son Teknoloji Tasarım
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Doğal Malzemeler",
                desc: "Sürdürülebilir kaynaklardan elde edilen sert tropikal ahşap ve doğal taşlar gibi malzemelerle ekolojik esintiyi güçlendiriyoruz."
              },
              {
                title: "Panoramik Pencereler",
                desc: "Yerden tavana kadar uzanan geniş pencereler, misafirlerimize dış mekanı iç mekana taşıyan nefes kesici doğal manzaralar sunar."
              },
              {
                title: "Sıcak Toprak Tonları",
                desc: "Kahverengi, yeşil ve bej gibi doğadan ilham alan renk paletimiz, sıcak, davetkar ve huzurlu bir ambiyans yaratır."
              },
              {
                title: "Dokunsal Dokular",
                desc: "Pelüş halılar, yumuşak döşemelik kumaşlar ve keten/pamuk gibi doğal tekstiller, iç tasarıma derinlik ve zenginlik katar."
              },
              {
                title: "Lüks Dokunuşlar",
                desc: "Kadife detaylar, metalik kaplamalar ve iddialı aydınlatma armatürleri, genel estetiği yükselterek hafif bir lüks hissi uyandırır."
              },
              {
                title: "Biyofilik Tasarım",
                desc: "Yaşayan yeşil duvarlar, saksı bitkileri ve doğal ışık entegrasyonu ile doğanın huzur verici temasını iç mekanlara taşıyoruz."
              }
            ].map((design, i) => (
              <div key={i} className="p-6 bg-[#ced1bf]/5 rounded border border-[#ced1bf]/10 space-y-3">
                <h3 className="text-xl font-medium text-white">{design.title}</h3>
                <p className="text-base font-light leading-relaxed text-[#ced1bf]/70">{design.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </SubPageLayout>
  );
}
