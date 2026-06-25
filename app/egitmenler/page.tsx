"use client";

import React, { useState } from "react";
import SubPageLayout from "@/components/Server/SubPageLayout";
import Link from "next/link";
import BorderedButton from "@/components/Server/BorderedButton";
import NavigateSVG from "@/components/SVGComponents/NavigateSVG";
import { motion, AnimatePresence } from "motion/react";

interface Instructor {
  name: string;
  role: string;
  bio: string;
  disciplines: string[];
  initial: string;
}

const INSTRUCTORS: Instructor[] = [
  {
    name: "Dr. Nilgün Metin",
    role: "Akupunktur & Tamamlayıcı Tıp Uzmanı",
    bio: "Geleneksel Çin Tıbbı, bütünsel kinesiyoloji ve meridyen terapileri üzerine uluslararası klinik tecrübeye sahip hekim. Bedenin kendi kendini iyileştirme gücünü harekete geçirme üzerine uzmanlaşmıştır.",
    disciplines: ["Meridyen Terapi"],
    initial: "N",
  },
  {
    name: "Nevşah F. Karamehmet",
    role: "Nefes Koçluğu & Mucizeler Kursu Kolaylaştırıcısı",
    bio: "20 yılı aşkın süredir nefes, meditasyon ve zihinsel dönüşüm metodolojileri üzerine çalışmalar yürüten, uluslararası enstitü kurucusu ve yazar. Doğal nefes akışını yeniden kazandırma üzerine odaklanır.",
    disciplines: ["Nefes Koçluğu", "Mucizeler Kursu"],
    initial: "K",
  },
  {
    name: "Cem Şen",
    role: "Reiki Master & Meditasyon Rehberi",
    bio: "Doğu disiplinleri, enerji bedeni çalışmaları ve geleneksel şifa yolları üzerine otuz yılı aşkın süredir eğitim alan ve öğreten kılavuz. Reiki ve geleneksel zihin sakinleştirme pratiklerine liderlik eder.",
    disciplines: ["Reiki"],
    initial: "Ş",
  },
  {
    name: "Hale Caneroğlu",
    role: "Bütünsel Gelişim & Yaşam Koçu",
    bio: "Bireylerin yaşam kalitesini artırmak, potansiyellerini açığa çıkarmak ve hedeflerine dengeli biçimde ulaşmalarını sağlamak amacıyla koçluk ve zihinsel dönüşüm seansları yönetmektedir.",
    disciplines: ["Yaşam Koçluğu"],
    initial: "C",
  },
  {
    name: "Dr. Bülent Uran",
    role: "Hipnoterapist & Psikoterapist",
    bio: "Bilinçaltı kalıpları, regresyon terapisi ve hipnotik trans teknikleriyle derin zihinsel tıkanıklıkların çözülmesinde uzman. Bütünsel şifalanmaya zihinsel düzeyde derinlik kazandırır.",
    disciplines: ["Hipnoterapi"],
    initial: "U",
  },
];

const CATEGORIES = [
  "Tüm Alanlar",
  "Meridyen Terapi",
  "Nefes Koçluğu",
  "Mucizeler Kursu",
  "Yaşam Koçluğu",
  "Hipnoterapi",
  "Reiki",
];

