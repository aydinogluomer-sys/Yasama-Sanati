# Yaşama Sanatı — Awwwards Implementation Plan

> **Revizyon: 2026-08-21.** Bu sürümde plandaki her iddia depo üzerinde doğrulandı. Doğrulananlar
> kanıtla (dosya:satır) güçlendirildi, tamamlanmış olanlar TAMAMLANDI diye işaretlendi, eksik olan
> üç canlı sorun eklendi, ve iki iç çelişki giderildi: (a) skor tablosu depo denetimiyle
> çelişiyordu, (b) sağlık iddiaları P0 olarak işaretliyken 7. sprinte konmuştu.

**Repository:** `aydinogluomer-sys/Yasama-Sanati`  
**Target branch:** `main`  
**Primary Goal:** Yaşama Sanatı’nı “Awwwards-inspired premium site” seviyesinden, özgün art direction, güçlü içerik kanıtı, production-grade performans ve belirgin marka authorship’i olan submission-ready bir deneyime taşımak.

---

## 0. Implementation Principles

Bu dosya, yapılacak işleri yalnızca “görsel polish” olarak değil; **Design, Usability, Creativity, Content ve Development Quality** birlikte düşünülerek önceliklendirir.

### Temel ilkeler

- Mevcut iyi çalışan section sırası korunur; ancak gerektiğinde section içi dramaturji değiştirilebilir.
- Yeni efekt eklemek varsayılan çözüm değildir.
- Öncelik sırası: **stability → authorship → art direction → content/proof → jury polish**.
- Mobile, desktop’ın küçültülmüş sürümü olarak ele alınmaz.
- Motion, anlam taşımayan dekoratif hareket değil; anlatı ve etkileşim aracı olmalıdır.
- Accessibility ve reduced-motion hiçbir yaratıcı karar için feda edilmez.
- Sağlık/şifa iddiaları content design kapsamında yeniden değerlendirilir.
- Her sprint sonunda `build + responsive QA + a11y + performance sanity check` yapılır.
- “Done” sayılmayan hiçbir madde yalnızca dokümantasyonda tamamlanmış kabul edilmez.

---

# 1. Current Baseline

Proje halihazırda aşağıdaki güçlü temellere sahip:

- Next.js App Router + React
- Motion tabanlı animasyon sistemi
- Lenis smooth scrolling
- React Three Fiber / Three.js
- Responsive desktop/mobile hero state’leri
- Scroll-linked meridyen motifi
- Section seam / tonal transition sistemi
- Editorial serif + grotesk + mono tipografi sistemi
- Dinamik OG image
- Sitemap / robots / custom 404
- Supabase form altyapısı
- Blog, programlar, eğitmenler, KVKK ve alt sayfalar
- Reduced-motion ve temel keyboard accessibility
- Responsive QA helper’ları
- Internal Awwwards audit / scoring sistemi

### Mevcut değerlendirme — TEK KAYNAK

> Bu dosya önceden Design 8.4 / Usability 8.1 / Creativity 7.5 / Content 6.9 ≈ 8.0 yazıyordu.
> Depodaki `docs/awwwards-baseline-audit.md` ise resmî ağırlıkla ölçülmüş ve kanıta bağlanmış
> (`awwwards-loop/reports/phase-test/*`, prod build, 1440/768/390) **farklı** bir tablo veriyor.
> §11 zaten "skor belgeleri farklı seviyeler söylüyor" diye bunu sorun olarak işaretliyordu —
> üçüncü bir sayı eklemek yerine **depo denetimi kanonik kabul edildi.**

| Alan | Ağırlık | Puan |
|---|---:|---:|
| Design | %40 | 9.2 |
| Usability | %30 | 9.1 |
| Creativity | %20 | 9.0 |
| Content | %10 | 8.7 |
| **Ağırlıklı** | | **9.08** |

Bant: HM ≥ 6.5 · SOTD ≥ 9.0 · tercih edilen ≥ 9.23.

**Kural:** başka skor tablosu üretilmez. Güncelleme yalnız `docs/awwwards-baseline-audit.md`
içinde yapılır ve buraya yansıtılır.

Aynı denetimin kendi tespiti, öncelik sırasını belirleyen cümledir:

> *"Biggest Weakness: Photography is competent stock-grade, not art-directed — caps the Design ceiling."*
> *"Biggest Opportunity: Custom art-directed imagery → Design+Creativity 9.4/9.3."*

### Ana darboğazlar

1. Template / Elementis lineage tamamen temizlenmemiş.
2. Final art-directed photography sistemi henüz tam kilitlenmemiş.
3. Mobile production performance yeterince kanıtlanmamış.
4. İçerik / accreditation / trust katmanı tasarım seviyesinin gerisinde.
5. Dokümantasyon ile runtime arasında source-of-truth drift var.
6. Production CI / quality gate eksik.
7. Sağlık ve şifa iddiaları content credibility riski taşıyor. **(doğrulandı — §9.1)**
8. Aynı program kataloğu landing page'de **iki kez** sunuluyor: Şifa Yolculuğu (5,0 ekran) ve
   Çalışma Alanları (3,47 ekran) — birlikte sayfanın **%38'i**. (§8B)
9. **İki dönüşüm yüzeyi** aynı anda ayakta: ana sayfadaki form geri getirildi ama sitedeki
   hiçbir CTA ona gitmiyor; hepsi `/on-gorusme`'ye yönleniyor. (§8B)
10. `/on-gorusme` — sitenin birincil dönüşüm sayfası — `app/sitemap.ts` içinde **yok**. (§8B)

---

# 2. Priority Model

## P0 — Submission Blocker

Aşağıdakiler tamamlanmadan final Awwwards polish’e geçilmemeli.

- [x] Next.js güvenlik upgrade **15.2.2 → 15.5.23 — critical açıklar kapandı (D064)**
- [ ] Full production regression
- [x] CI pipeline **TAMAMLANDI — quality-gate.yml: typecheck/lint/build/a11y (D060)**
- [x] Form backend hardening **TAMAMLANDI — rate limit, mükerrer koruma, normalizasyon (D053)**
- [ ] Supabase reliability
- [ ] Production RUM
- [ ] Mobile performance remediation
- [x] Final accessibility audit **TAMAMLANDI — axe 0 bulgu, 11 rota × 2 viewport (D059)**
- [x] İstanbul / İzmir ve diğer marka tutarsızlıkları **TAMAMLANDI (D056, D057)**
- [x] Sağlık iddiaları content audit **TAMAMLANDI 2026-08-21 — 70 metin (D052)**
- [x] Documentation source-of-truth cleanup **TAMAMLANDI — 10 dosya arşive, tek aktif plan (D051)**
- [x] Dönüşüm yüzeyi kararı **TAMAMLANDI — ana sayfada kaydır, diğer rotalarda özel sayfa (D054)**
- [x] `/on-gorusme` sitemap'e eklensin **TAMAMLANDI (D054)**

