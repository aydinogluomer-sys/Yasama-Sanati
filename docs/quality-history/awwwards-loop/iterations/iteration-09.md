# Iteration 09 — G2: footer as a closing scene (critical parameter #12)

## Goal

Turn the footer from a competent multi-column sitemap into the page's editorial *closing scene* —
the highest remaining Design/Creativity gap on the SOTD lens.

## Change

`sections/Footer/Server.tsx` — a new closing band sits above the practical columns:

- kicker `Bir sonraki adım` (copper),
- giant serif headline `Başlamak için *bir nefes* yeter.` at `text-display-m`, with `bir nefes`
  italic + a `HandwritingMark` (trigger="inView") underline — ties the close to the breath/meridian
  motif and keeps the human-mark accent (parameters #2, #3),
- supporting line + two CTAs reusing the hero CTA grammar (copper primary `Ön Görüşme`, outlined
  `Programları İncele`) → conversion clarity is the natural end of the narrative (Content/Usability),
- divider, then the existing columns/newsletter/bottom-bar as the subordinate practical layer.

Watermark left intact (faint brand outline behind a different closing sentence → editorial layering,
no semantic doubling). `--text-display-m` already existed in the scale; no new token needed.

## Verification

- `next build` PASS (31 pages — temp QA preview route removed).
- Prod screenshots (3301): closing scene renders with headline + handwriting + both CTAs above the
  columns (`reports/phase-test/footer-prod-close2.png`); columns/newsletter intact below.
- `overflowX: 0` desktop & mobile; single `<h1>` preserved (the closing title is an `<h2>`).
- Note: `whileInView` reveals do not fire under headless **dev** jump-scroll; the production server
  reproduces the real-scroll reveal, so QA screenshots for reveal-gated content use the prod build.

## Acceptance

Footer reads as a closing scene, not a sitemap; build green; no overflow; conversion CTA present.
