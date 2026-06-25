# Issues

## Silhouette Sprint — open (visible-redesign gaps, Phase 0 intake)

- S01 — Hero composition is generic (bottom marquee + small headline + pill CTAs); no giant editorial type, asymmetry, or human mark. (Phase 3)
- S02 — No editorial display type scale; Cormorant serif loaded but unused. (Phase 2)
- S03 — All sections share one fade-up reveal; transitions are predictable. (Phase 4/5)
- S04 — No site-wide signature motion motif. (Phase 9)
- S05 — `MaskText` uses hardcoded line arrays (manual breaks); intermediate-width break risk. (Phase 6)
- S06 — `ClipImageCard` exits are abrupt; no crossfade/out-state. (Phase 7)
- S07 — RESOLVED (Phase 8): `BorderedButton` now has `vectorEffect="non-scaling-stroke"`, no hover delay, 0.52s token duration, reduced-motion instant, `whileFocus` parity.
- S08 — Motion constants (easing/durations) copy-pasted; no central tokens. (Phase 2)
- S09 — Mobile hero is a calmer desktop variant, not a distinct dramatic composition. (Phase 3)
- S10 — Awwwards memorability low (~5.0); site reads as a well-built clone. (whole sprint)

## Open — non-blocking follow-ups (from Round 1)

- Source photography remains large (several 2.5–5.5MB PNG files). `next/image` protects delivery, but source AVIF/WebP masters would reduce build/deploy storage.
- `public/models/human.glb` is 6.7MB. The scene is dynamically loaded and absent on mobile/reduced-motion, but Draco/Meshopt/KTX2 compression remains worthwhile.
- The optional 145-second intro film is 37.9MB. It mounts only after explicit user action; an adaptive multi-bitrate encode would improve slow-network playback.
- Automated Lighthouse/field Core Web Vitals were not available in the local browser surface. Route-size and behavior gates passed; production RUM should confirm LCP, CLS, and INP targets.

## Resolved

- Hero ambiguity, missing conversion actions, unstable mobile viewport, and inaccessible film trigger/dialog.
- 768px navigation crowding and mobile-menu keyboard/focus behavior.
- Mouse-only program discovery and hydration-empty responsive headline rendering.
- Lenis scroll hijacking, default 3D rotation, infinite reduced-motion animation, and eager WebGL work.
- `the-story` reduced-motion fallback now removes the canvas entirely.
- Hidden native checkbox, missing field focus styles, small 3D controls, and low-contrast acupoint disclaimers.
- Build-time dependency on an external country-code gist.
- Five Next.js `no-img-element` warnings in blog views.
- Unused duplicate 6.7MB `test_download.glb` asset.
- 3D information-panel microcopy density on desktop.
