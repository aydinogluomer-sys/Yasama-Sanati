# Yaşama Sanatı — Landing Page Midjourney Prompt Paketi

> Ana sayfadaki her raster/video varlığın envanteri ve markaya rafine Midjourney yeniden-üretim
> promptları. Promptlar İngilizce (MCP `generating_image` yalnız İngilizce kabul eder).
> Kullanım: Midjourney web/Discord'da prompt sonuna `--ar <oran>` ekleyin; MCP aracında
> `aspect_ratio` parametresi olarak verin. Üretilen dosyayı **aynı yola aynı adla** kaydederseniz
> kod değişikliği gerekmez (`next/image` boyutlandırma/optimizasyonu otomatik yapar).

---

## Midjourney Panel Ayarları (bir kez ayarlayın)

| Ayar | Değer | Neden |
|---|---|---|
| **Raw** | **Raw** (Standard DEĞİL) | En kritik ayar. Standard, MJ'nin otomatik güzelleştirmesini uygular → aşırı render / stok-AI havası. Raw ham, fotoğrafik sonuç verir. |
| **Stylization** | Düşük (~0–100) | Yüksek stylization prompt'tan saptırır; mevcut görsellerle tutarlı bir set için prompt sadakati şart. |
| **Weirdness** | 0 | Sürrealizm yok. |
| **Variety** | 0 | Tutarlı set. |
| **Version** | 8.1 | En yeni model. |
| **Standard / HD** | HD | Yüksek detay, temiz upscale. |
| **Aspect Ratio** | Panelde bırakılabilir | Promptlar `--ar` içeriyor ve **paneli ezer** — her görselde paneli değiştirmeye gerek yok. |
| **Speed** | Relax | Kotasızsa ücretsiz; acele varsa Fast. |
| **Video ayarları** | Yoksay | Sadece Animate (video) için. |

**Negatif parametre** (kopyalanan promptun sonuna eklenir):

```
--no neon, mystical symbols, oversaturated, text, watermark, logo
```

---

## Marka Stil Bloğu (her prompta eklenir)

Tüm promptların sonunda şu stil kuyruğu kullanılır — aşağıdaki kartlarda `[STYLE]` olarak
kısaltılmıştır:

```
muted deep forest green and warm parchment palette with soft copper accents,
editorial wellness photography, soft cinematic natural light, calm negative space,
quiet luxury, authentic human warmth, photorealistic, shot on medium format film
```

**Kaçınılacaklar (anti-patterns.md/R1):** neon renkler, literal çakra ikonografisi, mistik
semboller, glassmorphism, parıltı/partikül efektleri, jenerik "AI wellness stock" havası,
aşırı doygun renkler. Gerekirse prompta `--no neon, mystical symbols, oversaturated`
ekleyin.

**Palet referansı:** derin yeşil `#2B3530`/`#30493D` · parşömen `#F3EFE6` · bakır
`#C9875B` · kemik `#D1CCBF`.

---

## 1. Hero Görselleri (2 prompt) — TAMAMLANDI (2026-08-20)

> **Güncelleme (2026-08-18, D046):** Modal tanıtım filmi kaldırıldı — `components/VideoPlayer/`,
> `elementis-fullmp4.mp4` (28,8 MB) ve `elementis-posterjpg.png` silindi. Oynatıcı "Yaşama Sanatı
> tanıtım filmi" diye etiketliydi ama Elementis'in kendi reklam filmini oynatıyordu. Eski **1B**
> kartı (modal film posteri) bu yüzden geçersiz; yerine aşağıdaki 1B *masaüstü hero still* geldi.
>
> **Kritik:** `public/Hero/` içindeki üç dosyanın da tamamı `first commit`'ten geliyor ve bugüne
> kadar yalnızca yeniden encode edildi — hiçbiri Ege yönüyle üretilmedi. `elementis-cover-mjpg.png`
> 2026-08-18'de açılıp doğrulandı: soğuk mavi, sisli dağ/bulut — yani 1A promptunun `--no`
> listesindeki tam o sapma. Aşağıdaki promptlar **yapılacak işi** tarif eder, yapılmış işi değil.
>
> **Hedef:** hero'daki iki video döngüsü iki *still* ile değiştirilecek (yavaş ölçek/parallax
> hareketi koddan gelir, videodan değil). Dosyalar aşağıdaki yeni adlarla kaydedilecek —
> `elementis-` öneki bilinçli olarak bırakılıyor. Dosyalar repoya girdiğinde hero kodu
> (`sections/Hero/Client/Desktop.tsx` + `Mobile.tsx`) `<video>` yerine `next/image` kullanacak
> şekilde güncellenecek; bu bir kod işidir, sadece dosya kopyalamak yetmez.

### 1A — Hero still, dikey (mobil)
- **Hedef dosya:** `public/Hero/hero-mobile.jpg` — 1080×1920 (9:16)
- **Değiştirdiği:** `elementis-mmp4.mp4` + `elementis-cover-mjpg.png`
- **Render:** mobil hero arka planı ve viewport çözülmeden gösterilen ilk kare (LCP).
  Üzerinde alttan `#2b3530` scrim var; alt %30 kısmen koyulaşır. Başlık bloğu alt yarıda
  oturduğu için **kompozisyonun alt yarısı sakin kalmalı**.
