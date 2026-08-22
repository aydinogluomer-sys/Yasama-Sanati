"use client";

import { useIsMobile } from "@/app/providers";
import HeroDesktopClient from "./Desktop";
import Image from "next/image";
import HeroMobileClient from "@/sections/Hero/Client/Mobile";
import heroMobile from "@/public/Hero/hero-mobile.jpg";

export default function HeroClient() {
  const isMobile = useIsMobile();
  return (
    <>
      {isMobile === null ? (
        // Viewport not yet resolved: paint the portrait frame only, so a phone never downloads
        // the 2560px desktop still and there is no Desktop→Mobile wrong-media flash.
        <Image
          src={heroMobile}
          alt=""
          aria-hidden
          fill
          priority
          sizes="100vw"
          placeholder="blur"
          className="absolute inset-0 object-cover"
        />
      ) : isMobile ? (
        <HeroMobileClient />
      ) : (
        <HeroDesktopClient />
      )}
    </>
  );
}
