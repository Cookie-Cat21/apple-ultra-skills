# SKILLS-SCOUT-14 — Infrastructure (DAG Task Runner / Agent-Reach / Orchestration)

**Date:** 2026-06-27  
**Method:** `npx skills find` on skills.sh + local review of `dag-task-runner`, `references/agent-reach.md`, hub MCP/deploy guidance  
**Queries run:** `superpowers`, `brainstorming`, `workflow orchestrator`, `mcp`, `vercel deploy`, `agent reach`, `DAG parallel`, `subagent parallel`, `agent orchestration`  
**Apple Ultra skills:** `dag-task-runner` — **not indexed** (0 installs); Agent-Reach documented in hub, not a standalone skill

---

## Apple Ultra baseline

| Component | skills.sh status | Differentiator vs market |
|-----------|------------------|--------------------------|
| `dag-task-runner` | Not found | Cursor SDK subagents, topological parallel ranks, live `.canvas.tsx`, complexity→model map |
| Agent-Reach (hub ref) | Third-party skills exist | Apple Ultra wires channels into research protocol (Section 16); does not vendor skill |
| MCP / Vercel | Via Cursor plugin cache + `ultra-integrations` | Not standalone skills in pack |

`dag-task-runner` is the **only** skills.sh candidate that executes a JSON DAG with concurrent subagents + live canvas — no direct competitor at 0-query visibility.

---

## Top 5 — Superpowers / workflow discipline

| Rank | Skill | Installs | URL |
|------|-------|----------|-----|
| 1 | `obra/superpowers@brainstorming` | 246K | https://skills.sh/obra/superpowers/brainstorming |
| 2 | `obra/superpowers@systematic-debugging` | 162K | https://skills.sh/obra/superpowers/systematic-debugging |
| 3 | `obra/superpowers@writing-plans` | 160.8K | https://skills.sh/obra/superpowers/writing-plans |
| 4 | `obra/superpowers@using-superpowers` | 160.3K | https://skills.sh/obra/superpowers/using-superpowers |
| 5 | `obra/superpowers@requesting-code-review` | 144.9K | https://skills.sh/obra/superpowers/requesting-code-review |

*Query `superpowers` — obra monorepo dominates; 246K on brainstorming alone.*

---

## Top 5 — Brainstorming (non-superpowers)

| Rank | Skill | Installs | URL |
|------|-------|----------|-----|
| 1 | `obra/superpowers@brainstorming` | 246K | https://skills.sh/obra/superpowers/brainstorming |
| 2 | `anthropics/knowledge-work-plugins@product-brainstorming` | 3.2K | https://skills.sh/anthropics/knowledge-work-plugins/product-brainstorming |
| 3 | `sickn33/antigravity-awesome-skills@brainstorming` | 1.9K | https://skills.sh/sickn33/antigravity-awesome-skills/brainstorming |
| 4 | `roin-orca/skills@fun-brainstorming` | 1.5K | https://skills.sh/roin-orca/skills/fun-brainstorming |
| 5 | `nexu-io/open-design@brainstorming` | 1.3K | https://skills.sh/nexu-io/open-design/brainstorming |

---

## Top 5 — Workflow orchestration

| Rank | Skill | Installs | URL |
|------|-------|----------|-----|
| 1 | `getcargohq/cargo-skills@cargo-orchestration` | 531 | https://skills.sh/getcargohq/cargo-skills/cargo-orchestration |
| 2 | `404kidwiz/claude-supercode-skills@workflow-orchestrator` | 114 | https://skills.sh/404kidwiz/claude-supercode-skills/workflow-orchestrator |
| 3 | `hack23/homepage@agentic-workflow-orchestration` | 61 | https://skills.sh/hack23/homepage/agentic-workflow-orchestration |
| 4 | `itallstartedwithaidea/agent-skills@workflow-orchestration` | 43 | https://skills.sh/itallstartedwithaidea/agent-skills/workflow-orchestration |
| 5 | `metyatech/skill-autonomous-orchestrator@autonomous-orchestrator` | 50 | https://skills.sh/metyatech/skill-autonomous-orchestrator/autonomous-orchestrator |

