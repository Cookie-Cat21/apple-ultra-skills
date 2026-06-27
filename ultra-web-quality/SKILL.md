---
name: ultra-web-quality
description: >
  Web quality audit across performance, accessibility, SEO, and best practices.
  Use when user says audit my site, lighthouse, core web vitals, page speed, SEO
  check, web quality, CWV, INP, LCP, CLS, or before shipping public pages.
  Orchestrates apple-design-head for visual craft. Triggers: web quality audit,
  lighthouse audit, performance audit, SEO review, CWV check.
metadata:
  pack: apple-ultra
  version: "1.0"
reads:
  - .ultra.md
  - ../_shared/STACK.md
chains:
  upstream: [ultra-visual-system]
  downstream: [apple-design-head, ultra-pr-ship-review]
---

# Ultra Web Quality — Performance · A11y · SEO · Best Practices

You are the **web quality engineer** for this product. Run a scored audit across four lanes before public pages ship. Synthesizes **addyosmani/web-quality-skills** lane depth + tech-leads-club `web-quality-audit` orchestration, scoped to this stack.

**Output:** 0–100 score per lane · P0–P3 findings · SHIP / ITERATE / REJECT per lane and overall.

**Lane specialists (synthesized from addyosmani — do not duplicate install if using Ultra):**

| Lane | addyosmani source | Ultra adds |
|------|-------------------|------------|
| A11y | `web-quality-skills@accessibility` (32K) | RULES.md cross-ref, lint-design-rules.mjs CI |
| SEO | `web-quality-skills@seo` (29K) | Product route awareness, booking page patterns |
| Perf | CWV best practices | STACK.md build commands, bundle paths |
| Best practices | Security headers + deps | ultra-security-review handoff |

---

## When to use

- "Audit my site", "run lighthouse", "check page quality"
- Pre-launch on marketing pages, booking flows, dashboards
- Regression after perf/a11y/SEO changes
- User reports slow LCP, layout shift, or poor search visibility

**When NOT to use:**

- Pure visual craft / Apple polish → **apple-design-head**
- Copy/brand only → **ultra-brand-voice**
- Security/auth → **ultra-security-review**

---

## Audit lanes (weighted)

| Lane | Weight | Focus |
|------|--------|-------|
| Performance | 35% | LCP <2.5s · INP <200ms · CLS <0.1 · bundle · images · fonts |
| Accessibility | 30% | WCAG 2.2 AA · keyboard · contrast · labels · focus |
| SEO | 20% | Crawl · meta · headings · structured data · mobile |
| Best practices | 15% | HTTPS · security headers · console errors · deprecated APIs |

Run `node scripts/lint-design-rules.mjs --path src/` when available — merge Critical/High hits as P0/P1.

---

## Round 0 — Baseline metrics

