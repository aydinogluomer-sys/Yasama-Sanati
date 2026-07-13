# Issues

## Silhouette Sprint — open

- S10 — Awwwards memorability: baseline ~5.0 → 2026-07-12 final section scores (desktop 1366, healthy render): Hero 92, Introduction 91, WellnessSanctuary 90, SignatureTypeScene 93, ElementisStory ~91 (line breaks rebalanced), Retreat/Programs ~90 (earlier ~88 was an instant-scroll capture artifact), Footer 91. All sections at/above 90. Creative Wave 1B stays open for the next visible jump.

## Backend — operational (2026-07-12)

- Newsletter/on-kayit Supabase project (`yasama-sanati`, ref `htpduorvqmidoprkkgwy`) was found auto-paused (free-tier INACTIVE) via a failing TestSprite newsletter run (DNS ENOTFOUND → "Bir hata oluştu"). Restored to ACTIVE_HEALTHY and the newsletter success flow re-verified end-to-end. Risk: free-tier projects re-pause after ~1 week of inactivity — production forms will silently fail again unless the project is kept active or upgraded.

## Environment — resolved (2026-07-13)

- **Unstyled footer (white background, faded text):** a bare `Footer/` pattern added to `.git/info/exclude` (to protect the repo-root screenshots folder from stage-all sweeps) also matched **`sections/Footer/`**. Tailwind v4's scanner respects git ignore rules, so it stopped scanning `sections/Footer/Server.tsx` and never emitted footer-only utilities (`isolate`, `bg-[#293A32]`, `-z-20`, the gradient layer) — the DOM had the right classes, the CSS had no rules for them. It stayed hidden until `.next` was deleted and Tailwind regenerated from scratch. Fix: anchor every directory pattern to the repo root (`/Footer/`). Diagnose with `git check-ignore -v --no-index <path>` (plain `check-ignore` is silent for tracked files).
- **"Site got very slow / pages disappeared":** two dev servers ran at once (a comparison worktree on :3002 sharing the main repo's `node_modules` via junction) and saturated the CPU — single requests took 50s and chunks arrived late/partial. Never run two dev servers against this project.
- **Lighthouse measurements are worthless on a loaded machine:** leftover headless-Chrome processes made the same build score 27 → 94 on desktop. Always kill Chrome and re-run 2–3 times, trusting the cleanest run.

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

## Open — non-blocking follow-ups (from Round 1; 2026-07-12 status)

- Source photography remains large (several 2.5–5.5MB PNG files). `next/image` protects delivery, so this is repo/deploy weight only. Conversion deliberately deferred: static imports live partly in protected files (Innovation). `image-1.bak.png` (5.3MB) is an orphaned backup candidate for removal.
- RESOLVED: `human.glb` 6.4MB → 0.49MB (stripped 44 unused animation clips, kept A_TPose + Idle_Loop; dedup/weld/quantize). Therapy scene now plays skeletal idle breathing.
- RESOLVED: hero videos re-encoded (desktop 4.0→2.6MB, mobile 2.9→1.8MB, SSIM 0.993); intro film 36.1→27.5MB (SSIM 0.992).
- Lighthouse (local prod, 2026-07-12): **desktop Perf 96 / A11y 97 / BP 100 / SEO 100** (LCP 1.1s, CLS 0.027, TBT 50ms). Mobile-emulated (4x CPU + slow-4G lab throttle): Perf 42 (LCP 7.0s, TBT 1.6s) with no material waste found (unused JS 24KiB, no >200ms opportunities) — the cost is hydration/motion main-thread work inherent to the editorial approach. Production RUM should confirm real-device INP/LCP before optimizing further.

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
