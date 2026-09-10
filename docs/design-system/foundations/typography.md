# Typography

> **Tek kaynak.** Bu dosya `app/globals.css`'teki çalışan tanımların aynasıdır. Değer değişirse
> önce `globals.css` değişir, sonra burası. Ayrışma tespit edilirse `globals.css` doğrudur.
> Son senkron: 2026-08-22.

## Fonts

| Rol | Aile | Nereden |
|---|---|---|
| Display / editorial serif | **Ogg** (Ogg-Roman, Ogg-Italic) | `app/fonts/`, `--font-serif` |
| Body / interface sans | **Basis Grotesque Pro** (300/400/500) | `app/fonts/`, `--font-grotesque` |
| Mikro-etiket mono | **Space Mono** (400/700) | Google Fonts, `--font-space-mono` |

> Bu dosya önceden display serif olarak **Cormorant Garamond** yazıyordu. Yanlıştı: font
> 2026-07 civarında Ogg'a taşındı ve karar `docs/decisions.md` **D041**'de kapatıldı (Ogg kalır,
> ticari lisans doğrulaması bilinçli olarak ertelendi). Space Mono ise hiç yazılmamıştı.
> `--font-kisthe` ayrı bir aile değil, `--font-serif`e işaret eden takma addır.

## Ölçek

Tüm adımlar `--multiplier` üzerinden viewport ile ölçeklenir:
`clamp(0.9px, 100vw/375, 1px)` mobilde, `clamp(1px, 100vw/1440, 1.25px)` md+.
Ölçek **kapalıdır** (`--text-*: initial`) — Tailwind'in rem tabanlı varsayılanları devre dışıdır,
yani `text-*` sınıfları yalnızca aşağıdaki adımlara çözülür.

### Mikro ve gövde

| Token | Değer | Kullanım |
|---|---|---|
| `text-5xs` | 9 × m | en küçük etiket (nefes ipucu) |
| `text-4xs` | 10 × m | mikro etiket, konum satırı |
| `text-3xs` | 11 × m | CTA etiketi, dipnot |
| `text-2xs` | 12 × m | üst etiket |
| `text-xs` | 13 × m | yardımcı metin |
| `text-sm` | 14 × m | küçük gövde |
| `text-md` | 15 × m | ara gövde |
| `text-base` | 16 × m | standart gövde |
| `text-lg` | 18 × m | geniş gövde |
| `text-xl` | 20 × m | öne çıkan gövde |
| `text-24` … `text-144` | 24/26/28/30/36/40/52/144 × m | başlık kademeleri |

`text-5xs` ve `text-4xs` 2026-08-22'de eklendi: 9px ve 10px zaten 58 yerde sabit değer olarak
kullanılıyordu, yani fiilen ölçeğin parçasıydılar ama viewport'la ölçeklenmiyorlardı.

### Editoryal display (viewport-akışkan clamp)

| Token | Değer | Line-height |
|---|---|---|
| `text-display-xl` | `clamp(3.25rem, 11.5vw, 12rem)` | 0.92 |
| `text-display-l` | `clamp(2.75rem, 8vw, 7.5rem)` | 0.96 |
| `text-display-m` | `clamp(2.4rem, 5.6vw, 5rem)` | 1 |
| `text-display-s` | `clamp(1.85rem, 3.6vw, 3rem)` | 1.08 |
| `text-body-lg` | `clamp(1.15rem, 1.9vw, 1.6rem)` | 1.45 |
| `text-kicker` | `clamp(0.68rem, 0.85vw, 0.78rem)` | 1 |

## Type Roles

- Display XL: hero headline
- Display L: major section statements
- Section title: section headings
- Body large: lead paragraphs
- Body: standard prose
- Caption: metadata and coordinates
- Microcopy: trust notes and legal text

## Rules

- Editorial headings should feel deliberate, not oversized by default.
- Keep line length controlled for reading comfort.
- Use tighter leading for display text and looser leading for body text.
- Do not mix too many font sizes in one section.
- Keep weight changes minimal and meaningful.
- **Sabit punto yazma.** `text-[13px]` gibi bir değer gerekiyorsa ölçekte karşılığı yoktur;
  ya var olan adımı kullan ya da `globals.css`'e adım ekleyip burayı güncelle.
- Ogg ile sıkı, çok satırlı büyük harf kompozisyon kurarken **render'ı test et**:
  `docs/issues.md`'deki N-glyph kusuru bu koşulda ortaya çıkmıştı (footer wordmark hâlâ
  bu yüzden Georgia kullanıyor).

## Current Direction

- Warm, calm, precise, and premium.
- Enough contrast to guide reading.
- No decorative font experimentation.
