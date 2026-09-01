# AWWWARDS 90+ — ENGEL LİSTESİ VE UYGULAMA PLANI

> Tarih: **2026-09-01** · Kapsam: **17 rotanın tamamı**, yalnız ana sayfa değil.
> Yöntem: kod taraması (sayımlar aşağıda), çalışan sunucuda ekran görüntüsü ve
> **piksel ölçümü**. Önceki tur raporlarına güvenilmedi; her iddia yeniden ölçüldü.

## Nasıl okunmalı

Awwwards değerlendirmesi **Design %40 · Usability %30 · Creativity %20 · Content %10**.
Bu sitenin bugünkü asıl kaybı **Design ve Creativity** kalemlerinde ve kaynağı tek
bir cümleyle özetlenebilir:

> **Tasarım sistemi yazılmış ama sayfalara bağlanmamış.**
> `app/globals.css` içinde tam bir token katmanı var; sayfalar onu kullanmıyor.

Ölçüm:

```
.tsx dosyalarında ham hex   : 764
.tsx dosyalarında var(--…)  :  99      → token benimseme ~%11
Farklı hex sayısı           :  72
```

Sıfır kullanımı olan token'lar (tanımlı ama hiçbir bileşende yok):
`--text-primary`, `--text-secondary`, `--text-muted`, `--accent-sage`,
`--content-editorial`, `--section-space`, `--motion-reveal`, `--motion-hover`,
`--surface-muted`.

Bu, "biraz cila" meselesi değil; jürinin ilk saniyelerde gördüğü tutarsızlığın
kaynağı. Aşağıdaki engellerin çoğu bu tek kökün belirtisi.

---

# A. SİSTEMİK ENGELLER

## A1 — Renk sistemi dağılmış · BLOCKER

72 farklı hex elle yazılmış. Bakır/terracotta ailesinde **birbirine çok yakın 7 ton**
aynı anda yaşıyor:

| Hex | Durum |
|---|---|
| `#c9875b` | `--accent-copper` (token) |
| `#d79a70` | `--accent-copper-hover` (token) |
| `#e0a878` | `--accent-copper-on-dark` (token) |
| `#e0a96d` | 41 kez — ham |
| `#ca7d57` | 34 kez — ham |
| `#d58d5d` | 25 kez — ham |
| `#e09a6c` | 23 kez — ham |

Krem/kâğıt ailesinde aynı sorun: `#ced1bf` (261), `#d1ccbf` (48), `#f3efe6` (38),
`#f4efe4` (11). Zemin yeşilinde `#2b3530` (118) ve yanında `#30493d`, `#293a32`,
`#26332d`, `#222b27`, `#1a2420`, `#0b1411`, `#030806`.

**Etki:** aynı vurgu rengi iki bölümde farklı çıkıyor; jüri bunu "kararsız palet"
olarak okur. Ayrıca tek yerden ince ayar yapmak imkânsız.

## A2 — Tipografik ses kopukluğu · BLOCKER (gözle görülür)

`SubPageLayout` h1'i `font-serif text-display-l` ile basıyor (Ogg). Sayfa gövdeleri
o sesi **bırakıyor** ve sans-serif `font-light`'a düşüyor:

| Sayfa | Gövdedeki h2/h3 | `font-serif` | `text-display-*` |
|---|---|---|---|
| `/the-story` | 9 | **0** | **0** |
| `/community` | 8 | **0** | **0** |
| `/privacy-terms` | 8 | **0** | **0** |
| `/kvkk` | 6 | **0** | **0** |
| `/sss` | 1 | 1 | 0 |
| `/programlar` | 1 | 1 | 1 |

Ekran görüntüsüyle doğrulandı (`/the-story`, 1440×900): "Hikayemiz" Ogg display;
hemen altındaki "Vizyonumuz ve Yaklaşımımız" jenerik sans. **Marka hikâyesi sayfası
markanın tipografisini kullanmıyor.**

Ayrıca **iki farklı başlık sistemi** aynı sitede yaşıyor: program sayfaları
kicker (`PROGRAM · GENEL BAKIŞ`, Space Mono, bakır) + serif başlık kullanıyor;
diğer 10 sayfa çıplak sans başlık kullanıyor.

## A3 — Eksen kırığı · BLOCKER (ölçüldü, gözle görülür)

Hero `px-6 md:px-16` ile **x=64px**'ten başlıyor. Gövde `max-w-5xl mx-auto` ile
1440px'de **x=208px**'ten başlıyor. **144px'lik kayma**, aynı ekranda iki rakip sol
kenar üretiyor. `/community` ve `/the-story` ekran görüntülerinde açıkça görünüyor.

