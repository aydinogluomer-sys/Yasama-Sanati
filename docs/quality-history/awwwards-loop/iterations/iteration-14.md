# Iteration 14 — Inner-page typography unified to the editorial serif voice

## Trigger

The SOTD loop was scoped to route `/`. Auditing the inner pages (judges click around) revealed a
design-system inconsistency: every sub-page hero headline used the **giant sans** (`text-144`), while
the home established **serif (Cormorant)** as the editorial display voice. This breaks
"Tasarım sistemi tutarlılığı" — a real Design criterion.

## Change

`components/Server/SubPageLayout.tsx` — the shared sub-page hero `<h1>` (both `heroFullScreen` and the
default branch) changed from `text-40 md:text-144 font-light` (sans) to
`font-serif text-display-l font-normal tracking-[-0.02em]` (serif display scale, viewport-fluid clamp).
Description copy stays sans (consistent with the home body). One component → every sub-page updated:
programlar (listing), programlar/* (detail, heroFullScreen + scroll cue), egitmenler, the-story, sss,
and the placeholder routes.

## Verification (prod build, port 3300)

- `next build` PASS, exit 0.
- Serif hero confirmed on `/programlar` ("Eğitim Programları"), `/egitmenler` ("Eğitmenlerimiz"),
  `/the-story` ("Hikayemiz"), `/programlar/meridyen-terapi` ("Meridyen Terapi", full-screen + scroll
  cue) at desktop; `/programlar` at mobile wraps cleanly to two lines. `overflowX` 0, single `<h1>`.
- Screenshots: `reports/inner/{programlar-2,egitmenler-2,story-2,meridyen-2,programlar-m}.png`.

## Score (SOTD lens, /100)

Design-system consistency now spans the whole site (not only `/`). Overall holds **94/100** with a
stronger consistency/typography sub-signal across the site.

## Verdict

PASS. Inner pages now share the home's editorial serif voice. Remaining upside stays decision-gated
(photography / sound / experimental hero).
