# SKILLS-SCOUT-08 — ultra-cto vs skills.sh

**Date:** 2026-06-27  
**Pack:** apple-ultra-skills (`ultra-cto`)  
**Method:** `npx skills find` on skills.sh (install counts from CLI output)

## Queries run

```bash
npx skills find architecture
npx skills find typescript
npx skills find nextjs
npx skills find "react best practices"
npx skills find drizzle
npx skills find migrations
```

---

## Top 5 — architecture (`npx skills find architecture`)

| Rank | Skill | Installs | URL |
|------|-------|----------|-----|
| 1 | `mattpocock/skills@improve-codebase-architecture` | 331.3K | https://skills.sh/mattpocock/skills/improve-codebase-architecture |
| 2 | `coreyhaines31/marketingskills@site-architecture` | 69.5K | https://skills.sh/coreyhaines31/marketingskills/site-architecture |
| 3 | `flutter/skills@flutter-apply-architecture-best-practices` | 20.3K | https://skills.sh/flutter/skills/flutter-apply-architecture-best-practices |
| 4 | `wshobson/agents@architecture-patterns` | 18.1K | https://skills.sh/wshobson/agents/architecture-patterns |
| 5 | `github/awesome-copilot@architecture-blueprint-generator` | 11K | https://skills.sh/github/awesome-copilot/architecture-blueprint-generator |

## Top 5 — typescript (`npx skills find typescript`)

| Rank | Skill | Installs | URL |
|------|-------|----------|-----|
| 1 | `wshobson/agents@typescript-advanced-types` | 49.9K | https://skills.sh/wshobson/agents/typescript-advanced-types |
| 2 | `github/awesome-copilot@javascript-typescript-jest` | 11.4K | https://skills.sh/github/awesome-copilot/javascript-typescript-jest |
| 3 | `github/awesome-copilot@typescript-mcp-server-generator` | 10.8K | https://skills.sh/github/awesome-copilot/typescript-mcp-server-generator |
| 4 | `sickn33/antigravity-awesome-skills@typescript-expert` | 9.8K | https://skills.sh/sickn33/antigravity-awesome-skills/typescript-expert |
| 5 | `dotneet/claude-code-marketplace@typescript-react-reviewer` | 7.5K | https://skills.sh/dotneet/claude-code-marketplace/typescript-react-reviewer |

## Top 5 — nextjs (`npx skills find nextjs`)

| Rank | Skill | Installs | URL |
|------|-------|----------|-----|
| 1 | `wshobson/agents@nextjs-app-router-patterns` | 22.4K | https://skills.sh/wshobson/agents/nextjs-app-router-patterns |
| 2 | `clerk/skills@clerk-nextjs-patterns` | 20.1K | https://skills.sh/clerk/skills/clerk-nextjs-patterns |
| 3 | `sickn33/antigravity-awesome-skills@nextjs-best-practices` | 6.4K | https://skills.sh/sickn33/antigravity-awesome-skills/nextjs-best-practices |
| 4 | `sickn33/antigravity-awesome-skills@nextjs-supabase-auth` | 5.6K | https://skills.sh/sickn33/antigravity-awesome-skills/nextjs-supabase-auth |
| 5 | `affaan-m/everything-claude-code@nextjs-turbopack` | 4.7K | https://skills.sh/affaan-m/everything-claude-code/nextjs-turbopack |

## Top 5 — stack-adjacent (drizzle + migrations)

| Rank | Skill | Installs | Query |
|------|-------|----------|-------|
| 1 | `bobmatnyc/claude-mpm-skills@drizzle-orm` | 4.3K | drizzle |
| 2 | `affaan-m/everything-claude-code@database-migrations` | 5.7K | migrations |
| 3 | `giuseppe-trisciuoglio/developer-kit@drizzle-orm-patterns` | 1.9K | drizzle |
| 4 | `bobmatnyc/claude-mpm-skills@drizzle-migrations` | 739 | migrations |
| 5 | `wshobson/agents@nextjs-app-router-patterns` | 22.4K | nextjs |

---

## Gaps — ultra-cto vs skills.sh leaders

| Dimension | skills.sh leaders | ultra-cto today | Gap |
|-----------|-------------------|-----------------|-----|
| **Distribution** | mattpocock 331K installs; wshobson 50K+ on TS/Next | Not published on skills.sh | Zero discoverability; no install count signal |
| **Generality** | Framework-agnostic SOLID, layering, ADR patterns | Booking-first: slots, holds, TZ, payment gateway handoffs | Strong product fit; weak for generic "architecture review" search |
| **TypeScript depth** | Advanced types, MCP generators, React reviewer combos | Implicit via Zod/API checks in R4 | No dedicated TS rigor round (branded types, `satisfies`, discriminated unions) |
| **Next.js patterns** | App Router, Turbopack, Clerk auth at 20K+ | References in `_shared/STACK.md` only | No live fetch of Vercel/Next guidance during review |
| **Schema/migrations** | drizzle-orm 4.3K, database-migrations 5.7K | R1 migration policy is excellent | `ultra-migrations` exists but CTO doesn't chain to it in metadata |
| **Review protocol** | Mostly advisory checklists | 5 weighted rounds + SHIP/ITERATE/REJECT + named principles | Ahead on gate semantics; behind on breadth of examples |
| **React perf** | `akillness/oh-my-skills@vercel-react-best-practices` 383 installs | No React-specific round in CTO | Perf/a11y delegated to design skills, not architecture |

**Net:** ultra-cto wins on **product-shaped ship gates** (booking correctness, cron auth, migration policy). skills.sh wins on **reach** and **stack-specific depth** (TS types, Next App Router, Drizzle CRUD).

---

## Recommended PR

**Title:** `feat(ultra-cto): stack chains + ADR template + skills.sh distribution metadata`

### Scope

1. **Add `chains` to `ultra-cto/SKILL.md` metadata** — auto-handoff to `ultra-migrations` when diff touches `drizzle/**` or `**/migrations/**`; to `ultra-scheduling-engine` / `ultra-payments` when R2 flags booking/payment paths (mirror `ultra-pr-ship-review` pattern).

2. **Round 4.5 — TypeScript rigor (optional, P1 only)** — Borrow signal from `wshobson/agents@typescript-advanced-types`:
   - Zod-inferred types exported from schemas
   - No `any` on API request bodies
   - Discriminated unions for booking/payment status machines

3. **`references/ADR-TEMPLATE.md`** — One-page ADR scaffold (context / decision / consequences / status) linked from Round 0; aligns with mattpocock-style architecture skills without copying generic content.

4. **`references/next-app-router.md` pointer** — Already in repo; add explicit "load when reviewing `src/app/` changes" in Prerequisites (compete with wshobson 22.4K nextjs skill for stack-specific reviews).

5. **Distribution (P0 for competitive scout)** — Submit pack slice to skills.sh registry per `scripts/submit-to-registries.md`:
   - Keywords: `architecture review`, `typescript`, `nextjs`, `drizzle`, `schema`, `ADR`, `tech debt`
   - Bundle: `ultra-cto` + `ultra-migrations` in `registry/bundles.json` under `engineering-gate`

### Success metrics

- skills.sh listing live with install tracking
- CTO eval in `ultra-cto/evals/evals.json` (3 cases: migration edit P0, lib/component import P0, slot race ITERATE)
- Chained handoff documented in `apple-hub` routing table

### Out of scope

- Duplicating mattpocock generic architecture content (link instead)
- Flutter/mobile architecture (irrelevant to stack)
