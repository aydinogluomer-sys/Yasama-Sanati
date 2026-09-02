# RELEASE READINESS — Yaşama Sanatı

> Yalnız **güncel gerçeklik**. Geçmiş plan, kapanmış madde ve tarihçe burada yok;
> onlar `docs/FINAL-VERIFICATION.md` ve `docs/decisions.md` içinde.
>
> Son güncelleme: **2026-09-02** · Doğrulanan HEAD: bu dosyayı taşıyan commit
> Kapılar: `npm run verify` + `npm run verify:gates` + `npm run test:visual`
>
> `verify:gates` (yeni) 13 kapıyı TEK TEK, aralarında tarayıcı temizliğiyle
> koşar. Zincirlenmiş `verify:runtime` bu turda iki kez **yanlış hata** üretti
> (`viewports`, `keyboard`, `reveal`, `transition`); dördü de temiz koşuda geçti.
> Kapılar koşarken sunucuya başka hiçbir şey dokunmamalı.

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

#### 2026-09-02 ölçümü — ve neden yukarıdaki tabloyla KARŞILAŞTIRILAMAZ

```
masaüstü kısıtsız      LCP 876 ms    (604–1624)    TBT ~81 ms
mobil 4× CPU           LCP 6936 ms   (6720–7740)   TBT ~2398 ms
mobil 4× CPU + Slow 4G LCP 9764 ms   (8832–10692)  TBT ~2824 ms
LCP ögesi: IMG.size-full.object-cover  ·  transfer 1332 KB
```

Bu sayılar yukarıdaki 3244 ms ile **yan yana konulamaz**, iki nedenle:

