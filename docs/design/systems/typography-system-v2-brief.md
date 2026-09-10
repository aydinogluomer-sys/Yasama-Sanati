## Phase 2 — Typography System V2

### Amaç

Yaşama Sanatı’nı “temiz ama sıradan wellness sitesi” hissinden çıkarıp **premium, editorial, sakin ama unutulmaz bir tipografik sisteme** taşımak.

Bu fazın hedefi yalnızca font değiştirmek değildir. Amaç; font ailesi, tipografik ölçek, görsel kütle, manifesto sahneleme, outline katmanlar, mikro etiketler ve signature typography üzerinden sitenin algısını değiştirmektir.

Bu fazın sonunda site şu hissi vermelidir:

```txt
premium editorial wellness academy
```

Şu hislerden uzak durulmalıdır:

```txt
template wellness site
decorative font collage
tech startup interface
festival poster
Instagram yoga brand
generic spiritual landing page
```

---

# 2.1 Typography Architecture — Final Direction

The final typographic architecture for Yaşama Sanatı is:

```txt
High-contrast serif + premium grotesk sans
```

This is the governing typography direction.

The system is intentionally limited to a small number of strong typographic roles. Do not turn the site into a multi-font collage.

## Final Font / Role System

| Role                       | Selection                                                             | Usage                                                                         |
| -------------------------- | --------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| Main typographic direction | High-contrast serif + premium grotesk sans                            | Overall premium/editorial identity                                            |
| Primary Display            | Cormorant Garamond                                                    | Hero, major section headlines, manifesto headlines, footer closing statements |
| Body + UI                  | Basis Grotesque Pro, if already installed and licensed in the project | Body text, navigation, buttons, forms, labels, program descriptions           |
| Logo / Wordmark / Accent   | Kisthe                                                                | Logo candidate, single-word emphasis, human signature, footer accent          |
| Micro Labels               | Space Mono                                                            | 01/02 labels, dates, chapter labels, coordinates, small metadata              |
| Hero / Manifesto Staging   | Katya Yumasheva typographic system                                    | Large typography, generous whitespace, selected-word emphasis                 |
| Signature Section          | ODDWORKS dev rotate typography                                        | Şifa Yolculuğu / Altı Disiplin / transition scene                             |
| Overlay / Motion Layer     | Layered outline + serif mix                                           | Hero, footer, section transitions, atmospheric typographic depth              |

---

# 2.2 Reference Material Policy

The provided typography references are part of the creative direction and must be included in the project documentation as visual references.

Place the reference images in:

```txt
docs/references/typography/
```

Recommended file structure:

```txt
docs/references/typography/
  01-outline-typography.png
  02-high-contrast-serif.png
  03-font-candidates-grid-a.png
  04-font-candidates-grid-b.png
  05-editorial-layout-references.png
  06-outline-vs-high-contrast-comparison.png
```

These references are not to be copied literally. They define the expected typography behavior, scale, contrast, spacing, hierarchy, rhythm and visual attitude.

The task is not to recreate the screenshots. The task is to translate their strongest qualities into the Yaşama Sanatı brand world.

---

# 2.3 Visual Reference Board

## Reference 01 — Outline Typography

**Visual reference file:**

```txt
docs/references/typography/01-outline-typography.png
```

**Status:**

```txt
Accepted as overlay / motion / atmospheric layer.
Not accepted as primary readable content.
```

**Extract these qualities:**

```txt
Hand-drawn outline energy
Layered typographic depth
Human imperfection
Sketch-like movement
Stroke-based reveal potential
Expressive but lightweight visual presence
```

**Use in Yaşama Sanatı for:**

```txt
Hero background typography
Section transition overlays
Footer background word
Scroll-drawn accent words
Soft handwriting-like atmosphere
```

**Do not use for:**

```txt
Body text
Navigation
Buttons
Forms
Dense information
Program descriptions
Primary readable headings
```

**Implementation direction:**

Outline typography should behave like a ghost layer, breath line or atmospheric sketch. It may draw, fade, mask or move during scroll, but it must never compete with readable content.

---

## Reference 02 — High-Contrast Serif

