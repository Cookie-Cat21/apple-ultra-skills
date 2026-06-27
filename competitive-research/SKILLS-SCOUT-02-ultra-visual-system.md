# SKILLS-SCOUT: ultra-visual-system

**Date:** 2026-06-27  
**Repo:** Cookie-Cat21/apple-ultra-skills  
**Queries run:**
```bash
npx skills find "visual design" 2>/dev/null | head -10
npx skills find "tailwind design system" 2>/dev/null | head -10
```

## Ultra skill target

`ultra-visual-system` — Visual design lead for **token audits**: cobalt/violet/amber/emerald palette, typography (Cal Sans + Inter), dark mode hierarchy, booking-hub craft, logo rules, `TOKENS.md` grep suite, 5-round protocol with SHIP gate. Hands off full UI ship to `apple-design-head`.

Reads `_shared/VISUAL.md`, `TOKENS.md`; scoped to design tokens — not interaction completeness or a11y deep dive.

## Top 5 skills.sh matches

Ranked by installs across both queries (deduplicated).

| Skill | Installs | Steal | Tier |
|-------|----------|-------|------|
| `sickn33/antigravity-awesome-skills@tailwind-design-system` | 1.2K | Tailwind v4 token layers, `@theme` patterns — merge into `references/tailwind-v4.md` + `TOKENS.md` | S |
| `sickn33/antigravity-awesome-skills@ui-visual-validator` | 555 | Automated visual/token validation workflow — chain as post-scan companion | C |
| `cuellarfr/design-skills@design-elevation` | 115 | Elevation scale + shadow discipline — augment Round 2 hub craft / dark hierarchy | S |
| `factory-ai/factory-plugins@visual-design` | 104 | Generic visual-design checklist — mine for token naming conventions | B |
| `rmyndharis/antigravity-skills@tailwind-design-system` | 43 | Fork of antigravity tailwind skill — skip if sickn33 S-tier merged | B |

**Raw CLI — `visual design` (3 hits in head -10):**
```
sickn33/antigravity-awesome-skills@ui-visual-validator    555 installs
factory-ai/factory-plugins@visual-design                    104 installs
rmyndharis/antigravity-skills@ui-visual-validator           38 installs
```

**Raw CLI — `tailwind design system` (3 hits in head -10):**
```
sickn33/antigravity-awesome-skills@tailwind-design-system   1.2K installs
cuellarfr/design-skills@design-elevation                     115 installs
rmyndharis/antigravity-skills@tailwind-design-system        43 installs
```

## Gaps Ultra wins

- **Product-specific semantic palette** — Cobalt primary, banned pink on booking, amber/emerald status — registry skills are generic Tailwind/theme advice.
- **Executable token scans** — `TOKENS.md` grep suite (hex, arbitrary Tailwind, glass-on-content); `ui-visual-validator` (555) validates but does not ship booking-hub rules.
- **Surface-aware rounds** — Booking hub vs dashboard vs marketing weights (R0 palette 30%); competitors treat all UIs equally.
- **Chain position** — Explicit handoff to `apple-design-head` after tokens fixed; visual skills on skills.sh are standalone.
- **Brand marks** — Logo light/dark, favicon, footer “Powered by” rules — absent from tailwind-design-system skills.
- **oklch + semantic layers** — Root SKILL.md Design Ultra-Mode already exceeds 1.2K tailwind skill on color science; Ultra visual system enforces project tokens on top.

## Gaps Ultra loses

- **skills.sh discoverability** — `tailwind design system` top hit is antigravity (1.2K), not Ultra; zero registry presence for `visual design` or `design tokens`.
- **Automated validator UX** — `ui-visual-validator` (555) may ship runnable validation steps; Ultra relies on manual `rg` commands.
- **Generic portability** — Ultra doc still contains template placeholders (`your design tokens module`); antigravity skills are stack-generic and easier to adopt cold.
- **Low install ceiling** — Entire visual-design query space is &lt;1.5K installs — category is fragmented; winner takes niche keywords first.
- **No elevation reference file** — `design-elevation` (115) fills gap Ultra only partially covers in root SKILL.md elevation section.

## Recommended PR

**Title:** `feat(visual-system): tailwind token synthesis + validator chain hook`

1. **Tier S → `ultra-visual-system/TOKENS.md`** — Import antigravity `tailwind-design-system` patterns: primitive → semantic → component token table template; Tailwind v4 `@theme` block example using cobalt/violet/amber/emerald.
2. **Tier S → `references/tailwind-v4.md`** — Add elevation scale section from `cuellarfr/design-skills@design-elevation` (5 levels, dark mode lightness-not-shadow rule).
3. **Tier C → validator chain** — In `ultra-visual-system/SKILL.md` Phase 0.3, add optional step: “If `ui-visual-validator` installed, run its checklist after grep suite; map findings to P0/P1.”
4. **De-template SKILL.md** — Replace `your design tokens module` placeholders with `_shared/VISUAL.md` pointer only (grep found inconsistency hurts competitive positioning).
5. **Registry submit** — `Cookie-Cat21/apple-ultra-skills@ultra-visual-system` with triggers: `design tokens`, `token audit`, `dark mode check`, `tailwind design system`, `visual system`.
6. **Script** — `scripts/lint-design-rules.mjs` extended with elevation + arbitrary Tailwind checks (automate Tier C validator locally).

**Bundle note:** Add `tailwind-design-system` as **reference-only** (Tier S), not `npx skills add` hard dependency — keeps pack self-contained.
