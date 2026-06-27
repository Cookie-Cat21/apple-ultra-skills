# SKILLS-SCOUT-04 — ultra-web-quality

**Date:** 2026-06-27  
**Target:** `ultra-web-quality`  
**Method:** `npx skills find` on skills.sh (live CLI output)  
**Pack:** apple-ultra-skills `/workspace`

---

## Queries run

```bash
npx skills find "web quality"
npx skills find "accessibility"
npx skills find "seo"
npx skills find "performance"
npx skills find "architecture"
npx skills find "improve codebase"
```

### Raw highlights

| Query | Top result | Installs |
|-------|------------|----------|
| web quality | `davila7/claude-code-templates@web-quality-audit` | 202 |
| web quality | `tech-leads-club/agent-skills@web-quality-audit` | 131 |
| accessibility | `addyosmani/web-quality-skills@accessibility` | 31.9K |
| seo | `coreyhaines31/marketingskills@seo-audit` | 147.1K |
| seo | `addyosmani/web-quality-skills@seo` | 29.1K |
| performance | `addyosmani/web-quality-skills@performance` | 19.5K |
| architecture | `mattpocock/skills@improve-codebase-architecture` | 331.3K |
| improve codebase | `akillness/oh-my-skills@improve-codebase-architecture` | 147 |

**Note:** `improve codebase` returns a single fork of mattpocock's architecture skill — not web-specific. `architecture` hits are codebase structure, not site IA (except `coreyhaines31/marketingskills@site-architecture` at 69.5K).

---

## Top 5 competitors

| Skill | Installs | Steal | Tier |
|-------|----------|-------|------|
| `addyosmani/web-quality-skills@accessibility` | 31.9K | Lane-specific WCAG checklists; split-skill install pattern | **S** |
| `addyosmani/web-quality-skills@seo` | 29.1K | Crawl/meta/structured-data lane prompts | **S** |
| `addyosmani/web-quality-skills@performance` | 19.5K | CWV-focused perf remediation order | **S** |
| `tech-leads-club/agent-skills@web-quality-audit` | 131 | Unified 4-lane audit + Lighthouse evidence gate (already cited in Ultra) | **A** |
| `ibelick/ui-skills@fixing-accessibility` | 13.8K | Actionable a11y fix recipes tied to UI components | **A** |

**Runner-up (unified audit):** `davila7/claude-code-templates@web-quality-audit` (202) — same lineage as tech-leads-club, thinner distribution.

**Runner-up (SEO depth):** `coreyhaines31/marketingskills@seo-audit` (147.1K) — marketing SEO, not technical CWV bundle; overlaps Lane 3 only.

---

## Gaps — Ultra wins

| Advantage | Evidence |
|-----------|----------|
| **Single orchestrated gate** | One skill scores Performance (35%) + A11y (30%) + SEO (20%) + Best practices (15%) with SHIP/ITERATE/REJECT — addyosmani splits into 3+ installable skills |
| **Stack-scoped commands** | Reads `_shared/STACK.md`, runs `lint-design-rules.mjs`, pairs with `apple-design-head` chain |
| **Weighted P0–P3 + 0–100** | Competitors use rule lists or fix recipes; Ultra ties severity to ship gate thresholds |
| **Best-practices lane** | HTTPS, headers, CVE scan — not covered by addyosmani lane skills |
| **Product chain** | `ultra-visual-system` → `ultra-web-quality` → `apple-design-head` → `ultra-pr-ship-review` documented in metadata |

## Gaps — Ultra loses

| Gap | Leader | Impact |
|-----|--------|--------|
| **skills.sh distribution** | addyosmani pack: ~80K combined lane installs | Ultra not indexed; zero install telemetry |
| **Lane depth per topic** | `ibelick/ui-skills@fixing-accessibility` (13.8K) | Ultra a11y lane is checklist-sized; competitors ship fix playbooks |
| **Marketing SEO breadth** | `coreyhaines31/marketingskills@seo-audit` (147.1K) | Ultra Lane 3 is technical crawl/meta; no backlink/programmatic SEO |
| **Motion perf** | `ibelick/ui-skills@fixing-motion-performance` (17.6K) | Ultra mentions INP but no animation-specific guidance |
| **evals.json** | — (community-wide gap) | Ultra has evals on design/security/pr-ship but not web-quality |
| **Live guideline fetch** | Vercel `web-design-guidelines` pattern (via agent-skills) | Ultra uses static checklists |

---

## Recommended PR

**Title:** `feat(ultra-web-quality): lane references + evals + skills.sh publish prep`

### Scope (single PR, ~3 files)

1. **`ultra-web-quality/references/`** — split lane detail out of SKILL.md (keep body <500 lines):
   - `LANE-PERFORMANCE.md` — steal CWV fix order from `addyosmani/web-quality-skills@performance`
   - `LANE-A11Y.md` — steal component fix patterns from `ibelick/ui-skills@fixing-accessibility`
   - `LANE-SEO.md` — technical checks from Ultra + indexable-page guardrails from `addyosmani/web-quality-skills@seo`
   - `LANE-BEST-PRACTICES.md` — headers, mixed content, CVE (`npm audit` snippet)

2. **`ultra-web-quality/evals/evals.json`** — 3 fixtures:
   - Marketing page with missing alt + slow LCP → REJECT
   - Dashboard route (noindex) → SEO lane N/A, a11y P1 only
   - Post-fix re-audit → SHIP ≥85

3. **`scripts/submit-to-registries.md`** — add `npx skills add <owner>/apple-ultra-skills@ultra-web-quality` install line once repo is public.

### Acceptance criteria

- [ ] SKILL.md links to `references/` lanes; main file ≤400 lines
- [ ] Round 0 explicitly cites Lighthouse JSON fields (LCP, INP, CLS)
- [ ] Chain callout to `apple-design-head` only after technical SHIP
- [ ] evals.json passes `validate-skills.py`

### Out of scope (v1.3)

- Marketing SEO depth (`coreyhaines31/marketingskills`) — belongs in `ultra-head-of-growth` / content skills
- Motion perf sub-skill — optional `references/MOTION-PERF.md` follow-up
