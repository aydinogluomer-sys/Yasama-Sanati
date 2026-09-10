# Yaşama Sanatı — Awwwards Silhouette Redesign Implementation Plan

> **Bu dosya önceki polish turunun devamıdır.** Önceki tur “mevcut iskeletin üstünü parlatma” olarak başarılıdır; fakat kullanıcı hedefi artık daha net: **sayfaya bakınca başka bir iş gibi hissettiren, görünür silüeti değişmiş, Awwwards seviyesine yaklaşan editorial/wellness deneyim**.
>
> Bu planın amacı görünmez kalite katmanı değil; **görsel kütle, section geçişleri, tipografik ölçek, signature motion ve kompozisyon karakteri** üzerinden sitenin algısını değiştirmektir.

---

## 0. Executive Summary

### 0.1 Mevcut Durum Teşhisi

Claude’un önceki tur raporuna göre yapılan iş teknik olarak başarılıdır; fakat yapılan iyileştirmelerin çoğu şu sınıfta kalmıştır:

- responsive kırılımlar,
- erişilebilirlik,
- reduced-motion,
- dialog davranışları,
- build ve performans,
- küçük UI polish,
- mevcut section iskeletini koruyan kalite düzeltmeleri.

Bu değerli ama **görünür dönüşüm yaratmaz**. Kullanıcının şikâyeti haklıdır:

> “Farklı geçiş animasyonları yok. Tamamen handwriting özel Awwwards cinsi büyük tipografiler yok. Section arası animasyonlar, yazı animasyonları yok. Bir wow efekti yok. Section sıralaması aynı olabilir ama görüntü olarak hiçbir değişiklik yok.”

Bu dosya bu problemi çözer.

### 0.2 Yeni Hedef

Yeni hedef **polish değil**, aşağıdaki alanlarda görünür redesign’dır:

1. **Hero silhouette redesign** — ekran üstü kütle, oran, tipografik kompozisyon ve ilk izlenim radikal şekilde değişecek.
2. **Editorial typography system** — büyük, nefes alan, elle seçilmiş gibi duran tipografik sahneler kurulacak.
3. **Section transition system** — her bölüm standart fade/reveal ile değil, kendi karakteri olan sinematik geçişlerle bağlanacak.
4. **Signature motion layer** — sitede hatırlanabilir 2–3 özel hareket anı olacak.
5. **Responsive-safe text animation** — manuel satır kırma riskleri azaltılacak; satır/kelime reveal sistemi responsive davranacak.
6. **Card out-state / crossfade** — mevcut kart girişleri çıkış animasyonlarıyla tamamlanacak.
7. **Button / CTA motion standard** — gecikmeli, deforme olabilen SVG border ve hover davranışları düzeltilip tek motion standardına bağlanacak.
8. **Same order, new silhouette** — section sırası mümkün olduğunca korunabilir; fakat sectionların görüntü kütlesi, oranı ve ritmi değişmeli.

### 0.3 Başarı Kriteri

Bu sprintin sonunda şu cümle doğru olmalı:

> “Bu hâlâ Yaşama Sanatı ama artık aynı sitenin biraz parlatılmış hali değil; yaratıcı bir stüdyo tarafından yeniden sahnelenmiş gibi duruyor.”

---

## 1. Repo ve Teknik Bağlam

### 1.1 Mevcut Stack

Mevcut repo yapısı Next.js/React/Tailwind/Motion/Lenis/Three ekseninde kuruludur.

Kullanılabilir mevcut temel teknolojiler:

- **Next.js 15**
- **React 19**
- **TypeScript**
- **Tailwind CSS 4**
- **Motion**
- **Lenis**
- **Three.js**
- **@react-three/fiber**
- **@react-three/drei**

### 1.2 Mevcut Güçlü Yanlar

- Motion stack zaten mevcut.
- Lenis smooth scroll mevcut.
- Three/R3F/Drei altyapısı mevcut.
- Clip-path tabanlı görsel açılma tekniği zaten var.
- Masked text reveal sistemi var.
- Premium renklere yakın koyu zeytin/krem/bakır temeli mevcut.
- Footer polish geçmişi mevcut.

### 1.3 Mevcut Ana Eksikler

- Görünür silüet değişmemiş.
- Hero yeterince “an” yaratmıyor.
- Tipografi yeterince büyük, editorial ve dramatik değil.
- Section geçişleri fazla tahmin edilebilir.
- Scroll reveal dili jenerik kalıyor.
- Text animation sistemi yer yer manuel satır bölmeye dayanıyor.
- ClipImageCard girişe sahip ama çıkış/crossfade hissi zayıf.
- Button SVG border’da `vectorEffect="non-scaling-stroke"` eksikliği ve hover delay problemi var.
- Motion sistemi tek bir “hareket dili” gibi davranmıyor.
- Signature wow effect yok.

---

## 2. Bu Sprintin Felsefesi

### 2.1 Önceki Turun Hatası

Önceki tur yanlış değildi; fakat hedefle sınırlıydı:

```txt
Mevcut iskelet korunmuş
→ görünmez kalite yükselmiş
→ kullanıcı siteye bakınca büyük fark hissetmemiş
```

Bu sprintte bu yaklaşım yasak.

### 2.2 Yeni Turun Kuralı

```txt
Görünür fark yoksa iş bitmiş sayılmaz.
```

Her faz sonunda şu soru sorulacak:

> “Bu değişiklik ekran görüntüsünde açıkça fark ediliyor mu?”

Cevap hayırsa, değişiklik **yetersiz** kabul edilir.

### 2.3 Değiştirilecek Şeyler

Bu sprintte özellikle şu alanlara dokunulacak:

- oranlar,
- boşluk ritmi,
- görsel kütle dağılımı,
- hero kurgusu,
- section arası geçişler,
- medya boyutları,
- asimetri,
- büyük tipografik bloklar,
- handwriting / human mark layer,
- scroll-driven cinematic transitions,
- card state çıkış animasyonları,
- CTA hover fiziksel hissi.

### 2.4 Korunacak Şeyler

- Marka ana rengi tamamen koparılmayacak.
- Sitenin wellness / bütünsel şifa kimliği korunacak.
- Section sırası ancak güçlü gerekçe varsa değiştirilecek.
- Erişilebilirlik ve reduced-motion önceki turdan geriye düşmeyecek.
- Performance budget ihlal edilmeyecek.
- Gereksiz yeni dependency eklenmeyecek.

---

## 3. Seçilecek Skill, Kütüphane ve Agent Paketi

Bu plan tüm raporun tekrar değerlendirilmiş hâlidir. Sadece yüksek puanlı ve Yaşama Sanatı için gerçek etkisi olan parçalar kullanılır.

---

## 3.1 Ana Skill Katmanı

### 3.1.1 UI UX Pro Max

**Rol:** Creative Director + Lead Product Designer  
**Kullanım:** Mutlak  
**Puan:** 10/10

**Bu sprintte görevi:**

- Hero silhouette audit
- Editorial typography audit
- Art direction correction
- AI slop detection
- Layout rhythm scoring
- CTA hierarchy correction
- Visual density balancing
- Color/contrast refinement
- Premium wellness anti-pattern detection

