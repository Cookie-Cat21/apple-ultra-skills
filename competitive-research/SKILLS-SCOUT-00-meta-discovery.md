# SKILLS-SCOUT: meta-discovery

**Date:** 2026-06-27  
**Repo:** Cookie-Cat21/apple-ultra-skills  
**Queries run:**
```bash
npx skills find "find skills" 2>/dev/null | head -15
npx skills find "skill hub" 2>/dev/null | head -10
```

## Ultra skill target

| Skill | Role |
|-------|------|
| `apple-hub` | Entry router — maps intent → primary skill, optional chains, `_shared/` context, Agent-Reach research layer |
| `SKILL.md` (`apple-ultra-skills`) | Meta-skill — context detection engine, 16 Ultra modes, `/references/*` depth index, cross-domain synthesis |

Together these are the **discovery and activation layer** for the pack: hub routes; root SKILL.md auto-activates modes by file type, imports, and intent without the user naming a specialist.

## Top 5 skills.sh matches

> **Note:** `"skill hub"` returned **0 results**. `"find skills"` returned **3** matches (full output below). Table lists all CLI hits; no fifth result exists in this query set.

| Skill | Installs | Steal | Tier |
|-------|----------|-------|------|
| `skill.new.ndhy.com@skill-find` | 70 | Meta-search CLI patterns; compare trigger phrasing for `description` fields | C |
| `rohitg00/skillkit@find-skills` | 48 | Skillkit discovery workflow; optional `references/agent-patterns.md` cite for “how to find skills” | C |
| `wuys13/find-my-skills@find-my-skills` | 23 | Personal skill index pattern — low signal for product pack | B |
| *(no match)* `"skill hub"` | — | — | — |
| *(no match)* 5th `"find skills"` hit | — | — | — |

**Raw CLI — `find skills`:**
```
skill.new.ndhy.com@skill-find          70 installs
rohitg00/skillkit@find-skills          48 installs
wuys13/find-my-skills@find-my-skills   23 installs
```

**Raw CLI — `skill hub`:**
```
No skills found for "skill hub"
```

## Gaps Ultra wins

- **Only integrated hub in ecosystem** — `apple-hub` routes design, executive, GTM, engineering, and infrastructure with explicit **common chains** (e.g. component-discovery → visual-system → design-head → pr-ship-review). No skills.sh hit for “skill hub” competes on routing breadth.
- **Context-aware meta-skill** — Root `SKILL.md` Section 1 detection matrix activates multiple Ultra modes simultaneously; find-skills utilities only list/install, they do not synthesize cross-domain rules.
- **Project onboarding hook** — Hub suggests `ultra-teach` when `.ultra.md` is missing; discovery skills are agent-agnostic and project-blind.
- **Research-then-build** — Hub documents Agent-Reach protocol; meta-discovery skills stop at “which skill to add.”
- **Pack coherence** — 24+ specialists share P0–P3 severity, SHIP gates, and `_shared/` — not a flat install list.

## Gaps Ultra loses

- **skills.sh distribution** — Top find-skills entries are installable via `npx skills add`; Apple Ultra is not yet a first-class skills.sh listing with comparable discoverability for queries like “find skills” or “skill hub.”
- **No dedicated find-skill inside the pack** — Users on skills.sh expect a `find-skills` micro-skill; Ultra relies on hub prose + platform triggers instead of a searchable `apple-find-skills` alias.
- **Low install social proof** — Competitor find utilities are niche (23–70 installs) but indexed; Ultra hub has zero skills.sh footprint for router keywords.
- **Keyword gap** — “skill hub”, “router”, “which skill” are untapped registry tags; hub `description` does not mirror high-volume discovery phrases (`find skills`, `skill router`, `skill directory`).

## Recommended PR

**Title:** `feat(hub): skills.sh discovery aliases + registry metadata`

1. **Add `apple-find-skills/SKILL.md`** — Thin wrapper: runs `npx skills find` for user query, maps top hits to Ultra chain (e.g. shadcn → `ultra-component-discovery`). Tier **C** companion, not duplicate of hub.
2. **Expand `apple-hub` + root `SKILL.md` descriptions** — Include triggers: `find skills`, `skill router`, `which skill should I use`, `skill hub`, `apple ultra` (mirror skills.sh search vocabulary).
3. **Submit to skills.sh** — Register `Cookie-Cat21/apple-ultra-skills@apple-hub` and `@apple-ultra-skills` with tags: `hub`, `router`, `find-skills`, `meta`.
4. **Synthesize Tier S from skill-find (70)** — Add `references/skill-discovery.md`: when to use skills.sh vs Agent-Reach vs hub routing table (3-page max).
5. **Bundle in `registry/bundles.json`** — `"onboarding": ["apple-hub", "ultra-teach", "apple-find-skills"]` for one-shot `npx skills add` path.

**Success metric:** `npx skills find "skill hub"` or `"apple ultra"` returns Apple Ultra entries within 30 days of registry submit.
