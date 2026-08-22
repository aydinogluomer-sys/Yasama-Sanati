# RELEASE READINESS — Yaşama Sanatı

> Yalnız **güncel gerçeklik**. Geçmiş plan, kapanmış madde ve tarihçe burada yok;
> onlar `docs/FINAL-VERIFICATION.md` ve `docs/decisions.md` içinde.
>
> Son güncelleme: **2026-08-22** · Doğrulanan HEAD: bu dosyayı taşıyan commit
> Kapılar: `npm run verify:all` + `npm run test:browsers`

---

## SUBMISSION BLOCKER — bunlar kapanmadan gönderilmemeli

### 1. Supabase projesi duraklamış — ve ücretsiz slot dolu
`htpduorvqmidoprkkgwy` (`yasama-sanati`) durumu **INACTIVE**. Ön kayıt ve bülten
formları canlıda veri yazamaz; duraklamış proje RLS denetimine de kapalı
(bağlantı zaman aşımı).

**Geri yükleme denendi ve REDDEDİLDİ.** Supabase ücretsiz katmanı organizasyon
başına **aynı anda 2 aktif proje** veriyor ve iki slot da dolu:

| Proje | Durum |
|---|---|
| Mas Technic Site | ACTIVE_HEALTHY |
| MeritFlow | ACTIVE_HEALTHY |
| **yasama-sanati** | **INACTIVE** |
| Y Project · Alışkanlık Uygulaması | INACTIVE |

Yani bu bir "butona bas" işi değil; bir slot boşaltma kararı gerektiriyor:
diğer iki projeden biri duraklatılacak ya da hesap Pro'ya yükseltilecek.

→ **Kullanıcı kararı.** Başka bir canlı ürünü kapatmak bu çalışmanın kapsamı
dışında; karar verilmeden dokunulmadı.

### 2. Mobil LCP hedefi yalnız AĞ KISITLIYKEN karşılanmıyor
Temiz makinede 5'er koşu, medyan (yayılım), soğuk önbellek, prod build, 390×844:

| Koşul | FCP | LCP | yayılım |
|---|---|---|---|
| kısıtsız | 816 ms | **816 ms** | 584–2740 |
| 4× CPU | 728 ms | **2328 ms** | 1496–4412 |
| 4× CPU + Slow 4G | 3864 ms | **3864 ms** | 3396–4340 |

**Bu tablo daha önceki teşhisi düzeltiyor.** Bu dosyanın ilk sürümü darboğazı
"hidrasyon yükü" diye yazmıştı. Yanlış: 4× CPU tek başınayken LCP 2328 ms, yani
hedefin ALTINDA. Hedef yalnız ağ kısıtı eklenince kırılıyor.

Darboğaz kritik yoldaki **bayt toplamı**: ana sayfa ~1294 KB (JS 687 KB
ayrıştırılmış, görsel 180 KB, font 172 KB, CSS 92 KB). 1.6 Mbps'te bu ~6,5 sn'lik
bir boru demek ve ilk boya (FCP = LCP = 3864 ms) tam da bu rekabetin içinde
gerçekleşiyor.

Kaynak zaman çizelgesi (Slow 4G): HTML 303 ms · CSS 888 ms · tüm JS 2058 ms.
SSR içerik gizli DEĞİL — JS kapalıyken hero, başlık ve "ŞİFA" görünüyor;
ekranın üstünde yalnız destek paragrafı ve CTA satırı hidrasyona kadar saklı.

→ **Kod işi, ama teşhis edildiği kadar dar değil.** Çözüm hero koreografisi
değil, kritik yol bayt azaltma: JS bölme/erteleme, hero görselinin `priority`
ile diğer kaynaklarla yarışması, font alt kümeleme. Kapsamlı bir performans
çalışması; bu turda YAPILMADI ve aceleye getirilmedi.

**Ölçüm uyarısı:** ilk denemelerde FCP 5228 ve 6544 ms okundu. Bunlar makine
yüklüyken (önceki testlerden kalan onlarca node süreci) alınmıştı ve gürültüydü.
Tek koşuya güvenilmemeli; medyan + yayılım verilmeli.

### 3. Görünür sanat yönetimi çatlağı — 5 kare, hepsi ana sayfada
`ImageContainer/image-1,3,5` ve `group/mucizeler-kursu, yasam-koclugu` hâlâ
İskandinav/orman/yağmur dilinde. Marka dili Ege/Anadolu.
→ **Kullanıcı işlemi:** `docs/ART-DIRECTION-GAPS.md` içinde her kare için dosya
hedefi, oran ve prompt hazır.

### 4. `SideBar/on-gorusme.jpg` placeholder
`FormImage.jpg`'nin geçici kırpması. Menüdeki diğer 11 karenin hepsi kendi
görseline sahip.
→ **Kullanıcı işlemi:** prompt `ART-DIRECTION-GAPS.md` §6.

---

## NON-BLOCKING POLISH — gönderimi durdurmaz

- `group/reiki.jpg`, `group/nefes-koclugu.jpg`, `group/hipnoterapi.jpg` hiçbir
  bileşenden referans almıyor. Ya kullanılmalı ya silinmeli (reiki karesi ayrıca
  yanlış dilde: god-ray çam ormanı).
- Hero giriş koreografisi: gerçek içerik Slow 4G'de ~10,5 sn'ye kadar boyanmıyor;
  dekoratif "ŞİFA" konturu bunu örtüyor (ölçüm: konturu kaldırınca LCP 4296 →
  10536 ms). Kontur korunmalı; çözüm koreografiyi öne çekmek.