**Claude’a talimat:**

```txt
Use UI UX Pro Max as the design authority.
Do not treat this as a normal polish pass.
Evaluate visible silhouette, editorial scale, motion character and creative memorability.
Anything that only improves invisible quality but does not change visual perception is secondary.
```

---

### 3.1.2 Planning with Files

**Rol:** Hafıza ve iş sürekliliği  
**Kullanım:** Mutlak  
**Puan:** 10/10

**Bu sprintte görevi:**

- Her fazı dosyaya bağlamak
- Yapılan/gidilecek işleri görünür tutmak
- Agentlar arası handoff sağlamak
- Kararları kayıt altına almak
- Sonsuz polish loop’unu engellemek

**Zorunlu dosyalar:**

```txt
docs/
  silhouette-implementation.md
  progress.md
  todo.md
  decisions.md
  issues.md
  visual-audit.md
  motion-rules.md
  typography-system.md
  art-direction.md
  agent-handoffs.md
  qa-report.md
  benchmark-report.md
```

---

### 3.1.3 Superpowers

**Rol:** Çalışma metodolojisi / senior engineer discipline  
**Kullanım:** Mutlak  
**Puan:** 9.8/10

**Bu sprintte görevi:**

```txt
Araştır
→ Planla
→ Implement et
→ Test et
→ Refactor et
→ Dokümante et
→ QA yap
```

**Neden kritik?**

Bu tür bir sprintte Claude hızlıca 20 dosya değiştirip “tamam” diyebilir. Superpowers yaklaşımı bunu engeller; önce mevcut componentleri, motion sistemini ve responsive riskleri inceler.

**Claude’a talimat:**

```txt
Do not directly implement visual changes.
First inspect existing files and produce a silhouette redesign plan.
Then implement phase by phase.
Every phase must have a test and verification step.
```

---

### 3.1.4 GStack

**Rol:** Sanal ürün/tasarım/engineering ekibi  
**Kullanım:** Mutlak ama kontrollü  
**Puan:** 9.6/10

**Bu sprintte kullanılacak komutlar:**

```txt
/office-hours
/autoplan
/plan-design-review
/plan-eng-review
/design-consultation
/design-shotgun
/design-review
/review
/qa
/qa-only
/benchmark
/ship
/retro
/learn
/careful
/freeze
/unfreeze
```

**Yasak / dikkatli komutlar:**

```txt
/land-and-deploy     # kullanıcı onayı olmadan yok
/cso                 # security audit gerekiyorsa ayrı faz
/document-release    # iş bitmeden çalıştırma
/parallel uncontrolled agents # Octogent yoksa elle paralel başlatma yok
```

**Bu sprintte önerilen GStack akışı:**

```txt
/office-hours
→ /autoplan
→ /plan-design-review
→ /design-consultation
→ /design-shotgun
→ implement approved visual direction
→ /design-review
→ /review
→ /qa-only
→ /benchmark
→ /retro
```

---

### 3.1.5 Web Design Guidelines

**Rol:** Accessibility ve inclusive design  
**Kullanım:** Mutlak  
**Puan:** 9.5/10

**Bu sprintte görevi:**

- Reduced motion fallback
- Keyboard navigation
- Focus state görünürlüğü
- Touch target
- Contrast
- ARIA gerekliliği
- Dialog/menu davranışları
- Motion sensitivity kontrolü

**Kural:**

Awwwards hissi için motion agresifleşebilir; fakat reduced-motion’da deneyim kırılmamalı.

---

### 3.1.6 React Best Practices

**Rol:** React/Next performans ve mimari kalite  
**Kullanım:** Mutlak  
**Puan:** 9.2/10

**Bu sprintte görevi:**

- Client component sınırlarını kontrol etmek
- Hydration risklerini azaltmak
- Scroll state update maliyetini ölçmek
- `useMotionValueEvent` update frekansını optimize etmek
- Bundle artışını kontrol etmek
- Lazy/dynamic import gereken motion/3D katmanları ayırmak

---

### 3.1.7 Composition Patterns

**Rol:** Component API mimarisi  
**Kullanım:** Mutlak  
**Puan:** 8.6/10

**Bu sprintte görevi:**

Yeni motion/typography componentleri parçalı, tekrar kullanılabilir ve açık API’li olmalı.

Önerilen componentler:

```txt
components/Client/EditorialTextReveal.tsx
components/Client/DynamicLineReveal.tsx
components/Client/SectionTransition.tsx
components/Client/AmbientMorphLayer.tsx
components/Client/ScrollStage.tsx
components/Client/HandwritingMark.tsx
components/Client/MeridianDrawPath.tsx
components/Client/CrossfadeStateCard.tsx
components/Server/EditorialSectionTitle.tsx
components/Server/SignatureCTA.tsx
```

---

### 3.1.8 Code Review Skill

**Rol:** Kod kokusu / maintainability / TypeScript kalite  
**Kullanım:** Mutlak  
**Puan:** 8.8/10

**Bu sprintte görevi:**

- Yeni componentlerin gereksiz karmaşık olmaması
- Motion logic’in dağılmaması
- Repeated constants’ın `motion-rules` veya `tokens` altına taşınması
- TypeScript any kullanımının önlenmesi
- Cleanup ve dead code temizliği

---

### 3.1.9 Taste Skill / Impeccable / Frontend Design Skill

**Rol:** Tasarım zevki ve son kalite filtresi  
**Kullanım:** Kontrollü  
**Puan:** 8.5–9/10

**Bu sprintte görevi:**

- “Bu hâlâ template gibi mi?” sorusuna sert cevap vermek
- Fazla decoration yakalamak
- Tipografi/spacing/motion uyumunu değerlendirmek
- Final polish checklist’i uygulamak

---

## 3.2 Kütüphane ve Teknik Stack Kararı

### 3.2.1 Mutlak Kullanılacak Mevcut Kütüphaneler

```txt
motion
lenis
three
@react-three/fiber
@react-three/drei
next/image
Tailwind CSS 4
```

### 3.2.2 Kontrollü Eklenebilecek Kütüphane

```txt
gsap
```

**GSAP yalnızca şu durumlarda eklenebilir:**

- Hero timeline Motion ile fazla karmaşıklaşıyorsa
- Section transition sequencing için timeline gerekiyorsa
- ScrollTrigger benzeri sahne yönetimi gerçekten gerekliyse
- Bundle etkisi kabul edilebilir düzeydeyse

**GSAP eklenirse kullanım alanı:**

```txt
Hero opening timeline
Section wash transition
Pinned storytelling panel
Meridian path draw sequence
```

**GSAP kullanılmayacak alanlar:**

```txt
Button hover
Card hover
Simple reveal
Micro interaction
```

Bu alanlarda Motion kalacak.

---

### 3.2.3 Eklenmemesi Gerekenler

```txt
Anime.js
Barba.js
Spline
Uiverse-heavy snippets
Random smooth-scroll libs
Multiple text animation libraries
```

**Neden?**

