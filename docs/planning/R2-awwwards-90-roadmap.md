# R2 — Awwwards 90+ Roadmap

**Status:** ACTIVE
**Type:** Governance & sequencing document (operationalizes R1; does not replace it)
**Creative authority:** `docs/R1-Creative-Direction-Constitution.md` (closed & binding)
**Selected direction (from R1):** Editorial Wellness Academy (primary) + Restrained Meridian Intelligence (accent); Route B bounded to lighting, image crop, pacing, selected transition atmosphere.
**R1 decision line:** `R1 ACTIVE — Editorial Wellness Academy with Restrained Meridian Intelligence`

---

## How to read this document

R2 sequences the road to an Awwwards 90+ candidate. It defines **gates, outputs, owners, dependencies, and stop conditions** — not visuals and not code. R2 does **not** authorize implementation by itself; each implementation phase is unlocked only by the approvals named in its Entry Criteria. R1 remains the creative authority; R2 is the sequencing authority.

**Agent roles**

- **Agent 01 / ChatGPT — Creative Director:** visual briefs, visual proof, creative acceptance, drift detection.
- **Agent 02 / Codex — Verification:** read-only technical verification, scope-risk review, repo safety, browser/runtime validation.
- **Agent 03 / Claude Code — Builder:** document creation, implementation plans, narrow implementation, commits **only when authorized**.

**Official Emotional Journey (fixed — not added to, not renamed):**
1. Karşılanma · 2. Merak · 3. Keşif · 4. Yakınlaşma · 5. Güven · 6. Karar

**Hard protections (all phases):** Innovation structure · Innovation interaction concept · Innovation card system · Innovation storytelling · Innovation internal visual language · SignatureTypeScene brand-memory role · Footer emotional closure · core olive/cream/copper identity · accessibility · reduced-motion parity · production stability.

**Global sequencing rules (bind every phase):**
- No implementation before approved visual proof.
- No Hero/Introduction code before Wave 1 **desktop and mobile** proof approval.
- No Innovation redesign at any phase (transition boundary only).
- No global redesign without R1/R2 authority.
- No direct storyboard implementation.
- No "Awwwards polish" random effect pass.
- No C1 production final acceptance until C1 targeted fixes are verified.
- No Wave 2 before Wave 1 acceptance.
- No Wave 3 before Wave 2 verification.
- No final candidate acceptance while issue/error/development badges appear in acceptance imagery.
- Wave 1 Visual Brief cannot start until R3 Creative Toolchain & Reference System is accepted or an equivalent toolchain decision is logged.

---

# Block 0 — Governance and Production Safety

## Phase 01 — Repo State Ledger
- **Purpose:** Establish an accurate, shared snapshot of repo state (HEAD, tags, tracked/untracked, excluded files) as the ground truth all later phases reference.
- **Owner Agent:** Agent 03 (compiles) → Agent 02 (verifies).
- **Inputs:** Current git state; R1; prior D-series/Batch commit history.
- **Output:** A concise ledger entry (status, HEAD, `golden-master` target, known excluded file) in the working notes / report.
- **Entry Criteria:** R1 committed.
- **Exit Criteria:** Ledger reflects real `git status`; `golden-master` confirmed at `9f495cf`; excluded file identified.
- **Stop Conditions:** Ledger disagrees with actual repo state; unexpected staged changes.
- **Forbidden:** Editing any tracked file; staging; committing; touching `implementation_footer_antigravity.md`.

## Phase 02 — C1 Targeted Production Fix
- **Purpose:** Complete the remaining narrow, pre-approved C1 production-readiness items (form wiring, SEO basics, config alignment) — scope-limited, no visual redesign.
- **Owner Agent:** Agent 03.
- **Inputs:** C1 fix plan; production config decisions; env variable names (read from environment only).
- **Output:** Minimal code/config changes within the approved C1 scope; a change report.
- **Entry Criteria:** Phase 01 ledger accepted; C1 scope explicitly approved.
- **Exit Criteria:** C1 items implemented; static gates green (lint, types, build); no secrets in tree.
- **Stop Conditions:** Scope expands beyond C1; any `.env*` staged; visual change introduced.
- **Forbidden:** Any Wave/visual redesign; hardcoding secrets; using a Supabase service_role key; committing `.env*`.