Konteyner ölçüsü sayfa sayfa değişiyor — **tek bir grid yok**:

```
max-w-5xl : /community, /the-story
max-w-4xl : /kvkk, /privacy-terms
max-w-6xl : /egitmenler, /programlar
max-w-3xl, max-w-2xl : /sss, /egitmenler, /programlar (iç içe)
konteyner YOK : 6 program sayfası, /blog, /blog/[slug], /on-gorusme, /
```

`--content-editorial` ve `--content-wide` token'ları tam bu iş için tanımlanmış;
`--content-editorial` **hiç kullanılmıyor**.

## A4 — 14 sayfanın toplam hareket bütçesi 14 piksel, üstelik tek tarayıcıda · BLOCKER

Alt sayfaların tek hareketi `app/globals.css:364-381`:

```css
@keyframes sectionRise { from { transform: translateY(14px) } to { transform: translateY(0) } }
@media (prefers-reduced-motion: no-preference) {
  @supports (animation-timeline: view()) { … }
}
```

* Hareket miktarı: **14px kayma**, opaklık yok.
* `animation-timeline: view()` bugün **yalnız Chromium**'da çalışıyor.
* Yani **Safari ve Firefox'ta alt sayfaların 14'ünde hareket tamamen SIFIR.**

Awwwards jürisi ağırlıklı olarak macOS/Safari ve Chrome kullanır. Safari'de site,
ana sayfa dışında hareketsiz bir PDF gibi görünüyor.

> Not: CSS-only tercihi doğru bir karardı (SSR içeriğini `opacity:0` ile gizlememek
> için). Sorun tercihte değil, **tek yönteme bağımlı kalınmasında**: destekleyen
> tarayıcıda zayıf, desteklemeyende hiç yok.

## A5 — Sayfa geçişi yok · BLOCKER

`app/` altında `template.tsx` yok, route seviyesinde `AnimatePresence` yok,
View Transitions yok. Her menü tıklaması **sert kesme**. Lenis smooth scroll ve
sticky journey ile kurulan "akış" hissi, ilk navigasyonda kırılıyor.

Awwwards'ta sayfa geçişi fiilen bir giriş bileti; yokluğu Creativity'den doğrudan
puan götürür.

## A6 — İmza etkileşimler ana sayfanın tek bölümüne hapsedilmiş · YÜKSEK

| Bileşen | Nerede kullanılıyor |
|---|---|
| `Cursor.tsx` (custom cursor) | **yalnız** `JourneyDesktop` içinde |
| `SectionTransition.tsx` | **yalnız** 2 yer (`Introduction`, `SustainableRetreat`) |
| `Magnetic.tsx` | **hiçbir yerde** — ölü |
| `Loader.tsx` | **hiçbir yerde** — ölü |
| `DynamicLineReveal.tsx` | **hiçbir yerde** — ölü |
| `Br.tsx` | **hiçbir yerde** — ölü |

Site en karakterli etkileşimini bir bölümde gösterip bırakıyor. Kullanıcı menüden
bir sayfaya gittiğinde imleç OS varsayılanına dönüyor.

## A7 — Hareket token'ları yazılmış, uyulmuyor · ORTA

`utils/motion/tokens.ts` easing + duration + stagger tanımlıyor. Gerçek kullanım:

```
ham [0.24, 0.43, 0.15, 0.97]  : 24 kez     easing.editorial : 12 kez
ease: "easeInOut" / "easeOut" :  9 kez     (token dışı)
```

Duration token'ları (`hover .22`, `buttonStroke .52`, `textLine .72`, `section .9`,
`hero 1.2`) neredeyse hiç kullanılmıyor; onun yerine **20 farklı ham değer**:
0.8 (11×), 0.5 (8×), 0.6 (7×), 0.55 (6×), 0.4, 0.3, 0.35, 0.25, 0.32, 0.7, 0.75,
0.95, 1.2, 1.5, 1.7, 4.5, 6, 24, 28…

**Etki:** benzer hareketler farklı hızlarda; ritim duygusu oluşmuyor.

## A8 — Hero kompozisyonu 11 sayfada birebir aynı, üstelik fotoğraf yarıda ölüyor · YÜKSEK

`SubPageLayout` + `SubPageHeroMedia` şu kalıbı 11 kez tekrarlıyor:
fotoğraf → 3 katmanlı scrim → bakır çizgi → sol-alt serif h1 → 2 satır açıklama.

Piksel ölçümü (`/community`, 1440×900):

