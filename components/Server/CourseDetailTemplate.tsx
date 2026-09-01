import React from "react";
import Link from "next/link";
import BorderedButton from "@/components/Server/BorderedButton";
import NavigateSVG from "@/components/SVGComponents/NavigateSVG";
import FAQList from "@/components/Client/FAQList";
import TypographyLabel from "@/components/Server/TypographyLabel";
import type { ConsultationProgramSlug } from "@/data/consultation-programs";
import { consultationHref } from "@/utils/consultation-context";

const prependZero = (n: number) => (n < 10 ? `0${n}` : `${n}`);
/** Strip a leading "Modül N:" / "Bölüm N:" so the Space Mono index carries the number. */
const stripModulePrefix = (t: string) => t.replace(/^\s*(Modül|Bölüm)\s*\d+\s*[:.\-–]\s*/i, "");

/** Intercom academy chapter heading: Space Mono index + serif heading + fine rule. */
function ChapterHeading({ index, children }: { index: string; children: React.ReactNode }) {

  return (
    <div className="flex items-baseline gap-4 border-b border-cream/15 pb-4">
      <TypographyLabel className="shrink-0 text-copper-text">{index}</TypographyLabel>
      <h3 className="font-serif text-display-s font-normal leading-[1.05] tracking-[-0.01em] text-white">
        {children}
      </h3>
    </div>
  );
}

export interface AccordionItem {
  title: string;
  content: string;
}

export interface TestimonialItem {
  quote: string;
  author: string;
  /**
   * Katılımcının yayın izni KAYIT ALTINDA mı?
   *
   * Fail-closed: bu alan `true` olmadıkça testimonial public UI'da render
   * EDİLMEZ. Şu an hiçbir kayıt için izin/kaynak belgesi yok — "D. S., Mimar"
   * gibi anonim atıflar provenance taşımıyor. Veri repoda korunuyor ki izin
   * alındığında tek alan değişikliğiyle geri gelsin; ama izinsiz sosyal kanıt
   * yayınlanmıyor.
   *
   * İzin kaydı geldiğinde: consentVerified: true (+ internal sourceReference).
   */
  consentVerified?: boolean;
  /** Internal provenance notu — public UI'da GÖSTERİLMEZ. */
  sourceReference?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface CourseDetailProps {
  programSlug: ConsultationProgramSlug;
  duration: string;
  format: string;
  prerequisites: string;
  certification: string;
  introTitle: string;
  introText: string;
  curriculum: AccordionItem[];
  instructor: {
    name: string;
    role: string;
    bio: string;
  };
  testimonials: TestimonialItem[];
  faqs: FAQItem[];
}

export default function CourseDetailTemplate({
  programSlug,
  duration,
  format,
  prerequisites,
  certification,
  introTitle,
  introText,
  curriculum,
  instructor,
  testimonials,
  faqs,
}: CourseDetailProps) {
  const consultationUrl = consultationHref({
    program: programSlug,
    from: `/programlar/${programSlug}`,
  });

  // Fail-closed sosyal kanıt: izni kayıtlı olmayan testimonial yayınlanmaz.
  const publishableTestimonials = (testimonials ?? []).filter(
    (t) => t.consentVerified === true,
  );

  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.8fr_1fr] lg:gap-16 items-start">
      {/* Sol Sütun: İçerik */}
      <div className="space-y-16 md:space-y-24">
        {/* Giriş Bloğu — serif lead */}
        <section className="space-y-6">
          <TypographyLabel className="text-copper-text">Program · Genel Bakış</TypographyLabel>
          <h2 className="font-serif text-display-s font-normal leading-[1.05] tracking-[-0.01em] text-white">
            {introTitle}
          </h2>
          <p className="max-w-[42rem] text-base md:text-lg font-light leading-relaxed text-cream/80 whitespace-pre-line">
            {introText}
          </p>
        </section>