- **`aspect_ratio`:** `9:16`
- **Prompt:**
```
a woman's hand gently resting on a weathered Aegean stone doorway framed by a flowing linen curtain, upper half of the frame, a glimpse of a warm lamplit room beyond with earthenware and soft textiles, an olive branch entering from the edge, golden dusk in a stone village, quiet moment of arrival and welcome, shallow depth of field, calm shadowed stone floor and empty foreground filling the lower half of the frame, muted deep forest green and warm parchment palette with soft copper accents, editorial wellness photography, soft cinematic natural light, quiet luxury, authentic human warmth, photorealistic, shot on medium format film --ar 9:16 --no faces, portrait, pine forest, redwood, misty mountains, clouds from above, wooden cabin, lodge, resort, tropical, palm, cold blue light, neon, mystical symbols, oversaturated, text, watermark, logo
```

### 1B — Hero still, yatay (masaüstü)
- **Hedef dosya:** `public/Hero/hero-desktop.jpg` — 2560×1440 (16:9)
- **Değiştirdiği:** `elementismp4.mp4`
- **Render:** masaüstü hero arka planı. Üzerinde `useMaskImage` (24 dilimli scroll maskesi) ve
  %25 parallax var. Başlık bloğu **sol %45'i** kapladığı için o bölge gölge/açık gökyüzü gibi
  sakin kalmalı; mimari ilgi ve sıcak ışık sağ-merkezde toplanmalı.
- **`aspect_ratio`:** `16:9`
- **Prompt:**
```
cinematic wide establishing shot of a small stone wellness academy on an Aegean hillside at golden hour, lime-washed walls and terracotta roofs clustered on the right side of the frame, warm lamplight in deep-set windows, olive groves and cypress trees, a worn stone path, open hazy sky and calm empty hillside filling the left of the frame, the distant sea beyond, timeless Mediterranean landscape, muted deep forest green and warm parchment palette with soft copper accents, editorial architectural photography, soft cinematic natural light, calm negative space, quiet luxury, photorealistic, shot on medium format film --ar 16:9 --no people, faces, pine forest, redwood, misty blue mountains, alpine lodge, wooden resort, aerial drone, tropical, palm, cold blue light, neon, mystical symbols, oversaturated, text, watermark, logo
```

### 1B-alt — Masaüstü hero, yakın plan (alternatif konsept)
Kuruluş planı fazla "manzara" gelirse: Introduction.png'nin taş avlu dünyasına yakın,
daha samimi bir eşik kadrajı. Aynı dosyaya kaydedilir.
```
cinematic wide shot of a stone courtyard threshold in an Aegean village house at blue hour, olive trees and a lime-washed wall on the right, warm lamplight spilling from a deep-set doorway, terracotta and worn stone paving, calm shadowed wall and open dusk sky filling the left of the frame, muted deep forest green and warm parchment palette with soft copper accents, editorial architectural photography, soft cinematic natural light, calm negative space, quiet luxury, photorealistic, shot on medium format film --ar 16:9 --no people, faces, pine forest, redwood, misty blue mountains, alpine lodge, wooden resort, aerial drone, tropical, palm, cold blue light, neon, mystical symbols, oversaturated, text, watermark, logo
```

### Neden Midjourney, neden bu paket
Impeccable'ın yerleşik görsel üretim yolu (`generate-image.mjs`, gpt-image-2) 2026-08-18'de
denendi ve **API 401 — geçersiz anahtar** ile başarısız oldu; ayrıca o araç en fazla 1536×1024
üretiyor, yani masaüstü hero için gereken 2560px'i zaten karşılamıyor. Sitedeki tüm mevcut
fotoğraf bu paketle ve yukarıdaki panel ayarlarıyla üretildi; hero'yu da aynı yoldan üretmek
görsel setin tutarlılığı için doğru olan.

---

## 2. Introduction — Buluşma Alanı

- **Dosya:** `public/Introduction.png` — 1344×896 (3:2), 2.15 MB
- **Render:** `sections/Introduction/Server.tsx:14` — split kompozisyonun sağ sütunu
  (62vw), parallax 8px; mobilde `aspect-[1.18]` kırpılır. Daha önce Retreat hover setinde
  6. görsel (Reiki) olarak da içe aktarılıyordu; bölüm 6'daki 2026-07-13 kod
  güncellemesiyle bu çift-kullanım bitirildi — `public/group/reiki.jpg` artık ayrı bir
  dosya (şu an bu görselin geçici bir kopyasını taşıyor, bkz. bölüm 6.6, disipline özel
  yenisiyle değiştirilecek).
- **Mevcut alt:** "Doğayla çevrili sakin bir Yaşama Sanatı buluşma alanı"
- **`aspect_ratio`:** `3:2`
- **Prompt:**
```
sunlit stone courtyard of a small Aegean wellness academy at blue hour, lime-washed walls and terracotta tiles, olive branches framing a softly lit stone pathway with warm garden lights, architectural photography, sense of arrival and welcome, [STYLE] --ar 3:2 --no pine forest, tropical, palm, thatched roof, resort, lodge
```

---

## 3. WellnessSanctuary — Dingin İç Mekân

- **Dosya:** `public/WellnessSanctuaryImage.png` — 2250×2905 (0.77 dikey), 4.82 MB
- **Render:** `sections/WellnessSanctuary/Server.tsx:29` — `md:grid-cols-2` split'in sol
  yarısı, tam yükseklik, parallax 20px, `#30493D` zemin üzerinde.
