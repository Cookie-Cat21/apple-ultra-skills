# Apple Ultra 2026 — Principles and Decision-Quality Contract

> **Status:** current-source backbone for the entire Apple Ultra Skills pack.
> **Verified:** 2026-09-21.
> **Scope:** product, design, engineering, security, GTM, operations, research, and agent workflows.
>
> This file translates Apple’s current design principles into a repo-wide decision discipline. It does **not** mean every domain should imitate Apple’s visual language.

## 1. Current Apple principle backbone

Apple reintroduced its Human Interface Guidelines design principles on **June 8, 2026**:

1. **Purpose** — make something meaningful.
2. **Agency** — let people do things their own way.
3. **Responsibility** — act in people’s best interest.
4. **Familiarity** — build on what people know.
5. **Flexibility** — adapt to diverse contexts and needs.
6. **Simplicity** — be clear and direct.
7. **Craft** — care about every detail.
8. **Delight** — make it human.

Current HIG also emphasizes **Hierarchy, Harmony, and Consistency** as platform-level design qualities.

Primary sources:
- Apple HIG, Design principles: https://developer.apple.com/design/human-interface-guidelines/design-principles
- WWDC26, Principles of great design: https://developer.apple.com/videos/play/wwdc2026/250/
- Apple HIG: https://developer.apple.com/design/human-interface-guidelines/

### Repo-wide interpretation

These principles are **decision tools**, not a scoring gimmick. They can conflict. A good skill should make the tradeoff explicit rather than pretend one rule always wins.

---

## 2. Universal decision frame

Before recommending, implementing, reviewing, or approving meaningful work, answer:

1. **Person / actor** — who is affected?
2. **Purpose** — what outcome actually matters?
3. **State** — what is true before and after the change?
4. **Agency** — can the person understand, redirect, undo, cancel, or recover?
5. **Responsibility** — what privacy, safety, financial, security, compliance, or trust risk exists?
6. **Familiarity** — what existing product, platform, domain, or repo convention should be preserved?
7. **Flexibility** — what contexts, edge cases, abilities, locales, devices, plans, or failure modes matter?
8. **Simplicity** — what can be removed without losing capability or clarity?
9. **Craft** — how will correctness, performance, quality, and durability be verified?
10. **Delight / feeling** — what should the person feel when this works: calm, control, confidence, trust, momentum, relief, delight, or something else?

For backend-only work, “delight” usually means **predictability, confidence, recoverability, and low operational surprise**, not decoration.

---

## 3. Evidence contract

Never make a recommendation sound more certain than its evidence.

Use these labels when material:

- **[PROJECT FACT]** — observed in the user’s repo, data, logs, docs, or connected systems.
- **[STANDARD]** — supported by an authoritative standard or primary vendor documentation.
- **[EXTERNAL FACT]** — supported by a reliable external source.
- **[ASSUMPTION]** — reasonable but unverified.
- **[ESTIMATE]** — forecast or approximation; state basis/range where useful.
- **[INTERPRETATION]** — judgment derived from facts.
- **[RECOMMENDATION]** — proposed action.

### Never fabricate precision

Do not invent:
- conversion lifts;
- abandonment percentages;
- security incident likelihoods;
- “industry standard” thresholds;
- revenue effects;
- performance gains;
- user-research findings;
- effort estimates presented as facts.

Hard numbers are appropriate when they come from:
- a standard (for example WCAG contrast);
- vendor/platform documentation;
- measured project data;
- a clearly labeled studio default or starting point;
- an explicit experiment target.

If the evidence is weak, say so and recommend measurement.

---

## 4. Purpose

Every feature, campaign, architecture choice, test, or process asks for someone’s **time, attention, trust, money, or operational complexity**.

Requirements:
- name the user/actor and desired outcome;
- reject work whose purpose is only “because competitors have it,” “because AI can,” or “because it looks premium”;
- distinguish core value from optional polish;
- define what success looks like before expanding scope.

Question:
> If this disappeared, which meaningful user or business outcome would get worse?

If the answer is unclear, the work needs reframing.

---

## 5. Agency

Apple’s 2026 guidance treats agency as freedom to act, understand what is happening, and recover from mistakes.

