# Yaşama Sanatı — Landing Page Midjourney Prompt Paketi

> Ana sayfadaki her raster/video varlığın envanteri ve markaya rafine Midjourney yeniden-üretim
> promptları. Promptlar İngilizce (MCP `generating_image` yalnız İngilizce kabul eder).
> Kullanım: Midjourney web/Discord'da prompt sonuna `--ar <oran>` ekleyin; MCP aracında
> `aspect_ratio` parametresi olarak verin. Üretilen dosyayı **aynı yola aynı adla** kaydederseniz
> kod değişikliği gerekmez (`next/image` boyutlandırma/optimizasyonu otomatik yapar).

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

## 1. Hero Film Stilleri (2 prompt + video notu)

### 1A — Hero poster, dikey (mobil + ilk boya)
- **Dosya:** `public/Hero/elementis-cover-mjpg.png` — 1080×1920 (9:16), 456 KB
- **Render:** `sections/Hero/Client/index.tsx:19` (viewport çözülmeden ilk kare, LCP) +
  iki hero videosunun `poster`'ı. Üzerinde alttan `#2b3530` scrim var; alt %30 kısmen koyulaşır.
- **`aspect_ratio`:** `9:16`
- **Prompt:**
```
a woman's hand gently resting on a wooden door frame of a warm forest retreat cabin at dusk, glimpse of a calm interior beyond, shallow depth of field, intimate welcoming moment, [STYLE] --ar 9:16
```

### 1B — Modal film posteri, yatay
- **Dosya:** `public/Hero/elementis-posterjpg.png` — 2560×1440 (16:9), 903 KB
- **Render:** `components/VideoPlayer/VideoPlayer.tsx:111` (tam ekran film posteri).
- **`aspect_ratio`:** `16:9`
- **Prompt:**
```
cinematic wide establishing shot of a serene wellness academy nestled in misty forested hills at golden hour, warm interior lights glowing through wooden architecture, layers of fog, breathing landscape, [STYLE] --ar 16:9
```

### Video notu (elementismp4 / elementis-mmp4 / elementis-fullmp4)
Midjourney görüntü aracı video üretmez. Yol: 1A/1B stillerini üretin → beğenilen kareyi
Midjourney **Animate** (image-to-video) ile 5-10 sn'lik loop'a çevirin → 16:9 masaüstü ve
9:16 mobil varyantları ayrı animate edin. Tam film (145 sn) için mevcut çekim korunmalı;
MJ yalnızca kısa atmosfer loop'ları için uygundur.

---

## 2. Introduction — Buluşma Alanı

- **Dosya:** `public/Introduction.png` — 1734×1016 (~1.7:1), 2.53 MB
- **Render:** `sections/Introduction/Server.tsx:14` — split kompozisyonun sağ sütunu
  (62vw), parallax 8px; mobilde `aspect-[1.18]` kırpılır. **Ayrıca** Retreat hover setinde
  6. görsel olarak tekrar kullanılıyor (bkz. bölüm 6 — orada disipline özel yenisiyle
  değiştirilecek).
- **Mevcut alt:** "Doğayla çevrili sakin bir Yaşama Sanatı buluşma alanı"
- **`aspect_ratio`:** `3:2`
- **Prompt:**
```
tropical modern wellness pavilion with layered timber roofs surrounded by lush greenery at blue hour, softly lit stone pathway with warm garden lights, architectural photography, sense of arrival and welcome, [STYLE] --ar 3:2
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

## 4. Innovation "Şifa Yolculuğu" Sahnesi (5 prompt) — KORUMALI KOD

Görseller `components/Client/Innovation.tsx:47` dizisinden gelir; her biri hem 500vh scroll
sahnesinin **tam ekran arka planı** (maskeli nefes-wipe + scale 1.075→1) hem kartın
`aspect-[1.85]` küçük penceresi olarak kullanılır. Kod korumalı — **yalnız dosyalar
değiştirilir**, aynı adlarla. Kart sırası ↔ disiplin eşleşmesi:

### 4.1 — `public/ImageContainer/image-1.png` → Nefes Koçluğu (1456×816)
- **`aspect_ratio`:** `16:9`
```
close-up profile of a person breathing deeply with eyes closed in soft forest light, visible calm in the face, morning mist drifting, chest mid-inhale, meditative stillness, [STYLE] --ar 16:9
```

### 4.2 — `public/ImageContainer/image-2.png` → Meridyen Terapisi ve Kinesiyoloji (2000×1289)
- **`aspect_ratio`:** `16:9`
```
practitioner's hands gently applying pressure along a client's shoulder in a warm treatment room, focused craft and care, wooden surfaces and linen textiles, soft directional window light, [STYLE] --ar 16:9
```

### 4.3 — `public/ImageContainer/image-3.png` → Mucizeler Kursu / zihin (2000×1289)
- **`aspect_ratio`:** `16:9`
```
an open well-worn book resting on a linen cushion beside a window with soft rain light, steam rising from a ceramic cup, contemplative study atmosphere, inner clarity, [STYLE] --ar 16:9
```

### 4.4 — `public/ImageContainer/image-4.png` → Reiki Enerji Eğitimleri (2500×1458)
- **`aspect_ratio`:** `16:9`
```
healer's hands hovering above a resting person in a candle-lit wooden room, palpable warmth between palms, amber light, deep tranquility, respectful distance, [STYLE] --ar 16:9
```

### 4.5 — `public/ImageContainer/image-5.png` → Hipnoterapi & Yaşam Koçluğu (2000×1289)
- **`aspect_ratio`:** `16:9`
```
two people in a calm one-on-one session in armchairs by a large window overlooking trees, attentive listening, notebooks and tea on a low wooden table, trust and presence, [STYLE] --ar 16:9
```

---

## 5. ElementisStory — Krem Bölüm Fotoğrafları (2 prompt)

### 5.1 — `public/elementis-stories/picture-1.png` (720×896, 0.8 dikey)
- **Render:** `sections/ElementisStory/Client/index.tsx` — masaüstünde `col-span-3`,
  parallax 10; mobilde carousel. Krem `#F3EFE6` zemin.