export default function EgitmenlerPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Tüm Alanlar");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filteredInstructors = INSTRUCTORS.filter((instructor) => {
    if (selectedCategory === "Tüm Alanlar") return true;
    return instructor.disciplines.includes(selectedCategory);
  });

  const toggleInstructor = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const padZero = (num: number) => (num < 9 ? `0${num + 1}` : `${num + 1}`);

  return (
    <SubPageLayout
      title="Eğitmenlerimiz"
      description="Yolculuğunuza eşlik eden, alanında derinleşmiş ve uluslararası sertifikalı rehber kadromuz."
    >
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Category Filters */}
        <div className="flex flex-wrap gap-4 pb-6 border-b border-[#ced1bf]/15 relative">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setOpenIndex(null); // Reset open accordion on category switch
              }}
              className={`relative pb-3 text-xs md:text-sm uppercase tracking-widest font-mono transition-all duration-300 cursor-pointer ${
                selectedCategory === cat
                  ? "text-[#ca7d57] font-medium"
                  : "text-[#ced1bf]/60 hover:text-white"
              }`}
            >
              {cat}
              {selectedCategory === cat && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#ca7d57]"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Instructors Directory */}
        <div className="border-t border-[#ced1bf]/15 divide-y divide-[#ced1bf]/15">
          {filteredInstructors.map((ins, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="py-6 md:py-8 transition-colors duration-300">
                <button
                  onClick={() => toggleInstructor(idx)}
                  className="w-full flex flex-col md:flex-row md:items-center justify-between text-left group cursor-pointer gap-4"
                  aria-expanded={isOpen}
                >
                  {/* Left Col: Space Mono index and disciplines */}
                  <div className="flex items-center gap-4 md:gap-6 min-w-[200px] mb-2 md:mb-0">
                    <span className="font-mono text-xs md:text-sm text-[#ca7d57]/60 group-hover:text-[#ca7d57] transition-colors duration-300 select-none">
                      {padZero(idx)}
                    </span>
                    <span className="font-mono text-2xs uppercase tracking-wider text-[#ced1bf]/40 group-hover:text-[#ced1bf]/60 transition-colors duration-300">
                      {ins.disciplines.join(" · ")}
                    </span>
                  </div>

                  {/* Middle Col: Name in Serif */}
                  <div className="flex-1 mb-2 md:mb-0">
                    <span className="font-serif font-light text-24 md:text-36 text-[#d1ccbf] group-hover:text-white transition-colors duration-300 tracking-wide block">
                      {ins.name}
                    </span>
                  </div>

                  {/* Right Col: Role / Title & Plus Icon */}
                  <div className="flex items-center justify-between md:justify-end gap-6 min-w-[320px] w-full md:w-auto">
                    <span className="text-2xs md:text-xs uppercase tracking-widest text-[#ca7d57] font-medium transition-colors duration-300">
                      {ins.role}
                    </span>

                    <span className="flex-shrink-0 flex items-center justify-center size-8 border border-[#ced1bf]/20 rounded-full group-hover:border-[#ca7d57] group-hover:bg-[#ca7d57]/10 transition-all duration-300">
                      <span
                        className={`text-base font-light text-[#ced1bf] group-hover:text-[#ca7d57] transform transition-transform duration-300 leading-none ${
                          isOpen ? "rotate-45" : ""
                        }`}
                      >
                        +
                      </span>
                    </span>
                  </div>
                </button>

                {/* Expanded Detail Box */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-8 pb-4">
                        {/* Left panel: Large background letter for typography aesthetic */}
                        <div className="hidden md:flex md:col-span-3 items-center justify-center relative select-none">
                          <span className="text-[120px] lg:text-[150px] font-serif font-light text-transparent [-webkit-text-stroke:1px_rgba(206,209,191,0.15)] leading-none select-none">
                            {ins.initial}
                          </span>
                        </div>

                        {/* Right panel: bio details and CTA */}
                        <div className="col-span-1 md:col-span-9 space-y-6">
                          <p className="text-sm md:text-base leading-relaxed text-[#ced1bf]/80 font-light max-w-2xl">
                            {ins.bio}
                          </p>

                          <div className="flex flex-wrap gap-2 pt-2">
                            <span className="text-2xs font-mono text-[#ced1bf]/40 uppercase tracking-widest block self-center mr-2">
                              Uzmanlık Alanları:
                            </span>
                            {ins.disciplines.map((d, i) => (
                              <span
                                key={i}
                                className="bg-[#ced1bf]/8 text-[#ced1bf]/70 text-xs px-2.5 py-1 rounded border border-[#ced1bf]/5"
                              >
                                {d}
                              </span>
                            ))}
                          </div>

                          <div className="pt-4">
                            <Link href="/#on-kayit">
                              <BorderedButton className="inline-flex cursor-pointer items-center gap-4 px-6 py-4 text-sm text-white [&_path]:[stroke:white] [&_svg]:[stroke:white]">
                                Görüşme Randevusu Al
                                <NavigateSVG fill="#FFFFFF" className="size-2.5 mr-2.5" />
                              </BorderedButton>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Quality Handoff Statement */}
        <div className="p-8 bg-[#ced1bf]/5 rounded border border-[#ced1bf]/10 text-center max-w-3xl mx-auto">
          <p className="text-sm md:text-base font-light text-[#ced1bf]/70 leading-relaxed">
            Tüm seanslarımız ve eğitim programlarımız, katılımcılarımızın fiziksel ve zihinsel durumuna göre kişiselleştirilir. İhtiyacınıza en uygun uzmanla ön görüşme yapmak için formu doldurabilirsiniz.
          </p>
        </div>
      </div>
    </SubPageLayout>
  );
}
