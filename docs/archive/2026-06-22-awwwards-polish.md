# Yaşama Sanatı — Awwwards Polish Implementation Plan

> **Amaç:** Yaşama Sanatı 

 “güzel ama template hissi olan web sitesi” seviyesinden çıkarıp 

 **premium editorial / wellness academy / cinematic SaaS-quality** çizgisine taşımak.
>
> **Hedef kalite bandı:**
> - Kısa vade: 88–91 / 100
> - Orta vade: Awwwards Honorable Mention bandı
> - Uzun vade: Site of the Day adaylığına yaklaşabilecek yaratıcı sistem
>
> **Ana prensip:** Daha fazla efekt değil; daha güçlü creative direction, daha net user flow, daha iyi tipografi, daha kontrollü motion, daha temiz spacing, daha yüksek erişilebilirlik ve daha sert QA.

---

## 0. Repo ve Mevcut Teknik Durum Özeti

GitHub README ve `package.json` bilgisinden görülen mevcut yapı:

- **Framework:** Next.js 15.2.2, App Router
- **React:** React 19
- **Dil:** TypeScript
- **Styling:** Tailwind CSS 4
- **Motion:** `motion` 12.x
- **Smooth Scroll:** `lenis` + `@studio-freight/react-lenis`
- **3D:** `three`, `@react-three/fiber`, `@react-three/drei`
- **Domain:** Bütünsel şifa, nefes koçluğu, reiki, meridyen terapi, hipnoterapi, eğitim akademisi
- **Öne çıkan mevcut feature:** 3D meridyen/anatomi görselleştirici
- **Mevcut özel polish geçmişi:** Footer için Antigravity/Awwwards polish planı ve `claude.md` handoff notları var

Bu yüzden strateji “sıfırdan site yapmak” değil; mevcut Next/React/Tailwind/Motion/Lenis/Three stack’i koruyup, onu disiplinli bir creative production pipeline ile keskinleştirmek olmalı.

---

## 1. Değerlendirme Metodu

Her araç/skill/ilke Yaşama Sanatı için şu kriterlere göre puanlandı:

| Kriter | Açıklama |
|---|---|
| Brand Fit | Bütünsel şifa / premium eğitim / editorial wellness kimliğine uygunluk |
| Awwwards Impact | Görsel kalite, farklılık, art direction ve juri etkisi |
| Conversion Impact | Kullanıcının eğitim, seans, iletişim veya güven aksiyonuna ilerlemesi |
| Implementation Risk | Teknik karmaşa, performans ve bakım riski |
| Current Stack Fit | Mevcut Next.js, Tailwind, Motion, Lenis, Three yapısıyla uyum |
| Polish Leverage | Az değişiklikle büyük kalite artışı yaratma gücü |

Puanlama:

- **9.0–10:** Mutlaka kullanılmalı
- **8.0–8.9:** Kullanılmalı; ama kapsamı kontrollü olmalı
- **7.0–7.9:** Opsiyonel / sadece doğru yerde
- **6.9 ve altı:** Şimdilik dışarıda bırakılmalı

---

## 2. Rapor Maddelerinin Tek Tek Yaşama Sanatı Uygunluk Puanı

### 2.1 UX ve Tasarım İlkeleri

| Madde | Kategori | Puan | Karar | Gerekçe |
|---|---:|---:|---|---|
| User Flow | UX / Conversion | 10 | Kullan | Yaşama Sanatı gibi hizmet/eğitim sitesinde kullanıcı “ne alıyorum, kime güveniyorum, nasıl başvuruyorum?” sorularına hızlı cevap bulmalı. |
| Contrast & Focus | Visual Hierarchy | 9.6 | Kullan | CTA, eğitim kartları, uzmanlık alanları ve güven sinyalleri net ayrışmalı. |
| Spacing & Layout | Premium Feel | 10 | Kullan | Wellness/editorial premium hissin ana kaynağı spacing. Fazla öğe değil, nefes alan ritim gerekli. |
| Design System Thinking | Sistem / Tutarlılık | 10 | Kullan | Mevcut footer polish gibi lokal iyileştirmeler site geneline yayılmazsa kalite parçalı kalır. |
| Typography System | Editorial Identity | 10 | Kullan | Awwwards seviyesinde en büyük farkı font ölçüleri, satır aralıkları ve hiyerarşi yaratır. |
| Art Direction | Creative Direction | 10 | Kullan | Yaşama Sanatı’nın “Aesop + Kinfolk + Apple wellness academy” dili sabitlenmeli. |
| Motion Rules | Motion Governance | 9.7 | Kullan | Motion var ama kuralsızsa premium değil, yapay görünür. |
| Performance Budget | Engineering Quality | 9.5 | Kullan | Three.js + Lenis + motion olan sitede performans bütçesi şart. |
| Accessibility Checklist | UX / Trust | 9.5 | Kullan | Wellness alanında güven, sakinlik ve erişilebilirlik marka değerinin parçası. |
| Sound Design | Sensory Layer | 6.8 | Şimdilik kullanma | Awwwards için ilginç olabilir ama hizmet sitesinde gereksiz/rahatsız edici olabilir. Opt-in olmadıkça eklenmemeli. |

