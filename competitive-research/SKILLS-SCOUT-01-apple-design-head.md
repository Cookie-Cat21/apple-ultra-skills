# SKILLS-SCOUT: apple-design-head

**Date:** 2026-06-27  
**Repo:** Cookie-Cat21/apple-ultra-skills  
**Queries run:**
```bash
npx skills find "design" 2>/dev/null | head -15
npx skills find "frontend design" 2>/dev/null | head -10
```

## Ultra skill target

`apple-design-head` — Head of Apple Design UI/UX ship review: 5-round weighted protocol (Purpose, Wayfinding, Agency, Craft, Flexibility), P0–P3 findings, 0–100 score, SHIP/ITERATE/REJECT gate, AI slop pre-gate, 160 RULES.md violations, `.ultra.md` context, modes (full / quick scan / a11y deep / handoff).

Chains: upstream `ultra-component-discovery`, `ultra-visual-system` → downstream `ultra-pr-ship-review`.

## Top 5 skills.sh matches

Ranked by installs across both queries (deduplicated).

| Skill | Installs | Steal | Tier |
|-------|----------|-------|------|
| `anthropics/skills@frontend-design` | 597.2K | Anti-generic-aesthetic rules, composition, distinctive typography — already cited in root SKILL.md Section 2 | S |
| `vercel-labs/agent-skills@web-design-guidelines` | 419.6K | Live guideline fetch for web surfaces; add to `references/LOOKUP.md` web row | S |
| `sleekdotdesign/agent-skills@sleek-design-mobile-apps` | 285.6K | Mobile-native craft checks for `apple-design-head` product-type lens | C |
| `leonxlnx/taste-skill@design-taste-frontend` | 190.5K | “Taste” / anti-slop heuristics — reinforce Round 0 slop gate + RULES.md ai-slop category | S |
| `bytedance/deer-flow@frontend-design` | 2.5K | Secondary frontend-design fork — scan for unique checklist items only | B |

**Raw CLI — `design` (4 hits in head -15):**
```
anthropics/skills@frontend-design                    597.2K installs
vercel-labs/agent-skills@web-design-guidelines       419.6K installs
sleekdotdesign/agent-skills@sleek-design-mobile-apps 285.6K installs
leonxlnx/taste-skill@design-taste-frontend           190.5K installs
```

**Raw CLI — `frontend design` (3 hits in head -10):**
```
bytedance/deer-flow@frontend-design                           2.5K installs
udecode/plate@frontend-design-frontend-design                 23 installs
acaprino/alfio-claude-plugins@frontend-design                 22 installs
```

## Gaps Ultra wins

- **Ship gate with teeth** — SHIP/ITERATE/REJECT + weighted rounds + minimum grade per round; registry skills are generation guides, not scored Monday-review audits.
- **Deterministic rule ledger** — 160 `RULES.md` IDs with grep-backed token scans; competitors rely on prose prompts.
- **AI slop disqualifier** — Pre-Round 0 CRISP-style tells cap grade before craft scoring; `frontend-design` (597K) encourages beauty without slop enforcement.
- **Multi-mode review** — Quick scan, a11y deep, handoff spec, component-focused; Vercel guidelines are checklist-only.
- **Project memory** — `.ultra.md` History append + regression detection; no skills.sh design skill ships onboarding file schema.
- **Measurable standards** — 44px touch, 17px body mobile, ≤1 CTA/viewport — numeric, not vague.

## Gaps Ultra loses

- **Install volume / default behavior** — `frontend-design` at 597K is the de facto agent aesthetic; Apple Ultra is unknown on skills.sh for query `"design"`.
- **Live guidelines** — Vercel `web-design-guidelines` fetches current rules; Ultra references are static unless Agent-Reach is invoked manually.
- **Mobile depth** — `sleek-design-mobile-apps` (286K) likely exceeds Ultra’s mobile-native section in `DISCOVERY.md` for SwiftUI/Flutter.
- **Taste branding** — `design-taste-frontend` (191K) owns the “taste” keyword; Ultra slop gate is powerful but not marketed as taste skill.
- **No skills.sh listing** — `apple-design-head` does not appear in top design searches.

## Recommended PR

**Title:** `feat(design-head): synthesize top skills.sh design leaders + live web guidelines`

1. **Tier S → `references/design.md`** — Diff `anthropics/skills@frontend-design` and `leonxlnx/taste-skill@design-taste-frontend`; merge net-new anti-slop + hierarchy rules into design reference (max 15 rules, cite source in comment).
2. **Tier S → `apple-design-head/references/LOOKUP.md`** — Add row: `web marketing page` → fetch `vercel-labs/agent-skills@web-design-guidelines` via Agent-Reach before Round 3.
3. **Tier C → mobile lens** — In `DISCOVERY.md`, add SwiftUI/Flutter subsection borrowing checklist structure from `sleek-design-mobile-apps` (link, do not copy verbatim).
4. **Registry submit** — `Cookie-Cat21/apple-ultra-skills@apple-design-head` with description triggers: `ship-ready`, `design critique`, `UX audit`, `Apple polish`, `grade the UI`, `accessibility audit`.
5. **evals** — Add eval fixture: “purple gradient KPI dashboard” → expect slop gate FAIL + ITERATE (validates synthesis vs raw frontend-design output).

**Non-goals:** Do not bundle-install 597K frontend-design as dependency — synthesize into references only (Tier S).
