"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Magnetic from "@/components/Client/Magnetic";

export default function FooterNewsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStatus("success");
      setEmail("");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <div className="w-full font-sans">
      <p className="text-xs font-light text-[#F3EFE6]/72 leading-relaxed mb-6">
        Yeni içeriklerden ve etkinliklerden ilk siz haberdar olun.
      </p>
      <AnimatePresence mode="wait">
        {status !== "success" ? (
          <div className="relative w-full">
            <motion.form
              key="footer-newsletter-form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="flex flex-col gap-3 w-full relative z-10"
            >
              <div className="relative w-full">
                <input
                  type="email"
                  required
                  disabled={status === "loading"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder="E-posta adresiniz"
                  className="w-full bg-[rgba(20,28,24,0.42)] rounded-[10px] border border-[rgba(243,239,230,0.08)] px-4 py-3 text-sm text-[#F3EFE6]/88 placeholder-[#F3EFE6]/58 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9875B]/25 focus-visible:border-[#C9875B]/55 transition-all duration-300 shadow-[inset_0_1px_2px_rgba(0,0,0,0.2)] h-11"
                />
                {/* Animated glowing focus border */}
                <motion.div
                  className="absolute inset-0 border border-[#C9875B]/60 rounded-[10px] pointer-events-none z-0"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: isFocused ? 1 : 0, scale: isFocused ? 1 : 0.98 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
              </div>

              <Magnetic range={15} strength={0.2}>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full bg-[#C9875B] hover:bg-[#D79A70] hover:-translate-y-[1px] disabled:bg-[#C9875B]/50 disabled:transform-none text-[#1D261F] h-11 flex items-center justify-center gap-1.5 text-xs font-semibold tracking-[0.10em] uppercase transition-all duration-300 ease-out cursor-pointer rounded-[10px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9875B]/45 focus-visible:ring-offset-2 focus-visible:ring-offset-[#2B3530] motion-reduce:transform-none"
                >
                  {status === "loading" ? (
                    <svg className="animate-spin h-3.5 w-3.5 text-[#1D261F]" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  ) : (
                    <div className="flex items-center gap-1.5 group/btn">
                      <span>Abone Ol</span>
                      <svg className="size-3 text-[#1D261F] transform group-hover/btn:translate-x-1.5 transition-transform duration-300 ease-out motion-reduce:transform-none" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </div>
                  )}
                </button>
              </Magnetic>
            </motion.form>
          </div>
        ) : (
          <motion.div
            key="footer-newsletter-success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-xs text-[#C9875B] font-medium py-2.5 flex items-center gap-2"
          >
            <svg className="size-4 shrink-0 text-[#C9875B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <motion.path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M5 13l4 4L19 7"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </svg>
            <span>Kayıt başarılı, teşekkürler!</span>
          </motion.div>
        )}
      </AnimatePresence>
 
      {/* Security note with lock icon */}
      <div className="flex items-start gap-2 text-[10px] text-[#F3EFE6]/54 mt-4 leading-[1.5]">
        <svg className="size-3 text-[#C9875B]/78 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
        </svg>
        <span className="font-light text-[#F3EFE6]/54">Bilgileriniz güvende. İstediğiniz zaman abonelikten çıkabilirsiniz.</span>
      </div>

      {status === "error" && (
        <p className="text-[10px] text-red-400 mt-1.5 font-medium">Bir hata oluştu. Lütfen tekrar deneyin.</p>
      )}
    </div>
  );
}
