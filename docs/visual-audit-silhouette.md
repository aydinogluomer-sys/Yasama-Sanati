# Visual Audit — Silhouette Sprint Baseline (Phase 0)

Method: static code review of the production home composition (no UI changes yet).
Scored against **visible-impact** categories from the silhouette plan, 0–10.
This is intentionally harsher than the polish round's 94/100 quality score — it measures
*distinctiveness / Awwwards memorability*, not correctness.

| Category | Baseline | Evidence (current code) |
|---|---:|---|
| Hero silhouette | 6.5 | Full-bleed video w/ 24-blind scroll mask is decent, but composition is generic: bottom-anchored marquee + small masked headline (`text-40` ≈ mid size) + two plain pill CTAs. No giant type, no asymmetry, no human mark. |
| Typography drama | 5.0 | **Biggest gap.** No clamp display scale; `--text-144` max rarely used. Cormorant serif is loaded in layout but barely used — all body/headings are mid-size grotesque. Nothing reads "editorial." |
| Section transition quality | 5.5 | Every section reuses the same `MaskText` fade-up + parallax image reveal. Predictable, no character per section. |
| Signature motion | 5.0 | Hero blind-mask + 3D meridian scene exist in isolation; no site-wide signature motif binding the experience. |
| Editorial layout rhythm | 6.0 | Introduction has a nice asymmetric grid; most other sections share similar mass/proportion. |
| Card state fluidity | 6.5 | `ClipImageCard`/`MaskTextClient` have masked entrances and a state-aware stagger, but exits are abrupt and threshold changes feel snappy. |
| Button / CTA tactility | 5.5 | `BorderedButton` SVG uses `preserveAspectRatio="none"` with **no** `vectorEffect="non-scaling-stroke"` (stroke deforms) and a **0.3s hover delay** + 0.8s duration (laggy). Hero CTAs are plain color-transition pills. |
| Mobile visual impact | 6.0 | Separate mobile hero exists and works, but it is a calmer version, not a distinct dramatic composition. |
| Accessibility | 9.0 | Strong from round 1 — keyboard dialogs/menu/form, reduced-motion, focus, semantics. **Protect, do not regress.** |
| Performance | 8.7 | Strong — home 204 kB first-load JS, deferred 3D, conditional film. **Protect.** |
| Brand fit | 8.0 | Clear wellness/holistic identity; olive/cream/copper palette is coherent. |
| Awwwards memorability | 5.0 | Currently reads as a well-built template/clone, not a memorable authored experience. |

## Summary

- **Visible-impact average (the 8 design categories, excl. a11y/perf/brand):** ≈ 5.6 / 10.
- **Overall average (all 12):** ≈ 6.4 / 10.
- Round 1 raised *quality* to 94/100; this confirms the user's complaint: high quality, low distinctiveness.

## Confirmed Code-Level Findings (feed Phase 2/8 directly)

- `app/globals.css`: viewport-proportional `--multiplier` type scale, no editorial clamp display tiers; serif underused.
- `components/Server/MaskText.tsx`: hardcoded `lines[]` arrays → manual line breaks (Introduction has separate mobile/desktop arrays).
- `components/Server/BorderedButton.tsx`: missing `vectorEffect="non-scaling-stroke"`, `0.3s` hover delay, `0.8s` duration.
- `sections/Hero/Server.tsx`: small headline, two pill CTAs, no signature opening typography.
- No `utils/motion/tokens.ts` / `utils/motion/variants.ts` yet → motion constants scattered (the `[0.24,0.43,0.15,0.97]` easing is copy-pasted across files).

## Baseline Health

- `npx tsc --noEmit`: PASS (exit 0).
- Prior round build: 31 pages, home first-load JS 204 kB, no lint warnings.
