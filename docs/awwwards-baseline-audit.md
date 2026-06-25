# Awwwards Baseline Audit (Phase 0)

Honest baseline for the SOTD pass, scored against the official weighting
(Design 40 / Usability 30 / Creativity 20 / Content 10). Captured after the silhouette redesign
(round 2) and the SOTD loop fixes (G1 mobile hero, G2 footer closing scene, submission polish).
Evidence: `awwwards-loop/reports/phase-test/*` (prod build, 1440 / 768 / 390) and `iteration-08..12`.

## Scores (0–10, SOTD weighting)

```text
Current Design Score:     9.2
Current Usability Score:  9.1
Current Creativity Score: 9.0
Current Content Score:    8.7
Weighted Current Score:   9.08   (9.2×0.40 + 9.1×0.30 + 9.0×0.20 + 8.7×0.10)
```

Internal targets: HM ≥ 6.5 · SOTD ≥ 9.0 · preferred ≥ 9.23. Current sits just inside the SOTD band;
the preferred 9.23 needs the non-code levers below (photography / sound / experimental hero).

## Findings

```text
Biggest Weakness:        Photography is competent stock-grade, not art-directed — caps the Design ceiling.
Biggest Opportunity:     Custom art-directed imagery + one bolder signature moment → pushes Design+Creativity to 9.4/9.3.
Most SOTD-relevant section: Cream Story chapter ("insan kendine nasıl geri döner?") and the hero opening.
Most generic section:    (was) the footer — now rebuilt as a closing scene (G2); no generic section remains.
Most urgent redesign target: (resolved) mobile hero glyph/headline collision (G1) and footer-as-sitemap (G2).
```

## Visible vs invisible (why it is/ isn't SOTD yet)

- Visible silhouette is strong: giant editorial hero, tonal section rhythm, cinematic seams, scroll-drawn
  meridian signature, fluid clip-card stage, cream chapter, footer closing scene. Both desktop and mobile
  read as art-directed scenes (no desktop-only beauty).
- Technical floor is solid: build green (31 pages), `overflowX` 0 at all three viewports, single `<h1>`,
  global reduced-motion, no new deps, branded OG + custom 404 (submission polish).
- The remaining gap to the *preferred* 9.23 band is not code polish (that is at diminishing returns and
  risks regression) — it is art direction at the asset level (photography), an optional restrained sound
  layer, or a more experimental hero concept. These are decision-gated.

## Section-by-section (visible-impact)

| Section | Character | Verdict |
|---|---|---|
| Hero | Giant serif, masked reveal, handwriting, scrim, clear CTAs; mobile glyph fixed | Strong |
| Introduction | Centered editorial lead + responsive-safe body reveal | Strong |
| WellnessSanctuary | Split image/editorial, copper accent | Strong |
| Innovation (clip cards) | Sticky "Şifa Yolculuğu" stage, crossfade + settle, fluid states | Strong |
| Story (cream chapter) | Oversized serif, asymmetry, handwriting, tonal contrast | Signature-grade |
| SustainableRetreat | Image-mass composition, rise transition | Strong |
| Seams | Ambient tonal morph + scroll wash | Strong |
| Footer | Closing scene ("Başlamak için bir nefes yeter.") + CTAs | Strong (rebuilt) |
