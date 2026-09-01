# RELEASE READINESS — Yaşama Sanatı

> Yalnız **güncel gerçeklik**. Geçmiş plan, kapanmış madde ve tarihçe burada yok;
> onlar `docs/FINAL-VERIFICATION.md` ve `docs/decisions.md` içinde.
>
> Son güncelleme: **2026-08-22** · Doğrulanan HEAD: bu dosyayı taşıyan commit
> Kapılar: `npm run verify:all` + `npm run test:browsers`

---

## SUBMISSION BLOCKER — bunlar kapanmadan gönderilmemeli

> 1. madde 2026-08-22'de kapandı; numaralandırma tarihsel tutuldu.

### ~~1. Supabase~~ — KAPANDI: backend gerekmiyor (proje sahibi kararı, 2026-08-22)

Site bir **vitrin** olarak yayınlanıyor; form gönderimlerinin veri yazması
beklenmiyor. `yasama-sanati` projesi INACTIVE kalacak. (Zaten geri
yüklenemiyordu: ücretsiz katmanın 2 aktif proje slotu *Mas Technic Site* ve
*MeritFlow* tarafından dolu ve başka bir canlı ürünü kapatmak bu işin kapsamı
dışındaydı.)

**Formların bu haldeki davranışı ölçüldü** — sessizce kırılmıyorlar:

```
POST (server action)        HTTP 200
geri bildirim               535 ms
kullanıcının gördüğü        role="alert" → "Kayıt sırasında bir hata oluştu.
                            Lütfen tekrar deneyin."
```

Donma yok, ham hata yok, çökme yok; mesaj erişilebilir bir uyarı bölgesinde ve
yarım saniyede geliyor. `utils/supabase.ts` yapılandırma yoksa `null` dönüyor ve
`app/actions.ts` her hata yolunda kullanıcı-güvenli Türkçe mesaj veriyor.

Keepalive workflow'unun **zamanlaması kapatıldı**: duraklamış bir API'yi haftada
iki kez yoklayıp her seferinde başarısız bildirim üretecekti. İş elle
tetiklenebilir olarak duruyor; backend tekrar gerekirse cron satırı geri açılır.

**Kalan not:** ziyaretçi formu doldurup hata mesajı alıyor. Vitrin için kabul
edilebilir ama ideal değil — formların tamamen kaldırılması ya da "şu an kayıt
alınmıyor" gibi baştan dürüst bir duruma çevrilmesi ayrı bir karar. Proje
sahibinin talebi olmadan içeriğe dokunulmadı.

### 2. Mobil LCP hedefi hâlâ karşılanmıyor (ama iyileşti)

5 koşu medyanı, soğuk önbellek, prod build, 390×844 — **LAB ölçümü, p75 DEĞİL**:

| Koşul | LCP medyan | yayılım | TBT medyan |
|---|---|---|---|
| masaüstü kısıtsız | 684 ms | 592–2136 | 68 ms |
| mobil 4× CPU | 1052 ms | 892–1476 | 2786 ms |
| **mobil 4× CPU + Slow 4G** | **3244 ms** | 3032–3660 | 3021 ms |

**Önceki baseline** (2026-08-22, HEAD `78fbf49`): Slow 4G LCP 3864 ms · TBT 3323 ms.
**Delta:** LCP −620 ms (%16) · TBT −302 ms.

> Uyarı: iki ölçüm farklı HEAD'lerde ve aralarında içerik değişiklikleri de var.
> Bu, journey split'inin tek başına etkisinin kontrollü bir A/B'si **değildir**.

Journey runtime'ı mobil/masaüstü olarak gerçekten ayrıldı (CSS gizleme JS'i
bundle'dan çıkarmıyordu). Mobil artık masaüstü journey chunk'ını indirmiyor —
ama **bayt kazancı yok** (212 KB → 212 KB): modül küçük ve ağır bağımlılıkları
zaten paylaşımlı. Kazanç hidrasyon işinde.

Kalan darboğaz: kritik yoldaki toplam bayt (~1301 KB mobil) ve React+Motion
hidrasyon maliyeti. <2500 ms için daha derin bir bundle çalışması gerekir.

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

## ÖLÇÜM HİJYENİ — yanlış alarm kaynağı

Kapılar arka arkaya koşturulduğunda makinede **node ve chrome süreçleri birikiyor**
(gözlenen: 14 node + 20 chrome). Bu birikim iki kez SAHTE başarısızlık üretti:

| Belirti | Görünen | Gerçek sebep |
|---|---|---|
| `ERR_INSUFFICIENT_RESOURCES` | viewport kapısı 1 hata | tarayıcı kaynak tükenmesi |
| `THREE.WebGLProgram: Shader Error — VALIDATE_STATUS false` (`/the-story`, 1366×768) | viewport kapısı 1 hata | ~20 eşzamanlı Chrome GPU bağlamını tüketiyor |

İkisi de süreçler temizlenip tekrar koşulduğunda **sıfır** verdi; `/the-story`
izole edildiğinde 3 turda da canvas yükleniyor ve konsol hatası yok.

**Kural:** bir kapı beklenmedik biçimde düşerse, kusur bildirmeden önce
`taskkill //IM chrome.exe //F` + `taskkill //IM node.exe //F` yapıp sunucuyu
yeniden başlat ve tekrar koş. Tek koşuya dayanarak regresyon raporlama.

---

## BİLİNEN MOTOR FARKI — Firefox, scroll'a bağlı state yayılımı

Şifa Yolculuğu bölüm sayacı Firefox'ta Chromium/WebKit'ten yavaş güncelleniyor.
Ölçüm (6 bölüm, 500vh kapsayıcı, gerçek tekerlek girdisi):

| Tempo | Chromium | WebKit | Firefox |
|---|---|---|---|
| 150px/150ms (~1000 px/sn) | 6/6 | 6/6 | **5/6** |
| 150px/250ms | 6/6 | 6/6 | 6/6 |
| 100px/200ms | 6/6 | 6/6 | 6/6 |

Doğrudan konum atlanarak ölçüldüğünde Firefox da 06'ya ulaşıyor ve bölüm o anda
hâlâ sabit (pinli) — yani mantık doğru, fark yalnız yayılma hızında.

**Kullanıcıya etkisi:** Firefox'ta hızlı kaydıran biri son bölümü kaçırabilir.
Orta tempoda altısı da görünüyor. Çözüm bölüm başına mesafeyi daha da artırmak
olurdu ama bu, bölümü 5 ekrandan daha uzun yapardı; tempo/uzunluk dengesi
bilinçli olarak burada bırakıldı.

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