**Visual reference file:**

```txt
docs/references/typography/02-high-contrast-serif.png
```

**Status:**

```txt
Accepted as the main typographic direction.
```

**Extract these qualities:**

```txt
Elegant high-contrast strokes
Editorial drama
Premium cultural tone
Ritual-like stillness
Thin/thick contrast
Large-scale serif authority
Calm but memorable atmosphere
```

**Use in Yaşama Sanatı for:**

```txt
Hero display
Large section headlines
Manifesto headlines
Footer closing statement
Large typographic scenes
Layered outline serif moments
```

**Concrete role:**

```txt
Primary Display: Cormorant Garamond
```

**Do not use for:**

```txt
Long body text
Navigation
Buttons
Forms
Small UI labels
Dense program descriptions
```

**Implementation direction:**

Cormorant Garamond should create the large emotional and editorial moments of the site. It should not become the default font for every text element.

---

## Reference 03 — Font Candidates Grid A

**Visual reference file:**

```txt
docs/references/typography/03-font-candidates-grid-a.png
```

This reference includes:

```txt
Gogade
Agency
Gopesta
Taskor
Not Beast
Kisthe
Gevora
Ultra + Slabo
Nunito + Lora
Arima Madurai + Mulish
```

### Accepted from this board

#### Kisthe

**Status:**

```txt
Accepted.
```

**Role:**

```txt
Logo / wordmark / accent / human signature.
```

**Use for:**

```txt
Logo candidate
Footer signature
Single-word emphasis
Small handwritten-feeling mark
Hero accent word
Manifesto accent word
```

**Do not use for:**

```txt
Body
Navigation
Buttons
Forms
Long headings
Program descriptions
```

Kisthe should feel like a signature, not a decorative font applied everywhere.

#### Gevora

**Status:**

```txt
Not selected for final font budget.
Reference only.
```

**Reason:**

Gevora has a modern premium display character, but the final system already assigns the main display role to Cormorant Garamond. Adding Gevora would create an unnecessary second display voice.

**Extract only:**

```txt
Modern premium confidence
Clean display presence
Controlled logo-like structure
```

**Rule:**

Do not add Gevora unless Cormorant Garamond fails Turkish character, license or performance checks and a replacement is explicitly approved.

### Rejected from this board

The following are rejected for Yaşama Sanatı’s final typography system:

```txt
Gogade
Agency
Gopesta
Taskor
Not Beast
Ultra
Slabo
Nunito
Arima Madurai
Mulish
```

**Reasons:**

```txt
Gogade: too logo-font driven.
Agency: too technology/startup oriented.
Gopesta: too playful.
Taskor: too corporate/tech.
Not Beast: too heavy, vintage and loud.
Ultra + Slabo: too retro-heavy.
Nunito: too rounded and template-friendly.
Arima Madurai: too lifestyle/soft.
Mulish: unnecessary if Basis Grotesque Pro is available.
```

**Final instruction:**

Do not add these fonts to the project.

---

## Reference 04 — Font Candidates Grid B

**Visual reference file:**

```txt
docs/references/typography/04-font-candidates-grid-b.png
```

This reference includes:

```txt
Chonburi + Domine
Grand Hotel + Lato
Space Mono + Plus Jakarta Sans
Fugaz One + Work Sans
Abril Fatface + Lato
Mental Health Film Festival typography
Superangel blackletter/poster typography
Readymag poster typography
```

### Accepted from this board

#### Space Mono

**Status:**

```txt
Partially accepted.
```

**Accepted role:**

```txt
Micro labels only.
```

Use Space Mono for:

```txt
01 / 02 / 03 labels
Chapter numbers
Small dates
Coordinates
Scroll indicators
Program index labels
Tiny metadata
Section counters
```

Do not use Space Mono for:

```txt
Logo
Hero headline
Section headings
Body copy
Buttons
Forms
Long labels
```

Space Mono should create a quiet system feeling. It must not make the site feel technical or developer-focused.

#### Mental Health Film Festival Typography

**Status:**

```txt
Accepted as scale courage reference only.
```

Extract:

