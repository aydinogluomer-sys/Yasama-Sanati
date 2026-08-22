# Sanat Yönetimi — Açık Kareler ve Üretim Şartnamesi

> Bu dosya **sahte final asset üretmez.** Her madde bir dosya hedefi, en-boy oranı,
> sanat yönetimi kuralı ve üretim promptu verir. Görselleri kullanıcı üretir.
>
> Denetim tarihi: 2026-08-22 · Yöntem: 12 üretim karesi kontak sayfası olarak
> yan yana getirilip gözle incelendi.

---

## Karar kuralı — hangi dil doğru

**Doğru dil (marka):** Ege ve Anadolu. Taş, kireç badana, zeytin, keten, seramik,
terracotta, kuru ot, alçak akdeniz bitkisi. **Sıcak, yataya yakın doğal ışık**
(sabah erken / ikindi sonu). Renk sıcaklığı 4800–5600K. Toprak ve kum tonları.

**Yanlış dil (şu an kalan):** İskandinav/temperate retreat. Sık yeşil çam ormanı,
god-ray, yağmurlu ahşap pencere, yeşile boyalı doğrama, soğuk gri-mavi ışık.
Bunlar başka bir markanın iklimidir; Yaşama Sanatı'nın konumu "Online ve İzmir".

---

## Durum tablosu

| Dosya | Nerede görünür | Değerlendirme |
|---|---|---|
| `public/Hero/hero-desktop.jpg` | Hero | ✅ doğru — Ege yamacı, taş köy, zeytin, kuru ot |
| `public/Hero/hero-mobile.jpg` | Hero (mobil) | ✅ doğru |
| `public/ImageContainer/image-2.jpg` | Şifa Yolculuğu 02 | ✅ kabul — nötr sıcak iç mekân |
| `public/ImageContainer/image-4.jpg` | Şifa Yolculuğu 04 | ✅ doğru — mum, terracotta duvar |
| `public/group/meridyen-terapi.jpg` | Ana sayfa, 3 format | ✅ doğru — sıcak, keten |
| **`public/ImageContainer/image-1.jpg`** | **Şifa Yolculuğu 01** | ❌ yoğun yeşil orman bokeh'i |
| **`public/ImageContainer/image-3.jpg`** | **Şifa Yolculuğu 03** | ❌ yağmurlu pencere, arkada orman |
| **`public/ImageContainer/image-5.jpg`** | **Şifa Yolculuğu 05** | ❌ Nordic retreat, sık yeşil orman |
| **`public/group/mucizeler-kursu.jpg`** | **Ana sayfa, 3 format** | ❌ yeşil boyalı doğrama, yağmur |
| **`public/group/yasam-koclugu.jpg`** | **Ana sayfa, 3 format** | ❌ yağmurlu ahşap pencere |
| `public/group/reiki.jpg` | **hiçbir yerde** | ✅ doğru (sıcak keten, omuzda eller) ama render edilmiyor |
| `public/group/nefes-koclugu.jpg` | **hiçbir yerde** | ❌ god-ray çam ormanı — ama render edilmiyor |
| `public/group/hipnoterapi.jpg` | **hiçbir yerde** | ✅ doğru ama render edilmiyor |

**Görünür sorun 5 karede** ve hepsi **ana sayfada** — yani markanın en çok görülen
yüzeyinde. `group/` altındaki üç dosya hiçbir bileşenden referans almıyor
(`grep` ile doğrulandı); ya kullanılmalı ya silinmeli.

### 2026-08-22 güncellemesi — `SideBar/` ailesi artık sayfa hero'su

Menüden gidilen sayfalar düz koyu zeminden çıkarıldı: `public/SideBar/` kareleri
artık yalnız menü hover'ında değil, ilgili sayfanın tam genişlik hero'sunda da
kullanılıyor (`SubPageHeroMedia`). Bu, o karelerin sanat yönetimi ağırlığını
küçük bir thumbnail'den sayfanın açılış görüntüsüne yükseltti; hepsi bu gözle
yeniden denetlendi.

