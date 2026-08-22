# TRUST / PROOF MATRIX

> Bu projede yayınlanan her güven iddiasının kanıt durumu.
> Tarih: **2026-08-23**
>
> **Kural: fail-closed.** Kanıtı olmayan iddia public UI'da render edilmez.
> "Kanıt eksik ama rozeti gösterelim" yaklaşımı kullanılmaz — yarım kanıt,
> kanıtsızlıktan daha zararlıdır.

---

## PROGRAMLAR

| Program | Süre / format | Müfredat | Sertifika | Akreditasyon | Durum |
|---|---|---|---|---|---|
| Nefes Koçluğu | ✅ 6 hafta · online | ✅ | ✅ akademi belgesi | — iddia yok | **YAYINDA** |
| Reiki | ✅ | ✅ | ✅ akademi belgesi | — iddia yok | **YAYINDA** |
| Meridyen Terapi | ✅ 8 hafta · karma | ✅ | ✅ akademi belgesi | ❌ **kaldırıldı** | **YAYINDA (akreditasyonsuz)** |
| Mucizeler Kursu | ✅ | ✅ | ✅ akademi belgesi | — iddia yok | **YAYINDA** |
| Hipnoterapi | ✅ | ✅ | ✅ akademi belgesi | — iddia yok | **YAYINDA** |
| Yaşam Koçluğu | ✅ | ✅ | ✅ akademi belgesi | — iddia yok | **YAYINDA** |

Fiyat ve başlangıç tarihleri **bilerek yok** (D042). `offers` şeması da bu yüzden
yayınlanmıyor.

---

## AKREDİTASYON — `UNVERIFIED`, public iddia KALDIRILDI

**Ne iddia ediliyordu:** Meridyen Terapi programı "IECCERT onaylı", kurum adı
*International Energy & Complementary Medicine Certification*.

**Dış kaynaktan doğrulandı (ieccert.com), iki ayrı sorun:**

1. **Yayınlanan İngilizce açılım YANLIŞTI.** Kurumun resmî adı
   **"İECCERT — ULUSLARARASI EĞİTİM KONSEYİ"** (International Education Council).
2. **Kategori uyuşmazlığı.** İECCERT, uygunluk değerlendirme **kuruluşlarını**
   akredite ediyor — eğitim programlarını değil. "IECCERT onaylı program" ifadesi
   bu yapıyla örtüşmüyor.

**Ayrıca:** programa özel onay belgesi, sicil numarası veya doğrulama bağlantısı
repoda yok. `PRODUCT.md` yalnızca dahili bir beyan taşıyordu.

**Yapılan:** tüm public "IECCERT onaylı" iddiaları kaldırıldı —
metadata (2), openGraph, Course schema, `certification` alanı, SSS cevabı,
`the-story` paragrafı ve akreditasyon rozeti. Sertifika artık dürüst biçimde
**akademinin kendi belgesi** olarak anlatılıyor.

`AccreditationProof` bileşeni **repoda duruyor** ve şu alanları bekliyor:

| Alan | Durum |
|---|---|
| `body` / `bodyFullName` | doğrulanmış resmî ad gerekli |
| `program` | akreditasyonun kapsadığı programın adı |
| `scope` | neyi kapsıyor, neyi kapsamıyor |
| `registrationNumber` | **REQUIRES VERIFIED BUSINESS DATA** |
| `verificationUrl` | **REQUIRES VERIFIED BUSINESS DATA** |
| `trainingHours` | **REQUIRES VERIFIED BUSINESS DATA** |
| `assessment` | **REQUIRES VERIFIED BUSINESS DATA** |
| `certificateSampleUrl` | **REQUIRES VERIFIED BUSINESS DATA** |

Bu alanlar geldiğinde blok tek yerden geri açılır.

---

## EĞİTMENLER — `BLOCKED BY EXTERNAL DATA`

`app/egitmenler/page.tsx` beş gerçek kamusal ismi "Eğitmenlerimiz" başlığı altında
yayınlıyor. Akademiyle resmî ilişkileri **repodan doğrulanamıyor**.

