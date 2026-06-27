# SKILLS-SCOUT-09 — ultra-pr-ship-review vs skills.sh

**Date:** 2026-06-27  
**Pack:** apple-ultra-skills (`ultra-pr-ship-review`)  
**Method:** `npx skills find` on skills.sh (install counts from CLI output)

## Queries run

```bash
npx skills find "code review"
npx skills find "PR review"
npx skills find "ship review"
npx skills find "react best practices"
npx skills find typescript   # typescript-react-reviewer crossover
```

---

## Top 5 — code review (`npx skills find "code review"`)

| Rank | Skill | Installs | URL |
|------|-------|----------|-----|
| 1 | `google-gemini/gemini-cli@code-reviewer` | 7.8K | https://skills.sh/google-gemini/gemini-cli/code-reviewer |
| 2 | `alinaqi/claude-bootstrap@code-review` | 1.2K | https://skills.sh/alinaqi/claude-bootstrap/code-review |
| 3 | `lgbarn/devops-skills@subagent-driven-development` | 23 | https://skills.sh/lgbarn/devops-skills/subagent-driven-development |

*Note: only 3 results returned by CLI for this query.*

## Top 5 — PR review (`npx skills find "PR review"`)

| Rank | Skill | Installs | URL |
|------|-------|----------|-----|
| 1 | `agynio/gh-pr-review@gh-pr-review` | 271 | https://skills.sh/agynio/gh-pr-review/gh-pr-review |
| 2 | `jellydn/my-ai-tools@pr-review` | 36 | https://skills.sh/jellydn/my-ai-tools/pr-review |

*Note: only 2 results returned by CLI for this query.*

## Top 5 — ship review (`npx skills find "ship review"`)

| Rank | Skill | Installs | URL |
|------|-------|----------|-----|
| 1 | `cursor/plugins@review-and-ship` | 524 | https://skills.sh/cursor/plugins/review-and-ship |
| 2 | `terrylica/cc-skills@pre-ship-review` | 108 | https://skills.sh/terrylica/cc-skills/pre-ship-review |

## Top 5 — react best practices (`npx skills find "react best practices"`)

| Rank | Skill | Installs | URL |
|------|-------|----------|-----|
| 1 | `akillness/oh-my-skills@vercel-react-best-practices` | 383 | https://skills.sh/akillness/oh-my-skills/vercel-react-best-practices |
| 2 | `somnio-software/somnio-ai-tools@react-best-practices` | 71 | https://skills.sh/somnio-software/somnio-ai-tools/react-best-practices |
| 3 | `lgariv-dn/frontend-skills@react-best-practices` | 47 | https://skills.sh/lgariv-dn/frontend-skills/react-best-practices |
| 4 | `majiayu000/claude-arsenal@react-best-practices` | 42 | https://skills.sh/majiayu000/claude-arsenal/react-best-practices |
| 5 | `wojons/skills@react-review` | 30 | https://skills.sh/wojons/skills/react-review |

## Top 5 — composite PR/ship leaderboard (merged queries)

| Rank | Skill | Installs | Primary query |
|------|-------|----------|---------------|
| 1 | `google-gemini/gemini-cli@code-reviewer` | 7.8K | code review |
| 2 | `cursor/plugins@review-and-ship` | 524 | ship review |
| 3 | `akillness/oh-my-skills@vercel-react-best-practices` | 383 | react best practices |
| 4 | `agynio/gh-pr-review@gh-pr-review` | 271 | PR review |
| 5 | `alinaqi/claude-bootstrap@code-review` | 1.2K | code review |

---

## Gaps — ultra-pr-ship-review vs skills.sh leaders

| Dimension | skills.sh leaders | ultra-pr-ship-review today | Gap |
|-----------|-------------------|----------------------------|-----|
| **Install base** | gemini code-reviewer 7.8K; cursor review-and-ship 524 | Not on skills.sh | Category exists but leaders are thin; opportunity to own "product PR gate" niche |
| **GitHub PR integration** | `agynio/gh-pr-review` — gh CLI native | `review-package.sh` + subagent prompt only | No `gh pr diff` / comment posting workflow |
| **React/Next depth** | vercel-react-best-practices 383 | Parallel `apple-design-head` for UI | No React-specific blocker IDs (hooks deps, RSC boundaries, client/server split) |
| **Generic code review** | gemini reviewer — broad language coverage | Repo-convention checklist (verify, migrations, auth) | Ahead on **enforcement**; behind on **language-agnostic** review |
| **Ship semantics** | cursor `review-and-ship` — lightweight | SHIP/FIX/REJECT + B-*/W-* blocker catalog + `.ultra-ship.md` artifacts | Ahead on audit trail and blocker taxonomy |
| **TDD coupling** | lgbarn subagent-driven-development 23 installs | `ultra-tdd` exists but not in `chains.downstream` | Beyoncé Rule cited; no hard chain to TDD skill |
| **Distribution keywords** | "code review", "PR review" sparse on skills.sh | Rich triggers in description | Publish under multiple search terms |

**Net:** ultra-pr-ship-review is **deeper than anything on skills.sh for product engineering gates** (verify, migrations, plan gates, booking invariants). Gaps are **GitHub-native PR workflow**, **React/RSC checklist**, and **skills.sh presence**.

---

## Recommended PR

**Title:** `feat(ultra-pr-ship-review): react-rsc blockers + gh workflow + skills.sh publish`

### Scope

1. **Add React/RSC warning blockers (W-020–W-025)** in `references/blockers.md`, informed by `akillness/oh-my-skills@vercel-react-best-practices`:
   - `"use client"` only where needed
   - Server Actions vs route handlers for mutations
   - No secrets in client bundles
   - Suspense boundaries on booking data fetches

2. **`chains.downstream: [ultra-tdd]`** in SKILL.md metadata — when FIX verdict cites missing tests (Beyoncé Rule), auto-suggest `ultra-tdd` before re-check.

3. **`scripts/gh-pr-review.sh`** (optional thin wrapper):
   ```bash
   gh pr diff "$PR" > /tmp/pr.diff
   ./ultra-pr-ship-review/scripts/review-package.sh "$(gh pr view "$PR" --json baseRefOid -q .baseRefOid)" "$(gh pr view "$PR" --json headRefOid -q .headRefOid)"
   ```
   Competes with `agynio/gh-pr-review@gh-pr-review` (271 installs) without forking their skill.

4. **skills.sh listing** — Submit with keywords: `PR review`, `code review`, `ship review`, `pre-merge`, `npm run verify`, `react best practices`. Target bundle: `review-gate` (`ultra-pr-ship-review` + `ultra-security-review` + `ultra-tdd`).

5. **Eval expansion** — Add eval case: "PR touches `src/components/booking/` without hold test" → FIX with B-*/W-* IDs.

### Success metrics

- 3 new eval cases in `evals/evals.json` (all must fail without skill)
- Documented gh workflow in SKILL.md Phase 0
- skills.sh install counter baseline (week 1)

### Out of scope

- Replacing `apple-design-head` visual review
- Building a full GitHub App (wrapper script only)
