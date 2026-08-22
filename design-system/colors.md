# Colors

> **Tek kaynak.** Bu dosya `app/globals.css`'teki çalışan tanımların aynasıdır. Değer değişirse
> önce `globals.css` değişir, sonra burası. Ayrışma tespit edilirse `globals.css` doğrudur.
> Son senkron: 2026-08-22.

## Core Surface Roles

- `--surface-deep`: `#2b3530` — temel marka yüzeyi
- `--surface-warm`: `#30493d` — ikinci koyu yüzey (deep'ten **açık**; kontrast hesabında ayrı tutulmalı)
- `--surface-card`: `#ced1bf` — açık sage kart/panel
- `--surface-muted`: `#f3efe6` — parşömen, krem bölüm

## Text Roles

- `--text-primary`: `rgba(243, 239, 230, 0.92)`
- `--text-secondary`: `rgba(243, 239, 230, 0.72)`
- `--text-muted`: `rgba(243, 239, 230, 0.58)`
- `--text-inverse`: `#2b3530`

## Accent Roles

- `--accent-copper`: `#c9875b` — **dolgu, çizgi, ikon** için marka bakırı
- `--accent-copper-hover`: `#d79a70`
- `--accent-sage`: `#ced1bf`
- `--focus-ring`: `#e1a37a`

### Metin için bakır varyantları

Marka bakırı `#c9875b` küçük punto **metinde** tabanın altında kalıyor: `--surface-deep`
üzerinde 4,29:1, `--surface-warm` üzerinde 3,3:1 (gereken 4,5:1). Bu yüzden metne özel iki
varyant var — ölçülerek seçildiler:

- `--accent-copper-on-dark`: `#E0A878` — deep üzerinde **6,07:1**, warm üzerinde **4,68:1**
- `--accent-copper-on-light`: `#7A3F1C` — açık sage üzerinde **5,13:1**

**Kural:** bakır *metin* bu iki varyanttan birini kullanır; dolgu, kenarlık ve ikon marka
bakırını kullanmaya devam eder. Kısıt yalnızca metinde, çünkü sorun orada.

## Field & Status Roles

- `--field-surface`: `#c4c7b3` · `--field-border`: `#677260`
- `--status-success-surface/-border/-text`
- `--status-error-surface/-border/-text`

## Rules

- Use the deep green family as the base brand surface.
- Reserve copper for actions, highlights, and editorial emphasis.
- Avoid random gradients and avoid bright neon accents.
- Keep contrast strong enough for reading, not just atmosphere.
- **Metin opaklığı 70'in altına inmez** (açık yüzeylerde 85). `--surface-warm` yüzeyi
  `--surface-deep`'ten açık olduğu için orada `/70` bile 4,32:1'de kalır — bu iki yüzeyi
  ayrı hesapla.
- Değişiklikten sonra `npm run test:a11y` çalıştır: 11 rota × 2 viewport, serious/critical = 0
  beklenir.

## Doğrulama

Son tam tarama (2026-08-22, axe-core, WCAG 2.0/2.1 A+AA): **0 bulgu**.
Öncesinde ~180 ciddi bulgu vardı; kayıt `docs/decisions.md` **D059**.
