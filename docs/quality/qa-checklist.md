# QA Checklist

## Engineering

- [x] TypeScript passes.
- [x] Production build passes.
- [x] 31 pages generate successfully.
- [x] Diff check has no whitespace errors.
- [x] Build-time third-party data dependency removed.

## Responsive visual

- [x] Desktop 1366×900 inspected.
- [x] Tablet 768×1024 inspected; full navigation collapses cleanly.
- [x] Mobile 375×812 inspected.
- [x] No horizontal overflow in required matrix.
- [x] Hero, introduction, programs, story, form, footer, and 3D states inspected.

## Interaction and accessibility

- [x] Mobile menu opens into labelled modal navigation, focuses first link, closes with Escape, and restores trigger focus.
- [x] Film dialog focuses close, traps focus with native video controls, closes immediately with Escape, and restores trigger focus.
- [x] Checkbox remains in the accessibility tree and keyboard focus order.
- [x] Inputs/selects show a visible focus ring.
- [x] 3D icon controls expose names and pressed state.
- [x] Reduced-motion mode pauses background video, disables Lenis, and uses a static 3D fallback.
- [x] Newsletter and form states have status/alert semantics.

## Content and routing

- [x] Primary hero actions point to programs and pre-registration.
- [x] Program discovery is a semantic link on desktop and mobile.
- [x] Story and instructor trust paths are explicit.
- [x] Footer contact, legal, social, newsletter, and back-to-top paths are present.