## Phase 03 — C1 Read-Only Verification
- **Purpose:** Independently verify C1 fixes are correct, isolated, and safe.
- **Owner Agent:** Agent 02.
- **Inputs:** C1 commit(s); change report; runtime/build output.
- **Output:** Read-only verification verdict (ACCEPT / NEEDS REVISION) with evidence.
- **Entry Criteria:** Phase 02 complete; gates green.
- **Exit Criteria:** C1 verified isolated, no scope creep, no secrets, production stability intact.
- **Stop Conditions:** Non-C1 files changed; secrets present; build/runtime regressions.
- **Forbidden:** Editing files; staging; committing; approving anything beyond C1 scope.

## Phase 04 — R1 Creative Authority Confirmation
- **Purpose:** Confirm R1 is the binding creative authority and unchanged before roadmap governance proceeds.
- **Owner Agent:** Agent 01 (authority) + Agent 02 (integrity check).
- **Inputs:** `docs/R1-Creative-Direction-Constitution.md`.
- **Output:** Confirmation that R1 is closed, binding, and byte-intact; decision line verbatim.
- **Entry Criteria:** R1 committed.
- **Exit Criteria:** R1 unchanged; direction not reopened; decision line matches exactly.
- **Stop Conditions:** R1 modified; direction reopened; decision line altered.
- **Forbidden:** Editing R1; reopening direction selection; adding stages.

## Phase 05 — R2 Roadmap Verification
- **Purpose:** Verify this roadmap operationalizes R1 correctly (30 phases, protections, journey, sequencing) without becoming a visual/implementation spec.
- **Owner Agent:** Agent 02.
- **Inputs:** `docs/R2-Awwwards-90-Roadmap.md`; R1.
- **Output:** Read-only verdict on R2 completeness and compliance.
- **Entry Criteria:** R2 draft created.
- **Exit Criteria:** 30 phases present; journey intact; protections stated; no code/visual spec; no direction reopening.
- **Stop Conditions:** Missing/renamed phases or stages; implementation detail present; R1 contradicted.
- **Forbidden:** Editing files; staging; committing.

## Phase 06 — R2 Commit Gate
- **Purpose:** Commit R2 as an isolated, single-purpose docs commit once verified.
- **Owner Agent:** Agent 03 (commits when authorized).
- **Inputs:** Verified R2 document; commit authorization.
- **Output:** One commit containing only `docs/R2-Awwwards-90-Roadmap.md`.
- **Entry Criteria:** Phase 05 verdict = ACCEPT; explicit commit authorization.
- **Exit Criteria:** Commit contains only the R2 doc; `golden-master` intact; excluded file unstaged; no `.env*`.
- **Stop Conditions:** Extra files staged; secrets present; tag/push attempted without authorization.
- **Forbidden:** Tagging; pushing; bundling unrelated changes; staging the excluded file.

---

# Block 1 — Wave 1 Proof, No Code

## Phase 07 — Wave 1 Visual Brief
- **Purpose:** Define the creative intent for the Opening Breath (Hero + Hero→Introduction bridge + Introduction) within R1.
- **Owner Agent:** Agent 01.
- **Inputs:** R1; Emotional Journey (Karşılanma/Merak); change budgets (Hero 20–30%, Introduction 20–30%); R3 Creative Toolchain & Reference System or an equivalent accepted toolchain decision.
- **Output:** A written Wave 1 visual brief (intent, mood, hierarchy goals, drift guardrails) — no code, no final visuals.
- **Entry Criteria:** R2 committed; R3 Creative Toolchain & Reference System accepted or equivalent toolchain decision logged.
- **Exit Criteria:** Brief aligns to R1; addresses desktop + mobile intent; names drift risks.
- **Stop Conditions:** Brief reopens direction; drifts to luxury/mystical/SaaS language.
- **Forbidden:** Implementation detail; component instructions; roadmap changes.

## Phase 08 — Wave 1 Desktop Visual Proof
- **Purpose:** Produce desktop visual proof of the authored opening to validate direction before any code.
- **Owner Agent:** Agent 01.
- **Inputs:** Phase 07 brief; R1.
- **Output:** Desktop visual proof artifacts (composition study), clearly marked as proof, no dev/error badges.
- **Entry Criteria:** Phase 07 brief approved.
- **Exit Criteria:** Desktop proof reads as authored (not a familiar wellness poster); resolves empty space intent; stays in budget.
- **Stop Conditions:** Proof drifts off-direction; Innovation implicated; readability compromised.
- **Forbidden:** Writing code; touching the live build; presenting proof with issue badges.

