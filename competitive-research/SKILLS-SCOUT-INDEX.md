# SKILLS-SCOUT Index — skills.sh Competitive Mining

**Date:** 2026-06-27  
**Method:** 14 parallel scouts via `npx skills find` + apple-ultra-skills pack analysis  
**Registry:** [companions.json](../registry/companions.json) · [discovery-matrix.json](../registry/discovery-matrix.json)

---

## Scout reports

| ID | File | Ultra target | Top skills.sh competitor |
|----|------|--------------|--------------------------|
| 00 | [SKILLS-SCOUT-00-meta-discovery.md](./SKILLS-SCOUT-00-meta-discovery.md) | apple-hub, SKILL.md | vercel-labs/skills@find-skills (2.2M) |
| 01 | [SKILLS-SCOUT-01-apple-design-head.md](./SKILLS-SCOUT-01-apple-design-head.md) | apple-design-head | anthropics/frontend-design (597K) |
| 02 | [SKILLS-SCOUT-02-ultra-visual-system.md](./SKILLS-SCOUT-02-ultra-visual-system.md) | ultra-visual-system | wshobson/tailwind-design-system (51K) |
| 03 | [SKILLS-SCOUT-03-ultra-component-discovery.md](./SKILLS-SCOUT-03-ultra-component-discovery.md) | ultra-component-discovery | shadcn/ui@shadcn (208K) |
| 04 | [SKILLS-SCOUT-04-ultra-web-quality.md](./SKILLS-SCOUT-04-ultra-web-quality.md) | ultra-web-quality | addyosmani/accessibility + seo (~60K) |
| 05 | [SKILLS-SCOUT-05-brand-content.md](./SKILLS-SCOUT-05-brand-content.md) | ultra-brand-voice, content | coreyhaines31/copywriting (137K) |
| 06 | [SKILLS-SCOUT-06-ultra-tdd.md](./SKILLS-SCOUT-06-ultra-tdd.md) | ultra-tdd | obra/test-driven-development (143K) |
| 07 | [SKILLS-SCOUT-07-ultra-security.md](./SKILLS-SCOUT-07-ultra-security.md) | ultra-security-review | hoodini/owasp-security (2.3K) |
| 08 | [SKILLS-SCOUT-08-ultra-cto.md](./SKILLS-SCOUT-08-ultra-cto.md) | ultra-cto | mattpocock/improve-codebase-architecture (331K) |
| 09 | [SKILLS-SCOUT-09-ultra-pr-ship-review.md](./SKILLS-SCOUT-09-ultra-pr-ship-review.md) | ultra-pr-ship-review | obra/systematic-debugging (162K) |
| 10 | [SKILLS-SCOUT-10-ultra-payments.md](./SKILLS-SCOUT-10-ultra-payments.md) | ultra-payments | stripe/stripe-best-practices (50K) |
| 11 | [SKILLS-SCOUT-11-ultra-scheduling.md](./SKILLS-SCOUT-11-ultra-scheduling.md) | ultra-scheduling-engine | **No direct competitor** — Ultra moat |
| 12 | [SKILLS-SCOUT-12-executive.md](./SKILLS-SCOUT-12-executive.md) | ultra-ceo/cpo/cfo | deanpeters/roadmap-planning (2.2K) |
| 13 | [SKILLS-SCOUT-13-gtm.md](./SKILLS-SCOUT-13-gtm.md) | ultra-head-of-growth/sales | kostja94/gtm-strategy (824) |
| 14 | [SKILLS-SCOUT-14-infrastructure.md](./SKILLS-SCOUT-14-infrastructure.md) | dag-task-runner | obra/brainstorming (246K) |

---

## Cross-cutting findings

1. **Distribution is the ceiling** — Ultra has 0 skills.sh installs; competitors range 2K–2.2M
2. **Integration is the moat** — No competitor combines hub + exec + engineering + design + ship gates
3. **Synthesize tier-S** — obra TDD, addyosmani lanes, vercel react patterns → already in Ultra or this PR
4. **Chain tier-C** — shadcn, stripe, playwright as companions not duplicates
5. **Scheduling is uncontested** — skills.sh has transport bookers, not SaaS slot/hold engines

---

## Implementation status (this PR)

| Track | Status |
|-------|--------|
| A — 14 scouts | ✅ SKILLS-SCOUT-00 through 14 |
| B — Synthesis (TDD, PR review, web quality) | ✅ ultra-tdd, ultra-pr-ship-review, ultra-web-quality |
| C — Discovery layer | ✅ companions.json, discovery-matrix.json, ultra-skill-discovery |

---

## Next sprint

1. Publish to skills.sh (`npx skills add Cookie-Cat21/apple-ultra-skills`)
2. VoltAgent + tech-leads-club registry PRs
3. `references/E2E-PLAYWRIGHT.md` (scout 06 recommendation)
4. Live guideline fetch in apple-design-head (scout 01 — vercel pattern)
