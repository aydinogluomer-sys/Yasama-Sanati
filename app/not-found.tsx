import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sayfa bulunamadı — Yaşama Sanatı",
};

export default function NotFound() {
  return (
    <main className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-[#2B3530] px-6 text-center text-[#F3EFE6]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_30%,rgba(67,103,84,0.28),transparent_55%)]"
      />
      <p className="text-kicker font-medium uppercase tracking-[0.34em] text-[#E0A878]">
        404 — Kayıp bir patika
      </p>
      <h1 className="mt-6 max-w-[18ch] font-serif text-display-m font-normal leading-[1.04] tracking-[-0.015em] text-[#F4EFE4]">
        Aradığın sayfa <span className="italic">burada değil.</span>
      </h1>
      <p className="mt-6 max-w-[42ch] text-body-lg font-light text-white/72">
        Bazı yollar kapanır ki yenileri açılsın. Seni tanıdık bir başlangıca
        götürelim.
      </p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#C9875B] px-7 text-[11px] font-medium uppercase tracking-[0.14em] text-[#231c16] transition-[background-color,transform] duration-200 hover:bg-[#d79a70] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9875B]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#2B3530] motion-reduce:transition-none"
        >
          Ana Sayfa
          <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">
            →
          </span>
        </Link>
        <Link
          href="/programlar"
          className="inline-flex h-12 items-center justify-center rounded-full border border-white/25 px-7 text-[11px] font-medium uppercase tracking-[0.14em] text-white/85 transition-colors duration-200 hover:border-white/55 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#2B3530] motion-reduce:transition-none"
        >
          Programları İncele
        </Link>
      </div>
    </main>
  );
}
