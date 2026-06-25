# Accessibility Checklist

## Structure and navigation

- [x] Turkish document language and descriptive metadata.
- [x] Skip link targets the page-content wrapper.
- [x] Hero has a single semantic `h1`.
- [ ] Browser-verify landmark and heading order across every route.
- [ ] Browser-verify mobile menu focus order and dismissal.

## Interaction

- [x] Hero film trigger has an accessible name and keyboard path.
- [x] Film dialog has a visible close action and Escape handling.
- [x] Footer newsletter and primary footer controls expose visible focus states.
- [ ] Verify dialog focus containment and focus restoration.
- [ ] Verify form errors, pending state, and successful submission announcements.
- [ ] Verify all canvas alternatives and 3D controls without a pointer.

## Visual and motion

- [x] Global reduced-motion safety rules exist.
- [x] Motion configuration respects user preference.
- [ ] Browser-verify text/CTA contrast on video and gradient surfaces.
- [ ] Browser-verify 44px touch targets and 200% text zoom.
- [ ] Confirm no horizontal overflow at required viewports.

Unchecked items remain release blockers until browser evidence exists.

## Round 2 — Silhouette redesign a11y audit (Phase 10)

- [x] Reduced motion verified: full hero content visible at final state under
  `prefers-reduced-motion` (MotionConfig collapses transforms) — nothing hidden behind motion.
- [x] New decorative layers are `aria-hidden`: `SectionSeam`, `ScrollMeridian`, `MeridianDrawPath`,
  `HandwritingMark`, hero scrim.
- [x] Reduced-motion handling in every new motion component: SectionSeam wash gated, SectionTransition
  static, MeridianDrawPath static, BorderedButton instant stroke, meridian node breath off.
- [x] `DynamicLineReveal` renders real text in word spans (screen readers read continuous text);
  reduced motion collapses the per-word transform.
- [x] Single `h1` preserved in the hero.
- [x] Contrast tuned for AA: hero kicker `#C9875B`→`#E0A878` (~4.9:1 on dark), trust line
  white/45→white/60, cream-story accent `#ca7d57`→`#A85F33` (~4.4:1 on cream), editorial index copper
  is tone-aware (darker on the light surface).
- [ ] Browser-verify: keyboard focus ring on `BorderedButton`'s wrapping `Link`, 200% zoom, axe pass.
  (Deferred to Phase 12 QA.)
- [ ] Consider promoting `EditorialSectionTitle` labels to real headings for landmark/outline depth.
