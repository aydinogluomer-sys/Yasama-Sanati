"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { submitNewsletter } from "@/app/actions";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;

    setStatus("loading");
    setMessage("");

    try {
      const result = await submitNewsletter(email);
      if (result.success) {
        setStatus("success");
        setMessage("Bültenimize başarıyla kaydoldunuz. Teşekkür ederiz!");
        setEmail("");
        return;
      }
      setStatus("error");
      setMessage(result.error ?? "Kaydınız alınamadı. Lütfen tekrar deneyin.");
    } catch {
      setStatus("error");
      setMessage("Kaydınız alınamadı. Lütfen tekrar deneyin.");
    }
  };

  return (
    <div className="p-8 bg-[#ced1bf]/5 rounded border border-[#ced1bf]/10 text-center max-w-2xl mx-auto space-y-6">
      <div className="space-y-2">
        <h3 className="text-xl md:text-24 font-light text-white leading-tight">
          Yeni makalelerden ve etkinliklerden haberdar olun
        </h3>
        <p className="text-xs md:text-sm font-light text-[#ced1bf]/85 max-w-lg mx-auto leading-relaxed">
          Haftalık şifa bültenimize katılarak en yeni pratiklerden, meditasyon rehberlerinden ve eğitim indirimlerinden ilk siz haberdar olabilirsiniz.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {status !== "success" ? (
          <motion.form
            key="newsletter-form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-2"
          >
            <label htmlFor="blog-newsletter-email" className="sr-only">
              E-posta adresiniz
            </label>
            <input
              id="blog-newsletter-email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-posta adresiniz"
              aria-invalid={status === "error"}
              aria-describedby={status === "error" ? "blog-newsletter-status" : undefined}
              className="min-h-12 flex-1 rounded border border-[#ced1bf]/15 bg-[#2b3530] px-4 py-3 text-sm text-[#d1ccbf] transition-colors placeholder:text-[#ced1bf]/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E09A6C]"
              disabled={status === "loading"}
            />
            <button
              type="submit"
              disabled={status === "loading"}
              aria-busy={status === "loading"}
              className="flex min-h-12 min-w-[120px] cursor-pointer items-center justify-center rounded bg-[#CED1BF] px-6 py-3 text-sm font-medium text-[#2B3530] transition-colors duration-300 hover:bg-[#c4cbb1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E09A6C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2B3530] disabled:cursor-wait disabled:bg-[#CED1BF]/50"
            >
              {status === "loading" ? (
                <>
                  <svg aria-hidden="true" className="h-5 w-5 animate-spin text-[#2B3530] motion-reduce:animate-none" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span className="sr-only">Kaydediliyor</span>
                </>
              ) : (
                "Kaydol"
              )}
            </button>
          </motion.form>
        ) : (
          <motion.div
            key="newsletter-success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            role="status"
            aria-live="polite"
            className="p-4 bg-[#30493D] rounded border border-[#ced1bf]/15 text-[#ced1bf] text-sm max-w-md mx-auto flex items-center justify-center gap-3"
          >
            <svg className="size-5 text-[var(--accent-copper-on-dark)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {status === "error" && (
        <motion.p
          id="blog-newsletter-status"
          role="alert"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs text-[var(--accent-copper-on-dark)] font-medium"
        >
          {message}
        </motion.p>
      )}
    </div>
  );
}
