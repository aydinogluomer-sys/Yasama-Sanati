# Iteration 08 — SOTD pass (12 critical parameters)

New loop cycle: drive route `/` from "well-polished site" band toward Awwwards SOTD band,
evaluated against the official weighting (Design 40 / Usability 30 / Creativity 20 / Content 10)
and the 12 project-critical parameters from the silhouette plan §6.

## Phase-test result (pre-loop gate)

All 12 silhouette phases re-tested: `tsc --noEmit` PASS, `next build` PASS (31 pages, home 207 kB),
runtime screenshots captured at desktop 1440 / tablet 768 / mobile 390. Every phase artifact present
and functioning. Two visible gaps found → loop backlog.

## Backlog (highest-impact visible gaps, SOTD lens)

- [x] G1 — Mobile hero: centred play glyph collided with the editorial headline. (this iteration)
- [ ] G2 — Footer is a competent multi-column sitemap, not a "closing scene" (item 12). Highest
      remaining Design/Creativity gap. → iteration 09.
- [ ] G3 — Confirm clip-card scroll-through is fluid (item 7) at real scroll positions, not a
      mid-wipe banding artefact.
- [ ] G4 — Design/Creativity boldness sweep: review section-to-section contrast and any
      "template-smell" zones for oversized type / asymmetry opportunities.

## This iteration — G1

Mobile hero play affordance moved out of dead-centre (was overlapping `Beden, zihin / ve enerji,
/ tek bütün.`) to upper-centre with a discreet `bg-black/20 ring-1 ring-white/40 backdrop-blur-sm`
pill. Full-screen tap-to-play target preserved; desktop unaffected.

## Acceptance

Build/type green, mobile hero headline unobstructed, no regression on desktop/tablet hero.
