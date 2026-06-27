# SKILLS-SCOUT: ultra-component-discovery

**Date:** 2026-06-27  
**Repo:** Cookie-Cat21/apple-ultra-skills  
**Queries run:**
```bash
npx skills find "shadcn" 2>/dev/null | head -10
```

**Supplemental** (for 5th row — shadcn query returns only 3 hits):
```bash
npx skills find "component registry" 2>/dev/null | head -5
```

## Ultra skill target

`ultra-component-discovery` — Find, evaluate, and install UI from 21st.dev, shadcnblocks, Aceternity, Magic UI, HyperUI, Tremor, registry.directory, and 20+ sources in `SOURCES.md`. Delivers URLs, CLI commands, deps, token adaptation checklist, handoff to `apple-design-head`. Modes: Discover / Source / Implement / Compare.

## Top 5 skills.sh matches

| Skill | Installs | Steal | Tier |
|-------|----------|-------|------|
| `shadcn/ui@shadcn` | 208.3K | Official shadcn CLI/MCP patterns — chain as required prereq, cite in SOURCES.md | C |
| `google-labs-code/stitch-skills@shadcn-ui` | 42.1K | Stitch + shadcn integration patterns for AI codegen flows | B |
| `giuseppe-trisciuoglio/developer-kit@shadcn-ui` | 18.6K | Developer-kit shadcn recipes — scan for install snippets | B |
| `yonatangross/orchestkit@ui-components` | 822 | Broad UI component routing — compare discovery table structure | B |
| `21st-dev/registry@21st-registry` | 113 | First-party 21st registry skill — align with SOURCES.md 21st.dev workflow | C |

**Raw CLI — `shadcn` (3 hits in head -10):**
```
shadcn/ui@shadcn                                        208.3K installs
google-labs-code/stitch-skills@shadcn-ui                42.1K installs
giuseppe-trisciuoglio/developer-kit@shadcn-ui           18.6K installs
```

**Raw CLI — `component registry` (supplemental):**
```
21st-dev/registry@21st-registry                         113 installs
```

**Raw CLI — `ui components` (supplemental, for orchestkit row):**
```
yonatangross/orchestkit@ui-components                   822 installs
```

## Gaps Ultra wins

- **Multi-registry routing** — Single intent → ranked sources (Shadcnblocks → 21st → Tailark for marketing blocks); `shadcn@shadcn` (208K) covers primitives only.
- **Pre-install scoring** — 5-axis evaluate (craft, token fit, a11y, bundle, license) with P0 reject rules; shadcn skill assumes install-first.
- **Anti-slop sourcing** — Explicit reject for purple gradient KPI templates; registry skills optimize for variety, not Apple craft.
- **Project context** — Reads `_shared/VISUAL.md`, `STACK.md`, `BRAND.md` before recommending Motion/Three deps.
- **Post-install chain** — visual-system → design-head → pr-ship-review documented; no competitor wires full ship pipeline.
- **Bookmark catalog** — `SOURCES.md` encodes 20+ sites + namespace cheat sheet — exceeds any single skills.sh component skill.

## Gaps Ultra loses

- **Dominant install share** — `shadcn/ui@shadcn` at **208.3K** is the default agent answer for “add a component”; Ultra is invisible on `npx skills find "shadcn"`.
- **Official MCP path** — shadcn skill documents `npx shadcn@latest mcp init`; Ultra mentions MCP once in SOURCES.md but does not own MCP setup as primary skill.
- **Stitch integration** — `stitch-skills@shadcn-ui` (42K) bridges Google Stitch codegen; Ultra has no Stitch-specific install path.
- **Registry-first SEO** — 21st’s own skill (`21st-registry`, 113) will rank for 21st queries; Ultra references 21st but is not indexed as `21st-registry` competitor.
- **No skills.sh bundle** — Users cannot `npx skills add` Ultra component discovery alongside shadcn in one known bundle.

## Recommended PR

**Title:** `feat(component-discovery): shadcn chain companion + registry.sh listing`

1. **Tier C — document explicit chain** — Top of `ultra-component-discovery/SKILL.md`: “Prerequisite: `npx skills add shadcn/ui@shadcn` OR project already has `components.json`.” Link to 208K skill as companion, not competitor.
2. **Tier C — 21st alignment** — Cross-link `21st-dev/registry@21st-registry` in `SOURCES.md`; ensure `npx shadcn@latest add "https://21st.dev/r/..."` examples match 21st skill conventions.
3. **Tier B — Stitch note** — Add `SOURCES.md` row: Google Stitch users → `google-labs-code/stitch-skills@shadcn-ui` for codegen handoff (bundle only, optional).
4. **Registry submit** — `Cookie-Cat21/apple-ultra-skills@ultra-component-discovery` with triggers: `find component`, `shadcn block`, `registry`, `UI block`, `21st.dev`, `footer`, `carousel`, `hero`.
5. **Bundle in `registry/bundles.json`** — `"design": ["ultra-component-discovery", "ultra-visual-system", "apple-design-head"]` and `"shadcn-chain": ["shadcn/ui@shadcn", "ultra-component-discovery"]` (external + internal).
6. **MCP section upgrade** — Expand Phase 1 step 3: full `npx shadcn@latest mcp init --client cursor` + when to use MCP vs `SOURCES.md` browse (close gap vs 208K default).

**Success metric:** Design chain bundle documented in README; `npx skills find "component registry"` includes Ultra entry post-submit.