```
y=120  89,85,75  fotoğraf okunuyor
y=250  56,57,46  zayıflıyor
y=400  48,54,47  neredeyse yok
y=550  46,55,51  ← saf zemin rengi: FOTOĞRAF TAMAMEN KAYBOLMUŞ
```

Hero yüksekliği `min-h-[68svh]` ≈ 612px; **alt %40'ı ölü alan.** Üstelik açıklama
metninin bitişiyle ilk bölüm başlığı arasında ölçülen boşluk `/the-story`'de
**~190px**, `/programlar/reiki`'de **~180px** — içinde hiçbir şey olmayan bir bant.

Scrim değerleri kontrast için ölçülerek ayarlanmıştı (doğru karar), ama bugünkü
dengede fotoğraf kompozisyondan çıkıyor. Bu bir denge sorunu, iptal sorunu değil.

## A9 — Jenerik kart dili · YÜKSEK

`bg-[#ced1bf]/5 rounded border border-[#ced1bf]/10` kalıbı **23 kez, 10 dosyada**.
Sitede toplam **88 `rounded`** kullanımı var.

`/community` bunun en kötü örneği: hero'dan sonra sayfa 4 eşit kutu + 2 eşit kutu +
1 kutuya dönüşüyor, **gövdede tek bir görsel yok**, hiyerarşi yok, hepsi aynı
ağırlıkta. Bu jenerik bir şablon dili; editoryal bir akademi sitesinin dili değil.

## A10 — `/404` başka bir siteden gelmiş gibi · ORTA

`app/not-found.tsx` iyi tasarlanmış (kicker + display serif + italik vurgu) **ama
kendi paletini getiriyor**: `#F3EFE6`, `#E0A878`, `#C9875B`, `#F4EFE4` ve sitenin
hiçbir yerinde olmayan `rounded-full` hap butonlar. Ayrıca **NavBar ve Footer yok** —
404'e düşen kullanıcının iki linkten başka çıkışı yok.

## A11 — `/on-gorusme` farklı bir stil sistemi kullanıyor · ORTA

Sitedeki tek CSS Module: `app/on-gorusme/on-gorusme.module.css`. Diğer 16 rota
Tailwind. Dönüşümün en kritik sayfası sistemin dışında duruyor; token değişikliği
oraya yansımıyor.

## A12 — Ölü kod ve bayat doküman · DÜŞÜK (hijyen)

* Ölü bileşenler: `Loader`, `Magnetic`, `DynamicLineReveal`, `Br`.
* `docs/ART-DIRECTION-GAPS.md` **bayat**: `ImageContainer/image-1,-3,-5` için
  "değişmeli" diyor — o kareler bu turda yeniden üretildi. `group/nefes-koclugu.jpg`,
  `group/reiki.jpg`, `group/hipnoterapi.jpg` için "kullanılmıyor" diyor — **o dosyalar
  artık repoda yok**; `public/group/` içinde 3 dosya kaldı ve üçü de kullanılıyor.
  Düzeltilmezse sonraki turda yanlış işe yol açar.

---

# B. SAYFA SAYFA

| Rota | Hero | Gövde hareketi | Gövde görseli | Tipografi sesi | Öncelikli sorun |
|---|---|---|---|---|---|
| `/` | tam ekran, HeroOpeningMotion | zengin (journey, 3D, marquee) | var | tutarlı | — en güçlü sayfa |
| `/programlar` | foto | sadece 14px CSS | kart görselleri | kısmen serif | kart ızgarası tekdüze |
| `/programlar/nefes-koclugu` | foto | sadece 14px CSS | **yok** | kicker+serif ✅ | gövdede tek görsel yok |
| `/programlar/reiki` | foto | sadece 14px CSS | **yok** | kicker+serif ✅ | 180px ölü bant |
| `/programlar/hipnoterapi` | foto | sadece 14px CSS | **yok** | kicker+serif ✅ | aynı |
| `/programlar/mucizeler-kursu` | foto | sadece 14px CSS | **yok** | kicker+serif ✅ | aynı |
| `/programlar/yasam-kocu` | foto | sadece 14px CSS | **yok** | kicker+serif ✅ | aynı |
| `/programlar/meridyen-terapi` | foto | 3D sahne ✅ | 3D | kicker+serif ✅ | 6 sayfanın tek farklısı — diğerlerinde karşılığı yok |
| `/the-story` | foto | sadece 14px CSS | 3D sahne | **serif YOK** | marka sayfası markasız |
| `/egitmenler` | foto | 3 hareket | baş harf kartları | kısmen serif | portre yok, kart dili jenerik |
| `/community` | foto | sadece 14px CSS | **yok** | **serif YOK** | **sitenin en zayıf sayfası** |
| `/sss` | foto | 2 hareket | **yok** | kısmen serif | akordeon dışında hiçbir şey |
| `/blog` | foto | motion var (8 kullanım) ✅ | kart görselleri | **serif YOK** | kart ızgarası jenerik, başlıklar sans |
| `/blog/[slug]` | hero yok | 1 motion | kapak | başlıkta serif ✅ | gövdede okuma tipografisi yok |
| `/on-gorusme` | özel düzen | form etkileşimi | **yok** | ayrı sistem | Tailwind dışında |
| `/kvkk` | **görsel yok** | sadece 14px CSS | yok | **serif YOK** | düz metin duvarı |
| `/privacy-terms` | **görsel yok** | sadece 14px CSS | yok | **serif YOK** | düz metin duvarı |
| `/404` | — | yok | yok | serif ✅ | ayrı palet, navigasyon yok |

