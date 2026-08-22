# RELEASE READINESS — Yaşama Sanatı

> Yalnız **güncel gerçeklik**. Geçmiş plan, kapanmış madde ve tarihçe burada yok;
> onlar `docs/FINAL-VERIFICATION.md` ve `docs/decisions.md` içinde.
>
> Son güncelleme: **2026-08-22** · Doğrulanan HEAD: bu dosyayı taşıyan commit
> Kapılar: `npm run verify:all` + `npm run test:browsers`

---

## SUBMISSION BLOCKER — bunlar kapanmadan gönderilmemeli

### 1. Supabase projesi duraklamış — formlar production'da çalışmıyor
`htpduorvqmidoprkkgwy` (`yasama-sanati`) durumu **INACTIVE**. Ücretsiz katmanda
otomatik duraklama. Bu haliyle ön kayıt ve bülten formları canlıda veri yazamaz.
Ayrıca duraklamış proje RLS denetimine de kapalı (bağlantı zaman aşımı).
→ **Kullanıcı işlemi:** projeyi geri yükle, sonra RLS denetimi yapılabilir.

### 2. Mobil LCP hedefi karşılanmıyor
Slow 4G + 4× CPU, soğuk önbellek, prod build:
**LCP 3920 ms** (hedef < 2500 ms) · **TBT ~3323 ms** · CLS 0.
Ağ kısıtı olmadan bile TBT 2890 ms — darboğaz hidrasyon yükü (687 KB
ayrıştırılmış JS; React ~169 KB, Motion'a dokunan yığınlar ~274 KB).
Font ve görsel tarafı temiz; three.js mobil bundle'da yok.
→ **Kod işi.** Çözüm yolu: hero metninin giriş koreografisini öne çekmek ve
ana sayfadaki Motion bileşen sayısını azaltmak. Bu turda yapılmadı.

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
