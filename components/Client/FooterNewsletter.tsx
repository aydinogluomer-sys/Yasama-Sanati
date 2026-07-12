"use client";

import { FormEvent, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { submitNewsletter } from "@/app/actions";

type Status = "idle" | "loading" | "success" | "error";

export default function FooterNewsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const reduceMotion = useReducedMotion();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;

    setStatus("loading");
    try {
      const result = await submitNewsletter(email);
      if (result.success) {
        setEmail("");
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="w-full">
      <p className="max-w-[24rem] text-sm leading-6 text-[#F3EFE6]/68">
        Yeni içeriklerden ve etkinliklerden ilk siz haberdar olun.
      </p>

      <AnimatePresence mode="wait" initial={false}>
        {status === "success" ? (
          <motion.div
            key="success"
            role="status"
            aria-live="polite"
            initial={reduceMotion ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-5 flex min-h-12 items-center gap-2 rounded-[0.35rem] border border-[#D58D5D]/35 bg-[#D58D5D]/10 px-4 text-sm text-[#E6A47A]"
          >
            <span aria-hidden="true">✓</span>
            <span>Kayıt başarılı, teşekkürler.</span>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-5"
          >
            <label htmlFor="footer-email" className="sr-only">
              E-posta adresiniz
            </label>
            <div className="flex flex-col w-full">
              <input
                id="footer-email"
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                required
                disabled={status === "loading"}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="E-posta adresiniz"
                className="h-12 w-full rounded-lg border border-[#F3EFE6]/10 bg-[#1C2C25] px-4 text-sm text-[#F3EFE6] outline-none placeholder:text-[#F3EFE6]/55 focus:border-[#D58D5D]/50 focus:ring-1 focus:ring-[#D58D5D]/30 transition-all disabled:cursor-wait disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                aria-busy={status === "loading"}
                className="group flex h-12 w-full mt-3 items-center justify-center gap-2 rounded-lg bg-[#D58D5D] px-5 text-xs font-semibold uppercase tracking-[0.1em] text-[#17251F] transition-colors hover:bg-[#E09A6C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F3EFE6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#293A32] disabled:cursor-wait disabled:opacity-65 motion-reduce:transition-none"
              >
                <span>{status === "loading" ? "KAYDEDİLİYOR" : "ABONE OL"}</span>
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-1 motion-reduce:transition-none">
                  →
                </span>
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      <p className="mt-4 flex items-start gap-2 text-[11px] leading-[1.55] text-[#F3EFE6]/56">
        <svg aria-hidden="true" viewBox="0 0 24 24" className="mt-0.5 size-3.5 shrink-0 text-[#D58D5D]" fill="none">
          <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M8 11V7a4 4 0 1 1 8 0v4" stroke="currentColor" strokeWidth="1.5" />
        </svg>
        <span>Bilgileriniz güvende. İstediğiniz zaman abonelikten çıkabilirsiniz.</span>
      </p>

      {status === "error" && (
        <p role="alert" className="mt-3 text-xs text-[#FFB2A8]">
          Bir hata oluştu. Lütfen tekrar deneyin.
        </p>
      )}
    </div>
  );
}
