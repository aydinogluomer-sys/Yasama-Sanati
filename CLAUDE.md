# Yaşama Sanatı — Agent Handoff

Bu dosya, depoda çalışan yapay zekâ ajanları ve geliştiriciler içindir.
**Son güncelleme: 2026-09-02** · Anlattığı durum `52a2b5a`e kadar olan işleri kapsar.

---

## Mevcut durum

- Proje `Elementis-SOTD` altında. Remote: `https://github.com/aydinogluomer-sys/Yasama-Sanati.git`, hedef dal `main`.
- Yerel fontlar kullanılıyor; derleme uzak Google Fonts'a bağlı değil.
- **`docs/AWWWARDS-90-BLOCKERS.md` planının 1–3. fazları uygulandı ve push edildi.**
  Faz 4 (performans) açık.

| commit | ne |
|---|---|
| `6350900` | 17 rotanın denetimi + faz planı |
| `d1c11d7` | Faz 1 — renk / tipografi / eksen / hareket token'larını sayfalara bağla |
| `5eb0502` | Faz 2 — hareketi üç motora yay, sayfa geçişi, ölü kod temizliği |
| `52a2b5a` | Faz 3 — zayıf sayfalar + üç sessiz tipografi/varlık hatası |

## Son turda değişenler (2026-09-02)

- **Tipografi kaskadı düzeltildi.** Sitenin üç sesinden ikisi hiç uygulanmıyormuş:
  Space Mono hiçbir yerde render edilmiyordu ve ana sayfa ile menüden gidilen on bir
  sayfa iki farklı sans fontuyla yazılıyordu. Ayrıntı: `docs/decisions.md` D073.
- **Makale tipografisi.** `prose*` sınıfları ölüydü (`@tailwindcss/typography` kurulu
  değil); yerine `.article-body` geldi (D074).
- **Uzak görsel izni kaldırıldı**, blog kapakları yerele taşındı, 21 rota ölçüldü (D075).
- **Renk birleştirmesinin JS tarafı kapatıldı** — `utils/palette.ts` içindeki `ink`
  (D076). `.tsx` ham hex 764 → 119; 3D sahneler hariç 68.
- `/sss` kategori ayırıcıları, blog kart ızgarası editoryal düzene geçti (D077).
- `::selection` token'a bağlandı; bu sırada iki yanlış sonuca varılıp ölçümle geri
  dönüldü (D078 — yöntem dersi orada).
- Yeni kapılar: `test:fonts`, `test:selection`, `test:hero-contrast`, `verify:gates`.

## Kaynak doküman hiyerarşisi

| dosya | ne işe yarar |
|---|---|
| `docs/AWWWARDS-90-BLOCKERS.md` | **Uygulanan plan.** A/B bölümleri denetim anına ait; **güncel durum F bölümünde.** |
| `docs/decisions.md` | Karar kayıtları (D0xx). Bir şeyin NEDEN öyle olduğunu buradan öğren. |
| `docs/RELEASE-READINESS.md` | Gönderim engelleri ve güncel performans ölçümü. |
| `docs/ART-DIRECTION-GAPS.md` | Görsel üretim şartnamesi; hangi karenin değişmesi gerektiği. |
| `docs/SURFACE-RHYTHM-PLAN.md` | **Kısmen uygulandı.** Alt sayfaların tek düze koyu yeşilden çıkarılması. Ölçüldü: 9 rota sayfa boyunca `deep %100`, ana sayfa 6 yüzey. **Faz A** (tesisat, `#f0ebe2`) ve **kapanış bandı** (15 rota) yapıldı; bandın üstündeki dikiş sonradan kaldırıldı (D083). **Faz B/C hâlâ onay bekliyor.** Dosyanın sonundaki düzeltme bölümleri bağlayıcı, gövdesi tarihsel. |
| `design-system/` + `DESIGN.md` | Renk/tip/hareket ölçekleri ve `/on-gorusme` rotasının kendi sistemi ("Meridyen Eşiği"). |

> **Açık karar (proje sahibine ait):** `docs/RELEASE-PLAN.md` hâlâ duruyor ve kapsamı
> daha geniş (Next yükseltmesi, CI, Supabase, RUM). `AWWWARDS-90-BLOCKERS.md` ile
> kısmen örtüşüyor. İkisi birleştirilmeli mi, yoksa RELEASE-PLAN üst plan olarak mı
> kalmalı — **karar verilmedi.** Bu dosyanın önceki sürümündeki "Tek aktif plan:
> docs/RELEASE-PLAN.md" satırı fiili duruma uymadığı için kaldırıldı.

> `docs/progress.md`, `docs/issues.md`, `docs/todo.md` **Temmuz 2026'dan beri
> güncellenmiyor.** Güncel bilgi için onlara güvenme; kaynak yukarıdaki tablo.

---

## Kapsam