- **Mevcut alt:** "Akademinin sakin ve doğal çalışma ortamı"
- **`aspect_ratio`:** `4:5`
```
sunlit corner of a natural wellness studio, rattan chairs and a wooden desk with dried botanicals, handwritten notes and an open journal, lived-in authenticity, [STYLE] --ar 4:5
```

### 5.2 — `public/elementis-stories/picture-2.png` (1452×1642, 0.88 dikey)
- **Mevcut alt:** "Yaşama Sanatı topluluğundan bir buluşma anı"
- **`aspect_ratio`:** `4:5`
```
small circle of people seated on floor cushions in warm conversation, genuine laughter, natural textiles, plants and soft daylight, documentary community moment, no camera awareness, [STYLE] --ar 4:5
```

---

## 6. SustainableRetreat Hover Seti (6 prompt) — PLACEHOLDER DEĞİŞİMİ

Mevcut 6 görsel eski Elementis şablonundan kalma jeneriklerdir (dosya adları
our-vision, sustainability… — program başlıklarıyla ilgisiz; `Introduction.png` de tekrar
kullanılıyor). `components/Client/SustainableRetreatClient.tsx:21-52`'deki bağlantı sırasına
göre **disipline özel** üretim yapılacak; dosyalar aynı adlarla değiştirilecek (hepsi 576×740,
0.78 dikey — üretimden sonra bu boyuta kırpılabilir ya da daha büyük bırakılabilir).
Hover'da `bg-[#2b3530]/20` tonlu kutuda görünürler; hepsi dekoratif (`alt=""`).

| Sıra | Program başlığı | Dosya (aynı kalacak) | `aspect_ratio` |
|---|---|---|---|
| 1 | Meridyen Terapi | `public/group/discover-elementis.png` | 3:4 |
| 2 | Nefes Koçluğu | `public/group/our-vision-and-mission.png` | 3:4 |
| 3 | Mucizeler Kursu | `public/group/our-commitment.png` | 3:4 |
| 4 | Yaşam Koçluğu | `public/group/our-pillars.png` | 3:4 |
| 5 | Hipnoterapi | `public/group/sustainability.png` | 3:4 |
| 6 | Reiki | `public/Introduction.png` yerine YENİ dosya* | 3:4 |

\* 6. görsel için `public/group/reiki.png` gibi yeni bir dosya oluşturup
`SustainableRetreatClient.tsx:10`'daki importu güncellemek gerekir (tek satır — Introduction
görselinin çifte kullanımı da böylece son bulur).

### 6.1 Meridyen Terapi
```
detail of hands tracing energy meridian lines on a person's forearm in warm clinical calm, anatomical precision meets healing touch, soft window light on skin, [STYLE] --ar 3:4
```
### 6.2 Nefes Koçluğu
```
person standing in morning forest fog with eyes closed and hand on chest, mid-breath, backlit by soft golden sun rays through trees, [STYLE] --ar 3:4
```
### 6.3 Mucizeler Kursu
```
a quiet reading nook with an open course book, folded reading glasses and a warm lamp at dusk, deep green wall, contemplative inner-work atmosphere, [STYLE] --ar 3:4
```
### 6.4 Yaşam Koçluğu
```
person journaling at a wooden table by a rain-streaked window, tea steaming, path-planning notes and a calm focused expression, new-chapter feeling, [STYLE] --ar 3:4
```
### 6.5 Hipnoterapi
```
person reclining with closed eyes in a softly lit therapy chair, practitioner's presence blurred in the warm background, deep relaxation, amber and green tones, [STYLE] --ar 3:4
```
### 6.6 Reiki
```
close view of warm hands cupped above a person's shoulders, candlelight glow between palms, energy and stillness, dark green backdrop, [STYLE] --ar 3:4
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
