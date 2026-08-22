import type { Metadata } from "next";
import { FaqSchema } from "@/components/Server/StructuredData";
import { FAQS } from "./faqs";

// Bu segmentin sayfası bir client component ("use client") ve client component metadata
// export edemez. Next.js'in standart çözümü: metadata segment layout'unda durur.
export const metadata: Metadata = {
  title: "Sıkça Sorulan Sorular | Yaşama Sanatı",
  description:
    "Ön görüşme süreci, eğitim formatları, sertifikasyon ve ödeme hakkında en çok sorulan sorular.",
  alternates: { canonical: "/sss" },
  openGraph: {
    title: "Sıkça Sorulan Sorular | Yaşama Sanatı",
    description:
      "Ön görüşme süreci, eğitim formatları, sertifikasyon ve ödeme hakkında en çok sorulan sorular.",
    url: "/sss",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  // Şema yalnızca sayfada görünen soruları taşır; kaynak aynı diziden gelir, bu yüzden
  // sayfa metni ile şema bir daha ayrışamaz.
  return (
    <>
      <FaqSchema items={FAQS} />
      {children}
    </>
  );
}
