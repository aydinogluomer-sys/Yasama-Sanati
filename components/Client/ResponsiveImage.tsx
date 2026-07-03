"use client";

import { useIsMobile } from "@/app/providers";
import { ReactNode } from "react";
import ParallaxContainer from "@/components/Client/ParallaxContainer";
import useMountedReducedMotion from "@/hooks/useMountedReducedMotion";
interface ResponsiveImageProps {
  children: ReactNode;
  parallaxAmount: number;
  /**
   * When true, parallax is also disabled under reduced motion (the image sits static in its final
   * position). Defaults to false, so every other caller keeps its existing behavior unchanged.
   */
  disableParallaxOnReducedMotion?: boolean;
}
export default function ResponsiveImage({
  children,
  parallaxAmount,
  disableParallaxOnReducedMotion = false,
}: ResponsiveImageProps) {
  const isMobile = useIsMobile();
  const reduce = useMountedReducedMotion();
  const disableParallax = isMobile || (disableParallaxOnReducedMotion && reduce);

  return (
    <>
      {disableParallax ? (
        children
      ) : (
        <ParallaxContainer parallaxAmount={parallaxAmount}>
          {children}
        </ParallaxContainer>
      )}
    </>
  );
}