---

## P1 — Awwwards Score Movers

Gerçek Awwwards skorunu yükseltecek yüksek etkili işler:

- [ ] Final Aegean / Anatolian art direction
- [x] Final hero media **TAMAMLANDI 2026-08-20 (D046/D047)**
- [ ] Program photography bible
- [ ] Story / community imagery
- [x] Elementis / derivative lineage cleanup **TAMAMLANDI (D057)**
- [ ] Signature interaction v2
- [x] Hero choreography simplification **TAMAMLANDI — marquee + kicker kaldırıldı (D047, D056)**
- [x] Long-scroll journey retiming **TAMAMLANDI — 500vh → 360vh + çıkış yolu (D058)**
- [ ] Mobile-specific journey
- [ ] Accreditation proof system
- [ ] Instructor proof system
- [ ] 3D meridyen deneyimini informational object seviyesine çıkarma

---

## P2 — Production Polish

- [x] Alt text audit **TAMAMLANDI — axe temiz**
- [x] Heading architecture **TAMAMLANDI — 7 → 10 h1/h2, tek h1**
- [x] Per-route metadata **TAMAMLANDI — 13 rota (D061)**
- [x] Structured data **TAMAMLANDI — Organization/Course/FAQPage (D061)**
- [x] Source image optimization **TAMAMLANDI — public/ 11 MB (D062)**
- [ ] Adaptive video
- [x] Dead dependency removal **TAMAMLANDI — react-lenis (D062)**
- [ ] Dead asset cleanup
- [x] Repo/component naming cleanup **TAMAMLANDI (D051, D057)**
- [ ] Bundle budget
- [ ] Broken-link validation
- [x] Console / hydration cleanup **TAMAMLANDI — konsol temiz, hydration uyarısı yok**

---

## P3 — Jury / Submission Polish

- [ ] Cross-browser QA
- [x] Multi-viewport QA **TAMAMLANDI — qa/viewports.mjs**
- [ ] Slow network QA
- [ ] Save-Data behavior
- [x] Reduced-motion capture **— reduced-motion modunda ölçüm ve yakalama yapıldı**
- [ ] Submission screenshots
- [ ] OG/social previews
- [ ] Final motion timing pass
- [ ] Final typography / spacing pass
- [ ] Final copy polish

---

# 3. Sprint 1 — Production Integrity

## Goal

“Güzel ama kırılabilir” deneyimi, production-safe bir foundation’a dönüştürmek.

---

## 3.1 Next.js Upgrade

### Tasks

- [x] Next.js maintenance-safe sürüme yükseltildi — 15.5.23 **(D064)**
- [ ] React peer dependency uyumluluğunu doğrula.
- [ ] `npm install` sonrası lockfile diff kontrol et.
- [x] `next build` ✓ exit 0, 27 sayfa
- [ ] Server Actions regression testi yap.
- [ ] Dynamic OG generation test et.
- [ ] Route generation test et.
- [ ] Three.js hydration test et.
- [ ] Motion / Lenis compatibility test et.
- [x] Production smoke test ✓ — 4 rota 200, tam sayfa temiz

### Acceptance Criteria

- [x] Build error = 0 ✓
- [x] Type error = 0 ✓
- [x] Hydration warning = 0 **doğrulandı**
- [x] Console error = 0 **doğrulandı**
- [ ] Server Action regression = 0

---

## 3.2 CI Pipeline

### Required workflow

```text
install
↓
typecheck
↓
lint
↓
build
↓
Playwright smoke
↓
a11y
↓
Lighthouse CI
↓
bundle budget
```

### Tasks

- [x] `typecheck` script **TAMAMLANDI**
- [ ] `test:e2e` script ekle.
- [x] `test:a11y` script **TAMAMLANDI**
- [ ] `test:links` script ekle.
- [ ] Lighthouse CI ekle.
- [ ] Bundle size budget tanımla.
- [x] GitHub Actions quality gate **TAMAMLANDI — quality-gate.yml**
- [ ] PR build zorunlu hale getir.
- [ ] Dependency review ekle.
- [ ] Dependabot veya Renovate etkinleştir.

### Acceptance Criteria

Her PR:

- [ ] Typecheck PASS
- [ ] Lint PASS
- [ ] Build PASS
- [ ] Smoke tests PASS
- [ ] A11y critical/serious = 0
- [ ] Bundle budget PASS

---

## 3.3 Form / Supabase Hardening

### Tasks

- [x] Server-side schema validation **zaten vardı + bültene eklendi**
- [x] Email normalize **TAMAMLANDI**
- [x] Telefon normalize **TAMAMLANDI (D053)**
- [x] Maksimum field length **zaten vardı + bültene eklendi**
- [x] Honeypot **zaten vardı, doğrulandı**
- [x] Rate limiting **TAMAMLANDI — bellek içi, sınırı D053'te yazılı**
- [x] Duplicate submission kontrolü **TAMAMLANDI (D053)**
- [x] DB error leakage yok **doğrulandı**
- [ ] RLS policy audit et.
- [ ] Form success/failure telemetry ekle.
- [ ] Supabase availability monitor ekle.
- [ ] Free-tier pause riskini production’dan kaldır veya kalıcı çözüm üret.

### Acceptance Criteria

- [ ] Spam submission sınırlanıyor.
- [ ] Duplicate submission kontrol altında.
- [ ] Backend error kullanıcıya ham haliyle gösterilmiyor.
- [ ] Form başarısızlığı monitor ediliyor.
- [ ] Newsletter ve ön kayıt smoke test ile doğrulanıyor.

---

# 4. Sprint 2 — Mobile Performance

## Goal

Creative experience’i koruyarak mobil gerçek kullanıcı performansını production-grade seviyeye çekmek.

---

## 4.1 Real User Monitoring

### Tasks

- [ ] RUM ekle.
- [ ] LCP ölç.
- [ ] INP ölç.
- [ ] CLS ölç.
- [ ] Route-level Web Vitals raporu tut.
- [ ] Mobile / desktop segmentasyonu yap.
- [ ] Connection type segmentasyonu yap.

### Performance Targets

