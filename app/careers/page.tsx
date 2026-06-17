import React from "react";
import SubPageLayout from "@/components/Server/SubPageLayout";

export default function CareersPage() {
  return (
    <SubPageLayout
      title="Kariyer"
      description="Tutkunun Amaçla Buluştuğu Yer"
    >
      <div className="max-w-5xl mx-auto space-y-24">
        {/* Where Passion Meets Purpose */}
        <section className="space-y-8">
          <p className="text-lg md:text-xl font-light leading-relaxed text-[#ced1bf]/80">
            Her günün sakinlerimiz, misafirlerimiz ve ortaklarımızın yaşamlarında kalıcı etkiler yaratmak, sürdürülebilir bir yaşamı desteklemek ve anlamlı bağlar kurmak için bir fırsat olduğu bir ekibin parçası olduğunuzu hayal edin.
          </p>
          <p className="text-base font-light leading-relaxed text-[#ced1bf]/70">
            Biz Topluluğun gücüne inanıyoruz – her sesin önemli olduğu ve her katkının değer gördüğü bir yer. Burada, esenlik ve karşılıklı büyümeye dayalı, gelişen bir ortam oluşturmak için birlikte çalışırken, fikir ve görüşleriniz sadece duyulmakla kalmayacak, aynı zamanda kutlanacaktır. Gelecek nesillerin yaşamlarını zenginleştiren bir toplumsal uyum mirasını şekillendiriyoruz.
          </p>
        </section>

        {/* Job Opportunities */}
        <section className="space-y-12">
          <h2 className="text-3xl md:text-52 font-light text-white border-b border-[#ced1bf]/15 pb-4">
            Açık Pozisyonlar
          </h2>
          <p className="text-base font-light leading-relaxed text-[#ced1bf]/70">
            ELEMENTIS'e katılmak; tutku, amaç ve başkalarının hayatlarında yaratabileceğiniz derin etkiyle ilgilidir. Sürdürülebilirliğe bağlıysanız, iş birliği ve büyümeye değer veren bir dünyada iz bırakmak istiyorsanız, sizi bizimle bu olağanüstü yolculuğa çıkmaya davet ediyoruz.
          </p>
          
          <div className="mt-8 p-8 bg-[#ced1bf]/5 rounded border border-[#ced1bf]/10 space-y-6 md:flex md:items-center md:justify-between md:space-y-0">
            <div className="space-y-2">
              <span className="text-sm font-light text-[#ca7d57] uppercase tracking-widest">Yönetim Kurulu (Executive Committee)</span>
              <h3 className="text-2xl font-light text-white">Genel Müdür (General Manager)</h3>
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-light text-[#ced1bf]/60 pt-2">
                <div><strong>Konum:</strong> Ubud Bali, Endonezya</div>
                <div><strong>Tesis Adı:</strong> Neyra Ubud by ELEMENTIS</div>
              </div>
            </div>
            <div>
              <a
                href="mailto:careers@elementis.co"
                className="inline-block px-6 py-3 bg-[#ced1bf] text-[#2b3530] font-medium text-sm rounded hover:bg-[#b0b3a2] transition-colors text-center"
              >
                Başvuru Yap
              </a>
            </div>
          </div>
        </section>

        {/* Our Promise */}
        <section className="space-y-12 pb-12">
          <h2 className="text-3xl md:text-52 font-light text-white border-b border-[#ced1bf]/15 pb-4">
            Taahhüdümüz (Our Promise)
          </h2>
          <p className="text-base font-light leading-relaxed text-[#ced1bf]/80">
            En büyük değerimizin ekibimizin gücü ve yaratıcılığı olduğuna inanıyoruz. Taahhüdümüz; her bir bireyin kendini değerli, desteklenmiş ve elinden gelenin en iyisini yapmaya yetkili hissetmesini sağlama sözümüzdür.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
            {[
              "Her yeteneğin benzersiz bakış açılarını ve fikirlerini tanıyor ve kutluyoruz.",
              "İlişkileri besleyen, iş birliğini ve desteği teşvik eden bir Topluluk oluşturuyoruz.",
              "Tüm girişimlerimizde ve operasyonlarımızda çevre bilincine öncelik veriyoruz.",
              "Ekip üyelerimizin ve topluluğun esenliğini destekleyen bir ortam yaratıyoruz.",
              "Yaratıcılık kültürünü besliyor, yeni bakış açılarını ve dönüştürücü çözümleri teşvik ediyoruz.",
              "Yeteneklerimizi başkalarının ve gelecek nesillerin hayatlarında kalıcı farklar yaratmaları için güçlendiriyoruz.",
              "Kariyerinizi ilerletmeniz için öğrenme ve mesleki gelişim fırsatları sağlıyoruz.",
              "Yeteneklerimize yeni olasılıkları keşfetme ve statükoya meydan okuma konusunda cesur olmaları için ilham veriyoruz.",
              "Başarımızın anahtarı olarak ekip çalışmasına ve iş birliğine değer veriyoruz.",
              "Hedeflerimizi ortak bir sürdürülebilirlik ve topluluk katılımı vizyonuyla uyumlu hale getirerek, bir amaçla çalışmanızı sağlıyoruz."
            ].map((promise, i) => (
              <div key={i} className="p-4 bg-[#ced1bf]/5 rounded border border-[#ced1bf]/10 flex gap-4">
                <span className="text-[#ca7d57] font-medium text-lg">✓</span>
                <span className="text-base font-light text-[#ced1bf]/70 leading-relaxed">{promise}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </SubPageLayout>
  );
}