```txt
Large type scale
Typographic confidence
Cultural/editorial seriousness
Strong first-screen presence
Memorable spatial tension
```

Do not extract:

```txt
Glitch
Harsh digital distortion
Clinical coldness
Overly aggressive mood
```

For Yaşama Sanatı, this reference must be softened into calm editorial scale.

#### ReadyMag Poster Typography

**Status:**

```txt
Low-priority visual courage reference.
```

Extract only:

```txt
Layering
Overlapping panels
Text clipping
Large typographic energy
Section transition courage
```

Do not extract:

```txt
Festival chaos
Over-saturated colors
Poster clutter
Unreadable experimental density
```

This can inform one experimental transition, but it must not define the site’s main identity.

### Rejected from this board

```txt
Chonburi
Domine
Grand Hotel
Lato
Plus Jakarta Sans
Fugaz One
Work Sans
Abril Fatface
Superangel blackletter direction
```

**Reasons:**

```txt
Chonburi + Domine:
Interesting retro-editorial direction, but not the strongest fit for the selected premium wellness academy system.

Grand Hotel + Lato:
Grand Hotel risks restaurant, café, casual script or menu associations. Kisthe already owns the accent role.

Plus Jakarta Sans:
Rejected for body/UI because Basis Grotesque Pro should be used if available.

Fugaz One + Work Sans:
Too energetic, sporty and campaign-like.

Abril Fatface + Lato:
Abril Fatface is strong but too heavy for the calmer high-contrast editorial wellness direction. Lato is unnecessary if Basis Grotesque Pro is available.

Superangel blackletter:
Too aggressive, startup-poster-like and chaotic for Yaşama Sanatı.
```

**Final instruction:**

Do not add these fonts unless the final approved architecture fails technical checks and a replacement is explicitly approved.

---

## Reference 05 — Editorial Layout References

**Visual reference file:**

```txt
docs/references/typography/05-editorial-layout-references.png
```

This reference includes:

```txt
Intercom Transformation Report
Katya Yumasheva portfolio
Korea Travel Zine
ODDWORKS Studio
ODDWORKS dev rotate typography
```

### Katya Yumasheva Typographic System

**Status:**

```txt
Accepted as hero / manifesto / editorial staging behavior.
```

Katya Yumasheva is not a font choice. It is a layout and staging system.

Extract:

```txt
Large confident typography
Generous whitespace
Text as visual architecture
Selected-word emphasis
Minimal monochrome discipline
Editorial pacing
Airy layout
Calm but bold composition
```

Use this behavior for:

```txt
Hero structure
Hero-after manifesto block
Introduction section
About / approach section
Footer prelude
Large text-led transition sections
```

Do not copy the portfolio literally.

The Yaşama Sanatı adaptation should be warmer, softer and more spiritual, while keeping the editorial confidence and whitespace discipline.

### ODDWORKS Dev Rotate Typography

**Status:**

```txt
Accepted as signature section behavior.
```

ODDWORKS is not a small-label system. It is a large visual-mass behavior for one or two memorable scenes.

Use ODDWORKS-style typography sparingly in:

```txt
Şifa Yolculuğu
Altı Disiplin
A major transition scene
Footer prelude
One signature scroll moment
```

Extract:

```txt
Oversized typographic mass
Rotated or vertical text
Cropped letters
Strong contrast
Text behaving like a visual object
Gallery-like spatial confidence
```

Possible large words:

```txt
NEFES
ZİHİN
ENERJİ
BEDEN
BÜTÜNLÜK
ŞİFA
```

Do not use this treatment everywhere.

ODDWORKS-style typography should create one unforgettable Awwwards-level moment, not become the entire visual language.

### Intercom Transformation Report

**Status:**

```txt
Accepted as structured academy / chapter reference.
```

Extract:

```txt
Chapter-based information architecture
Report-like clarity
Fine lines
Numbered sections
Structured educational rhythm
Clear hierarchy
Custom-type atmosphere
```

Use this behavior in:

```txt
Program sections
Education details
Altı Disiplin structure
Methodology explanation
Certification / process areas
```

Do not copy:

```txt
B2B SaaS mood
Neon green / purple palette
Corporate report atmosphere
Technology-first feeling
```

The Yaşama Sanatı adaptation should feel academic and calm, not corporate or software-like.

### Korea Travel Zine

**Status:**

```txt
Accepted as typographic mass + image layering inspiration only.
```

Extract:

```txt
Large block text
Text/image layering
Poster-like visual mass
Full-screen typographic impact
Object crossing typography
```

Use only as inspiration for:

```txt
Hero overlay
One transition scene
A large word behind a visual object
Footer typographic background
```

Do not copy:

```txt
Travel-zine tone
Blue/black poster palette
Korean block-letter literal style
Dense poster energy
```

---

## Reference 06 — Outline vs High-Contrast Serif Comparison

**Visual reference file:**

```txt
docs/references/typography/06-outline-vs-high-contrast-comparison.png
```

**Status:**

```txt
Accepted as contrast system reference.
```

This comparison clarifies the relationship between:

```txt
Outline typography
High-contrast serif
```

The final site should use both, but with different roles.

### High-Contrast Serif Role

```txt
Readable
Primary
Editorial
Premium
Emotional
Large-scale
```

Use for:

```txt
Hero headline
Major section headline
Manifesto headline
Footer closing statement
```

### Outline Typography Role

```txt
Atmospheric
Secondary
Layered
Motion-friendly
Ghost-like
Decorative but meaningful
```

Use for:

```txt
Hero background
Footer background
Section transition
Scroll-drawn layer
Image overlay
```

### Correct Mix

```txt
Solid high-contrast serif = main readable message
Outline serif = background or motion layer
Kisthe = small human signature
Basis Grotesque Pro = readable body and UI
Space Mono = micro-system detail
```

### Incorrect Mix

```txt
Outline as main heading
Kisthe as body
Space Mono as hero
Multiple serif families fighting each other
Poster references copied literally
Every section using the same typographic effect
```

---

# 2.4 Typography Reference Scoring Matrix

| Font / Reference                   | Score | Decision                 | Usage                                      |
| ---------------------------------- | ----: | ------------------------ | ------------------------------------------ |
| High-contrast serif                |   9.0 | Use                      | Main display / hero / manifesto            |
| Katya Yumasheva typographic system |   8.7 | Use                      | Layout + hero / manifesto staging          |
| Kisthe                             |   8.5 | Use                      | Wordmark / accent / human signature        |
| ODDWORKS dev rotate typography     |   8.3 | Use                      | Signature section                          |
| Layered outline + serif mix        |   8.0 | Use                      | Hero / footer / transition layer           |
| Space Mono                         |   7.8 | Use partially            | Micro labels only                          |
| Intercom report/custom type system |   7.2 | Use as behavior          | Program / academy / chapter structure      |
| Korea Travel Zine                  |   5.8 | Inspiration only         | Typography + image layering                |
| Mental Health Film Festival        |   6.0 | Scale reference only     | Type scale courage                         |
| ReadyMag poster typography         |   4.0 | Low-priority inspiration | One transition reference only              |
| Gevora                             |   8.0 | Reference only           | Backup display reference only              |
| Abril Fatface + Lato               |   7.8 | Reject                   | Too heavy for selected direction           |
| Nunito + Lora                      |   7.5 | Reject                   | Too template/friendly as a pair            |
| Chonburi + Domine                  |   7.2 | Reject                   | Retro-editorial but not final direction    |
| Arima Madurai + Mulish             |   7.0 | Reject                   | Too soft/lifestyle; Mulish unnecessary     |
| Grand Hotel + Lato                 |   6.0 | Reject                   | Script role already owned by Kisthe        |
| Space Mono + Plus Jakarta Sans     |   4.5 | Partial                  | Space Mono accepted, Plus Jakarta rejected |
| Fugaz One + Work Sans              |   4.0 | Reject                   | Too energetic/campaign-like                |
| Agency                             |   4.0 | Reject                   | Too tech/startup                           |
| Taskor                             |   5.0 | Reject                   | Too tech/corporate                         |
| Gogade                             |   4.5 | Reject                   | Too logo-font driven                       |
| Gopesta                            |   3.5 | Reject                   | Too playful                                |
| Not Beast                          |   2.5 | Reject                   | Too loud/vintage                           |
| Superangel blackletter             |   3.0 | Reject                   | Too startup-poster/chaotic                 |