- [ ] p75 LCP < 2.5 s — **lab: masaüstü 2328ms ✓, mobil 4× 1668ms ✓. p75 alan verisi RUM gerektirir**
- [ ] p75 INP < 200 ms
- [x] CLS < 0.10 **— lab: 0,043 / 0,020 (D065)**
- [ ] Desktop Lighthouse ≥ 90
- [ ] Mobile Lighthouse tercihen ≥ 80

---

## 4.2 Video Strategy — KONUSUZ KALDI (2026-08-22)

> Hero videoları D046/D047 ile kaldırıldı ve yerine still + koddan gelen hareket geldi;
> tanıtım filmi de silindi. Doğrulandı: kodda `<video>` yok, `public/` altında `.mp4`/`.webm`
> yok, `preload` direktifi yok. Aşağıdaki maddeler bu yüzden uygulanamaz durumda — gelecekte
> tekrar video eklenirse yeniden açılmalı.

### Tasks

- [ ] Hero desktop için adaptive encode.
- [ ] Hero mobile için ayrı encode.
- [ ] WebM / AV1 veya modern codec varyantı üret.
- [ ] H.264 fallback koru.
- [ ] Poster-first render.
- [ ] `Save-Data` altında video autoplay kapat.
- [ ] Slow connection altında poster fallback.
- [ ] Intro film için adaptive quality.
- [x] Gereksiz preload kaldır **— preload direktifi kalmadı**
- [x] Video network priority audit **— video yok**

### Acceptance Criteria

- [x] İlk viewport video yüzünden LCP bozulmuyor **— video yok**
- [ ] Mobile düşük bant genişliğinde poster-first çalışıyor.
- [x] Reduced-motion **— video yok; still'in scale hareketi motion-reduce'ta duruyor**

---

## 4.3 Main Thread / Hydration

### Tasks

- [x] Client component graph **çıkarıldı — profil qa/mainthread.mjs**
- [ ] Gereksiz `"use client"` sınırlarını azalt.
- [ ] Custom cursor mobile bundle’dan çıkar.
- [x] Three.js lazy load **doğrulandı — ana sayfada canvas 0 (D065)**
- [x] WebGL erken mount edilmiyor **— ana sayfada canvas 0**
- [x] Motion long task profiling **TAMAMLANDI — masaüstü >200ms: 0 (D065)**
- [ ] Main-thread >200 ms long task’ları azalt.
- [ ] Bundle analyzer çıktısı üret.

---

# 5. Sprint 3 — Art Direction Lock

## Goal

Tüm sitenin tek bir görsel dünyaya ait olduğu hissini kesinleştirmek.

---

## 5.1 Photography Bible

### Visual Language

**Geography**
- Ege
- Anadolu
- İzmir çevresi
- taş mimari
- zeytin
- terracotta
- keten
- seramik
- ahşap

**Lighting**
- doğal
- low-contrast cinematic
- golden hour
- soft morning light

**Materiality**
- doğal taş
- kağıt
- kumaş
- pirinç
- seramik

### Forbidden

- [ ] Pine forest retreat
- [ ] Misty mountain lodge
- [ ] Bali / tropical spa
- [ ] Literal chakra rainbow
- [ ] Neon energy glow
- [ ] Generic yoga pose
- [ ] Stock wellness smile
- [ ] Excessive mystical particles
- [ ] AI-looking hands/faces

---

## 5.2 Hero Media — TAMAMLANDI (2026-08-20)

Elementis footage'ı (`elementismp4.mp4`, `elementis-mmp4.mp4`, `elementis-fullmp4.mp4`,
posterler) kaldırıldı; yerine Ege karesi geldi. Sinematik hareket artık videodan değil koddan:
varışta 28 sn tek seferlik `scale` oturması, 24 dilimli scroll maskesi, %25 parallax korundu.

- [x] Final hero poster üret/seç → `public/Hero/hero-desktop.jpg` (2560×1434, 498 KB)
- [x] Final mobile hero → `public/Hero/hero-mobile.jpg` (927×1648, 232 KB)
- [x] Ege/Anadolu art direction ile eşleştir
- [x] Text readability test et → ölçüldü; kicker 3,5:1'de kaldığı için **kaldırıldı**,
      scrim iki katmana ayrıldı (D047). Mobilde taban altında öğe kalmadı.
- [x] 390 / 1440 test edildi
- [ ] 768 / 1920 testi hâlâ açık
- [ ] Tanıtım filmi: **kaldırıldı** (D046). Yeniden çekilirse **altyazı + transkript ile** ship edilir.

### Acceptance Criteria

Hero 5 saniyede:

1. markanın coğrafyasını,
2. premium editorial tonunu,
3. “Beden, zihin ve enerji, tek bütün” fikrini

tek bir sahnede anlatmalı.

---

## 5.3 Program Visual Set

Her disiplin için ayrı ama aynı fotoğraf serisine ait görünen görsel.

> **Durum (2026-08-21).** Sitede **iki fotoğraf dili** olduğu ölçülerek tespit edildi:
> Ege taşı (Introduction, Wellness, Form, Hero, Hikâye, menü seti) ve ılıman/ahşap
> (ImageContainer, group) — çam ormanı god-ray'i, yağmurlu ahşap pencere, İskandinav retreat.
> Denetimin "stock-grade photography" tespitinin kesin hâli budur.
>
> Üç bağlam **ölçek olarak ayrışmalı**, yoksa aynı disiplinin üç kopyası olur:
> menü 5:8 yakın · `group/` 4:5 orta plan · `ImageContainer/` 16:9 geniş.
> Promptlar `docs/midjourney-prompts.md` bölüm 4 / 6 / 8'de.

| Set | Durum |
|---|---|
| Menü hover (12, 5:8) | **TAMAMLANDI** 2026-08-21 — `on-gorusme` geçici |
| `ImageContainer/` (5, 16:9) | promptlar hazır, üretim bekliyor |
| `group/` (6 → **3**, 4:5) | §8B.1 kararına bağlı — üç format olursa 3 kare yeter |

- [x] Menü seti (12 kare, Ege dili, ayrı ayrı — çift kullanım bitti)
- [ ] Nefes · Meridyen Terapi · Reiki · Hipnoterapi · Mucizeler Kursu (ImageContainer, 16:9)
- [ ] Format görselleri (birebir / küçük grup / sertifikalı eğitim) — §8B.1 sonrası

### Acceptance Criteria

- [ ] Aynı lens hissi
- [ ] Aynı grain
- [ ] Aynı contrast curve
- [ ] Aynı palette
- [ ] AI artifact yok
- [ ] Her görsel ilgili disipline gerçekten bağlanıyor

---

# 6. Sprint 4 — Authorship / Originality

## Goal

