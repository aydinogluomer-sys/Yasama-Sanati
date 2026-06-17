import React from "react";
import Link from "next/link";
import SubPageLayout from "@/components/Server/SubPageLayout";
import BorderedButton from "@/components/Server/BorderedButton";
import NavigateSVG from "@/components/SVGComponents/NavigateSVG";

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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {programs.map((prog, i) => (
          <div
            key={i}
            className="flex flex-col justify-between p-8 bg-[#ced1bf]/5 rounded border border-[#ced1bf]/10 space-y-6 hover:border-[#ced1bf]/35 transition-colors duration-300"
          >
            <div className="space-y-4">
              <span className="text-xs text-[#ca7d57] font-medium tracking-widest uppercase">Program {i + 1}</span>
              <h2 className="text-24 md:text-30 font-light text-white leading-tight">{prog.title}</h2>
              <p className="text-sm md:text-base font-light leading-relaxed text-[#ced1bf]/70">{prog.desc}</p>
              
              <div className="pt-4 grid grid-cols-3 gap-4 border-t border-[#ced1bf]/10 text-xs text-[#ced1bf]/60 font-light">
                <div>
                  <div>Süre</div>
                  <div className="text-white mt-1">{prog.duration}</div>
                </div>
                <div>
                  <div>Format</div>
                  <div className="text-white mt-1">{prog.format}</div>
                </div>
                <div>
                  <div>Yatırım</div>
                  <div className="text-white mt-1">{prog.price}</div>
                </div>
              </div>
            </div>
            
            <div className="pt-4">
              <Link href={prog.href} className="w-full">
                <BorderedButton className="w-full cursor-pointer flex items-center justify-between px-6 py-4.5 text-sm font-light text-white [&_path]:[stroke:white] [&_svg]:[stroke:white]">
                  Programı İncele
                  <NavigateSVG fill="#FFFFFF" className="size-2.5 mr-2.5" />
                </BorderedButton>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </SubPageLayout>
  );
}
