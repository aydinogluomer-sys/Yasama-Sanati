import React from "react";
import SubPageLayout from "@/components/Server/SubPageLayout";
import Link from "next/link";
import BorderedButton from "@/components/Server/BorderedButton";
import NavigateSVG from "@/components/SVGComponents/NavigateSVG";

interface FAQ {
  q: string;
  a: string;
}

const FAQS: FAQ[] = [
  {
    q: "Eğitim programlarına katılmak için bir ön koşul var mıdır?",
    a: "Eğitimlerimizin büyük çoğunluğu başlangıç seviyesinden başladığı için herhangi bir ön koşul aranmamaktadır. Ancak ileri seviye modüller veya uzmanlık programları için ilgili giriş eğitimini tamamlamış olmanız gerekebilir. Detaylar her eğitimin kendi sayfasında açıkça belirtilmiştir.",
  },
  {
    q: "Ön görüşme süreci nasıl işler ve ücretli midir?",
    a: "Sitemizdeki form üzerinden ön kayıt bıraktığınızda, eğitim koordinatörlerimiz 48 saat içinde sizinle iletişime geçer. Bu görüşme tamamen ücretsizdir. Amacımız, ilgi duyduğunuz alanları analiz etmek, sorularınızı yanıtlamak ve size en uygun çalışma temposunu (birebir seans veya grup programı) birlikte kararlaştırmaktır.",
  },
  {
    q: "Sertifikalarınız uluslararası geçerliliğe sahip midir?",
    a: "Evet. Özellikle Meridyen Terapisi gibi uzmanlık programlarımız IECCERT (International Energy & Complementary Medicine Certification) onaylıdır. Eğitimleri ve pratik sınavları başarıyla tamamlayan katılımcılarımıza uluslararası geçerliliği olan İngilizce uzmanlık belgesi sunulmaktadır.",
  },
  {
    q: "Eğitimler online mı yoksa yüz yüze mi gerçekleşiyor?",
    a: "Programlarımızın yapısına göre formatlar değişkenlik gösterir. Örneğin, Mucizeler Kursu tamamen çevrimiçi (online) olarak Zoom üzerinden yürütülürken; Meridyen Terapi ve Nefes Koçluğu gibi fiziksel uygulama gerektiren eğitimler, online teorik dersler ve yüz yüze yoğun pratik atölye çalışmaları (workshop) içeren karma (hibrit) bir formatta düzenlenir.",
  },
  {
    q: "Ödeme seçenekleri ve taksit imkanı var mı?",
    a: "Akademimizde şeffaf fiyatlandırma politikası uygulanmaktadır. Tüm eğitimlerin fiyatları detay sayfalarında listelenmiştir. Anlaşmalı bankaların kredi kartlarına 3, 6 veya 12 aya varan taksit seçenekleri mevcuttur. Havale / EFT ile yapılan peşin ödemelerde ise özel indirimler uygulanmaktadır.",
  },
  {
    q: "Eğitimlerin ardından süpervizyon veya mentorluk desteği veriyor musunuz?",
    a: "Kesinlikle. Sertifikalı uzmanlık eğitimlerimizin ardından katılımcılarımızı yalnız bırakmıyoruz. Belirli aralıklarla düzenlenen süpervizyon çemberleri, vaka analizi toplantıları ve topluluk içi grup paylaşımları ile pratik yetkinliğinizi pekiştirmenize ve profesyonel hayata adım atmanıza destek oluyoruz.",
  },
];

export default function SSSPage() {
  return (
    <SubPageLayout
      title="Sıkça Sorulan Sorular"
      description="Yaşama Sanatı Akademisi eğitimleri, seanslar ve kayıt süreçleri hakkında merak edilenler"
    >
      <div className="max-w-4xl mx-auto space-y-16">
        <div className="space-y-8">
          {FAQS.map((faq, idx) => (
            <div
              key={idx}
              className="p-6 md:p-8 bg-[#30493D] rounded border border-[#ced1bf]/10 space-y-3"
            >
              <h3 className="text-lg md:text-xl font-medium text-white">
                {faq.q}
              </h3>
              <p className="text-sm md:text-base font-light text-[#ced1bf]/75 leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>

        {/* Call to action card */}
        <div className="p-8 bg-[#ced1bf]/5 rounded border border-[#ced1bf]/10 text-center space-y-6 max-w-2xl mx-auto">
          <h3 className="text-xl md:text-2xl font-light text-white">
            Başka bir sorunuz mu var?
          </h3>
          <p className="text-sm md:text-base font-light text-[#ced1bf]/70 leading-relaxed">
            Eğitim programlarımız veya size özel çözümlerimiz hakkında daha detaylı bilgi almak için hemen ücretsiz ön görüşme randevusu oluşturabilirsiniz.
          </p>
          <div className="pt-4">
            <Link href="/#on-kayit">
              <BorderedButton className="inline-flex cursor-pointer items-center gap-4 px-8 py-5 text-base text-white [&_path]:[stroke:white] [&_svg]:[stroke:white]">
                Bizimle İletişime Geçin
                <NavigateSVG fill="#FFFFFF" className="size-2.5 mr-2.5" />
              </BorderedButton>
            </Link>
          </div>
        </div>
      </div>
    </SubPageLayout>
  );
}
