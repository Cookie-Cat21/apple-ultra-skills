# SKILLS-SCOUT-12 — Executive Personas (CEO / CPO / CFO)

**Date:** 2026-06-27  
**Method:** `npx skills find` on skills.sh + local review of `ultra-ceo`, `ultra-cpo`, `ultra-cfo`  
**Queries run:** `product strategy`, `CEO strategy`, `CPO product`, `CFO finance`, `unit economics`, `roadmap prioritization`  
**Apple Ultra skills:** `ultra-ceo`, `ultra-cpo`, `ultra-cfo` — **not indexed on skills.sh** (0 installs)

---

## Apple Ultra baseline

| Skill | skills.sh status | Differentiator vs market |
|-------|------------------|--------------------------|
| `ultra-ceo` | Not found | Beachhead density, say-no protocol, `_shared/` context, weighted RUBRIC + SHIP gate |
| `ultra-cpo` | Not found | Plan-tier gating (Starter/Pro/Growth), activation north star, entitlement code anchors |
| `ultra-cfo` | Not found | Messaging COGS, local-currency margin models, tier allowance math tied to PRODUCT.md |

No public pack combines all three with shared product context and scored review gates. Closest is `alirezarezvani/claude-skills` (CEO + CPO advisors only; no CFO, no rubrics).

---

## Top 5 — CEO / strategy

| Rank | Skill | Installs | URL |
|------|-------|----------|-----|
| 1 | `alirezarezvani/claude-skills@ceo-advisor` | 853 | https://skills.sh/alirezarezvani/claude-skills/ceo-advisor |
| 2 | `borghei/claude-skills@ceo-advisor` | 174 | https://skills.sh/borghei/claude-skills/ceo-advisor |
| 3 | `smithery.ai@ceo-advisor` | 64 | https://skills.sh/smithery.ai/ceo-advisor |
| 4 | `ovachiever/droid-tings@ceo-advisor` | 43 | https://skills.sh/ovachiever/droid-tings/ceo-advisor |
| 5 | `phuryn/pm-skills@product-strategy` | 1.6K | https://skills.sh/phuryn/pm-skills/product-strategy |

*Note: `product-strategy` ranks #1 on that query but is PM-framed, not CEO persona.*

---

## Top 5 — CPO / product strategy / roadmap

| Rank | Skill | Installs | URL |
|------|-------|----------|-----|
| 1 | `deanpeters/product-manager-skills@roadmap-planning` | 2.2K | https://skills.sh/deanpeters/product-manager-skills/roadmap-planning |
| 2 | `phuryn/pm-skills@product-strategy` | 1.6K | https://skills.sh/phuryn/pm-skills/product-strategy |
| 3 | `alirezarezvani/claude-skills@cpo-advisor` | 534 | https://skills.sh/alirezarezvani/claude-skills/cpo-advisor |
| 4 | `alirezarezvani/claude-skills@cpo-review` | 352 | https://skills.sh/alirezarezvani/claude-skills/cpo-review |
| 5 | `nickcrew/claude-ctx-plugin@product-strategy` | 42 | https://skills.sh/nickcrew/claude-ctx-plugin/product-strategy |

---

## Top 5 — CFO / unit economics

| Rank | Skill | Installs | URL |
|------|-------|----------|-----|
| 1 | `anthropics/financial-services@unit-economics` | 260 | https://skills.sh/anthropics/financial-services/unit-economics |
| 2 | `jmsktm/claude-settings@unit-economics-calculator` | 185 | https://skills.sh/jmsktm/claude-settings/unit-economics-calculator |
| 3 | `anthropics/financial-services-plugins@unit-economics` | 181 | https://skills.sh/anthropics/financial-services-plugins/unit-economics |
| 4 | `lyndonkl/claude@financial-unit-economics` | 139 | https://skills.sh/lyndonkl/claude/financial-unit-economics |
| 5 | `aviskaar/open-org@cfo-finance` | 79 | https://skills.sh/aviskaar/open-org/cfo-finance |

---

