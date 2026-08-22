import type { Metadata } from "next";

// Bu segmentin sayfası bir client component ("use client") ve client component metadata
// export edemez. Next.js'in standart çözümü: metadata segment layout'unda durur.
export const metadata: Metadata = {
  title: "Eğitmenlerimiz | Yaşama Sanatı",
  description:
    "Nefes, meridyen terapi, reiki, hipnoterapi ve yaşam koçluğu alanlarında derinleşmiş rehber kadromuz.",
  alternates: { canonical: "/egitmenler" },
  openGraph: {
    title: "Eğitmenlerimiz | Yaşama Sanatı",
    description:
      "Nefes, meridyen terapi, reiki, hipnoterapi ve yaşam koçluğu alanlarında derinleşmiş rehber kadromuz.",
    url: "/egitmenler",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