### 2.2 Claude Code Skill / Agent Workflow

| Madde | Kategori | Puan | Karar | Gerekçe |
|---|---:|---:|---|---|
| UI UX Pro Max | Tasarım Direktörü | 10 | Kullan | Ana tasarım kalite motoru. Art direction, design system, anti-pattern, typography, UI style audit için çekirdek. |
| Planning with Files | Hafıza / Süreklilik | 10 | Kullan | Bu iş çok iterasyonlu. `docs/` hafızası olmadan her tur kalite kaybeder. |
| Superpowers | Metodoloji | 9.8 | Kullan | Claude’un “hemen kod yazma” davranışını araştır-plan-test-refactor disiplinine çeker. |
| GStack | Sanal Ürün Ekibi | 9.6 | Kullan | `/office-hours`, `/autoplan`, `/plan-design-review`, `/review`, `/qa`, `/benchmark`, `/ship` bu proje için çok değerli. |
| Web Design Guidelines | Accessibility | 9.5 | Kullan | WCAG, focus, keyboard, reduced motion, contrast için şart. |
| React Best Practices | React/Next kalite | 9.2 | Kullan | React 19 + Next 15 + hydration + bundle kontrolleri için gerekli. |
| Composition Patterns | Component Architecture | 8.6 | Kullan | Boolean hell, prop drilling, tutarsız component API risklerini azaltır. |
| Code Review Skill | QA / Maintainability | 8.8 | Kullan | Kod kokusu, güvenlik, TypeScript ve sürdürülebilirlik için gerekli. |
| React Native Skills | Mobil App | 4.5 | Kullanma | Bu proje web sitesi. Mobil responsive QA yapılacak ama RN skill gereksiz. |
| Remotion.skill | Video/Motion Asset | 7.2 | Opsiyonel | Tanıtım videosu veya sosyal teaser yapılacaksa kullanılır; site polish için şart değil. |
| GBrain | Persistent Memory | 7.8 | Faz 4 opsiyonel | Çok uzun süreli repo memory için iyi; ilk polish sprintinde şart değil. |
| Octogent | Çoklu Agent Orkestrasyonu | 8.2 | Faz 5 opsiyonel | Paralel ajan işlerinde güçlü ama erken kullanılırsa kaos yaratır. Önce tek pipeline oturmalı. |

### 2.3 Motion / Visual Tech Stack

| Madde | Kategori | Puan | Karar | Gerekçe |
|---|---:|---:|---|---|
| Motion | Micro-interaction | 9.5 | Kullan | Mevcut stack’te var. Hover, reveal, modal, card, section girişleri için ana motor. |
| GSAP | Cinematic Scroll | 8.9 | Kullan ama sınırlı | Awwwards scroll choreography için güçlü. Ancak her animasyona değil, hero/storytelling sahnelerine. |
| Lenis | Smooth Scroll | 8.8 | Kullan | Mevcut stack’te var. Landing hissini premiumlaştırır; app-like iç akışlarda ölçülü. |
| Three.js / R3F / Drei | 3D Anatomy | 8.7 | Kullan ama optimize et | Mevcut 3D meridyen/anatomi özelliği markaya uygun. Ana risk performans ve yapaylık. |
| Spline | 3D Prototyping | 6.5 | Kullanma | Zaten custom Three/R3F var. Spline eklemek stack’i şişirir. |
| ShaderGradient | Ambient Visual | 8.0 | Sınırlı kullan | Hero/section ambience için iyi; spiritüel wellness sitesinde abartılırsa AI SaaS klişesi olur. |
| Anime.js | Animation | 4.5 | Kullanma | Motion + GSAP varken gereksiz. |
| Barba.js | Page Transition | 4.0 | Kullanma | Next App Router ile gereksiz karmaşa ve risk. |
| Jitter | Motion Asset | 7.8 | Opsiyonel | Logo reveal veya sosyal teaser için iyi; site runtime’a şart değil. |

### 2.4 Component / Inspiration Kaynakları

