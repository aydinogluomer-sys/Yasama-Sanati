"use client";

import React, { useState } from "react";
import SubPageLayout from "@/components/Server/SubPageLayout";
import Link from "next/link";
import BorderedButton from "@/components/Server/BorderedButton";
import NavigateSVG from "@/components/SVGComponents/NavigateSVG";
import { motion, AnimatePresence } from "motion/react";

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
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const padZero = (num: number) => (num < 9 ? `0${num + 1}` : `${num + 1}`);

  return (
    <SubPageLayout
      title="Sıkça Sorulan Sorular"
      description="Yaşama Sanatı Akademisi eğitimleri, seanslar ve kayıt süreçleri hakkında merak edilenler"
    >
      <div className="max-w-4xl mx-auto space-y-16">
        {/* Accordion Container */}
        <div className="border-t border-[#ced1bf]/15 divide-y divide-[#ced1bf]/15">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="py-6 md:py-8">
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full flex items-center justify-between text-left group cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-start gap-4 md:gap-8 flex-1 pr-4">
                    {/* Space Mono Index */}
                    <span className="font-mono text-xs md:text-sm text-[#ca7d57]/60 group-hover:text-[#ca7d57] transition-colors duration-300 mt-1 md:mt-1.5 select-none">
                      {padZero(idx)}
                    </span>
                    {/* Question Title in Serif */}
                    <span className="font-serif font-light text-lg md:text-24 text-[#d1ccbf] group-hover:text-white transition-colors duration-300 tracking-wide">
                      {faq.q}
                    </span>
                  </div>

                  {/* Rotating Action Circle */}
                  <span className="flex-shrink-0 flex items-center justify-center size-8 border border-[#ced1bf]/20 rounded-full group-hover:border-[#ca7d57] group-hover:bg-[#ca7d57]/10 transition-all duration-300">
                    <span
                      className={`text-base font-light text-[#ced1bf] group-hover:text-[#ca7d57] transform transition-transform duration-300 leading-none ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </span>
                </button>

                {/* Answer Box */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pl-8 md:pl-12 pt-4 pb-2 text-sm md:text-base leading-relaxed text-[#ced1bf]/70 font-light whitespace-pre-line max-w-3xl">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
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
