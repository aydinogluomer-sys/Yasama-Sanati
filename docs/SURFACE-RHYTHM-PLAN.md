# YÜZEY RİTMİ — alt sayfaların tek düze yeşilden çıkarılması

> Tarih: **2026-09-02** · Kapsam: ana sayfa dışındaki 9 rota
> Yöntem: çalışan production sunucusunda, her rotanın sayfa boyunca 12 noktadan
> zemin örneklemesi. İddialar gözle değil pikselle kuruldu.
>
> Hiyerarşi: `docs/AWWWARDS-90-BLOCKERS.md` kapandı (G bölümü). Bu dosya onun
> devamı değil, ondan sonra tespit edilen ayrı bir tasarım işidir.

---

## 1. Ölçüm — sorun gerçek ve büyüklüğü belli

Her rotada sayfa boyunca 12 noktada sol kenardan zemin okundu:

| rota | yükseklik | yüzey dağılımı |
|---|---|---|
| `/` | 20610 px | ink %33 · deep %25 · warm %17 · bakır %8 · paper %8 · cream %8 |
| `/programlar` | 3294 px | **deep %100** |
| `/programlar/reiki` | 3759 px | **deep %100** |
| `/the-story` | 4954 px | **deep %100** |
| `/community` | 3784 px | **deep %100** |
| `/sss` | 2958 px | **deep %100** |
| `/blog` | 4507 px | deep %92 · footer %8 |
| `/egitmenler` | 2814 px | deep %92 · footer %8 |
| `/kvkk` | 3784 px | **deep %100** |

**Ana sayfa altı yüzey arasında geziniyor. Diğer dokuz rota 2,8–5 bin piksel
boyunca tek renk.** Kullanıcının "tek düze full yeşil" tespiti doğru ve bu
tablo onun ölçüsü.

## 2. Asıl bulgu — marka ikinci yüzeye ZATEN sahip

Yeni bir renk icat etmeye gerek yok. `/on-gorusme` ölçüldüğünde:

```
43,53,48     (deep)              %50,9
240,235,226  (warm parchment)    %44,1
198,117,74   (bakır)             %1,1
```

Bu rota `DESIGN.md`'de **"Meridyen Eşiği"** adıyla belgelenmiş: koyu zeytin
alanı, içinden geçen düz parşömen çalışma yüzeyi ve ikisini birleştiren bakır
dikiş. Ana sayfa da aynı ikiliği kullanıyor (`AkademiHikayesi` bölümü `paper`
zeminde).

Yani **açık yüzey dünyası markanın kendi malı; yalnızca iki yere hapsedilmiş.**
Plan bunu icat etmiyor, yayıyor.

### Elde hazır olan araçlar

| araç | durum |
|---|---|
| `SectionSeam` (from/to + bakır yıkama) | ana sayfada 6 kez kullanılıyor, hazır |
| Yüzey token'ları | `deep` `warm` `ink` `footer` `cream` `paper` |
| Açık zeminde metin | `--accent-copper-on-light` **#7A3F1C, ölçülmüş 5,13:1** · gövde için `text-deep` |
| Tek ekleme noktası | `SubPageLayout` — 11 rotayı tek bileşen sarıyor |

Yani altyapı var; eksik olan **kullanım kararı**.

---

## 3. İlke

> Alt sayfalara yeni bir renk EKLENMİYOR. Ana sayfanın zaten yaptığı şey —
> bölümden bölüme yüzey değiştirmek — alt sayfalara taşınıyor.

Bunun ikinci ve daha güçlü gerekçesi estetik değil **okunabilirlik**: uzun
metinli sayfalarda (hukuki metinler, blog yazıları) koyu zemin üzerine açık
metin, ters durumdan yorucudur. `/kvkk` 3784 px'lik bir metin duvarı ve şu an
tamamı koyu.

## 4. Rota → yüzey ataması

Sayfanın işine göre üç dünya:

| dünya | zemin | hangi rotalar | gerekçe |
|---|---|---|---|
| **Alan** (koyu) | `deep` / `warm` / `ink` | `/programlar`, 6 program sayfası | Fotoğraf öncüllü, atmosferik; koyu zemin fotoğrafı taşıyor |
| **Kâğıt** (açık) | `paper` | `/kvkk`, `/privacy-terms`, `/blog/[slug]` gövdesi | Uzun okuma. Ters kontrast burada bir maliyet, dekor değil |
| **Karma** (ritimli) | deep → paper → ink | `/the-story`, `/community`, `/sss`, `/egitmenler`, `/blog` | Editoryal bölümlü sayfalar; ana sayfanın ritmini alırlar |

**Hero her rotada koyu kalır.** Fotoğraf + scrim + `text-cream` dengesi
ölçülerek kuruldu (`qa/hero-contrast.mjs`, 8 hero 5,50–5,61:1); ona
dokunulmayacak. Değişim hero'nun ALTINDA başlar ve `SectionSeam` ile geçilir.

