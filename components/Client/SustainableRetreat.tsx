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
            max: "-763px",
            speed: 50,
          },
          desktop: {
            max: "-76.3%",
            speed: 5,
          },
        }}
      >
        {"Çalışma Alanları • Çalışma Alanları • Çalışma Alanları • "}
      </ResponsiveMarquee>

      <div className="mt-18 flex flex-col gap-y-14 px-8-25 md:mt-26 md:grid md:grid-cols-3 md:grid-rows-[auto_auto] md:gap-y-24 md:px-16">
        <div className="flex flex-col gap-14 md:col-span-2 md:col-start-2 md:flex-row">
          <ResponsiveMaskTextVariant
            desktop={[
              <Fragment key="d-0">
                Akademide üç formatta çalışıyoruz:
              </Fragment>,
              <Fragment key="d-1">
                birebir seanslar, küçük grup
              </Fragment>,
              <Fragment key="d-2">
                programları ve sertifikalı eğitimler.
              </Fragment>,
              <Fragment key="d-3">
                Her programın süresi, ön koşulu ve
              </Fragment>,
              <Fragment key="d-4">
                kazanımı kendi sayfasında açıkça
              </Fragment>,
              <Fragment key="d-5">
                yazar; sürpriz yok.
              </Fragment>,
            ]}
            mobile={[
              <Fragment key="m-0">
                Akademide üç formatta çalışıyoruz:
              </Fragment>,
              <Fragment key="m-1">
                birebir seanslar, küçük grup
              </Fragment>,
              <Fragment key="m-2">
                programları ve sertifikalı eğitimler.
              </Fragment>,
              <Fragment key="m-3">
                Her programın süresi, ön koşulu ve
              </Fragment>,
              <Fragment key="m-4">
                kazanımı kendi sayfasında açıkça
              </Fragment>,
              <Fragment key="m-5">yazar; sürpriz yok.</Fragment>,
            ]}
            className="text-base [line-height:1.33] md:text-lg"
          />

          <ResponsiveMaskTextVariant
            desktop={[
              <Fragment key="d2-0">
                "Buraya uyku sorunum için
              </Fragment>,
              <Fragment key="d2-1">
                geldim; nefesimle, sınırlarımla
              </Fragment>,
              <Fragment key="d2-2">
                ve kendimle tanışıp çıktım.
              </Fragment>,
              <Fragment key="d2-3">
                İyi ki."
              </Fragment>,
              <Fragment key="d2-4">
                — Z. A., Nefes Koçluğu katılımcısı
              </Fragment>,
            ]}
            mobile={[
              <Fragment key="m2-0">
                "Buraya uyku sorunum için
              </Fragment>,
              <Fragment key="m2-1">
                geldim; nefesimle, sınırlarımla
              </Fragment>,
              <Fragment key="m2-2">
                ve kendimle tanışıp çıktım.
              </Fragment>,
              <Fragment key="m2-3">
                İyi ki."
              </Fragment>,
              <Fragment key="m2-4">
                — Z. A., Nefes Koçluğu katılımcısı
              </Fragment>,
            ]}
            className="text-base [line-height:1.33] md:text-lg italic"
          />
        </div>
        <SustainableRetreatClient />
      </div>
    </div>
  );
}
