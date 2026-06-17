import { Fragment } from "react";
import ResponsiveMaskTextVariant from "@/components/Client/ResponsiveMaskTextVariant";
import ResponsiveMarquee from "@/components/Client/ResponsiveMarquee";
import SustainableRetreatClient from "@/components/Client/SustainableRetreatClient";

export default function SustainableRetreat() {
  return (
    <div className="bg-[#30493D] py-36 text-[#D1CCBF] md:py-60">
      <ResponsiveMarquee
        animationConfig={{
          mobile: {
            max: "-887px",
            speed: 50,
          },
          desktop: {
            max: "-88.7%",
            speed: 5,
          },
        }}
      >
        {"Sürdürülebilir İnziva • Sürdürülebilir İnziva • Sürdürülebilir İnziva • "}
      </ResponsiveMarquee>

      <div className="mt-18 flex flex-col gap-y-14 px-8-25 md:mt-26 md:grid md:grid-cols-3 md:grid-rows-[auto_auto] md:gap-y-24 md:px-16">
        <div className="flex flex-col gap-14 md:col-span-2 md:col-start-2 md:flex-row">
          <ResponsiveMaskTextVariant
            desktop={[
              <Fragment key="d-0">
                Resort ve Rezidanslarımızda ortaklık bilincini
              </Fragment>,
              <Fragment key="d-1">
                geliştirmeye, gelişen bir ekosistem inşa etmeye,
              </Fragment>,
              <Fragment key="d-2">
                güçlü bir Topluluk beslemeye ve gezegenimizin
              </Fragment>,
              <Fragment key="d-3">
                sağlığına öncelik vermeye inanıyoruz.
              </Fragment>,
              <Fragment key="d-4">
                Bu değerler, kişiselleştirilmiş Esenlik
              </Fragment>,
              <Fragment key="d-5">
                deneyiminizin her yönünü şekillendirir.
              </Fragment>,
            ]}
            mobile={[
              <Fragment key="m-0">
                Resort ve Rezidanslarımızda ortaklık
              </Fragment>,
              <Fragment key="m-1">
                bilincini geliştirmeye, gelişen bir
              </Fragment>,
              <Fragment key="m-2">
                ekosistem inşa etmeye, güçlü bir
              </Fragment>,
              <Fragment key="m-3">
                Topluluk beslemeye ve gezegenimizin
              </Fragment>,
              <Fragment key="m-4">
                sağlığına öncelik vermeye inanıyoruz.
              </Fragment>,
              <Fragment key="m-5">Bu değerler, kişiselleştirilmiş Esenlik</Fragment>,
              <Fragment key="m-6">deneyiminizin her yönünü şekillendirir.</Fragment>,
            ]}
            className="text-base [line-height:1.33] md:text-lg"
          />

          <ResponsiveMaskTextVariant
            desktop={[
              <Fragment key="d2-0">
                Zihin, beden ve ruhun uyum içinde geliştiği,
              </Fragment>,
              <Fragment key="d2-1">
                birbirimizle ve doğal dünyayla bağları
              </Fragment>,
              <Fragment key="d2-2">
                güçlendiren, tatmin kavramını maddi
              </Fragment>,
              <Fragment key="d2-3">
                başarının ötesinde yeniden tanımlayan
              </Fragment>,
              <Fragment key="d2-4">bir dünya hayal ediyoruz.</Fragment>,
            ]}
            mobile={[
              <Fragment key="m2-0">
                Zihin, beden ve ruhun uyum içinde
              </Fragment>,
              <Fragment key="m2-1">
                geliştiği, birbirimizle ve doğal
              </Fragment>,
              <Fragment key="m2-2">
                dünyayla bağları güçlendiren, tatmin
              </Fragment>,
              <Fragment key="m2-3">
                kavramını maddi başarının ötesinde
              </Fragment>,
              <Fragment key="m2-4">yeniden tanımlayan bir dünya hayal ediyoruz.</Fragment>,
            ]}
            className="text-base [line-height:1.33] md:text-lg"
          />
        </div>
        <SustainableRetreatClient />
      </div>
    </div>
  );
}
