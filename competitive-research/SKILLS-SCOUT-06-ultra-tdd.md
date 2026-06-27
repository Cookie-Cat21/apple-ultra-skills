# SKILLS-SCOUT-06 — ultra-tdd

**Date:** 2026-06-27  
**Target:** `ultra-tdd`  
**Method:** `npx skills find` on skills.sh (live CLI output)  
**Pack:** apple-ultra-skills `/workspace`

---

## Queries run

```bash
npx skills find "test-driven"
npx skills find "playwright"
npx skills find "TDD"
```

### Raw highlights

| Query | Top result | Installs |
|-------|------------|----------|
| test-driven | `obra/superpowers@test-driven-development` | 143.4K |
| TDD | `mattpocock/skills@tdd` | 312.8K |
| playwright | `microsoft/playwright-cli@playwright-cli` | 68.2K |
| playwright | `currents-dev/playwright-best-practices-skill@playwright-best-practices` | 54.8K |
| playwright | `github/awesome-copilot@playwright-generate-test` | 13.8K |
| test-driven | `addyosmani/agent-skills@test-driven-development` | 6.5K |
| TDD | `affaan-m/everything-claude-code@tdd-workflow` | 6.6K |

**Note:** `mattpocock/skills@tdd` (312.8K) is the community default for TDD keyword; `obra/superpowers@test-driven-development` (143.4K) is what Ultra already cites as upstream.

---

## Top 5 competitors

| Skill | Installs | Steal | Tier |
|-------|----------|-------|------|
| `mattpocock/skills@tdd` | 312.8K | Concise red-green loop; "smallest possible test" discipline | **S** |
| `obra/superpowers@test-driven-development` | 143.4K | Iron law, delete-code-if-test-after-impl, excuse table (already partially adopted) | **S** |
| `microsoft/playwright-cli@playwright-cli` | 68.2K | CLI-driven E2E exploration + codegen workflow | **A** |
| `currents-dev/playwright-best-practices-skill@playwright-best-practices` | 54.8K | Locator strategy, flake avoidance, parallel CI patterns | **A** |
| `github/awesome-copilot@playwright-generate-test` | 13.8K | Generate test from user flow description | **B** |

**Runner-up:** `affaan-m/everything-claude-code@tdd-workflow` (6.6K) — framework-specific TDD (Spring/Django/Laravel); Ultra already scopes via `STACK.md`.

---

## Gaps — Ultra wins

| Advantage | Evidence |
|-----------|----------|
| **Stack-scoped boundaries** | Integration vs unit decision tree tied to `_shared/STACK.md` (API routes, webhooks, cron, plan gating) |
| **Domain coverage gates** | Table for 402 entitlement, webhook idempotency, payment replay — competitors are generic |
| **PR chain** | `downstream: [ultra-pr-ship-review]` with B-001 verify gate |
| **Product test types** | RTL for components, test DB for integrations, raw-body webhook tests |
| **Excuse table** | 10-row "common excuses" with stack-specific counters |
| **Auth test routing** | Points to `ultra-api-auth`, `ultra-plan-gating`, `ultra-payments` |

## Gaps — Ultra loses

| Gap | Leader | Impact |
|-----|--------|--------|
| **Community TDD adoption** | mattpocock `tdd` (312.8K) + superpowers (143.4K) ≈ **456K** installs | Ultra not published on skills.sh |
| **E2E / Playwright lane** | playwright-cli (68.2K) + best-practices (54.8K) | Ultra mentions RTL; no Playwright section or `references/E2E.md` |
| **Subagent TDD workflow** | superpowers `subagent-driven-development` ecosystem | Ultra is single-agent procedural |
| **Test generation** | `playwright-generate-test` (13.8K) | No "explore site → emit spec" mode |
| **TDD-for-skills meta** | superpowers `writing-skills` | Ultra pack evolution lacks skill eval TDD |
| **evals.json** | — | `ultra-tdd` has no regression fixtures |
| **Framework cookbooks** | everything-claude-code Spring/Django/Laravel TDD | Acceptable loss — Ultra is Next.js/product shaped |

---

## Recommended PR

**Title:** `feat(ultra-tdd): playwright E2E reference + coverage evals + superpowers parity`

### Scope (single PR)

1. **`ultra-tdd/references/E2E-PLAYWRIGHT.md`** — synthesize from top Playwright skills:
   - When E2E vs RTL vs integration (booking flow, payment redirect, public booking page)
   - Locator rules from `playwright-best-practices` (role > testid > CSS)
   - CI snippet: `npx playwright test --shard` aligned to `STACK.md`
   - Link to `microsoft/playwright-cli` for exploratory codegen (optional tool, not required dep)

2. **`ultra-tdd/references/RED-GREEN-EXAMPLES.md`** — 3 stack examples:
   - API route: 401 without auth
   - Webhook: duplicate event idempotency
   - Component: slot picker disabled state

3. **`ultra-tdd/evals/evals.json`** — 3 fixtures:
   - Agent writes impl before test → must REJECT workflow
   - Bug fix without regression test → ITERATE
   - Correct red-green + `npm run verify` → SHIP

4. **SKILL.md additions** (≤30 lines):
   - E2E decision row in integration table
   - Trigger phrases: `playwright`, `e2e test`, `end to end`, `browser test`
   - Explicit credit + diff vs `obra/superpowers@test-driven-development`

5. **`registry/skills.json`** — add `chains.playwright` optional tag for hub routing.

### Acceptance criteria

- [ ] Playwright guidance is advisory; unit/integration remain default per decision tree
- [ ] No new npm dependency required in consumer projects
- [ ] evals enforce "test must fail first" rule
- [ ] `validate-skills.py` passes

### Out of scope

- Bundling Playwright MCP / CLI as hard dependency
- Porting superpowers full subagent-driven-development (separate PR: `ultra-pr-ship-review` parallel lenses)