Bu sprintin amacı stack şişirmek değil, mevcut kaliteli temeli daha sahneli hale getirmektir.

---

### 3.2.4 Text Splitter Kararı

Dinamik text splitter konusu kritik ama körlemesine dependency eklenmeyecek.

İki seçenek var:

#### Seçenek A — Internal Responsive Text Splitter

```txt
components/Client/DynamicLineReveal.tsx
```

- ResizeObserver kullanır.
- Text’i word span’lerine böler.
- Render sonrası gerçek satır gruplarını ölçer.
- Line-level mask reveal yapar.
- Breakpoint değişince yeniden hesaplar.
- Reduced-motion’da plain text döner.

**Öncelikli seçenek budur.**

#### Seçenek B — Harici SplitType benzeri çözüm

Sadece internal çözüm stabil çalışmazsa değerlendirilecek.

**Kural:** Harici text split dependency eklenmeden önce `docs/decisions.md` içine gerekçe yazılacak.

---

## 3.3 AI Agent Mimarisi

Bu sprint tek Claude oturumu ile yapılabilir; ancak daha sağlam sistem için bağımsız uzman ajanlar ve handoff sistemi kurulacak.

### 3.3.1 Ana Orkestratör Agent

**Ad:** Creative Orchestrator Agent  
**Skill:** GStack + Superpowers + Planning with Files  
**Görev:** Tüm fazları yönetir, diğer agent çıktılarının çelişmesini önler.

**Okur:**

```txt
docs/silhouette-implementation.md
docs/progress.md
docs/decisions.md
docs/issues.md
docs/agent-handoffs.md
```

**Yazar:**

```txt
docs/progress.md
docs/decisions.md
docs/issues.md
docs/agent-handoffs.md
```

---

### 3.3.2 Creative Director Agent

**Skill:** UI UX Pro Max + Taste Skill  
**Görev:** Silüet, art direction, wow effect, visual memorability.

**Sorumlulukları:**

- Mevcut site screenshot’larını değerlendirir.
- Hero için 3 farklı creative route önerir.
- Section rhythm için görsel kütle planı üretir.
- “Awwwards hissi var mı?” sorusunu puanlar.

**Çıktı:**

```txt
docs/art-direction.md
docs/visual-audit.md
```

---

### 3.3.3 Typography Director Agent

**Skill:** UI UX Pro Max + Fontpair yönü + frontend design  
**Görev:** Büyük editorial tipografi ve handwriting vurgu sistemi.

**Sorumlulukları:**

- Hero display scale kurar.
- Section title scale kurar.
- Handwriting kullanım noktalarını belirler.
- Manuel line break risklerini denetler.
- Dynamic text reveal sistemine gereksinim yazar.

**Çıktı:**

```txt
docs/typography-system.md
```

---

### 3.3.4 Motion Director Agent

**Skill:** Motion + GSAP + Lenis + Web Design Guidelines  
**Görev:** Section transition ve motion grammar.

**Sorumlulukları:**

- Motion tokenları belirler.
- Hero timeline planlar.
- Section transition karakterlerini tanımlar.
- Reduced-motion eşdeğerlerini yazar.
- Motion aşırılığını engeller.

**Çıktı:**

```txt
docs/motion-rules.md
```

---

### 3.3.5 Hero Redesign Agent

**Skill:** UI UX Pro Max + Motion + React Best Practices  
**Görev:** Hero silhouette’i yeniden kurar.

**Sorumlulukları:**

- Above-the-fold kompozisyonu değiştirir.
- Büyük tipografik sahne oluşturur.
- İlk 3 saniyede wow moment üretir.
- CTA’yı görünür ve güvenilir kılar.
- Mobile hero’yu ayrı düşünür.

**Çıktı:**

```txt
sections/Hero/*
components/Client/HeroOpeningMotion.tsx
components/Client/HandwritingMark.tsx
```

---

### 3.3.6 Section Transition Agent

**Skill:** Motion + GSAP optional + Lenis  
**Görev:** Bölümler arası geçişleri sinematik hale getirir.

**Sorumlulukları:**

- Ambient morphing
- Screen wash
- Overlap/panel transition
- Parallax depth
- Image expansion
- Scroll progress bound transitions

**Çıktı:**

```txt
components/Client/SectionTransition.tsx
components/Client/AmbientMorphLayer.tsx
components/Client/ScrollStage.tsx
```

---

### 3.3.7 Component Architect Agent

**Skill:** Composition Patterns + React Best Practices  
**Görev:** Yeni görsel sistemin component olarak sürdürülebilir kurulması.

**Sorumlulukları:**

- Motion variants merkezi yapı
- Typography componentleri
- Section shell componentleri
- Duplication önleme
- Client/server boundary kontrolü

**Çıktı:**

```txt
components/Client/*
components/Server/*
utils/motion/*
utils/tokens/*
```

---

### 3.3.8 Accessibility Agent

**Skill:** Web Design Guidelines  
**Görev:** Motion ve görsel dönüşüm erişilebilirliği bozmasın.

**Sorumlulukları:**

- `prefers-reduced-motion`
- focus görünürlüğü
- keyboard flow
- ARIA
- contrast
- mobile touch target
- screen reader noise önleme

**Çıktı:**

```txt
docs/accessibility-checklist.md
docs/qa-report.md
```

---

### 3.3.9 Performance Agent

**Skill:** React Best Practices + Benchmark  
**Görev:** Motion/3D/scroll sisteminin performansını korur.

**Sorumlulukları:**

- bundle kontrolü
- LCP/CLS/INP riski
- image loading strategy
- 3D lazy loading
- heavy animation isolation
- mobile FPS sanity check

**Çıktı:**

```txt
docs/benchmark-report.md
```

---

### 3.3.10 QA Browser Agent

**Skill:** GStack `/qa-only` veya `/qa`  
**Görev:** Gerçek kullanıcı akışını test eder.

**Sorumlulukları:**

- Home page full scroll
- Nav behavior
- CTA click
- Mobile viewport
- Tablet viewport
- Reduced motion
- Form/dialog if exists
- Visual glitches
- console errors

**Çıktı:**

```txt
docs/qa-report.md
```

---

## 3.4 Agentlar Nasıl Konuşacak?

### 3.4.1 Basit Mod — Tek Claude Code İçinde Sıralı Agent Simülasyonu

İlk önerilen mod budur.

```txt
Creative Orchestrator
  → Creative Director
  → Typography Director
  → Motion Director
  → Hero Agent
  → Section Transition Agent
  → Component Architect
  → Accessibility
  → Performance
  → QA
```

Her rol bittikten sonra `docs/agent-handoffs.md` içine not bırakır.

### 3.4.2 İleri Mod — Octogent ile Paralel Agent

Sadece faz 0–2 tamamlandıktan sonra kullanılmalı.

Önerilen tentacle yapısı:

```txt
.octogent/tentacles/
  hero-redesign/
    CONTEXT.md
    todo.md
    handoff.md

  typography-system/
    CONTEXT.md
    todo.md
    handoff.md

  section-transitions/
    CONTEXT.md
    todo.md
    handoff.md

  accessibility-qa/
    CONTEXT.md
    todo.md
    handoff.md

  performance-qa/
    CONTEXT.md
    todo.md
    handoff.md
```