**Sonuç: 12 karenin 12'si de doğru dilde.** Kireç badanalı taş, zeytin, keten,
terracotta, kil, Ege ışığı. Tek bir orman / yağmur / Nordic kare yok. Deponun
en marka-tutarlı görsel ailesi buymuş ve hover'ın arkasında saklıydı.

| Kare | Sayfa | Değerlendirme |
|---|---|---|
| ana-sayfa · programlar · topluluk · blog · sss · on-gorusme | menü + ilgili sayfa | ✅ |
| nefes-koclugu · reiki · meridyen-terapi · mucizeler-kursu · hipnoterapi · yasam-koclugu | menü + program sayfaları | ✅ |

**Denenip vazgeçilen:** `ImageContainer/image-5.jpg` (Nordic orman penceresi)
yerine `group/hipnoterapi.jpg` konması denendi. Group kareleri 1200×1603 (3:4),
ImageContainer ise 2560×1433 (16:9); 16:9'a kırpınca üç denemede de rahatsız
edici yakınlıkta yüz planı çıktı ve bölüm kartına uygun olmadı. **Takas
yapılmadı** — o beş kare gerçekten yeni üretim istiyor.

### `SideBar/on-gorusme.jpg` — `FormImage.jpg`'nin kırpması (görsel olarak doğrulandı)

Yan yana karşılaştırıldı: aynı sahne — aynı demlik, aynı iki koltuk, aynı zeytin
dalı; yalnız kadraj biraz farklı. Yani "aynı kaynak" iddiası doğrulandı.

**Ama önem derecesi düzeltilmeli.** Bu kare YANLIŞ dilde değil; tam tersine ön
görüşme için çok uygun (oturup konuşmaya davet eden iki koltuk ve çay). Sorun
sanat yönetimi değil **tekrar**: aynı fotoğraf hem ana sayfadaki form bölümünde
hem menüde/`/on-gorusme` hero'sunda görünüyor. Kendi karesi üretilirse daha iyi
olur, ama bu bir gönderim engeli değil, cila maddesidir.

---

## Üretim şartnamesi

Ortak kuyruk (hepsinde aynı): `--ar 16:9 --v 7` (ImageContainer) veya
`--ar 4:5 --v 7` (group). Panel ayarları projenin kendi kuralına bırakılır;
`--style` / `--s` elle eklenmez.

Ortak negatif: `--no forest, pine trees, god rays, rain, snow, nordic cabin, teal grading, cold blue light, neon, text, watermark, logo`

### 1 · `public/ImageContainer/image-1.jpg` — Nefes Koçluğu · 16:9

> Şu anki kare: yeşil orman bokeh'i. Değişmeli.

```
A woman in her late thirties seated on a low limewashed stone ledge on a shaded
Aegean terrace, eyes closed, chest lifted mid-inhale, hands resting open on her
knees. Loose oatmeal linen shirt. Behind her a whitewashed wall with a single
old olive tree and dry golden grass, sea haze far in the distance. Late afternoon
sun raking from the left, warm 5200K, soft shadow on the wall. Editorial
photography, 50mm, shallow depth of field, natural skin texture, muted terracotta
and sage palette, no styling gloss --ar 16:9 --v 7 --no forest, pine trees, god rays, rain, snow, nordic cabin, teal grading, cold blue light, neon, text, watermark, logo
```

### 2 · `public/ImageContainer/image-3.jpg` — Mucizeler Kursu · 16:9

> Şu anki kare: yağmurlu pencere + orman. Değişmeli.