---

# 2.5 Final Font Budget

Do not add unnecessary font families.

The preferred final font budget is:

```txt
Cormorant Garamond
Basis Grotesque Pro
Kisthe
Space Mono
```

This system gives:

```txt
Cormorant Garamond = editorial drama
Basis Grotesque Pro = premium clarity
Kisthe = human signature
Space Mono = micro-system precision
Katya Yumasheva = editorial staging behavior
ODDWORKS = signature typographic mass
Layered outline + serif mix = motion/overlay depth
```

Do not add these unless an approved technical fallback is required:

```txt
Lora
Mulish
Abril Fatface
Nunito
Grand Hotel
Gevora
Chonburi
Domine
Plus Jakarta Sans
Lato
Work Sans
Fugaz One
```

---

# 2.6 Typography Role Definitions

## Primary Display — Cormorant Garamond

Use for:

```txt
Hero headline
Major section headline
Manifesto headline
Footer closing statement
Large editorial scenes
Outline/solid serif pairings
```

Do not use for:

```txt
Long body text
Navigation
Buttons
Forms
Small labels
Dense program descriptions
```

## Body + UI — Basis Grotesque Pro

Use for:

```txt
Body copy
Program descriptions
Navigation
Buttons
Forms
Footer links
CTA descriptions
Small UI text
Metadata
```

Recommended usage:

```txt
Body: 350–400 weight
UI: 450–500 weight
Labels: uppercase / controlled tracking
```

Do not add Mulish if Basis Grotesque Pro is already installed, licensed and working.

## Logo / Accent — Kisthe

Use for:

```txt
Logo candidate
Wordmark accent
Single-word emphasis
Footer signature
Hero human mark
Selected manifesto word
```

Do not use for:

```txt
Body text
Navigation
Buttons
Forms
Long headings
Dense content
```

## Micro Labels — Space Mono

Use for:

```txt
01 / 02 / 03
Chapter labels
Dates
Coordinates
Small metadata
Scroll indicators
Program indices
```

Do not use for:

```txt
Headings
Body
Buttons
Forms
Logo
Long labels
```

---

# 2.7 Typography Implementation Tasks

### Task 1 — Current Typography Audit

Inspect and document:

```txt
Current font imports
Current local fonts
Current font weights
Current heading styles
Current body styles
Current UI styles
Current hardcoded font sizes
Current typography tokens/classes
```

Write the audit into:

```txt
docs/typography-system.md
```

---

### Task 2 — Font Feasibility Check

Before implementation, verify:

```txt
Turkish character support:
ğ, ü, ş, ı, İ, ö, ç

License compatibility
WOFF2 / self-hosting availability
next/font or local font loading strategy
Font weight availability
CLS / font loading impact
Mobile readability
Reduced-motion behavior for text animations
```

If a selected font fails Turkish character, license or performance checks, do not silently replace it.

Document the blocker in:

```txt
docs/decisions.md
```

Then propose a replacement for approval.

---

### Task 3 — Design Tokens

Create or update typography tokens for:

```txt
Font families
Display scale
Heading scale
Body scale
Caption scale
Line-height
Letter-spacing
Text transform rules
Responsive clamp values
Motion reveal durations
Reduced-motion fallback
```

Suggested scale direction:

```txt
Display XL: clamp(4.5rem, 12vw, 13rem)
Display L: clamp(3.5rem, 8vw, 9rem)
Display M: clamp(2.75rem, 6vw, 6rem)
Section Label: 0.75rem uppercase / tracking wide
Body Large: clamp(1.35rem, 2vw, 2.4rem)
Body: 1rem–1.125rem
Caption: 0.75rem–0.875rem
```

---

### Task 4 — Hero Typography

Hero must use typography as visual architecture, not just text.

Requirements:

