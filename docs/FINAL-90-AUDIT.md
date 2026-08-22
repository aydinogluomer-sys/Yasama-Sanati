# FINAL 90–94 AUDIT — Bağımsız Yeniden Denetim

> Önceki tur raporları ve commit mesajları **kanıt sayılmadı**. Her satır bu turda
> `main` üzerinde yeniden ölçüldü.
>
> Denetlenen HEAD: **`78fbf49`** · Tarih: **2026-08-22** · Ağaç temiz, origin senkron

## ÖZET

**Denetim anı (bu turun başı):**

```
TOPLAM            32
DONE               8
PARTIAL            5
OPEN              10
UNVERIFIED         4
BLOCKED_EXTERNAL   5
```

**Tur sonu:**

```
TOPLAM            32
DONE              21
PARTIAL            3
OPEN               1
UNVERIFIED         3
BLOCKED_EXTERNAL   4
```

**Kapatılanlar:** A-01..A-11 (blog + cihaz iddiaları) · B-01 (blog kimlikleri) ·
B-06 (testimonial fail-closed) · B-07/B-08 (IECCERT — dış kaynaktan doğrulandı,
yanlış kurum adı ve kategori uyuşmazlığı bulundu, public iddia kaldırıldı) ·
C-01/C-02 (journey gerçek split) · C-07 (5 koşu + medyan) · D-01 (otomatik rota
keşfi, 17→21) · D-02 (script adları) · D-04 (BASELINE MISSING) · F-06 (ölü asset).

**Açık kalan tek repo-içi madde:** C-03/C-06 — mobil Slow 4G LCP 3244 ms, hedef
<2500 ms. Kritik yol bayt azaltma ayrı ve derin bir çalışma.

**Doğrulanamayan (dış):** D-03 (CI gerçek koşusu — `gh` yok), E-02 (RLS — proje
kapalı), E-05 (deployment parity — domain erişimi yok).

**Dış veriye bağlı:** B-03 (eğitmen ilişkisi), akreditasyon kanıtı, testimonial
izinleri, F-04 (5 görsel).

**Bu denetimin en önemli bulgusu:** önceki turda "sağlık iddiaları temiz" diye
raporladım. **Değildi.** Taramalarım `app components data` yollarını geziyordu;
`utils/` hiç kapsamda değildi ve blog içeriği orada duruyor. Bu, `/blog` görsel
regresyonuyla **birebir aynı sınıf hata**: kusur değil, taramanın kapsamı yanlıştı.

---

## A. CONTENT CREDIBILITY

| ITEM | CURRENT STATE | EVIDENCE | RISK | STATUS | ACTION |
|---|---|---|---|---|---|
| A-01 `utils/blogData.ts` kortizol iddiası | "kortizol (stres) seviyenizi **yarı yarıya indirecektir**" | satır 80 | **Yüksek** — nicel, kaynaksız fizyolojik iddia | **OPEN** | Kaldır/çerçevele |
| A-02 toksin atımı | "hücresel düzeyde **toksin atımını hızlandırır**" | satır 48 | Yüksek | **OPEN** | Kaldır |
| A-03 organ fonksiyonu | "Qi'yi dengeleyerek **organların fonksiyonlarını düzenler**" | satır 49 | Yüksek | **OPEN** | Geleneksel çerçeve |
| A-04 homeostaz | "kendi kendini iyileştirme gücünü (**homeostazis**) harekete geçirir" | satır 46 | Orta-yüksek | **OPEN** | Yeniden yaz |
| A-05 kronik ağrı nedenselliği | travma → "meridyen kanallarında **blokajlara** yol açar" → "**kronik ağrılar** baş gösterir" | satır 110 | Yüksek | **OPEN** | Geleneksel çerçeve |
| A-06 mutlak nedensellik | "**Her fiziksel semptom**, enerjetik bir tıkanıklığın dışa vurulmuş çığlığıdır" | satır ~113 | Yüksek | **OPEN** | Kaldır |
| A-07 sonuç vaadi | "kronik ağrılardan **arındığı**, uyku kalitesinin **arttığı**" | satır 125 | Yüksek | **OPEN** | Deneyim aktarımına çevir |
| A-08 modern tıp karşıtlığı | "Modern tıp **semptomları bastırmaya** odaklanırken" | satır 24, 34 | Orta | **OPEN** | Yumuşat |
| A-09 cihaz mutlak güvenlik | "Meridyen Terapi Cihazı **tamamen güvenli** bir üründür" | `meridyen-terapi/page.tsx:78` | **Yüksek** | **OPEN** | Mutlak ifade kalkmalı |
| A-10 cihaz sertifika iddiası | "kalite uygunluk belgesi ile **tasdiklidir**" | aynı satır | Yüksek — doğrulanamaz | **OPEN** | Kaldır veya kanıtla |
| A-11 "fizyoterapi etkisi" / "biyoakım" | üretici pazarlama dili | satır 70, 82, 98 | Orta | **PARTIAL** | Çerçevele |
| A-12 nefes müfredat "Blokajlar" | nefes kısıtını **tespit** etme yöntemi | `nefes-koclugu:35` | Düşük | **DONE** | Dokunulmaz |
| A-13 `TherapyScene3D` somatik ifadeler | "kronik boğaz gerginliği" vb. | satır 54, 66, 102 | Düşük-orta | **PARTIAL** | Sınır notu var (bu turda eklendi) |
| A-14 program sayfası iddiaları | "hücresel düzeyde", "blokajları kaldırma", "teşhis etmeyi" | önceki turda düzeltildi | — | **DONE** | Doğrulandı, kalıntı yok |

