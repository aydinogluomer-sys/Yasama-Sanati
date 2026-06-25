# Visual Language (Phase 2 — Art Direction system)

The visual world of Yaşama Sanatı. Pairs with `docs/art-direction.md` and the token docs
(`design-system/colors.md`, `typography.md`, `motion.md`, `spacing.md`, `section-rhythm.md`).

## Visual metaphor

Breath / inner alignment / energy channels — soft opening and unfolding. Expressed concretely as the
**scroll-drawn meridian line** (`ScrollMeridian`) and breath-paced reveals, not literal icons.

## Color atmosphere

```text
Deep green   #2B3530 / #30493D   — primary field, calm depth
Parchment    #F3EFE6 / #F4EFE4   — cream chapter, light contrast
Copper       #C9875B / #D58D5D / #E0A878 — accent, CTA, kicker, handwriting
Bone/sand    #D1CCBF / #CED1BF   — muted supporting surfaces
```

Rules: deep↔cream tonal rhythm between sections; copper is the only accent; no random colors, no literal
chakra palette. (See `design-system/colors.md`.)

## Typography character

- **Display:** Cormorant Garamond (serif) — scene-building, large, calm, editorial; italic for accent words.
- **Body/UI:** Basis Grotesque (local) — quiet, precise.
- **Handwriting:** `HandwritingMark` stroke — rare human accent only (hero, story, footer close).
- Scale: `--text-display-xl/l/m/s`, `--text-body-lg`, `--text-kicker` (clamp, viewport-fluid).
  (See `design-system/typography.md`.)

## Motion character

One easing family (`editorial` / `softOut` / `precise`) + shared duration/stagger tokens
(`utils/motion/tokens.ts`). Scroll-linked, breath-paced; never decorative-only. Reduced motion collapses
to final state. (See `design-system/motion.md`.)

## Composition & whitespace

Asymmetric, editorial, generous whitespace; alternating visual mass (big/small, light/dark, text-led/
image-led, narrow/full-bleed). No two adjacent major sections share mass/tone. (See `section-rhythm.md`.)

## Texture / light / material

Subtle radial glows and ambient seam washes for depth; readability scrims over media. Restraint over
decoration — no glassmorphism, no particles. Material feeling = paper-calm + soft cinematic light.

## Repeatable system & memorable scenes

- Repeatable: `EditorialSectionTitle` (index + kicker), `SectionSeam`, `SectionTransition`,
  `DynamicLineReveal`, `HandwritingMark`, `ScrollMeridian`, hero/footer CTA grammar.
- Memorable scenes (screenshot-worthy): hero typographic opening, cream Story chapter
  ("insan kendine nasıl geri döner?"), footer closing scene ("Başlamak için bir nefes yeter.").

## Do not use

Random gradients · excessive glassmorphism · literal chakra colors · generic spiritual icons · stock
wellness motifs · purposeless particles. (See `design-system/anti-patterns.md`.)