| Madde | Kategori | Puan | Karar | Gerekçe |
|---|---:|---:|---|---|
| Godly.website | Inspiration | 9.3 | Kullan | High-end web referansları için. |
| Minimal.gallery | Minimal / Editorial | 9.0 | Kullan | Yaşama Sanatı’nın sakin, premium dili için uygun. |
| Dark.design | Dark UI Inspiration | 7.8 | Sınırlı kullan | Site koyu/derin bölümlerde faydalı; tüm dili dark SaaS’a çevirmemeli. |
| Refero / Styles Refero | Style References | 8.8 | Kullan | Stil yönü, section kalitesi ve mikro detay ilhamı. |
| Unsection | Section Inspiration | 9.0 | Kullan | Hero, programs, testimonials, footer section kararları için çok değerli. |
| Happy Hues | Color Inspiration | 7.5 | Yardımcı kullan | Palet başlangıcı için iyi; final sistem bespoke olmalı. |
| Fontpair | Typography Pairing | 9.0 | Kullan | Editorial wellness için tipografi eşleşmesi kritik. |
| 21st.dev | Component Discovery | 8.2 | Kullan ama seçici | Component fikirleri için. Direkt kopyalama yasak. |
| Aceternity UI | Animated Components | 7.8 | Sınırlı kullan | Bazı background/interactive fikirleri alınabilir; fazla kullanılırsa template hissi verir. |
| ReactBits | Creative Components | 7.8 | Sınırlı kullan | 1–2 imza efekt için. |
| Skiper UI | Component Inspiration | 7.2 | Opsiyonel | Alternatif ilham. |
| Cult UI | Component Inspiration | 7.5 | Opsiyonel | Küçük mikro detaylar için. |
| Variant UI | Component Inspiration | 7.4 | Opsiyonel | Direkt bağımlılık değil, ilham. |
| Uiverse | UI Snippets | 5.8 | Kullanma | Genelde fazla generic/oyuncak hissi riski. |
| The Noun Project | Icons | 6.5 | Sınırlı | Generic ikon riski. Daha bespoke line icon/SVG tercih edilmeli. |
| Maneken | Mockup Asset | 6.8 | Opsiyonel | App mockup yoksa gereksiz. |
| Toolfolio / Endless Tools | Tool Discovery | 5.5 | Kullanma | Üretim planına doğrudan katkısı az. |

---

## 3. Seçilen Yüksek Puanlı Paket

Aşağıdaki maddeler Yaşama Sanatı için kullanılacak ana paket olarak seçildi.

### 3.1 Mutlak Kullanılacaklar

- User Flow
- Contrast & Focus
- Spacing & Layout
- Design System Thinking
- Typography System
- Art Direction
- Motion Rules
- Performance Budget
- Accessibility Checklist
- UI UX Pro Max
- Planning with Files
- Superpowers
- GStack
- Web Design Guidelines
- React Best Practices
- Composition Patterns
- Code Review Skill
- Motion
- Lenis
- Three.js / R3F / Drei mevcut 3D sistem
- Fontpair
- Godly.website
- Minimal.gallery
- Refero / Styles Refero
- Unsection

### 3.2 Kontrollü Kullanılacaklar

- GSAP: sadece hero/storytelling/parallax için
- ShaderGradient: sadece ambient background veya geçiş katmanı için
- Aceternity UI: sadece ilham veya küçük adapted pattern için
- ReactBits: sadece 1–2 signature interaction için
- Dark.design: sadece koyu section referansı için
- Happy Hues: palet yönlendirme için
- Jitter: runtime değil, motion asset gerekiyorsa
- Octogent: paralel sprint aşamasında
- GBrain: uzun süreli repo memory gerektiğinde

### 3.3 Bilinçli Dışarıda Bırakılanlar

- Anime.js
- Barba.js
- Spline
- Uiverse ağırlıklı kullanım
- React Native Skills
- Sound Design
- Çok fazla component marketplace bağımlılığı

---

## 4. Temel Creative Direction

### 4.1 Marka Dili

Yaşama Sanatı şu yönde konumlanmalı:

```text
Aesop + Kinfolk + Apple + modern wellness academy
```

Bu şu anlama gelir:

- Spiritüel ama ezoterik/generic değil
- Premium ama soğuk/lüks değil
- Sakin ama sıkıcı değil
- Editorial ama anlaşılmaz değil
- Teknolojik ama AI SaaS klişesi değil
- Bütünsel ama “stock wellness template” değil

### 4.2 Görsel Dil

- Büyük boşluklar
- İnce çizgiler
- Yumuşak ama kontrollü geçişler
- Doğal taş, sıcak krem, koyu zeytin, yanık bakır tonları
- Yüksek kontrastlı CTA alanları
- Çok temiz text hierarchy
- Az ama anlamlı 3D/anatomy dokunuşu
- Lifeline / meridyen / nefes / enerji çizgisi metaforları

### 4.3 Anti-Pattern Listesi

Claude şu hataları kesinlikle yapmamalı:

- Her section’a gradient/glow eklemek
- Çok fazla animasyon katmanı kullanmak
- Wellness template kartları üretmek
- CTA’yı dekoratif öğeler içinde kaybetmek
- Hero’da ne sunulduğunu belirsiz bırakmak
- 3D’yi sadece “havalı” diye büyütmek
- Font boyutlarını her section’da farklı mantıkla kurmak
- Mobile spacing’i desktop’tan kırpılmış gibi bırakmak
- Accessibility’yi polish sonrası düşünmek

---

## 5. Dosya ve Dokümantasyon Mimarisi

Mevcut repo köküne aşağıdaki yapı eklenmeli veya mevcut dosyalar bu yapıya taşınmalı.

```txt
docs/
  implementation-awwwards-polish.md
  progress.md
  todo.md
  decisions.md
  issues.md
  ux-flow.md
  art-direction.md
  visual-audit.md
  motion-rules.md
  performance-budget.md
  accessibility-checklist.md
  component-inventory.md
  conversion-strategy.md
  qa-checklist.md
  benchmark-results.md

design-system/
  MASTER.md
  colors.md
  typography.md
  spacing.md
  motion.md
  components.md
  section-rhythm.md
  responsive-rules.md
  anti-patterns.md
```

