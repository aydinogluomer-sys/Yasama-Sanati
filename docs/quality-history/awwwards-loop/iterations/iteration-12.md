# Iteration 12 — Submission Polish (approved awwwards-sotd-implementation.md, Phase 15)

User approved `awwwards-sotd-implementation.md` — the fuller 16-phase SOTD framework. The code phases
(the 12 critical tasks) were already done/verified; the genuinely-new, low-risk, high-value work it adds
is **Submission Polish** + documentation deliverables. This iteration ships submission polish.

## Changes

- `app/not-found.tsx` — on-brand custom 404 (deep-green field, copper kicker `404 — Kayıp bir patika`,
  serif `Aradığın sayfa burada değil.`, supporting copy, hero-grammar CTAs). Was the Next default.
- `app/opengraph-image.tsx` — branded dynamic OG card (1200×630, `next/og`, **edge runtime**): deep-green
  field + radial glow, copper kicker `BÜTÜNSEL ŞİFA & EĞİTİM AKADEMİSİ`, large `Yaşama Sanatı` wordmark +
  copper rule, discipline line, domain. Turkish uppercase written literally (satori `textTransform`
  mis-cases the dotted İ).
- `app/layout.tsx` — added `metadataBase`, `openGraph` (website / tr_TR / siteName), and `twitter`
  (summary_large_image). favicon.ico already present; OG/twitter images auto-wired from the file convention.

## Why edge runtime for the OG route

Static (node) prerender of `/opengraph-image` failed the build with `TypeError: Invalid URL` (known Next
15 metadata-image static-gen issue). `export const runtime = "edge"` is the canonical `next/og` path and
builds + serves cleanly under `next start`.

## Verification (prod build, port 3302/3303)

- `next build` PASS, exit 0, 31 static pages + `ƒ /opengraph-image` (edge), `/_not-found` static.
- `/opengraph-image` → 200 `image/png` ~185 kB; rendered card correct incl. Turkish casing fix
  (`reports/phase-test/og-image-2.png`).
- `/<bogus>` → HTTP 404 with the branded page at desktop + mobile (`reports/phase-test/notfound-d.png`,
  `notfound-m.png`).

## Score (SOTD lens, /100)

Composition 18 · Typography 14 · Visual system 14 · Interaction/motion 14 · Responsive 19 ·
Accessibility 10 · Originality 5 → **94/100** (+1: submission polish raises Visual system / submission
readiness).

## Verdict

ITERATE → remaining approved-plan deliverables: docs `strategy.md`, `positioning.md`,
`design-system/visual-language.md` (most design-system docs + art-direction already exist), then a final
submission-polish QA sweep.
