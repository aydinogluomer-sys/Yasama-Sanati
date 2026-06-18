"use client";

import React from "react";

interface FooterBackgroundTextProps {
  containerRef: React.RefObject<HTMLElement | null>;
}

export default function FooterBackgroundText({ containerRef }: FooterBackgroundTextProps) {
  void containerRef;
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-4 -z-0 hidden overflow-hidden px-14 lg:block"
    >
      <p className="mx-auto max-w-[1360px] whitespace-nowrap text-center font-serif text-[8.7vw] font-medium uppercase leading-none tracking-[0.035em] text-transparent [-webkit-text-stroke:1px_rgba(243,239,230,0.045)] [mask-image:linear-gradient(to_bottom,black,transparent_88%)]">
        Yaşama Sanatı
      </p>
    </div>
  );
}