### 5.1 `docs/progress.md`

Her sprint sonunda güncellenecek:

```md
# Progress

## Completed
- [x] Art direction audit
- [x] Typography system draft

## In Progress
- [ ] Hero hierarchy redesign

## Blocked
- [ ] 3D model performance audit pending

## Next
- [ ] Run design-review after hero pass
```

### 5.2 `docs/decisions.md`

Her tasarım/teknoloji kararının nedeni yazılacak:

```md
# Decisions

## D001 — GSAP only for cinematic scroll moments
Reason: Motion already covers micro-interactions. GSAP is reserved for hero/story moments to avoid animation sprawl.

## D002 — 3D anatomy remains progressive-enhancement
Reason: It supports the meridian/healing narrative but must not block LCP or mobile usability.
```

### 5.3 `design-system/MASTER.md`

Tüm siteyi yönetecek ana belge:

```md
# Yaşama Sanatı Design System

## Brand Essence
Premium, calm, editorial, embodied, trustworthy.

## Visual Keywords
Breath, meridian, ritual, warmth, stillness, precision.

## Color Roles
- Background / surface
- Elevated surface
- Text primary
- Text muted
- Accent copper
- Accent sage
- CTA primary
- Error / success / focus

## Typography Roles
- Display XL
- Display L
- Section title
- Body large
- Body regular
- Caption
- Microcopy

## Motion Roles
- Reveal
- Hover
- Transition
- Scroll-linked
- 3D camera
- Reduced motion fallback
```

---

## 6. Faz Faz Uygulama Planı

## Faz 0 — Repo Handoff ve Çalışma Disiplini Kurulumu

**Kullanılacaklar:**

- Planning with Files
- Superpowers
- GStack minimal command set
- Code Review Skill

**Amaç:** Claude Code’un rastgele dosya düzenlemesini engellemek.

**Yapılacaklar:**

1. `docs/` ve `design-system/` klasörlerini oluştur.
2. `claude.md` dosyasını güncelle.
3. Her değişikliğin önce plan, sonra uygulama, sonra test, sonra doküman güncellemesi şeklinde yapılacağını yaz.
4. “No drive-by edits” kuralı ekle.
5. “Design system dışına çıkma” kuralı ekle.
6. “Global tema değiştirmeden önce karar kaydı aç” kuralı ekle.

**Claude komut akışı:**

```txt
Read claude.md
Read README.md
Read package.json
Create docs/progress.md
Create docs/decisions.md
Create docs/issues.md
Create design-system/MASTER.md
Do not edit UI yet.
```

**Çıkış dosyaları:**

- `docs/progress.md`
- `docs/decisions.md`
- `docs/issues.md`
- `design-system/MASTER.md`

**Başarı kriteri:**

- Claude artık tek prompt ile 14 dosya değiştirmeyecek.
- Her sprintin scope’u yazılı olacak.
- Her değişiklik dokümante edilecek.

---

## Faz 1 — Creative Direction ve Product Narrative

**Kullanılacaklar:**

- UI UX Pro Max
- GStack `/office-hours`
- GStack `/plan-ceo-review`
- Godly.website
- Minimal.gallery
- Refero
- Unsection
- Fontpair

**Amaç:** Site neye benziyor değil; ne hissettiriyor sorusunu çözmek.

**Yapılacaklar:**

1. Ana kullanıcı segmentlerini tanımla:
   - Nefes koçluğu arayan birey
   - Reiki / meridyen terapi ilgilisi
   - Hipnoterapi / şifa eğitimi araştıran kişi
   - Eğitmen/akademi güveni arayan kullanıcı
2. Ana dönüşüm yollarını yaz:
   - Eğitimleri keşfet
   - Seans / iletişim talebi
   - Akademiyi tanı
   - 3D meridyen deneyimini incele
3. Art direction alternatifi üret:
   - Editorial Wellness
   - Premium Academy
   - Spiritual Minimalism
   - Soft Medical / Anatomy Inspired
4. Tek yön seç:
   - Önerilen: **Editorial Wellness Academy**
5. `docs/art-direction.md` dosyasını oluştur.
6. Rakip/reference panosu çıkar.
7. “Bu site ne değildir?” bölümünü yaz.

**Çıkış dosyaları:**

- `docs/art-direction.md`
- `docs/conversion-strategy.md`

**Başarı kriteri:**

- Hero, footer, 3D, eğitim kartları ve CTA aynı yaratıcı dile hizmet etmeli.
- Site “spiritual stock template” gibi görünmemeli.

---

## Faz 2 — UX Flow ve Conversion Architecture

**Kullanılacaklar:**

- User Flow
- Contrast & Focus
- UI UX Pro Max
- GStack `/autoplan`
- Web Design Guidelines

**Amaç:** Kullanıcıyı dekoratif anlatı içinde kaybetmeden aksiyona taşımak.

