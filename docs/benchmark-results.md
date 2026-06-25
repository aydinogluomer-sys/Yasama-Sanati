# Benchmark Results

## Production build

- Next.js 15.2.2 production build: PASS.
- TypeScript and lint validation: PASS.
- Static generation: 31 pages.
- Home route: 12.4 kB route size, 204 kB first-load JS.
- Shared first-load JS: 101 kB.
- Meridian program route: 4.52 kB route size, 189 kB first-load JS; WebGL chunk loads progressively near its scene.
- Build has no `no-img-element` warnings after blog image migration.

## Browser matrix

| Viewport | scrollWidth | clientWidth | Result |
|---|---:|---:|---|
| 1366×900 | 1366 | 1366 | PASS |
| 768×1024 | 768 | 768 | PASS |
| 375×812 | 375 | 375 | PASS |

## Runtime behavior

- Reduced motion: native scroll, paused hero background, static meridian explanation, no WebGL canvas.
- Standard desktop: meridian canvas mounts after approaching the viewport; renderer DPR capped at 1.5.
- The 37.9MB intro film is absent until the user opens its dialog and uses metadata preload.
- Unused duplicate GLB removed, reducing deploy output by 6.7MB.

## Round 2 — Silhouette redesign build (Phase 11)

Clean `.next` + `next build` after Round 2:

- Build: PASS. Lint + type validation: PASS. **No errors, no warnings.** 31 static pages (unchanged).
- Home route: **15 kB route / 207 kB first-load JS** (was 12.4 kB / 204 kB → **+3 kB first-load**).
- Shared first-load JS: **101 kB (unchanged)**.
- Meridian program route: 4.53 kB / 190 kB (≈ unchanged).
- **No new dependencies** (D024 held): all Round-2 motion reuses Motion/Lenis. Seven new client
  components + `BorderedButton` becoming a client component cost only ~3 kB.

### Performance posture

- New motion is transform/opacity/clipPath-based (GPU-friendly); no layout-thrashing loops.
- `ScrollMeridian` = one `useScroll` + `useSpring`; each `SectionSeam` uses a scoped `useScroll`
  (5 instances) — low overhead, acceptable; watch on very low-end mobile.
- 3D meridian scene untouched (still deferred/lazy). Reduced motion still disables Lenis/WebGL.

## Unmeasured production metrics

Local evidence does not substitute for field LCP/CLS/INP. Production RUM/Lighthouse remains an optional follow-up documented in `docs/issues.md`.
