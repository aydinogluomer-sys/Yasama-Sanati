import TypographyStage from "@/components/Client/TypographyStage";
import ScrollRevealText from "@/components/Client/ScrollRevealText";
import EditorialSectionTitle from "@/components/Server/EditorialSectionTitle";
import IntroductionImage from "@/public/Introduction.png";
import * as motion from "motion/react-client";
import Image from "next/image";
import ResponsiveImage from "@/components/Client/ResponsiveImage";

export default function IntroductionServer() {
  return (
    <section aria-label="Akademiyle tanış" className="grid grid-rows-[auto_auto_auto] gap-y-12 bg-[#2B3530] px-3-75 pt-35 pb-35 text-[#D1CCBF] md:grid-cols-[1fr_1.9fr] md:grid-rows-[auto_auto] md:gap-y-28 md:px-15 md:pt-42-5 md:pb-50">
      <motion.div className="mb-2 md:col-start-2 md:mb-0">
        <ResponsiveImage parallaxAmount={8} disableParallaxOnReducedMotion>
          <Image
            src={IntroductionImage}
            alt="Doğayla çevrili sakin bir Yaşama Sanatı buluşma alanı"
            sizes="(min-width: 768px) 62vw, 100vw"
            className="w-full object-cover max-md:aspect-[1.18] md:h-auto"
          />
        </ResponsiveImage>
      </motion.div>

      <EditorialSectionTitle
        index="01"
        as="h2"
        className="md:col-start-1 md:row-start-2"
      >
        Tanışma
      </EditorialSectionTitle>

      <div className="flex min-w-0 flex-col gap-12 md:col-start-2 md:gap-20">
        {/* Katya-style manifesto staging (Phase 2): large serif, selected-word Kisthe accent,
            responsive-safe word reveal (replaces the old manual mobile/desktop line arrays). */}
        <TypographyStage
          segments={[
            { text: "Yaşama Sanatı'na hoş geldin. Burası; nefesin, enerjinin ve zihnin" },
            { text: "tek bir bütün", accent: true },
            {
              text: "olarak ele alındığı, altı köklü disiplini aynı çatı altında buluşturan bir şifa ve eğitim akademisi.",
            },
          ]}
        />

        <ScrollRevealText
          text="Bütünsel yaklaşımımız; zihinsel, bedensel ve enerjetik düzeyleri birbirinden ayırmadan, tek bir akışın parçaları olarak ele alır. Bizim için şifa, sadece yüzeysel semptomları bastırmak ya da geçici rahatlamalar sağlamak değil; bireyin kendi içsel bilgeliğiyle bağ kurarak dengenin kökten ve kalıcı olarak yeniden kurulmasına alan açmaktır. Bu yolculukta kadim öğretileri çağdaş yöntemlerle harmanlayarak, her bir seviyede derin bir uyanış, dönüşüm ve bütünleşme hedefliyoruz."
          className="max-w-[86vw] text-lg md:text-24 font-light [line-height:1.8] text-[#D1CCBF] md:max-w-[56rem] md:ml-auto gap-y-[0.3em]"
        />
      </div>
    </section>
  );
}
