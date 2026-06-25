# Silhouette Redesign — Local Mirror & Sprint State

> Local mirror of `yasama-sanati-silhouette-awwwards-implementation.md` (repo root).
> This is the **second creative round**: not polish, but a *visible silhouette redesign*.
> Round 1 (polish) reached 94/100 on invisible quality but did not change visual perception.

## Sprint Goal

Make the site look meaningfully different in screenshots / scroll recordings while preserving
brand identity and core content order. Each phase must pass the test:

> "Can the user see this difference in a screenshot or scroll recording?"

If no → phase is not done.

## Phase Map (this sprint)

| Phase | Title | State |
|---|---|---|
| 0 | Baseline & scope freeze | ✅ done |
| 1 | Creative direction reset | ✅ done |
| 2 | Typography system V2 | ✅ done |
| 3 | Hero silhouette redesign | ✅ done |
| 4 | Section rhythm & visual mass | ✅ done |
| 5 | Cinematic section transitions | ✅ done |
| 6 | Responsive-safe text animation | ✅ done |
| 7 | ClipImageCard fluidity | ✅ done |
| 8 | Button/CTA motion standard | ✅ done |
| 9 | Meridian/breath signature layer | ✅ done |
| 10 | Accessibility & reduced-motion hardening | ✅ done |
| 11 | Performance & build hardening | ✅ done |
| 12 | Full QA & final score | ✅ done — avg 6.4 → ~8.8 |

**QA helpers:** `qa/shot.mjs` (CDP scroll + emulated screenshot) and `qa/probe.mjs` (overflow/metrics)
are standalone node scripts (not imported by the app, no bundle impact) for production-build verification.

## Working Mode

- Single Claude Code session simulating the agent roles sequentially (Simple Mode from §3.4.1).
- All approvals in the source plan are pre-approved by the user.
- Each phase ends with a report: visible diff, files changed, score, risks, next phase.
- No new dependencies unless justified in `decisions.md` (GSAP only if a timeline truly needs it).

## Signature Moments Target (≥3)

1. Hero opening moment (staggered editorial reveal + meridian draw).
2. Section transition moment (ambient morph / panel overlap).
3. Editorial typography / handwriting moment.
4. (Optional) Meridian / breath scroll motif.