**Kurallar:**

- Aynı dosyaya iki agent paralel dokunamaz.
- Hero Agent ve Section Transition Agent aynı anda `app/page.tsx` veya layout shell’e dokunamaz.
- Accessibility Agent kod değiştirecekse önce ilgili owner agent’a handoff bırakır.
- Performance Agent yeni dependency kaldırma önerisi yapabilir ama tek başına silemez.
- Orchestrator her merge öncesi conflict ve design consistency kontrol eder.

---

# 4. Scoring Matrix — Yaşama Sanatı İçin Uygunluk

Bu tablo, rapordaki tüm önemli araç/skill/kütüphaneleri Yaşama Sanatı silüet redesign sprinti için yeniden puanlar.

| Madde | Kategori | Puan | Karar | Bu Sprintte Kullanım |
|---|---:|---:|---|---|
| UI UX Pro Max | Design Director | 10 | Kullan | Creative authority |
| Planning with Files | Memory | 10 | Kullan | Faz ve handoff kaydı |
| Superpowers | Methodology | 9.8 | Kullan | Araştır-plan-test-disiplin |
| GStack | Virtual Team | 9.6 | Kullan | `/autoplan`, `/design-review`, `/qa` |
| Web Design Guidelines | Accessibility | 9.5 | Kullan | Reduced motion / WCAG |
| React Best Practices | Performance | 9.2 | Kullan | Hydration/bundle/scroll state |
| Composition Patterns | Architecture | 8.6 | Kullan | Component API |
| Code Review Skill | QA | 8.8 | Kullan | Maintainability |
| Taste Skill | Design Judgment | 8.8 | Kullan | AI slop filter |
| Impeccable | Polish | 8.5 | Kullan | Final quality pass |
| Motion | Animation | 9.5 | Kullan | Core animation engine |
| Lenis | Smooth Scroll | 8.8 | Kullan | Scroll feel |
| GSAP | Cinematic Motion | 8.9 | Kontrollü | Hero/section timeline |
| Three/R3F/Drei | 3D layer | 8.7 | Kontrollü | Existing 3D optimize |
| ShaderGradient | Ambient | 8.0 | Sınırlı | Background morph inspiration |
| Jitter | Asset Motion | 7.8 | Opsiyonel | Runtime değil, asset |
| Fontpair | Typography | 9.0 | Kullan | Type pairing reference |
| Godly | Inspiration | 9.3 | Kullan | Awwwards reference |
| Minimal.gallery | Inspiration | 9.0 | Kullan | Editorial minimal direction |
| Refero | Inspiration | 8.8 | Kullan | Section/style references |
| Unsection | Section refs | 9.0 | Kullan | Section rhythm |
| Aceternity | Components | 7.8 | İlham | Direct copy yok |
| ReactBits | Creative Components | 7.8 | İlham | 1–2 signature idea |
| Anime.js | Animation | 4.5 | Kullanma | Redundant |
| Barba.js | Transitions | 4.0 | Kullanma | Next risk |
| Spline | 3D | 6.5 | Kullanma | Existing R3F var |
| React Native Skills | Mobile app | 4.5 | Kullanma | Web projesi |
| Octogent | Orchestration | 8.2 | Faz 8 | Paralel çalışma gerekirse |
| GBrain | Long memory | 7.8 | Opsiyonel | Uzun proje memory |

---

# 5. Global Implementation Rules

## 5.1 Görünür Dönüşüm Kuralı

Her faz sonunda şu kontrol yapılacak:

```txt
Can the user see this difference in a screenshot or scroll recording?
```

Hayırsa, faz tamamlanmış sayılmaz.

## 5.2 “Invisible Work Only” Yasağı

Bu sprintte sadece şu tür işler tek başına yeterli kabul edilmez:

- small refactor,
- minor accessibility fix,
- reduced-motion cleanup,
- console cleanup,
- tiny spacing tweak,
- build fix,
- hover duration tweak.

Bunlar yapılabilir ama ana çıktı görünür redesign olmalı.

## 5.3 Signature Moment Kuralı

En az üç imza anı olmalı:

1. **Hero Opening Moment**
2. **Section Transition Moment**
3. **Editorial Typography / Handwriting Moment**

Opsiyonel dördüncü:

4. **Meridian / Breath / Energy Path Scroll Moment**

## 5.4 Motion Bütçesi

Motion şu üç katmanda olacak:

```txt
Layer 1 — Micro Motion
Button, card, link, hover, focus.

Layer 2 — Section Motion
Reveal, parallax, overlap, ambient morph.

Layer 3 — Signature Motion
Hero opening, meridian draw, handwriting stroke, pinned story.
```

Her şey hareket etmeyecek. Hareket eden şeyin anlatı görevi olacak.

## 5.5 Dependency Bütçesi

Varsayılan yaklaşım:

```txt
Yeni dependency ekleme.
Mevcut Motion + Lenis + Three stack ile çöz.
```

GSAP sadece açık gerekçeyle eklenebilir.

## 5.6 Performance Bütçesi

Hedefler:

```txt
LCP: < 2.8s hedef
CLS: < 0.1
INP: < 200ms hedef
Console error: 0
Hydration warning: 0
Reduced motion: destekli
Mobile scroll jank: kabul edilemez
```

## 5.7 Mobile First Değil, Mobile Equal

Bu site desktop’ta Awwwards hissi verirken mobile’da kırpılmış demo gibi görünmemeli.

Mobile için ayrı kontroller:

- hero typography scale,
- full-bleed image behavior,
- scroll transition yoğunluğu,
- CTA erişilebilirliği,
- text reveal line breaks,
- sticky/pinned section fallback.

---

# 6. Faz Faz Uygulama Planı

---

## Phase 0 — Stop, Baseline, Scope Freeze

### Amaç

Mevcut sitenin gerçekten nerede olduğunu ölçmek ve bu sprintin “görünür silüet redesign” olduğunu kayda geçirmek.

### Kullanılacak Skilller

```txt
Planning with Files
Superpowers
GStack /careful
GStack /freeze
```

### Yapılacaklar

1. `docs/silhouette-implementation.md` dosyasını oku.
2. Mevcut repo durumunu kontrol et.
3. Değişmiş dosyaları listele.
4. Baseline screenshot veya viewport notu al:
   - desktop 1440px,
   - desktop 1920px,
   - tablet,
   - mobile 390px.
5. Mevcut siteyi 0–10 puanla:
   - Hero silhouette
   - Typography drama
   - Section transition
   - Motion signature
   - Card state fluidity
   - Button/CTA tactility
   - Mobile visual impact
6. `docs/progress.md` içine sprint başlangıç kaydı yaz.
7. `docs/issues.md` içine önceki rapordaki sorunları issue olarak ekle.

### Kabul Kriteri

```txt
Before screenshot / baseline notes exist.
Current visible-impact score is written.
No implementation started before baseline.
```

---

## Phase 1 — Creative Direction Reset

### Amaç

