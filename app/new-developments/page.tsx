import React from "react";
import SubPageLayout from "@/components/Server/SubPageLayout";

export default function NewDevelopmentsPage() {
  return (
    <SubPageLayout
      title="Yeni Gelişmeler"
      description="Yenilikçi teknolojiler ve sıra dışı tasarımlarla şekillenen gelecek projelerimiz"
    >
      <div className="max-w-5xl mx-auto space-y-24">
        {/* Development Vision */}
        <section className="space-y-8">
          <h2 className="text-3xl md:text-52 font-light text-white border-b border-[#ced1bf]/15 pb-4">
            Geliştirme Vizyonumuz
          </h2>
          <p className="text-lg md:text-xl font-light leading-relaxed text-[#ced1bf]/80">
            Vizyonumuz geleneksel misafirperverliğin ötesine geçerek; yeniliği doğanın güzelliğiyle harmanlayan, canlı ve birbirine bağlı toplulukları besleyen uyumlu yaşam alanları yaratmaya odaklanmaktadır. En son tasarım ilkelerini ve çevre dostu teknolojileri projelerimizin merkezine alıyoruz.
          </p>
        </section>

        {/* Global Expansion */}
        <section className="space-y-12">
          <h2 className="text-3xl md:text-52 font-light text-white border-b border-[#ced1bf]/15 pb-4">
            Küresel Genişleme Projelerimiz
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <h3 className="text-2xl font-light text-white">Avustralasya & Güney Amerika</h3>
              <p className="text-base font-light leading-relaxed text-[#ced1bf]/70">
                Avustralya'daki ortaklığımız, Avustralya ve Yeni Zelanda'daki gelecekteki projelerimiz için zemin hazırlamaktadır. Güney Amerika'da ise Şili'deki ortaklığımız, ELEMENTIS'i bu ülkede ve komşu Güney Amerika ülkelerinde en seçkin lüks esenlik markası olarak konumlandırmıştır.
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-2xl font-light text-white">Güneydoğu Asya (ASEAN)</h3>
              <p className="text-base font-light leading-relaxed text-[#ced1bf]/70">
                ASEAN bölgesi ortaklığımız, Tayland ve Vietnam'daki projelere ve geliştirmelere öncelik verme taahhüdümüzü göstermektedir. Ayrıca lüks resort ve rezidans modellerimizi, benzersiz kentsel ortamlarda "Şehir İçi Resort ve Rezidansları" olarak genişletiyoruz.
              </p>
            </div>
          </div>
        </section>

        {/* Pipeline & Openings */}
        <section className="space-y-12 pb-12">
          <h2 className="text-3xl md:text-52 font-light text-white border-b border-[#ced1bf]/15 pb-4">
            Açılışlar & Gelecek Projeler
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Ubud Project */}
            <div className="p-6 bg-[#ced1bf]/5 rounded border border-[#ced1bf]/10 space-y-4">
              <span className="text-sm font-light text-[#ca7d57] uppercase tracking-widest">Açılış: Q4 2026 (2026 Son Çeyrek)</span>
              <h3 className="text-2xl font-light text-white">HOTSTONE Regenerative Retreat Ubud</h3>
              <p className="text-base font-light text-[#ced1bf]/70">
                Endonezya Bali'nin kalbi Ubud'da yer alan, tamamen yenileyici ve bütünsel esenlik odaklı ilk büyük projemiz. Ekolojik ahşap tasarımı ve akıllı oda teknolojilerini bir araya getiriyor.
              </p>
            </div>
            
            {/* Future Projects */}
            <div className="p-6 bg-[#ced1bf]/5 rounded border border-[#ced1bf]/10 space-y-4 flex flex-col justify-between">
              <div>
                <span className="text-sm font-light text-[#ced1bf]/50 uppercase tracking-widest">Proje Aşamasında (Pipeline)</span>
                <h3 className="text-2xl font-light text-white pt-2">Lombok & Uluwatu Gelişmeleri</h3>
                <p className="text-base font-light text-[#ced1bf]/70 pt-2">
                  Ubud projemizin ardından portföyümüze eklenecek olan, Endonezya'nın en güzel kıyı şeritlerinde konumlanmış lüks inziva merkezleri:
                </p>
                <ul className="list-disc pl-6 pt-2 space-y-1 text-sm font-light text-[#ced1bf]/60">
                  <li>HOTSTONE Lombok by ELEMENTIS</li>
                  <li>HOTSTONE Uluwatu by ELEMENTIS</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </SubPageLayout>
  );
}