```txt
Large high-contrast serif headline
Optional outline serif background layer
Optional Kisthe accent mark
Basis Grotesque Pro for body/CTA support
Responsive-safe line breaks
Reduced-motion fallback
```

Hero should visibly change the site’s first impression.

---

### Task 5 — Manifesto / Introduction Typography

Use Katya Yumasheva-style staging:

```txt
Large confident text
Generous whitespace
Selected-word emphasis
Editorial pacing
Calm but bold composition
```

Requirements:

```txt
Text must feel like a visual scene
Selected words may be emphasized
Line breaks must remain responsive-safe
No hardcoded fragile line breaks unless intentionally isolated
```

---

### Task 6 — Program / Academy Typography

Use Intercom report-style structure:

```txt
Chapter logic
Numbered sections
Fine lines
Clear hierarchy
Micro labels
Structured educational rhythm
```

Requirements:

```txt
Program sections must feel academic and clear
Space Mono may be used for numbers/chapter labels
Basis Grotesque Pro handles descriptions and UI text
Cormorant Garamond may be used for major headings
```

---

### Task 7 — Signature Section Typography

Use ODDWORKS-style behavior in one major visual moment.

Possible sections:

```txt
Şifa Yolculuğu
Altı Disiplin
Major transition scene
Footer prelude
```

Requirements:

```txt
Oversized typographic mass
Rotated or vertical text
Cropped letters
Strong contrast
Text as visual object
Only one or two uses across the page
```

This must not become a repeated decorative trick.

---

### Task 8 — Layered Outline + Serif Motion Layer

Use outline typography only as atmospheric depth.

Use in:

```txt
Hero background
Footer background
Section transitions
Scroll-linked typographic layer
Image-over-text moments
```

Requirements:

```txt
Solid serif remains readable
Outline layer stays secondary
Opacity restrained
Motion subtle
Reduced-motion fallback exists
```

---

# 2.8 Component Suggestions

Recommended components:

```txt
components/Server/EditorialSectionTitle.tsx
components/Server/TypographyLabel.tsx
components/Server/SignatureWordmark.tsx
components/Client/EditorialTextReveal.tsx
components/Client/DynamicLineReveal.tsx
components/Client/HandwritingMark.tsx
components/Client/OutlineTypographyLayer.tsx
components/Client/RotatedTypeMass.tsx
components/Client/TypographyStage.tsx
```

These components should not create random one-off styles. They should use typography tokens.

---

# 2.9 Non-Negotiable Typography Rules

```txt
Do not add Lora.
Do not add Mulish.
Do not add Abril Fatface.
Do not add Nunito.
Do not add Grand Hotel.
Do not add extra display fonts.
Do not use Kisthe for body, navigation, forms or long headings.
Do not use Space Mono for body or headings.
Do not use outline typography as primary readable content.
Do not reduce ODDWORKS to small labels only.
Do not treat Katya Yumasheva as a font.
Do not copy reference screenshots literally.
Do not create random one-off font sizes without tokens.
Do not sacrifice mobile readability for desktop drama.
```

The typographic identity must remain:

```txt
high-contrast serif + premium grotesk sans
```

The final feeling should be:

```txt
calm
editorial
premium
spiritual
academic
art-directed
memorable
readable
```

---

# 2.10 Acceptance Criteria

This phase is complete only if:

```txt
[ ] Final typography architecture is documented.
[ ] Reference images are stored under docs/references/typography/.
[ ] Reference images are described with accepted/rejected behaviors.
[ ] Font budget is limited to Cormorant Garamond, Basis Grotesque Pro, Kisthe and Space Mono unless a blocker is documented.
[ ] Turkish character support is verified.
[ ] License / WOFF2 / loading strategy is verified.
[ ] Typography tokens are created or updated.
[ ] Hero typography is visibly more editorial and dramatic.
[ ] At least two sections use large typography as visual mass.
[ ] Katya Yumasheva is used as staging behavior, not a font.
[ ] ODDWORKS is used as one signature moment, not reduced to labels.
[ ] Outline typography is secondary and atmospheric.
[ ] Body/UI remains readable and premium.
[ ] Mobile line breaks are safe.
[ ] Reduced-motion fallback exists.
```
