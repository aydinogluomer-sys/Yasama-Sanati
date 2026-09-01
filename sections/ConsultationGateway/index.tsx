import Link from "next/link";
import { consultationHref } from "@/utils/consultation-context";

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="size-5 fill-none stroke-current [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:1.4]">
      <path d="M3 10h13M11 5l5 5-5 5" />
    </svg>
  );
}

export default function ConsultationGateway() {
  return (
    <section
      id="on-kayit"
      aria-labelledby="consultation-gateway-title"
      className="relative isolate min-h-[34rem] overflow-hidden bg-[var(--surface-card)] px-5 py-24 text-[var(--text-inverse)] md:px-8 md:py-32 lg:px-12 xl:px-16"
    >
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 -z-10 h-full w-[58%] text-[var(--accent-copper)] max-md:w-full max-md:opacity-50"
        viewBox="0 0 820 620"
        preserveAspectRatio="none"
      >
        <path
          d="M140 -20C310 120 195 245 338 332C486 422 434 525 710 650"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
        <circle cx="280" cy="220" r="5" fill="var(--surface-card)" stroke="currentColor" vectorEffect="non-scaling-stroke" />
        <circle cx="420" cy="390" r="5" fill="var(--surface-card)" stroke="currentColor" vectorEffect="non-scaling-stroke" />
      </svg>

      <div className="mx-auto grid w-full max-w-[var(--content-wide)] items-end gap-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(18rem,0.7fr)] lg:gap-20">
        <h2
          id="consultation-gateway-title"
          className="max-w-[11ch] font-serif text-display-l font-normal leading-[0.96] tracking-[-0.025em] text-[#26332d]"
        >
          Nereden başlayacağını <span className="italic">birlikte</span> netleştirelim.
        </h2>

        <div className="border-t border-deep/28 pt-7">
          <p className="max-w-[38ch] text-body-lg font-light leading-relaxed text-deep/85">
            İhtiyacını ve temponu paylaş; sana uygun başlangıç yolunu ücretsiz ön görüşmede birlikte belirleyelim.
          </p>
          <Link
            href={consultationHref({ from: "/" })}
            className="group mt-9 inline-flex min-h-14 min-w-[15rem] items-center justify-between gap-8 bg-[var(--surface-deep)] px-6 py-4 text-base font-medium text-paper outline-none transition-colors duration-200 hover:bg-[var(--surface-warm)] focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-3 focus-visible:ring-offset-[var(--surface-card)] motion-reduce:transition-none"
          >
            <span>Ücretsiz ön görüşme</span>
            <span className="transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transform-none motion-reduce:transition-none">
              <ArrowIcon />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