**Özet:** 17 rotanın **1'i** (ana sayfa) Awwwards seviyesinde. **6'sı** iyi bir şablonun
tekrarı. **10'u** düz metin + jenerik kutu.

---

# C. ENGEL OLMAYANLAR (puan şişirmemek için)

Bunlar açık ama **gönderimi durdurmaz**; plana dahil edilmedi:

* Testimonial'ların yayında olmaması — fail-closed davranış **doğru**, jüri içerik
  azlığından ceza vermez, uydurma içerikten verir.
* Fiyat/tarih yokluğu — bilinçli karar (D042).
* Akreditasyon rozetinin kaldırılmış olması — doğru karar.
* Firefox'un çok hızlı kaydırmada son bölümü ıskalaması — motor farkı, belgelendi.
* `SideBar/on-gorusme.jpg`'nin `FormImage.jpg` kırpması olması — cila maddesi.

---

# D. PLAN

Sıra **etkiye göre**: önce jürinin ilk 10 saniyede gördüğü sistemik kırıklar, sonra
sayfa bazlı zenginleştirme. Her faz kendi başına commit edilebilir ve kendi kapısı var.

## FAZ 1 — Sistemi bağla (A1, A2, A3, A7)

Bu faz **yeni tasarım üretmez**, var olan sistemi devreye alır. En yüksek etki/çaba oranı.

1. **Renk birleştirme.** 7 bakır tonunu 3 token'a indir (`--accent-copper`,
   `-hover`, `-on-dark`); krem ailesini `--text-primary/secondary/muted`e bağla;
   zemin tonlarını `--surface-*`e. Hedef: `.tsx` içinde ham hex **764 → <80**
   (kalan: gradient dur noktaları ve tek seferlik sanat yönü kararları).
   Dosyalar: tüm `app/**/page.tsx`, `components/**`, `sections/**`.
2. **Tipografi sesi.** Gövde başlıklarını display ölçeğine taşı. Program
   sayfalarındaki `ChapterHeading` kalıbı (`CourseDetailTemplate.tsx:14`) zaten
   doğru — onu ortak bir `components/Server/SectionHeading.tsx`e çıkar ve
   `/the-story`, `/community`, `/sss`, `/kvkk`, `/privacy-terms`, `/blog`,
   `/egitmenler` gövdelerinde kullan.
3. **Tek eksen.** `--content-editorial` / `--content-wide`ı gerçekten kullan.
   `SubPageLayout` hero'sunun sol kenarı ile `main` içeriğinin sol kenarı **aynı**
   olacak. 5 farklı `max-w-*` → 2 ölçü.
4. **Hareket token'ları.** 24 ham cubic-bezier → `easing.editorial`; 20 ham duration
   → 5 token. Ölçüt: `grep -c 'duration: 0\.'` ile ham değer sayısı **<5**.

**Kapı:** `npm run verify` + `test:visual -- --update` (kasıtlı değişiklik) + a11y kontrast.

## FAZ 2 — Hareketi her tarayıcıya ve her sayfaya getir (A4, A5, A6)

5. **`ScrollReveal` bileşeni.** `animation-timeline: view()` destekleniyorsa CSS ile,
   desteklenmiyorsa `whileInView` ile aynı hareketi ver. **İçerik asla SSR'da
   gizlenmeyecek** — mevcut kural korunur: `opacity` başlangıcı 1, yalnız `transform`
   animasyonu. Böylece Safari/Firefox'ta da hareket olur, JS'siz okuma bozulmaz.
   Hareket miktarı 14px → 20-24px + hafif blur/clip; `motion-reduce`'ta kapalı.