**Yapılacaklar:**

1. Mevcut sayfa akışını çıkar:
   - Header
   - Hero
   - Value proposition
   - Services / programs
   - 3D meridyen/anatomi
   - Trust / instructor / method
   - Testimonials
   - Contact / CTA
   - Footer
2. Her section için şu soruları yanıtla:
   - Bu section kullanıcının hangi sorusuna cevap veriyor?
   - Bir sonraki aksiyon ne?
   - CTA görünür mü?
   - Güven sinyali var mı?
   - Okuma yükü fazla mı?
3. CTA hiyerarşisini belirle:
   - Primary: Seans / Eğitim için iletişime geç
   - Secondary: Eğitimleri incele
   - Tertiary: Meridyen deneyimini keşfet
4. Mobile flow’u ayrı çıkar.
5. `docs/ux-flow.md` oluştur.

**Çıkış dosyaları:**

- `docs/ux-flow.md`
- `docs/conversion-strategy.md`

**Başarı kriteri:**

- Kullanıcı 5 saniyede sitenin ne sunduğunu anlamalı.
- Kullanıcı 15 saniyede hangi aksiyonu alacağını görmeli.
- CTA’lar görsel sistem içinde kaybolmamalı.

---

## Faz 3 — Design System Master Pass

**Kullanılacaklar:**

- UI UX Pro Max
- Design System Thinking
- Fontpair
- Happy Hues yardımcı
- Web Design Guidelines
- Composition Patterns

**Amaç:** Footer polish gibi lokal kaliteyi tüm site geneline sistem olarak yaymak.

**Yapılacaklar:**

1. Renk rollerini tanımla:
   - `--surface-deep`
   - `--surface-warm`
   - `--surface-card`
   - `--text-primary`
   - `--text-muted`
   - `--accent-copper`
   - `--accent-sage`
   - `--focus-ring`
2. Tipografi ölçeğini tanımla:
   - Display XL
   - Display L
   - Section title
   - Body large
   - Body
   - Caption
   - Microcopy
3. Spacing sistemi:
   - Section vertical rhythm: 96 / 128 / 160 / 192
   - Card gap: 16 / 24 / 32
   - Content max-width: editorial ve wide ayrımı
4. Radius sistemi:
   - Small interactive: 10–12
   - Card: 20–28
   - Editorial panel: 32+
5. Shadow/elevation:
   - Sakin, az, blur kontrollü
6. Border/line sistemi:
   - 1px hairline
   - gradient divider
   - lifeline motif
7. Component API kuralları:
   - Button variant sayısı sınırlı
   - Section wrapper standardı
   - Card padding standardı
   - Motion prop standardı

**Çıkış dosyaları:**

- `design-system/MASTER.md`
- `design-system/colors.md`
- `design-system/typography.md`
- `design-system/spacing.md`
- `design-system/components.md`

**Başarı kriteri:**

- Yeni section eklendiğinde tasarım kararı yeniden icat edilmeyecek.
- Button, kart, section, başlık, caption aynı aileden görünecek.

---

## Faz 4 — Visual Audit ve Section Scoring

**Kullanılacaklar:**

- GStack `/plan-design-review`
- UI UX Pro Max
- Web Design Guidelines
- Godly / Minimal / Refero / Unsection

**Amaç:** Her section’ı 0–10 arası puanlayıp düşük olanları agresif polish listesine almak.

**Puanlanacak alanlar:**

| Alan | Hedef |
|---|---:|
| Hero | 9.3+ |
| Navigation | 9.0+ |
| Service/program cards | 9.0+ |
| 3D Meridian section | 9.0+ |
| Instructor/trust section | 8.8+ |
| Testimonials | 8.8+ |
| CTA section | 9.2+ |
| Footer | 9.1+ |
| Mobile layout | 9.0+ |
| Typography consistency | 9.3+ |
| Motion discipline | 9.0+ |
| Accessibility | 9.0+ |
| Performance | 8.8+ |

**Yapılacaklar:**

1. Mevcut site section inventory çıkar.
2. Her section için:
   - Visual hierarchy score
   - Typography score
   - Spacing score
   - Contrast score
   - Motion score
   - Brand fit score
   - Conversion clarity score
3. `docs/visual-audit.md` oluştur.
4. 8.8 altındaki her section için ayrı todo aç.
5. “Fix by adding more elements” yasak.

**Çıkış dosyaları:**

- `docs/visual-audit.md`
- `docs/todo.md`
- `docs/issues.md`

**Başarı kriteri:**

- Hangi alanın neden zayıf olduğu netleşir.
- Polish rastgele değil, puana göre yapılır.

---

## Faz 5 — Hero ve Above-the-Fold Redesign

**Kullanılacaklar:**

- UI UX Pro Max
- GStack `/design-consultation`
- GStack `/design-shotgun`
- GStack `/design-html` opsiyonel
- Motion
- GSAP sınırlı
- Lenis
- ShaderGradient sınırlı
- Fontpair

**Amaç:** İlk ekranı Awwwards seviyesine en çok yaklaştıran ana sahneye dönüştürmek.