Across the repo, agency means:
- provide escape/cancel paths for guided workflows where safe;
- prefer reversible operations;
- preserve user input and context after failures;
- expose meaningful state instead of silently acting;
- avoid locking people into artificial flows;
- make automation inspectable and stoppable;
- make migrations, rollouts, payments, and destructive operations recoverable where possible.

For agent workflows:
- make task boundaries and stop conditions explicit;
- don’t keep expanding scope without evidence;
- preserve intermediate outputs and provenance.

---

## 6. Responsibility

Responsibility means acting in people’s best interest, even when a more aggressive implementation could improve a metric.

Apply especially to:
- authentication and authorization;
- payments and billing;
- personal data and analytics;
- notifications and messaging;
- AI-generated output;
- pricing and plan gating;
- sales and growth claims;
- migrations and destructive data changes;
- security-sensitive integrations.

Requirements:
- collect/access the minimum necessary data;
- make consequential behavior transparent;
- anticipate misuse and unintended outcomes;
- protect against accidental harm;
- never hide material constraints, fees, destructive consequences, or uncertainty;
- remove or constrain features whose risk outweighs their value.

---

## 7. Familiarity and consistency

People and engineers bring existing mental models.

Prefer:
- established platform conventions;
- existing repo abstractions;
- current product terminology;
- standard protocol semantics;
- consistent placement, naming, and behavior;
- reuse of proven primitives over one-off cleverness.

Do not confuse familiarity with copying. Reuse the **mental model**, not another product’s brand surface.

Things that look or are named the same should behave the same.

---

## 8. Flexibility

Design and engineering should survive real contexts, not just the demo path.

Check the relevant dimensions:
- mobile / desktop / touch / keyboard / assistive tech;
- slow / offline / retry / partial failure;
- light / dark / increased contrast / reduced motion;
- locales, timezones, currencies, RTL;
- free / paid / admin / limited-permission roles;
- first use / expert repeat use;
- small / large datasets;
- concurrent requests and retries;
- migration rollback and mixed-version states;
- third-party outage / webhook replay / provider delay.

Flexibility does not mean supporting every possibility. It means explicitly defining supported contexts and degrading safely elsewhere.

---

## 9. Simplicity

Apple’s current guidance explicitly distinguishes simplicity from minimalism.

Repo-wide:
- minimize conceptual steps, not merely visible controls;
- remove duplicate states and duplicate sources of truth;
- use plain language;
- keep primary paths short;
- progressively disclose advanced options;
- prefer a small number of strong abstractions;
- avoid configuration when a safe default can work;
- don’t bury necessary capability merely to make a surface look cleaner.

A system that hides complexity but creates ambiguity is not simple.

---

## 10. Craft

Craft is not polish after correctness. It includes correctness.

Every skill should verify the relevant dimensions:
- correctness;
- accessibility;
- performance;
- reliability;
- security;
- observability;
- copy precision;
- visual alignment;
- state completeness;
- migration/rollback safety;
- tests and real-world verification.

Shipping is not the end of craft. Prefer maintainable patterns and note follow-up measurement where the outcome remains uncertain.

---

## 11. Delight and intended feeling

Apple’s 2026 guidance says to identify the emotion the experience should inspire and not mistake delight for decoration.

For each user-facing flow, choose one primary feeling and at most two supporting feelings.

Useful feelings:
- **control**
- **calm**
- **confidence**
- **trust**
- **momentum**
- **relief**
- **competence**
- **delight**
- **wonder**
- **belonging**
- **self-expression**

For infrastructure and developer experience:
- predictable;
- debuggable;
- recoverable;
- low-surprise;
- fast to understand;
- confident to operate.

Avoid confetti, cute copy, animation, or novelty when the appropriate feeling is trust, seriousness, or calm.

---

## 12. Current interaction guidance that matters across skills

### Feedback

Apple HIG: https://developer.apple.com/design/human-interface-guidelines/feedback

Feedback should help people understand:
- current status;
- success/failure;
- consequences;
- recovery.

Match the prominence of feedback to the significance of the event. Keep routine status unobtrusive; interrupt only when the consequence warrants it.

