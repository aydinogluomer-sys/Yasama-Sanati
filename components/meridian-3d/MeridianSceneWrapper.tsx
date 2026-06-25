"use client";

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const SCENE_DESCRIPTION = "İnsan bedeni üzerindeki meridyen kanallarını ve akupresür noktalarını keşfetmeye yarayan etkileşimli üç boyutlu anatomi görünümü.";

const MeridianScene = dynamic(
  () => import("./MeridianScene"),
  {
    ssr: false,
    loading: () => (
      <div className="h-[650px] md:h-[750px] bg-[#030806] rounded-2xl border border-white/[0.08] animate-pulse flex items-center justify-center text-sm text-[#a7c0b0]/40">
        3D İnteraktif Meridyen Sahnesi Yükleniyor...
      </div>
    ),
  }
);

export default function MeridianSceneWrapper() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [canRenderScene, setCanRenderScene] = useState(false);
  const [useStaticFallback, setUseStaticFallback] = useState(true);

  useEffect(() => {
    const isFallback = window.matchMedia("(max-width: 767px), (prefers-reduced-motion: reduce)").matches;
    if (isFallback) return;

    setUseStaticFallback(false);
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setCanRenderScene(true);
      observer.disconnect();
    }, { rootMargin: "400px 0px" });
    if (rootRef.current) observer.observe(rootRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={rootRef} className="h-full w-full" aria-label="Meridyen anatomi deneyimi">
      <p id="meridian-scene-description" className="sr-only">{SCENE_DESCRIPTION}</p>
      {useStaticFallback ? (
        <div className="flex h-full min-h-[560px] items-center justify-center bg-[#030806] px-6 text-center" role="img" aria-describedby="meridian-scene-description">
          <div className="max-w-md rounded-2xl border border-white/[0.08] bg-[#0b1411]/90 p-7 shadow-2xl">
            <span className="text-[10px] font-medium uppercase tracking-[0.24em] text-[#e0a96d]">Erişilebilir görünüm</span>
            <h3 className="mt-3 text-xl font-medium text-white">Bedenin enerji haritası</h3>
            <p className="mt-3 text-sm leading-7 text-[#a7c0b0]">{SCENE_DESCRIPTION}</p>
            <p className="mt-4 text-xs leading-6 text-[#a7c0b0]/70">Akciğer, kalp, mide, böbrek, karaciğer ve kalın bağırsak meridyenleri bu deneyimde incelenebilir.</p>
          </div>
        </div>
      ) : canRenderScene ? <MeridianScene /> : <div className="h-full min-h-[650px] bg-[#030806]" aria-hidden="true" />}
    </div>
  );
}