1. **Makine yükü farklı.** Ölçüm sırasında kullanıcının kendi Chrome'u (15
   süreç), Spotify ve Docker Desktop çalışıyordu. Yayılımlar bunu gösteriyor
   (mobil 4× CPU'da 2016–7144 ms bandı görüldü). Bu koşulda mutlak bir sayı
   iddia etmek dürüst olmaz.
2. **LCP ÖGESİ DEĞİŞTİ.** 3244 ms ölçümünde LCP ögesi dekoratif "ŞİFA"
   konturuydu; bu dosya zaten "gerçek içerik Slow 4G'de ~10,5 sn'ye kadar
   boyanmıyor, kontur bunu örtüyor" diye kaydetmişti. Bugünkü ölçümde LCP
   ögesi hero **görselinin kendisi** ve ~9,8 sn — yani rakam kötüleşmedi,
   **örtü kalktı**. 3244 ms hiçbir zaman gerçek içeriğin boyanma anı değildi.

**Kontrollü A/B — bu turun tipografi düzeltmesi LCP'yi kötüleştirdi mi?**
Aynı makinede, aynı dakikada, yalnız `--font-sans`/`--font-mono` bağlaması
açık/kapalı olacak şekilde ölçüldü:

| | mobil 4× CPU | Slow 4G |
|---|---|---|
| bağlama AÇIK (gönderilen) | 6936 ms | **9764 ms** |
| bağlama KAPALI | 2704 ms* | **11964 ms** |

\* kapalı koşunun yayılımı 2016–7144 ms; medyan güvenilir değil.

Yani tipografi düzeltmesi Slow 4G'de LCP'yi **kötüleştirmiyor** (aksine daha
iyi ölçüldü). Darboğaz bu dosyanın zaten söylediği yerde: kritik yoldaki
~1,3 MB ve React+Motion hidrasyonu.

**Hedef <2500 ms KARŞILANMADI.** Gerçek bir ilerleme için gereken şey ölçüm
değil bundle çalışması; bu ayrı bir iş kalemi.

#### Faz 4 uygulandı (2026-09-02) — LCP 9764 → 9424 ms, hedef yine uzak

Planın teşhisi ("hero görselleri, AVIF/WebP") **yanlıştı**: mobilde görsel
transferi 180 KB ve `next/image` zaten AVIF/WebP üretiyor. Ağırlık JS'te
(690 KB). Asıl bulunan sorun: hero'nun Motion `initial="hidden"`i sunucu
HTML'ine `opacity:0` yazdığı için **görünür alanın tamamı JS'i bekliyordu**
(LCP 12152 ms). Koreografi saf CSS'e alındı; görsel sonuç birebir aynı kaldı.

Yapılanlar: hero açılışı CSS'e · hero görselinin çift render'ı kaldırıldı
(görsel transferi 457 → 360 KB) · Space Mono 700 bırakıldı (font varlıkları
217 → 194 KB). Ayrıntı ve ölçümler: `docs/decisions.md` D079.

#### Bundle işi yapıldı (2026-09-02) — ve asıl darboğazı ortaya çıkardı

**Önce bir ölçüm hatam düzeltildi:** yukarıdaki ve D079'daki transfer rakamları
KOD ÇÖZÜLMÜŞ boyutlardı. Sunucu gzip gönderiyor (HTML 150 → 25 KB, JS yığını
174 → 46 KB). Tel üzerindeki gerçek dağılım: **img 360 · js 213 · font 190 ·
html 25 · css 19 KB**. Yani "ağırlık JS'te 690 KB" iddiam yanlıştı.

Yapılanlar (ikisi de piksel bazında doğrulandı):

* Yerel fontlar alt kümelendi: **172 → 128 KB**, görsel regresyon 32/32 %0,000.
  (İlk deneme elle `--layout-features` listesi verdiği için Ogg şekillendirmesini
  bozmuştu; `'*'` ile yeniden üretildi.)
* Hero görseli kalite 75 → 60: **96 → 49 KB**, sayfa üzerinde **0 farklı piksel**
  (hero üç scrim altında).
* Net: tel üzerinde **812 → 674 KB (−138 KB, %17)**.

**Sonuç: LCP 9424 → 9352 ms, yani neredeyse hiç oynamadı.** Darboğaz bant
genişliği değil **ana iş parçacığı**: TBT ~2362 ms.

**Tavan ölçüldü:** uygulama JS'i tamamen engellendiğinde LCP **3128 ms**
(FCP 2852 ms). Yani <2500 ms hedefi bundle çalışmasıyla tek başına
ulaşılabilir değil.

Sıradaki yön bayt kesmek değil **çalışan istemci JS'ini azaltmak**: Motion'ın
`LazyMotion` + `m` ayrımı (58 dosya, 188 kullanım, 12'si RSC tarafında) ve ekran
altı bölümlerin istemci bileşeni olmaktan çıkarılması. Ayrıntı: D080.

Journey runtime'ı mobil/masaüstü olarak gerçekten ayrıldı (CSS gizleme JS'i
bundle'dan çıkarmıyordu). Mobil artık masaüstü journey chunk'ını indirmiyor —
ama **bayt kazancı yok** (212 KB → 212 KB): modül küçük ve ağır bağımlılıkları
zaten paylaşımlı. Kazanç hidrasyon işinde.

Kalan darboğaz: kritik yoldaki toplam bayt (~1301 KB mobil) ve React+Motion
hidrasyon maliyeti. <2500 ms için daha derin bir bundle çalışması gerekir.

### 3. Görünür sanat yönetimi çatlağı — 5 değil, **2 kare** (2026-09-02 düzeltmesi)

> Bu madde bayattı ve bir tur boyunca yanlış iş listesi üretti.

`ImageContainer/image-1, -3, -5` **artık doğru dilde.** Üçü de 2026-08-23'te
(`fb5fa1e`) yeniden üretilmiş; commit mesajına güvenilmeyip bugün tek tek
açılarak gözle denetlendi: kireç badanalı taş, zeytin, kuru ot, kil kupa,
terracotta. Orman/yağmur/Nordic yok.

Kalan **2 kare**: `group/mucizeler-kursu.jpg` ve `group/yasam-koclugu.jpg`.
İkisi de sıcak derecelendirmeden geçti (renk sıcaklığı düzeldi) ama konu hâlâ
ılıman iklim penceresi.
→ **Kullanıcı işlemi:** `docs/ART-DIRECTION-GAPS.md` §4 ve §5'te prompt hazır.

### 4. `SideBar/on-gorusme.jpg` placeholder
`FormImage.jpg`'nin geçici kırpması. Menüdeki diğer 11 karenin hepsi kendi
görseline sahip.
→ **Kullanıcı işlemi:** prompt `ART-DIRECTION-GAPS.md` §6.

---

## NON-BLOCKING POLISH — gönderimi durdurmaz

- ~~`group/reiki.jpg`, `group/nefes-koclugu.jpg`, `group/hipnoterapi.jpg`
  referanssız.~~ **KAPANDI (2026-09-02):** o üç dosya artık depoda yok.
  `public/group/` içinde üç dosya kaldı (`meridyen-terapi`, `mucizeler-kursu`,
  `yasam-koclugu`) ve üçü de kullanılıyor.
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