---

## 5. Fazlar

### Faz A — altyapı (davranış değişikliği yok)
1. `SubPageLayout`e `surface` prop'u: `"dark" | "paper" | "rhythm"`. Varsayılan
   `"dark"` — yani hiçbir sayfa istemeden değişmez.
2. Açık yüzey için metin eşlemesi tek yerde tanımlanır: gövde `text-deep`,
   ikincil `text-deep/70`, vurgu `--accent-copper-on-light`, kural çizgileri
   `border-deep/15`.
3. Hero → gövde ve gövde → footer geçişleri için `SectionSeam` kullanımı.

**Kapı:** `npm run verify` + `test:visual` (hiçbir kare değişmemeli — Faz A
kimseye `surface` vermiyor).

### Faz B — kâğıt dünyası (en düşük risk, en yüksek okuma kazancı)
4. `/kvkk` ve `/privacy-terms` → `paper`. `LegalShell` zaten tek bileşen.
5. Blog yazı gövdesi (`/blog/[slug]`) → `paper`; kapak ve başlık koyu kalır.

**Kapı:** `test:a11y` (0 ihlal) · `test:hero-contrast` · yeni kontrast ölçümü
açık zemin için · `test:visual -- --update` (kasıtlı) + ikinci koşu.

### Faz C — ritim
6. `/the-story`, `/community` bölümleri deep → paper → ink sırasına oturur.
7. `/sss`, `/egitmenler`, `/blog` listesine tek bir açık bant.

**Kapı:** B ile aynı + `test:reveal` (yüzey değişimi açılım animasyonunu
bozmamalı) + `test:browsers`.

### Faz D — doğrulama
8. Yüzey dağılımı yeniden ölçülür; hedef: hiçbir rota tek renk %100 olmasın.
9. Ölçüm scripti kalıcı kapıya çevrilir (`qa/surface.mjs`) ki tek düzelik geri
   dönerse yakalansın.

---

## 6. Riskler — önceden yazılıyor

