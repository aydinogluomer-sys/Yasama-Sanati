# FINAL VERIFICATION — Bağımsız Yeniden Denetim

> **Kural:** Bu dosyadaki hiçbir satır önceki commit mesajına, eski checkbox'a veya
> "çalışıyor görünüyor"a dayanmaz. Her `DONE` bir çalıştırma çıktısına, bir runtime
> ölçümüne ya da dosya içeriğine bağlıdır. Doğrulanamayan her şey `UNVERIFIED`.
>
> Denetim tarihi: **2026-08-22**
> Denetlenen HEAD: **`9f72f03`** (origin/main ile senkron, çalışan ağaç temiz)
> Denetleyen: bu turda yapılan bağımsız tarama — önceki tur raporları kanıt sayılmadı.

---

## PHASE 1 — DENETİM SONUCU

### Özet — denetim anı (bu turun BAŞI)

```
TOPLAM MADDE   47
DONE           14
PARTIAL        11
OPEN           15
UNVERIFIED      7
```

### Özet — bu turun SONU

```
TOPLAM MADDE   47
DONE           30
PARTIAL         3
OPEN            5
UNVERIFIED      9
```

`UNVERIFIED` sayısı arttı çünkü denetim, önceki turda "tamamlandı" sayılan üç
maddenin aslında doğrulanmamış olduğunu ortaya çıkardı (CI koşusu, RUM, ekran
okuyucu). Bunları `DONE` bırakmak yerine dürüst etikete taşımak sayıyı yükseltti.

