"use client";

import React, { useMemo, useState } from "react";
import heroImage from "@/public/SideBar/sss.jpg";
import SubPageLayout from "@/components/Server/SubPageLayout";
import Link from "next/link";
import BorderedButton from "@/components/Server/BorderedButton";
import NavigateSVG from "@/components/SVGComponents/NavigateSVG";
import TypographyLabel from "@/components/Server/TypographyLabel";
import { motion, AnimatePresence } from "motion/react";
import { consultationHref } from "@/utils/consultation-context";

import { FAQS, type FAQ } from "./faqs";
import { easing, duration } from "@/utils/motion/tokens";
import { ink } from "@/utils/palette";

/** Sorular, `faqs.ts` dizisindeki sıra korunarak kategoriye göre öbeklenir.
 *  Numaralandırma öbekler arasında SÜRMEZ SIFIRLANMAZ: 01'den 06'ya kadar tek
 *  bir belge gibi akar, öbek değişimi yalnız ayırıcıyla belli olur. */
function groupFaqs(faqs: FAQ[]) {
  const groups: { category: string; items: { faq: FAQ; index: number }[] }[] = [];
  faqs.forEach((faq, index) => {
    const last = groups[groups.length - 1];
    if (last && last.category === faq.category) last.items.push({ faq, index });
    else groups.push({ category: faq.category, items: [{ faq, index }] });
  });
  return groups;
}

export default function SSSPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const groups = useMemo(() => groupFaqs(FAQS), []);

  const toggleFAQ = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const padZero = (num: number) => (num < 9 ? `0${num + 1}` : `${num + 1}`);

  return (
    <SubPageLayout
      heroImage={heroImage}
      title="Sıkça Sorulan Sorular"
      description="Yaşama Sanatı Akademisi eğitimleri, seanslar ve kayıt süreçleri hakkında merak edilenler"
    >
      <div className="max-w-wide space-y-16">
        {/* KATEGORİ AYIRICILARI (docs/AWWWARDS-90-BLOCKERS.md plan 13).
            Sayfa altı soruluk tek bir düz akordeondu — "akordeon dışında hiçbir
            şey yok" denetim satırı buydu. Sorular karar anına göre ikiye ayrıldı:
            kayıttan önce sorulanlar, kayıttan sonrası. Ayırıcı sitenin kendi
            dilinde: Space Mono etiket + sağa uzanan saç teli. O saç teli aynı
            zamanda öbeğin üst kuralı, bu yüzden akordeon kabında ayrıca
            `border-t` yok — iki çizgi üst üste binmesin. */}
        <div className="space-y-14">
          {groups.map((group) => {
            const groupId = `sss-grup-${group.items[0].index}`;
            return (
              <section key={group.category} aria-labelledby={groupId}>
                <div className="flex items-center gap-6">
                  <h2 id={groupId}>
                    <TypographyLabel className="text-copper-text">
                      {group.category}
                    </TypographyLabel>
                  </h2>
                  <span aria-hidden className="h-px flex-1 bg-cream/15" />
                </div>

                <div className="divide-y divide-cream/15">
                  {group.items.map(({ faq, index }) => {
                    const isOpen = openIndex === index;
                    const panelId = `sss-cevap-${index}`;
                    return (
                      <div key={index} className="py-6 md:py-8">
                        <button
                          onClick={() => toggleFAQ(index)}
                          className="group flex w-full cursor-pointer items-center justify-between text-left"
                          aria-expanded={isOpen}
                          aria-controls={panelId}
                        >
                          <div className="flex flex-1 items-start gap-4 pr-4 md:gap-8">
                            {/* Space Mono indeksi */}
                            <span className="mt-1 shrink-0 font-mono text-xs text-copper-text/90 transition-colors duration-300 select-none group-hover:text-copper-text md:mt-1.5 md:text-sm">
                              {padZero(index)}
                            </span>
                            {/* Soru — serif */}
                            <span className="font-serif text-lg font-light tracking-wide text-cream transition-colors duration-300 group-hover:text-white md:text-24">
                              {faq.q}
                            </span>
                          </div>

                          {/* Dönen artı */}
                          <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-cream/20 transition-all duration-300 group-hover:border-copper group-hover:bg-copper/10">
                            <span
                              className={`transform text-base leading-none font-light text-cream transition-transform duration-300 group-hover:text-copper-text ${
                                isOpen ? "rotate-45" : ""
                              }`}
                            >
                              +
                            </span>
                          </span>
                        </button>

                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              id={panelId}
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{
                                duration: duration.quick,
                                ease: easing.accordion,
                              }}
                              className="overflow-hidden"
                            >
                              <div className="max-w-editorial pt-4 pb-2 pl-8 text-sm leading-relaxed font-light whitespace-pre-line text-cream/85 md:pl-12 md:text-base">
                                {faq.a}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>

        {/* Kapanış CTA'sı */}
        <div className="max-w-editorial space-y-6 border-t border-cream/15 pt-10">
          <h2 className="font-serif text-display-s leading-[1.08] font-normal text-white">
            Başka bir sorunuz mu var?
          </h2>
          <p className="text-sm leading-relaxed font-light text-cream/85 md:text-base">
            Eğitim programlarımız hakkında daha detaylı bilgi almak için ücretsiz
            ön görüşme talebi gönderebilirsiniz.
          </p>
          <div className="pt-4">
            <Link href={consultationHref({ from: "/sss" })}>
              <BorderedButton className="inline-flex cursor-pointer items-center gap-4 px-8 py-5 text-base text-white [&_path]:[stroke:white] [&_svg]:[stroke:white]">
                Görüşme Talebi Gönder
                <NavigateSVG fill={ink.white} className="mr-2.5 size-2.5" />
              </BorderedButton>
            </Link>
          </div>
        </div>
      </div>
    </SubPageLayout>
  );
}