**Hero hedefi:**

```txt
Kullanıcı 3 saniyede şunu anlamalı:
Yaşama Sanatı, beden-zihin-enerji bütünlüğü üzerine premium eğitim ve şifa deneyimleri sunan modern bir akademidir.
```

**Yapılacaklar:**

1. 4–6 hero varyasyonu üret:
   - Editorial stillness
   - Meridian light map
   - Breath field
   - Academy invitation
   - 3D anatomy teaser
   - Minimal luxury wellness
2. En iyi 2 varyasyonu seç.
3. Hero tipografisini sabitle.
4. CTA hiyerarşisini düzelt.
5. Trust microcopy ekle:
   - “Nefes · Reiki · Meridyen Terapi · Hipnoterapi”
6. Ambient layer varsa çok düşük opaklıkta kullan.
7. Motion:
   - Başlık reveal: yumuşak ama kısa
   - CTA delay: minimum
   - 3D/visual layer: progressive
8. Mobile hero ayrı tasarlanmalı; desktop kırpması olmamalı.

**Başarı kriteri:**

- Hero template gibi değil, sanat yönetimli görünmeli.
- CTA 1 saniyede bulunmalı.
- İlk ekran ağırlaşmamalı.

---

## Faz 6 — 3D Meridian / Anatomy Section Polish

**Kullanılacaklar:**

- Three.js / R3F / Drei
- React Best Practices
- Performance Budget
- Web Design Guidelines
- Motion reduced-motion fallback
- Code Review Skill

**Amaç:** 3D özelliği “gimmick” değil, Yaşama Sanatı’nın özel imzası haline getirmek.

**Yapılacaklar:**

1. 3D section’ın amacı net yazılsın:
   - “Meridyenleri görselleştir”
   - “Bedendeki enerji akışını keşfet”
2. Model yükleme stratejisi:
   - lazy load
   - suspense fallback
   - mobile fallback image/video
   - reduced motion fallback
3. Kamera hareketleri:
   - hızlı dönme yasak
   - sakin nefes ritmi
   - kullanıcı kontrolü net
4. 3D materyal dili:
   - medical neon değil
   - sıcak, yarı saydam, meridyen çizgisi
5. Performance budget:
   - 3D section LCP’yi etkilememeli
   - initial JS bundle kontrol edilmeli
6. Accessibility:
   - Canvas açıklaması
   - klavye dışı kullanıcılar için alternatif bilgi
   - motion azaltma desteği

**Çıkış dosyaları:**

- `docs/performance-budget.md`
- `docs/accessibility-checklist.md`
- `docs/issues.md`

**Başarı kriteri:**

- 3D siteyi yavaşlatmadan marka imzası olur.
- Mobile kullanıcı cezalandırılmaz.

---

## Faz 7 — Section-Level Polish Sprint

**Kullanılacaklar:**

- UI UX Pro Max
- GStack `/design-review`
- Motion
- Composition Patterns
- Aceternity / ReactBits sadece ilham
- Unsection / Refero

**Amaç:** Her section’ı tek tek 9+ seviyesine taşımak.

**Sıra:**

1. Navigation
2. Hero
3. Services / Programs
4. 3D Meridian
5. Method / Philosophy
6. Instructor / Trust
7. Testimonials
8. CTA
9. Footer

**Her section için kontrol listesi:**

```txt
- Başlık güçlü mü?
- 1 ana fikir var mı?
- Text yoğunluğu fazla mı?
- CTA net mi?
- Visual rhythm var mı?
- Section önceki/sonraki section ile akıyor mu?
- Boşluklar premium mu?
- Microcopy marka diline uygun mu?
- Motion anlamlı mı?
- Mobile kırılımı özel tasarlanmış mı?
```

**Başarı kriteri:**

- Section’lar tek tek iyi değil, birlikte bir anlatı oluşturmalı.

---

## Faz 8 — Motion System ve Scroll Choreography

**Kullanılacaklar:**

- Motion
- GSAP sınırlı
- Lenis
- Motion Rules
- Web Design Guidelines reduced motion

**Amaç:** Hareketi dekorasyon değil, anlatı aracı yapmak.

**Motion rolleri:**

| Rol | Araç | Kullanım |
|---|---|---|
| Micro hover | Motion | Buton, link, kart |
| Section reveal | Motion | İlk girişler |
| Cinematic sequence | GSAP | Hero/meridian storytelling |
| Smooth scroll | Lenis | Landing genel hissi |
| Reduced motion | CSS/Motion | Erişilebilirlik |

**Yasaklar:**

- Her karta ayrı animasyon
- Sonsuz loop glow
- Her section’da parallax
- Kullanıcı scroll’unu ele geçirmek
- Reduced motion yok saymak

**Önerilen motion tokenları:**

```txt
hover: 160–220ms
small reveal: 360–480ms
section reveal: 520–700ms
hero entrance: 800–1100ms
stagger: 50–90ms
parallax ratio: 0.08–0.22
spring: sadece micro-interaction
```

**Çıkış dosyaları:**

