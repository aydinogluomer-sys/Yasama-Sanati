"use client";
import { useRef } from "react";
import { useScroll } from "motion/react";
import RotatedTypeMass from "@/components/Client/RotatedTypeMass";
import TypographyLabel from "@/components/Server/TypographyLabel";

/**
 * The single ODDWORKS signature moment (Phase 2 ref 05): the six disciplines as an oversized
 * scroll-drifting type mass — text behaving like a gallery object. One use only; deep-green stage so
 * it reads as a scene change. Decorative type is aria-hidden inside RotatedTypeMass; the readable
 * heading carries the meaning.
 * Pins (sticky-scrolls) the section for a duration to create a smooth, premium parallax text drift effect.
 */
export default function SignatureTypeScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={containerRef} className="relative h-[220vh] bg-[#222B27]">
      <section
        aria-label="Altı disiplin, tek bütün"
        className="sticky top-0 flex h-screen w-full flex-col justify-center gap-10 overflow-hidden bg-[#222B27]"
      >
        <div className="flex flex-col gap-3 px-5 md:flex-row md:items-center md:gap-4 md:px-12">
          <div className="flex items-center gap-3 text-[#D1CCBF]">
            <TypographyLabel className="text-[#C9875B]">Altı Disiplin</TypographyLabel>
            <span aria-hidden className="h-px w-10 shrink-0 bg-[#D1CCBF] opacity-40 md:w-16" />
          </div>
          <h2 className="font-serif text-display-s font-normal tracking-[-0.01em] text-[#F4EFE4]">
            Tek bütün, altı yol.
          </h2>
        </div>

        <RotatedTypeMass
          words={["NEFES", "ZİHİN", "ENERJİ", "BEDEN", "REİKİ", "ŞİFA"]}
          rotatedWord="Bütünlük"
          className="py-4"
          progress={scrollYProgress}
        />

        <p className="max-w-[40rem] px-5 text-body-lg font-light text-[#D1CCBF]/72 md:px-12">
          Nefes, enerji, zihin ve beden ayrı teknikler değil; aynı bütünün birbirini tamamlayan
          yüzleridir.
        </p>
      </section>
    </div>
  );
}
