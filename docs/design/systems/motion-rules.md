# Motion Rules

## Roles

- Hover/focus feedback: 160–220ms.
- Small reveal: 360–480ms.
- Section reveal: 520–700ms.
- Hero entrance: 800–1100ms maximum.
- Scroll-linked depth: subtle and never required for comprehension.

## Hard Rules

- No scroll hijacking or automatic section snapping.
- No decorative infinite glow, bounce, or parallax loops.
- Motion must preserve focus, anchors, form state, and native scrolling.
- `prefers-reduced-motion` receives static video posters, static transforms, and immediate state changes.
- 3D camera movement is user-led and calm.

## Round 2 — Cinematic transition system

All motion now consumes `utils/motion/tokens.ts` (easing/duration/stagger). Transition components:

- **Ambient morph** — `SectionSeam` renders a gradient band blending the previous section tone into
  the next (no hard colour cuts), placed at every tone change in `app/page.tsx`.
- **Screen wash** — the same seam sweeps a soft copper veil vertically as it passes the viewport
  (scroll-linked `useScroll` → `y`/`opacity`). Reduced motion → static blend only.
- **Section reveal** — `SectionTransition` ("rise"/"clip") gives a content block a scroll-linked
  cinematic entrance. Applied to SustainableRetreat. Reduced motion → static.
- **Hero opening + meridian draw** — Phase 3 / Phase 9 (signature layer).

Seam map (page.tsx): Intro→Wellness, Wellness→Innovation, Innovation→Story (deep→cream),
Story→Retreat (cream→warm), Retreat→Form (warm→sage).

## Verification

Test normal and reduced-motion modes at 1366×900, 768×1024, and 375×812. Verify that no content, control, or status depends on animation to become usable.