6. **Sayfa geçişi.** `app/template.tsx` ekle: çıkışta kısa bir örtü/clip, girişte
   `easing.editorial` ile yerleşme. Lenis ile çakışmaması için geçiş sırasında scroll
   pozisyonu sıfırlanacak. Süre `duration.section` (0.9s) üstünde olmayacak —
   navigasyonu yavaşlatmak Usability'den puan götürür.
7. **İmleci siteye yay.** `Cursor.tsx`i `JourneyDesktop` dışına çıkar, layout
   seviyesine taşı; link/buton/görsel üzerinde durum değiştirsin. Dokunmatik
   cihazlarda hiç mount edilmesin.
8. `Magnetic`i CTA butonlarında kullan ya da sil. `Loader`, `DynamicLineReveal`,
   `Br`: sil.

**Kapı:** `npm run test:browsers` (3 motor) + `test:keyboard` + reduced-motion ekran görüntüsü.

## FAZ 3 — Zayıf sayfaları kaldır (A8, A9, B tablosu)

9. **Hero'yu kurtar.** Scrim dengesini yeniden ölç: fotoğraf `min-h`in %70'ine kadar
   okunur kalsın, metin bandı yerel olarak koyulaşsın (tam genişlik yerine metnin
   arkasında). Kontrast **4.5:1 taban korunacak** ve ölçülerek doğrulanacak.
   Hero altındaki 180-190px ölü bandı kapat.
10. **`/community` yeniden kurgu.** 7 eşit kutu → editoryal akış: numaralandırılmış
    bölümler, asimetrik ızgara, en az 2 fotoğraf, bir alıntı bloğu.
11. **`/kvkk` + `/privacy-terms`.** Hukuki metin ama düz duvar olmak zorunda değil:
    yapışkan içindekiler (sticky ToC), numaralı bölümler, okuma genişliği sınırı.
12. **`/blog` + `/blog/[slug]`.** Kart ızgarasını editoryal hale getir (öne çıkan
    yazı büyük, diğerleri küçük); yazı sayfasına okuma tipografisi (drop cap veya
    lead paragraf, alıntı stili, okuma ilerlemesi).
13. **`/sss`.** Akordeon dışında bir şey yok; kategori ayırıcıları ve bir kapanış
    CTA bloğu.
14. **`/404`.** Palet birleştir, NavBar + Footer ekle.
15. **`/on-gorusme`.** CSS Module'ü Tailwind + token'lara taşı (davranış aynı kalacak;
    `test:visual` bu rotayı zaten izliyor).

**Kapı:** `test:visual` kapsamını 4 rotadan **8 rotaya** çıkar (şu an
`/`, `/programlar`, `/programlar/reiki`, `/on-gorusme` — `/community`, `/the-story`,
`/blog`, `/kvkk` eklenecek).

## FAZ 4 — Performans ve son doğrulama

16. Mobil Slow 4G LCP **3244ms → <2500ms** (RELEASE-READINESS #2, hâlâ açık).
    İlk hedef hero görselleri: `SideBar/` toplam 3.3MB, en büyüğü `ana-sayfa.jpg`
    480KB. AVIF/WebP üretimi ve `sizes` daraltması.
17. Faz 1-3 sonrası tam kapı: `npm run verify:all`.
18. `docs/ART-DIRECTION-GAPS.md`ı güncelle (A12), bu dosyanın durum tablosunu kapat.

---

# E. DOĞRULAMA

Her faz sonunda çalıştırılacak, sonuçlar sayı olarak kaydedilecek:

```bash
npm run verify          # typecheck + lint + build
npm run verify:runtime  # e2e, links, images, seo, a11y, viewports, keyboard, zoom
npm run verify:browsers # chromium + firefox + webkit
npm run test:visual     # görsel regresyon (kapsam 8 rotaya çıkarılacak)
npm run test:perf       # LCP / CLS / INP / TBT
```

Faz 1 için ek ölçüt (script değil, grep):

```bash
grep -rhoiE '#[0-9a-f]{6}' --include=*.tsx app components sections | wc -l   # hedef <80
grep -rho 'var(--' --include=*.tsx app components sections | wc -l           # hedef >600
```

**Ölçüm hijyeni:** `docs/RELEASE-READINESS.md` "ÖLÇÜM HİJYENİ" bölümü geçerli —
ölçümden önce artık node/chrome süreçleri temizlenecek, yoksa yanlış alarm çıkıyor.