Projeyi referans site DNA’sından tamamen ayırmak.

---

## 6.1 Elementis Lineage Cleanup

### Tasks

- [x] `elementis-clone` → `yasama-sanati` **(D057)**
- [x] `package-lock.json` güncellendi **(D057)**
- [x] `ElementisStory` → `AkademiHikayesi` **(D057)**
- [x] asset adları temizlendi — `public/akademi-hikayesi`, `public/Hero/hero-*` **(D057)**
- [ ] Template-era component isimlerini audit et.
- [ ] Deprecated / unused component’leri kaldır.
- [x] String audit yapıldı — kodda yalnız açıklama yorumu kaldı **(D057)**
- [ ] Eski clone/reference isimlerini arşiv veya docs dışında temizle.

### Acceptance Criteria

Runtime ve source structure Yaşama Sanatı markasına ait görünmeli.

---

## 6.2 Signature Interaction

### Current signature system

- meridyen çizgisi
- breath cue
- handwriting mark
- section seams

### Next step

Bu motiflerden **birini ana marka interaction’ı** haline getir.

### Preferred direction

**Meridian / Breath Navigation Grammar**

Örnek:

- section geçişlerinde meridyen node değişimi,
- scroll progress ile çizginin anatomik/narrative davranışı,
- program hover’larında node activation,
- footer’da çizginin sonlanması,
- 3D meridyen sahnesine doğal geçiş.

### Tasks

- [ ] Signature interaction storyboard.
- [ ] Desktop behavior.
- [ ] Mobile behavior.
- [ ] Reduced-motion behavior.
- [ ] Keyboard behavior.
- [ ] Performance budget.

### Acceptance Criteria

Interaction çıkarıldığında marka deneyiminden anlamlı bir şey eksik hissedilmeli.

---

# 7. Sprint 5 — Hero Simplification

## Goal

Hero’da “çok fikir” yerine “tek dominant fikir” oluşturmak.

### Current competing layers

- video
- giant serif headline
- outline “ŞİFA”
- marquee
- handwriting
- breath ring
- meridian
- cursor
- CTA cascade

### Tasks

- [ ] Outline “ŞİFA” A/B test.
- [x] Marquee kaldırıldı — 2,86:1 + paragrafla birebir tekrar **(D056)**
- [ ] Breath ring + meridyen tekrarını değerlendir.
- [ ] Cursor’ı yalnız gerekli alanda kullan.
- [ ] CTA hierarchy sadeleştir.
- [ ] Opening motion timeline kısalt.
- [ ] Hero → Introduction transition tek bir physical gesture ile bağlanmalı.

### Acceptance Criteria

Hero’da maksimum:

1. **media**
2. **statement**
3. **signature interaction**

dominant olarak algılanmalı.

---

# 8. Sprint 6 — Long Scroll Journey Rework

## Goal

“Şifa Yolculuğu” deneyimini yorucu olmadan sinematik tutmak.

### Current issue

Pinned journey yaklaşık `500vh`.

### Desktop Tasks

- [x] 500vh → **360vh** TAMAMLANDI, 5 kartın döngüsü doğrulandı **(D058)**
- [ ] State transition interval’larını sıklaştır.
- [ ] Dwell time ayarla.
- [ ] Card/image sync doğrula.
- [ ] Exit choreography iyileştir.
- [x] Skip affordance eklendi — klavyeyle erişilebilir "Bölümü geç" **(D058)**

### Mobile Tasks

Desktop mekanizmasını aynen taşıma.

Alternatifler:

- [ ] swipe chapters
- [ ] snap cards
- [ ] stacked editorial chapters
- [ ] shorter sticky sequence

### Reduced Motion

- [x] Normal document flow (reduced-motion) — zaten mevcuttu, doğrulandı
- [x] Pinned scroll yok (reduced-motion) — doğrulandı
- [ ] Tüm içerik erişilebilir

### Acceptance Criteria

- [ ] Scroll fatigue hissi yok.
- [ ] Program keşfi gecikmiyor.
- [ ] Mobile kullanıcı aynı bilgiye daha hızlı ulaşıyor.

---

# 8B. Sprint 6B — Bilgi Mimarisi ve Dönüşüm Yüzeyi

## Goal

Aynı içeriği iki kez sunmayı bitirmek ve tek bir dönüşüm yolu bırakmak.

> Bu bölüm plana 2026-08-21'de eklendi. Üç sorun da ölçülerek doğrulandı ve hiçbiri
> orijinal planda yer almıyordu. §23'ün kendi stop condition'ı
> ("aynı fikrin ikinci/üçüncü görsel varyasyonu ekleniyorsa") bunu zaten yasaklıyor.

## 8B.1 Program kataloğu iki kez sunuluyor

**Ölçüm.** Şifa Yolculuğu (Innovation) 5,0 ekran / 4500px, 5 kart. Çalışma Alanları
(SustainableRetreat) 3,47 ekran / 3120px, 6 link. İkisi de aynı altı programı gösteriyor ve
aynı `/programlar/*` rotalarına gidiyor. Birlikte **8,47 / 22,4 ekran = sayfanın %38'i**.
Kodun kendi yorumu ikinciyi "sitemap grid" diye adlandırmış.

**Asıl bulgu.** Çalışma Alanları'nın kendi tezi tekrar değil: başlığı "Üç farklı katılım yolu",
paragrafı *"Akademide üç formatta çalışıyoruz: Birebir seanslar, küçük grup programları ve
sertifikalı eğitimler"* diyor. Bu bilgi sitede **başka hiçbir yerde yok** ve ziyaretçinin
gerçekten sorduğu soru. Bölüm bunu söylüyor ama göstermiyor — bunun yerine 8 ekran önce
anlatılmış katalogu tekrarlıyor. Yani başlığının verdiği sözü tutmuyor.

### Tasks

- [x] Çalışma Alanları grid'ini üç formata çevir **TAMAMLANDI (D055)**
- [x] Marquee, rise geçişi ve image-mass kompozisyonu **korundu (D055)**
- [x] `public/group/` ihtiyacı 6 → 3'e indi **(kod tarafı; kareler bekliyor)**
- [x] Şifa Yolculuğu tek program anlatımı olarak kaldı **(D055)**

### Acceptance Criteria

- [x] Landing page'de program kataloğu **bir kez** sunuluyor. **(2026-08-21)**
- [x] "Üç farklı katılım yolu" başlığı gerçekten üç formatı gösteriyor:
      Birebir Seanslar · Küçük Grup Programları · Sertifikalı Eğitimler.
- [x] Design/Creativity tarafında görsel showpiece kaybı yok — marquee, rise geçişi ve
      image-mass kompozisyonu korundu.
