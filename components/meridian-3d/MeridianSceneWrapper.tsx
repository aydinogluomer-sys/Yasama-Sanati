"use client";

import React from "react";
import dynamic from "next/dynamic";

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
  return <MeridianScene />;
}
