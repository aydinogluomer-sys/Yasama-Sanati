# Hero Redesign

## Goal

Make the first screen feel more editorial, more explicit, and more aligned with the selected “Editorial Wellness Academy” direction.

## What Changed

- The marquee now lists the actual practice areas more clearly.
- The main statement now explains the academy’s value in plain language.
- The right-side prompt now points to the academy rather than a generic scroll cue.
- A small editorial service strip now anchors the hero with clearer context.
- Primary and secondary actions now lead to programs and the pre-consultation form.
- Background video respects reduced-motion preference and uses inline mobile playback.
- The intro film can be opened and closed by keyboard, including Escape, with named controls.

## Why

The original hero had a strong mood but not enough explicit product clarity. The new wording should help a visitor understand the offer faster without sacrificing the calm tone.

## Next Checks

- Confirm the hero still feels calm on desktop.
- Confirm the service strip does not crowd mobile.
- Confirm the new copy reads naturally with the video background.
- Confirm the hero still hands off cleanly to the introduction section.
- Confirm focus order and visible focus styling for the film trigger, CTAs, close, timeline, and fullscreen controls.
- Confirm reduced-motion mode retains a useful poster frame without scroll-driven movement.

## Verification Status (Round 1)

- Production build: PASS.
- `git diff --check`: PASS (line-ending notices only).
- Browser matrix: BLOCKED because the in-app browser was unavailable; no visual score has been assigned.

---

# Hero Silhouette Redesign (Round 2 — Phase 3, implemented)

## New composition (Option A + C hybrid)

Three layers over the existing brand video:
1. **Editorial typography** — giant serif headline `Beden, zihin / ve enerji, / tek bütün.`
   (`text-display-l`, last line italic), bottom-anchored, asymmetric.
2. **Human mark** — `HandwritingMark` hand-drawn underline stroke under "tek bütün." (pathLength draw).
3. **Visual / motion field** — brand video + readability scrim + `MeridianDrawPath` signature line.

Supporting: quiet service marquee (now small, top), copper kicker, body-lg proposition, CTA hierarchy
(primary copper "Ön Görüşme →", secondary outline "Programları İncele"), trust line.

## Opening motion timeline (mount, reduced-motion safe)

`0.15s` marquee → `0.25s` kicker → `0.3/0.4/0.52s` headline lines (mask reveal) →
`0.7s` proposition → `0.9s` CTAs → `~1.05s` handwriting draw + `~0.45s` meridian draw.
Reduced motion collapses transforms to final state (MotionConfig `reducedMotion="user"` + explicit
handling in the meridian/handwriting components).

## Files

- `components/Client/HeroOpeningMotion.tsx` (new) — animated editorial composition.
- `components/Client/HandwritingMark.tsx` (new) — hand-drawn accent stroke.
- `components/Client/MeridianDrawPath.tsx` (new) — signature meridian line (reused in Phase 9).
- `sections/Hero/Server.tsx` — rewritten as the shell (scrim + meridian + opening motion).

## Preserved behaviours

- Click anywhere on the hero (outside CTAs) still opens the intro film (pointer-events kept).
- Mobile keeps a distinct composition: stacked full-width CTAs, play affordance, clamp-scaled type.

## Verified (live, next dev + headless screenshots)

- Desktop 1440×900 and mobile 390×844 captured — silhouette is clearly a different creative direction.
- No compile errors; old hero copy ("premium eğitim…", "Aşağı kaydır") removed.

## Gotcha logged

- `Marquee.tsx` hardcodes `text-[100px] md:text-144`; tailwind-merge does not dedupe a custom
  `text-kicker` against arbitrary `text-[100px]`, so override the marquee size with arbitrary px
  (`text-[11px] md:text-[13px]`), not a theme token.
- The hero support paragraph needed an explicit mobile width cap (`max-w-[19rem]`) to wrap safely.
