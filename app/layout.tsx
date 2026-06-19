import type { Metadata } from "next";
import localFont from "next/font/local";
import { Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { ReactLenis } from "@/utils/lenis";
import { WindowSizeProvider } from "./providers";
import { MotionConfig } from "motion/react";

const basisGrotesque = localFont({
  src: [
    { path: "./fonts/BasisGrotesquePro-Light.woff2", weight: "300", style: "normal" },
    { path: "./fonts/BasisGrotesquePro-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/BasisGrotesquePro-Medium.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-grotesque",
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "Yaşama Sanatı — Bütünsel Şifa ve Eğitim Akademisi",
  description: "Nefes Koçluğu, Reiki, Meridyen Terapi, Mucizeler Kursu, Hipnoterapi ve Yaşam Koçluğu uluslararası akredite sertifika programları.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`${basisGrotesque.variable} ${cormorantGaramond.variable} overflow-x-clip antialiased selection:bg-[#ced1bf] selection:text-[#2b3530]`}
      >
        <ReactLenis root>
          <WindowSizeProvider>
            <MotionConfig reducedMotion="user">
              {children}
            </MotionConfig>
          </WindowSizeProvider>
        </ReactLenis>
      </body>
    </html>
  );
}
