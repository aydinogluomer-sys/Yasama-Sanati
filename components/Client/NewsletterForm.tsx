"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");

    // Simulate server action or API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setStatus("success");
      setMessage("Bültenimize başarıyla kaydoldunuz. Teşekkür ederiz!");
      setEmail("");
    } catch (err) {
      console.error("Newsletter subscription error:", err);
      setStatus("error");
      setMessage("Bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  return (
    <div className="p-8 bg-[#ced1bf]/5 rounded border border-[#ced1bf]/10 text-center max-w-2xl mx-auto space-y-6">
      <div className="space-y-2">
        <h3 className="text-xl md:text-24 font-light text-white leading-tight">
          Yeni makalelerden ve etkinliklerden haberdar olun
        </h3>
        <p className="text-xs md:text-sm font-light text-[#ced1bf]/60 max-w-lg mx-auto leading-relaxed">
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
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-posta adresiniz"
              className="flex-1 px-4 py-3 bg-[#2b3530] text-[#d1ccbf] rounded border border-[#ced1bf]/15 text-sm placeholder-[#ced1bf]/30 focus:outline-none focus:border-[#ced1bf]/40 transition-colors"
              disabled={status === "loading"}
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="bg-[#CED1BF] hover:bg-[#c4cbb1] disabled:bg-[#CED1BF]/50 text-[#2B3530] font-medium px-6 py-3 rounded text-sm transition-all duration-300 cursor-pointer flex items-center justify-center min-w-[120px]"
            >
              {status === "loading" ? (
                <svg className="animate-spin h-5 w-5 text-[#2B3530]" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
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
            className="p-4 bg-[#30493D] rounded border border-[#ced1bf]/15 text-[#ced1bf] text-sm max-w-md mx-auto flex items-center justify-center gap-3"
          >
            <svg className="size-5 text-[#ca7d57]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {status === "error" && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs text-[#ca7d57] font-medium"
        >
          {message}
        </motion.p>
      )}
    </div>
  );
}