| Alan | Durum |
|---|---|
| Ad soyad | var (gerçek kamusal isimler) |
| Rol / unvan | var — **doğrulanmamış** |
| Akademiyle ilişki | **doğrulanmamış** |
| Sertifika / kimlik belgesi | yok |
| Deneyim yılı | yok |
| Gerçek portre | **yok — uydurma portre de yok** (baş harf kullanılıyor) |
| Dış doğrulama bağlantısı | yok |
| `Person` schema | **eklenmedi** — doğrulanmadan eklenmeyecek |

**Bu turda ne yapıldı:** uydurma portre veya uydurma kimlik bilgisi **eklenmedi**;
`Person` şeması yayınlanmadı. **Ne yapılmadı:** kartlar production'dan
kaldırılmadı — bu, iş sahibinin kendi eğitmen kadrosu hakkındaki beyanı ve
kaldırma kararı bilgi gelmeden verilemez.

→ **Kullanıcı işlemi:** her eğitmen için ilişki teyidi + (varsa) sertifika ve dış
profil bağlantısı. Gelmezse kartların yayından kaldırılması değerlendirilmeli.

---

## BLOG YAZAR KİMLİĞİ — düzeltildi

**Önceki durum:** "Elif Kozanoğlu — Kurucu & Eğitmen", "Ahmet Yılmaz — Meridyen
Terapisti", "Selin Aksoy — Klinik Hipnoterapist" adları, her biri bir **Unsplash
stok portresiyle**. Hiçbiri eğitmen listesinde yok; biri akademinin *kurucusu*
olarak sunuluyordu.

**Şimdi:** beş yazının tamamı **"Yaşama Sanatı Editoryal Ekibi"** atfıyla. Stok
portreler kaldırıldı; `avatar` alanı tipten çıkarıldı. `ArticleSchema` `author`
alanı zaten yayınlanmıyor.

Gerçek yazar verisi geldiğinde `name`/`role` kişiye çevrilebilir; portre alanı
**ancak gerçek portre varsa** geri eklenir.

---

## TESTIMONIAL — fail-closed, şu an hiçbiri yayında

`TestimonialItem` artık `consentVerified` ve `sourceReference` taşıyor.
`CourseDetailTemplate` yalnız `consentVerified === true` olanları render ediyor.

| Program | Kayıt sayısı | İzin belgesi | Yayında |
|---|---|---|---|
| 6 program dosyasının tamamı | var | **yok** | **hayır** |

"D. S., Mimar", "Z. A." gibi anonim atıflar provenance taşımıyor. Veri repoda
korundu — izin alındığında tek alan değişikliğiyle geri gelir. Silinmedi,
uydurulmadı, "doğrulanmış" işaretlenmedi.

→ **Kullanıcı işlemi:** gerçek katılımcı, yazılı kullanım izni, anonimleştirme
politikası.

---

## KURUMSAL / HUKUKİ

| Konu | Durum |
|---|---|
| Tescilli ticaret unvanı | **REQUIRES VERIFIED BUSINESS DATA** |
| Adres | yalnız "İzmir" (hizmet şehri) — sokak adresi yok, uydurulmadı |
| Vergi / sicil no | **REQUIRES VERIFIED BUSINESS DATA** |
| KVKK / privacy metinleri | `TODO (hukuk)` işaretli |
| Sosyal medya | yalnız WhatsApp (doğrulanmış). Sahte YouTube CTA'sı kaldırıldı. `sameAs` yayınlanmıyor |

---

## ÖZET

```
YAYINLANABİLİR DOĞRULANMIŞ İDDİA
  program yapısı, süre, format, müfredat, akademi sertifikası, WhatsApp

YAYINDAN KALDIRILAN DOĞRULANMAMIŞ İDDİA
  IECCERT akreditasyonu (+ yanlış kurum adı)
  blog yazar kimlikleri (gerçek ad + stok portre)
  izinsiz testimonial'lar
  sahte YouTube kanalı bağlantısı

DIŞ VERİ BEKLEYEN
  eğitmen ilişkisi ve kimlik belgeleri
  akreditasyon kanıtı (sicil no, doğrulama URL'i, saat, değerlendirme)
  testimonial izinleri
  tescilli şirket bilgileri
```