        {/* Müfredat — numaralı modül bölümleri (Intercom academy chapter index) */}
        {curriculum && curriculum.length > 0 && (
          <section className="space-y-8">
            <ChapterHeading index="01">Eğitim Müfredatı</ChapterHeading>
            <ol className="border-t border-cream/12">
              {curriculum.map((m, i) => (
                <li
                  key={i}
                  className="grid grid-cols-[2.5rem_1fr] gap-x-5 gap-y-2 border-b border-cream/12 py-7 md:grid-cols-[3rem_1fr] md:py-8"
                >
                  <TypographyLabel className="text-copper-text md:pt-1">
                    {prependZero(i + 1)}
                  </TypographyLabel>
                  <div className="space-y-2">
                    <h4 className="text-lg font-normal text-white md:text-xl">
                      {stripModulePrefix(m.title)}
                    </h4>
                    <p className="text-sm font-light leading-relaxed text-cream/85 md:text-base">
                      {m.content}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        )}

        {/* Eğitmen Bloğu */}
        <section className="space-y-6">
          <ChapterHeading index="02">Eğitmen Kadromuz</ChapterHeading>
          <div className="space-y-3">
            <h4 className="text-lg md:text-xl font-medium text-white">
              {instructor.name}
            </h4>
            <p className="text-xs md:text-sm text-copper-text uppercase tracking-wider font-medium">
              {instructor.role}
            </p>
            <p className="max-w-[42rem] text-sm md:text-base font-light leading-relaxed text-cream/82">
              {instructor.bio}
            </p>
          </div>
        </section>

        {/* Testimonials */}
        {/* Yalnız izni kayıtlı olanlar. Bkz. TestimonialItem.consentVerified. */}
        {publishableTestimonials.length > 0 && (
          <section className="space-y-8">
            <ChapterHeading index="03">Katılımcı Yorumları</ChapterHeading>
            <div className="space-y-6">
              {publishableTestimonials.map((t, i) => (
                <blockquote
                  key={i}
                  className="border-l-2 border-copper pl-6 py-2 space-y-2"
                >
                  <p className="text-base md:text-lg font-light italic text-cream/80">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <cite className="block text-xs md:text-sm text-cream/85 not-italic font-normal">
                    — {t.author}
                  </cite>
                </blockquote>
              ))}
            </div>
          </section>
        )}

        {/* SSS */}
        {faqs && faqs.length > 0 && (
          <section className="space-y-8">
            <ChapterHeading index="04">Sıkça Sorulan Sorular</ChapterHeading>
            <FAQList items={faqs} />
          </section>
        )}

        {/* Sayfa Sonu CTA */}
        <section className="pt-8 text-center lg:text-left">
          <Link href={consultationUrl}>
            <BorderedButton className="inline-flex cursor-pointer items-center gap-4 px-8 py-5 text-base text-white [&_path]:[stroke:white] [&_svg]:[stroke:white]">
              Ücretsiz Ön Görüşme
              <NavigateSVG fill="#FFFFFF" className="size-2.5 mr-2.5" />
            </BorderedButton>
          </Link>
        </section>
      </div>

      {/* Sağ Sütun: Program Kartı */}
      <aside className="sticky top-32 p-6 md:p-8 bg-warm rounded border border-cream/10 space-y-8 text-cream">
        <div className="space-y-2 border-b border-cream/15 pb-6">
          <span className="text-xs text-cream/85 uppercase tracking-widest">Yatırım Bedeli</span>
          <div className="text-28 md:text-40 font-light text-white">Ön Görüşmede</div>
          <p className="text-sm font-light leading-relaxed text-cream/85">
            Güncel eğitim ücreti, başlangıç tarihi ve ödeme seçenekleri ücretsiz ön görüşmede paylaşılır.
          </p>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-[auto_1fr] gap-x-4 items-center">
            <div className="size-2 bg-copper rounded-full" />
            <div>
              <div className="text-xs text-cream/85 font-light">Eğitim Süresi</div>
              <div className="text-base text-white font-light">{duration}</div>
            </div>
          </div>

          <div className="grid grid-cols-[auto_1fr] gap-x-4 items-center">
            <div className="size-2 bg-copper rounded-full" />
            <div>
              <div className="text-xs text-cream/85 font-light">Eğitim Formatı</div>
              <div className="text-base text-white font-light">{format}</div>
            </div>
          </div>

          <div className="grid grid-cols-[auto_1fr] gap-x-4 items-center">
            <div className="size-2 bg-copper rounded-full" />
            <div>
              <div className="text-xs text-cream/85 font-light">Gerekli Ön Koşul</div>
              <div className="text-base text-white font-light">{prerequisites}</div>
            </div>
          </div>

          <div className="grid grid-cols-[auto_1fr] gap-x-4 items-center">
            <div className="size-2 bg-copper rounded-full" />
            <div>
              <div className="text-xs text-cream/85 font-light">Sertifikasyon</div>
              <div className="text-base text-white font-light">{certification}</div>
            </div>
          </div>
        </div>

        <div className="pt-4">
          <Link
            href={consultationUrl}
            className="block min-h-12 w-full rounded bg-cream py-4 text-center font-medium text-deep transition-colors duration-300 hover:bg-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-deep"
          >
            Görüşme Talebi
          </Link>
        </div>
      </aside>
    </div>
  );
}
