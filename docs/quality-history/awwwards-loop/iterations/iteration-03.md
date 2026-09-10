# Iteration 03 - Final verification plan

## Goal

Validate the footer rewrite on a live local server with real browser evidence and close the loop only if the responsive and interactive checks pass.

## Scope

- `sections/Footer/Server.tsx`
- `components/Client/FooterBackgroundText.tsx`
- `components/Client/FooterNewsletter.tsx`
- loop artifacts under `awwwards-loop/`

## Verification steps

1. Start a stable local production server from the current build.
2. Capture desktop, tablet, and mobile render states.
3. Confirm there is no horizontal overflow at 1366x900, 768x1024, or 375x812.
4. Inspect the full mobile footer to verify wrapping at the legal bar and newsletter card.
5. Check focus visibility on newsletter input and button.
6. Submit the newsletter form with a valid address and verify the success state.
7. Re-run build and diff checks before closing the loop.

## Exit criteria

- Build passes.
- Browser evidence exists for all required states.
- No category drops below 70.
- Overall score is at least 90.
