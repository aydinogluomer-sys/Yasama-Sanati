# Footer Gap List

Reference: `C:\Users\Trade Bilisim\.gemini\antigravity-ide\brain\bc051c74-687d-4ca4-a1b1-8a450198804b\site_footer_1781825006195.png`

Most of the structural mismatch has been removed. Remaining minor differences:

1. ~~The reference feels a touch flatter and slightly less saturated in the footer body.~~ **DONE** — radial glow `rgba(67,103,84,0.24)`→`0.12` (falloff 40%→45%); base gradient desaturated `#27352f/#2a3831`→`#28332e/#293730`.
2. ~~The watermark at the top reads a little lighter in the reference.~~ **DONE** — `FooterBackgroundText` stroke `rgba(243,239,230,0.045)`→`0.03`.
3. ~~The legal/footer bar feels marginally tighter in the reference, especially around the center links.~~ **DONE** — bar `py-6`→`py-5`, outer `gap-5`→`gap-4`; legal `ul` `gap-x-2.5 gap-y-2`→`gap-x-2 gap-y-1.5`, `li` `gap-2.5`→`gap-2`.
4. **OPEN (asset-gated):** the bottom-left fixed badge in the reference needs a badge image asset; not added.

Verified prod (3300): build green, footer body flatter/less saturated, watermark fainter, legal bar tighter; `overflowX` 0 + single `<h1>` at 1440 and 390. Screenshots `awwwards-loop/reports/typo/footer-css-{legalbar,m,body}.png`.