Depo genelinde çalışılabilir. Önceki sürümdeki dar "Editable Areas" listesi
(yalnız Hero/Footer/globals) fiili duruma uymuyordu ve kaldırıldı — Faz 1–3
`app/**`, `components/**`, `sections/**`, `utils/**`, `qa/**` ve `next.config.ts`
üzerinde çalıştı.

### Kapsam genişletmeden DEĞİŞTİRME

- `/on-gorusme` rotasının stil sistemi. Ayrı olması kaza değil: `DESIGN.md`'de
  **"Meridyen Eşiği"** adıyla belgelenmiş, odaklanmış bir uzantı ve depodaki en iyi
  token'lanmış dosya (56 `var()` / 22 ham hex). Bir tur bu yanlış anlaşıldı; bkz. A11.
- `components/meridian-3d/*`, `TherapyScene3D`, `Meridian3D` içindeki ham renkler.
  Bunlar **chakra ve meridyen renkleri** — geleneksel bir semantik sistem, marka
  sapması değil. Paletle değiştirmek anlamı bozar.
- Onaylanmamış içerik: aşağıdaki "Asla uydurma" kuralı.

---

## Asla uydurma

Bu kural içerik üreten her turda geçerlidir. Doğrulanmış veri yoksa alanı boş bırak
veya `DOĞRULANMIŞ İŞLETME VERİSİ GEREKLİ` işaretiyle bırak — **tahmin yazma:**

eğitmen ilişkileri · eğitmen sertifikaları · deneyim yılı · akreditasyon numaraları ·
IECCERT kapsamı · referans/yorum metinleri · blog yazar kimliği (gerçek kişi adı +
stok portre birleşimi dahil) · tüzel kişilik unvanı · adres · sosyal medya hesapları ·
tıbbi/klinik sonuç iddiaları · araştırma sonuçları · üretim performans sonuçları.

Git geçmişinde bir sır bulursan: **döndürülmesi gerektiğini bildir, değeri yazma.**
Üretim veritabanına test verisi yazma.

---

## Doğrulama

```bash
npm run verify        # typecheck + lint + build
npm run build && npx next start -p 3400   # ayrı terminalde, kapılar için
npm run verify:gates  # 15 kapı, TEK TEK, sonuçları ayrı satırlara
npm run test:visual   # görsel regresyon: 4 viewport × 8 rota × 2 kare = 64
npm run test:perf     # LCP / CLS / TBT — LAB ölçümü, p75 değil
```

### ÖLÇÜM HİJYENİ — bu turda iki kez pahalıya mal oldu

- **Kapılar koşarken sunucuya başka hiçbir şey dokunmamalı.** Ekran görüntüsü
  scripti, ikinci bir kapı turu, `npm run build` dahil. Çakışma bu turda dört kapıda
  **yanlış hata** üretti (`viewports`, `keyboard`, `reveal`, `transition`); temiz
  koşuda dördü de geçti.
- **Yarıda kestiğin kapı turunun artıklarını öldür.** Arka planda dönmeye devam eden
  `gates.sh` süreçleri çalışan turun tarayıcısını öldürüp
  `Target page, context or browser has been closed` üretiyordu:
  ```powershell
  Get-CimInstance Win32_Process -Filter "Name='bash.exe'" |
    Where-Object { $_.CommandLine -like '*gates.sh*' } |
    ForEach-Object { Stop-Process -Id $_.ProcessId -Force }
  ```
- **`test:visual -- --update` bir "geçti" değildir**, referans yenilemedir. Kasıtlı
  tasarım değişikliğinden sonra yenile, sonra **güncellemesiz bir kez daha koş**;
  anlamlı olan ikinci koşudur.
- Performans sayıları makine yüküne çok duyarlı. Mutlak bir iddia yazmadan önce
  makinede ne çalıştığını not et; karşılaştırma yapacaksan **aynı makinede, aynı
  dakikada kontrollü A/B** kur.

---

## Bu depoda tekrar eden tuzaklar

1. **Sınıf yazılmış olması stil uygulandığı anlamına gelmez.** Üç ayrı hata bu
   desendeydi ve derleme/lint/typecheck/axe hiçbirini görmedi: `--font-mono`
   geçersiz değere düşüyordu, `--font-sans` hiç tanımlı değildi, `prose*` sınıflarının
   eklentisi kurulu değildi. **Kural: `getComputedStyle` ile ölç.**
2. **Tailwind v4 `@theme` bloğu `:root` üzerinde değerlendirilir**, next/font
   değişkenleri ise `<body>`ye basılır. `@theme` içinde `var(--font-…)` yazmak
   sessizce geçersiz değer üretir. Bağlama `body` seviyesinde yapılır — bkz.
   `app/globals.css`.
3. **Kendi raporlarına, commit mesajlarına ve onay kutularına kanıt muamelesi yapma.**
   Bu turda `docs/ART-DIRECTION-GAPS.md`'nin "değişmeli" satırları bayattı ve bir tur
   boyunca yanlış iş listesi üretti; kareler zaten yeniden üretilmişti.
