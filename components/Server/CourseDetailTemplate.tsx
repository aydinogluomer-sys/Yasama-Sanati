import React from "react";
import Link from "next/link";
import BorderedButton from "@/components/Server/BorderedButton";
import NavigateSVG from "@/components/SVGComponents/NavigateSVG";
import FAQList from "@/components/Client/FAQList";
import TypographyLabel from "@/components/Server/TypographyLabel";

const prependZero = (n: number) => (n < 10 ? `0${n}` : `${n}`);
/** Strip a leading "Modül N:" / "Bölüm N:" so the Space Mono index carries the number. */
const stripModulePrefix = (t: string) => t.replace(/^\s*(Modül|Bölüm)\s*\d+\s*[:.\-–]\s*/i, "");

/** Intercom academy chapter heading: Space Mono index + serif heading + fine rule. */
function ChapterHeading({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <div className="flex items-baseline gap-4 border-b border-[#ced1bf]/15 pb-4">
      <TypographyLabel className="shrink-0 text-[#E09A6C]">{index}</TypographyLabel>
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
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface CourseDetailProps {
  duration: string;
  format: string;
  prerequisites: string;
  certification: string;
  price: string;
  startDate: string;
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
  duration,
  format,
  prerequisites,
  certification,
  price,
  startDate,
  introTitle,
  introText,
  curriculum,
  instructor,
  testimonials,
  faqs,
}: CourseDetailProps) {
  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.8fr_1fr] lg:gap-16 items-start">
      {/* Sol Sütun: İçerik */}
      <div className="space-y-16 md:space-y-24">
        {/* Giriş Bloğu — serif lead */}
        <section className="space-y-6">
          <TypographyLabel className="text-[#E09A6C]">Program · Genel Bakış</TypographyLabel>
          <h2 className="font-serif text-display-s font-normal leading-[1.05] tracking-[-0.01em] text-white">
            {introTitle}
          </h2>
          <p className="max-w-[42rem] text-base md:text-lg font-light leading-relaxed text-[#ced1bf]/80 whitespace-pre-line">
            {introText}
          </p>
        </section>

        {/* Müfredat — numaralı modül bölümleri (Intercom academy chapter index) */}
        {curriculum && curriculum.length > 0 && (
          <section className="space-y-8">
            <ChapterHeading index="01">Eğitim Müfredatı</ChapterHeading>
            <ol className="border-t border-[#ced1bf]/12">
              {curriculum.map((m, i) => (
                <li
                  key={i}
                  className="grid grid-cols-[2.5rem_1fr] gap-x-5 gap-y-2 border-b border-[#ced1bf]/12 py-7 md:grid-cols-[3rem_1fr] md:py-8"
                >
                  <TypographyLabel className="text-[#E09A6C] md:pt-1">
                    {prependZero(i + 1)}
                  </TypographyLabel>
                  <div className="space-y-2">
                    <h4 className="text-lg font-normal text-white md:text-xl">
                      {stripModulePrefix(m.title)}
                    </h4>
                    <p className="text-sm font-light leading-relaxed text-[#ced1bf]/70 md:text-base">
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
            <p className="text-xs md:text-sm text-[#E09A6C] uppercase tracking-wider font-medium">
              {instructor.role}
            </p>
            <p className="max-w-[42rem] text-sm md:text-base font-light leading-relaxed text-[#ced1bf]/70">
              {instructor.bio}
            </p>
          </div>
        </section>

        {/* Testimonials */}
        {testimonials && testimonials.length > 0 && (
          <section className="space-y-8">
            <ChapterHeading index="03">Katılımcı Yorumları</ChapterHeading>
            <div className="space-y-6">
              {testimonials.map((t, i) => (
                <blockquote
                  key={i}
                  className="border-l-2 border-[#ca7d57] pl-6 py-2 space-y-2"
                >
                  <p className="text-base md:text-lg font-light italic text-[#ced1bf]/80">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <cite className="block text-xs md:text-sm text-[#ced1bf]/60 not-italic font-normal">
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
          <Link href="/#on-kayit">
            <BorderedButton className="inline-flex cursor-pointer items-center gap-4 px-8 py-5 text-base text-white [&_path]:[stroke:white] [&_svg]:[stroke:white]">
              Hemen Ön Kayıt Ol
              <NavigateSVG fill="#FFFFFF" className="size-2.5 mr-2.5" />
            </BorderedButton>
          </Link>
        </section>
      </div>

      {/* Sağ Sütun: Program Kartı */}
      <aside className="sticky top-32 p-6 md:p-8 bg-[#30493D] rounded border border-[#ced1bf]/10 space-y-8 text-[#ced1bf]">
        <div className="space-y-2 border-b border-[#ced1bf]/15 pb-6">
          <span className="text-xs text-[#ced1bf]/60 uppercase tracking-widest">Yatırım Bedeli</span>
          <div className="text-28 md:text-40 font-light text-white">{price}</div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-[auto_1fr] gap-x-4 items-center">
            <div className="size-2 bg-[#ca7d57] rounded-full" />
            <div>
              <div className="text-xs text-[#ced1bf]/60 font-light">Eğitim Süresi</div>
              <div className="text-base text-white font-light">{duration}</div>
            </div>
          </div>

          <div className="grid grid-cols-[auto_1fr] gap-x-4 items-center">
            <div className="size-2 bg-[#ca7d57] rounded-full" />
            <div>
              <div className="text-xs text-[#ced1bf]/60 font-light">Eğitim Formatı</div>
              <div className="text-base text-white font-light">{format}</div>
            </div>
          </div>

          <div className="grid grid-cols-[auto_1fr] gap-x-4 items-center">
            <div className="size-2 bg-[#ca7d57] rounded-full" />
            <div>
              <div className="text-xs text-[#ced1bf]/60 font-light">Gerekli Ön Koşul</div>
              <div className="text-base text-white font-light">{prerequisites}</div>
            </div>
          </div>

          <div className="grid grid-cols-[auto_1fr] gap-x-4 items-center">
            <div className="size-2 bg-[#ca7d57] rounded-full" />
            <div>
              <div className="text-xs text-[#ced1bf]/60 font-light">Sertifikasyon</div>
              <div className="text-base text-white font-light">{certification}</div>
            </div>
          </div>

          <div className="grid grid-cols-[auto_1fr] gap-x-4 items-center">
            <div className="size-2 bg-[#ca7d57] rounded-full" />
            <div>
              <div className="text-xs text-[#ced1bf]/60 font-light">Başlangıç Tarihi</div>
              <div className="text-base text-white font-light">{startDate}</div>
            </div>
          </div>
        </div>

        <div className="pt-4">
          <Link href="/#on-kayit" className="block w-full">
            <button className="w-full bg-[#CED1BF] hover:bg-[#D1CCBF] text-[#2B3530] font-medium py-4 rounded text-center transition-all duration-300 cursor-pointer">
              Ön Kayıt Başvurusu
            </button>
          </Link>
        </div>
      </aside>
    </div>
  );
}