Önceki polish yönünü bırakıp yeni görsel hedefi sabitlemek.

### Kullanılacak Skilller

```txt
UI UX Pro Max
GStack /office-hours
GStack /plan-ceo-review
Taste Skill
```

### Çıktı Dosyaları

```txt
docs/art-direction.md
docs/visual-audit.md
docs/decisions.md
```

### Yapılacaklar

1. Yaşama Sanatı için 3 creative route üret:

```txt
Route A — Editorial Wellness Academy
Aesop + Kinfolk + refined serif/sans rhythm.

Route B — Cinematic Healing Studio
Dark olive, large image masses, slow transitions, spiritual but premium.

Route C — Meridian Intelligence
3D/anatomy/energy line metaphor, more experimental Awwwards direction.
```

2. Her route için puan ver:

```txt
Brand fit
Awwwards potential
Implementation risk
Performance risk
Conversion clarity
```

3. Bir ana route seç.
4. Route dışı yapılmayacak şeyleri yaz.
5. Hero, intro, program cards, footer için mood tanımı yap.

### Önerilen Seçim

```txt
Primary: Route A — Editorial Wellness Academy
Secondary accent: Route C — Meridian Intelligence
```

Yani site tamamen “tech demo” olmayacak; fakat meridyen/nefes/enerji çizgisiyle özgün bir signature layer kazanacak.

### Kabul Kriteri

```txt
One creative route selected.
Hero visual direction written.
Typography direction written.
Motion direction written.
Anti-pattern list updated.
```

---

## Phase 2 — Typography System V2

### Amaç

Awwwards hissini en hızlı artıracak alan: büyük, bilinçli, editorial tipografi.

### Tipografi Referans Analizi ve Marka Uygunluğu

| Font / Tipografi referansı              |    Puan | Kullanım                       |
| --------------------------------------- | ------: | ------------------------------ |
| **High-contrast serif**                 | **9.0** | Ana display / hero / manifesto |
| **Katya Yumasheva tipografik sistem**   | **8.7** | Layout + hero/menu cesareti    |
| **Kisthe**                              | **8.5** | Signature accent               |
| **ODDWORKS dev rotate typography**      | **8.3** | Signature section              |
| **Layered outline + serif mix**         | **8.0** | Hero / transition              |
| **Gevora**                              | **8.0** | Modern premium display         |
| **Abril Fatface + Lato**                | **7.8** | Editorial başlık + body        |
| **Outline typography**                  | **7.8** | Overlay / motion / accent      |
| **Nunito + Lora**                       | **7.5** | Güvenli body sistemi           |
| **Intercom report/custom type sistemi** | **7.2** | Akademi/program anlatımı       |
| **Chonburi + Domine**                   | **7.2** | Retro editorial vurgu          |
| **Arima Madurai + Mulish**              | **7.0** | Sıcak/insani sistem            |
| **Calligraphic outline handwriting**    | **7.0** | Çok sınırlı vurgu              |
| **Ultra + Slabo**                       | **6.5** | Ağır editorial section         |
| **Grand Hotel + Lato**                  | **6.0** | Çok sınırlı handwriting accent |

#### Değerlendirme ve Uygulama Stratejisi:

##### 1. En Uygun ve Mutlaka Kullanılması Gerekenler (Önerilenler)
*   **High-Contrast Serif (9.0) — Ana Seçim:** Cormorant Garamond gibi yüksek kontrastlı, ince detaylı serif fontlar; zamansız bilgeliği, akademik prestiji ve wellness (esenlik) ruhunu en iyi temsil eden fontlardır. Başlıklar, hero alanı ve manifesto paragrafları için kullanılacaktır.
*   **Katya Yumasheva Tipografik Sistem (8.7) — Layout & Ritim:** Geniş harf aralıklı (letter-spacing), temiz ve ince sans-serif etiketlerle editoryal hiyerarşiler kurar. Projedeki premium sans-serif **Basis Grotesque** ile mükemmel bir uyum yakalayarak menü öğeleri, navigasyon linkleri ve alt bilgilerde (metadata) kullanılacaktır.
*   **Layered Outline + Serif Mix & Kisthe (8.0 - 8.5) — İmza & Atmosfer:** Transparan arka plan filigranları ve aralara serpiştirilecek italik/el yazısı (signature touch) vurguları (örneğin: *"tek bir bütün"*) şifa akademisinin insani dokunuşunu destekler.

##### 2. Sınırlandırılması / Kontrollü Kullanılması Gerekenler
*   **ODDWORKS Dev Rotate Typography (8.3):** Dikey yerleştirilmiş yazılar modern hissettirir fakat aşırıya kaçmamalıdır. Sadece koordinat bilgisi gibi küçük etiketlerde (örn: footer sol alt köşe) tutulacaktır.
*   **Outline Typography (7.8):** Okunabilirliği düşürdüğü için kesinlikle okunması gereken içeriklerde kullanılmayacak, yalnızca dekoratif arka plan katmanlarında kalacaktır.

##### 3. Kesinlikle Uygun Olmayanlar (Uzak Durulması Gerekenler)
*   **Abril Fatface (7.8):** Çok kalın ve ağır bir fonttur. Şifa akademisinin ihtiyacı olan hafif, huzurlu hissi ezer ve agresif durur.
*   **Nunito + Lora (7.5):** Nunito, yuvarlak hatlı ve gayriresmi yapısıyla "hazır template" hissi verir, akademinin lüks ağırlığını basitleştirir.
*   **Grand Hotel (7.0):** Restoran/pastane menüsü havası taşıyan bu tarz script fontlar markanın premium çizgisini aşağı çeker.

### Kullanılacak Skilller

```txt
UI UX Pro Max
Fontpair reference
Typography Director Agent
Composition Patterns
```

### Çıktı Dosyaları

```txt
docs/typography-system.md
design-system/typography.md
```

### Yapılacaklar

1. Mevcut typography scale’i çıkar.
2. Yeni scale oluştur:

```txt
Display XL: clamp(4.5rem, 12vw, 13rem)
Display L: clamp(3.5rem, 8vw, 9rem)
Display M: clamp(2.75rem, 6vw, 6rem)
Section Label: 0.75rem uppercase / tracking wide
Body Large: clamp(1.35rem, 2vw, 2.4rem)
Body: 1rem–1.125rem
Caption: 0.75rem–0.875rem
```

3. Hero’da en az bir **giant typography block** kur.
4. En az iki section’da başlıklar normal title gibi değil, sahne öğesi gibi davranmalı.
5. Handwriting accent sistemi kur:

```txt
Usage 1: Hero subtitle veya small human mark
Usage 2: Section transition note
Usage 3: CTA çevresinde küçük vurgu
```

6. Handwriting abartılmayacak; sadece “insan eli değmiş” hissi verecek.
7. Font dosyası rastgele eklenmeyecek. Eğer external font kullanılıyorsa Next font sistemi ve lisans kontrolü yapılacak.
8. Metin satırları responsive kırılmayacak.

### Component Önerileri

```txt
components/Server/EditorialSectionTitle.tsx
components/Client/EditorialTextReveal.tsx
components/Client/DynamicLineReveal.tsx
components/Client/HandwritingMark.tsx
```