---

## B. TRUST / IDENTITY

| ITEM | CURRENT STATE | EVIDENCE | RISK | STATUS | ACTION |
|---|---|---|---|---|---|
| B-01 Blog yazar kimliği | "Elif Kozanoğlu — Kurucu & Eğitmen", "Ahmet Yılmaz" + **Unsplash stok portre** | `blogData.ts` author alanları | **Yüksek** — gerçek kişi adı + stok portre | **OPEN** | Kurumsal atıfa çevir |
| B-02 `ArticleSchema` author | bilerek yayınlanmıyor | `StructuredData.tsx` | — | **DONE** | — |
| B-03 Eğitmen ilişkisi | 5 gerçek kamusal isim "Eğitmenlerimiz" altında; akademiyle bağı repodan doğrulanamıyor | `egitmenler/page.tsx` | **Yüksek** | **BLOCKED_EXTERNAL** | Veri yoksa yayından kaldır |
| B-04 Eğitmen portresi | portre yok, baş harf kullanılıyor | aynı dosya | Düşük | **DONE** | Uydurma portre yok |
| B-05 Person schema | eklenmedi | tarama | — | **DONE** | — |
| B-06 Testimonial provenance | "D. S., Mimar", "Z. A." — izin/kaynak kaydı yok | 6 program dosyası | Orta-yüksek | **OPEN** | `publishable` modeli veya kaldır |
| B-07 IECCERT kurum adı | "International Energy & Complementary Medicine Certification" açılımı kullanılıyor | `AccreditationProof` çağrısı | Orta | **UNVERIFIED** | Resmî kaynaktan doğrulanamadı |
| B-08 IECCERT program kapsamı | "IECCERT onaylı" kesin bilgi gibi yayınlanıyor | `meridyen-terapi` metadata + Course schema | **Yüksek** | **UNVERIFIED** | Program-özel kanıt yok |
| B-09 Sosyal hesap | yalnız WhatsApp; sahte YouTube CTA'sı kaldırıldı | `socials/index.tsx` | Düşük | **DONE** | — |

---

## C. PERFORMANS / BUNDLE

| ITEM | CURRENT STATE | EVIDENCE | RISK | STATUS | ACTION |
|---|---|---|---|---|---|
| C-01 Journey code splitting | **Masaüstü ve mobil journey AYNI chunk'ta.** `page-*.js` (56 KB) hem `ClipImageCard/485vh` hem `JOURNEY_CHAPTERS` içeriyor | runtime chunk içerik taraması | **Yüksek** | **OPEN** | Gerçek split |
| C-02 CSS gizleme yanılgısı | `md:hidden` / `hidden md:block` yalnız görünürlük; JS inip hidrate oluyor | C-01 kanıtı | Yüksek | **OPEN** | — |
| C-03 Mobil ilk yük JS | **212 KB** (encoded) | resource timing toplamı | Orta | **PARTIAL** | Azalt |
| C-04 three.js / R3F mobilde | **yok** — lazy çalışıyor | chunk taraması | — | **DONE** | — |
| C-05 Lenis | `layout-*.js` (19 KB) içinde, ilk yükte | chunk taraması | Orta | **PARTIAL** | Gereklilik ölç |
| C-06 Slow 4G LCP | önceki ölçüm 3864 ms medyan (5 koşu) | `qa/perf.mjs` | Yüksek | **OPEN** | Split sonrası yeniden ölç |
| C-07 perf ölçüm yöntemi | tek koşu; medyan/yayılım yok | `qa/perf.mjs` | Orta | **OPEN** | 5 koşu + medyan |

