# Performance Budget

## Targets

- LCP: under 2.5s on representative mobile hardware/network.
- CLS: under 0.1.
- INP: under 200ms.
- Initial route JS: keep the home route below the current 205kB band after polish.
- 3D: lazy, progressive, absent from initial LCP work, and replaceable by a static fallback.

## Current asset risks

- Intro film: 37.9MB / 145s, rendered only when the dialog opens.
- Desktop hero loop: 4.2MB / 18.9s.
- Mobile hero loop: 3.0MB / 18.9s and selected explicitly on mobile.
- Human model: 6.7MB; must remain dynamically loaded.
- Several source PNGs are 2.5–5.5MB; they must continue through `next/image` optimization or be converted before direct delivery.

## Engineering rules

- No new animation dependency without a measured gap.
- Video backgrounds use posters, inline playback, muted loops, and reduced-motion static behavior.
- Full intro video remains conditional and must not preload on the landing route.
- Avoid duplicate model files in production paths.
- Record build route sizes in `docs/benchmark-results.md` after integration.