### Kabul Kriteri

```txt
Hero typography eski hâlinden bariz farklı.
At least 2 sections use large editorial type as visual mass.
Manual hardcoded line breaks reduced or isolated.
Mobile line breaks visually safe.
```

---

## Phase 3 — Hero Silhouette Redesign

### Amaç

İlk viewport tamamen yeni bir sahne gibi hissettirmeli.

### Kullanılacak Skilller

```txt
UI UX Pro Max
GStack /design-shotgun
Motion
Lenis
React Best Practices
Hero Redesign Agent
```

### Hero Yeni Yapısı

Hero üç katmanlı olmalı:

```txt
Layer 1 — Editorial Typography
Devasa, ritimli, nefes alan başlık.

Layer 2 — Human / Handwriting Mark
Küçük, organik, kişisel vurgu.

Layer 3 — Visual / Motion Field
Görsel, meridyen çizgisi, ambient wash veya mask opening.
```

### Önerilen Hero Kompozisyonları

#### Option A — Split Editorial Hero

```txt
Sol: giant title block
Sağ: image / 3D / muted visual mass
Alt: CTA + trust line
Arka: subtle meridian line
```

#### Option B — Full-Bleed Cinematic Hero

```txt
Tam ekran görsel/ambient
Üzerinde dev typography
Scroll ile typography maskeden çıkar
CTA sakin ama net
```

#### Option C — Minimal Japanese Editorial

```txt
Çok boşluk
Asimetrik küçük görsel
Dev başlık ekranı keser
Handwriting not gibi yerleşir
```

### Önerilen Final

```txt
Option A + C hybrid
```

Yani:

- çok büyük tipografi,
- asimetrik yerleşim,
- sakin görsel kütle,
- küçük insan eli/handwriting dokunuşu,
- meridyen/nefes çizgisi.

### Motion

Hero opening:

```txt
0ms: background ambient state
150ms: small label appears
300ms: giant title line 1 mask reveal
430ms: title line 2 mask reveal
650ms: handwriting stroke draw
800ms: visual mass slow scale/clip open
1000ms: CTA enters
```

Reduced motion:

```txt
All content visible.
No staggered required reveal.
No motion-dependent comprehension.
```

### Kabul Kriteri

```txt
Hero screenshot must look like a different creative direction.
Hero has at least one signature moment.
CTA remains visible and usable.
Mobile hero is not a cropped desktop version.
```

---

## Phase 4 — Section Rhythm & Visual Mass Redesign

### Amaç

Section sırası aynı kalabilir ama her bölüm aynı grid/fade/reveal hissini vermemeli.

### Kullanılacak Skilller

```txt
UI UX Pro Max
Unsection reference
Godly / Minimal.gallery reference
Composition Patterns
```

### Yapılacaklar

Her section için görsel karakter tanımla.

Örnek rhythm:

```txt
Hero
  Full-screen / oversized typography / asymmetry

Introduction
  Image-led editorial block / giant paragraph / staggered reveal

Programs / Şifa Yolculuğu
  Pinned card / crossfade state / scroll-linked image mask

About / Method
  Narrow text column + huge empty field + handwritten note

3D Meridian / Anatomy
  Controlled dark stage / explanatory overlay / slow camera feel

Testimonials / Trust
  Quiet, minimal, human-centered layout

CTA
  High-contrast calm closure

Footer
  Temple-like editorial ending / not generic sitemap
```

### Görsel Kütle Kuralları

- Arka arkaya iki section aynı oranla gelmeyecek.
- Bir section full-bleed ise sonraki section daha dar ve nefesli olacak.
- Bir section çok tipografikse sonraki section görsel-led olabilir.
- Her section aynı background tonunda akmayacak; ambient geçiş olacak.
- Section headingler aynı büyüklükte olmayacak.

### Kabul Kriteri

```txt
At least 60% of major sections have visibly changed visual mass.
At least 3 sections have unique layout character.
No section feels like repeated template block.
```

---

## Phase 5 — Cinematic Section Transition System

### Amaç

Standart scroll reveal yerine sectionlar arasında karakterli geçişler kurmak.

### Kullanılacak Skilller

```txt
Motion Director Agent
Motion
Lenis
GSAP optional
Web Design Guidelines
```

### Transition Tipleri

#### 5.1 Ambient Morph

Arka plan tonu scroll progress ile değişir.

```txt
Dark olive → warm cream → muted copper → deep green
```

Kullanım:

```txt
Hero → Introduction
Introduction → Programs
Programs → CTA
```

#### 5.2 Screen Wash

Bir section gelirken yumuşak bir “wash layer” ekranı temizler.

```txt
Thin translucent veil slides through viewport.
```

Kullanım:

```txt
Major narrative breaks only.
```

#### 5.3 Panel Overlap

Yeni section eski section’ın üstüne yavaşça biner.

Kullanım:

```txt
Programs / journey section.
```

#### 5.4 Image Expansion

Görsel küçük bir frame’den full-bleed veya büyük kadraja açılır.

Kullanım:

```txt
Introduction image
Method image
```

#### 5.5 Meridian Draw Path

Scroll ile ince bir çizgi çizilir; nefes/enerji/meridyen metaforu taşır.

Kullanım:

```txt
Hero → Introduction
Programs transition
Footer closure
```

### Component Önerileri

```txt
components/Client/SectionTransition.tsx
components/Client/AmbientMorphLayer.tsx
components/Client/ScreenWash.tsx
components/Client/PanelOverlap.tsx
components/Client/MeridianDrawPath.tsx
```

### Kabul Kriteri

```txt
At least 3 non-generic section transitions implemented.
Transitions are scroll-linked or context-aware.
Reduced motion fallback exists.
No transition blocks readability.
No transition causes scroll jank.
```

---

## Phase 6 — Responsive-Safe Text Animation System

### Amaç

Mevcut masked text sistemi güzel ama manuel satır kırma riski taşıyor. Premium seviye için responsive-safe yapılmalı.

### Kullanılacak Skilller

```txt
Typography Director Agent
Motion
React Best Practices
Composition Patterns
Web Design Guidelines
```

### Mevcut Problem

Bazı metinler mobile/desktop array olarak manuel bölünüyor. Bu sistem kontrollü breakpointlerde çalışabilir ama ara çözünürlüklerde kırılma riski oluşturur.

### Yeni Sistem

```txt
DynamicLineReveal
EditorialTextReveal
WordMaskReveal
HandwritingMark
```

### Gereksinimler

- Metin doğal olarak wrap edebilmeli.
- Animasyon gerçek satırları veya kelime gruplarını hedeflemeli.
- Resize olduğunda bozulmamalı.
- Hydration mismatch üretmemeli.
- Reduced-motion’da plain text göstermeli.
- SSR güvenli olmalı.

### Kabul Kriteri

```txt
No overlapping masked lines at intermediate widths.
No hydration warnings.
Hero and section text reveals feel editorial.
At least one handwriting/stroke accent exists.
```

---

## Phase 7 — Program Card / ClipImageCard Fluidity