## Phase 09 — Wave 1 Mobile Visual Proof
- **Purpose:** Produce mobile visual proof as an independently composed opening (not a squeezed desktop).
- **Owner Agent:** Agent 01.
- **Inputs:** Phase 07 brief; desktop proof for coherence.
- **Output:** Mobile visual proof artifacts, clearly marked as proof, no dev/error badges.
- **Entry Criteria:** Phase 08 desktop proof approved.
- **Exit Criteria:** Mobile composition independent, typography robust, hierarchy legible.
- **Stop Conditions:** Mobile typography fragile; desktop-squeeze; readability sacrificed.
- **Forbidden:** Writing code; skipping mobile; badges in imagery.

## Phase 10 — Wave 1 Creative Review
- **Purpose:** Creative acceptance of Wave 1 proofs against R1 and drift criteria.
- **Owner Agent:** Agent 01.
- **Inputs:** Desktop + mobile proofs; R1 acceptance criteria.
- **Output:** Creative review verdict (APPROVE / REVISE) with drift notes.
- **Entry Criteria:** Phases 08 and 09 complete.
- **Exit Criteria:** Both proofs approved; opening authored; three-signature-moment discipline preserved.
- **Stop Conditions:** Any drift (luxury/mystical/SaaS/agency); opening still generic.
- **Forbidden:** Authorizing implementation here (that is Phase 12+); editing code.

## Phase 11 — Wave 1 Technical Risk Review
- **Purpose:** Assess implementation risk of the approved opening (reduced-motion, hydration, a11y, performance) before planning code.
- **Owner Agent:** Agent 02.
- **Inputs:** Approved Wave 1 proofs; current build constraints.
- **Output:** Technical risk assessment and constraints for the implementation plan.
- **Entry Criteria:** Phase 10 approval.
- **Exit Criteria:** Risks catalogued; reduced-motion/a11y/perf constraints defined; no blockers unaddressed.
- **Stop Conditions:** Proof implies a protected-area change; reduced-motion parity threatened.
- **Forbidden:** Editing code; approving scope beyond Wave 1.

---

# Block 2 — Opening Implementation

## Phase 12 — Wave 1 Implementation Plan
- **Purpose:** Produce a narrow, reversible implementation plan for the approved opening.
- **Owner Agent:** Agent 03 (plan) → Agent 02 (risk check).
- **Inputs:** Approved proofs; Phase 11 risk review; R1 budgets.
- **Output:** A scoped plan (allowed files, sequence, verification steps) — governance-level, not code.
- **Entry Criteria:** Phases 10 + 11 complete.
- **Exit Criteria:** Plan lists allowed files only; stays in budget; defines gates and rollback.
- **Stop Conditions:** Plan touches protected areas; scope exceeds Wave 1.
- **Forbidden:** Implementing; touching Innovation; global changes.

## Phase 13 — Wave 1 Narrow Implementation
- **Purpose:** Implement the approved opening exactly to the plan.
- **Owner Agent:** Agent 03.
- **Inputs:** Approved Phase 12 plan.
- **Output:** Narrow, isolated code changes for Hero / Hero→Introduction bridge / Introduction; single-purpose commit(s) when authorized.
- **Entry Criteria:** Phase 12 plan approved; desktop + mobile proof approved.
- **Exit Criteria:** Changes match proof/plan; static gates green; reduced-motion parity preserved.
- **Stop Conditions:** Drift from proof; hydration/a11y regression; protected area touched.
- **Forbidden:** Innovation changes; out-of-scope files; unapproved effects; staging the excluded file.

## Phase 14 — Wave 1 Read-Only Verification
- **Purpose:** Independently verify Wave 1 implementation is isolated, stable, and faithful.
- **Owner Agent:** Agent 02.
- **Inputs:** Wave 1 commit(s); runtime/build output.
- **Output:** Verification verdict with browser/runtime evidence (hydration, overflow, reduced-motion).
- **Entry Criteria:** Phase 13 complete.
- **Exit Criteria:** Scope isolated; 0 hydration errors; reduced-motion parity; no protected-area change.
- **Stop Conditions:** Scope creep; runtime/hydration errors; Innovation implicated.
- **Forbidden:** Editing files; staging; committing.

