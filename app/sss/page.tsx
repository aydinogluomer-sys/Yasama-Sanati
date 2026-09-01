"use client";

import React, { useState } from "react";
import heroImage from "@/public/SideBar/sss.jpg";
import SubPageLayout from "@/components/Server/SubPageLayout";
import Link from "next/link";
import BorderedButton from "@/components/Server/BorderedButton";
import NavigateSVG from "@/components/SVGComponents/NavigateSVG";
import { motion, AnimatePresence } from "motion/react";
import { consultationHref } from "@/utils/consultation-context";

import { FAQS } from "./faqs";
import { easing, duration } from "@/utils/motion/tokens";

export default function SSSPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
        {/* Accordion Container */}
        <div className="border-t border-cream/15 divide-y divide-cream/15">
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
                    <span className="font-mono text-xs md:text-sm text-[var(--accent-copper-on-dark)]/90 group-hover:text-[var(--accent-copper-on-dark)] transition-colors duration-300 mt-1 md:mt-1.5 select-none">
                      {padZero(idx)}
                    </span>
                    {/* Question Title in Serif */}
                    <span className="font-serif font-light text-lg md:text-24 text-cream group-hover:text-white transition-colors duration-300 tracking-wide">
                      {faq.q}
                    </span>
                  </div>

                  {/* Rotating Action Circle */}
                  <span className="flex-shrink-0 flex items-center justify-center size-8 border border-cream/20 rounded-full group-hover:border-copper group-hover:bg-copper/10 transition-all duration-300">
                    <span
                      className={`text-base font-light text-cream group-hover:text-[var(--accent-copper-on-dark)] transform transition-transform duration-300 leading-none ${
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
                      transition={{ duration: duration.quick, ease: easing.accordion }}
                      className="overflow-hidden"
                    >
                      <div className="pl-8 md:pl-12 pt-4 pb-2 text-sm md:text-base leading-relaxed text-cream/85 font-light whitespace-pre-line max-w-3xl">
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
        <div className="max-w-editorial space-y-6 border-t border-cream/15 pt-10">
          <h3 className="font-serif text-display-s font-normal leading-[1.08] text-white">
            Başka bir sorunuz mu var?
          </h3>
          <p className="text-sm md:text-base font-light text-cream/85 leading-relaxed">
            Eğitim programlarımız hakkında daha detaylı bilgi almak için ücretsiz ön görüşme talebi gönderebilirsiniz.
          </p>
          <div className="pt-4">
            <Link href={consultationHref({ from: "/sss" })}>
              <BorderedButton className="inline-flex cursor-pointer items-center gap-4 px-8 py-5 text-base text-white [&_path]:[stroke:white] [&_svg]:[stroke:white]">
                Görüşme Talebi Gönder
                <NavigateSVG fill="#FFFFFF" className="size-2.5 mr-2.5" />
              </BorderedButton>
            </Link>
          </div>
        </div>
      </div>
    </SubPageLayout>
  );
}