### Amaç

Mevcut ClipImageCard iyi bir temel ama state geçişleri giriş ağırlıklı. Çıkış ve crossfade akışı eklenmeli.

### Kullanılacak Skilller

```txt
Motion
React Best Practices
Composition Patterns
Code Review
```

### Problem

- Yeni kart içeriği maskeli giriyor.
- Eski kart içeriği yeterince zarif çıkmıyor.
- State değişimi sert hissedebiliyor.
- Scroll progress threshold değişimleri daha sinematik olabilir.

### Yapılacaklar

1. `currentState` yanında `previousState` veya motion key strategy kullan.
2. `AnimatePresence` / equivalent Motion pattern ile exit ekle.
3. Title, description, index ve image için ayrı stagger tanımla.
4. Exit animasyonu kısa ve zarif olsun.
5. Görsel geçişte crossfade + clip continuation hissi ekle.
6. Threshold davranışını scroll progress snapping gibi hissettirme; fluid geçiş tercih et.

### Önerilen Motion

```txt
enter:
  opacity: 1
  y: 0
  clipPath: inset(0% 0% 0% 0%)
  duration: 0.65

exit:
  opacity: 0
  y: -18px
  clipPath: inset(0% 0% 100% 0%)
  duration: 0.35

image:
  scale: 1.03 → 1
  opacity crossfade
```

### Kabul Kriteri

```txt
No abrupt disappearing content.
State transition feels fluid.
Scroll-driven card section becomes a signature moment, not just a content carousel.
```

---

## Phase 8 — Button / CTA Motion Standard

### Amaç

CTA’lar premium, hızlı ve fiziksel hissettirmeli.

### Kullanılacak Skilller

```txt
Motion
UI UX Pro Max
Web Design Guidelines
Code Review
```

### Mevcut Problem

`BorderedButton` SVG içinde:

- `preserveAspectRatio="none"` var.
- `vectorEffect="non-scaling-stroke"` yok.
- Hover path animation delay `0.3s` olduğu için tepki geç hissedebilir.

### Yapılacaklar

1. SVG pathlere `vectorEffect="non-scaling-stroke"` ekle.
2. Hover delay’i kaldır veya max `0.05–0.1s` yap.
3. Duration’ı `0.45–0.6s` bandına çek.
4. Button hover’da text, background, border ve magnetic davranış aynı motion grammar’a bağlansın.
5. Focus-visible state hover kadar özenli olsun.
6. Reduced motion’da border animation yerine immediate state değişsin.

### Kabul Kriteri

```txt
CTA hover response feels immediate.
SVG stroke does not deform.
Keyboard focus state premium and visible.
CTA hierarchy clearer than before.
```

---

## Phase 9 — Meridian / Breath Signature Layer

### Amaç

Yaşama Sanatı’nı generic wellness template’ten çıkaracak özgün imza: nefes, meridyen, enerji çizgisi.

### Kullanılacak Skilller

```txt
UI UX Pro Max
Motion Director Agent
Motion
Three/R3F optional
ShaderGradient inspiration
```

### Signature Layer Seçenekleri

#### Option A — Scroll Drawn Meridian Line

İnce bakır/krem çizgi scroll ile belirir, sectionları bağlar.

#### Option B — Breath Pulse Ambient

Hero ve CTA’da çok hafif scale/opacity pulse.

#### Option C — 3D Anatomy Echo

Mevcut 3D sistemin görsel dili hero/section arası çizgiyle bağlanır.

### Önerilen Final

```txt
A + B
```

Yani:

- scroll çizilen meridyen path,
- çok hafif nefes/pulse ambience,
- Three.js sadece mevcut özel bölümlerde optimize şekilde.

### Kabul Kriteri

```txt
At least one memorable site-specific visual motif exists.
Motif is not generic AI glow.
Motif supports brand story.
Motion remains subtle and premium.
```

---

## Phase 10 — Accessibility & Reduced Motion Hardening

### Amaç

Yeni agresif motion ve visual system erişilebilirliği bozmasın.

### Kullanılacak Skilller

```txt
Web Design Guidelines
Accessibility Agent
GStack /qa-only
```

### Kontroller

```txt
prefers-reduced-motion
keyboard navigation
focus-visible
contrast
ARIA labels
heading order
touch targets
scroll trap
pinned section fallback
screen reader content order
```

### Reduced Motion Kuralları

- Hero content immediate visible.
- Section transitions sade fade veya none.
- Meridian draw static line veya hidden.
- Card transitions instant/crossfade minimal.
- Lenis gerekirse disable edilebilir.

### Kabul Kriteri

```txt
Reduced motion mode usable.
No content hidden behind motion.
No keyboard trap.
No focus loss.
Contrast remains compliant.
```

---

## Phase 11 — Performance & Build Hardening

### Amaç

Silüet redesign performans regressions yaratmasın.

### Kullanılacak Skilller

```txt
React Best Practices
Performance Agent
GStack /benchmark
Code Review
```

### Kontroller

```txt
npm run build
npm run lint if available
bundle growth
image sizes
lazy loading
3D loading strategy
client component count
scroll event overhead
motion layout thrashing
console errors
```

### Teknik Kurallar

- Scroll progress ile state update minimum olmalı.
- Heavy visual layers lazy/dynamic import edilebilir.
- Three/R3F görünür olmayan alanda çalışmamalı.
- Large images `next/image` ile optimize edilmeli.
- Motion componentleri gereksiz rerender üretmemeli.
- CSS transform/opacity ağırlıklı animasyon tercih edilmeli.

### Kabul Kriteri

```txt
Build passes.
No hydration errors.
No major bundle spike without documented decision.
No obvious mobile scroll jank.
Benchmark report written.
```

---

## Phase 12 — Full QA, Visual Regression & Final Score

### Amaç

Bu sprintin gerçekten görünür dönüşüm yarattığını kanıtlamak.

### Kullanılacak Skilller

```txt
GStack /design-review
GStack /review
GStack /qa-only
GStack /benchmark
Impeccable
Taste Skill
```

### Test Viewportları

```txt
390x844 mobile
768x1024 tablet
1440x900 desktop
1920x1080 wide desktop
```

### Skorlama

Her kategori 0–10 puanlanacak:

```txt
Hero silhouette
Typography drama
Section transition quality
Signature motion
Editorial layout rhythm
Card state fluidity
Button/CTA tactility
Mobile visual impact
Accessibility
Performance
Brand fit
Awwwards memorability
```

### Hedef Skor

```txt
Average: 9.0+
Hero silhouette: 9.2+
Typography drama: 9.0+
Section transition: 8.8+
Signature motion: 9.0+
Accessibility: 9.0+
Performance: 8.7+
```

### Kabul Kriteri

```txt
Before/after difference is obvious.
At least 3 signature visual/motion moments exist.
At least 60% of major sections changed visually.
No critical QA issue remains.
Docs updated.
```

---

# 7. Dosya Bazlı Müdahale Haritası

Bu dosya adları repo yapısına göre kontrol edilerek uygulanacak. Dosya yoksa en yakın eşdeğer bulunacak.

