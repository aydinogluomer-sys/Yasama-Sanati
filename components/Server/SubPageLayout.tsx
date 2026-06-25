import React, { ReactNode } from "react";
import NavBar from "@/components/Client/NavBar";
import Footer from "@/sections/Footer/Server";

interface SubPageLayoutProps {
  title: string;
  description?: string;
  children: ReactNode;
  noPadding?: boolean;
  heroFullScreen?: boolean;
  /** Skip the big section hero so the page content itself leads (e.g. a blog article). */
  hideHero?: boolean;
}

export default function SubPageLayout({
  title,
  description,
  children,
  noPadding = false,
  heroFullScreen = false,
  hideHero = false,
}: SubPageLayoutProps) {
  return (
    <div className="min-h-screen bg-[#2B3530] text-[#d1ccbf] font-sans selection:bg-[#ced1bf] selection:text-[#2B3530]">
      <NavBar />
      {/* Hero section for sub-page */}
      {!hideHero &&
        (heroFullScreen ? (
        <div className="relative flex flex-col justify-center px-6 md:px-16 h-screen w-full bg-[#2B3530]">
          <h1 className="font-serif text-display-l font-normal tracking-[-0.02em] text-white animate-hero-title">
            {title}
          </h1>
          {description && (
            <p className="mt-8 text-lg md:text-30 font-light text-[#ced1bf]/80 max-w-3xl [line-height:1.2] animate-hero-desc">
              {description}
            </p>
          )}
          
          {/* Subtle scroll down indicator for the green hero */}
          <div className="absolute bottom-12 left-6 md:left-16 flex items-center gap-3 text-[#ced1bf]/40 animate-pulse">
            <span className="text-[10px] tracking-widest uppercase font-mono">Keşfetmek İçin Kaydırın</span>
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
        <div className="relative flex flex-col justify-center px-6 pt-40 pb-20 md:px-16 md:pt-48 md:pb-28 border-b border-[#ced1bf]/15">
          <h1 className="font-serif text-display-l font-normal tracking-[-0.02em] text-white animate-hero-title">
            {title}
          </h1>
          {description && (
            <p className="mt-8 text-lg md:text-30 font-light text-[#ced1bf]/80 max-w-3xl [line-height:1.2] animate-hero-desc">
              {description}
            </p>
          )}
        </div>
        ))}

      {/* Main content */}
      {noPadding ? (
        <main className="w-full overflow-hidden">
          {children}
        </main>
      ) : (
        <main
          className={
            hideHero
              ? "px-6 pt-32 pb-16 md:px-16 md:pt-44 md:pb-28"
              : "px-6 py-16 md:px-16 md:py-28"
          }
        >
          {children}
        </main>
      )}
      
      <Footer />
    </div>
  );
}
