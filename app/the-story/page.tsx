import React from "react";
import SubPageLayout from "@/components/Server/SubPageLayout";
import TherapyScene3DWrapper from "@/components/Client/TherapyScene3DWrapper";

export default function TheStoryPage() {
  return (
    <SubPageLayout
      title="Hikayemiz"
      description="Zihinsel, bedensel ve enerjetik dönüşüm için kadim bilgelik ve modern bilim sentezi"
    >
      <div className="max-w-5xl mx-auto space-y-24">
        {/* Our Vision Section */}
        <section className="space-y-12">
          <h2 className="text-3xl md:text-52 font-light text-white border-b border-[#ced1bf]/15 pb-4">
            Vizyonumuz ve Yaklaşımımız
          </h2>
          <p className="text-lg md:text-xl font-light leading-relaxed text-[#ced1bf]/80">
            Yaşama Sanatı Akademisi, insanın özündeki dengeye dönmesinin bir teknikten ziyade bir yaşam sanatı olduğu felsefesiyle kuruldu. Nefes, enerji meridyenleri, bilinçaltı dönüşüm pratikleri ve kadim öğretileri tek bir çatı altında birleştirerek, bireylerin kendi kendilerini iyileştirme ve yaşamlarını tam potansiyeliyle yaşama becerilerini geliştirmeyi amaçlıyoruz.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="p-6 bg-[#ced1bf]/5 rounded border border-[#ced1bf]/10 space-y-4">
              <h3 className="text-xl font-medium text-white">Kadim Bilgelik</h3>
              <p className="text-base font-light leading-relaxed text-[#ced1bf]/70">
                Geleneksel Çin Tıbbı, meridyen hatları, reiki ve enerji bedeni teorileri gibi binlerce yıllık deneyimlerden süzülen kadim öğretileri temel alıyoruz. Uygulamalarımızı aslına sadık kalarak, en duru haliyle öğretiyoruz.
              </p>
            </div>
            
            <div className="p-6 bg-[#ced1bf]/5 rounded border border-[#ced1bf]/10 space-y-4">
              <h3 className="text-xl font-medium text-white">Çağdaş Entegrasyon</h3>
              <p className="text-base font-light leading-relaxed text-[#ced1bf]/70">
                Kadim pratikleri bütünsel kinesiyoloji, modern nefes bilimleri, koçluk metodolojileri ve klinik hipnoterapi teknikleriyle birleştirerek rasyonel, ölçülebilir ve günlük yaşama entegre edilebilir kılavuzlar sunuyoruz.
              </p>
            </div>
            
            <div className="p-6 bg-[#ced1bf]/5 rounded border border-[#ced1bf]/10 space-y-4">
              <h3 className="text-xl font-medium text-white">Destekleyici Alan</h3>
              <p className="text-base font-light leading-relaxed text-[#ced1bf]/70">
                Katılımcılarımızın kendilerini güvende, yargısız ve samimi bir ortamda hissetmeleri önceliğimizdir. Eğitim sonrasındaki süpervizyonlar ve paylaşım çemberleri ile kalıcı bir yol arkadaşlığı sağlıyoruz.
              </p>
            </div>
            
            <div className="p-6 bg-[#ced1bf]/5 rounded border border-[#ced1bf]/10 space-y-4">
              <h3 className="text-xl font-medium text-white">Sertifikalı Dönüşüm</h3>
              <p className="text-base font-light leading-relaxed text-[#ced1bf]/70">
                Sadece kişisel dönüşüm sunmakla kalmıyor, uluslararası akreditasyon ortaklıklarımız sayesinde bu pratikleri meslek haline getirmek veya mevcut terapistlik yetkinliklerini artırmak isteyenlere resmi sertifikasyon sağlıyoruz.
              </p>
            </div>
          </div>
        </section>

        {/* Interactive 3D Therapy Scene */}
        <section className="space-y-12">
          <TherapyScene3DWrapper />
        </section>

        {/* Guiding Team Section */}
        <section className="space-y-12">
          <h2 className="text-3xl md:text-52 font-light text-white border-b border-[#ced1bf]/15 pb-4">
            Rehber Kadromuz
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center md:text-left">
            {[
              { name: "Nevşah F. Karamehmet", role: "Kurucu & Nefes Enstitüsü Başkanı" },
              { name: "Dr. Nilgün Metin", role: "Kurucu Ortak & Tıbbi Bütünsel Koordinatör" },
              { name: "Cem Şen", role: "Eğitim Stratejileri ve Enerji Çalışmaları Rehberi" },
              { name: "Hale Caneroğlu", role: "Bütünsel Gelişim & Yaşam Koçluğu Koordinatörü" },
              { name: "Dr. Bülent Uran", role: "Bilinçaltı & Hipnoterapi Çalışmaları Danışmanı" }
            ].map((member, i) => (
              <div key={i} className="p-6 bg-[#ced1bf]/5 rounded border border-[#ced1bf]/10 space-y-2">
                <div className="size-16 bg-[#ced1bf]/10 rounded-full mx-auto md:mx-0 flex items-center justify-center text-white font-medium text-xl">
                  {member.name[0]}
                </div>
                <h3 className="text-lg font-medium text-white pt-2">{member.name}</h3>
                <p className="text-sm font-light text-[#ced1bf]/60">{member.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Academic & Certification Partners Section */}
        <section className="space-y-12 pb-12">
          <h2 className="text-3xl md:text-52 font-light text-white border-b border-[#ced1bf]/15 pb-4">
            Akreditasyon ve Çözüm Ortaklarımız
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              { name: "IECCERT", role: "Uluslararası Enerji ve Tamamlayıcı Tıp Sertifikasyonu" },
              { name: "Matlas Akademi", role: "Klinik Kinesiyoloji ve Uygulama Partneri" },
              { name: "Nevsah Enstitü", role: "Nefes ve Zihinsel Dönüşüm Bilimsel Araştırma Ortağı" }
            ].map((partner, i) => (
              <div key={i} className="p-6 bg-[#ced1bf]/5 rounded border border-[#ced1bf]/10 space-y-2 text-center md:text-left">
                <h3 className="text-lg font-medium text-white">{partner.name}</h3>
                <p className="text-sm font-light text-[#ced1bf]/60">{partner.role}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </SubPageLayout>
  );
}
