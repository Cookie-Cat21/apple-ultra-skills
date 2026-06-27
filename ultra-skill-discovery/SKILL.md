---
name: ultra-skill-discovery
description: >
  Opinionated skills.sh discovery — finds, ranks, and routes to Apple Ultra specialists
  or curated companion installs. Use when user asks find a skill, is there a skill for,
  skills.sh, what skill handles, or before writing a new skill from scratch. Better than
  raw find-skills because it adds product context and anti-duplication rules.
metadata:
  pack: apple-ultra
  version: "1.0"
reads:
  - ../registry/companions.json
  - ../registry/discovery-matrix.json
  - ../registry/skills.json
chains:
  upstream: [apple-hub]
  downstream: []
---

# Ultra Skill Discovery — Curated skills.sh Router

You are the **skills.sh front door** for Apple Ultra Skills. You beat raw `find-skills` by:
1. Searching the index with `npx skills find`
2. Ranking against [companions.json](../registry/companions.json) (trusted owners, install counts)
3. Routing to an **internal Ultra specialist** when we already synthesized the pattern (tier **S**)
4. Recommending **companion installs** only when tier **C** or **B** and Ultra doesn't cover it

**Do not install skills without user consent.** Show options with install commands.

---

## Discovery protocol

### Step 1 — Parse intent

Match user message to [discovery-matrix.json](../registry/discovery-matrix.json) `intents` array.
If no match, extract 2–3 keywords and proceed.

### Step 2 — Search skills.sh

```bash
npx skills find "<primary-query>"
npx skills find "<secondary-query>"   # optional
```

Also check companions for the matched `ultra_skill` in companions.json.

### Step 3 — Rank results

| Priority | Rule |
|----------|------|
| 1 | **Tier S companion** → recommend **Ultra internal skill only** (already synthesized) |
| 2 | **Ultra specialist** covers domain → primary recommendation |
| 3 | **Tier C companion** → secondary: `npx skills add owner/repo@skill -y` |
| 4 | **skills.sh result** with 1K+ installs from preferred owner |
| 5 | **skills.sh result** with 100–999 installs — note caution |
| 6 | Below 100 installs — mention only if no better option |

**Preferred owners:** `vercel-labs`, `anthropics`, `obra`, `addyosmani`, `stripe`, `microsoft`, `mattpocock`, `shadcn`

### Step 4 — Output recommendation

```markdown
## Ultra Skill Discovery
**Intent:** [parsed intent]
**Primary:** `ultra-xxx` — [why Ultra wins]
**skills.sh search:** `npx skills find "[query]"`

### Top matches
| Rank | Skill | Installs | Recommendation |
|------|-------|----------|----------------|
| 1 | ... | ... | Use Ultra / Install companion / Skip (duplicate) |

### Install (if companion chosen)
\`\`\`bash
npx skills add owner/repo@skill-name -y
\`\`\`

### Chain
[ultra-skill] → [optional companion] → [ship gate if code changes]
```

---

## Anti-duplication rules

| Situation | Action |
|-----------|--------|
| Companion tier **S** in companions.json | **Never** recommend install — use Ultra skill |
| User already has skill installed (`npx skills list`) | Note installed; suggest update not duplicate |
| External skill overlaps Ultra | Explain tradeoff: Ultra = product-shaped + ship gates; external = generic depth |
| User wants "best skill ever" | Recommend `npx skills add Cookie-Cat21/apple-ultra-skills` + bundle from companions.json |

---

## Bundle recommendations

From companions.json `bundles`:

| Bundle | When | Install |
|--------|------|---------|
| `design-pro` | UI-heavy project | Ultra design chain + shadcn + web-design-guidelines |
| `ship-ready-pro` | Engineering team | Ultra ship gates + obra TDD + Playwright |
| `full-pro` | Greenfield product | Full Ultra + find-skills + react-best-practices |

```bash
# Ultra pack first
npx skills add Cookie-Cat21/apple-ultra-skills -y

# Then companions (example ship-ready-pro)
npx skills add obra/superpowers@test-driven-development -y
npx skills add currents-dev/playwright-best-practices-skill@playwright-best-practices -y
```

---

## Scout reports

Deep competitive analysis per domain: `competitive-research/SKILLS-SCOUT-*.md` (14 scouts, skills.sh live data).

---

## When NOT to use

- User knows exact Ultra skill → route via `apple-hub` directly
- Implementing code → route to domain skill, not discovery loop
- Security emergency → `ultra-security-review` immediately

---

## Related skills

| Skill | When |
|-------|------|
| `apple-hub` | Route to specialist after discovery |
| `ultra-teach` | First-time project setup |
| `SKILL.md` Section 16 | Agent-Reach for researching skill repos before install |

---

## Do not

- Install skills silently
- Recommend low-install (<100) skills over Ultra without warning
- Suggest duplicating tier-S patterns as new external installs
- Skip Ultra ship gates after companion-suggested implementation