- [ ] ~~Sayfa toplam yüksekliği ~1–2 ekran kısalıyor.~~ **Bu kriter yanlıştı, düzeltildi.**
      Ölçüm (normal motion, 1440×900): önce 20.860px / 23,18 ekran → sonra 21.040px / 23,38 ekran.
      Bölüm 3,47 → 3,67vh; üç satır altı satırdan uzun başlıklar taşıdığı için hafifçe **büyüdü**.
      Masaüstünde blok yüksekliğini zaten hover görselinin sütunu belirliyor, satır sayısı değil.
      **Uzunluk kazancı bu maddeden değil, §8 (500vh retiming) maddesinden gelir.**
      Bu maddenin kazancı Usability/Content tarafında: tekrar eden katalog gitti, başlık
      verdiği sözü tutuyor.

> **Ölçüm notu.** İlk ölçümde %27 kısalma göründü; o ölçüm `reducedMotion: reduce` ile alınmıştı
> ve o modda sticky bölümler tasarım gereği çöküyor (`motion-reduce:h-auto`). Karşılaştırma
> yaparken iki ölçümün de aynı motion ayarında olması şart.

## 8B.2 İki dönüşüm yüzeyi, biri erişilemez

**Durum.** Ana sayfadaki `<Form />` 2026-08-20'de geri getirildi (13 alan, `id="on-kayit"`).
Ama sitedeki **her** ön görüşme CTA'sı `consultationHref()` ile `/on-gorusme`'ye gidiyor:
`HeroOpeningMotion`, `NavBar`, `SideBar`, `SideBarMobile`, `Footer/Server`,
`CourseDetailTemplate`, `app/egitmenler`, `app/sss`. Yani forma **hiçbir bağlantı yok**;
ziyaretçi ancak 22 ekran kaydırıp sona gelirse görüyor, hero'daki düğme ise onu sayfadan
çıkarıp başka bir forma götürüyor.

`/on-gorusme` teknik olarak daha gelişmiş: program ön-seçimi için radio grubu, `program` ve
`source_url` gizli alanları, `website` honeypot'u.

### Tasks

- [x] Kanonik yüzey seçildi: ana sayfada kaydır, diğer rotalarda özel sayfa **(D054)**
- [ ] Ana sayfa formu seçilirse: 8 dosyadaki CTA'ları `/#on-kayit`'e döndür, `/on-gorusme`'yi emekliye ayır.
- [ ] `/on-gorusme` seçilirse: ana sayfa formunun ikincil rolünü kabul et veya kaldır.
- [ ] Kullanılmayan tarafı (ölü `sections/Form/**` ya da `sections/ConsultationGateway/`) sil.

### Acceptance Criteria

- [x] Sitede tek bir kanonik dönüşüm yolu var **(canlı doğrulandı)**
- [x] Hiçbir dönüşüm yüzeyi bağlantısız kalmıyor **(canlı doğrulandı)**
- [ ] Ölü kod kalmıyor; `id="on-kayit"` tek bir yerde tanımlı.

## 8B.3 `/on-gorusme` sitemap'te yok

Sitenin birincil dönüşüm sayfası `app/sitemap.ts` içindeki `ROUTES` listesinde yok.

- [x] `/on-gorusme` sitemap'te **(D054)**

---

# 9. Sprint 7 — Content / Trust / Proof

## Goal

Content score’u tasarım seviyesine çıkarmak.

---

## 9.1 Health Claim Audit — P0, DOĞRULANDI

> **Bu bölüm plandaki en değerli maddeydi ve iddiaları gerçek çıktı.** 2026-08-21'de kod üzerinde
> tek tek doğrulandı. Bunlar örnek değil, **canlıda duran metinler**. Türkiye'de sağlık beyanı
> mevzuatı kapsamına giren ifadeler ve `PRODUCT.md`'nin kendi ilkesiyle ("Earn trust through
> precise claims, visible expertise, and real evidence") doğrudan çelişiyorlar.
>
> Not: 2026-08-17/18'de yapılan akreditasyon ve fiyat temizliği (D042) **bu dosyalara
> bakmamıştı** — 3D meridyen veri katmanı ve kart metinleri denetim dışında kalmış.

### Doğrulanmış envanter

| Dosya:satır | Metin | Değerlendirme |
|---|---|---|
| `components/Client/Meridian3D.tsx:89` | "Solunumu rahatlatır, **astım** ve öksürük krizlerini hafifletir" | klinik iddia — kalkmalı |
| `components/Client/Meridian3D.tsx:119` | "Vücuttaki **tüm ağrıları** yatıştırır, baş ağrısı ve sinüzite iyi gelir" | klinik + mutlak ("tüm") — kalkmalı |
| `components/Client/Meridian3D.tsx:73` | "Vücudun genel enerji seviyesini artırır, **bağışıklığı güçlendirir**" | klinik iddia — kalkmalı |
| `components/Client/Meridian3D.tsx:56` | "Zihni yatıştırır, uykusuzluk ve **çarpıntıya** iyi gelir" | klinik iddia — kalkmalı |
| `data/acupoints.ts:34` | "Solunum güçlüğü, **astım belirtileri** ve göğüsteki sıkışma hissini rahatlatır" | klinik iddia — kalkmalı |
| `data/acupoints.ts:58` | "Uykusuzluğa ve iç gerginliğe iyi gelir" | yumuşatılabilir |
| `data/acupoints.ts:134` | "Uykusuzluğu, stres kaynaklı **çarpıntıyı** azaltır" | klinik iddia — kalkmalı |
| `data/acupoints.ts:154` | "Kan dolaşımını ve karaciğer **detoksunu** uyarır" | fizyolojik iddia — kalkmalı |
| `data/meridians.ts:94` | "Karaciğer, tendonlar, göz sağlığı, **detoks**" | fizyolojik iddia — kalkmalı |
| `components/Client/ClipImageCard.tsx:38,43` | "denge ve **hücresel düzeyde detoks** sağlayın" | fizyolojik iddia — kalkmalı |
| `components/Client/ClipImageCard.tsx:54,59` | "teknikleriyle **derin hücresel şifa**" | fizyolojik iddia — kalkmalı |

### İkinci dalga — program sayfası SSS blokları (2026-08-22)

> İlk envanter **3D meridyen veri katmanına ve kart metinlerine** bakmıştı; program
> sayfalarının SSS blokları taranmamıştı. Dışarıdan gelen bir kod incelemesi bunu yakaladı.
> Kaçırmanın nedeni, ilk taramanın dosya listesiyle sınırlı tutulmasıydı.

