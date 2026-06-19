"use client";

import { FormEvent, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

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
      await new Promise((resolve) => window.setTimeout(resolve, 650));
      setEmail("");
      setStatus("success");
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
            <div className="flex flex-col overflow-hidden rounded-[0.35rem] border border-[#F3EFE6]/10 bg-[#15231D]/65 sm:flex-row">
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
                className="h-12 min-w-0 flex-1 bg-transparent px-4 text-sm text-[#F3EFE6] outline-none placeholder:text-[#F3EFE6]/42 focus:ring-0 disabled:cursor-wait disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                aria-busy={status === "loading"}
                className="group flex h-12 shrink-0 items-center justify-center gap-2 bg-[#D58D5D] px-5 text-xs font-semibold uppercase tracking-[0.1em] text-[#17251F] transition-colors hover:bg-[#E09A6C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F3EFE6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#31483C] disabled:cursor-wait disabled:opacity-65 motion-reduce:transition-none"
              >
                <span>{status === "loading" ? "Kaydediliyor" : "Abone Ol"}</span>
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-1 motion-reduce:transition-none">
                  →
                </span>
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      <p className="mt-4 flex items-start gap-2 text-[11px] leading-[1.55] text-[#F3EFE6]/56">
        <span aria-hidden="true" className="mt-px shrink-0 text-[#D58D5D]">
          ▣
        </span>
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