- `next@16` yükseltmesi: `npm audit fix` ile 12 açık 4'e indirildi (transitive
  paketler, kırıcı değişiklik yok). Kalan 4'ün üçü — `next`, `postcss`, `sharp` —
  `next@16.3.2` gerektiriyor. Breaking major olduğu için bilerek uygulanmadı;
  ayrı bir karar. Dördüncüsü (`brace-expansion`) başka bir bağımlılığın
  sabitlediği iç sürümde.
- Görsel regresyon baseline'ları yalnız yerel (font rasterleştirmesi makineye özgü).
- Repo klasörü hâlâ `Elementis-SOTD` (GitHub reposu `Yasama-Sanati`). Kodda ve
  varlık adlarında şablon izi yok; yalnız klasör adı.

---

## MANUAL CHECKS REQUIRED — otomatikleştirilemedi

Bunlar **yapılmadı** ve otomatik testmiş gibi işaretlenmemeli:

- **Ekran okuyucu:** NVDA + Firefox/Chrome, VoiceOver + Safari. axe yalnız
  makinece saptanabilir ihlalleri yakalar; okuma sırası, canlı bölge duyuruları
  ve form hata bildirimleri insan doğrulaması ister.
- **Gerçek cihaz:** iOS Safari ve Android Chrome fiziksel cihazda. WebKit ve
  Chromium motorları test edildi ama emülasyonla; dokunma hedefleri, adres
  çubuğu daralması ve `100svh` davranışı gerçek cihazda ayrı doğrulanmalı.
- **Form uçtan uca:** güvenli bir test ortamı olmadığı için gönderim akışı
  (doğrulama → server action → DB insert → başarı durumu → duplicate → rate
  limit) çalıştırılmadı. **Production DB'ye bilerek test verisi yazılmadı.**

---

## PRODUCTION CHECKS REQUIRED — canlı erişim gerektirir

- **CI'nin ilk gerçek koşusu.** `.github/workflows/quality-gate.yml` tam zinciri
  tanımlıyor (typecheck → lint → build → e2e → links → images → seo → a11y →
  viewports → keyboard → zoom → browsers) ama **hiç çalışmadı**; bu depoda `gh`
  CLI kurulu olmadığı için sonucu okunamıyor. GitHub Actions sekmesinden
  doğrulanmalı. Yeşil görülene kadar "CI passed" denemez.
- **RUM / alan verisi yok.** Bu dosyadaki tüm LCP/CLS/TBT sayıları **lab**
  ölçümüdür (localhost + emülasyon). **`p75` ifadesi kullanılamaz.**
- Search Console, Google Business, Dependabot/Renovate: hesap gerektirir.
- Supabase RLS denetimi: proje geri yüklendikten sonra `on_kayit` ve
  `newsletter_signups` için anonim insert/select/update/delete politikaları
  incelenmeli. Anon key `NEXT_PUBLIC_` olduğu için herkese açık; REST API'ye
  doğrudan istek atılabilir ve **tek koruma RLS'tir**.
- Rate limiting süreç içi `Map` — çok örnekli/serverless dağıtımda örnek başına
  çalışır. Dağıtım hedefi belirlendiğinde Redis/Upstash gerekip gerekmediği
  değerlendirilmeli.

---

## EXTERNAL BUSINESS DATA REQUIRED — uydurulamaz

Aşağıdakiler doğrulanmış olarak gelene kadar koda girmez. Bileşen ve alanlar
hazır; yalnız değer eksik.

| Konu | Nerede bekliyor |
|---|---|
| IECCERT sicil no, doğrulama URL'i, eğitim saati, değerlendirme yöntemi, örnek sertifika | `AccreditationProof` propları — tanımlı, boş |
| Eğitmenlerin akademiyle bağı, sertifikaları, deneyim yılı, gerçek portreler | `app/egitmenler/page.tsx` — şu an baş harf kullanılıyor, uydurma portre yok |
| Blog yazar kimlikleri | `utils/blogData.ts` — "Elif Kozanoğlu / Ahmet Yılmaz" adları Unsplash stok portreleriyle eşleşmiş ve bu isimler eğitmen listesinde yok. `ArticleSchema`'da `author` bu yüzden yayınlanmıyor |
| Testimonial kaynağı ve kullanım izni | 6 program dosyasındaki `testimonials` — "D. S., Mimar" gibi anonim; provenance kaydı yok. Silinmedi, uydurulmadı, "doğrulanmış" işaretlenmedi |
| Tescilli ticaret unvanı, adres, vergi/sicil | `app/privacy-terms/page.tsx` (`TODO (hukuk)`) ve `StructuredData` Organization |
| Resmî sosyal medya hesapları | `socials/index.tsx` (yalnız WhatsApp) ve `StructuredData` `sameAs`. Community sayfasındaki sahte YouTube CTA kaldırıldı |
| Fiyat ve başlangıç tarihleri | Bilerek yok; `offers` şeması da bu yüzden yayınlanmıyor |

---

## YEŞİL OLAN — doğrulanmış kapılar

```
typecheck · lint · build            geçiyor
e2e          17 rota × 3 motor      0
links        41 iç bağlantı         0 kırık, silinen rotalara kalıntı yok
images       17 rota                0 kırık görsel, 0 optimizer 4xx
seo          sitemap/robots/canonical/JSON-LD   0
a11y         17 rota × 2 viewport   0 serious+critical
viewports    8 boyut × 17 rota      0
keyboard     skip link/trap/ESC     0
zoom         WCAG 1.4.10 + 1.4.4    0
visual       4 viewport × 4 rota    0 (yerel kapı)
browsers     chromium/firefox/webkit 0
```