### Motion

Apple HIG: https://developer.apple.com/design/human-interface-guidelines/motion  
WWDC18 Designing Fluid Interfaces: https://developer.apple.com/videos/play/wwdc2018/803/  
WWDC23 Animate with springs: https://developer.apple.com/videos/play/wwdc2023/10158/

Principles:
- motion is purposeful, not decorative;
- interfaces respond immediately;
- user intent can redirect/interupt ongoing behavior;
- spatial relationships remain consistent;
- gestures and motion should feel causally connected;
- reduced-motion variants preserve meaning.

### Materials

Apple HIG: https://developer.apple.com/design/human-interface-guidelines/materials  
WWDC25 Meet Liquid Glass: https://developer.apple.com/videos/play/wwdc2025/219/

Current Apple guidance treats Liquid Glass as a distinct **functional layer for controls/navigation**, not generic content decoration. On the web, transfer the hierarchy principle rather than copying the material blindly.

### Accessibility

Apple HIG: https://developer.apple.com/design/human-interface-guidelines/accessibility

Accessibility is part of Flexibility, Responsibility, Agency, and Craft. It is not a final compliance pass.

### Generative AI

Apple HIG: https://developer.apple.com/design/human-interface-guidelines/generative-ai

For AI features:
- communicate where AI is used;
- set expectations and limitations;
- keep people in control;
- allow refinement and feedback;
- protect privacy;
- anticipate unexpected output and downstream harm;
- use safeguards proportional to consequence.

---

## 13. Domain translations

### Product / CEO / CPO
- **Purpose:** prioritize genuine user value.
- **Agency:** avoid coercive flows and irreversible product traps.
- **Responsibility:** include second-order harms and trust.
- **Simplicity:** fewer stronger bets.
- **Craft:** define validation and post-launch learning.
- **Delight:** define the desired emotional outcome, not a decorative feature list.

### Engineering / CTO
- **Purpose:** architecture serves product behavior and operational needs.
- **Agency:** reversible deployments, rollback, idempotency, explicit state.
- **Responsibility:** secure defaults, privacy, failure containment.
- **Familiarity:** follow repo/framework conventions unless there is evidence to change them.
- **Flexibility:** retries, concurrency, scale, partial failure, migration states.
- **Craft:** tests, observability, performance, maintainability.

### Security
- **Responsibility** leads.
- Make safer paths easy.
- Preserve legitimate user agency while containing misuse.
- Distinguish threat evidence from hypothetical risk.
- Never manufacture risk scores.

### Payments / plans / finance
- Be transparent about money, renewal, failure, and entitlement state.
- Idempotency and reconciliation protect trust.
- Never optimize conversion by obscuring price or consequence.
- Label financial projections and ranges as estimates.

### Growth / sales / brand / content
- Persuasion must preserve agency.
- Claims require evidence.
- Match message to real product capability.
- Simplicity means clear value, not manipulative compression.
- Delight can be wit or character, but trust outranks cleverness.

### Scheduling / events / messaging
- Preserve context, timezone, capacity, and delivery state.
- Make delays, failures, conflicts, and retries legible.
- Avoid fake urgency.
- Recovery matters as much as the happy path.

### Testing / PR review / web quality
- Verify behavior, not only code presence.
- Test recovery paths and edge states.
- Performance and accessibility are product behavior.
- A passing tool score is evidence, not the whole judgment.

### Agent orchestration / skill discovery
- Preserve user intent across delegation.
- Keep provenance.
- Avoid redundant tools/skills.
- Prefer the smallest capable chain.
- Stop when the requested outcome is complete.

---

## 14. Required output behavior

Unless a skill has a more specific format, substantive recommendations should make clear:

- **what matters**
- **why**
- **evidence**
- **risk**
- **concrete next action**
- **verification**

Avoid performative scoring when no measurement basis exists. Use scores only when the skill defines a reproducible rubric.

---

## 15. Relationship to apple-feel.md

Use:
- **apple-principles-2026.md** for the repo-wide decision contract.
- **apple-feel.md** for deep UI/UX, motion, materials, interaction, and emotional design implementation.

The second is a specialization of the first.
