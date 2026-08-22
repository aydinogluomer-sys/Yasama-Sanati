"use client";
import Image from "next/image";
import Picture1 from "@/public/akademi-hikayesi/picture-1.jpg";
import Picture2 from "@/public/akademi-hikayesi/picture-2.jpg";
import ParallaxContainer from "@/components/Client/ParallaxContainer";
import { useIsMobile } from "@/app/providers";

export default function AkademiHikayesiClient() {
  const isMobile = useIsMobile();
  if (typeof isMobile !== "boolean") {
    return null;
  }
  return (
    <>
      {isMobile ? (
        // Yatay kaydırılabilir bir bölge klavyeyle de gezilebilmeli: odaklanabilir yapıp
        // ad veriyoruz, yoksa klavye kullanıcısı ikinci görsele hiç ulaşamıyor (axe: serious).
        <div
          role="group"
          aria-label="Hikâye görselleri"
          tabIndex={0}
          className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 [&>*]:shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
          style={{ scrollbarWidth: "none" }}
        >
          <Image
            src={Picture2}
            sizes="(min-width: 768px) 45vw, 85vw"
            alt="Yaşama Sanatı topluluğundan bir buluşma anı"
            className="h-auto w-[85%] snap-center"
          />
          <Image
            src={Picture1}
            sizes="(min-width: 768px) 45vw, 85vw"
            alt="Akademinin sakin ve doğal çalışma ortamı"
            className="h-auto w-[85%] snap-center"
          />
        </div>
      ) : (
        <>
          <div className="col-span-3 row-span-2">
            <ParallaxContainer parallaxAmount={10}>
              <Image src={Picture1}
            sizes="(min-width: 768px) 45vw, 85vw" alt="Akademinin sakin ve doğal çalışma ortamı" className="h-auto w-full" />
            </ParallaxContainer>
          </div>
          <div className="col-span-6 col-start-6 row-start-2">
            <ParallaxContainer parallaxAmount={25}>
              <Image src={Picture2}
            sizes="(min-width: 768px) 45vw, 85vw" alt="Yaşama Sanatı topluluğundan bir buluşma anı" className="h-auto w-full" />
            </ParallaxContainer>
          </div>
        </>
      )}
    </>
  );
}
