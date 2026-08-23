import type { Metadata } from "next";
import heroImage from "@/public/SideBar/programlar.jpg";
import React from "react";
import Link from "next/link";
import SubPageLayout from "@/components/Server/SubPageLayout";
import TypographyLabel from "@/components/Server/TypographyLabel";

const prependZero = (n: number) => (n < 10 ? `0${n}` : `${n}`);

export const metadata: Metadata = {
  title: "Eğitim Programları | Yaşama Sanatı",
  description:
    "Nefes Koçluğu, Reiki, Meridyen Terapi, Mucizeler Kursu, Hipnoterapi ve Yaşam Koçluğu sertifika programları.",
  alternates: { canonical: "/programlar" },
  openGraph: {
    title: "Eğitim Programları | Yaşama Sanatı",
    description:
      "Nefes Koçluğu, Reiki, Meridyen Terapi, Mucizeler Kursu, Hipnoterapi ve Yaşam Koçluğu sertifika programları.",
    url: "/programlar",
  },
};

export default function ProgramlarPage() {
  const programs = [
    {
      title: "Meridyen Terapi",
      desc: "Geleneksel öğretide meridyen olarak adlandırılan enerji kanalları ve bütünsel kinesiyoloji üzerine uzmanlık eğitimi.",
      href: "/programlar/meridyen-terapi",
      duration: "8 Hafta",
      format: "Karma",
    },
    {
      title: "Nefes Koçluğu",
      desc: "Doğru nefes teknikleriyle zihinsel berraklık, duygusal denge ve daha derin bir nefes kapasitesi.",
      href: "/programlar/nefes-koclugu",
      duration: "6 Hafta",
      format: "Online / Canlı",
    },
    {
      title: "Mucizeler Kursu",
      desc: "Korkudan sevgiye geçişi, zihinsel arınmayı ve evrensel spiritüel uyanışı hedefleyen yıllık çalışma grubu.",
      href: "/programlar/mucizeler-kursu",
      duration: "1 Yıl",
      format: "Online / Canlı",
    },
    {
      title: "Yaşam Koçluğu",
      desc: "Bireysel potansiyeli keşfetme, etkin iletişim, hedef yönetimi ve profesyonel koçluk sertifikasyonu.",
      href: "/programlar/yasam-kocu",
      duration: "10 Hafta",
      format: "Online / Canlı",
    },
    {
      title: "Hipnoterapi",
      desc: "Bilinçaltı kalıplarını dönüştürme, hipnotik dil ve telkin teknikleriyle derin gelişim uzmanlığı.",
      href: "/programlar/hipnoterapi",
      duration: "8 Hafta",
      format: "Online / Canlı",
    },
    {
      title: "Reiki",
      desc: "Usui geleneğinde enerji çalışmasının aşamaları; uyumlanma, el pozisyonları ve uygulama pratiği.",
      href: "/programlar/reiki",
      duration: "4 Hafta",
      format: "Karma",
    },
  ];

  return (
    <SubPageLayout
      heroImage={heroImage}
      title="Eğitim Programları"
      description="Sertifika programları ve uzmanlık eğitimleri ile dönüşüm yolculuğunuzu başlatın."
    >
      {/* Intercom-style academy index: numbered chapters, fine rules, structured hierarchy. */}
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between pb-5">
          <TypographyLabel className="text-[#E09A6C]">Program Dizini</TypographyLabel>
          <TypographyLabel className="text-[#ced1bf]/85">
            {prependZero(programs.length)} Disiplin
          </TypographyLabel>
        </div>

        <ul className="border-t border-[#ced1bf]/15">
          {programs.map((prog, i) => (
            <li key={i}>
              <Link
                href={prog.href}
                className="group grid grid-cols-1 gap-x-8 gap-y-5 border-b border-[#ced1bf]/15 py-9 transition-colors duration-300 hover:bg-[#ced1bf]/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] md:grid-cols-[3.5rem_1fr_auto] md:items-baseline md:px-3 md:py-11"
              >
                <TypographyLabel className="text-[#E09A6C] md:pt-2">
                  {prependZero(i + 1)}
                </TypographyLabel>

                <div className="space-y-3 md:max-w-2xl">
                  <h2 className="font-serif text-display-s font-normal leading-[1.05] tracking-[-0.01em] text-white transition-colors duration-300 group-hover:text-[#E0A878]">
                    {prog.title}
                  </h2>
                  <p className="text-sm font-light leading-relaxed text-[#ced1bf]/85 md:text-base">
                    {prog.desc}
                  </p>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-1">
                    <TypographyLabel className="text-[#ced1bf]/85">{prog.duration}</TypographyLabel>
                    <span aria-hidden className="size-1 rounded-full bg-[#ca7d57]/60" />
                    <TypographyLabel className="text-[#ced1bf]/85">{prog.format}</TypographyLabel>
                  </div>
                </div>

                <span className="flex items-center gap-2 self-center text-[#ced1bf]/85 transition-colors duration-300 group-hover:text-white">
                  <TypographyLabel className="hidden md:inline">İncele</TypographyLabel>
                  <span
                    aria-hidden
                    className="text-lg transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </SubPageLayout>
  );
}
