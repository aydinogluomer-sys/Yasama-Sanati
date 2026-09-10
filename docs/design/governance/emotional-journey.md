# Emotional Journey Contract — Yaşama Sanatı / Elementis SOTD

> Governance contract, **not** an implementation spec. It freezes the homepage emotional
> spine so future 5% Diffs support the journey rather than drift into aimless polish.
> Inherited intent from `EmotionalJourney` (Breath Spine, implementation.md §6) and ratified
> by Agent 01 (Creative Director). Status: **active gate** before any new diff.

## 1. Purpose
This document defines the **creative/emotional spine** of the Yaşama Sanatı homepage and acts as a **gate** that every proposed 5% Diff must pass before it proceeds. Its job is to convert "polish" into "purposeful refinement": a change is only worth making if it strengthens one of the six emotional stages below, is felt-not-seen, and does not endanger the closed diffs (D1/D4/D5/D6), the protected sections (Hero, Innovation), or the frozen baseline. If a proposed diff cannot name the stage it serves, it does not proceed.

## 2. Current Section Order
The homepage scroll order (frozen — no reordering without escalation):

Hero
→ Introduction
→ WellnessSanctuary
→ Innovation
→ SignatureTypeScene
→ ElementisStory
→ SustainableRetreat
→ Form
→ Footer

## 3. Six-Stage Emotional Journey
The page is read as one long, calm breath across six stages:

1. **Karşılanma** (Welcome / arrival)
2. **Merak** (Curiosity)
3. **Keşif** (Discovery)
4. **Yakınlaşma** (Closeness / intimacy)
5. **Güven** (Trust / credibility)
6. **Karar** (Decision)

The arc moves from a quiet arrival to a calm, low-pressure decision — never exceeding "quiet conviction" as its peak emotion.

## 4. Section-to-Journey Map
| Section | Emotional stage |
|---|---|
| Hero | Karşılanma |
| Introduction | Karşılanma / Merak |
| WellnessSanctuary | Merak / Keşif |
| Innovation | Keşif |
| SignatureTypeScene | Keşif / marka hafızası (brand memory) |
| ElementisStory | Yakınlaşma |
| SustainableRetreat | Güven |
| Form | Karar |
| Footer | Karar / sakin kapanış (calm closure) |

## 5. Stage Contracts

### 5.1 Karşılanma
- **Sections:** Hero, Introduction
- **User should feel:** A calm, premium, non-aggressive invitation into the world.
- **Evidence:** Atmosphere, slow pacing, editorial opening, D1 grain, D5 readable Introduction fallback.
- **Must preserve:** Hero calmness, first impression, premium quietness, non-salesy arrival.
- **Must not do:** No aggressive CTA, no loud motion, no Hero rewrite, no broad color shift.

### 5.2 Merak
- **Sections:** Introduction, WellnessSanctuary
- **User should feel:** There is a deeper approach behind the atmosphere.
- **Evidence:** Introductory prose, approach language, MaskText rhythm, measured reveal pacing.
- **Must preserve:** Narrative tension, readability, calm curiosity.
- **Must not do:** No over-explaining, no heavy body-leading normalization, no disruptive scroll rhythm change.

### 5.3 Keşif
- **Sections:** WellnessSanctuary, Innovation, SignatureTypeScene
- **User should feel:** They are exploring the method, atmosphere, and brand world.
- **Evidence:** Wellness approach, Innovation section, editorial type scene, layered visual identity.
- **Must preserve:** Discovery, spatial rhythm, Innovation protection, composed editorial scenes.
- **Must not do:** No Innovation redesign, no new interaction concept, no type-art simplification.

### 5.4 Yakınlaşma
- **Sections:** ElementisStory
- **User should feel:** The brand becomes human, knowable, and emotionally closer.
- **Evidence:** Story section, links, brand/human narrative, D6 StyledLink micro-interaction.
- **Must preserve:** Humanity, intimacy, story rhythm, non-corporate tone.
- **Must not do:** No hard sales push, no generic corporate storytelling, no link/CTA over-animation.

### 5.5 Güven
- **Sections:** SustainableRetreat
- **User should feel:** The experience is not only beautiful; it is credible, structured, and safe to approach.
- **Evidence:** Retreat / process / format / transparency / testimonial or proof-oriented content.
- **Must preserve:** Clarity, credibility, calm structure, practical reassurance.
- **Must not do:** No purely aesthetic polish that reduces clarity, no body/wrap/line-height drift without evidence, no vague trust claims.

### 5.6 Karar
- **Sections:** Form, Footer
- **User should feel:** Taking the first step is simple, safe, and natural.
- **Evidence:** Form CTA, closing footer CTA, quiet conversion path.
- **Must preserve:** Soft decision-making, low-pressure CTA, premium closure.
- **Must not do:** No aggressive conversion tactics, no loud CTA animation, no visual clutter.

## 6. Closed Diff Impact
- **D1 — Global grain:** Supports **Karşılanma** and **Keşif** by adding analog atmosphere without layout drift.
- **D4 — MaskText timing:** Supports **Merak**, **Keşif**, and **Yakınlaşma** by making reveal rhythm more editorial and less mechanical.
- **D5 — ScrollRevealText reduced-motion fallback:** Supports **Karşılanma** and **Merak** by keeping the Introduction readable and accessible.
- **D6 — StyledLink hover timing:** Supports **Yakınlaşma** and **Keşif** through cleaner micro-interaction timing without layout drift.

## 7. Postponed Diff Warnings
- **D2 — Body-leading normalization:** Postponed because it risks visible typography/layout/scroll-rhythm drift.
- **D7 — Broad temperature drift:** Postponed because it risks art-direction/color drift before acceptance.
- **D8 — Display widow/orphan control:** Postponed because display text is already mostly manually composed; `text-wrap` could be a no-op or cause visible final-frame drift.

## 8. Future Diff Gate
Every future 5% Diff must answer:
1. Which emotional stage does it support?
2. Which section does it affect?
3. Is the change felt-not-seen?
4. Does it avoid layout/copy/color/section-order drift?
5. Does it preserve D1/D4/D5/D6?
6. Does it strengthen the journey or merely polish the surface?
7. Is rollback one commit?
8. Is it worth doing before a Blind Premium acceptance pass?

If the answer is unclear, the diff should **not** proceed.

## 9. Stop Conditions
New micro-diffs should stop if:
- They do not clearly support one of the six stages.
- They affect Hero or Innovation without a strong creative reason.
- They introduce broad typography/color/layout changes.
- They create visible final-frame drift without solving a real journey problem.
- They are only code hygiene and not perceptual quality.
- They risk over-design.

## 10. Recommendation
The current journey is **accepted as coherent**. The next step should be a **Blind Premium / acceptance pass**, not automatic continuation into new Diffs. Future Diffs may resume **only** if the acceptance pass reveals a specific emotional weakness tied to one of the six stages.

## 11. Decision
`ACCEPTED — journey contract active`
