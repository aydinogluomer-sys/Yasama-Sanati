import React from "react";
import SubPageLayout from "@/components/Server/SubPageLayout";

export default function WellnessPage() {
  return (
    <SubPageLayout
      title="Esenlik"
      description="Beden, zihin ve ruh dengenizi sıfırlayan Bütünsel Esenlik (Integrative Wellness) yaklaşımı"
    >
      <div className="max-w-5xl mx-auto space-y-24">
        {/* Integrative Wellness & Life Optimizing Program */}
        <section className="space-y-12">
          <h2 className="text-3xl md:text-52 font-light text-white border-b border-[#ced1bf]/15 pb-4">
            Bütünsel Esenlik (Integrative Wellness)
          </h2>
          <p className="text-lg md:text-xl font-light leading-relaxed text-[#ced1bf]/80">
            ELEMENTIS'in tescilli <strong>Yaşam Optimizasyon Programı (Life Optimizing Program)</strong>, lider esenlik uzmanlarımız tarafından zihninizi, bedeninizi ve ruhunuzu sıfırlamak, yaşlanma belirtilerini tersine çevirmek, genel sağlığınızı ve ömrünüzü optimize etmek için tasarlanmıştır. Bu program; tıbbi, beslenme, psikolojik, bütünsel ve eğitsel müdahaleleri harmanlayan bütünleşik bir deneyim sunar.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {[
              {
                title: "Hassas Sağlık Optimizasyonu",
                desc: "Kapsamlı testler ve ileri düzey veri analizleriyle en uygun Esenliği keşfedin. Benzersiz bilimsel doğrulukla fiziksel sağlığınız için fitness ve beslenme planlarınızı kişiselleştiriyoruz."
              },
              {
                title: "Optimal Beslenme",
                desc: "Sağlığı ve uzun ömürlülüğü artırmak için tasarlanmış organik bütünsel gıdalar, yağsız proteinler, sağlıklı yağlar ve kompleks karbonhidratlardan oluşan menümüzün tadını çıkarın."
              },
              {
                title: "Çok Yönlü Bakım",
                desc: "Modern ve geleneksel tedavileri birleştiren zihinsel, duygusal esenlik yaklaşımları, spa bakımları, Banya ritüelleri ve bütünsel terapilerle kapsamlı bir iyileşme sürecini deneyimleyin."
              },
              {
                title: "Zihin-Beden Bağlantısı",
                desc: "Kimyasallardan arındırılmış, çevre dostu inziva merkezimizde detoks yapın ve gençleşin. Doğayla bütünleşmiş, sakin bir ortamda en son teknolojilerden yararlanın."
              },
              {
                title: "Eğitici ve Deneyimsel Unsurlar",
                desc: "Bilinçli yaşam tarzı seçimlerini teşvik etmek için beslenme, uyku, stres yönetimi ve kişisel gelişim üzerine atölye çalışmalarına ve doğayla bağ kuran açık hava aktivitelerine katılın."
              },
              {
                title: "Kişiselleştirilmiş ve Sürekli Destek",
                desc: "Gelişiminizi sürdürmek ve sürekli rehberlik sağlamak için konaklama sonrası esenlik planlarını ve sanal seansları içeren takip desteği sunuyoruz."
              },
              {
                title: "Topluluk ve Bağlantı",
                desc: "ELEMENTIS'te, deneyimlerinizi paylaşabileceğiniz, aidiyet duygusunu ve karşılıklı motivasyonu teşvik eden özel bir Esenlik Topluluğuna erişim hakkına sahipsiniz."
              }
            ].map((item, i) => (
              <div key={i} className="p-6 bg-[#ced1bf]/5 rounded border border-[#ced1bf]/10 space-y-3">
                <h3 className="text-xl font-medium text-white">{item.title}</h3>
                <p className="text-base font-light leading-relaxed text-[#ced1bf]/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Health & Performance */}
        <section className="space-y-12">
          <h2 className="text-3xl md:text-52 font-light text-white border-b border-[#ced1bf]/15 pb-4">
            Sağlık & Performans
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-[#ced1bf]/5 rounded border border-[#ced1bf]/10 space-y-4">
              <h3 className="text-xl font-medium text-white">Banya</h3>
              <p className="text-base font-light leading-relaxed text-[#ced1bf]/70">
                ELEMENTIS Banya ile vücut sıcaklığınızı yükselterek, kan akışını hızlandırın, kas gerginliğini azaltın ve laktik asidi arındırın. Banya ayrıca oksijen tüketimini, kırmızı kan hücresi üretimini, kardiyovasküler performansı ve dayanıklılığı artırır.
              </p>
            </div>
            
            <div className="p-6 bg-[#ced1bf]/5 rounded border border-[#ced1bf]/10 space-y-4">
              <h3 className="text-xl font-medium text-white">Hidrojen İnhalasyonu</h3>
              <p className="text-base font-light leading-relaxed text-[#ced1bf]/70">
                Moleküler hidrojenin (H2) gücünü kullanarak zararlı serbest radikalleri etkili bir şekilde nötralize eden ve bunları zararsız su moleküllerine dönüştüren olağanüstü bir esenlik tekniğidir.
              </p>
            </div>
            
            <div className="p-6 bg-[#ced1bf]/5 rounded border border-[#ced1bf]/10 space-y-4">
              <h3 className="text-xl font-medium text-white">Yapılandırılmış Hidrojen Suyu</h3>
              <p className="text-base font-light leading-relaxed text-[#ced1bf]/70">
                Yapılandırılmış hidrojen suyu (H3O2) ile hidrasyonun geleceğini keşfedin. OKEARA by ELEMENTIS, hücresel yenilenme için daha yüksek yoğunluk ve oksijen sunarak temel hidrasyonun ötesine geçer.
              </p>
            </div>
          </div>
        </section>

        {/* Mind & Spirit */}
        <section className="space-y-12 pb-12">
          <h2 className="text-3xl md:text-52 font-light text-white border-b border-[#ced1bf]/15 pb-4">
            Zihin & Ruh
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 bg-[#ced1bf]/5 rounded border border-[#ced1bf]/10 space-y-4">
              <h3 className="text-xl font-medium text-white">Enerji Şifasının Gücü</h3>
              <p className="text-base font-light leading-relaxed text-[#ced1bf]/70">
                Esenliğe yönelik bu kapsamlı yaklaşım, vücudun enerji alanlarıyla (energy fields) çalışarak dengeyi ve genel sağlığı geri kazandırmaya odaklanır.
              </p>
            </div>
            
            <div className="p-6 bg-[#ced1bf]/5 rounded border border-[#ced1bf]/10 space-y-4">
              <h3 className="text-xl font-medium text-white">Şifa Potansiyeli</h3>
              <p className="text-base font-light leading-relaxed text-[#ced1bf]/70">
                Uzman terapistlerimiz; stres, kaygı, depresyon, ağrı ve kronik hastalıklara yol açan enerji dengesizliklerini tespit edip çözerek genel esenliğinizi destekler.
              </p>
            </div>
            
            <div className="p-6 bg-[#ced1bf]/5 rounded border border-[#ced1bf]/10 space-y-4">
              <h3 className="text-xl font-medium text-white">Kişiselleştirilmiş Şifa Seansları</h3>
              <p className="text-base font-light leading-relaxed text-[#ced1bf]/70">
                ELEMENTIS terapistleri, kişiselleştirilmiş seanslarda şifa enerjisini yönlendirerek durgun enerjileri nazikçe dağıtır ve vücudun doğal iyileşme süreçlerini aktive eder.
              </p>
            </div>
            
            <div className="p-6 bg-[#ced1bf]/5 rounded border border-[#ced1bf]/10 space-y-4">
              <h3 className="text-xl font-medium text-white">Benzersiz Faydalar</h3>
              <p className="text-base font-light leading-relaxed text-[#ced1bf]/70">
                Enerji şifası; günlük stres, anksiyete, depresyon ve ağrılardan kurtulma sağlar. Kronik hastalıkların enerji merkezini hedef alarak uzun vadeli bir esenlik sunar.
              </p>
            </div>
          </div>
        </section>
      </div>
    </SubPageLayout>
  );
}
