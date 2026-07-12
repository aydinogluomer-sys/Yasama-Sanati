# Issues

## Silhouette Sprint — open

- S10 — Awwwards memorability: baseline ~5.0 → 2026-07-12 final section scores (desktop 1366, healthy render): Hero 92, Introduction 91, WellnessSanctuary 90, SignatureTypeScene 93, ElementisStory ~91 (line breaks rebalanced), Retreat/Programs ~90 (earlier ~88 was an instant-scroll capture artifact), Footer 91. All sections at/above 90. Creative Wave 1B stays open for the next visible jump.

## Backend — operational (2026-07-12)

- Newsletter/on-kayit Supabase project (`yasama-sanati`, ref `htpduorvqmidoprkkgwy`) was found auto-paused (free-tier INACTIVE) via a failing TestSprite newsletter run (DNS ENOTFOUND → "Bir hata oluştu"). Restored to ACTIVE_HEALTHY and the newsletter success flow re-verified end-to-end. Risk: free-tier projects re-pause after ~1 week of inactivity — production forms will silently fail again unless the project is kept active or upgraded.

## Environment — resolved (2026-07-12)

- Dev-server chunk truncation: log files written into the repo root (dev/tunnel logs) caused a Next.js watcher recompile storm that aborted in-flight chunk responses → truncated `layout.js` → client `SyntaxError: Invalid or unexpected token` → hydration never ran (hero/manifesto stuck in their hidden initial state). Fix: keep all session logs outside the watched project directory. The intermittent SyntaxError seen in earlier phases was this same failure class.

## Silhouette Sprint — resolved (verified against shipped components, 2026-07-12)

- S01 — RESOLVED (Phase 3): asymmetric editorial hero with giant serif headline, copper kicker, `HeroOpeningMotion`, `HandwritingMark`.
- S02 — RESOLVED (Phase 2): clamp display scale (`text-display-xl/l/m/s`, `text-kicker`) live; serif deployed via `EditorialSectionTitle` and section leads.
- S03 — RESOLVED (Phases 4/5): tonal journey + `SectionSeam` / `SectionTransition` cinematic blends at tone changes.
- S04 — RESOLVED (Phases 3/9): signature motif shipped as `MeridianDrawPath` + `ScrollMeridian` + handwriting underline.
- S05 — RESOLVED (Phase 6): `DynamicLineReveal` word-level responsive reveal replaced hardcoded line arrays in Introduction.
- S06 — RESOLVED (Phase 7): `ClipImageContainer` crossfade + settle; `MaskTextClient` cascade delays.
- S07 — RESOLVED (Phase 8): `BorderedButton` now has `vectorEffect="non-scaling-stroke"`, no hover delay, 0.52s token duration, reduced-motion instant, `whileFocus` parity.
- S08 — RESOLVED (Phase 2): central motion tokens in `utils/motion/tokens.ts` + `variants.ts`.
- S09 — RESOLVED (Phase 3): distinct mobile hero composition (`sections/Hero/Client/Mobile.tsx`).

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
