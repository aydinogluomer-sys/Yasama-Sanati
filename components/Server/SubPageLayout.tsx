import React, { ReactNode } from "react";
import type { StaticImageData } from "next/image";
import NavBar from "@/components/Client/NavBar";
import SubPageHeroMedia from "@/components/Client/SubPageHeroMedia";
import Footer from "@/sections/Footer/Server";
import ScrollRevealBridge from "@/components/Client/ScrollRevealBridge";

interface SubPageLayoutProps {
  title: string;
  description?: string;
  children: ReactNode;
  noPadding?: boolean;
  heroFullScreen?: boolean;
  /** Skip the big section hero so the page content itself leads (e.g. a blog article). */
  hideHero?: boolean;
  /**
   * Hero arkasına tam genişlik görsel. Verilmezse eski düz zemin korunur —
   * hukuki sayfalar gibi görsel istemeyen yerler için.
   */
  heroImage?: StaticImageData;
  /** Görsel sayfanın konusunu anlatıyorsa alt metni; salt dekoratifse "" bırak. */
  heroImageAlt?: string;
}

export default function SubPageLayout({
  title,
  description,
  children,
  noPadding = false,
  heroFullScreen = false,
  hideHero = false,
  heroImage,
  heroImageAlt = "",
}: SubPageLayoutProps) {
  return (
    <div className="min-h-screen bg-deep text-cream font-sans selection:bg-cream selection:text-deep">
      <NavBar />
      {/* Hero section for sub-page */}
      {!hideHero &&
        (heroFullScreen ? (
        <div className="relative flex flex-col justify-center px-6 md:px-16 h-screen w-full bg-deep">
          <h1 className="font-serif text-display-l font-normal tracking-[-0.02em] text-white animate-hero-title">
            {title}
          </h1>
          {description && (
            <p className="mt-8 text-lg md:text-30 font-light text-cream max-w-editorial [line-height:1.2] animate-hero-desc">
              {description}
            </p>
          )}
          
          {/* Subtle scroll down indicator for the green hero */}
          <div className="absolute bottom-12 left-6 md:left-16 flex items-center gap-3 text-cream/85 animate-pulse">
            <span className="text-4xs tracking-widest uppercase font-mono">Keşfetmek İçin Kaydırın</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={1.5} 
              stroke="currentColor" 
              className="size-4 animate-bounce"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </div>
        </div>
      ) : (
        <div
          className={
            heroImage
              ? // Görsel varsa hero bir kapak gibi davranıyor: içerik dibe hizalı,
                // başlık görselin üstünde duruyor. Yükseklik svh — mobil tarayıcı
                // adres çubuğu daralınca zıplamasın.
                "relative flex min-h-[68svh] flex-col justify-end px-6 pt-40 pb-14 md:min-h-[72svh] md:px-16 md:pb-20"
              : "relative flex flex-col justify-center border-b border-cream/15 px-6 pt-40 pb-20 md:px-16 md:pt-48 md:pb-28"
          }
        >
          {heroImage && <SubPageHeroMedia image={heroImage} alt={heroImageAlt} />}

          <div className="relative">
            {/* Bakır saç teli — sayfanın başladığı yeri işaretleyen marka öğesi.
                Aynı çizgi ChapterHeading ve bölüm kartlarında da kullanılıyor. */}
            {heroImage && (
              <span
                aria-hidden
                className="mb-7 block h-px w-16 bg-[var(--accent-copper)] md:w-20"
              />
            )}
            <h1 className="animate-hero-title font-serif text-display-l font-normal tracking-[-0.02em] text-white">
              {title}
            </h1>
            {description && (
              <p className="animate-hero-desc mt-8 max-w-editorial text-lg font-light [line-height:1.2] text-cream md:text-30">
                {description}
              </p>
            )}
          </div>
        </div>
        ))}

      {/* Main content */}
      {noPadding ? (
        <main id="main-content" className="w-full overflow-hidden">
          {children}
        </main>
      ) : (
        <main
          id="main-content"
          className={
            // `reveal-sections`: bölümler görünürlüğe girerken yükselir.
            // Destekleyen tarayıcıda saf CSS (animation-timeline: view()),
            // desteklemeyende ScrollRevealBridge. İçerik hiçbir durumda
            // gizlenmez. Bkz. app/globals.css ve ScrollRevealBridge.tsx.
            //
            // ÜST BOŞLUK ÖLÇÜLEREK KISILDI (AWWWARDS-90-BLOCKERS A8):
            // hero'nun `pb-20`si ile main'in `py-28`i toplanınca açıklama
            // metniyle ilk bölüm başlığı arasında ~190px'lik (the-story) ve
            // ~180px'lik (reiki) hiçbir şey olmayan bir bant kalıyordu.
            // Alt boşluk aynı; kısılan yalnız hero ile içerik arası.
            hideHero
              ? "reveal-sections px-6 pt-32 pb-16 md:px-16 md:pt-44 md:pb-28"
              : "reveal-sections px-6 pt-10 pb-16 md:px-16 md:pt-16 md:pb-28"
          }
        >
          {children}
        </main>
      )}
      
      {/* CSS `animation-timeline: view()` desteklenmeyen tarayıcılarda aynı
          açılımı veren köprü. Destekleniyorsa hiçbir şey yapmaz. */}
      <ScrollRevealBridge />
      <Footer />
    </div>
  );
}
