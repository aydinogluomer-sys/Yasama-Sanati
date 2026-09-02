import SectionSeam from "@/components/Client/SectionSeam";
import SignatureWordmark from "@/components/Server/SignatureWordmark";
import palette from "@/utils/palette";

/**
 * Kapanış bandı — footer'dan önceki açık nefes.
 *
 * NEDEN VAR
 * Ölçüldü: alt sayfaların dokuzu sayfa boyunca TEK renk (`deep %100`), ana
 * sayfa ise altı yüzey arasında geziniyor (docs/SURFACE-RHYTHM-PLAN.md).
 * Ana sayfada footer'dan hemen önce açık zeminli "Ücretsiz Ön Görüşme" bölümü
 * var ve sayfa oraya varınca bir kez nefes alıyor. Alt sayfalarda o nefes yok:
 * koyu gövde doğrudan koyu footer'a bağlanıyor.
 *
 * Bu bant o boşluğu dolduruyor. Renk kullanıcının seçimi: `--color-parchment`
 * (#f0ebe2) — markanın `DESIGN.md`'de `warm-parchment` adıyla zaten taşıdığı
 * ton.
 *
 * NEDEN İKİNCİ BİR CTA DEĞİL
 * Footer'ın kendisi zaten kapanış çağrısı: "Başlamak için bir nefes yeter." +
 * Ön Görüşme düğmesi. Buraya bir çağrı daha koymak ikisini yan yana düşürür ve
 * ikisini birden zayıflatırdı. Bu yüzden bant bir çağrı değil, bir DURAK:
 * bakır saç teli, marka imzası ve markanın kendi cümlesi. Yeni metin
 * yazılmadı — cümle ana sayfanın h1'inden geliyor, sayfa kendi sözüyle
 * kapanıyor.
 *
 * GEÇİŞLER MARKANIN KENDİ DİLİNDE
 * Önce iki taraf da CSS gradyanla yapıldı (JS eklememek için) ve GÖRÜNTÜ
 * ÇAMURLU ÇIKTI: koyu yeşilden neredeyse beyaza doğrusal geçiş, ne sRGB'de ne
 * oklab'de temiz duruyor — ortada gri bir şerit bırakıyor. Ekran görüntüsüyle
 * iki kez doğrulandı.
 *
 * Ana sayfaya bakıldığında markanın bu soruya zaten bir cevabı olduğu görüldü:
 *   koyu -> açık   : `SectionSeam` (bakır yıkama + meridyen ipliği)
 *   açık -> footer : SERT KENAR — `<Form />` (krem) doğrudan footer'a bağlanıyor,
 *                    arada hiçbir şey yok.
 * Burada aynısı uygulanıyor. Üstte tek bir `SectionSeam`, altta hiçbir şey.
 * Rota başına iki değil BİR Motion bileşeni ekleniyor ve görüntü markanın
 * geri kalanıyla aynı dili konuşuyor.
 */
export default function ClosingBand() {
  return (
    <>
      {/* Koyu gövde -> parşömen: markanın dikişi. */}
      <SectionSeam from={palette.deep} to={palette.parchment} />

      <section
        aria-labelledby="kapanis-imza"
        className="surface-parchment px-6 pt-10 pb-20 md:px-16 md:pt-14 md:pb-28"
      >
        <div className="max-w-wide">
          <span aria-hidden className="mb-8 block h-px w-16 bg-[var(--accent-copper-on-light)] md:w-20" />
          <SignatureWordmark
            className="text-3xs font-medium tracking-[0.32em] text-[var(--accent-copper-on-light)] uppercase not-italic"
          >
            Yaşama Sanatı
          </SignatureWordmark>
          <p
            id="kapanis-imza"
            className="mt-5 max-w-editorial font-serif text-display-s leading-[1.08] font-normal text-deep"
          >
            Beden, zihin ve enerji, <span className="italic">tek bütün.</span>
          </p>
        </div>
      </section>

      {/* Parşömen -> footer: SERT KENAR, bilerek.
          Ana sayfada da böyle — krem `<Form />` doğrudan footer'a bağlanıyor.
          Araya gradyan koymak o dili bozar ve çamur üretir (denendi). */}
    </>
  );
}