- `docs/motion-rules.md`
- `design-system/motion.md`

**Başarı kriteri:**

- Site hareketli değil, canlı hissettirmeli.
- Motion kullanıcıyı yormamalı.

---

## Faz 9 — Accessibility ve Trust QA

**Kullanılacaklar:**

- Web Design Guidelines
- GStack `/qa`
- Code Review Skill
- Web keyboard/focus audit

**Amaç:** Premium siteyi herkes için kullanılabilir ve güvenilir yapmak.

**Kontroller:**

1. Renk kontrastı
2. Focus ring görünürlüğü
3. Klavye navigasyonu
4. ARIA gereksiz/yanlış kullanım
5. Reduced motion
6. Touch target minimumları
7. Form error states
8. Footer linkleri
9. Newsletter field
10. Mobile menu
11. Canvas fallback
12. Text contrast on gradients

**Çıkış dosyaları:**

- `docs/accessibility-checklist.md`
- `docs/issues.md`

**Başarı kriteri:**

- Görsel polish erişilebilirliği bozmamalı.
- CTA ve formlar klavye ile sorunsuz kullanılmalı.

---

## Faz 10 — Performance Budget ve Benchmark

**Kullanılacaklar:**

- GStack `/benchmark`
- React Best Practices
- Code Review Skill
- Next.js build analysis
- 3D lazy loading

**Amaç:** Awwwards hissi verirken ağır/laggy site yapmamak.

**Hedefler:**

```txt
LCP: < 2.5s hedef
CLS: < 0.1
INP: < 200ms
Hero blocking JS: minimum
3D: lazy / progressive
Images: optimized
Fonts: preload / display strategy
Motion: no layout thrashing
```

**Kontroller:**

1. `npm run build`
2. Bundle kontrolü
3. 3D model boyutu
4. Lenis + GSAP scroll performansı
5. Mobile FPS
6. Image loading
7. Font loading
8. Hydration warnings
9. Client component şişkinliği

**Çıkış dosyaları:**

- `docs/performance-budget.md`
- `docs/benchmark-results.md`

**Başarı kriteri:**

- Site premium ama ağır değil.
- 3D section ana sayfayı cezalandırmaz.

---

## Faz 11 — Footer ve Existing Polish Reconciliation

**Kullanılacaklar:**

- Mevcut `implementation_footer_antigravity.md`
- `claude.md` handoff notları
- UI UX Pro Max
- GStack `/design-review`

**Amaç:** Footer’da yapılmış polish’i korumak, ama site geneliyle uyumlu hale getirmek.

**Yapılacaklar:**

1. Footer’daki mevcut 4-5-3 grid, lifeline, newsletter card, alignment kararlarını oku.
2. Bu kararların design system’e taşınacak olanlarını ayır.
3. Footer-only hack kalmışsa temizle.
4. Footer sol/sağ ruler alignment site geneliyle tutarlı mı kontrol et.
5. Newsletter card premium invite modülüne dönüştürülsün:
   - Daha iyi headline
   - Daha iyi trust microcopy
   - Daha net privacy/security line
   - Hover/focus states
6. Micro text contrast yeniden kontrol edilsin.

**Başarı kriteri:**

- Footer tek başına iyi değil, sitenin final sahnesi gibi hissettirmeli.

---

## Faz 12 — Final Review Pipeline

**Kullanılacaklar:**

- GStack `/review`
- GStack `/qa`
- GStack `/benchmark`
- GStack `/ship`
- Code Review Skill
- Web Design Guidelines
- React Best Practices

**Amaç:** Tasarım, kod, erişilebilirlik ve performansın birlikte onaylanması.

**Sıra:**

```txt
1. /review
2. /design-review
3. /qa
4. /benchmark
5. npm run build
6. manual mobile QA
7. docs update
8. /ship
```

**Final skor tablosu:**

| Alan | Hedef | Durum |
|---|---:|---|
| Art Direction | 9.3+ | TBD |
| User Flow | 9.2+ | TBD |
| Typography | 9.3+ | TBD |
| Spacing | 9.4+ | TBD |
| Color / Contrast | 9.1+ | TBD |
| Motion | 9.0+ | TBD |
| 3D Integration | 8.8+ | TBD |
| Accessibility | 9.0+ | TBD |
| Performance | 8.8+ | TBD |
| Mobile | 9.0+ | TBD |
| Code Quality | 9.0+ | TBD |
| Overall | 9.1+ | TBD |

---

## 7. Claude Code İçin Ana Prompt

Aşağıdaki prompt, bu dosya ile birlikte Claude Code’a verilecek ana çalışma komutudur:

