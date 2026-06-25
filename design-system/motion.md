# Motion

## Motion Philosophy

Motion should be invisible until it helps comprehension or focus.

## Allowed Motion

- Hover shift
- Fade in
- Small vertical reveal
- Gentle stagger
- Scroll-linked storytelling when truly needed

## Timing Targets

- Hover: 160–220ms
- Small reveal: 360–480ms
- Section reveal: 520–700ms
- Hero entrance: 800–1100ms

## Rules

- Do not use motion as decoration.
- Do not animate everything.
- Do not break reduced-motion behavior.
- Do not make users fight the scroll.
- Do not auto-snap ordinary page scroll.
- Infinite attention-seeking loops are forbidden.
- Scroll-linked transforms must become static under `prefers-reduced-motion`.
- Exit/feedback motion must not delay access to the next action.

## Preferred Stack

- Motion
- GSAP for rare cinematic moments
- Lenis only where it improves overall feel without harming accessibility

## Runtime Tokens

- `--motion-hover`: 200ms
- `--motion-reveal`: 600ms
- Reduced motion: 0.01ms global safety fallback plus component-level static states.