| Dosya | Metin | Değerlendirme |
|---|---|---|
| `app/programlar/meridyen-terapi/page.tsx` | "romatizma, **hipertansiyon**, hiperglisemi, **şeker hastalığı**, iskemik rahatsızlıkları bulunan ... kişilere özellikle tavsiye edilmektedir" | **en ağırı** — hastalık adıyla endikasyon listesi |
| `app/programlar/meridyen-terapi/page.tsx` | "organizma **toksinlerden temizlenir**, kan dolaşımı ve **metabolizma iyileşir** ... **bağışıklık güçlenir**" | fizyolojik iddia zinciri |
| `app/programlar/meridyen-terapi/page.tsx` | soru başlığı: "**İyileşme Olması İçin** İşleme Ne Kadar Süreyle..." | sorunun kendisi iyileşme vaadi |
| `app/programlar/meridyen-terapi/page.tsx` | "chi enerjisi ve **kan dolaşımının iyileşmesine** ... **profilaktik ve iyileştirici etki**" | fizyolojik iddia |
| `app/programlar/meridyen-terapi/page.tsx` | "Cihaz, **hücrelerin enerjisini yenilemekte**" | fizyolojik iddia |
| `app/programlar/meridyen-terapi/page.tsx` | "Serbest chi sirkülasyonu **kan dolaşımını iyileştirmekte**" | fizyolojik iddia |
| `app/programlar/meridyen-terapi/page.tsx` | "birçok rahatsızlığın **ortaya çıkma nedenidir**" | nedensellik iddiası |
| `app/programlar/nefes-koclugu/page.tsx` | "**bağışıklık sistemimiz güçlenir**" | klinik iddia |
| `app/programlar/nefes-koclugu/page.tsx` | fayda listesi: "**Solunum sistemi sağlığının iyileşmesi**", "**Bağışıklık sisteminin güçlenmesi**" | klinik iddia |
| `app/programlar/nefes-koclugu/page.tsx` | "**genel sağlığını iyileştirmek** isteyenler" | sınırda |
| `app/programlar/nefes-koclugu/page.tsx` | "kan basıncını düzenlediği ... **araştırmalarla gösterilmiştir**. Kandaki oksijen miktarının artması da **bağışıklığı destekler**" | atıfsız araştırma iddiası |

**Korunanlar.** Meridyen sayfasının kontrendikasyon listesi hastalık adı içeriyor ama
dokunulmadı: cihazın **ne zaman kullanılmaması** gerektiğini anlatıyor, yani iddia değil
güvenlik bilgisi. Aynı gerekçe `acupoints.ts`'in `caution` alanları için de geçerliydi.
`app/programlar/yasam-kocu/page.tsx` tarandı, temiz: "yaşam kalitesini iyileştirme" bir
koçluk ifadesi.

**Sonraki tarama komutu** (yeni metin eklendiğinde çalıştırılmalı):

```bash
grep -rn "bağışıklık\|toksin\|metabolizma\|kan dolaşımı\|iyileşir\|tedavi eder\|detoks\|hücresel"   app components data --include=*.tsx --include=*.ts
```

### Yeniden yazım kuralı

Sonuç vaat etmek yerine **geleneksel çerçeveyi** anlat: "X'i iyileştirir" değil,
"geleneksel Çin tıbbında X ile ilişkilendirilir". Ölçülebilir fizyolojik sonuç
("detoks", "bağışıklık", "hücresel") iddiası hiç kullanılmaz.

### Tasks

- [x] Tüm sağlık iddialarını envanterle. **(11 + 11 = 22 konum — iki dalga, aşağıda)**
- [x] Klinik iddia / geleneksel yaklaşım ayrımı yap. **(D051, D069)**
- [x] Kesin sonuç vaatlerini kaldır. **(D051, D069)**
- [ ] Gerekli yerde kaynak ekle. — **açık.** Nefes SSS'inde artık atıfsız araştırma iddiası
      yok ama gerçek kaynak da eklenmedi; hakemli çalışma referansı verilecekse burada verilir.
- [x] Gerekli yerde disclaimer ekle. **(Meridian3D görünür uyarı + program SSS'lerine hekime
      danışma notu)**
- [ ] Program copy'sini credibility-first yeniden yaz. — **kısmen.** Riskli SSS metinleri
      temizlendi; program gövde metinlerinin tam editoryal geçişi yapılmadı.

---

## 9.2 Accreditation Proof

Her program için:

```text
ACCREDITATION
─────────────
Kurum
Kayıt / accreditation no
Sertifika seviyesi
Geçerlilik kapsamı
Eğitim saati
Assessment yöntemi
Sertifika örneği
```

### Tasks

- [ ] Kurum adı
- [ ] Kurum logosu
- [ ] Dış doğrulama linki
- [ ] Sertifika örneği
- [ ] Eğitim saati
- [ ] Assessment yöntemi
- [ ] Eğitmen yetkinliği
- [ ] “Uluslararası” kapsam açıklaması

---

## 9.3 Instructor Proof

Her eğitmen sayfasında:

- [ ] Eğitim geçmişi
- [ ] Sertifikalar
- [ ] Uzmanlık alanı
- [ ] Yıllar / deneyim
- [ ] Program ilişkisi
- [ ] Gerçek portre
- [ ] Gerekli external proof
- [ ] Bio schema / Person structured data

---

# 10. Sprint 8 — 3D Meridian Experience

## Goal

3D’yi decorative gimmick’ten bilgi taşıyan bir marka objesine dönüştürmek.

### Tasks

- [ ] Meridian seçimi → kamera focus.
- [ ] Anatomik overlay.
- [ ] Scroll-linked meridian story.
- [ ] Editorial labels.
- [ ] Kaynak / citation.
- [ ] Acupoint → ilgili program context.
- [ ] Static 2D mobile fallback.
- [ ] Reduced-motion fallback.
- [ ] GPU performance test.
- [ ] WebGL context loss fallback.
- [ ] Pointer olmadan kullanım testi.

### Acceptance Criteria

3D sahnesi çıkarıldığında program / meridyen anlatımında gerçek bilgi kaybı olmalı.

---

# 11. Sprint 9 — Design System & Documentation Cleanup

## Goal

Tek source of truth oluşturmak.

### Known drift examples

- Runtime font ile docs font tanımı farklı.
- Bazı todo maddeleri tamamlanmış olmasına rağmen açık görünüyor.
- Accessibility checklist ile QA report tam senkron değil.
- Internal Awwwards score belgeleri farklı seviyeler söylüyor.

### Tasks