```txt
You are working on the Yaşama Sanatı Next.js 15 / React 19 / Tailwind 4 website.

Goal:
Transform the existing site into a premium editorial wellness academy experience approaching Awwwards Honorable Mention quality.

Before editing:
1. Read README.md
2. Read package.json
3. Read claude.md
4. Read implementation_footer_antigravity.md
5. Read docs/implementation-awwwards-polish.md
6. Read design-system/MASTER.md if it exists

Operating rules:
- Do not make drive-by edits.
- Do not add visual effects without a design reason.
- Do not add a new animation library unless explicitly justified in docs/decisions.md.
- Motion is for micro-interactions and section reveals.
- GSAP is only for cinematic scroll/storytelling moments.
- Lenis must not break accessibility, anchors, keyboard navigation, or mobile usability.
- Three.js/R3F must remain progressive-enhancement and must not harm LCP.
- Every design change must update docs/progress.md.
- Every architectural/design-system decision must update docs/decisions.md.
- If a section scores below 8.8, create a todo item instead of silently patching it.
- Respect reduced-motion users.
- Maintain strong contrast and visible focus states.
- Prefer fewer, better details over more decorative elements.

Process:
1. Audit current section inventory.
2. Score each section across typography, spacing, contrast, motion, brand fit, conversion clarity, accessibility, and performance.
3. Create docs/visual-audit.md.
4. Create or update design-system/MASTER.md.
5. Propose a phased implementation plan.
6. Implement only the current approved phase.
7. Run lint/build where possible.
8. Update docs/progress.md and docs/issues.md.

Target feeling:
Aesop + Kinfolk + Apple + modern wellness academy.
Calm, precise, embodied, premium, trustworthy.
Not a generic spiritual template. Not a noisy AI SaaS landing page.
```

---

## 8. Octogent / Parallel Agent Kullanımı

Octogent ilk sprintte kullanılmamalı. Aşağıdaki koşullar sağlandıktan sonra kullanılabilir:

- `docs/visual-audit.md` tamamlandı
- `design-system/MASTER.md` tamamlandı
- `docs/todo.md` section bazlı ayrıldı
- Build stabil
- Ana creative direction kilitlendi

Sonra tentacle yapısı:

```txt
.octogent/tentacles/hero/
  CONTEXT.md
  todo.md

.octogent/tentacles/design-system/
  CONTEXT.md
  todo.md

.octogent/tentacles/3d-meridian/
  CONTEXT.md
  todo.md

.octogent/tentacles/accessibility/
  CONTEXT.md
  todo.md

.octogent/tentacles/performance/
  CONTEXT.md
  todo.md

.octogent/tentacles/footer/
  CONTEXT.md
  todo.md
```

Her ajan sadece kendi scoped alanında çalışmalı. Ortak dosyalar için karar `docs/decisions.md` üzerinden alınmalı.

---

## 9. Kullanılmayacak Şeyler İçin Açık Yasak Listesi

```txt
- Anime.js ekleme
- Barba.js ekleme
- Spline ekleme
- Uiverse tarzı generic snippet kopyalama
- Her section’a glow/gradient ekleme
- CTA’yı gizleyen decorative layer kullanma
- Reduced motion fallback olmadan scroll animation yazma
- 3D modeli initial render’da zorunlu yükleme
- Tasarım sistemine yazılmamış yeni renk/font/spacing icat etme
- Footer polish kararlarını site geneline düşünmeden kopyalama
- “Awwwards” bahanesiyle usability bozma
```

---

## 10. İlk Yapılacak 25 Somut Görev

```md
- [ ] Create docs/implementation-awwwards-polish.md
- [ ] Create docs/progress.md
- [ ] Create docs/decisions.md
- [ ] Create docs/issues.md
- [ ] Create docs/art-direction.md
- [ ] Create docs/ux-flow.md
- [ ] Create docs/visual-audit.md
- [ ] Create docs/motion-rules.md
- [ ] Create docs/performance-budget.md
- [ ] Create docs/accessibility-checklist.md
- [ ] Create design-system/MASTER.md
- [ ] Create design-system/colors.md
- [ ] Create design-system/typography.md
- [ ] Create design-system/spacing.md
- [ ] Create design-system/motion.md
- [ ] Inventory all sections under sections/
- [ ] Inventory all reusable components under components/
- [ ] Audit current hero section
- [ ] Audit current navigation
- [ ] Audit current 3D meridian section
- [ ] Audit current footer against existing Antigravity plan
- [ ] Score all sections 0–10
- [ ] Identify all low-contrast text
- [ ] Identify all unnecessary client components
- [ ] Run build/lint and document errors
```

---

## 11. Final Hüküm

Bu proje için doğru strateji, rapordaki tüm araçları körlemesine kurmak değil; yüksek uygunluk puanı alanları **işlevlerine göre sıraya koymak**tır.

Yaşama Sanatı için ana omurga:

```txt
UI UX Pro Max
+ Planning with Files
+ Superpowers
+ GStack
+ Web Design Guidelines
+ React Best Practices
+ Composition Patterns
+ Code Review Skill
+ Motion
+ Lenis
+ Three/R3F mevcut sistemi
+ sınırlı GSAP
+ Fontpair
+ Godly / Minimal / Refero / Unsection
```

Bu sistem doğru uygulanırsa site “efektli” değil, **tasarım yönetimi olan premium dijital deneyim** haline gelir.

Awwwards kalitesine yaklaşmanın yolu tek büyük değişiklik değil; 10–20 kontrollü polish sprintidir.

