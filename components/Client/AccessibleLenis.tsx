"use client";

import { ReactNode, useEffect, useState } from "react";
import { ReactLenis } from "@/utils/lenis";

export default function AccessibleLenis({ children }: { children: ReactNode }) {
  const [smoothScroll, setSmoothScroll] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setSmoothScroll(!media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  if (!smoothScroll) return children;

  return (
    <ReactLenis root options={{ smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}