---

## D. QA / CI

| ITEM | CURRENT STATE | EVIDENCE | RISK | STATUS | ACTION |
|---|---|---|---|---|---|
| D-01 Rota keşfi | `qa/routes.mjs` **elle** yazılmış; blog'dan yalnız **1** slug var (5 yazı mevcut) | dosya + `BLOG_POSTS` | **Yüksek** — `/blog` regresyonuyla aynı sınıf | **OPEN** | Otomatik keşif |
| D-02 `verify:all` kapsamı | browsers ve perf dahil değil | `package.json` | Orta | **OPEN** | Yeniden adlandır/kapsa |
| D-03 E2E × tarayıcı iddiası | E2E yalnız Chromium'da 17 rota; 3 motorda **özellik smoke**'u var | `qa/e2e.mjs`, `qa/browsers.mjs` | Orta — dokümantasyon abartıyor | **OPEN** | Ya matris ya doğru ifade |
| D-04 Görsel regresyon | baseline yoksa **oluşturup PASS** veriyor | `qa/visual.mjs` | Orta | **OPEN** | `BASELINE MISSING` durumu |
| D-05 CI gerçek koşu | workflow tanımlı, YAML geçerli (17 adım); `gh` yok, koşu sonucu okunamıyor | — | Orta | **UNVERIFIED** | Actions'tan doğrula |
| D-06 Kapılar (a11y/e2e/links/images/seo/viewports/keyboard/zoom/visual/browsers) | hepsi 0 | bu turda koşuldu | — | **DONE** | — |

---

## E. PRODUCTION / ALTYAPI

| ITEM | CURRENT STATE | EVIDENCE | RISK | STATUS | ACTION |
|---|---|---|---|---|---|
| E-01 Supabase | INACTIVE; proje sahibi "backend gerekmiyor" dedi | MCP `list_projects` | — | **BLOCKED_EXTERNAL** | Vitrin kararı kayıtlı |
| E-02 RLS | proje kapalı, denetlenemiyor | bağlantı zaman aşımı | Orta | **BLOCKED_EXTERNAL** | `RLS UNVERIFIED` |
| E-03 Rate limiting | süreç içi `Map`; serverless'ta örnek başına | `utils/rate-limit.ts` | Orta | **OPEN** | Adapter arayüzü |
| E-04 Form hata davranışı | POST 200 → 535 ms → `role="alert"` nazik mesaj | ölçüldü | Düşük | **DONE** | — |
| E-05 Deployment parity | production domain erişimi yok | — | — | **UNVERIFIED** | — |
| E-06 npm audit | 4 high (`next`,`postcss`,`sharp`,`brace-expansion`); üçü `next@16` istiyor | `npm audit` | Orta | **PARTIAL** | Major upgrade ayrı karar |

---

## F. ART DIRECTION

| ITEM | CURRENT STATE | STATUS |
|---|---|---|
| F-01 Alt sayfa hero'ları | 11 sayfaya `SideBar/` kareleri hero olarak bağlandı; kontrast ölçülerek scrim ayarlandı | **DONE** |
| F-02 `SideBar/` ailesi | 12/12 doğru dilde | **DONE** |
| F-03 Ana sayfa iki kare | sıcak derecelendirme uygulandı | **DONE** |
| F-04 `ImageContainer/image-1,3,5` | orman/Nordic — derecelendirme yetmez, yeni üretim gerekli | **BLOCKED_EXTERNAL** |
| F-05 `group/mucizeler-kursu`, `group/yasam-koclugu` | derecelendirildi ama konu hâlâ yağmurlu pencere | **PARTIAL** |
| F-06 Ölü asset | `group/reiki`, `group/nefes-koclugu`, `group/hipnoterapi` hiç render edilmiyor | **OPEN** |
| F-07 `SideBar/on-gorusme.jpg` | `FormImage.jpg` kırpması; dili doğru, sorun tekrar | **PARTIAL** |

---

## UYGULAMA SIRASI

```
PHASE A  Content credibility    A-01..A-11
PHASE B  Trust / identity       B-01, B-06, B-07, B-08, B-03
PHASE C  QA doğruluğu           D-01, D-02, D-03, D-04
PHASE D  Performans             C-01, C-02, C-03, C-06, C-07
PHASE E  Art direction / temizlik F-06
PHASE F  Regresyon + dokümanlar
```