*Query `workflow orchestrator` also surfaces `cargo-analytics` (531) — same repo, analytics not orchestration.*

---

## Top 5 — MCP

| Rank | Skill | Installs | URL |
|------|-------|----------|-----|
| 1 | `anthropics/skills@mcp-builder` | 81.3K | https://skills.sh/anthropics/skills/mcp-builder |
| 2 | `mcp-use/mcp-use@mcp-apps-builder` | 16K | https://skills.sh/mcp-use/mcp-use/mcp-apps-builder |
| 3 | `github/awesome-copilot@mcp-cli` | 9.3K | https://skills.sh/github/awesome-copilot/mcp-cli |
| 4 | `mcp-use/mcp-use@mcp-builder` | 9.3K | https://skills.sh/mcp-use/mcp-use/mcp-builder |
| 5 | `github/awesome-copilot@mcp-deploy-manage-agents` | 8.7K | https://skills.sh/github/awesome-copilot/mcp-deploy-manage-agents |

---

## Top 5 — Vercel deploy

| Rank | Skill | Installs | URL |
|------|-------|----------|-----|
| 1 | `vercel/vercel-plugin@deployments-cicd` | 654 | https://skills.sh/vercel/vercel-plugin/deployments-cicd |
| 2 | `vercel-labs/vercel-plugin@deployments-cicd` | 547 | https://skills.sh/vercel-labs/vercel-plugin/deployments-cicd |
| 3 | `vercel-labs/vercel-plugin@vercel-cli` | 473 | https://skills.sh/vercel-labs/vercel-plugin/vercel-cli |
| 4 | `midudev/autoskills@deploy-to-vercel` | 30 | https://skills.sh/midudev/autoskills/deploy-to-vercel |

*Only 4 results for `vercel deploy`.*

---

## Top 5 — Agent-Reach / parallel execution

| Rank | Skill | Installs | URL |
|------|-------|----------|-----|
| 1 | `aradotso/trending-skills@translate-book-parallel` | 1.2K | https://skills.sh/aradotso/trending-skills/translate-book-parallel |
| 2 | `terrylica/cc-skills@agent-reach` | 159 | https://skills.sh/terrylica/cc-skills/agent-reach |
| 3 | `skills.volces.com@agent-reach` | 151 | https://skills.sh/skills.volces.com/agent-reach |
| 4 | `cloudai-x/claude-workflow-v2@parallel-execution` | 150 | https://skills.sh/cloudai-x/claude-workflow-v2/parallel-execution |
| 5 | `tech-leads-club/agent-skills@cursor-subagent-creator` | 168 | https://skills.sh/tech-leads-club/agent-skills/cursor-subagent-creator |

*Query `DAG parallel` returns Airflow `astronomer/agents@dag-factory` (174) — data pipeline DAGs, not agent orchestration.*

---

## Gap analysis

| Gap | Apple Ultra | Market leaders |
|-----|-------------|----------------|
| **dag-task-runner on skills.sh** | 0 installs; query returns nothing | No true equivalent indexed; nearest is `parallel-execution` (150) |
| **Superpowers adoption** | No brainstorming/TDD workflow skill | `obra/superpowers` 144K–246K installs per skill |
| **MCP builder skill** | Relies on Cursor plugin cache, not pack skill | `anthropics@mcp-builder` 81.3K installs |
| **Vercel deploy skill** | Stack in `_shared/STACK.md`; no `ultra-deploy` | Official `vercel-plugin@deployments-cicd` 654 installs |
| **Agent-Reach packaging** | Reference doc + hub protocol only | `terrylica/cc-skills@agent-reach` 159 installs as installable skill |
| **Cargo-style orchestration** | DAG is code-execution oriented | `cargo-orchestration` 531 — different runtime (Cargo HQ) |
| **Canvas live UI** | Unique `.canvas.tsx` hot-reload | No competitor advertises live DAG canvas |
| **evals for orchestration** | None | `tech-leads-club@cursor-subagent-creator` (168) — creator, not runner |

