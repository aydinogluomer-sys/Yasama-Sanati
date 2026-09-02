import type { Metadata } from "next";
import localFont from "next/font/local";
import { Space_Mono } from "next/font/google";
import "./globals.css";
import { WindowSizeProvider } from "./providers";
import { MotionConfig } from "motion/react";
import AccessibleLenis from "@/components/Client/AccessibleLenis";
import { OrganizationSchema } from "@/components/Server/StructuredData";

/*
 * YEREL FONTLAR ALT KÜMELENDİ (bundle işi, 2026-09-02).
 *
 * `app/fonts/*.woff2` artık ALT KÜME dosyalarıdır; orijinalleri
 * `app/fonts/original/` altında duruyor (referans verilmediği için paketlenmez).
 *
 * Neden: tel üzerindeki transfer ölçülünce fontların **190 KB** ile en büyük
 * ikinci kalem olduğu görüldü. woff2 zaten sıkıştırılmıştır, yani gzip onlara
 * hiçbir şey kazandırmıyor — JS 690 KB "görünürken" tel üzerinde 213 KB'a
 * iniyor, fontlar ise 190 KB olarak kalıyor.
 *
 * Alt küme aralıkları (tahmin değil, ölçüm): 21 rotanın tamamının metni
 * taranarak sitede fiilen kullanılan 100 karakter çıkarıldı, sonra güvenlik
 * payıyla şu aralıklar tutuldu:
 *   U+0020-007E  Temel Latin
 *   U+00A0-00FF  Latin-1 (ÇÖÜçöü ×  ° ©)
 *   U+0100-017F  Latin Genişletilmiş-A (ĞğİıŞş — Türkçe için şart)
 *   U+2000-206F  Genel noktalama (— ’ •)
 *   U+2190-21FF  Oklar (← ↑ →)
 *   U+2726       ✦
 * OpenType özellikleri korundu: kern, liga, clig, calt, tnum, onum.
 *
 * Doğrulandı: alt kümeler, kullanılan karakter kümesinde orijinallerin sahip
 * olduğu HİÇBİR glifi kaybetmiyor. (✦ ve Ogg'daki oklar zaten orijinallerde de
 * yoktu; tarayıcı onlar için hep yedeğe düşüyordu.)
 *
 * Sonuç: 172 KB -> 105 KB, yani tel üzerinde 67 KB kazanç.
 *
 * Yeniden üretmek için (fontTools gerekir):
 *   python -m fontTools.subset app/fonts/original/<ad>.woff2  *     --unicodes="U+0020-007E,U+00A0-00FF,U+0100-017F,U+2000-206F,U+2190-21FF,U+2726"  *     --layout-features="kern,liga,clig,calt,tnum,onum"  *     --flavor=woff2 --output-file=app/fonts/<ad>.woff2
 *
 * LİSANS NOTU: alt kümeleme türev font dosyası üretir. Web font lisansları
 * genellikle performans amaçlı alt kümelemeye izin verir ama bu depoda Ogg'un
 * lisansı zaten açık bir madde (D041). Sözleşmeler doğrulanmalı.
 */
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
