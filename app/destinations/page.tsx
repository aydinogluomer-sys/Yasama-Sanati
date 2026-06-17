import React from "react";
import SubPageLayout from "@/components/Server/SubPageLayout";

export default function DestinationsPage() {
  return (
    <SubPageLayout
      title="Destinasyonlar"
      description="Dünyanın en nefes kesici noktalarında yer alan seçkin lüks resort ve rezidanslarımızı keşfedin"
    >
      <div className="max-w-5xl mx-auto space-y-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Asia / Indonesia */}
          <div className="p-8 bg-[#ced1bf]/5 rounded border border-[#ced1bf]/10 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-sm font-light text-[#ced1bf]/50 uppercase tracking-widest">Bölge: Asya</span>
              <h2 className="text-3xl font-light text-white border-b border-[#ced1bf]/15 pb-2">Endonezya</h2>
              <p className="text-base font-light leading-relaxed text-[#ced1bf]/70 pt-2">
                Endonezya, çeşitli doğal manzaraları, büyüleyici volkanik dağları, tropikal plajları ve son derece zengin kültürel mirası ile benzersiz bir takımadadır. Ubud Bali'deki Hotstone Regenerative Retreat projemiz ile burada doğayla iç içe lüks bir vahayı hayata geçiriyoruz.
              </p>
            </div>
            <div className="text-sm text-[#ced1bf]/40 italic pt-4">Lokasyon: Bali & Lombok</div>
          </div>

          {/* Americas / Chile */}
          <div className="p-8 bg-[#ced1bf]/5 rounded border border-[#ced1bf]/10 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-sm font-light text-[#ced1bf]/50 uppercase tracking-widest">Bölge: Amerika</span>
              <h2 className="text-3xl font-light text-white border-b border-[#ced1bf]/15 pb-2">Şili</h2>
              <p className="text-base font-light leading-relaxed text-[#ced1bf]/70 pt-2">
                Amerika bölgesi, hayranlık uyandıran devasa manzaraları ve benzersiz kültürel deneyimleriyle tanınır. Şili'deki ortaklığımız, ELEMENTIS'i bu ülkede ve komşu Güney Amerika ülkelerinde önde gelen lüks esenlik markası olarak konumlandırmaktadır.
              </p>
            </div>
            <div className="text-sm text-[#ced1bf]/40 italic pt-4">Lokasyon: Santiago & Patagonya</div>
          </div>

          {/* Australia */}
          <div className="p-8 bg-[#ced1bf]/5 rounded border border-[#ced1bf]/10 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-sm font-light text-[#ced1bf]/50 uppercase tracking-widest">Bölge: Okyanusya</span>
              <h2 className="text-3xl font-light text-white border-b border-[#ced1bf]/15 pb-2">Avustralya</h2>
              <p className="text-base font-light leading-relaxed text-[#ced1bf]/70 pt-2">
                Avustralya, dönüştürücü yaşam deneyimleri, bütünsel sağlık terapileri ve derin bir rahatlama için göze çarpan mükemmel bir destinasyondur. Avustralya'daki stratejik ortaklığımız, Avustralya ve Yeni Zelanda'daki gelecekteki projelerimizin temelini oluşturur.
              </p>
            </div>
            <div className="text-sm text-[#ced1bf]/40 italic pt-4">Lokasyon: Sidney & Doğu Kıyısı</div>
          </div>
        </div>
      </div>
    </SubPageLayout>
  );
}
