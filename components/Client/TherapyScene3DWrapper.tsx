"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useReducedMotion } from "motion/react";

const TherapyScene3D = dynamic(
  () => import("./TherapyScene3D"),
  {
    ssr: false,
    loading: () => (
      <div className="h-[520px] md:h-[600px] bg-[#1a2420] rounded border border-[#ced1bf]/10 animate-pulse flex items-center justify-center text-sm text-[#ced1bf]/40">
        3D Terapi Sahnesi Yükleniyor...
      </div>
    ),
  }
);

export default function TherapyScene3DWrapper() {
  const prefersReducedMotion = useReducedMotion();
  // Mobile/low-power devices skip WebGL (parity with MeridianSceneWrapper) to avoid scroll-time FPS
  // drops. `null` until detected → render the static summary first, never mount WebGL on mobile.
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  if (prefersReducedMotion || isMobile === null || isMobile) {
    return (
      <div className="rounded border border-[#ced1bf]/10 bg-[#1a2420] p-6 md:p-8 text-[#ced1bf]/80">
        <div className="space-y-3">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#ced1bf]/40">3D Terapi Sahnesi</p>
          <h3 className="text-2xl md:text-3xl font-light text-white">Bedenin enerji haritası</h3>
          <p className="max-w-2xl text-sm md:text-base leading-relaxed text-[#ced1bf]/70">
            Bu sabit özet, üç boyutlu sahne yerine temel kavramları ve bağlamı öne çıkarır; hareket
            tercihine ve mobil performansına saygı duyar.
          </p>
        </div>
      </div>
    );
  }

  return <TherapyScene3D />;
}