**Where Apple Ultra wins:** `dag-task-runner` technical depth (parallel ranks, file-write safety, model tiers, streaming canvas). Hub documents Agent-Reach multi-channel research without duplicating upstream.

**Where Apple Ultra loses:** Every distribution query (`superpowers`, `mcp`, `vercel deploy`, `brainstorming`). obra/superpowers is the 800-lb gorilla for agent workflow habits.

---

## Recommended PRs

### PR 1 — skills.sh: surface `dag-task-runner` (P0)

**Action:** Ensure skill name + description match discovery queries:

```
Triggers: DAG, parallel agents, subagent orchestration, workflow orchestrator, fan out
```

**Verify after first installs:**
```bash
npx skills find "parallel agents"
npx skills find "DAG"
npx skills find "subagent orchestration"
```

**Positioning:** "Cursor-native DAG runner with live canvas" — differentiate from `cargo-orchestration` (531) and Airflow `dag-factory` (174).

### PR 2 — cursor/cookbook attribution + VoltAgent (P0)

**Title (VoltAgent):** `Add skill: Cookie-Cat21/apple-ultra-skills — dag-task-runner`

**Entry (Orchestration / Development):**
```markdown
- **[Cookie-Cat21/apple-ultra-skills@dag-task-runner](https://github.com/Cookie-Cat21/apple-ultra-skills)** - Parallel Cursor subagent DAG with live canvas
```

**Internal:** Add `dag-task-runner/ATTRIBUTION.md` crediting cursor/cookbook source (already in SKILL.md lineage).

### PR 3 — `ultra-research` thin skill wrapping Agent-Reach (P1, internal)

**Problem:** `terrylica/cc-skills@agent-reach` (159) is installable; Apple Ultra only has `references/agent-reach.md`.

**Scope:** New skill `ultra-research` (~80 lines):
- `agent-reach doctor` health gate
- Channel picker table (from existing reference)
- Handoff to `dag-task-runner` when research fans out to ≥3 parallel tracks

**Do not fork** Agent-Reach; `pip install agent-reach` + link upstream.

### PR 4 — Superpowers coexistence, not competition (P1, internal doc)

Add to `apple-hub` routing table:

| User intent | Route |
|-------------|-------|
| Brainstorm before build | External: `npx skills add obra/superpowers@brainstorming` |
| Plan then parallelize | `obra@writing-plans` → `dag-task-runner` |
| Debug production issue | `obra@systematic-debugging` |
| Ship review | `ultra-pr-ship-review` |

Apple Ultra should **compose with** superpowers (246K installs), not replicate brainstorming.

### PR 5 — MCP + Vercel pointer skills (P2, optional)

Thin pointer skills (or hub sections only):

| Skill | Delegates to | Market install |
|-------|--------------|----------------|
| `ultra-mcp-setup` | Cursor MCP docs + `anthropics@mcp-builder` patterns | 81.3K |
| `ultra-deploy` | `vercel-plugin@deployments-cicd` + `_shared/STACK.md` | 654 |

Only add if `npx skills find "apple ultra deploy"` fails after hub publish — avoid duplicating official Vercel plugin.

### PR 6 — `dag-task-runner` evals (P1, internal)

**Branch:** `feat/dag-evals`

| Scenario | Expected |
|----------|----------|
| Linear chain DAG submitted | Runner suggests restructure to diamond |
| Same-rank file-write conflict | Reject or serialize |
| 4+ read-only tasks | Single rank 1 with no edges |

---

## Scout verdict

Infrastructure story is **technically differentiated, commercially invisible**. `dag-task-runner` has no skills.sh peer with canvas + Cursor SDK execution; Agent-Reach is packaged elsewhere (159 installs). **P0:** index on skills.sh + VoltAgent orchestration category. **P1:** `ultra-research` wrapper + superpowers routing in hub. **Do not** build a superpowers clone — obra owns brainstorming (246K) and planning (160K); Apple Ultra owns parallel execution and ship gates.
