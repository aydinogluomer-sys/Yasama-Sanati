"use client";

import { useIsMobile } from "@/app/providers";
import HeroDesktopClient from "./Desktop";
import { useState } from "react";
import Image from "next/image";
import VideoPlayer from "@/components/VideoPlayer";
import HeroMobileClient from "@/sections/Hero/Client/Mobile";

export default function HeroClient() {
  const isMobile = useIsMobile();
  const [playIntro, setPlayIntro] = useState(false);
  return (
    <>
      {isMobile === null ? (
        // Viewport not yet resolved: show the shared poster only. No <video> mounts yet, so the
        // desktop source never loads on a mobile device (no duplicate download) and there is no
        // Desktop→Mobile wrong-media flash. Both branches below reuse the same poster for continuity.
        <Image
          src="/Hero/elementis-cover-mjpg.png"
          alt=""
          aria-hidden
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 object-cover"
        />
      ) : isMobile ? (
        <HeroMobileClient playIntro={playIntro} setPlayIntro={setPlayIntro} />
      ) : (
        <HeroDesktopClient setPlayIntro={setPlayIntro} />
      )}
      <VideoPlayer
        isMobile={isMobile}
        playIntro={playIntro}
        setPlayIntro={setPlayIntro}
      />
    </>
  );
}