## Phase 15 — Wave 1 Creative Acceptance
- **Purpose:** Final creative acceptance of the implemented opening vs the approved proof.
- **Owner Agent:** Agent 01.
- **Inputs:** Live implemented opening; approved proofs; R1 acceptance criteria.
- **Output:** Wave 1 acceptance verdict (unlocks Wave 2).
- **Entry Criteria:** Phase 14 verdict = ACCEPT.
- **Exit Criteria:** Opening authored, matches proof, no drift, mobile independent; Wave 1 closed.
- **Stop Conditions:** Result diverges from proof; any drift; readability loss.
- **Forbidden:** Starting Wave 2 before this acceptance; editing code.

---

# Block 3 — Discovery and Trust

## Phase 16 — Wave 2 Visual Brief
- **Purpose:** Define creative intent for Discovery/Trust: WellnessSanctuary recomposition + SustainableRetreat mobile + Innovation transition boundary only.
- **Owner Agent:** Agent 01.
- **Inputs:** R1 (Merak/Keşif/Güven); budgets (WellnessSanctuary 35–45%, SustainableRetreat 25–35%, Innovation 0–5% boundary).
- **Output:** Wave 2 visual brief with explicit Innovation-protection boundary.
- **Entry Criteria:** Phase 15 (Wave 1 acceptance).
- **Exit Criteria:** Brief respects Innovation protection; targets predictable-split problem; mobile-first for Retreat.
- **Stop Conditions:** Brief implies Innovation redesign; drift.
- **Forbidden:** Innovation core changes; implementation detail.

## Phase 17 — WellnessSanctuary Visual Proof
- **Purpose:** Prove a recomposed WellnessSanctuary that no longer reads as a predictable split layout.
- **Owner Agent:** Agent 01.
- **Inputs:** Phase 16 brief.
- **Output:** Desktop + mobile visual proof, no dev/error badges.
- **Entry Criteria:** Phase 16 brief approved.
- **Exit Criteria:** Composition clearly reconceived, in budget, Innovation untouched, mobile independent.
- **Stop Conditions:** Drift; Innovation implicated; readability loss.
- **Forbidden:** Code; badges; Innovation redesign.

## Phase 18 — SustainableRetreat Mobile Proof
- **Purpose:** Prove an independently composed SustainableRetreat mobile layout.
- **Owner Agent:** Agent 01.
- **Inputs:** Phase 16 brief; known mobile fragility watchlist.
- **Output:** Mobile visual proof, no dev/error badges.
- **Entry Criteria:** Phase 16 brief approved.
- **Exit Criteria:** Mobile composed for mobile; typography robust; Güven tone intact.
- **Stop Conditions:** Fragile mobile typography; desktop-squeeze.
- **Forbidden:** Code; badges.

## Phase 19 — Wave 2 Technical Risk Review
- **Purpose:** Assess implementation risk for Wave 2, including the Innovation transition boundary.
- **Owner Agent:** Agent 02.
- **Inputs:** Approved Wave 2 proofs.
- **Output:** Risk assessment + constraints; explicit boundary that Innovation internals stay untouched.
- **Entry Criteria:** Phases 17 + 18 approved.
- **Exit Criteria:** Risks catalogued; Innovation boundary confirmed safe; a11y/reduced-motion constraints set.
- **Stop Conditions:** Proof requires Innovation internals; parity threatened.
- **Forbidden:** Editing code; expanding into Innovation.

## Phase 20 — Wave 2 Narrow Implementation
- **Purpose:** Implement approved Wave 2 scope narrowly (WellnessSanctuary, Retreat mobile, transition boundary only).
- **Owner Agent:** Agent 03.
- **Inputs:** Approved proofs; risk review; scoped plan.
- **Output:** Isolated code changes; single-purpose commit(s) when authorized.
- **Entry Criteria:** Phase 19 complete; proofs approved.
- **Exit Criteria:** Matches proof; gates green; Innovation internals untouched; parity preserved.
- **Stop Conditions:** Innovation internals touched; drift; regressions.
- **Forbidden:** Innovation redesign; out-of-scope files; effect passes.

