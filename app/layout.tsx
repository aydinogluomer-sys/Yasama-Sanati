import type { Metadata } from "next";
import localFont from "next/font/local";
import { Space_Mono } from "next/font/google";
import "./globals.css";
import { WindowSizeProvider } from "./providers";
import { MotionConfig } from "motion/react";
import AccessibleLenis from "@/components/Client/AccessibleLenis";
import { OrganizationSchema } from "@/components/Server/StructuredData";

const basisGrotesque = localFont({
  src: [
    { path: "./fonts/BasisGrotesquePro-Light.woff2", weight: "300", style: "normal" },
    { path: "./fonts/BasisGrotesquePro-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/BasisGrotesquePro-Medium.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-grotesque",
  // CLS hardening: swap immediately and adjust the metrics of a real fallback so the swap doesn't jump.
  display: "swap",
  fallback: ["system-ui", "-apple-system", "Segoe UI", "Arial", "sans-serif"],
  adjustFontFallback: "Arial",
});

// Micro-label voice (Phase 2): 01/02 indices, dates, coordinates, scroll cues. Micro use only.
const spaceMono = Space_Mono({
  subsets: ["latin", "latin-ext"],
  // 700 KALDIRILDI (Faz 4). Tarandı: `font-mono` taşıyan hiçbir className bold
  // istemiyordu; tek istisna 3D meridyen sahnesindeki 8px'lik bir etiketti ve o
  // da `font-medium`a çekildi. 700 ağırlığı iki subset x bir ağırlık = 2 woff2
  // dosyası demekti ve HER sayfada indiriliyordu — oysa onu talep eden tek öge
  // yalnız /programlar/meridyen-terapi'de, üstelik dinamik yüklenen bir sahnede.
  weight: ["400"],
  variable: "--font-space-mono",
});

const ogg = localFont({
  src: [
    { path: "./fonts/Ogg-Roman.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Ogg-Italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-serif",
  display: "swap",
});

const siteDescription =
  "Nefes Koçluğu, Reiki, Meridyen Terapi, Mucizeler Kursu, Hipnoterapi ve Yaşam Koçluğu sertifika programları.";

export const metadata: Metadata = {
  metadataBase: new URL("https://yasamasanati.com"),
  title: "Yaşama Sanatı — Bütünsel Şifa ve Eğitim Akademisi",
  description: siteDescription,
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: "Yaşama Sanatı",
    title: "Yaşama Sanatı — Bütünsel Şifa ve Eğitim Akademisi",
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: "Yaşama Sanatı — Bütünsel Şifa ve Eğitim Akademisi",
    description: siteDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`${basisGrotesque.variable} ${spaceMono.variable} ${ogg.variable} overflow-x-clip antialiased selection:bg-cream selection:text-deep`}
      >
        <OrganizationSchema />
        <a className="skip-link" href="#main-content">
          Ana içeriğe geç
        </a>
        <AccessibleLenis>
          <WindowSizeProvider>
            <MotionConfig reducedMotion="user">
              <div>{children}</div>
            </MotionConfig>
          </WindowSizeProvider>
        </AccessibleLenis>
      </body>
    </html>
  );
}