## Gap analysis

| Gap | Apple Ultra | Market leaders |
|-----|-------------|----------------|
| **skills.sh distribution** | 0 installs; not searchable | Top PM skills 1.6K–2.2K installs |
| **C-suite breadth** | CEO + CPO + CFO only (focused) | `alirezarezvani/claude-skills` ships 28+ advisors |
| **Generic vs product-shaped** | Beachhead, tiers, messaging COGS wired to `_shared/` | Advisors are persona prompts; no entitlement/tier anchors |
| **Scored review protocol** | 0–100 weighted rounds + RUBRIC.md + SHIP/ITERATE/REJECT | Most competitors: unstructured advice |
| **evals.json** | Missing on exec skills (present on design/security/pr-ship) | `claude-skills` pipeline has eval fixtures |
| **Cross-persona routing** | `apple-hub` routes CEO↔CPO↔CFO | Standalone installs; no hub |
| **CFO persona depth** | Strong on variable-cost SaaS | `cfo-finance` (79) and unit-economics skills are calculator-first, not persona + gate |

**Where Apple Ultra wins:** Integrated exec triangle with shared PRODUCT/BRAND/COMPETITORS context, plan-tier placement (CPO), and margin-at-median-usage modeling (CFO). No skills.sh competitor ties strategy decisions to `requireEntitlement()` or booking activation metrics.

**Where Apple Ultra loses:** Discoverability (not on skills.sh), install counts, and PM-community mindshare (`deanpeters`, `phuryn` dominate roadmap/strategy queries).

---

## Recommended PRs

### PR 1 — skills.sh publish (P0, no upstream PR)

**Action:** Verify `npx skills add Cookie-Cat21/apple-ultra-skills` on clean machine; ensure `registry/skills.json` lists exec skills with pushy descriptions.

**Why:** `npx skills find "ultra-ceo"` returns zero results today. Competitors with 500–2.2K installs are discoverable; Apple Ultra is invisible.

```bash
cd /tmp && npx skills add Cookie-Cat21/apple-ultra-skills --yes
npx skills find "beachhead strategy"
npx skills find "plan tier gating"
```

### PR 2 — VoltAgent/awesome-agent-skills (P0)

**Title:** `Add skill: Cookie-Cat21/apple-ultra-skills`

**Entry (Business / Strategy section):**
```markdown
- **[Cookie-Cat21/apple-ultra-skills](https://github.com/Cookie-Cat21/apple-ultra-skills)** - CEO/CPO/CFO personas with scored review gates
```

**Body highlight:** Only pack combining beachhead CEO, tier-aware CPO, and messaging-COGS CFO with `_shared/` context — not generic advisor prompts.

### PR 3 — Exec evals + hub aliases (P1, internal)

**Branch:** `feat/exec-evals-and-discovery`

| File | Change |
|------|--------|
| `ultra-ceo/evals/evals.json` | 3 pressure scenarios (pivot, multi-city expansion, competitor parity) |
| `ultra-cpo/evals/evals.json` | Tier placement + cannibalization cases |
| `ultra-cfo/evals/evals.json` | Pro tenant at 500 msgs/mo margin case |
| `ultra-ceo/SKILL.md` description | Add triggers: `beachhead`, `say no`, `unit economics handoff` |
| `registry/skills.json` | Add search aliases: `ceo-advisor`, `cpo-advisor`, `cfo-finance` |

### PR 4 — Borrow from `deanpeters/product-manager-skills` (P2, internal)

**Action:** Add optional **RICE quick-score** appendix to `ultra-cpo/RUBRIC.md` (not a separate skill) — market leader at 2.2K installs owns "roadmap planning" query; Apple Ultra should rank for `plan tier` + `activation` instead of competing head-on.

---

## Scout verdict

Executive personas are **ahead on integration and review depth**, **behind on distribution**. Highest-ROI move: get on skills.sh (usage-driven indexing) + VoltAgent listing. Secondary: exec `evals.json` to match `claude-skills` and `ultra-pr-ship-review` quality bar.