```
Still life on a worn olive-wood table beside a deep-set whitewashed window:
an open notebook with handwriting, a plain unglazed terracotta cup, a pair of
reading glasses, a sprig of dried thyme. Through the window, sunlit stone
village rooftops and a strip of Aegean sea. Warm morning light falling across
the page, dust in the air, 5000K. Editorial still life, 50mm, natural texture
of paper and clay, sand and sage palette --ar 16:9 --v 7 --no forest, pine trees, god rays, rain, snow, nordic cabin, teal grading, cold blue light, neon, text, watermark, logo
```

### 3 · `public/ImageContainer/image-5.jpg` — Hipnoterapi & Yaşam Koçluğu · 16:9

> Şu anki kare: Nordic retreat, sık orman. Değişmeli.

```
Two women in conversation on a shaded stone courtyard, seated on simple woven
rush chairs at a low table with two clay cups. One listening, leaning slightly
forward; the other mid-sentence, relaxed. Linen and undyed cotton clothing.
Background: limewashed wall, climbing bougainvillea, terracotta floor tiles,
strong warm side light and a hard shadow edge. Late afternoon, 5400K. Editorial
documentary photography, 35mm, candid posture, no eye contact with camera --ar 16:9 --v 7 --no forest, pine trees, god rays, rain, snow, nordic cabin, teal grading, cold blue light, neon, text, watermark, logo
```

### 4 · `public/group/mucizeler-kursu.jpg` — Sertifikalı Eğitimler · 4:5

> Şu anki kare: yeşil boyalı doğrama, yağmur. Değişmeli.

```
Small study group of four adults seated in a circle on a shaded stone terrace,
notebooks on their laps, one person speaking. Whitewashed wall behind, a single
olive tree, dry grass and low Mediterranean scrub. Linen and earth-tone clothing.
Warm late-afternoon light, long soft shadows across the terracotta floor, 5300K.
Editorial documentary photography, 35mm, natural grain, sand and sage palette --ar 4:5 --v 7 --no forest, pine trees, god rays, rain, snow, nordic cabin, teal grading, cold blue light, neon, text, watermark, logo
```

### 5 · `public/group/yasam-koclugu.jpg` — Küçük Grup Programları · 4:5

> Şu anki kare: yağmurlu ahşap pencere. Değişmeli.

```
A woman writing in a notebook at a small olive-wood table set against a
limewashed stone wall, warm light from an open doorway to her left. A clay cup
and a folded linen cloth beside the notebook. Calm, unhurried posture, natural
hair, no makeup gloss. Aegean interior, terracotta floor, 5200K morning light.
Editorial photography, 50mm, shallow depth of field, warm neutral palette --ar 4:5 --v 7 --no forest, pine trees, god rays, rain, snow, nordic cabin, teal grading, cold blue light, neon, text, watermark, logo
```

### 6 · `public/SideBar/on-gorusme.jpg` — menü kartı · 4:5

> Şu an FormImage.jpg'nin geçici kırpması. Kendi karesi olmalı.

```
Two clay cups and a small notebook on a limewashed stone ledge, seen from just
above, with a folded linen napkin and one sprig of dried olive leaf. Nobody in
frame — the image reads as an invitation to sit down and talk. Warm raking
morning light from the right, soft shadow, terracotta and oatmeal palette,
5200K. Editorial still life, 50mm, natural clay and stone texture --ar 4:5 --v 7 --no forest, pine trees, god rays, rain, snow, nordic cabin, teal grading, cold blue light, neon, text, watermark, logo
```

---

## Üretim sonrası

1. Dosyaları tam olarak yukarıdaki yollara, aynı adla koy (kod yolları sabit).
2. JPEG kalite ~82, uzun kenar 2000 px yeterli — `ImageContainer` kareleri en
   fazla 472 px genişlikte render ediliyor, `group` kareleri 440 px.
3. `npm run test:images` — kırık görsel ve optimizer 4xx kontrolü.
4. `npm run test:visual -- --update` — kasıtlı değişiklik olduğu için baseline yenilenir.
5. Bu dosyadaki durum tablosunu güncelle.