Collect evidence (don't guess):

```bash
# From project root — adapt to STACK.md
npm run build 2>&1 | tail -20
npx lighthouse <url> --only-categories=performance,accessibility,best-practices,seo --output=json --quiet 2>/dev/null || true
node scripts/lint-design-rules.mjs --path src/ --warn-only 2>/dev/null || true
```

Record: LCP, INP, CLS, Lighthouse scores, lint rule IDs.

---

## Lane 1 — Performance (35%)

| ID | Check | P0 if |
|----|-------|-------|
| P1 | LCP element identified and optimized | LCP >4s on 4G |
| P2 | Images: WebP/AVIF, srcset, explicit dimensions | CLS from images |
| P3 | JS: code-split, defer non-critical | Main thread >3s |
| P4 | Fonts: font-display swap, subset, preload critical | FOIT blocks LCP |
| P5 | Third-party scripts audited | Tag managers block render |

**Fix order:** LCP asset → CLS dimensions → INP long tasks → bundle trim.

---

## Lane 2 — Accessibility (30%)

**Detection stack:** axe-core (DevTools or CI), Lighthouse accessibility category, `lint-design-rules.mjs` RULE-061–080.

| ID | Check | axe / tool | P0 if |
|----|-------|------------|-------|
| A1 | All images have alt | `image-alt` | Informative img missing alt |
| A2 | Color contrast ≥4.5:1 (text) | `color-contrast` | Fails WCAG AA |
| A3 | Keyboard: all actions reachable | manual tab + `button-name` | div-onClick without button |
| A4 | Focus visible on interactives | `focus-order-semantics` | outline:none globally |
| A5 | Forms: labels linked, errors associated | `label`, `aria-describedby` | placeholder-only labels |
| A6 | lang on html, logical heading order | `html-has-lang`, heading audit | Skipped h-levels |
| A7 | Touch targets ≥44×44px | `target-size` (WCAG 2.5.5) | Mobile tap failures |
| A8 | Reduced motion respected | CSS `@media (prefers-reduced-motion)` | Animation >200ms without reduced variant |

Cross-check **apple-design-head/RULES.md** RULE-061–080. For component fixes after audit → chain `ibelick/ui-skills@fixing-accessibility` (14K).

---

## Lane 3 — SEO (20%)

**Synthesized from addyosmani/web-quality-skills@seo** — technical SEO only; copy/positioning → `ultra-brand-voice`.

| ID | Check | Detection | P0 if |
|----|-------|-----------|-------|
| S1 | Unique title + meta description per page | Lighthouse SEO, view-source | Duplicate/missing on indexable pages |
| S2 | Single h1, logical hierarchy | Heading audit | Multiple h1 or empty h1 |
| S3 | robots.txt + sitemap valid | Fetch `/robots.txt`, `/sitemap.xml` | Important paths blocked |
| S4 | Canonical URLs | `<link rel="canonical">` | Duplicate content risk |
| S5 | JSON-LD where applicable | Rich Results Test | Rich result opportunity missed on key pages |
| S6 | Open Graph + Twitter cards | Meta tag scan | Social share preview broken |
| S7 | Core Web Vitals as ranking signal | Lighthouse perf + CWV field data | LCP >4s on landing pages |

---

## Lane 4 — Best practices (15%)

| ID | Check | P0 if |
|----|-------|-------|
| B1 | HTTPS everywhere | Mixed content on auth/payment |
| B2 | No console errors on critical paths | Uncaught exceptions in prod build |
| B3 | Security headers (CSP, HSTS where applicable) | Missing on public surfaces |
| B4 | Dependencies: no critical CVEs | Known critical in prod bundle |

---

## Ship gate

| Verdict | Criteria |
|---------|----------|
| **SHIP** | Overall ≥85 · 0 P0 · ≤2 P1 per lane |
| **ITERATE** | 70–84 or P1s need fixes |
| **REJECT** | Any P0 open or score <70 |

Chain to **apple-design-head** for visual craft after technical SHIP.

---

## Output template

```markdown
## Ultra Web Quality — [URL / surface]
**Overall:** __/100 · **Verdict:** SHIP | ITERATE | REJECT

| Lane | Score | P0 | P1 |
|------|-------|----|----|
| Performance | | | |
| Accessibility | | | |
| SEO | | | |
| Best practices | | | |

### Lint hits (lint-design-rules.mjs)
- RULE-XXX — file — fix

### Top 3 fixes (by impact)
1. ...
```

---

## Common excuses

| Common excuse | Why it's wrong | What to do instead |
|---------------|----------------|-------------------|
| "Lighthouse is just a suggestion" | CWV affects ranking and conversion | Fix P0 metrics before ship |
| "We'll optimize after launch" | First impressions and SEO index on launch content | LCP/CLS fixes in same PR as page |
| "A11y is a nice-to-have" | Legal risk + 15%+ users excluded | Fix Critical RULE hits in CI |
| "SEO doesn't matter for SaaS" | Booking pages and docs are indexable | Title, meta, structured data on public routes |
| "Third-party scripts are required" | They dominate LCP/INP | Defer, async, or self-host |
| "Mobile perf is different team" | Same codebase, same components | Test 4G throttled on real flows |
| "Scores are fine on my Mac" | Users on mid Android on 4G | Test median device profile |
| "Design review covers a11y" | apple-design-head is craft; this is measurable CWV/SEO | Run both gates |

---

## Red flags

- No Lighthouse or build output cited in audit
- "Looks fast to me" without LCP/INP numbers
- Skipping lint-design-rules.mjs on UI PRs
- SEO audit on app-only routes that should be noindex

---

## Verification

- [ ] Lighthouse or equivalent run on target URL(s)
- [ ] `lint-design-rules.mjs` run on changed UI paths
- [ ] P0 list empty or explicitly accepted by owner
- [ ] apple-design-head scheduled if public marketing surface

---

## Related skills

| Skill | When |
|-------|------|
| apple-design-head | Visual craft after technical pass |
| ultra-visual-system | Token-level contrast fixes |
| ultra-pr-ship-review | Merge gate for full stack PR |
| ultra-tdd | Perf regression tests (bundle size, route tests) |

## skills.sh companions (tier C)

| Companion | Installs | When |
|-----------|----------|------|
| `addyosmani/web-quality-skills@accessibility` | 32K | Lane depth — synthesized above |
| `addyosmani/web-quality-skills@seo` | 29K | Lane depth — synthesized above |
| `ibelick/ui-skills@fixing-accessibility` | 14K | Post-audit component fixes |

```bash
# Only if user wants standalone lane skill alongside Ultra
npx skills add addyosmani/web-quality-skills@accessibility -y
```

See [registry/companions.json](../registry/companions.json) · scout: [SKILLS-SCOUT-04](../competitive-research/SKILLS-SCOUT-04-ultra-web-quality.md)
