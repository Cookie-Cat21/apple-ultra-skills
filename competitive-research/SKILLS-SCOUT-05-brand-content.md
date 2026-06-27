# SKILLS-SCOUT-05 — ultra-brand-voice · ultra-content-review

**Date:** 2026-06-27  
**Targets:** `ultra-brand-voice`, `ultra-content-review`  
**Method:** `npx skills find` on skills.sh (live CLI output)  
**Pack:** apple-ultra-skills `/workspace`

---

## Queries run

```bash
npx skills find "copywriting"
npx skills find "marketing"
npx skills find "seo"
```

### Raw highlights

| Query | Top result | Installs |
|-------|------------|----------|
| copywriting | `coreyhaines31/marketingskills@copywriting` | 137.1K |
| marketing | `coreyhaines31/marketingskills@seo-audit` | 147.1K |
| marketing | `coreyhaines31/marketingskills@copywriting` | 137.1K |
| marketing | `coreyhaines31/marketingskills@marketing-psychology` | 101.1K |
| marketing | `coreyhaines31/marketingskills@content-strategy` | 96.5K |
| seo | `coreyhaines31/marketingskills@seo-audit` | 147.1K |
| seo | `coreyhaines31/marketingskills@programmatic-seo` | 93K |
| seo | `addyosmani/web-quality-skills@seo` | 29.1K |
| copywriting | `samber/cc-skills@copywriting-tone-of-voice-creator` | 1.9K |

**Dominant competitor pack:** `coreyhaines31/marketingskills` — 6 of top 6 marketing/seo/copy hits.

---

## Top 5 competitors

| Skill | Installs | Steal | Tier |
|-------|----------|-------|------|
| `coreyhaines31/marketingskills@copywriting` | 137.1K | Hook formulas, CTA patterns, headline frameworks | **S** |
| `coreyhaines31/marketingskills@seo-audit` | 147.1K | On-page SEO audit structure for indexable marketing pages | **S** |
| `coreyhaines31/marketingskills@content-strategy` | 96.5K | Channel matrix, content pillars, editorial calendar | **A** |
| `coreyhaines31/marketingskills@marketing-psychology` | 101.1K | Persuasion principles (social proof, loss aversion) for copy | **A** |
| `samber/cc-skills@copywriting-tone-of-voice-creator` | 1.9K | Tone-of-voice worksheet generator | **B** |

**Runner-up:** `coreyhaines31/marketingskills@programmatic-seo` (93K) — out of scope for brand-voice; route to `ultra-head-of-growth`.

**Runner-up (technical SEO):** `addyosmani/web-quality-skills@seo` (29.1K) — overlaps `ultra-web-quality` Lane 3, not copy.

---

## Gaps — Ultra wins

| Advantage | `ultra-brand-voice` | `ultra-content-review` |
|-----------|---------------------|------------------------|
| **Product-shaped context** | Reads `_shared/BRAND.md`, `PRODUCT.md`, `COMPETITORS.md` — competitors are generic SaaS | Same shared pack + channel-specific rounds |
| **Scored ship gate** | 0–100 + P0–P2 + SHIP/ITERATE/REJECT | Full + Channel + Campaign + Calendar modes |
| **Banned phrases / positioning** | Explicit anti-AI-hype, local-market grounding | Cross-channel consistency checks |
| **Implement mode** | Applies approved rewrites in repo (`marketing-copy.ts`, marketing routes) | Editorial fixes without generic "write me a blog" |
| **Chain clarity** | brand-voice upstream of content-review | Documents when to defer to `ultra-head-of-growth` |
| **In-app vs external** | Focused on product surfaces + GTM docs | Social, email, blog, docs — channel fit |

## Gaps — Ultra loses

| Gap | Leader | Impact |
|-----|--------|--------|
| **Install volume / discovery** | marketingskills pack: **~680K** combined top-skill installs | Ultra brand/content skills not on skills.sh |
| **Copy frameworks library** | `marketingskills@copywriting` (137.1K) | Ultra has rounds but no PAS/AIDA/4U quick-reference |
| **SEO marketing depth** | `seo-audit` + `programmatic-seo` (240K+) | `ultra-content-review` doesn't audit keyword strategy or SERP intent |
| **Psychology hooks** | `marketing-psychology` (101.1K) | Ultra voice rules are defensive (banned phrases) not persuasive craft |
| **Tone worksheet** | `copywriting-tone-of-voice-creator` (1.9K) | Ultra assumes BRAND.md exists; no onboarding generator |
| **evals.json** | — | Neither brand-voice nor content-review have regression fixtures |

---

## Recommended PR

**Title:** `feat(brand-content): reference playbooks + cross-skill SEO routing + evals`

### Scope (single PR)

1. **`ultra-brand-voice/references/COPY-FRAMES.md`** — steal (don't vendor) from `marketingskills@copywriting`:
   - Headline patterns (outcome + audience + objection)
   - CTA ladder (primary / secondary / micro)
   - 10-line "banned → replacement" quick lookup

2. **`ultra-content-review/references/CHANNEL-GUIDE.md`** — steal from `content-strategy`:
   - IG / email / blog / docs length + tone matrix
   - Campaign consistency checklist (one story, three surfaces)

3. **`ultra-brand-voice/references/SEO-ROUTING.md`** — explicit handoff table:
   | User ask | Route to |
   |----------|----------|
   | Meta titles, crawl, JSON-LD | `ultra-web-quality` Lane 3 |
   | Keyword strategy, backlinks, programmatic pages | `ultra-head-of-growth` |
   | Hero copy, CTAs, voice | `ultra-brand-voice` |
   | IG caption, email drip, blog draft | `ultra-content-review` |

4. **`ultra-brand-voice/evals/evals.json`** + **`ultra-content-review/evals/evals.json`** — 2 fixtures each:
   - P0 banned phrase in hero → REJECT
   - Cross-channel mismatch (landing promises X, email says Y) → ITERATE
   - Clean local-service copy → SHIP ≥85

5. **Description bump** on both skills — add triggers stolen from marketingskills search terms: `landing page copy`, `email campaign`, `content calendar`, `tone of voice`, `marketing copy audit`.

### Acceptance criteria

- [ ] SKILL.md files ≤450 lines; frameworks live in `references/`
- [ ] `ultra-content-review` prerequisites link `SEO-ROUTING.md`
- [ ] No duplication of `ultra-web-quality` technical SEO checks
- [ ] evals pass `validate-skills.py`

### Out of scope

- Full marketingskills port (678K-install scope creep)
- Programmatic SEO templates → `ultra-head-of-growth` backlog
