"use client";

import React from "react";
import dynamic from "next/dynamic";

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
  return <TherapyScene3D />;
}