## Phase 21 — Wave 2 Verification
- **Purpose:** Verify Wave 2 implementation isolation, stability, and Innovation integrity.
- **Owner Agent:** Agent 02.
- **Inputs:** Wave 2 commit(s); runtime/build output.
- **Output:** Verification verdict with evidence; confirmation Innovation is ≥ as strong as before.
- **Entry Criteria:** Phase 20 complete.
- **Exit Criteria:** Scope isolated; Innovation intact/uncompromised; parity intact; Wave 2 verified.
- **Stop Conditions:** Innovation weakened; scope creep; regressions.
- **Forbidden:** Editing files; starting Wave 3 before this verification.

---

# Block 4 — Human and Decision

## Phase 22 — Wave 3 Visual Brief
- **Purpose:** Define intent for Human/Decision: ElementisStory connection, Form as decision ritual, Footer calm closure.
- **Owner Agent:** Agent 01.
- **Inputs:** R1 (Yakınlaşma/Karar); budgets (ElementisStory 10–20%, Form 40–50%, Footer 10–15% closure).
- **Output:** Wave 3 visual brief.
- **Entry Criteria:** Phase 21 (Wave 2 verified).
- **Exit Criteria:** Brief frames Form as decision scene, Footer closure protected role intact.
- **Stop Conditions:** Footer closure role compromised; drift.
- **Forbidden:** Implementation detail; changing Footer's closure role.

## Phase 23 — Form Decision Ritual Proof
- **Purpose:** Prove the Form-to-Footer "Decision Ritual" — conversion reframed as a calm personal decision.
- **Owner Agent:** Agent 01.
- **Inputs:** Phase 22 brief.
- **Output:** Desktop + mobile visual proof of the decision scene, no dev/error badges.
- **Entry Criteria:** Phase 22 brief approved.
- **Exit Criteria:** Form reads as decision scene (not utility form); Footer closes calmly; in budget.
- **Stop Conditions:** Drift; utility-form feel persists; readability loss.
- **Forbidden:** Code; badges.

## Phase 24 — Form Technical Risk Review
- **Purpose:** Assess implementation risk for the Form/Footer decision ritual (validation, a11y, submission stability, reduced-motion).
- **Owner Agent:** Agent 02.
- **Inputs:** Approved Phase 23 proof; C1 form wiring state.
- **Output:** Risk assessment + constraints (form correctness, a11y, parity).
- **Entry Criteria:** Phase 23 approved.
- **Exit Criteria:** Risks catalogued; form functional integrity and a11y preserved.
- **Stop Conditions:** Proof threatens form functionality/a11y/parity.
- **Forbidden:** Editing code; expanding scope.

## Phase 25 — Wave 3 Narrow Implementation
- **Purpose:** Implement approved Wave 3 scope narrowly.
- **Owner Agent:** Agent 03.
- **Inputs:** Approved proof; risk review; scoped plan.
- **Output:** Isolated code changes; single-purpose commit(s) when authorized.
- **Entry Criteria:** Phase 24 complete; proof approved.
- **Exit Criteria:** Matches proof; gates green; form functional + accessible; Footer closure intact; parity preserved.
- **Stop Conditions:** Form regressions; drift; parity loss.
- **Forbidden:** Out-of-scope files; effect passes; breaking form functionality.

## Phase 26 — Wave 3 Verification
- **Purpose:** Verify Wave 3 implementation isolation, stability, form correctness, and closure.
- **Owner Agent:** Agent 02.
- **Inputs:** Wave 3 commit(s); runtime/build output; form submission test.
- **Output:** Verification verdict with evidence.
- **Entry Criteria:** Phase 25 complete.
- **Exit Criteria:** Scope isolated; form works; a11y/parity intact; decision ritual verified.
- **Stop Conditions:** Form broken; regressions; drift.
- **Forbidden:** Editing files; starting Block 5 before this verification.

---

# Block 5 — System Coherence and Final Candidate

## Phase 27 — Transition / Motion System Pass
- **Purpose:** Bring section transitions and motion into one intentional, coherent system (≥3 memorable transitions; exactly three primary signature moments legible).
- **Owner Agent:** Agent 01 (creative) + Agent 03 (narrow implementation) + Agent 02 (verify).
- **Inputs:** Waves 1–3 results; R1 signature-moment discipline.
- **Output:** Coherent transition/motion system; scoped changes + verification.
- **Entry Criteria:** Phase 26 (Wave 3 verified).
- **Exit Criteria:** Transitions coherent; three signature moments intact; no effects-showcase drift; parity preserved.
- **Stop Conditions:** Page becomes effects showcase; parity loss; over-cinematic.
- **Forbidden:** New primary signature moments; random effect pass; Innovation changes.