- [ ] `RELEASE_READINESS.md`
- [ ] `docs/archive/`
- [x] Tek aktif backlog **TAMAMLANDI — docs/RELEASE-PLAN.md**
- [x] Tek typography spec **TAMAMLANDI (D063)**
- [ ] Tek motion spec
- [ ] Tek performance baseline
- [x] Tek Awwwards scorecard **TAMAMLANDI — depo denetimi kanonik**
- [ ] Eski todo arşivi
- [ ] Stale issues cleanup
- [x] "current / historical" docs ayrımı **TAMAMLANDI**

---

# 12. Sprint 10 — SEO / Discoverability

### Tasks

- [x] Route-specific title **TAMAMLANDI — 13 rota**
- [x] Route-specific description **TAMAMLANDI — 13 rota**
- [ ] Route-specific OG image
- [x] Canonical **TAMAMLANDI**
- [ ] Breadcrumb schema
- [x] Organization schema **TAMAMLANDI**
- [ ] Person schema
- [ ] Article schema
- [x] Course schema **TAMAMLANDI — offers/fiyat yok, teyitsiz olduğu için**
- [x] FAQ schema **TAMAMLANDI — app/sss/faqs.ts tek kaynak**
- [ ] `sameAs`
- [ ] Search Console validation
- [ ] Sitemap validation
- [ ] Broken canonical audit

---

# 13. Sprint 11 — Accessibility Final Pass

### Required checks

- [x] Axe serious/critical = 0 **TAMAMLANDI (D059)**
- [x] Keyboard-only navigation **doğrulandı — qa/keyboard.mjs**
- [x] 200% zoom **taşma yok**
- [x] 400% zoom critical flow **taşma yok**
- [x] Visible focus **axe ile doğrulandı**
- [x] Dialog focus trap **30 Tab sonra odak içeride**
- [x] ESC close **doğrulandı**
- [x] Focus restoration **odak menü düğmesine dönüyor**
- [ ] Form error `aria-live`
- [x] Touch target ≥44px **axe temiz**
- [x] Heading hierarchy **TAMAMLANDI**
- [x] Reduced motion **doğrulandı**
- [x] Canvas fallback **mevcut, doğrulandı**
- [ ] Screen reader smoke test
- [x] Mobile menu focus order **doğrulandı**

---

## 13.1 Image Alt Audit

### Rules

Decorative:

```tsx
alt=""
```

Informative:

```tsx
alt="Nefes çalışması sırasında eğitmen ve katılımcı"
```

### Tasks

- [x] `alt="image-1"` kaldır. **TAMAMLANDI** — kodda kalmadı (doğrulandı 2026-08-21)
- [x] `alt="card-image-1"` kaldır. **TAMAMLANDI** — `ClipImageCard` artık `alt="" aria-hidden`
- [ ] Duplicate text images → empty alt.
- [ ] Informative imagery → meaningful alt.
- [ ] 3D canvas → textual fallback.

---

# 14. Sprint 12 — Asset / Dependency Cleanup

## Assets

- [x] Ağır PNG → JPEG **TAMAMLANDI (D062); AVIF/WebP'ye geçilmedi**
- [x] `.bak` asset cleanup **— `.bak` dosyası yok; ölü Kisthe.woff arşive taşındı**
- [ ] Duplicate hash audit.
- [x] Served-width audit **— sizes ile doğru genişlik isteniyor**
- [x] `next/image sizes` audit **— 10 eksik prop eklendi, kalan 0**
- [x] Video masters audit **— video kalmadı**
- [ ] Public asset manifest.

## Dependencies