**Kapatılanlar:** V-01 (blog görsel regresyonu), B-02/B-03/B-06 (toolchain),
C-04/C-05/C-06 (e2e, links, visual), D-03/D-04/D-06 (zoom metodolojisi,
cross-browser, konsol toplama), E-02/E-03 (ağ kısıtı, soğuk önbellek),
F-02/F-03 (Firefox, WebKit), H-02..H-07 (SEO), H-10 (yanlış PARTIAL'dı),
J-05 (akreditasyon bileşeni), K-01 (mobil akış), K-05 (hero A/B), L-01 (DOM hijyeni),
ve denetim sırasında ortaya çıkan üç yeni kusur: `role="img"` ihlali,
`ScrollRevealText` kontrast tabanı, community sayfasındaki sahte YouTube CTA'sı.

**Açık kalanlar ve nedenleri** `docs/RELEASE-READINESS.md` içinde.

---

## BU TURDA ORTAYA ÇIKAN VE KAPATILAN KUSURLAR

Kapsam genişletmenin gerçek kusur bulduğu üç yer — denetimin kendisi işe yaradı:

| Kusur | Nasıl bulundu |
|---|---|
| `/blog` 7 kırık görsel, 7× HTTP 400 | runtime ölçümü; build ve iki QA kapısı da kaçırmıştı |
| `/programlar/meridyen-terapi` `role="img"` erişilebilir ad yok | a11y rota listesi 11 → 17'ye çıkınca |
| `ScrollRevealText` opaklık tabanı 0.45 → ölçülen 2.86:1 | mobil akış değişince bölüm açılış görünümüne taşındı |
| Community'de `https://youtube.com`'a giden "Kanalımızı Ziyaret Edin" | links kapısı dış bağlantıları listeleyince |
| `on-gorusme` production DOM'unda internal tooling metadata | kod denetimi |
| `StructuredData` başlığı ile çıktısı çelişiyor | kod denetimi |
| Şifa Yolculuğu 2. bölüm metni "engelleri kaldırın" | mobil akış için metin ortak kaynağa taşınırken |

Ayrıca **kendi getirdiğim iki regresyon** ölçümle yakalandı ve düzeltildi:
mobil akışın JS state ile devreye alınması (masaüstünde takas + hidrasyon
ayrışması, cross-browser kapısı yakaladı) ve `AccreditationProof` disclaimer'ının
/60 opaklıkta 4.01:1 ölçülmesi.

## ÖLÇÜM YÖNTEMİ DÜZELTMELERİ

Bu turda üç ölçüm yönteminin yanlış olduğu bulundu. Sonuçların kendisi kadar
önemli, çünkü yanlış yöntem "yeşil" gösteriyordu:

1. **Zoom.** Viewport küçültmeye "%400 zoom" deniyordu. WCAG 1.4.10 Reflow için
   320 CSS px'e inmek resmî eşdeğerdir ve doğrudur; ama WCAG 1.4.4 Resize Text
   (yalnız yazı %200) bununla HİÇ simüle edilmez. Eksik olan oydu, eklendi.
2. **Performans.** CPU kısıtı vardı, ağ kısıtı yoktu. "Mid-range mobile" iddiası
   bu yüzden eksikti: gerçekçi koşulda LCP 1668 ms değil **3920 ms**.
3. **Scroll-linked motion.** Programatik `window.scrollTo` ile ölçmek Lenis
   yüzünden Firefox'ta "bölüm bozuk" sonucu veriyordu. Gerçek tekerlek girdisiyle
   üç motor da doğru çalışıyor. Yanlış yöntem burada **yanlış alarm** üretti.

**Bu turda ortaya çıkan en önemli bulgu bir regresyondur** (V-01): önceki turda
"iyileştirme" olarak yapılan bir değişiklik `/blog` ve `/blog/[slug]` rotalarındaki
tüm uzak görselleri kırmış, ve o turun QA kapıları bunu yakalamamıştır.

---

> **Aşağıdaki tabloların STATUS sütunu denetim ANINA aittir** (bu turun başı) —
> kasıtlı olarak dondurulmuştur, çünkü bu dosyanın işlevi "neyi bulduk"tur.
> Bunların hangilerinin kapandığı yukarıdaki *Kapatılanlar* listesinde,
> güncel açık durum ise `docs/RELEASE-READINESS.md` içindedir.

## A. REGRESYONLAR

### V-01 — `/blog` görselleri kırık · STATUS: **OPEN — P0 REGRESYON**

**Current state.** `next.config.ts`'ten `images.remotePatterns` içindeki
`images.unsplash.com` kaydı önceki turda "kodda hiçbir yerde uzak görsel
kullanılmıyor" gerekçesiyle kaldırıldı (commit `14c7ef1`). Bu gerekçe **yanlıştı**:
`utils/blogData.ts` içinde 10 adet `https://images.unsplash.com/...` URL'i var ve
bunlar `BlogCard.tsx`, `BlogDetailContent.tsx`, `BlogPageContent.tsx` içinde
`next/image` ile render ediliyor.

**Evidence.** Prod build + `next start -p 3400`, Playwright/Chrome ölçümü:

```
=== /blog ===
  <img> toplam: 9   YUKLENEMEYEN: 7
  /_next/image istekleri: 7  hatali(>=400): 7
     400  /_next/image?url=https://images.unsplash.com/photo-1447752875215-...
  konsol hatasi: 7 -> Failed to load resource: 400 (Bad Request)

=== /blog/sifa-bir-teknik-degildir-butunsel-saglik ===
  <img> toplam: 6   YUKLENEMEYEN: 2
  /_next/image istekleri: 4  hatali(>=400): 4
```

**Neden build yakalamadı.** `next/image` uzak host doğrulamasını **istek anında**
yapar, derleme anında değil. `npm run build` 27/27 sayfayı üretti ve hata vermedi.

**Neden QA kapıları yakalamadı.** `qa/a11y.mjs` rota listesinde `/blog` **var**, ama
axe kırık görseli ihlal saymaz (alt metni doğru olan bir `<img>` a11y açısından
geçerlidir) ve script konsol hatası toplamıyor. `qa/viewports.mjs` konsol hatası
topluyor ama rota listesinde `/blog` **yok**. İki kapı da tek tek doğru çalıştı;
kesişimleri boştu.

**Action required.** (1) remote pattern geri gelmeli veya görseller yerelleşmeli,
(2) `viewports` rota listesi tüm rotaları kapsamalı, (3) kırık görsel kontrolü
kalıcı bir teste dönüşmeli.

---

## B. BUILD / TOOLCHAIN

| Item | Current state | Evidence | Status | Action |
|---|---|---|---|---|
| B-01 Next sürümü | `next@15.5.23` kurulu | `node -e require(...)` → 15.5.23 | **DONE** | — |
| B-02 eslint-config-next skew | `eslint-config-next@15.2.2`, sabitlenmiş (caret yok) | package.json + kurulu sürüm 15.2.2 | **OPEN** | Next ile hizala |
| B-03 `next lint` deprecated | `"lint": "next lint"` | `npm run lint` çıktısı: *"`next lint` is deprecated and will be removed in Next.js 16"* | **OPEN** | ESLint CLI'ya geç |
| B-04 typecheck | `tsc --noEmit` hatasız | çalıştırıldı, çıktı boş | **DONE** | — |
| B-05 build | 27/27 sayfa, exit 0 | `npm run build` | **DONE** | — |
| B-06 `verify:all` adı yanıltıcı | yalnız `typecheck && lint && build` | package.json satır oku | **OPEN** | Gerçekten hepsini çalıştır |
| B-07 npm audit kalan | 4 high, `next@16` gerektiriyor | önceki tur; bu turda yeniden çalıştırılmalı | **UNVERIFIED** | Yeniden ölç |

---

## C. CI

| Item | Current state | Evidence | Status | Action |
|---|---|---|---|---|
| C-01 workflow dosyası | `quality-gate.yml` mevcut | dosya okundu | **DONE** | — |
| C-02 gerçek workflow run | **hiç çalışmadı** — bu push CI'nin ilk tetiklenişi; `gh` CLI kurulu değil, sonuç okunamıyor | — | **UNVERIFIED** | Actions sekmesinden doğrula |
| C-03 `qa/` CI'da erişilebilir | önceki turda `.git/info/exclude` ile gizliydi, kaldırıldı ve commit'lendi | `git ls-files qa/` | **DONE** | — |
| C-04 E2E smoke | **yok** | `test:e2e` script'i yok | **OPEN** | Oluştur |
| C-05 broken-link testi | **yok** | `test:links` yok | **OPEN** | Oluştur |
| C-06 visual regression | **yok** | baseline yok | **OPEN** | Oluştur |
| C-07 silinen rotalara link | temiz | 7 eski rota tarandı, 0 referans | **DONE** | — |

---

## D. ACCESSIBILITY

| Item | Current state | Evidence | Status | Action |
|---|---|---|---|---|
| D-01 axe serious/critical | 0 | `npm run test:a11y` → `Toplam bulgu: 0` (11 rota × 2 viewport) | **DONE** | — |
| D-02 skip link / focus trap / ESC | geçiyor | `npm run test:keyboard` → `sorun: 0` | **DONE** | — |
| D-03 %200 / %400 zoom | **gerçek zoom DEĞİL** — `qa/keyboard.mjs:96` viewport'u 720×450 / 360×225'e küçültüyor | kod okundu | **PARTIAL** | Gerçek `deviceScaleFactor`/zoom ile ölç |
| D-04 Chromium dışı a11y | yalnız Chromium/Chrome | tüm qa scriptleri `chromium.launch` | **OPEN** | Firefox + WebKit ekle |
| D-05 screen reader (NVDA/VoiceOver) | hiç yapılmadı | — | **UNVERIFIED** | `MANUAL QA REQUIRED` |
| D-06 konsol hatası toplama | a11y script'i toplamıyor | kod okundu | **PARTIAL** | V-01'i kaçıran boşluk |

---

## E. PERFORMANCE

| Item | Current state | Evidence | Status | Action |
|---|---|---|---|---|
| E-01 CPU throttling | var (4×) | `qa/mainthread.mjs:25` `Emulation.setCPUThrottlingRate` | **DONE** | — |
| E-02 network throttling | **yok** | scriptte ağ kısıtı yok → "mid-range mobile" iddiası eksik | **OPEN** | Slow 4G ekle |
| E-03 cold cache | belirsiz — her context yeni ama service worker/HTTP cache durumu ölçülmedi | — | **PARTIAL** | Açıkça kur |
| E-04 lab LCP | masaüstü 2328 ms / mobil 4× 1668 ms (localhost, ağ kısıtsız) | önceki tur ölçümü | **PARTIAL** | Slow 4G ile yeniden |
| E-05 p75 / RUM | **yok** | analytics entegrasyonu yok | **UNVERIFIED** | `RUM NOT VERIFIED` |
| E-06 ilk yüklemede WebGL | mount edilmiyor; mobil ve reduced-motion'da hiç yüklenmiyor | `TherapyScene3DWrapper.tsx:33`, `MeridianSceneWrapper.tsx:26` | **DONE** | — |

> **Terminoloji uyarısı:** bu dosyadaki tüm LCP sayıları **lab** ölçümüdür
> (localhost, prod build). `p75` ifadesi hiçbir yerde kullanılmamalıdır — alan verisi yok.

---

## F. CROSS-BROWSER

| Item | Status | Note |
|---|---|---|
| F-01 Chromium | **DONE** | tüm QA kapıları burada koştu |
| F-02 Firefox | **OPEN** | hiç çalıştırılmadı |
| F-03 WebKit / Safari | **OPEN** | hiç çalıştırılmadı |
| F-04 iOS Safari gerçek cihaz | **UNVERIFIED** | `MANUAL QA REQUIRED` |
| F-05 Android Chrome gerçek cihaz | **UNVERIFIED** | `MANUAL QA REQUIRED` |

Önceki turda "Safari/Firefox QA — bu ortamda tarayıcı yok" denmişti. Bu doğru
değil: Playwright `firefox` ve `webkit` motorlarını indirebilir. Denenmemiş.

---

## G. FORM / SUPABASE

| Item | Current state | Evidence | Status | Action |
|---|---|---|---|---|
| G-01 honeypot | var | `actions.ts:90`, `ConsultationExperience.tsx:364` | **DONE** | — |
| G-02 sunucu tarafı doğrulama | var | `actions.ts` | **DONE** | — |
| G-03 rate limiting | süreç içi `Map` | `utils/rate-limit.ts:16,18` | **PARTIAL** | Çok örnekli dağıtımda çalışmaz |
| G-04 duplicate önleme | var (10 dk penceresi) | `actions.ts` | **DONE** | — |
| G-05 RLS politikaları | repoda **policy/migration dosyası yok** (`supabase/`, `migrations/` dizini yok) | find taraması | **UNVERIFIED** | `RLS CANNOT BE VERIFIED FROM REPOSITORY` |
| G-06 Supabase projesi ayakta mı | **INACTIVE (duraklamış)** | MCP `list_projects` → `htpduorvqmidoprkkgwy` status `INACTIVE`; `list_tables` bağlantı zaman aşımı | **OPEN — P0** | Production'da formlar şu an çalışmıyor |
| G-07 form E2E | yapılmadı; güvenli test ortamı yok | — | **UNVERIFIED** | Production DB'ye test verisi yazılmadı (bilinçli) |

> Anon key `NEXT_PUBLIC_` olduğu için herkese açıktır; REST API'ye doğrudan istek
> atılabilir. Tek koruma RLS'tir ve bu repodan doğrulanamamaktadır.

---

## H. SEO

| Item | Current state | Evidence | Status | Action |
|---|---|---|---|---|
| H-01 Organization / Course / FAQPage JSON-LD | var | `StructuredData.tsx` | **DONE** | — |
| H-02 yorum ↔ çıktı tutarlılığı | **çelişiyor**: dosya başlığı "adres Organization'da yer almıyor" diyor, kod `addressLocality: "İzmir"` yayınlıyor | `StructuredData.tsx:6` vs `:34-38` | **OPEN** | Tek gerçeğe indir |
| H-03 sitemap blog slug'ları | **eksik** — `ROUTES` sabit listesi, blog dışarıda | `app/sitemap.ts` | **OPEN** | `BLOG_POSTS`'tan üret |
| H-04 `lastModified` | her build'de `new Date()` → tüm rotalar hep "yeni" | `app/sitemap.ts` | **OPEN** | Gerçek tarih kullan |
| H-05 BreadcrumbList | yok | tarama | **OPEN** | Ekle |
| H-06 Person JSON-LD | yok | tarama | **OPEN** | Yalnız doğrulanmış eğitmen verisiyle |
| H-07 Article JSON-LD | yok | tarama | **OPEN** | Blog için ekle |
| H-08 `sameAs` | yok | gerçek profil URL'i bilinmiyor | **UNVERIFIED** | Sosyal hesap URL'i gerekli |
| H-09 robots | geçerli | `app/robots.ts` | **DONE** | — |
| H-10 per-route canonical | yalnız `metadataBase` var, sayfa bazlı `alternates.canonical` yok | `app/layout.tsx:43` | **PARTIAL** | Ekle |

---

## I. ART DIRECTION

Üretim görselleri kontak sayfası olarak görsel denetimden geçirildi (12 kare).

**Doğru dil (Ege / Anadolu / taş / keten / terracotta / sıcak ışık):**
`Hero/hero-desktop.jpg`, `ImageContainer/image-4.jpg` (mum + terracotta duvar),
`group/nefes-koclugu.jpg`, `group/meridyen-terapi.jpg`, `group/hipnoterapi.jpg`

**Uyumsuz dil (temperate / İskandinav / orman / yağmurlu ahşap):**

| Dosya | Sorun |
|---|---|
| `public/ImageContainer/image-1.jpg` | yoğun yeşil orman bokeh'i |
| `public/ImageContainer/image-3.jpg` | yağmurlu pencere + arkada orman |
| `public/ImageContainer/image-5.jpg` | büyük pencerede sık yeşil orman, Nordic retreat |
| `public/group/reiki.jpg` | **god-ray çam ormanı** — brief'in açıkça yanlış saydığı kare |
| `public/group/mucizeler-kursu.jpg` | yeşil boyalı pencere çerçevesi, yağmur |
| `public/group/yasam-koclugu.jpg` | yağmurlu ahşap pencere |

**STATUS: PARTIAL** — 12 karenin 6'sı yanlış dilde. Yeni asset üretimi kullanıcıya
ait; bu dosyada sahte final asset üretilmedi.

| Item | Status |
|---|---|
| I-01 tek sanat yönetimi | **PARTIAL** — 6 kare değişmeli |
| I-02 `SideBar/on-gorusme.jpg` | **PLACEHOLDER — USER ASSET REQUIRED** (FormImage.jpg'nin geçici kırpması; 255 KB vs 516 KB, aynı kaynak) |
| I-03 şablon soyağacı görünürlüğü | **DONE** — kodda/asset adlarında "elementis" izi yok, `sections/AkademiHikayesi/`, rotalar temiz |

---

## J. CONTENT / TRUST

| Item | Current state | Evidence | Status | Action |
|---|---|---|---|---|
| J-01 sağlık iddiaları | 22 konum geleneksel çerçeveye çevrildi | `git show eac7c33`, tarama temiz | **DONE** | — |
| J-02 kontrendikasyon listeleri | bilerek korundu (güvenlik bilgisi) | meridyen-terapi SSS | **DONE** | — |
| J-03 akreditasyon: IECCERT | `PRODUCT.md:33` IECCERT'i **tek doğrulanmış** iddia sayıyor; kodda yalnız Meridyen Terapi'de geçiyor | tarama | **DONE** | — |
| J-04 isimsiz "uluslararası akredite" | temizlenmiş | tarama, kalıntı yok | **DONE** | — |
| J-05 akreditasyon kanıt bileşeni | yok (kurum/no/saat/değerlendirme/doğrulama URL'i alanları) | tarama | **OPEN** | `REQUIRES VERIFIED BUSINESS DATA` |
| J-06 eğitmen portreleri | portre **yok**, baş harf kullanılıyor — uydurma portre yok, dürüst | `egitmenler/page.tsx` `initial` alanı | **DONE** | — |
| J-07 eğitmen kimlik doğrulaması | 5 gerçek kamusal isim listeleniyor; bu akademiyle bağları repodan doğrulanamaz | — | **UNVERIFIED** | `REQUIRES VERIFIED BUSINESS DATA` |
| J-08 blog yazar kimlikleri | **`Elif Kozanoğlu` "Kurucu & Eğitmen" ve `Ahmet Yılmaz` adları Unsplash stok portreleriyle eşleştirilmiş**; bu isimler eğitmen listesinde yok | `utils/blogData.ts` avatar URL'leri | **OPEN** | Uydurma kimlik — çözülmeli |
| J-09 testimonial provenance | `"D. S., Mimar"` gibi anonim; kaynak/izin kaydı yok | 6 program dosyası | **OPEN** | `TESTIMONIAL PROVENANCE REQUIRED` |
| J-10 fiyat | yok (bilinçli) | tarama | **DONE** | — |

---

## K. UX / MOBILE

| Item | Current state | Evidence | Status | Action |
|---|---|---|---|---|
| K-01 mobile Şifa Yolculuğu | **masaüstüyle aynı** `h-[360vh]` sticky dizi; `isMobile` yalnız `router.push` ve `CustomCursor`'ı kapatıyor | `Innovation.tsx:50,64,90` | **OPEN** | Mobile'a özel akış |
| K-02 reduced-motion akışı | belge akışına dönüyor, 5 kart erişilebilir | `motion-reduce:h-auto` + ölçüm | **DONE** | — |
| K-03 bölümü atlama çıkışı | var, klavyeyle görünür | `Innovation.tsx:57` | **DONE** | — |
| K-04 Innovation scroll offset | `485vh` doğru; 345vh denemesi ölçümle geri alındı | D070 + 80 adımlık tarama | **DONE** | — |
| K-05 hero LCP öğesi | dekoratif "ŞİFA" kontur katmanı; ~1,2 sn'de siliniyor | önceki tur profili | **PARTIAL** | A/B ölçümü yapılmadı |
| K-06 3D mobil/WebGL fallback | mobilde ve reduced-motion'da WebGL hiç mount edilmiyor | iki wrapper dosyası | **DONE** | — |

---

## L. PRODUCTION DOM HİJYENİ

| Item | Current state | Evidence | Status |
|---|---|---|---|
| L-01 internal tooling metadata | `app/on-gorusme/page.tsx` production DOM'una `data-impeccable-contract` attribute'u ve `DIRECTION_CONTRACT` metnini gizli HTML yorumu olarak gönderiyor | satır 11-12, 62, 64 | **OPEN** |

---

## SONRAKİ FAZLAR

Uygulama sırası (§22):

```
PHASE 2  Engineering correctness   V-01, B-02, B-03, B-06, L-01
PHASE 3  Accessibility / browser   D-03, D-04, C-04, C-05, C-06
PHASE 4  Production performance    E-02, E-03, E-04
PHASE 5  Form / Supabase           G-05, G-06
PHASE 6  SEO                       H-02..H-07, H-10
PHASE 7  Art direction             I-01, I-02
PHASE 8  Content trust             J-05, J-08, J-09
PHASE 9  Mobile journey            K-01
PHASE 10 Creative / jury polish    K-05
PHASE 11 Final regression          tüm kapılar
```
