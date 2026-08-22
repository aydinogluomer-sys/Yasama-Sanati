"use client";
import { motion } from "motion/react";
import Image from "next/image";
import useMountedReducedMotion from "@/hooks/useMountedReducedMotion";
import heroMobile from "@/public/Hero/hero-mobile.jpg";

export default function HeroMobileClient() {
  const reduceMotion = useMountedReducedMotion();
  return (
    <div className="absolute inset-0 overflow-clip">
      {/* Same authored settle as desktop, a touch wider so it reads on a small frame. */}
      <motion.div
        className="size-full"
        animate={reduceMotion ? { scale: 1 } : { scale: [1.08, 1] }}
        transition={reduceMotion ? { duration: 0 } : { duration: 28, ease: "easeOut" }}
      >
        <Image
          src={heroMobile}
          alt=""
          aria-hidden
          priority
          sizes="100vw"
          placeholder="blur"
          className="size-full object-cover"
        />
      </motion.div>
    </div>
  );
}
