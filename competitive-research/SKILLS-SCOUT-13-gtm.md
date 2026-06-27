# SKILLS-SCOUT-13 — GTM Personas (Head of Growth / Head of Sales)

**Date:** 2026-06-27  
**Method:** `npx skills find` on skills.sh + local review of `ultra-head-of-growth`, `ultra-head-of-sales`  
**Queries run:** `growth marketing`, `GTM launch`, `head of growth`, `sales playbook`, `outreach DM`  
**Apple Ultra skills:** `ultra-head-of-growth`, `ultra-head-of-sales` — **not indexed on skills.sh** (0 installs)

---

## Apple Ultra baseline

| Skill | skills.sh status | Differentiator vs market |
|-------|------------------|--------------------------|
| `ultra-head-of-growth` | Not found | Wave model (0→30→70→100), cluster density, proof artifacts, founder-hours CAC |
| `ultra-head-of-sales` | Not found | Objection canon from BRAND.md, concierge close, IG/WA DM templates, peer-to-owner voice |

GTM skills are **product-shaped** (booking-page proof, `{slug}.your-domain.com`, referral-hub loops). Market leaders are **channel-generic** (panels, playbooks, launch checklists).

---

## Top 5 — Growth marketing / GTM

| Rank | Skill | Installs | URL |
|------|-------|----------|-----|
| 1 | `kostja94/marketing-skills@gtm-strategy` | 824 | https://skills.sh/kostja94/marketing-skills/gtm-strategy |
| 2 | `kostja94/marketing-skills@product-launch` | 812 | https://skills.sh/kostja94/marketing-skills/product-launch |
| 3 | `aradotso/marketing-skills@30x-growth-marketing-panel` | 677 | https://skills.sh/aradotso/marketing-skills/30x-growth-marketing-panel |
| 4 | `borghei/claude-skills@growth-marketer` | 361 | https://skills.sh/borghei/claude-skills/growth-marketer |
| 5 | `dengineproblem/agents-monorepo@growth-marketing` | 116 | https://skills.sh/dengineproblem/agents-monorepo/growth-marketing |

*Query `growth marketing` — same top 5 order.*

---

## Top 5 — Sales / outreach

| Rank | Skill | Installs | URL |
|------|-------|----------|-----|
| 1 | `membranedev/application-skills@outreach` | 190 | https://skills.sh/membranedev/application-skills/outreach |
| 2 | `louisblythe/salesskills@sales-playbook-scaling` | 135 | https://skills.sh/louisblythe/salesskills/sales-playbook-scaling |
| 3 | `simota/agent-skills@growth` | 106 | https://skills.sh/simota/agent-skills/growth |
| 4 | `majesticlabs-dev/majestic-marketplace@sales-playbook` | 42 | https://skills.sh/majesticlabs-dev/majestic-marketplace/sales-playbook |
| 5 | `agusgarcia3007/sales-playbook@sales-playbook` | 20 | https://skills.sh/agusgarcia3007/sales-playbook/sales-playbook |

*Query `head of sales` returns only 2 weak matches (50, 27 installs) — category is fragmented; `outreach` and `sales playbook` are better proxies.*

---

## Gap analysis

| Gap | Apple Ultra | Market leaders |
|-----|-------------|----------------|
| **skills.sh presence** | 0 installs | `kostja94` pair ~800+ each; growth panel 677 |
| **Paid acquisition playbooks** | De-emphasized (founder-time CAC) | `30x-growth-marketing-panel` = multi-expert paid/organic mix |
| **Global GTM templates** | Beachhead-cluster specific | `gtm-strategy` / `product-launch` are industry-agnostic |
| **Sales playbook scale** | Concierge 1:1 close patterns | `sales-playbook-scaling` (135) targets repeatable SDR motion |
| **Scored review + RUBRIC** | 4-round weighted protocol on both GTM skills | Competitors: unstructured scripts/checklists |
| **Growth ↔ Sales handoff** | Explicit routing in SKILL.md | Separate installs; no shared objection canon |
| **evals.json** | Missing on GTM skills | No GTM leader ships evals either — opportunity to lead |
| **FUNNEL-KIT / copy chain** | Routes to `ultra-brand-voice` | CRISP ships `/crisp-funnel` blocks (not on skills.sh GTM queries) |

**Where Apple Ultra wins:** Density-first GTM (one cluster before multi-city), proof-obsessed metrics (live booking pages not signups), canonical objection table shared with sales, wave-based sequencing tied to founder capacity.

**Where Apple Ultra loses:** Discoverability, broad marketing skill mindshare (`kostja94`, `aradotso`), and enterprise-style sales scaling narratives.

---

## Recommended PRs

### PR 1 — skills.sh GTM discoverability (P0)

**Action:** After pack is installable, seed discovery with description triggers matching skills.sh queries:

| Skill | Add to `description` |
|-------|---------------------|
| `ultra-head-of-growth` | `GTM`, `growth marketing`, `product launch`, `first 100 customers`, `acquisition` |
| `ultra-head-of-sales` | `sales playbook`, `outreach`, `DM script`, `objection handling`, `B2B pitch` |

**Verify:**
```bash
npx skills find "first 100 customers"
npx skills find "objection handling"
```

### PR 2 — sickn33/antigravity-awesome-skills (P1)

**Title:** `Add apple-ultra-skills GTM personas`

**Entry:**
```markdown
- [apple-ultra-skills](https://github.com/Cookie-Cat21/apple-ultra-skills) — Head of Growth + Sales with scored review, beachhead density, objection canon. MIT.
```

**Why:** `sickn33/antigravity-awesome-skills@brainstorming` has 1.9K installs — same aggregator audience as growth hackers.

### PR 3 — GTM evals + sample outputs (P1, internal)

**Branch:** `feat/gtm-evals`

| File | Scenario |
|------|----------|
| `ultra-head-of-growth/evals/evals.json` | Multi-city launch rejected; referral-hub cluster approved |
| `ultra-head-of-sales/evals/evals.json` | "We already use WhatsApp" objection; cold IG DM |
| `examples/gtm-wave-0-script.md` | Redacted sample outreach batch (borrow playbook *format* from `louisblythe`, not content) |

### PR 4 — Optional `ultra-gtm-launch` thin skill (P2, internal — only if hub routing insufficient)

**Scope:** Single skill that composes growth wave pick + sales script + brand CTA check — competes with `kostja94@product-launch` (812 installs) on one install target.

**Do not vendor** `kostja94` content; reference wave model from existing `ultra-head-of-growth` only.

### PR 5 — Cross-link exec triangle (P2, internal)

In `ultra-head-of-growth` and `ultra-head-of-sales` prerequisites, add explicit **CFO budget gate** callout when user proposes paid ads — routes margin questions to `ultra-cfo` before SHIP.

---

## Scout verdict

GTM personas are **niche-strong, market-invisible**. Top skills.sh competitors (`kostja94`, `aradotso`) lead on generic launch/GTM installs (600–800+) but lack product context, scored gates, and growth→sales→brand chain. **P0:** skills.sh indexing + trigger tuning. **P1:** GTM evals (blue ocean — no competitor has them).