- **Mevcut alt:** "Kişiye özel yaklaşımı temsil eden dingin bir iç mekân"
- **`aspect_ratio`:** `3:4`
- **Prompt:**
```
a woman meditating cross-legged by an infinity pool at dawn overlooking misty mountains, palms together above head, natural unposed serenity, soft morning haze, muted earth tones, [STYLE] --ar 3:4
```
- Alternatif (insansız iç mekân istenirse):
```
serene minimalist therapy room interior with linen floor cushions, warm wooden beams, soft daylight through sheer curtains, a single ceramic tea bowl, stillness and craft, [STYLE] --ar 3:4
```

---

## 4. Innovation "Şifa Yolculuğu" Sahnesi (5 prompt) — KORUMALI KOD · YENİDEN ÜRETİLECEK

Görseller `components/Client/Innovation.tsx:47` dizisinden gelir; her biri hem 500vh scroll
sahnesinin **tam ekran arka planı** (maskeli nefes-wipe + scale 1.075→1) hem kartın
`aspect-[1.85]` küçük penceresi olarak kullanılır. **Kod korumalı — yalnız dosyalar
değiştirilir, aynı adlarla** (`.jpg`).

> **Durum (2026-08-21):** mevcut beş kare ılıman/ahşap dilde — çam ormanı god-ray'i, yağmurlu
> ahşap pencere, turuncu ağır iç mekân. Introduction / Wellness / Form / Hero / menü setinin
> kurduğu **Ege taş dilinden kopuklar**, ve bu sayfanın en uzun bölümü (5 ekran, sayfanın %22'si).
> Aşağıdaki promptlar aynı sahneleri Ege diline taşır.

**Kompozisyon kısıtı — önemli:** bu kareler tam ekran arka plan olarak kullanılır ve **ortalarını
krem kart kapatır**. Bu yüzden her promptta özne üçte birlik bir yana kaydırılmış, merkez sakin
bırakılmıştır. Merkeze konan detay ziyaretçiye hiç görünmez.

**Hedef:** `--ar 16:9`, en az 2560px genişlik (mevcutlar 2560×1433).

### 4.1 — Nefes Koçluğu → `public/ImageContainer/image-1.jpg`
```
a wide stone room in an Aegean house with tall shuttered doors thrown open to the morning, sheer linen curtains lifting on the moving air, a loose circle of floor cushions on a worn stone floor, an olive branch in a terracotta jar near the wall, the centre of the frame left as quiet empty floor, no people, early clear light, muted deep forest green and warm parchment palette with soft copper accents, editorial wellness photography, soft cinematic natural light, calm negative space, quiet luxury, authentic human warmth, photorealistic, shot on medium format film --ar 16:9 --no neon, mystical symbols, glowing aura, light rays, god rays, sparkles, particles, chakra icons, oversaturated, stock photo look, pine forest, redwood, temperate forest, rainy window, timber cabin, wooden lodge, alpine, nordic, tropical, palm, cold blue light, text, watermark, logo, smoke, vapour, incense
```

### 4.2 — Meridyen Terapi ve Kinesiyoloji → `public/ImageContainer/image-2.jpg`
```
a practitioner's hands working along a person's forearm on a linen-covered table placed in the left third of the frame, warm low lamplight, dry stone wall behind, folded linen towels and a small terracotta oil bowl, the right half of the frame quiet shadowed wall, muted deep forest green and warm parchment palette with soft copper accents, editorial wellness photography, soft cinematic natural light, calm negative space, quiet luxury, authentic human warmth, photorealistic, shot on medium format film --ar 16:9 --no neon, mystical symbols, glowing aura, light rays, god rays, sparkles, particles, chakra icons, oversaturated, stock photo look, pine forest, redwood, temperate forest, rainy window, timber cabin, wooden lodge, alpine, nordic, tropical, palm, cold blue light, text, watermark, logo, acupuncture needles, medical clinic, clinical white, surgical gloves
```

### 4.3 — Mucizeler Kursu / zihin → `public/ImageContainer/image-3.jpg`
```
a long worn olive-wood table beneath deep-set Aegean windows, several open cloth-bound books and handwritten pages spread along its length, a ceramic cup, morning light falling in bands across the wood, lime-washed walls, the centre of the table left bare, no people, muted deep forest green and warm parchment palette with soft copper accents, editorial wellness photography, soft cinematic natural light, calm negative space, quiet luxury, authentic human warmth, photorealistic, shot on medium format film --ar 16:9 --no neon, mystical symbols, glowing aura, light rays, god rays, sparkles, particles, chakra icons, oversaturated, stock photo look, pine forest, redwood, temperate forest, rainy window, timber cabin, wooden lodge, alpine, nordic, tropical, palm, cold blue light, text, watermark, logo, crucifix, religious iconography, church interior, altar
```

### 4.4 — Reiki Enerji Eğitimleri → `public/ImageContainer/image-4.jpg`
```
a practitioner's open palms held just above a resting person's shoulders without touching, placed in the right third of the frame, both wearing linen, on a low bed in a lime-washed stone room, warm lamplight and daylight from a deep window, the left of the frame quiet stone wall, muted deep forest green and warm parchment palette with soft copper accents, editorial wellness photography, soft cinematic natural light, calm negative space, quiet luxury, authentic human warmth, photorealistic, shot on medium format film --ar 16:9 --no neon, mystical symbols, glowing aura, light rays, god rays, sparkles, particles, chakra icons, oversaturated, stock photo look, pine forest, redwood, temperate forest, rainy window, timber cabin, wooden lodge, alpine, nordic, tropical, palm, cold blue light, text, watermark, logo, glowing hands, energy glow, halo, radiant light between palms, lens flare
```

### 4.5 — Hipnoterapi & Yaşam Koçluğu → `public/ImageContainer/image-5.jpg`
```
a low daybed set into a deep stone window recess, a soft wool blanket folded back, a small brass lamp lit beside it, an open notebook and pen resting on a stool, late afternoon Aegean light across a terracotta floor, no people, restful and reflective, muted deep forest green and warm parchment palette with soft copper accents, editorial wellness photography, soft cinematic natural light, calm negative space, quiet luxury, authentic human warmth, photorealistic, shot on medium format film --ar 16:9 --no neon, mystical symbols, glowing aura, light rays, god rays, sparkles, particles, chakra icons, oversaturated, stock photo look, pine forest, redwood, temperate forest, rainy window, timber cabin, wooden lodge, alpine, nordic, tropical, palm, cold blue light, text, watermark, logo, pendulum, pocket watch, spiral, swirling pattern, clinical white
```

---

## 5. ElementisStory — Krem Bölüm Fotoğrafları (2 prompt)

### 5.1 — `public/elementis-stories/picture-1.png` (720×896, 0.8 dikey)
- **Render:** `sections/ElementisStory/Client/index.tsx` — masaüstünde `col-span-3`,
  parallax 10; mobilde carousel. Krem `#F3EFE6` zemin.
- **Mevcut alt:** "Akademinin sakin ve doğal çalışma ortamı"
- **Durum (2026-07-20 düzeltildi):** Önceki revizyon bu sahneyi "taş duvarlı akademi" olarak
  ağırlaştırmıştı — ama ElementisStory kasıtlı olarak sitenin **krem, hafif, kişisel** bölümü
  (bkz. `docs/progress.md` "Section Rhythm & Visual Mass": Introduction/Wellness/Form/Retreat'in
  ağır taş-oda motifinden farklılaştırılmış, yüksek kontrastlı açık bir mola noktası). Taşı buraya
  da eklemek bölümü diğerleriyle aynılaştırıp krem tonun kendine özgü rolünü kaybettiriyordu.
  Aşağıdaki prompt ağır taşı çıkarıp Hero 1B'de zaten kurulu olan daha hafif Ege yüzeylerine
  (lime-washed duvar, keten, terracotta) bağladı; bu sürümle yeniden üretildi ve
  `public/elementis-stories/picture-1.png` olarak yüklendi (lime-washed duvar, keten perde,
  terracotta vazoda zeytin dalı, günlük — doğrulandı). **Not:** dosya adı `.jpg` → `.png` değişti;
  `sections/ElementisStory/Client/index.tsx`'teki import buna göre güncellendi.
- **`aspect_ratio`:** `4:5`
```
a sunlit reading nook with a lime-washed wall, a rattan chair and a weathered wooden desk holding a small olive branch in a terracotta vase, handwritten notes and an open journal, a linen curtain softly diffusing daylight, warm lived-in authenticity, [STYLE] --ar 4:5 --no office, corporate, modern glass building, city skyline, cars, urban, dark stone wall
```

### 5.2 — `public/elementis-stories/picture-2.png` (1452×1642, 0.88 dikey)
- **Mevcut alt:** "Yaşama Sanatı topluluğundan bir buluşma anı"
- **Durum (2026-07-20 düzeltildi):** Eski `picture-2.jpg` marka diliyle uyumsuzdu (arka planda
  Amerikan tipi araçlar ve batılı bir bitki dükkanı vitrini — jenerik Batı stok fotoğrafı). Aşağıdaki
  prompt ile yeniden üretildi ve `public/elementis-stories/picture-2.png` olarak yüklendi (taş duvarlı
  oda, zeytin dalı, derin taş pencere — doğrulandı). **Not:** dosya adı `.jpg` → `.png` değişti;
  `sections/ElementisStory/Client/index.tsx`'teki import buna göre güncellendi (aynı Introduction.jpg
  sorunuyla aynı desen — bir asset'i farklı uzantıyla değiştirirken importu kontrol etmeyi unutma).
- **`aspect_ratio`:** `4:5`
```
a small circle of people seated on floor cushions inside a warm stone-walled academy room, in genuine conversation and quiet laughter, natural woven textiles, potted olive branches, soft daylight through a deep-set stone window, documentary community moment, no camera awareness, [STYLE] --ar 4:5 --no cars, street, storefront, retail shop, city traffic, glass shopfront, urban
```

---

## 6. SustainableRetreat Hover Seti (6 prompt) — YENİDEN ÜRETİLECEK

`components/Client/SustainableRetreatClient.tsx` içindeki "Çalışma Alanları" bölümünde, program
adının üstüne gelindiğinde açılan kutuda görünürler. Hepsi dekoratif (`alt=""`).
**Kod hazır — üretilen görseli aynı adla üzerine yazmak yeterli** (`.jpg`).

> **Durum (2026-08-21):** bu bölümün eski kaydı (Bali pirinç tarlaları, kurumsal ofis stoğu)
> **artık geçerli değil** — o kareler 2026-07-13'te değiştirildi. Ama gelen yeni set de ılıman
> dilde: sisli çam ormanında god-ray'li portre (Nefes), yağmur damlalı ahşap pencerede yazan
> kadın (Yaşam Koçluğu), ahşap/yeşil duvarda kitap (Mucizeler). Ege diline taşınmalı.

**Çerçeveleme kuralı:** aynı disiplinin sitede üç ayrı karesi var — menü (5:8, yakın/samimi),
bu set (4:5, orta plan, pratik görünür), Şifa Yolculuğu (16:9, geniş/mekânsal). Üçünün
**ölçeği farklı olmalı**, yoksa aynı fotoğrafın üç kopyası gibi durur.

**Hedef:** `--ar 4:5`, en az 1200px genişlik (kutu `max-md:aspect-[0.82]`, masaüstünde yükseklik sürücü).

### 6.1 — Meridyen Terapi → `public/group/meridyen-terapi.jpg`
```
close-up of a practitioner's hands resting along a person's back on a linen-covered treatment table, warm low lamplight, dry stone wall behind, a folded linen towel and a small terracotta bowl of oil nearby, muted deep forest green and warm parchment palette with soft copper accents, editorial wellness photography, soft cinematic natural light, calm negative space, quiet luxury, authentic human warmth, photorealistic, shot on medium format film --ar 4:5 --no neon, mystical symbols, glowing aura, light rays, god rays, sparkles, particles, chakra icons, oversaturated, stock photo look, pine forest, redwood, temperate forest, rainy window, timber cabin, wooden lodge, alpine, nordic, tropical, palm, cold blue light, text, watermark, logo, acupuncture needles, medical clinic, clinical white, surgical gloves
```

### 6.2 — Nefes Koçluğu → `public/group/nefes-koclugu.jpg`
```
a person seated cross-legged on a linen cushion in a lime-washed stone room, spine tall, eyes closed, mid-inhale, an open shuttered window beside them and a linen curtain lifting on the air, soft morning light, muted deep forest green and warm parchment palette with soft copper accents, editorial wellness photography, soft cinematic natural light, calm negative space, quiet luxury, authentic human warmth, photorealistic, shot on medium format film --ar 4:5 --no neon, mystical symbols, glowing aura, light rays, god rays, sparkles, particles, chakra icons, oversaturated, stock photo look, pine forest, redwood, temperate forest, rainy window, timber cabin, wooden lodge, alpine, nordic, tropical, palm, cold blue light, text, watermark, logo, smoke, vapour, incense, office, laptop, desk
```

### 6.3 — Mucizeler Kursu → `public/group/mucizeler-kursu.jpg`
```
a well-worn cloth-bound book lying open on a linen cloth on an olive-wood table, a lit beeswax candle and a ceramic cup beside it, a deep-set Aegean window behind with olive branches, quiet morning light, muted deep forest green and warm parchment palette with soft copper accents, editorial wellness photography, soft cinematic natural light, calm negative space, quiet luxury, authentic human warmth, photorealistic, shot on medium format film --ar 4:5 --no neon, mystical symbols, glowing aura, light rays, god rays, sparkles, particles, chakra icons, oversaturated, stock photo look, pine forest, redwood, temperate forest, rainy window, timber cabin, wooden lodge, alpine, nordic, tropical, palm, cold blue light, text, watermark, logo, crucifix, religious iconography, church interior, altar
```

### 6.4 — Yaşam Koçluğu → `public/group/yasam-koclugu.jpg`
```
two people seated on a low stone terrace wall in conversation, olive trees and a dry Aegean landscape behind them, linen clothing in sand and olive tones, late afternoon light, one gesturing while the other listens, muted deep forest green and warm parchment palette with soft copper accents, editorial wellness photography, soft cinematic natural light, calm negative space, quiet luxury, authentic human warmth, photorealistic, shot on medium format film --ar 4:5 --no neon, mystical symbols, glowing aura, light rays, god rays, sparkles, particles, chakra icons, oversaturated, stock photo look, pine forest, redwood, temperate forest, rainy window, timber cabin, wooden lodge, alpine, nordic, tropical, palm, cold blue light, text, watermark, logo
```

### 6.5 — Hipnoterapi → `public/group/hipnoterapi.jpg`
```
a person resting on a low daybed under a soft wool blanket in a lime-washed stone room, eyes closed, head on a linen pillow, warm dim lamplight, a practitioner seated calmly at the very edge of the frame, muted deep forest green and warm parchment palette with soft copper accents, editorial wellness photography, soft cinematic natural light, calm negative space, quiet luxury, authentic human warmth, photorealistic, shot on medium format film --ar 4:5 --no neon, mystical symbols, glowing aura, light rays, god rays, sparkles, particles, chakra icons, oversaturated, stock photo look, pine forest, redwood, temperate forest, rainy window, timber cabin, wooden lodge, alpine, nordic, tropical, palm, cold blue light, text, watermark, logo, pendulum, pocket watch, spiral, swirling pattern, clinical white
```

### 6.6 — Reiki → `public/group/reiki.jpg`
```
a practitioner's open palms held just above a resting person's head without touching, both wearing linen, on a low bed in a stone room with a terracotta floor, warm lamplight, complete stillness, muted deep forest green and warm parchment palette with soft copper accents, editorial wellness photography, soft cinematic natural light, calm negative space, quiet luxury, authentic human warmth, photorealistic, shot on medium format film --ar 4:5 --no neon, mystical symbols, glowing aura, light rays, god rays, sparkles, particles, chakra icons, oversaturated, stock photo look, pine forest, redwood, temperate forest, rainy window, timber cabin, wooden lodge, alpine, nordic, tropical, palm, cold blue light, text, watermark, logo, glowing hands, energy glow, halo, radiant light between palms, lens flare
```

---

## 7. Form — Ön Kayıt Fotoğrafı

- **Dosya:** `public/FormImage.png` — 1536×2005 (0.77 dikey), 4.94 MB
- **Render:** `sections/Form/Server.tsx:24` — `md:grid-cols-2` sol yarı, parallax 20,
  `#CED1BF` zemin.
- **Mevcut alt:** "Yaşama Sanatı'nda birebir görüşme için hazırlanmış huzurlu alan"
- **`aspect_ratio`:** `3:4`
- **Prompt:**
```
inviting empty consultation corner with two linen armchairs facing each other, warm pot of tea on a side table, soft plants and diffused afternoon light, prepared with care for a first meeting, [STYLE] --ar 3:4
```

---

## 8. Menü Hover Seti (12 prompt) — TAMAMLANDI (2026-08-21, 8.6 geçici)

> **Envanter boşluğu (2026-08-21):** bu set dokümana hiç girmemişti. `components/Client/SideBar.tsx`
> menü linklerinin üstüne gelindiğinde soldaki panelde bir görsel açılıyor (`useImageReveal`).
> Kullanılan on dosyanın **tamamı** `public/SideBar/` altında Elementis rota adlarıyla duruyor —
> `careers.png`, `press-room.png`, `new-developments.png`, `destination.png`, `innovation.png`,
> `nature.png`, `the-story.png`, `wellness.png`, `home.png`, `community.png` — ve etiketlerle
> eşleşmeleri rastgele: Blog → `press-room`, SSS → `new-developments`, Ön Görüşme → `careers`,
> Reiki → `the-story`.
>
> **İki görsel çift kullanılıyor:** `community.png` hem Topluluk hem Hipnoterapi'de, `destination.png`
> hem Programlarımız hem Meridyen Terapi'de. Yani 12 menü öğesi 10 görseli paylaşıyor.
>
> **Format düzeltmesi:** mevcut dosyalar 855×1128 / 1000×1319 (≈3:4, 0,758). Canlıda ölçülen
> kapsayıcı **566×900 → 0,628**. `object-fit: cover` olduğu için 3:4 görseller kenarlardan
> yaklaşık %16 kırpılıyor. Yeni set **5:8 (0,625)** üretilmeli — kapsayıcıyla neredeyse birebir.
> Hedef: en yüksek upscale, ≥1200px genişlik (2x ekranda 1132px gerekiyor).
>
> **Dosya adları semantik olacak** (Elementis rota adları bırakılıyor) ve **12 ayrı dosya** olacak,
> böylece çift kullanım da biter. `SideBar.tsx` içindeki importlar buna göre güncellenecek — bu bir
> kod işi, sadece dosya kopyalamak yetmez.

> **Not (2026-08-21):** promptlarda `--style raw` / `--s` **yok**. Raw ve düşük stylization
> yukarıdaki panel ayarlarından gelir; prompta yazılınca kopyalama sırasında `--s`'in sayısı kopup
> "Stylize should be a number between 0 and 1000" hatası çıkıyor. Bu dosyadaki tüm promptlar
> yalnızca `--ar` ve `--no` taşır — bölüm 2-7'nin başından beri kullandığı konvansiyon.

**Promptlar tam hâlde yazılmıştır — birleştirme gerekmez.** Ortak stil kuyruğu ve ortak negatifler
her prompta zaten gömülüdür; kutuyu olduğu gibi kopyalayıp yapıştırın. Daha önce `[STYLE]` / `[NO]`
kısaltması kullanılmıştı (bölüm 5'teki konvansiyon); birleştirme adımı sırasında parametre bozulduğu
için bu bölüm bilinçli olarak açık yazılıyor.

Her prompt şu üç parçadan oluşur: **sahne** + **ortak stil kuyruğu** + **`--ar 5:8 --no <ortak negatifler>`**.
Aşağıdaki iki blok referans içindir; 8.1-8.12'deki promptlara zaten gömülüdür.

**Ortak stil kuyruğu** — sahne açıklamasının hemen ardına, virgülle:

```
muted deep forest green and warm parchment palette with soft copper accents, editorial wellness photography, soft cinematic natural light, calm negative space, quiet luxury, authentic human warmth, photorealistic, shot on medium format film
```

**Ortak negatifler** — `--ar 5:8`'den sonra, tek `--no` listesi olarak:

```
--no neon, mystical symbols, glowing aura, light rays, sparkles, particles, chakra icons, oversaturated, stock photo look, pine forest, redwood, tropical, palm, cold blue light, text, watermark, logo
```

Beş promptta bu listeye **konuya özel ek negatifler** eklenir (aynı `--no` listesinin devamı olarak,
yeni bir `--no` açılmaz): 8.8 `smoke, vapour, incense` · 8.9 `crucifix, religious iconography,
church interior, altar` · 8.10 `pendulum, pocket watch, spiral, swirling pattern, clinical white`
· 8.11 `acupuncture needles, medical clinic, clinical white, surgical gloves` · 8.12 `glowing hands,
energy glow, halo, radiant light between palms, lens flare`.

**`--style` ve `--s` bilinçli olarak yok.** Raw ve stylization panel ayarıdır. "Stylize should be a
number between 0 and 1000" uyarısı stylize ayırıcısından gelir; hem `--s <değer>` bozulduğunda hem de
bazı sürümlerde `--style raw` desteklenmeyip `--stylize`'a düştüğünde aynı hata çıkar. Panelde
Raw seçiliyken prompta yazmanın kazancı yok, riski var.

### 8.1 — Ana Sayfa → `public/SideBar/ana-sayfa.jpg`
```
a weathered Aegean stone doorway of a small academy at dusk, warm lamplight spilling from within, an olive branch and a terracotta pot beside the threshold, worn stone steps, lime-washed wall, the quiet pause before entering, muted deep forest green and warm parchment palette with soft copper accents, editorial wellness photography, soft cinematic natural light, calm negative space, quiet luxury, authentic human warmth, photorealistic, shot on medium format film --ar 5:8 --no neon, mystical symbols, glowing aura, light rays, sparkles, particles, chakra icons, oversaturated, stock photo look, pine forest, redwood, tropical, palm, cold blue light, text, watermark, logo
```

### 8.2 — Programlarımız → `public/SideBar/programlar.jpg`
```
a linen-covered stone table holding a small stack of hand-bound course booklets, a folded pair of reading glasses, a sprig of olive and a ceramic cup, warm late-afternoon light raking across the surface, three-quarter overhead view, quiet study still life, muted deep forest green and warm parchment palette with soft copper accents, editorial wellness photography, soft cinematic natural light, calm negative space, quiet luxury, authentic human warmth, photorealistic, shot on medium format film --ar 5:8 --no neon, mystical symbols, glowing aura, light rays, sparkles, particles, chakra icons, oversaturated, stock photo look, pine forest, redwood, tropical, palm, cold blue light, text, watermark, logo
```

### 8.3 — Topluluk → `public/SideBar/topluluk.jpg`
```
a small circle of people seated on floor cushions in a lime-washed stone room, seen from behind and slightly above so no faces are readable, linen clothing in olive and sand tones, an olive branch in a terracotta vessel at the centre of the circle, soft daylight from a deep-set window, muted deep forest green and warm parchment palette with soft copper accents, editorial wellness photography, soft cinematic natural light, calm negative space, quiet luxury, authentic human warmth, photorealistic, shot on medium format film --ar 5:8 --no neon, mystical symbols, glowing aura, light rays, sparkles, particles, chakra icons, oversaturated, stock photo look, pine forest, redwood, tropical, palm, cold blue light, text, watermark, logo
```

### 8.4 — Blog → `public/SideBar/blog.jpg`
```
an open journal with handwritten pages resting on a deep stone windowsill, a fountain pen laid across it, a ceramic cup of herbal tea beside it, a linen curtain lifting slightly, Aegean daylight falling across the paper, quiet writing moment, muted deep forest green and warm parchment palette with soft copper accents, editorial wellness photography, soft cinematic natural light, calm negative space, quiet luxury, authentic human warmth, photorealistic, shot on medium format film --ar 5:8 --no neon, mystical symbols, glowing aura, light rays, sparkles, particles, chakra icons, oversaturated, stock photo look, pine forest, redwood, tropical, palm, cold blue light, text, watermark, logo
```

### 8.5 — Sık Kullanılan Sorular → `public/SideBar/sss.jpg`
```
two low linen armchairs facing each other across a small olive-wood table in a stone room, one chair empty, two ceramic cups set out, a sprig of olive in a small vase, morning light through a deep-set window, an invitation to sit and ask, muted deep forest green and warm parchment palette with soft copper accents, editorial wellness photography, soft cinematic natural light, calm negative space, quiet luxury, authentic human warmth, photorealistic, shot on medium format film --ar 5:8 --no neon, mystical symbols, glowing aura, light rays, sparkles, particles, chakra icons, oversaturated, stock photo look, pine forest, redwood, tropical, palm, cold blue light, text, watermark, logo
```

### 8.6 — Ön Görüşme → `public/SideBar/on-gorusme.jpg`
```
two women seated across a low olive-wood table in a lime-washed stone room, mid-conversation, one listening with hands folded in her lap, linen clothing in sand and olive tones, two ceramic cups between them, soft window light, warm and unhurried, muted deep forest green and warm parchment palette with soft copper accents, editorial wellness photography, soft cinematic natural light, calm negative space, quiet luxury, authentic human warmth, photorealistic, shot on medium format film --ar 5:8 --no neon, mystical symbols, glowing aura, light rays, sparkles, particles, chakra icons, oversaturated, stock photo look, pine forest, redwood, tropical, palm, cold blue light, text, watermark, logo
```

### 8.7 — Yaşam Koçluğu → `public/SideBar/yasam-koclugu.jpg`
```
a person seated in a deep stone window recess wearing linen, an open notebook resting on one knee and a pen in hand, looking out toward an Aegean hillside in early morning, seen in profile from behind, contemplative and unhurried, muted deep forest green and warm parchment palette with soft copper accents, editorial wellness photography, soft cinematic natural light, calm negative space, quiet luxury, authentic human warmth, photorealistic, shot on medium format film --ar 5:8 --no neon, mystical symbols, glowing aura, light rays, sparkles, particles, chakra icons, oversaturated, stock photo look, pine forest, redwood, tropical, palm, cold blue light, text, watermark, logo
```

### 8.8 — Nefes Koçluğu → `public/SideBar/nefes-koclugu.jpg`
```
a person seated cross-legged on a linen cushion in a quiet stone room, spine tall, eyes closed, chest lifted mid-inhale, a sheer linen curtain lifting in the air beside them, soft morning light, stillness and moving air, muted deep forest green and warm parchment palette with soft copper accents, editorial wellness photography, soft cinematic natural light, calm negative space, quiet luxury, authentic human warmth, photorealistic, shot on medium format film --ar 5:8 --no neon, mystical symbols, glowing aura, light rays, sparkles, particles, chakra icons, oversaturated, stock photo look, pine forest, redwood, tropical, palm, cold blue light, text, watermark, logo, smoke, vapour, incense
```

### 8.9 — Mucizeler Kursu → `public/SideBar/mucizeler-kursu.jpg`
```
a well-worn cloth-bound book lying open on a linen cloth, its pages softly creased from daily reading, a single lit beeswax candle beside it, a small ceramic bowl, early morning light across a stone table, devotional and quiet, muted deep forest green and warm parchment palette with soft copper accents, editorial wellness photography, soft cinematic natural light, calm negative space, quiet luxury, authentic human warmth, photorealistic, shot on medium format film --ar 5:8 --no neon, mystical symbols, glowing aura, light rays, sparkles, particles, chakra icons, oversaturated, stock photo look, pine forest, redwood, tropical, palm, cold blue light, text, watermark, logo, crucifix, religious iconography, church interior, altar
```

### 8.10 — Hipnoterapi → `public/SideBar/hipnoterapi.jpg`
```
a person resting on a low daybed under a soft wool blanket, eyes closed, head on a linen pillow, warm dim lamplight in a stone room, a practitioner's hand resting calmly at the very edge of the frame, deep relaxation, muted deep forest green and warm parchment palette with soft copper accents, editorial wellness photography, soft cinematic natural light, calm negative space, quiet luxury, authentic human warmth, photorealistic, shot on medium format film --ar 5:8 --no neon, mystical symbols, glowing aura, light rays, sparkles, particles, chakra icons, oversaturated, stock photo look, pine forest, redwood, tropical, palm, cold blue light, text, watermark, logo, pendulum, pocket watch, spiral, swirling pattern, clinical white
```

### 8.11 — Meridyen Terapi → `public/SideBar/meridyen-terapi.jpg`
```
close-up of a practitioner's hands working along a person's forearm on a linen-covered treatment table, warm low lamplight, stone wall behind, folded towels and a small ceramic oil bowl nearby, focused and unhurried touch, muted deep forest green and warm parchment palette with soft copper accents, editorial wellness photography, soft cinematic natural light, calm negative space, quiet luxury, authentic human warmth, photorealistic, shot on medium format film --ar 5:8 --no neon, mystical symbols, glowing aura, light rays, sparkles, particles, chakra icons, oversaturated, stock photo look, pine forest, redwood, tropical, palm, cold blue light, text, watermark, logo, acupuncture needles, medical clinic, clinical white, surgical gloves
```

### 8.12 — Reiki → `public/SideBar/reiki.jpg`
```
a practitioner's open palms held just above a resting person's shoulders without touching, both wearing linen, warm ordinary lamplight in a stone room, the resting person's eyes closed, complete calm, light comes only from the window and the lamp, muted deep forest green and warm parchment palette with soft copper accents, editorial wellness photography, soft cinematic natural light, calm negative space, quiet luxury, authentic human warmth, photorealistic, shot on medium format film --ar 5:8 --no neon, mystical symbols, glowing aura, light rays, sparkles, particles, chakra icons, oversaturated, stock photo look, pine forest, redwood, tropical, palm, cold blue light, text, watermark, logo, glowing hands, energy glow, halo, radiant light between palms, lens flare
```

### Kabul kontrolü
Üretilen her kare için: (1) 5:8 mi, ≥1200px mi; (2) Ege dili mi — kireç badana, taş, keten,
terracotta, zeytin; ahşap kabin/orman değil; (3) yüzler okunuyorsa poz doğal mı, stok bakışı var mı;
(4) `--no` listesindeki sapmalardan biri sızmış mı — özellikle 8.12'de parlayan eller, 8.10'da
sarkaç, 8.11'de iğne; (5) sol kenar sakin mi (kapsayıcı soldan açılıyor).

---

## Değiştirme Kılavuzu

1. Üretimden **U ölçeği büyütülmüş** (upscale) çıktıyı indirin; hedef piksel boyutu mevcut
   dosyaya eşit veya büyük olsun (tablo değerlerine bakın).
2. Aynı yola **aynı dosya adıyla** kaydedin (PNG) — kod değişikliği gerekmez; tek istisna
   6.6 Reiki (yeni dosya + 1 satır import).
3. `npm run dev` ile 1366/768/375 genişliklerde ilgili bölümü kontrol edin: kırpma
   (`object-cover`) kompozisyonun odağını kesmemeli — özellikle Introduction'ın mobil
   `aspect-[1.18]` kırpımı ve Innovation'ın çift kullanımı (tam ekran + kart penceresi).
4. Kaynak PNG'ler büyükse TinyPNG/`sharp` ile sıkıştırın (teslimatı `next/image` optimize
   eder; bu adım yalnız repo boyutu içindir).

## Envanter Kapsam Kontrolü

20/20 varlık: 3 video (bölüm 1 notu) + 2 poster (1A, 1B) + Introduction (2) +
Wellness (3) + Innovation ×5 (4.1-4.5) + Story ×2 (5.1-5.2) + Retreat ×6 (6.1-6.6,
Introduction tekrarı dahil) + Form (7) = **18 prompt + 3 video yönlendirmesi**.
