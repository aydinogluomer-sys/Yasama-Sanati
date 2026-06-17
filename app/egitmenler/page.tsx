"use client";

import React, { useState } from "react";
import SubPageLayout from "@/components/Server/SubPageLayout";
import Link from "next/link";
import BorderedButton from "@/components/Server/BorderedButton";
import NavigateSVG from "@/components/SVGComponents/NavigateSVG";

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

  const filteredInstructors = INSTRUCTORS.filter((instructor) => {
    if (selectedCategory === "Tüm Alanlar") return true;
    return instructor.disciplines.includes(selectedCategory);
  });

  return (
    <SubPageLayout
      title="Eğitmenlerimiz"
      description="Yolculuğunuza eşlik eden, alanında derinleşmiş ve uluslararası sertifikalı rehber kadromuz."
    >
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 pb-6 border-b border-[#ced1bf]/15">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2.5 rounded text-sm transition-all duration-300 border cursor-pointer ${
                selectedCategory === cat
                  ? "bg-[#ca7d57] border-[#ca7d57] text-white font-medium"
                  : "bg-[#ced1bf]/5 border-[#ced1bf]/10 text-[#ced1bf]/75 hover:bg-[#ced1bf]/10 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Instructors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredInstructors.map((ins, idx) => (
            <div
              key={idx}
              className="relative p-8 bg-[#30493D] rounded border border-[#ced1bf]/10 flex flex-col justify-between min-h-[360px] overflow-hidden group transition-all duration-500 hover:border-[#ced1bf]/20"
            >
              {/* Background Initial Letter for Editorial Aesthetic */}
              <div className="absolute -right-4 -bottom-10 text-[180px] font-light text-[#ced1bf]/3 select-none pointer-events-none group-hover:text-[#ced1bf]/5 transition-all duration-500 font-sans">
                {ins.initial}
              </div>

              <div className="space-y-6 relative z-10">
                <div className="space-y-2">
                  <h3 className="text-24 md:text-30 font-light text-white">
                    {ins.name}
                  </h3>
                  <p className="text-sm md:text-base text-[#ca7d57] uppercase tracking-wider font-medium">
                    {ins.role}
                  </p>
                </div>

                <p className="text-sm md:text-base font-light text-[#ced1bf]/85 leading-relaxed max-w-xl">
                  {ins.bio}
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {ins.disciplines.map((d, i) => (
                    <span
                      key={i}
                      className="bg-[#ced1bf]/10 text-[#ced1bf] text-xs px-2.5 py-1 rounded"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-8 relative z-10">
                <Link href="/#on-kayit">
                  <BorderedButton className="inline-flex cursor-pointer items-center gap-4 px-6 py-4 text-sm text-white [&_path]:[stroke:white] [&_svg]:[stroke:white]">
                    Görüşme Randevusu Al
                    <NavigateSVG fill="#FFFFFF" className="size-2.5 mr-2.5" />
                  </BorderedButton>
                </Link>
              </div>
            </div>
          ))}
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
