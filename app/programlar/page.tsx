import React from "react";
import Link from "next/link";
import SubPageLayout from "@/components/Server/SubPageLayout";
import TypographyLabel from "@/components/Server/TypographyLabel";

const prependZero = (n: number) => (n < 10 ? `0${n}` : `${n}`);

export default function ProgramlarPage() {
  const programs = [
    {
      title: "Meridyen Terapi",
      desc: "Vücudun enerji kanallarını (meridyenler) dengeleme, blokajları kaldırma ve bütünsel şifa metodolojisi.",
      href: "/programlar/meridyen-terapi",
      duration: "8 Hafta",
      format: "Karma",
      price: "18.500 TL",
    },
    {
      title: "Nefes Koçluğu",
      desc: "Doğru nefes teknikleriyle zihinsel arınma, duygusal özgürleşme ve hücresel düzeyde canlanma.",
      href: "/programlar/nefes-koclugu",
      duration: "6 Hafta",
      format: "Online / Canlı",
      price: "15.000 TL",
    },
    {
      title: "Mucizeler Kursu",
      desc: "Korkudan sevgiye geçişi, zihinsel arınmayı ve evrensel spiritüel uyanışı hedefleyen yıllık çalışma grubu.",
      href: "/programlar/mucizeler-kursu",
      duration: "1 Yıl",
      format: "Online / Canlı",
      price: "12.000 TL",
    },
    {
      title: "Yaşam Koçluğu",
      desc: "Bireysel potansiyeli keşfetme, etkin iletişim, hedef yönetimi ve uluslararası standartlarda koçluk sertifikasyonu.",
      href: "/programlar/yasam-kocu",
      duration: "10 Hafta",
      format: "Online / Canlı",
      price: "16.000 TL",
    },
    {
      title: "Hipnoterapi",
      desc: "Bilinçaltı kalıplarını dönüştürme, hipnotik dil ve telkin teknikleriyle derin gelişim uzmanlığı.",
      href: "/programlar/hipnoterapi",
      duration: "8 Hafta",
      format: "Online / Canlı",
      price: "16.500 TL",
    },
    {
      title: "Reiki",
      desc: "Evrensel yaşam enerjisi (Ki) kanallarını açma, çakra dengeleme ve ellerle şifa aktarma dereceleri.",
      href: "/programlar/reiki",
      duration: "4 Hafta",
      format: "Karma",
      price: "9.000 TL",
    },
  ];

  return (
    <SubPageLayout
      title="Eğitim Programları"
      description="Uluslararası akredite sertifika programları ve uzmanlık eğitimleri ile dönüşüm yolculuğunuzu başlatın."
    >
      {/* Intercom-style academy index: numbered chapters, fine rules, structured hierarchy. */}
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between pb-5">
          <TypographyLabel className="text-[#E09A6C]">Program Dizini</TypographyLabel>
          <TypographyLabel className="text-[#ced1bf]/50">
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
                  <p className="text-sm font-light leading-relaxed text-[#ced1bf]/70 md:text-base">
                    {prog.desc}
                  </p>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-1">
                    <TypographyLabel className="text-[#ced1bf]/55">{prog.duration}</TypographyLabel>
                    <span aria-hidden className="size-1 rounded-full bg-[#ca7d57]/60" />
                    <TypographyLabel className="text-[#ced1bf]/55">{prog.format}</TypographyLabel>
                    <span aria-hidden className="size-1 rounded-full bg-[#ca7d57]/60" />
                    <TypographyLabel className="text-[#ced1bf]/55">{prog.price}</TypographyLabel>
                  </div>
                </div>

                <span className="flex items-center gap-2 self-center text-[#ced1bf]/70 transition-colors duration-300 group-hover:text-white">
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