| risk | neden ciddi | nasıl ele alınır |
|---|---|---|
| **Kontrast ters döner** | Açık zeminde `text-cream` (8,16:1 koyuda) okunmaz hâle gelir. Sitedeki 141 `text-cream` kullanımı koyu zemin varsayıyor | Açık yüzeyde metin token'ları TEK yerden eşlenir; `test:a11y` + piksel ölçümü zorunlu |
| **Bakır iki dünyada farklı** | `--color-copper` (#c9875b) koyuda 4,29:1 — açık zeminde çok daha düşük. Zaten bunun için `--accent-copper-on-light` (#7A3F1C, 5,13:1) var | Açık yüzeyde yalnız `on-light` varyantı kullanılır; kural kod incelemesiyle değil ölçümle doğrulanır |
| **Hero → gövde kopması** | `SubPageHeroMedia`nın alt geçişi `deep`e eriyor; altı açıksa kesik kenar oluşur | Geçiş `SectionSeam` ile yapılır (ana sayfada kanıtlanmış) |
| **Footer geçişi** | Footer koyu; açık gövdeden sert kesme olur | Ana sayfadaki paper → ink → footer sırası örnek alınır |
| **Görsel referanslar** | 32 karenin çoğu değişir | Kasıtlı; `--update` sonrası İKİNCİ koşu şart (yenileme "geçti" değildir) |
| **Grain katmanı** | `body::after` film grain açık zeminde farklı okunur | Açık bölümlerde opaklık ölçülüp ayarlanır |

## 7. Kapsam dışı

* Ana sayfa — kullanıcı "güzel" dedi, dokunulmuyor.
* `/on-gorusme` — kendi belgelenmiş sistemi var (A11).
* 3D sahneler — chakra renk sistemi.

---

## 8. Karar bekleyenler

1. **Ton seçimi.** Plan `paper` (#f3efe6) öneriyor çünkü ana sayfada zaten var.
   Alternatif `/on-gorusme`nin parşömeni (#f0ebe2) — daha sıcak. İkisi birden
   kullanılmamalı; biri seçilmeli.
2. **Ne kadar ileri?** Yalnız Faz B (hukuki + blog okuma) bile tek düzeliği
   kırar ve en düşük risklidir. Faz C sayfa sayısını artırır.
3. Faz A'nın `surface` prop'u varsayılanı `"dark"` — yani onay vermediğiniz
   hiçbir sayfa değişmez. Faz B/C ayrı ayrı onaylanabilir.


---

# FAZ A UYGULANDI (2026-09-02)

Seçilen ton: **#f0ebe2** (kullanıcı kararı) — markanın `DESIGN.md`'de
`warm-parchment`, `/on-gorusme` modülünde `--consultation-paper` adıyla zaten
taşıdığı değer.

## Ne yapıldı

* `--color-parchment: #f0ebe2` token'ı ve `palette.parchment`.
  `--color-paper` (#f3efe6) İLE KARIŞTIRILMADI: ikisi 6,4 birim uzakta ama
  işleri farklı — `paper` açık MÜREKKEP (29 `text-paper`, yalnız 1 `bg-paper`),
  `parchment` açık YÜZEY. Gerekçe token'ın yanına yazıldı ki ileride biri
  "yakın tonlar" diye birleştirmeye kalkmasın.
* `palette.footer` eklendi (`SectionSeam` rengi prop olarak alıyor).
* `.surface-parchment` sözleşmesi — açık dünyanın metin eşlemesi tek yerde.
* `SubPageLayout`e `surface?: "dark" | "parchment"` prop'u, **varsayılan
  `"dark"`**. Açık seçildiğinde hero→gövde ve gövde→footer geçişleri
  `SectionSeam` ile yapılıyor.

## İki hata çıktı ve ikisi de ölçümle yakalandı

**1. Operatör önceliği — gövde kaydı.** Sınıf birleştirmesi
`(acik ? "…" : "") + hideHero ? A : B` yazılmıştı; JavaScript bunu
`("" + hideHero) ? A : B` olarak ayrıştırıyor, yani `hideHero` daima truthy bir
dizgeye dönüşüp YANLIŞ dolgu seçiliyordu. Sonuç: bütün alt sayfaların gövdesi
kaydı — görsel regresyon 24 kare, `/kvkk` %2,27. `cn()` ile düzeltildi.
Faz A'nın "hiçbir şey değişmemeli" kuralı olmasa bu sessizce geçerdi.

**2. Sınıf adı kovalamak çalışmıyor.** Sözleşme önce
`.surface-parchment :where(.text-cream, …)` gibi seçicilerle yazıldı ve
ÖLÇÜLDÜĞÜNDE ÇALIŞMADI: opaklık değiştiricili utility'ler ayrı sınıf adları
üretiyor (`text-cream/80`, `/85`, `/70` …). Yerine değişkenin kapsam içinde
yeniden tanımlanması geldi; Tailwind v4 bu utility'leri
`color-mix(… var(--color-cream) …)` olarak derlediği için opaklıklı varyantlar
dâhil hepsi tek hamlede çevriliyor.

## Ölçülen kontrast (parşömen #f0ebe2 zemininde)

```
deep #2b3530            10,69:1
deep %72                 4,80:1
on-light #7A3F1C         6,92:1
cream (YANLIS kullanim)  1,31:1   <- eşleme olmasaydı metin görünmezdi
```

## Doğrulama

* Görsel regresyon **32/32 %0,000** — Faz A gerçekten atıl, hiçbir sayfa
  değişmedi (amaç buydu).
* Sözleşmenin çalıştığı ayrıca ölçüldü: sınıf canlı sayfaya enjekte edilip
  zemin `rgb(240,235,226)`, gövde `rgb(43,53,48)`, bakır `rgb(122,63,28)`,
  `text-cream/80` ise oklab lightness 0,853 → 0,318 olarak doğrulandı.
* Kapılar: a11y 0 · e2e 21/21 · viewports 8×21 · cursor 0 · selection 0 ·
  fonts 0 · typecheck · lint · build 27/27.

## Sırada

Faz B (`/kvkk`, `/privacy-terms`, blog gövdesi) ayrı onay bekliyor. Tesisat
hazır: o sayfalara `surface="parchment"` vermek yeterli.


---

# KAPANIŞ BANDI UYGULANDI (2026-09-03)

Kullanıcı kararı: **footer'dan önce kapanış bandı** (gövdenin tamamı değil),
renk **#f0ebe2**.

## Kapsam

`SubPageLayout` kullanan **15 rota** — yani ana sayfa ve `/on-gorusme` doğal
olarak dışarıda kalıyor (ikisi de bu bileşeni kullanmıyor). Kullanıcının
"landing dışındaki tüm sayfalar" tarifiyle birebir örtüşüyor.

## Bant ne İÇERMİYOR, neden

Bant bir CTA **değil**. Footer'ın kendisi zaten kapanış çağrısı ("Başlamak için
bir nefes yeter." + Ön Görüşme düğmesi); hemen üstüne ikinci bir çağrı koymak
ikisini de zayıflatırdı. Bant bir DURAK: bakır saç teli, marka imzası ve
markanın kendi cümlesi. **Yeni metin yazılmadı** — cümle ana sayfanın h1'inden
geliyor, sayfa kendi sözüyle kapanıyor.

## Geçişler: iki deneme çöpe gitti, üçüncüsü markanın kendi dili

1. `bg-gradient-to-b from-deep to-parchment` → **çamurlu**. Koyu yeşilden
   neredeyse beyaza doğrusal sRGB geçişi ortada gri bir şerit bırakıyor.
2. `linear-gradient(in oklab, …)` → **hâlâ çamurlu**. Ekran görüntüsüyle
   doğrulandı; sorun renk uzayı değil, geçişin bant olarak okunması.
3. Ana sayfaya bakıldı ve markanın bu soruya zaten cevabı olduğu görüldü:
   * koyu → açık : `SectionSeam` (bakır yıkama + meridyen ipliği)
   * açık → footer : **SERT KENAR** — `<Form />` (krem) doğrudan footer'a
     bağlanıyor, arada hiçbir şey yok.
   Aynısı uygulandı. Rota başına iki değil **bir** Motion bileşeni eklendi.

## Görsel kapıda bulunan GERÇEK boşluk

Bant eklendikten sonra `test:visual` **32/32 %0,000** dedi — oysa her alt
sayfanın en altı değişmişti. Sebep: kapı `fullPage: false` ile yalnız **ilk
ekranı** çekiyordu.

> Bu, oturum boyunca verilen "görsel 32/32 %0,000" güvencelerinin aslında
> **yalnız ilk ekran için** geçerli olduğu anlamına geliyor. Ekran altındaki
> hiçbir değişiklik bu kapıdan geçmiyordu.

Kapı rota başına **iki kare**ye çıkarıldı (sayfa başı + sayfa sonu), 32 → 64
karşılaştırma. Alt kare ilk hâlinde kararsızdı: ana sayfanın mobil alt karesi
üründe hiçbir değişiklik yokken %2,5 fark verdi, çünkü
`scrollTo(scrollHeight)` sayfa yüksekliği geç oturduğunda farklı noktaya denk
geliyor. Dibe iki kez inilerek düzeltildi; iki ardışık koşu 0.

## Doğrulama

16 kapı geçti (a11y 0 · e2e 21/21 · viewports 8×21 · zoom · keyboard ·
hero-contrast · reveal · cursor · selection · transition · fonts · links ·
images · seo · browsers) + görsel **64/64 %0,000** + typecheck + lint + build.

Bant beş rotada ölçüldü: zemin `rgb(240,235,226)`, yükseklik 297px, footer'a
bitişik (aralık 0).


---

# DÜZELTME: BANDIN ÜSTÜNDEKİ DİKİŞ KALDIRILDI (2026-09-03)

Yukarıdaki "Geçişler: … üçüncüsü markanın kendi dili" bölümü **geçersiz.**
Orada koyu→açık geçiş için `SectionSeam` seçilmişti; proje sahibi o dikişi
kaldırttı. Bölüm silinmiyor (ne düşünüldüğü kayıt), ama bağlayıcı olan bu
bölümdür.

**Kullanıcı:** *"Tüm sayfalarda -landing page hariç- beyaz kısımdan önceki
kısmı, landing page'de bulunan koyu yeşil yap."*

**Ölçüm — şikâyet somuttu.** Dikişin hesaplanmış değeri:
`168px linear-gradient(rgb(43,53,48) 0%, rgb(93,101,86) 36%, rgb(192,192,175) 64%, rgb(240,235,226) 100%)`
— ortası zeytin-gri, sonu soluk gri. Beyazdan önceki kısım koyu yeşil değil,
gri bir sisti.

**Belirsizlik soruldu, tahmin edilmedi.** Sitede iki koyu yeşil var:
gövdenin `deep` **#2b3530**'u ve ana sayfada beyaz `<Form />`ın hemen
üstündeki `warm` **#30493d**. İkisi farklı işe çıkıyordu. Seçim: **#2b3530,
dikiş tamamen silinsin.**

**Yeni sıra:**

```
gövde  #2b3530  ── KESKİN KENAR ──  bant  #f0ebe2  ── KESKİN KENAR ──  footer #293a32
```

Bandın üst boşluğu `pt-10 md:pt-14` → `pt-20 md:pt-28` yapıldı; dikişin
sağladığı 168 px'lik açıklık gidince bakır çizgi kesiğe yapışıyordu.

**Bu keskin kenar sitede yeni bir hamle** — ana sayfa koyu→açık her geçişte
dikiş kullanır, keskin kesme yalnız açık→koyu yönünde vardır. Marka dilinden
türetilmedi; proje sahibinin tercihi. Ayrıntı: `docs/decisions.md` D083.

**Faz B'ye devreden:** `SubPageLayout`in `surface="parchment"` dalı hâlâ
dikişli. Bugün hiçbir rota o dalı kullanmadığı için ekranda görünmüyor ve
ölçülemiyor; aynı kararın oraya taşınması Faz B'nin işi.