## 7.1 Hero

```txt
sections/Hero/*
components/Client/HeroOpeningMotion.tsx
components/Client/HandwritingMark.tsx
components/Client/MeridianDrawPath.tsx
```

**İş:** Silüet redesign, dev typography, opening motion, CTA hierarchy.

## 7.2 Introduction

```txt
sections/Introduction/Server.tsx
components/Client/ResponsiveMaskTextVariant.tsx
components/Client/DynamicLineReveal.tsx
```

**İş:** Manuel line break riskini azalt, editorial text reveal ekle, image-led composition kur.

## 7.3 Program / Clip Cards

```txt
components/Client/ClipImageCard.tsx
components/Client/ClipImageContainer.tsx
components/Client/MaskTextClient.tsx
```

**İş:** Exit state, crossfade, fluid scroll state, stagger tuning.

## 7.4 Buttons / CTA

```txt
components/Server/BorderedButton.tsx
components/Server/SignatureCTA.tsx
```

**İş:** vectorEffect, hover delay, focus-visible, CTA consistency.

## 7.5 Section Transition System

```txt
components/Client/SectionTransition.tsx
components/Client/AmbientMorphLayer.tsx
components/Client/ScreenWash.tsx
components/Client/ScrollStage.tsx
```

**İş:** section-to-section cinematic layer.

## 7.6 Design Tokens

```txt
utils/motion/tokens.ts
utils/motion/variants.ts
utils/design/typography.ts
utils/design/colors.ts
```

**İş:** Easing, durations, spacing, colors ve typography tek kaynak.

---

# 8. Motion Token Standardı

Bu sprintte tüm animasyonlar aşağıdaki tokenlara bağlanacak.

```ts
export const motionTokens = {
  ease: {
    editorial: [0.24, 0.43, 0.15, 0.97],
    softOut: [0.16, 1, 0.3, 1],
    precise: [0.22, 1, 0.36, 1],
  },
  duration: {
    hover: 0.22,
    buttonStroke: 0.52,
    textLine: 0.72,
    section: 0.9,
    hero: 1.2,
  },
  stagger: {
    word: 0.025,
    line: 0.08,
    section: 0.12,
  },
};
```

**Kural:** Aynı tip animasyon farklı componentlerde başka duration/easing kullanmayacak.

---

# 9. Prompt — Claude Code’a Verilecek Uygulama Talimatı

Aşağıdaki prompt bu dosya ile birlikte Claude Code’a verilebilir.

```txt
Read docs/silhouette-implementation.md fully.

This is not a normal polish pass.
The previous pass improved invisible quality but did not change the visible silhouette enough.
Your task is to execute a visible Awwwards-level silhouette redesign pass for Yaşama Sanatı.

Primary goal:
Make the site look meaningfully different in screenshots and scroll recordings while preserving the brand identity and core content order.

Use these roles:
- Creative Director
- Typography Director
- Motion Director
- Hero Redesign Agent
- Section Transition Agent
- Component Architect
- Accessibility QA
- Performance QA

Use these skills/workflows:
- UI UX Pro Max
- Planning with Files
- Superpowers
- GStack
- Web Design Guidelines
- React Best Practices
- Composition Patterns
- Code Review
- Taste/Impeccable final polish

Strict rules:
1. Do not only do invisible polish.
2. Do not stop until the visual silhouette changes.
3. Do not add random dependencies.
4. Use existing Motion + Lenis + Three stack first.
5. Add GSAP only if a timeline/section transition truly requires it.
6. Avoid Anime.js, Barba.js and Spline.
7. Keep reduced-motion support.
8. Keep build passing.
9. Document every decision.
10. Update docs/progress.md, docs/issues.md and docs/decisions.md after each phase.

Before implementing:
- Score the current site on hero silhouette, typography drama, section transitions, signature motion and Awwwards memorability.
- Explain why the current version still feels too static.
- Propose 3 creative routes.
- Select one route and justify it.

Then implement phase by phase:
Phase 0: Baseline and scope freeze
Phase 1: Creative direction reset
Phase 2: Typography system V2
Phase 3: Hero silhouette redesign
Phase 4: Section rhythm redesign
Phase 5: Cinematic section transition system
Phase 6: Responsive-safe text animation system
Phase 7: ClipImageCard crossfade/out-state
Phase 8: Button/CTA motion standard
Phase 9: Meridian/breath signature layer
Phase 10: Accessibility/reduced-motion hardening
Phase 11: Performance/build hardening
Phase 12: QA, benchmark and final score

Acceptance criteria:
- Hero screenshot must look meaningfully different.
- At least 3 signature visual/motion moments must exist.
- At least 60% of major sections must have changed visual mass.
- At least 3 section transitions must be non-generic.
- Typography must feel editorial and premium, not template-like.
- Reduced motion must work.
- Build must pass.

Stop after each major phase and summarize:
- files changed
- visible impact
- current score
- remaining risks
- next phase
```

---

# 10. Claude Code İçin Kısa Emergency Prompt

Eğer Claude yine “çok çalıştım ama görünür fark az” noktasına giderse şu yazılacak:

```txt
Stop.
You are drifting into invisible polish again.

List only the changes that are visible in a screenshot.
If fewer than 5 major visible changes exist, continue with silhouette redesign.

Prioritize:
1. Hero composition
2. Giant editorial typography
3. Section transition moments
4. Handwriting/human mark accents
5. Card crossfade/out-state
6. Meridian/breath signature motif

Do not continue accessibility/performance polish until visible transformation is achieved.
```

---

# 11. Final Definition of Done

Bu sprint ancak aşağıdaki maddeler sağlanırsa tamamdır.

```txt
[ ] Hero above-the-fold visibly redesigned.
[ ] Typography scale visibly more editorial/aggressive.
[ ] At least 3 section transitions are custom/non-generic.
[ ] At least 1 handwriting/human mark accent exists.
[ ] At least 1 meridian/breath signature visual motif exists.
[ ] ClipImageCard has fluid exit/crossfade behavior.
[ ] Button SVG stroke deformation fixed.
[ ] Hover delay removed or corrected.
[ ] Motion tokens centralized.
[ ] Reduced motion fallback implemented.
[ ] Mobile hero and section transitions manually checked.
[ ] Build passes.
[ ] QA report written.
[ ] Benchmark report written.
[ ] docs/progress.md updated.
[ ] docs/decisions.md updated.
[ ] Final score written.
```

---

# 12. Final Hüküm

Bu planın özü şudur:

```txt
İlk tur = kaliteyi yükseltti.
İkinci tur = algıyı değiştirecek.
```

Yaşama Sanatı için Awwwards bandına yaklaşmanın yolu daha fazla küçük düzeltme değil; **daha güçlü bir sahneleme sistemi** kurmaktır:

```txt
Hero as a cinematic opening
Typography as visual architecture
Sections as scenes
Transitions as breath
Meridian line as signature motif
Motion as narrative, not decoration
```

Bu sprintin amacı siteyi “iyi yapılmış web sitesi”nden çıkarıp **hatırlanabilir bir digital wellness experience** hâline getirmektir.
