# Typography System V2 (Round 2 — implemented)

> **Phase 2 update (Typography Architecture).** The two-voice system below is extended into the full
> four-role budget from `Yeni Metin Belgesi (2).txt`. See "Phase 2 — Four-role system" at the bottom.

Two voices, strong contrast:
- **Display voice — Cormorant Garamond (serif).** Hero + section lead statements.
- **Interface voice — Basis Grotesque Pro (sans).** Body, labels, UI, kickers.

## Display scale (clamp, viewport-fluid) — in `app/globals.css` `@theme`

| Token | Utility | clamp | line-height | Role |
|---|---|---|---|---|
| Display XL | `text-display-xl` | `clamp(3.25rem, 11.5vw, 12rem)` | 0.92 | Hero headline (Phase 3) |
| Display L | `text-display-l` | `clamp(2.75rem, 8vw, 7.5rem)` | 0.96 | Major statement / closing |
| Display M | `text-display-m` | `clamp(2.4rem, 5.6vw, 5rem)` | 1.0 | Big section mass |
| Display S | `text-display-s` | `clamp(1.85rem, 3.6vw, 3rem)` | 1.08 | Section lead statements |
| Body Large | `text-body-lg` | `clamp(1.15rem, 1.9vw, 1.6rem)` | 1.45 | Propositions |
| Kicker | `text-kicker` | `clamp(0.68rem, 0.85vw, 0.78rem)` | 1.0 | Section labels |

## Components

- `components/Server/EditorialSectionTitle.tsx` — serif-italic index + thin rule + tracked
  uppercase kicker. Replaces the glyph `SectionTitle` on home sections. Props: `index`, `tone`,
  `className` (preserves grid placement).
- Lead statements now render `font-serif font-normal text-display-s tracking-[-0.01em] text-wrap`
  via `ResponsiveMaskText` (Introduction, WellnessSanctuary, ElementisStory).

## Applied (Phase 2)

- Introduction → kicker `01 — Tanışma`, serif Display S lead.
- WellnessSanctuary → kicker `02 — Yaklaşımımız`, serif Display S lead.
- ElementisStory → kicker `04 — Yaşama Sanatı Hikayesi`, serif Display S lead.

## Notes / gotchas

- `tailwind-merge` classifies the custom `text-display-*` size in the same group as `text-[color]`,
  so an explicit `text-[#…]` passed alongside is dropped. Current usages inherit `#D1CCBF` from the
  section, so color is unaffected. When putting serif display on a different-colored surface, set the
  color on a wrapper, not the same element.
- Manual line-break arrays remain for now; Phase 6 replaces them with responsive line reveal.
- Verified live (next dev): `.text-display-s` / `.text-kicker` CSS rules generate; no compile errors.

---

# Phase 2 — Four-role system (Typography Architecture)

Direction (fixed): **high-contrast serif + premium grotesk sans**. Font budget is exactly four:

| Role | Font | Loading | Used in |
|---|---|---|---|
| Primary display | Cormorant Garamond | next/font/google, latin+latin-ext, 300–700, `--font-serif` | hero, section leads, footer close, sub-page heros, manifesto, ODDWORKS mass |
| Body / UI | Basis Grotesque Pro | local woff2 (300/400/500), `--font-grotesque` | body, nav, buttons, forms, labels |
| Logo / accent / signature | **Kisthe** (pending woff2 — falls back to serif-italic) | `--font-kisthe` token | footer signature, manifesto accent word (`SignatureWordmark`, `TypographyStage` accent) |
| Micro labels | Space Mono | next/font/google, latin+latin-ext, 400/700, `--font-space-mono` → `--font-mono` | 01/02 indices, "ALTI DİSİPLİN" label, scene labels (`TypographyLabel`, `EditorialSectionTitle` index) |

## New typography components

- `components/Server/TypographyLabel.tsx` — Space Mono micro label.
- `components/Server/SignatureWordmark.tsx` — Kisthe accent/signature (token-driven fallback).
- `components/Client/OutlineTypographyLayer.tsx` — atmospheric outline-serif ghost word, scroll-linked, aria-hidden, reduced-motion static. (Hero "ŞİFA".)
- `components/Client/RotatedTypeMass.tsx` — ODDWORKS oversized type mass: solid/outline word mix, scroll-drift, copper `✦` separators, optional vertical accent word.
- `components/Client/TypographyStage.tsx` — Katya manifesto staging: large serif, selected-word Kisthe accent, responsive-safe word reveal.
- `components/Client/SignatureTypeScene.tsx` — the single ODDWORKS signature section ("Altı Disiplin": NEFES ✦ ZİHİN ✦ ENERJİ ✦ BEDEN ✦ REİKİ ✦ ŞİFA, vertical "Bütünlük").

## Reference → behavior (translated, never copied)

Outline (ref 01) → hero/transition overlay. High-contrast serif (ref 02) → Cormorant display. Kisthe
(ref 03) → footer/manifesto signature. Space Mono (ref 04) → micro labels. Katya (ref 05) →
Introduction manifesto stage. ODDWORKS (ref 05) → one signature scene. Refs saved + annotated in
`docs/references/typography/`.

## Turkish glyph verification (Phase 2 §2.7 Task 2)

Verified rendering on the prod build: **ŞİFA, ZİHİN, BÜTÜNLÜK, ENERJİ** (ş, İ dotted-cap, ü) render
correctly in Cormorant display + the ODDWORKS mass; Space Mono labels (TANIŞMA, ALTI DİSİPLİN) and
the copper accent all correct. `overflowX` 0 at 1440/768/390; single `<h1>`; build green; shared JS
unchanged (101 kB). Space Mono carries latin-ext, used for indices/labels only.

## Blocker

**Kisthe** font file is not in the repo and its license + Turkish coverage are unverified — see
`docs/decisions.md` D035. Until a licensed woff2 is supplied, `--font-kisthe` falls back to the serif
italic (Cormorant), so the signature role is visible and correct in Turkish; swapping in the real
face is a one-line token change with no markup edits.
