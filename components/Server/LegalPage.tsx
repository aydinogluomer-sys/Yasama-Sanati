import React from "react";
import cn from "@/utils/cn";

/**
 * Hukuki sayfa kabuğu — `/kvkk` ve `/privacy-terms` için ortak yapı.
 *
 * NEDEN VAR
 * İki sayfa da düz bir metin duvarıydı: `max-w-4xl mx-auto`, sans-serif
 * `text-24 font-light` başlıklar, aralarında `<hr>`. Ondört başlıklı bir
 * belgede okuyucunun nerede olduğunu gösteren hiçbir şey yoktu ve gövde
 * hero başlığından farklı bir eksende akıyordu
 * (docs/AWWWARDS-90-BLOCKERS.md A2, A3).
 *
 * Hukuki metin sıkıcı olmak zorunda ama YAPISIZ olmak zorunda değil:
 *   • solda yapışkan içindekiler — belge uzunluğu görünür olur
 *   • serif numaralı başlıklar — sitenin sesi burada da sürer
 *   • `max-w-editorial` — okuma satır uzunluğu sınırlanır
 *
 * İçindekiler `position: sticky` ile çalışır; JavaScript yoktur, bağlantılar
 * sıradan çapa bağlantılarıdır. Küçük ekranda gizlenir (dar ekranda yapışkan
 * bir sütun okumayı kolaylaştırmaz, yer kaplar).
 */

export interface LegalTocItem {
  id: string;
  title: string;
}

export function LegalShell({
  updatedAt,
  intro,
  toc,
  children,
}: {
  /** "10 Haziran 2026" gibi. Belgenin tazeliği hukuki olarak anlamlıdır. */
  updatedAt: string;
  intro: React.ReactNode;
  toc: LegalTocItem[];
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-wide">
      <p className="font-mono text-3xs uppercase tracking-[0.2em] text-copper-text">
        Son güncelleme · {updatedAt}
      </p>

      <p className="mt-8 max-w-editorial text-body-lg font-light leading-relaxed text-cream/80">
        {intro}
      </p>

      <div className="mt-20 grid grid-cols-1 gap-x-16 lg:grid-cols-12">
        <nav
          aria-label="Belge bölümleri"
          className="hidden lg:col-span-4 lg:block"
        >
          <div className="sticky top-32">
            <h2 className="font-mono text-3xs uppercase tracking-[0.2em] text-cream/70">
              İçindekiler
            </h2>
            <ol className="mt-5 space-y-3">
              {toc.map((item, i) => (
                <li key={item.id} className="flex gap-3">
                  <span
                    aria-hidden
                    className="mt-0.5 shrink-0 font-mono text-3xs tabular-nums text-copper-text"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <a
                    href={`#${item.id}`}
                    className="text-sm font-light text-cream/70 underline-offset-4 transition-colors duration-200 hover:text-white hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-ring)] motion-reduce:transition-none"
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </nav>

        <div className="lg:col-span-8">
          <div className="max-w-editorial space-y-16 font-light leading-relaxed text-cream/80">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export function LegalSection({
  id,
  index,
  title,
  children,
  className,
}: {
  id: string;
  /** İki haneli sıra ("01"). */
  index: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      // `scroll-mt`: çapa bağlantısıyla gelindiğinde başlık sabit NavBar'ın
      // altında kalmasın.
      className={cn("scroll-mt-32 space-y-5", className)}
    >
      {/* `items-start` + hizalayıcı üst boşluk: başlık iki satıra kırıldığında
          indeks ilk satırın üstünde kalır. `items-baseline` denendi ve iki
          satırlık başlıklarda numarayı başlığın ortasına düşürüyordu. */}
      <div className="flex items-start gap-4 border-b border-cream/15 pb-4">
        <span
          aria-hidden
          className="mt-[0.45em] shrink-0 font-mono text-3xs tabular-nums tracking-[0.2em] text-copper-text"
        >
          {index}
        </span>
        {/* Hukuki başlık display rampasından DEĞİL: beş bölümlük bir belgede
            display-s (~52px) satır kırıyor ve metnin önüne geçiyor. Serif ses
            korunuyor, ölçek belgeye uygun. */}
        <h2 className="font-serif text-28 font-normal leading-[1.15] tracking-[-0.01em] text-white md:text-36">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

/** Belge içi alt başlık — serif, bölüm başlığından bir kademe küçük. */
export function LegalSubheading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-serif text-24 font-normal leading-tight text-white">
      {children}
    </h3>
  );
}