4. **Bir tarayıcı farkı iddia etmeden önce kontrol koşusu kur.** Ölçütün gerçek
   başarısızlığı yakalayabildiğini kanıtla. `::selection` konusunda bu atlandığı için
   iki tur yanlış sonuca varıldı (D078).
5. **`next/image` `remotePatterns` istek anında doğrulanır, derlemede değil.**
   `npm run build` kırık uzak görseli yakalamaz; `npm run test:images` yakalar (D072/D075).
6. **Transfer ölçerken sıkıştırmayı doğrula.** `response.body().length` KOD
   ÇÖZÜLMÜŞ boyutu verir; sunucu gzip gönderiyor (HTML 150 → 25 KB). Bu yüzden
   bir tur boyunca "ağırlık JS'te 690 KB" diye yanlış bir sonuçla çalışıldı;
   gerçekte tel üzerinde js 213 KB, fontlar 190 KB idi. Doğrusu
   `request.sizes().responseBodySize`. `curl -I` de yanıltır — HEAD isteğinde
   `Content-Encoding` görünmez, GET ile bak (D080).
7. **Font alt kümelerken `--layout-features='*'` kullan.** Elle özellik listesi
   vermek Ogg'un şekillendirmesini bozdu ve `/the-story` başlığı kaydı
   (görsel regresyon %0,85–1,57). Alt kümeleme sonrası `test:visual` şart (D080).
8. **Performans ölçmeden önce boş RAM'e bak.** Bu depoda bir tur, boş RAM
   1 GB'a inmişken alınan sayılarla çalışıldı: aynı derlemede masaüstü TBT'si
   34 ms ile 489 ms arasında salındı. Makine yüklüyken perf iddiası yazma;
   `Get-CimInstance Win32_OperatingSystem` ile serbest belleği not et (D081).
9. **Bir kapının YEŞİL olması, ölçmesi gerekeni ölçtüğü anlamına gelmez.**
   Görsel kapının "sayfa sonu" karesi `scrollTo(scrollHeight)` ile alınıyordu;
   footer çoğu viewport'ta bir ekrandan uzun olduğu için o kare **yalnız
   footer**dı ve footer sekiz rotada aynı. Kare hiçbir şey ölçmüyordu, ama
   64/64 %0,000 diyordu. Kör nokta ancak alt sayfaların dibi baştan aşağı
   değiştiğinde ve kapı yine %0,000 dediğinde fark edildi (D084).
   **Kural: yeni bir kapı yazarken önce onun GERÇEK bir değişikliği yakaladığını
   göster.** Kapının kapsamı da dosyanın içine yazılmalı — görsel kapıda artık
   footer pikselleri ve nav görünümü YOK.
10. **Görsel karşılaştırmada ilk yükleme ötekilerden farklı ölçülür.**
   Aynı kare, altı ayrı tarayıcı açılışı: ilkinde footer'ın belge konumu
   14851,547, ötekilerde 14851,359. Park noktası yuvarlanınca bu 0,188 px tam
   bir piksele büyüyor ve kare bir satır kayıyor (%2,003). `qa/visual.mjs`
   bu yüzden ölçmeye başlamadan bir **ısınma turu** yapıyor (D084).
11. **`motion/react-client` LazyMotion'ı etkisiz kılar.** O giriş noktası
   bileşenleri TAM özellik paketiyle üretir; 12 dosya onu kullandığı sürece
   `m` + `LazyMotion` göçü hiçbir bayt kazandırmaz (D081).

---

## Bilinen açıklar

| konu | durum |
|---|---|
| Mobil Slow 4G LCP | **hedef karşılanmadı** (<2500 ms). 9764 → 9352 ms. Darboğaz bant genişliği değil ana iş parçacığı; tavan ölçüldü: tüm uygulama JS'i sıfırlansa bile LCP 3128 ms (D080). Hidrasyon fazında hero yerleşmesi CSS'e alındı; **LazyMotion göçü ölçümle elendi** (tavan ~15 KB, maliyet 58 dosya) — D081. Sayısal delta makine boştayken yeniden ölçülmeli. |
| `group/mucizeler-kursu.jpg`, `group/yasam-koclugu.jpg` | renk sıcaklığı düzeltildi, konu hâlâ ılıman iklim penceresi. Prompt hazır. |
| `/egitmenler` | denetimde "portre yok, kart dili jenerik" — plan maddesi değildi, kapsam dışı bırakıldı. |
| Footer'ın iki CTA düğmesi | `rounded-full` hap; sitenin geri kalanı kare (`BorderedButton`). 404'te aynı gerekçeyle kaldırılmıştı. Footer bir referans görsele göre ayarlandığı için dokunulmadı — **karar sahibinin.** |
| Blog yazar kimliği | kurumsal atıfta. Gerçek yazar verisi gelene kadar kişi adı yazılmayacak. |
| Formlar | Supabase INACTIVE; gönderim kullanıcıya erişilebilir Türkçe hata mesajı veriyor. Vitrin kararı, `RELEASE-READINESS.md` §1. |