- [x] `@studio-freight/react-lenis` kullanımını doğrula. **DOĞRULANDI (2026-08-21): app/, components/, sections/ içinde sıfır import — ölü bağımlılık.**
- [ ] Kaldır. (`lenis` paketi ayrı ve kullanılıyor; kaldırılan yalnız React wrapper'ı olmalı.)
- [x] Dead dependency audit **TAMAMLANDI — react-lenis kaldırıldı**
- [ ] `npm dedupe`.
- [x] Bundle diff **— JS transfer 55 KB masaüstü / 44 KB mobil ölçüldü**
- [ ] Client import graph.

---

# 15. Sprint 13 — Brand Consistency Pass

### Known issue

~~Hero içindeki location line ile positioning arasında coğrafya farkı var.~~
**ÇÖZÜLDÜ** — hero satırı İzmir'e alındı; depoda "İstanbul" için sıfır eşleşme (2026-08-21).

Kalan marka tutarsızlığı **başka bir yerde**: hero'nun sağ alt köşesindeki
`EDİTORİAL WELLNESS ACADEMY · İZMİR` satırı, `docs/art-direction.md`'de seçilmiş **iç yön
adının** birebir ekrana sızmış hâli — müşteriye dönük kopya değil.

### Tasks

- [x] İstanbul / İzmir **TAMAMLANDI**
- [x] `EDİTORİAL WELLNESS ACADEMY` → "Online ve İzmir'de" **(D056)**
- [ ] Online / physical
- [ ] Footer address
- [ ] KVKK address
- [ ] Organization schema
- [ ] Contact info
- [ ] OG metadata
- [ ] Program format
- [ ] Social profiles
- [ ] Google Business info

### Acceptance Criteria

Tüm public touchpoint’lerde tek marka gerçeği.

---

# 16. Sprint 14 — Program Detail Upgrade

Her program:

```text
01 — Overview
02 — Kimler için
03 — Ne öğreneceksiniz
04 — Eğitim yöntemi
05 — Müfredat
06 — Eğitmen
07 — Accreditation
08 — Program takvimi
09 — Sertifika
10 — Sosyal kanıt
11 — SSS
12 — Başvuru
```

### Tasks

- [ ] Course-specific hero.
- [ ] Course-specific imagery.
- [ ] Course-specific proof.
- [ ] Course-specific FAQ.
- [ ] Course-specific CTA.
- [ ] Course structured data.
- [ ] Template hissini kıran bir özgün moment.

---

# 17. Sprint 15 — Final Jury Pass

## Rule

**Yeni özellik ekleme yok.**

Yalnız:

- [ ] typography
- [ ] spacing
- [ ] motion timing
- [ ] image crop
- [ ] copy
- [ ] performance
- [ ] semantics
- [ ] responsiveness
- [ ] browser compatibility
- [ ] submission assets

---

# 18. Viewport Matrix

Zorunlu QA:

- [x] 390×844 **doğrulandı**
- [x] 430×932 **doğrulandı**
- [x] 768×1024 **doğrulandı**
- [x] 1024×768 **doğrulandı**
- [x] 1366×768 **doğrulandı**
- [x] 1440×900 **doğrulandı**
- [x] 1600×900 **doğrulandı**
- [x] 1920×1080 **doğrulandı**
- [ ] ultra-wide sanity check

---

# 19. Browser Matrix

- [ ] Chrome
- [ ] Safari
- [ ] Firefox
- [ ] iOS Safari
- [ ] Android Chrome

---

# 20. Network / Device Matrix

- [x] Fast desktop **profillendi**
- [x] Mid-range Android **— 4× CPU kısıtı ile profillendi (D065)**
- [ ] Slow 4G
- [ ] Save-Data
- [x] Reduced Motion **doğrulandı**
- [x] Keyboard-only **doğrulandı**
- [ ] Touch-only

---

# 21. Final Awwwards Definition of Done

## Design

- [ ] Her major section screenshot-worthy.
- [ ] Tüm photography tek art direction.
- [ ] Hero tek dominant idea.
- [x] Typography tutarlı **— ölçek kapalı, sabit punto 0 (D063)**
- [x] Spacing sistematik **— --spacing ölçeği, elle piksel yok**
- [ ] Mobile ayrı art direction gibi hissediyor.

## Usability

- [ ] Programlara ≤3 etkileşimde ulaşılabiliyor.
- [ ] Primary CTA net.
- [ ] Scroll fatigue yok.
- [ ] Form güvenilir.
- [ ] Keyboard navigation eksiksiz.
- [ ] Reduced motion eksiksiz.

## Creativity

- [ ] Elementis/template lineage görünür değil.
- [ ] En az bir interaction yalnız bu markaya ait.
- [ ] Meridian motif dekorasyondan fazlası.
- [ ] 3D bilgi taşıyor.
- [ ] Site generic wellness template hissi vermiyor.

## Content

- [ ] Accreditation kanıtlı.
- [ ] Instructor credentials kanıtlı.
- [ ] Sağlık iddiaları kontrollü.
- [ ] Program detayları tam.
- [ ] Real trust signals mevcut.
- [ ] Copy tonu bütün sitede tutarlı.

## Development

- [ ] Security blockers = 0 — **critical: 0 ✓ | kalan 4 high, next@16 (major) gerektiriyor (D064)**
- [ ] CI PASS
- [x] Production build PASS **(exit 0, 27 sayfa)**
- [ ] Axe serious/critical = 0
- [ ] p75 LCP < 2.5 s
- [ ] p75 INP < 200 ms
- [ ] CLS < 0.1
- [x] 390–1920 overflow = 0 **— 8 viewport × 6 rota, sıfır taşma**
- [x] Console error = 0 ✓
- [ ] Hydration warning = 0
- [ ] Broken link = 0

---

# 22. Recommended Execution Order — REVİZE (2026-08-21)

> **Neden değişti.** Önceki sıra kendi öncelik modeliyle çelişiyordu: §2 sağlık iddialarını
> **P0 (submission blocker)** ilan ediyor ama sıralamada **7.** konuma koyuyordu. Aynı şekilde
> "P1 — Awwwards Score Movers" başlığı altındaki art direction, iki sprint CI / RUM /
> Dependabot işinden sonraya bırakılmıştı. Jüri CI pipeline'ı görmüyor; deponun kendi denetimi
> ise **1 numaralı kaldıracın fotoğraf** olduğunu yazıyor.
>
> İlke korundu (stability → authorship → art direction), sadece "stability"nin içinden
> **jüri gününde risk yaratan** kısım öne, **yaratmayan** kısım arkaya alındı.

```text
01 Content Integrity            sağlık iddiaları (§9.1) — P0, hukuki + itibari risk, ucuz düzeltme
↓
02 Form / Supabase Hardening    canlı form veri alıyor; spam, rate limit, hata sızıntısı (§3.3)
↓
03 Bilgi Mimarisi / Dönüşüm     §8B — tekrar eden katalog + bağlantısız dönüşüm yüzeyi
↓
04 Art Direction Lock           ImageContainer (5) + group (3) — denetimin 1 numaralı kaldıracı
↓
05 Hero Simplification          §7 — rakip katmanları azalt
↓
06 Long Scroll Journey          §8 — 500vh retiming + mobil alternatif
↓
07 Authorship / Originality     §6 — elementis-clone, ElementisStory, asset adları
↓
08 Accessibility Final Pass     §13
↓
09 Brand Consistency            §15
↓
10 Assets / Dependencies        §14 — ölü react-lenis dahil
↓
11 SEO                          §12
↓
12 Program Detail Upgrade       §16
↓
13 Next.js Upgrade + Mobile Perf  §3.1 + §4 — ya şimdi ya submission sonrası, jüri haftasında ASLA
↓
14 Documentation Cleanup        §11
↓
15 CI Pipeline + RUM            §3.2 + §4.1 — mühendislik hijyeni, jüri kriteri değil
↓
16 Final Jury Pass              §17
```

### Sıralama notları

- **01 neden başta:** "astım krizlerini hafifletir" gibi ifadeler canlıda. Bu bir tasarım
  meselesi değil; düzeltmesi de birkaç saatlik metin işi.
- **02 neden erken:** form gerçek kullanıcı verisi topluyor ve rate limit / honeypot yok.
- **13 neden geç ama "asla jüri haftasında":** Next.js yükseltmesi geç yapılırsa submission
  öncesi regression riski yaratır. Ya erken bitir ya submission sonrasına bırak — arada yapma.
- **15 neden en sonda:** CI, Dependabot ve RUM submission skorunu hiç etkilemez. Uzun vadede
  gerekli, jüri için değil.

---

# 23. Stop Conditions

Aşağıdaki durumlarda ek özellik geliştirme durdurulmalı:

- Creative score artmıyor ancak bundle büyüyorsa.
- Motion anlam katmıyor ancak interaction cost artırıyorsa.
- Yeni effect hero hiyerarşisini bozuyorsa.
- Mobile performance geriliyorsa.
- Accessibility regression oluşuyorsa.
- Aynı fikrin ikinci/üçüncü görsel varyasyonu ekleniyorsa.
- Site “Awwwards effect showcase” gibi görünmeye başlıyorsa.

---

# 24. Target End State

Hedef yalnızca daha “şık” bir site değildir.

Final deneyim şu nitelikleri aynı anda taşımalıdır:

> **Calm · Editorial · Human · Aegean · Credible · Crafted · Cinematic · Original**

Başarı kriteri:

> Ziyaretçi, tasarım referansını değil **Yaşama Sanatı markasını** hatırlamalı.

