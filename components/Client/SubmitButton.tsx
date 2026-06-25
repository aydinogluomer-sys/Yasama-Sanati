"use client";
import { useFormStatus } from "react-dom";
import * as motion from "motion/react-client";
import NavigateSVG from "@/components/SVGComponents/NavigateSVG";

export default function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <motion.button
      type="submit"
      disabled={pending}
      className="mt-8 flex min-h-14 w-full cursor-pointer items-center justify-between px-6 py-5 text-base text-[#d1ccbf] outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#CED1BF] disabled:cursor-not-allowed disabled:opacity-50 md:text-lg"
      initial={{ backgroundColor: "#2b3530" }}
      whileHover={pending ? {} : { backgroundColor: "#304d3d" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <span>{pending ? "Ön Kayıt Oluşturuluyor..." : "Ön Kayıt Oluştur"}</span>
      <NavigateSVG fill="#D1CCBF" />
    </motion.button>
  );
}
