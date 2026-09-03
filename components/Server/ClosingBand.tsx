import SignatureWordmark from "@/components/Server/SignatureWordmark";

/**
 * Kapanış bandı — footer'dan önceki açık nefes.
 *
 * NEDEN VAR
 * Ölçüldü: alt sayfaların dokuzu sayfa boyunca TEK renk (`deep %100`), ana
 * sayfa ise altı yüzey arasında geziniyor (docs/SURFACE-RHYTHM-PLAN.md).
 * Ana sayfada footer'dan hemen önce açık zeminli "Ücretsiz Ön Görüşme" bölümü
 * var ve sayfa oraya varınca bir kez nefes alıyor. Alt sayfalarda o nefes yok:
 * koyu gövde doğrudan koyu footer'a bağlanıyordu.
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
 * ÜSTTE GEÇİŞ YOK — KESKİN KENAR (proje sahibinin kararı, D083)
 * Önce buraya `SectionSeam from={deep} to={parchment}` konmuştu. ÖLÇÜLDÜ: o
 * dikiş 168px'lik bir SİS bandı üretiyordu —
 *   #2b3530 %0 -> rgb(93,101,86) %36 -> rgb(192,192,175) %64 -> #f0ebe2 %100
 * yani ortası zeytin-gri, sonu soluk gri. Koyu yeşil değildi ve sayfanın
 * kapanışını puslandırıyordu.
 *
 * Dikkat: bu KESKİN KENAR sitede yeni bir hamledir. Ana sayfa koyu->açık her
 * geçişte dikiş kullanır; keskin kesme yalnız AÇIK->KOYU yönünde var
 * (`<Form />` kremi doğrudan footer'a bağlanıyor). Yani "markanın mevcut dili"
 * diye savunulamaz — bilinçli bir tercih olarak seçildi: alt sayfalarda
 * beyazdan önceki kısım sisli değil, düpedüz koyu yeşil olsun diye.
 *
 * Yan etki (ölçülmedi, yapısal): bu bileşen artık hiç Motion içermiyor, yani
 * `SectionSeam`in kaldırılmasıyla alt sayfa başına bir istemci bileşeni azaldı.
 *
 * ALTTA DA GEÇİŞ YOK: parşömen doğrudan footer'a bağlanıyor — ana sayfada
 * krem `<Form />` de öyle bağlanıyor.
 */
export default function ClosingBand() {
  return (
    /* Üst boşluk keskin kenar yüzünden büyütüldü. Dikiş varken bandın üstünde
       168px'lik bir açıklık vardı ve `pt-10` yetiyordu; kenar sertleşince aynı
       değer bakır saç telini yeşil kesiğin dibine yapıştırıyordu. */
    <section
      aria-labelledby="kapanis-imza"
      className="surface-parchment px-6 pt-20 pb-20 md:px-16 md:pt-28 md:pb-28"
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
  );
}