## Phase 28 — Mobile-Specific Composition Pass
- **Purpose:** Final pass ensuring every mobile layout is independently composed and typographically robust.
- **Owner Agent:** Agent 01 (creative) + Agent 03 (narrow implementation) + Agent 02 (verify).
- **Inputs:** All mobile compositions from Waves 1–3.
- **Output:** Consistent, robust mobile system; scoped changes + verification.
- **Entry Criteria:** Phase 27 complete.
- **Exit Criteria:** Mobile independent, readable, typographically robust across sections; parity preserved.
- **Stop Conditions:** Fragile mobile typography; desktop-squeeze; readability loss.
- **Forbidden:** Desktop-squeeze solutions; out-of-scope changes.

## Phase 29 — Final Technical Production Gate
- **Purpose:** Full production-readiness gate before candidate acceptance (build, types, lint, a11y, reduced-motion, performance, browser QA, secrets check).
- **Owner Agent:** Agent 02.
- **Inputs:** Full site post-Waves; all gates.
- **Output:** Production-readiness verdict with evidence.
- **Entry Criteria:** Phase 28 complete.
- **Exit Criteria:** All gates green; a11y + reduced-motion parity intact; no secrets; production stable; `golden-master` intact.
- **Stop Conditions:** Any gate red; parity loss; secrets present; instability.
- **Forbidden:** Editing files; waiving a failed gate.

## Phase 30 — Final Blind Premium / Awwwards Candidate Acceptance
- **Purpose:** Final holistic acceptance of the site as an Awwwards 90+ candidate against R1 acceptance criteria.
- **Owner Agent:** Agent 01 (with Agent 02 evidence).
- **Inputs:** Live final site; R1 acceptance criteria; Phase 29 verdict.
- **Output:** Final candidate acceptance verdict + score, using clean acceptance imagery (no dev/error/issue badges).
- **Entry Criteria:** Phase 29 verdict = ACCEPT.
- **Exit Criteria:** All R1 acceptance criteria met; Innovation intact/strong; three signature moments legible; no drift; parity intact; acceptance imagery clean.
- **Stop Conditions:** Any drift; Innovation weakened; issue/error/development badges in acceptance imagery.
- **Forbidden:** Accepting with badges present; accepting with any hard protection compromised.

---

## 1. Active / Closed / Blocked Status Table

| Item | Status |
|---|---|
| R1 Creative Direction Constitution | **Closed** (binding) |
| D9 Introduction Bridge | **Closed** |
| Batch A / B reduced-motion hydration | **Closed** |
| C1 targeted production fixes | **Open** |
| Wave 1 visual proof | **Not started** |
| Implementation (any Wave) | **Forbidden until proof approval** |
| Golden Master (`9f495cf`) | Intact — rollback reference |

## 2. Hard Stop Conditions

Any of the following halts the roadmap at its current phase for correction before further visible change:

- Innovation weakened.
- Mobile typography becomes fragile.
- Route drifts into luxury-resort language.
- Route drifts into mystical-technology demo.
- Route drifts into generic AI wellness / SaaS / agency portfolio.
- Readability sacrificed for art direction.
- Site becomes over-cinematic and loses academic calm.
- Reduced-motion parity lost.
- Implementation begins without approved visual proof.
- Implementation begins before Wave 1 desktop + mobile proof approval.
- Wave 2 started before Wave 1 acceptance, or Wave 3 before Wave 2 verification.
- Unapproved / out-of-scope files changed.
- Secrets committed, or `.env*` staged.
- Final candidate acceptance attempted while issue/error/development badges appear in acceptance imagery.

## 3. Acceptance Philosophy

- **R1 is the creative authority.** R2 does not replace it or reopen direction.
- **R2 is the sequencing authority** — gates, owners, dependencies, stop conditions.
- **Visual proofs guide composition** and must be approved before code.
- **Codex (Agent 02) verifies risk** — read-only, repo safety, runtime/browser validation.
- **Claude (Agent 03) implements only authorized narrow scopes** and commits only when authorized.
- **The current build is the technical starting state, not the final visual target.**
- **Golden Master is the rollback reference, not a creative target.**

---

**End of R2 roadmap.** R2 operationalizes R1; it does not authorize implementation directly — each implementation phase unlocks only via the approvals in its Entry Criteria.
