# Apple Design Head — Deterministic Anti-Pattern Rules

> 180 rule-enforced checks for apple-design-head reviews. Each rule is scannable in Round 0–4 and blocks ship at Critical severity.
> Format borrowed from ux-skill's deterministic anti-pattern catalogue; integrated with our weighted P0–P3 protocol.

## How to use

1. **Quick scan / Full review:** Walk categories in order. Flag violations with rule ID in findings.
2. **Severity:** Critical = P0 ship blocker. High = P1. Medium = P2. Low/Cosmetic = P3.
3. **Output:** `RULE-XXX | Location | Severity | Fix` in standard finding format.
4. **Pair with:** [SKILL.md](./SKILL.md) weighted rounds + [references/LOOKUP.md](./references/LOOKUP.md) for HIG depth.
5. **CI lint:** `node scripts/lint-design-rules.mjs --path src/` — 30 regex rules; Critical exits non-zero.

## Rule index

| Category | Rules | IDs |
|----------|-------|-----|
| Spacing | 20 | RULE-001–RULE-020 |
| Color | 20 | RULE-021–RULE-040 |
| Ai Slop | 20 | RULE-041–RULE-060 |
| Accessibility | 20 | RULE-061–RULE-080 |
| Motion | 20 | RULE-081–RULE-100 |
| Copy | 20 | RULE-101–RULE-120 |
| Layout | 20 | RULE-121–RULE-140 |
| Dark Mode | 20 | RULE-141–RULE-160 |
| Feeling & Interaction | 20 | RULE-161–RULE-180 |

**Total rules: 180**

---

### RULE-001 — Inconsistent padding on sibling cards

| Field | Value |
|-------|-------|
| **ID** | RULE-001 |
| **Category** | spacing |
| **Pattern** | Inconsistent padding on sibling cards |
| **Why it fails** | Rhythm breaks; surfaces feel assembled not designed |
| **Do instead** | Use one spacing scale token (4/8/12/16/24/32) per density tier |
| **Detection** | axe-core `target-size`, CSS `min-height`/`min-width` audit, `lint-design-rules.mjs` RULE-001–020 |
| **Severity** | High |

### RULE-002 — Arbitrary px values (13px, 17px)

| Field | Value |
|-------|-------|
| **ID** | RULE-002 |
| **Category** | spacing |
| **Pattern** | Arbitrary px values (13px, 17px) |
| **Why it fails** | Off-grid spacing reads as accidental |
| **Do instead** | Snap to 4px grid or design token scale |
| **Severity** | Medium |

### RULE-003 — Undersized or crowded pointer targets

| Field | Value |
|-------|-------|
| **ID** | RULE-003 |
| **Category** | spacing |
| **Pattern** | Important controls are hard to activate because targets are too small or too tightly packed |
| **Why it fails** | Reduces pointer/touch accuracy and may fail WCAG 2.2 SC 2.5.8 Target Size (Minimum) |
| **Do instead** | For web, meet WCAG 2.2 AA 24×24 CSS px or its spacing/equivalent exceptions; aim for ~44×44 CSS px on touch-first primary controls where practical |
| **Detection** | axe-core/DevTools target-size audit + manual spacing check; distinguish the WCAG minimum from the larger Apple touch target recommendation |
| **Severity** | High |

### RULE-004 — Excessive whitespace with no hierarchy

| Field | Value |
|-------|-------|
| **ID** | RULE-004 |
| **Category** | spacing |
| **Pattern** | Excessive whitespace with no hierarchy |
| **Why it fails** | Content floats; users can't scan |
| **Do instead** | Tighten vertical rhythm; group related items |
| **Severity** | Medium |

### RULE-005 — Uneven gutters between columns

| Field | Value |
|-------|-------|
| **ID** | RULE-005 |
| **Category** | spacing |
| **Pattern** | Uneven gutters between columns |
| **Why it fails** | Grid feels broken on resize |
| **Do instead** | Use consistent gap token across breakpoints |
| **Detection** | axe-core `target-size`, CSS `min-height`/`min-width` audit, `lint-design-rules.mjs` RULE-001–020 |
| **Severity** | High |

### RULE-006 — Section padding smaller than card padding

| Field | Value |
|-------|-------|
| **ID** | RULE-006 |
| **Category** | spacing |
| **Pattern** | Section padding smaller than card padding |
| **Why it fails** | Hierarchy inverts; cards dominate sections |
| **Do instead** | Section padding ≥ card padding + one scale step |
| **Severity** | Medium |

### RULE-007 — Text flush against container edge on mobile

| Field | Value |
|-------|-------|
| **ID** | RULE-007 |
| **Category** | spacing |
| **Pattern** | Text flush against container edge on mobile |
| **Why it fails** | Claustrophobic; violates safe area |
| **Do instead** | 16px minimum horizontal inset on mobile |
| **Detection** | axe-core `target-size`, CSS `min-height`/`min-width` audit, `lint-design-rules.mjs` RULE-001–020 |
| **Severity** | High |

### RULE-008 — Mixed rem and px spacing in same component

| Field | Value |
|-------|-------|
| **ID** | RULE-008 |
| **Category** | spacing |
| **Pattern** | Mixed rem and px spacing in same component |
| **Why it fails** | Zoom and scaling behave inconsistently |
| **Do instead** | Pick rem for layout, px only for borders/hairlines |
| **Severity** | Medium |

### RULE-009 — Icon-to-label gap varies per row

| Field | Value |
|-------|-------|
| **ID** | RULE-009 |
| **Category** | spacing |
| **Pattern** | Icon-to-label gap varies per row |
| **Why it fails** | List scan speed drops |
| **Do instead** | Single icon-text gap token everywhere |
| **Severity** | Medium |

### RULE-010 — Stack gap larger than section gap

| Field | Value |
|-------|-------|
| **ID** | RULE-010 |
| **Category** | spacing |
| **Pattern** | Stack gap larger than section gap |
| **Why it fails** | Related items feel disconnected |
| **Do instead** | Inner stack gap < section gap |
| **Severity** | Medium |

### RULE-011 — Hero padding inconsistent with rest of page

| Field | Value |
|-------|-------|
| **ID** | RULE-011 |
| **Category** | spacing |
| **Pattern** | Hero padding inconsistent with rest of page |
| **Why it fails** | Landing feels like two sites stitched |
| **Do instead** | Derive hero padding from page scale |
| **Detection** | axe-core `target-size`, CSS `min-height`/`min-width` audit, `lint-design-rules.mjs` RULE-001–020 |
| **Severity** | High |

### RULE-012 — Form field vertical rhythm uneven

| Field | Value |
|-------|-------|
| **ID** | RULE-012 |
| **Category** | spacing |
| **Pattern** | Form field vertical rhythm uneven |
| **Why it fails** | Forms feel longer than they are |
| **Do instead** | Uniform field gap; group related fields tighter |
| **Detection** | axe-core `target-size`, CSS `min-height`/`min-width` audit, `lint-design-rules.mjs` RULE-001–020 |
| **Severity** | High |

### RULE-013 — Table cell padding inconsistent

| Field | Value |
|-------|-------|
| **ID** | RULE-013 |
| **Category** | spacing |
| **Pattern** | Table cell padding inconsistent |
| **Why it fails** | Data tables hard to read |
| **Do instead** | Uniform cell padding; denser only in admin tables |
| **Severity** | Medium |

### RULE-014 — Modal padding smaller than page padding

| Field | Value |
|-------|-------|
| **ID** | RULE-014 |
| **Category** | spacing |
| **Pattern** | Modal padding smaller than page padding |
| **Why it fails** | Modal feels cramped vs host page |
| **Do instead** | Modal inner padding ≥ page content padding |
| **Severity** | Medium |

### RULE-015 — Badge padding asymmetric without reason

| Field | Value |
|-------|-------|
| **ID** | RULE-015 |
| **Category** | spacing |
| **Pattern** | Badge padding asymmetric without reason |
| **Why it fails** | Micro-components look sloppy |
| **Do instead** | Symmetric px/py unless icon-led |
| **Severity** | Cosmetic |

### RULE-016 — List item padding varies by content length

| Field | Value |
|-------|-------|
| **ID** | RULE-016 |
| **Category** | spacing |
| **Pattern** | List item padding varies by content length |
| **Why it fails** | Visual jitter in navigation |
| **Do instead** | Fixed min-height + consistent padding |
| **Severity** | Medium |

### RULE-017 — Sticky header height changes on scroll

| Field | Value |
|-------|-------|
| **ID** | RULE-017 |
| **Category** | spacing |
| **Pattern** | Sticky header height changes on scroll |
| **Why it fails** | Layout shift and disorientation |
| **Do instead** | Fixed header height; opacity/blur only |
| **Detection** | axe-core `target-size`, CSS `min-height`/`min-width` audit, `lint-design-rules.mjs` RULE-001–020 |
| **Severity** | High |

### RULE-018 — Footer top padding mismatches section above

| Field | Value |
|-------|-------|
| **ID** | RULE-018 |
| **Category** | spacing |
| **Pattern** | Footer top padding mismatches section above |
| **Why it fails** | Page ending feels abrupt |
| **Do instead** | Footer top padding = section bottom padding |
| **Severity** | Low |

### RULE-019 — Avatar cluster overlap without consistent offset

| Field | Value |
|-------|-------|
| **ID** | RULE-019 |
| **Category** | spacing |
| **Pattern** | Avatar cluster overlap without consistent offset |
| **Why it fails** | Team section looks accidental |
| **Do instead** | Fixed negative margin per avatar size |
| **Severity** | Cosmetic |

### RULE-020 — Chip/tag internal padding inconsistent

| Field | Value |
|-------|-------|
| **ID** | RULE-020 |
| **Category** | spacing |
| **Pattern** | Chip/tag internal padding inconsistent |
| **Why it fails** | Filter UI feels unpolished |
| **Do instead** | One chip padding token per size variant |
| **Severity** | Medium |

### RULE-021 — Accent color used on >15% of viewport

| Field | Value |
|-------|-------|
| **ID** | RULE-021 |
| **Category** | color |
| **Pattern** | Accent color used on >15% of viewport |
| **Why it fails** | Accent loses meaning; UI shouts |
| **Do instead** | Reserve accent for CTAs, links, focus |
| **Detection** | axe-core `color-contrast`, Stylelint color token rules, Lighthouse contrast audit |
| **Severity** | High |

### RULE-022 — Gray text below 4.5:1 on background

| Field | Value |
|-------|-------|
| **ID** | RULE-022 |
| **Category** | color |
| **Pattern** | Gray text below 4.5:1 on background |
| **Why it fails** | WCAG AA failure; unreadable for many |
| **Do instead** | Use token pair tested for contrast |
| **Detection** | axe-core `color-contrast`, Stylelint color token rules, Lighthouse contrast audit |
| **Severity** | Critical |

### RULE-023 — Multiple competing accent hues

| Field | Value |
|-------|-------|
| **ID** | RULE-023 |
| **Category** | color |
| **Pattern** | Multiple competing accent hues |
| **Why it fails** | Brand feels undefined |
| **Do instead** | One primary accent; secondary only for charts |
| **Detection** | axe-core `color-contrast`, Stylelint color token rules, Lighthouse contrast audit |
| **Severity** | High |

### RULE-024 — Status colors reused for decoration

| Field | Value |
|-------|-------|
| **ID** | RULE-024 |
| **Category** | color |
| **Pattern** | Status colors reused for decoration |
| **Why it fails** | Users can't trust red/green semantics |
| **Do instead** | Semantic colors only for state |
| **Detection** | axe-core `color-contrast`, Stylelint color token rules, Lighthouse contrast audit |
| **Severity** | High |

### RULE-025 — Hover state only changes opacity

| Field | Value |
|-------|-------|
| **ID** | RULE-025 |
| **Category** | color |
| **Pattern** | Hover state only changes opacity |
| **Why it fails** | Affordance unclear on touch devices |
| **Do instead** | Add border, bg, or underline change |
| **Severity** | Medium |

### RULE-026 — Disabled state same as placeholder

| Field | Value |
|-------|-------|
| **ID** | RULE-026 |
| **Category** | color |
| **Pattern** | Disabled state same as placeholder |
| **Why it fails** | Users can't tell field state |
| **Do instead** | Distinct disabled token with reduced contrast |
| **Detection** | axe-core `color-contrast`, Stylelint color token rules, Lighthouse contrast audit |
| **Severity** | High |

### RULE-027 — Link color identical to body text

| Field | Value |
|-------|-------|
| **ID** | RULE-027 |
| **Category** | color |
| **Pattern** | Link color identical to body text |
| **Why it fails** | Discoverability failure |
| **Do instead** | Links must differ in color or underline |
| **Detection** | axe-core `color-contrast`, Stylelint color token rules, Lighthouse contrast audit |
| **Severity** | Critical |

### RULE-028 — Border color too close to background

| Field | Value |
|-------|-------|
| **ID** | RULE-028 |
| **Category** | color |
| **Pattern** | Border color too close to background |
| **Why it fails** | Cards don't separate; flat mush |
| **Do instead** | Increase border contrast or use shadow |
| **Severity** | Medium |

### RULE-029 — Random hex in component not in tokens

| Field | Value |
|-------|-------|
| **ID** | RULE-029 |
| **Category** | color |
| **Pattern** | Random hex in component not in tokens |
| **Why it fails** | Theme drift across pages |
| **Do instead** | Add to token file or use nearest token |
| **Detection** | axe-core `color-contrast`, Stylelint color token rules, Lighthouse contrast audit |
| **Severity** | High |

### RULE-030 — Dark mode = inverted light palette

| Field | Value |
|-------|-------|
| **ID** | RULE-030 |
| **Category** | color |
| **Pattern** | Dark mode = inverted light palette |
| **Why it fails** | Washed out; eye strain |
| **Do instead** | Rebuild dark palette with separate contrast pairs |
| **Detection** | axe-core `color-contrast`, Stylelint color token rules, Lighthouse contrast audit |
| **Severity** | High |

### RULE-031 — Gradient text on body copy

| Field | Value |
|-------|-------|
| **ID** | RULE-031 |
| **Category** | color |
| **Pattern** | Gradient text on body copy |
| **Why it fails** | Readability and accessibility fail |
| **Do instead** | Gradient only on display headings ≥24px |
| **Detection** | axe-core `color-contrast`, Stylelint color token rules, Lighthouse contrast audit |
| **Severity** | High |

### RULE-032 — Error red used for brand accent

| Field | Value |
|-------|-------|
| **ID** | RULE-032 |
| **Category** | color |
| **Pattern** | Error red used for brand accent |
| **Why it fails** | Errors feel like marketing |
| **Do instead** | Separate error token from brand |
| **Detection** | axe-core `color-contrast`, Stylelint color token rules, Lighthouse contrast audit |
| **Severity** | High |

### RULE-033 — Success green on non-success UI

| Field | Value |
|-------|-------|
| **ID** | RULE-033 |
| **Category** | color |
| **Pattern** | Success green on non-success UI |
| **Why it fails** | False positive signals |
| **Do instead** | Green only on success states |
| **Severity** | Medium |

### RULE-034 — Chart colors not colorblind-safe

| Field | Value |
|-------|-------|
| **ID** | RULE-034 |
| **Category** | color |
| **Pattern** | Chart colors not colorblind-safe |
| **Why it fails** | Data misread by 8% of users |
| **Do instead** | Use pattern + color; test protanopia |
| **Detection** | axe-core `color-contrast`, Stylelint color token rules, Lighthouse contrast audit |
| **Severity** | High |

### RULE-035 — Focus ring color matches background

| Field | Value |
|-------|-------|
| **ID** | RULE-035 |
| **Category** | color |
| **Pattern** | Focus ring color matches background |
| **Why it fails** | Keyboard users lost |
| **Do instead** | High-contrast focus ring token |
| **Detection** | axe-core `focus-order-semantics`, tab-through manual test, eslint-plugin-jsx-a11y `click-events-have-key-events` |
| **Severity** | Critical |

### RULE-036 — Skeleton loader wrong hue

| Field | Value |
|-------|-------|
| **ID** | RULE-036 |
| **Category** | color |
| **Pattern** | Skeleton loader wrong hue |
| **Why it fails** | Loading state jarring |
| **Do instead** | Skeleton from neutral scale not accent |
| **Severity** | Low |

### RULE-037 — Overlay scrim too light

| Field | Value |
|-------|-------|
| **ID** | RULE-037 |
| **Category** | color |
| **Pattern** | Overlay scrim too light |
| **Why it fails** | Modal doesn't feel modal |
| **Do instead** | 40-60% black or themed scrim token |
| **Severity** | Medium |

### RULE-038 — Selected tab same weight as unselected

| Field | Value |
|-------|-------|
| **ID** | RULE-038 |
| **Category** | color |
| **Pattern** | Selected tab same weight as unselected |
| **Why it fails** | Navigation state unclear |
| **Do instead** | Selected: accent or bold + indicator |
| **Detection** | axe-core `color-contrast`, Stylelint color token rules, Lighthouse contrast audit |
| **Severity** | High |

### RULE-039 — Icon color mismatches adjacent text

| Field | Value |
|-------|-------|
| **ID** | RULE-039 |
| **Category** | color |
| **Pattern** | Icon color mismatches adjacent text |
| **Why it fails** | Visual discord in rows |
| **Do instead** | Icons inherit text color or dedicated icon token |
| **Severity** | Medium |

### RULE-040 — Brand gradient on form inputs

| Field | Value |
|-------|-------|
| **ID** | RULE-040 |
| **Category** | color |
| **Pattern** | Brand gradient on form inputs |
| **Why it fails** | Inputs look like marketing not tools |
| **Do instead** | Neutral input surfaces; accent on focus only |
| **Detection** | axe-core `color-contrast`, Stylelint color token rules, Lighthouse contrast audit |
| **Severity** | High |

### RULE-041 — Purple-to-blue hero gradient on white

| Field | Value |
|-------|-------|
| **ID** | RULE-041 |
| **Category** | ai-slop |
| **Pattern** | Purple-to-blue hero gradient on white |
| **Why it fails** | Strongest AI template fingerprint |
| **Do instead** | Solid neutral canvas + single accent |
| **Detection** | axe-core `target-size`, CSS `min-height`/`min-width` audit, `lint-design-rules.mjs` RULE-001–020 |
| **Severity** | Critical |

### RULE-042 — Inter + generic sans everywhere

| Field | Value |
|-------|-------|
| **ID** | RULE-042 |
| **Category** | ai-slop |
| **Pattern** | Inter + generic sans everywhere |
| **Why it fails** | Default AI font pairing |
| **Do instead** | Pick distinctive display + workhorse pair |
| **Detection** | axe-core `target-size`, CSS `min-height`/`min-width` audit, `lint-design-rules.mjs` RULE-001–020 |
| **Severity** | High |

### RULE-043 — Rounded-3xl on every container

| Field | Value |
|-------|-------|
| **ID** | RULE-043 |
| **Category** | ai-slop |
| **Pattern** | Rounded-3xl on every container |
| **Why it fails** | Cartoon SaaS aesthetic |
| **Do instead** | Vary radius by component role |
| **Severity** | Medium |

### RULE-044 — Glassmorphism on dense dashboards

| Field | Value |
|-------|-------|
| **ID** | RULE-044 |
| **Category** | ai-slop |
| **Pattern** | Glassmorphism on dense dashboards |
| **Why it fails** | Legibility suffers; trend-chasing |
| **Do instead** | Solid surfaces in product UI |
| **Detection** | axe-core `target-size`, CSS `min-height`/`min-width` audit, `lint-design-rules.mjs` RULE-001–020 |
| **Severity** | High |

### RULE-045 — Floating orbs/blur blobs in background

| Field | Value |
|-------|-------|
| **ID** | RULE-045 |
| **Category** | ai-slop |
| **Pattern** | Floating orbs/blur blobs in background |
| **Why it fails** | Decorative noise; zero information |
| **Do instead** | Remove or replace with subtle texture |
| **Detection** | axe-core `target-size`, CSS `min-height`/`min-width` audit, `lint-design-rules.mjs` RULE-001–020 |
| **Severity** | High |

### RULE-046 — Hero headline 'Build something amazing'

| Field | Value |
|-------|-------|
| **ID** | RULE-046 |
| **Category** | ai-slop |
| **Pattern** | Hero headline 'Build something amazing' |
| **Why it fails** | Generic AI marketing copy |
| **Do instead** | Specific outcome tied to user job |
| **Detection** | axe-core `target-size`, CSS `min-height`/`min-width` audit, `lint-design-rules.mjs` RULE-001–020 |
| **Severity** | High |

### RULE-047 — Three identical feature cards with icons

| Field | Value |
|-------|-------|
| **ID** | RULE-047 |
| **Category** | ai-slop |
| **Pattern** | Three identical feature cards with icons |
| **Why it fails** | Template landing page pattern |
| **Do instead** | Asymmetric layout or proof-led structure |
| **Severity** | Medium |

### RULE-048 — Sparkle emoji in product UI

| Field | Value |
|-------|-------|
| **ID** | RULE-048 |
| **Category** | ai-slop |
| **Pattern** | Sparkle emoji in product UI |
| **Why it fails** | Reads as AI-generated polish |
| **Do instead** | Remove; use craft not decoration |
| **Severity** | Medium |

### RULE-049 — Gradient border on cards

| Field | Value |
|-------|-------|
| **ID** | RULE-049 |
| **Category** | ai-slop |
| **Pattern** | Gradient border on cards |
| **Why it fails** | 2019 Dribbble trope |
| **Do instead** | Flat border or subtle shadow |
| **Severity** | Medium |

### RULE-050 — Animated gradient background

| Field | Value |
|-------|-------|
| **ID** | RULE-050 |
| **Category** | ai-slop |
| **Pattern** | Animated gradient background |
| **Why it fails** | Distracting; performance cost |
| **Do instead** | Static background; motion on interaction only |
| **Detection** | axe-core `target-size`, CSS `min-height`/`min-width` audit, `lint-design-rules.mjs` RULE-001–020 |
| **Severity** | High |

### RULE-051 — Stock illustration style icons

| Field | Value |
|-------|-------|
| **ID** | RULE-051 |
| **Category** | ai-slop |
| **Pattern** | Stock illustration style icons |
| **Why it fails** | Inconsistent with product craft |
| **Do instead** | Single icon set with consistent stroke |
| **Severity** | Medium |

### RULE-052 — Centered everything layout

| Field | Value |
|-------|-------|
| **ID** | RULE-052 |
| **Category** | ai-slop |
| **Pattern** | Centered everything layout |
| **Why it fails** | No scan line; boring hierarchy |
| **Do instead** | Left-align body; center only hero CTA block |
| **Severity** | Medium |

### RULE-053 — Excessive drop shadow on flat UI

| Field | Value |
|-------|-------|
| **ID** | RULE-053 |
| **Category** | ai-slop |
| **Pattern** | Excessive drop shadow on flat UI |
| **Why it fails** | Depth without purpose |
| **Do instead** | Shadow only on elevated layers (modal, popover) |
| **Severity** | Medium |

### RULE-054 — Neumorphism on controls

| Field | Value |
|-------|-------|
| **ID** | RULE-054 |
| **Category** | ai-slop |
| **Pattern** | Neumorphism on controls |
| **Why it fails** | Low contrast; accessibility fail |
| **Do instead** | Standard filled or outlined controls |
| **Detection** | axe-core `target-size`, CSS `min-height`/`min-width` audit, `lint-design-rules.mjs` RULE-001–020 |
| **Severity** | High |

### RULE-055 — Bento grid with no content reason

| Field | Value |
|-------|-------|
| **ID** | RULE-055 |
| **Category** | ai-slop |
| **Pattern** | Bento grid with no content reason |
| **Why it fails** | Layout for layout's sake |
| **Do instead** | Grid follows content priority |
| **Severity** | Medium |

### RULE-056 — Lorem ipsum in shipped UI

| Field | Value |
|-------|-------|
| **ID** | RULE-056 |
| **Category** | ai-slop |
| **Pattern** | Lorem ipsum in shipped UI |
| **Why it fails** | Unfinished product signal |
| **Do instead** | Real copy or clearly marked placeholder |
| **Detection** | axe-core `target-size`, CSS `min-height`/`min-width` audit, `lint-design-rules.mjs` RULE-001–020 |
| **Severity** | Critical |

### RULE-057 — Identical card heights with sparse content

| Field | Value |
|-------|-------|
| **ID** | RULE-057 |
| **Category** | ai-slop |
| **Pattern** | Identical card heights with sparse content |
| **Why it fails** | Artificial symmetry |
| **Do instead** | Let content define height |
| **Severity** | Low |

### RULE-058 — Rainbow icon row

| Field | Value |
|-------|-------|
| **ID** | RULE-058 |
| **Category** | ai-slop |
| **Pattern** | Rainbow icon row |
| **Why it fails** | Each icon different hue = chaos |
| **Do instead** | Monochrome icons + one accent |
| **Severity** | Medium |

### RULE-059 — Over-rounded pill buttons on dense forms

| Field | Value |
|-------|-------|
| **ID** | RULE-059 |
| **Category** | ai-slop |
| **Pattern** | Over-rounded pill buttons on dense forms |
| **Why it fails** | Wastes horizontal space |
| **Do instead** | Standard radius on forms; pill for tags only |
| **Severity** | Low |

### RULE-060 — Mesh gradient hero without brand tie

| Field | Value |
|-------|-------|
| **ID** | RULE-060 |
| **Category** | ai-slop |
| **Pattern** | Mesh gradient hero without brand tie |
| **Why it fails** | Unowned visual language |
| **Do instead** | Derive from brand palette or remove |
| **Detection** | axe-core `target-size`, CSS `min-height`/`min-width` audit, `lint-design-rules.mjs` RULE-001–020 |
| **Severity** | High |

### RULE-061 — Div with onClick, no button role

| Field | Value |
|-------|-------|
| **ID** | RULE-061 |
| **Category** | accessibility |
| **Pattern** | Div with onClick, no button role |
| **Why it fails** | Keyboard and screen reader inaccessible |
| **Do instead** | Use button or role=button + keyboard handlers |
| **Detection** | axe-core (category-specific rule ID), eslint-plugin-jsx-a11y, Lighthouse a11y |
| **Severity** | Critical |

### RULE-062 — Missing alt on informative images

| Field | Value |
|-------|-------|
| **ID** | RULE-062 |
| **Category** | accessibility |
| **Pattern** | Missing alt on informative images |
| **Why it fails** | Screen reader users miss content |
| **Do instead** | Descriptive alt; decorative alt='' |
| **Detection** | axe-core (category-specific rule ID), eslint-plugin-jsx-a11y, Lighthouse a11y |
| **Severity** | Critical |

### RULE-063 — Color-only status indication

| Field | Value |
|-------|-------|
| **ID** | RULE-063 |
| **Category** | accessibility |
| **Pattern** | Color-only status indication |
| **Why it fails** | Colorblind users miss state |
| **Do instead** | Add icon, text, or pattern |
| **Detection** | axe-core (category-specific rule ID), eslint-plugin-jsx-a11y, Lighthouse a11y |
| **Severity** | Critical |

### RULE-064 — Focus outline removed globally

| Field | Value |
|-------|-------|
| **ID** | RULE-064 |
| **Category** | accessibility |
| **Pattern** | Focus outline removed globally |
| **Why it fails** | Keyboard navigation broken |
| **Do instead** | :focus-visible ring on all interactives |
| **Detection** | axe-core `focus-order-semantics`, tab-through manual test, eslint-plugin-jsx-a11y `click-events-have-key-events` |
| **Severity** | Critical |

### RULE-065 — Auto-playing video with sound

| Field | Value |
|-------|-------|
| **ID** | RULE-065 |
| **Category** | accessibility |
| **Pattern** | Auto-playing video with sound |
| **Why it fails** | Disorienting; WCAG violation |
| **Do instead** | Muted autoplay or user-initiated play |
| **Detection** | axe-core (category-specific rule ID), eslint-plugin-jsx-a11y, Lighthouse a11y |
| **Severity** | Critical |

### RULE-066 — Form labels missing or placeholder-only

| Field | Value |
|-------|-------|
| **ID** | RULE-066 |
| **Category** | accessibility |
| **Pattern** | Form labels missing or placeholder-only |
| **Why it fails** | SR users can't identify fields |
| **Do instead** | Visible label linked with for/id |
| **Detection** | axe-core `label`, `aria-*` rules, eslint-plugin-jsx-a11y `label-has-associated-control` |
| **Severity** | Critical |

### RULE-067 — Heading levels skipped (h1 to h4)

| Field | Value |
|-------|-------|
| **ID** | RULE-067 |
| **Category** | accessibility |
| **Pattern** | Heading levels skipped (h1 to h4) |
| **Why it fails** | Document outline broken |
| **Do instead** | Sequential heading hierarchy |
| **Detection** | axe-core (category-specific rule ID), eslint-plugin-jsx-a11y, Lighthouse a11y |
| **Severity** | High |

### RULE-068 — Modal without focus trap

| Field | Value |
|-------|-------|
| **ID** | RULE-068 |
| **Category** | accessibility |
| **Pattern** | Modal without focus trap |
| **Why it fails** | Focus escapes to background |
| **Do instead** | Trap focus; restore on close |
| **Detection** | axe-core `focus-order-semantics`, tab-through manual test, eslint-plugin-jsx-a11y `click-events-have-key-events` |
| **Severity** | Critical |

### RULE-069 — Insufficient link underline contrast

| Field | Value |
|-------|-------|
| **ID** | RULE-069 |
| **Category** | accessibility |
| **Pattern** | Insufficient link underline contrast |
| **Why it fails** | Links invisible to low vision |
| **Do instead** | Underline or 3:1 contrast vs surrounding |
| **Detection** | axe-core `color-contrast`, Lighthouse `color-contrast`, Chrome DevTools contrast ratio panel |
| **Severity** | High |

### RULE-070 — Touch target overlap

| Field | Value |
|-------|-------|
| **ID** | RULE-070 |
| **Category** | accessibility |
| **Pattern** | Touch target overlap |
| **Why it fails** | Mis-taps on mobile |
| **Do instead** | Min 8px gap between targets |
| **Detection** | axe-core `target-size` (WCAG 2.5.5), DevTools computed size <44px, RULE-070 in lint-design-rules.mjs |
| **Severity** | High |

### RULE-071 — aria-hidden on focusable children

| Field | Value |
|-------|-------|
| **ID** | RULE-071 |
| **Category** | accessibility |
| **Pattern** | aria-hidden on focusable children |
| **Why it fails** | Focusable but invisible to SR |
| **Do instead** | Don't hide focusable elements |
| **Detection** | axe-core `focus-order-semantics`, tab-through manual test, eslint-plugin-jsx-a11y `click-events-have-key-events` |
| **Severity** | Critical |

### RULE-072 — Live region overuse

| Field | Value |
|-------|-------|
| **ID** | RULE-072 |
| **Category** | accessibility |
| **Pattern** | Live region overuse |
| **Why it fails** | SR announcement spam |
| **Do instead** | aria-live only for dynamic status |
| **Severity** | Medium |

### RULE-073 — Table without th scope

| Field | Value |
|-------|-------|
| **ID** | RULE-073 |
| **Category** | accessibility |
| **Pattern** | Table without th scope |
| **Why it fails** | Table navigation confusing |
| **Do instead** | scope=col/row on headers |
| **Detection** | axe-core (category-specific rule ID), eslint-plugin-jsx-a11y, Lighthouse a11y |
| **Severity** | High |

### RULE-074 — Custom select without listbox pattern

| Field | Value |
|-------|-------|
| **ID** | RULE-074 |
| **Category** | accessibility |
| **Pattern** | Custom select without listbox pattern |
| **Why it fails** | SR can't operate control |
| **Do instead** | Use native select or ARIA listbox |
| **Detection** | axe-core (category-specific rule ID), eslint-plugin-jsx-a11y, Lighthouse a11y |
| **Severity** | Critical |

### RULE-075 — Error message not linked to field

| Field | Value |
|-------|-------|
| **ID** | RULE-075 |
| **Category** | accessibility |
| **Pattern** | Error message not linked to field |
| **Why it fails** | SR can't find error source |
| **Do instead** | aria-describedby to error id |
| **Detection** | axe-core (category-specific rule ID), eslint-plugin-jsx-a11y, Lighthouse a11y |
| **Severity** | High |

### RULE-076 — Motion without prefers-reduced-motion

| Field | Value |
|-------|-------|
| **ID** | RULE-076 |
| **Category** | accessibility |
| **Pattern** | Motion without prefers-reduced-motion |
| **Why it fails** | Vestibular disorder trigger |
| **Do instead** | Respect PRM; provide instant alternative |
| **Detection** | CSS scan: `animation` without `prefers-reduced-motion`, Lighthouse best-practices |
| **Severity** | High |

### RULE-077 — Icon-only button without aria-label

| Field | Value |
|-------|-------|
| **ID** | RULE-077 |
| **Category** | accessibility |
| **Pattern** | Icon-only button without aria-label |
| **Why it fails** | Purpose unknown to SR |
| **Do instead** | aria-label describing action |
| **Detection** | axe-core `label`, `aria-*` rules, eslint-plugin-jsx-a11y `label-has-associated-control` |
| **Severity** | Critical |

### RULE-078 — Low contrast placeholder text

| Field | Value |
|-------|-------|
| **ID** | RULE-078 |
| **Category** | accessibility |
| **Pattern** | Low contrast placeholder text |
| **Why it fails** | Hard to read for many users |
| **Do instead** | Placeholder ≥ 4.5:1 or don't rely on it |
| **Severity** | Medium |

### RULE-079 — Skip link missing on long pages

| Field | Value |
|-------|-------|
| **ID** | RULE-079 |
| **Category** | accessibility |
| **Pattern** | Skip link missing on long pages |
| **Why it fails** | Keyboard users tab through entire nav |
| **Do instead** | Skip to main content link |
| **Detection** | axe-core (category-specific rule ID), eslint-plugin-jsx-a11y, Lighthouse a11y |
| **Severity** | High |

### RULE-080 — Language attribute missing on html

| Field | Value |
|-------|-------|
| **ID** | RULE-080 |
| **Category** | accessibility |
| **Pattern** | Language attribute missing on html |
| **Why it fails** | SR wrong pronunciation |
| **Do instead** | lang attribute on html element |
| **Detection** | axe-core (category-specific rule ID), eslint-plugin-jsx-a11y, Lighthouse a11y |
| **Severity** | High |

### RULE-081 — Page-load stagger on every element

| Field | Value |
|-------|-------|
| **ID** | RULE-081 |
| **Category** | motion |
| **Pattern** | Page-load stagger on every element |
| **Why it fails** | Feels slow; annoys return visitors |
| **Do instead** | Animate hero only or first paint |
| **Detection** | CSS `@media (prefers-reduced-motion)` scan, `animation-duration` >200ms without reduced variant |
| **Severity** | High |

### RULE-082 — Duration >500ms on micro-interactions

| Field | Value |
|-------|-------|
| **ID** | RULE-082 |
| **Category** | motion |
| **Pattern** | Duration >500ms on micro-interactions |
| **Why it fails** | UI feels sluggish |
| **Do instead** | 150-250ms for hovers; 300ms max modals |
| **Detection** | CSS `@media (prefers-reduced-motion)` scan, `animation-duration` >200ms without reduced variant |
| **Severity** | High |

### RULE-083 — Bounce easing on serious product UI

| Field | Value |
|-------|-------|
| **ID** | RULE-083 |
| **Category** | motion |
| **Pattern** | Bounce easing on serious product UI |
| **Why it fails** | Playful when context is professional |
| **Do instead** | ease-out or custom cubic for product |
| **Severity** | Medium |

### RULE-084 — Parallax on scroll in app UI

| Field | Value |
|-------|-------|
| **ID** | RULE-084 |
| **Category** | motion |
| **Pattern** | Parallax on scroll in app UI |
| **Why it fails** | Disorienting in tools |
| **Do instead** | Reserve parallax for marketing only |
| **Severity** | Medium |

### RULE-085 — Animating width/height of layout

| Field | Value |
|-------|-------|
| **ID** | RULE-085 |
| **Category** | motion |
| **Pattern** | Animating width/height of layout |
| **Why it fails** | Janky reflow; CLS risk |
| **Do instead** | Animate transform/opacity only |
| **Detection** | CSS `@media (prefers-reduced-motion)` scan, `animation-duration` >200ms without reduced variant |
| **Severity** | High |

### RULE-086 — Infinite pulse on non-loading elements

| Field | Value |
|-------|-------|
| **ID** | RULE-086 |
| **Category** | motion |
| **Pattern** | Infinite pulse on non-loading elements |
| **Why it fails** | False loading signal |
| **Do instead** | Pulse only on skeleton/spinner |
| **Detection** | CSS `@media (prefers-reduced-motion)` scan, `animation-duration` >200ms without reduced variant |
| **Severity** | High |

### RULE-087 — Hover scale >1.05 on cards

| Field | Value |
|-------|-------|
| **ID** | RULE-087 |
| **Category** | motion |
| **Pattern** | Hover scale >1.05 on cards |
| **Why it fails** | Layout shift on hover |
| **Do instead** | Max 1.02 or shadow change instead |
| **Severity** | Medium |

### RULE-088 — No exit animation on modals

| Field | Value |
|-------|-------|
| **ID** | RULE-088 |
| **Category** | motion |
| **Pattern** | No exit animation on modals |
| **Why it fails** | Abrupt dismissal |
| **Do instead** | Pair enter/exit; shorter exit |
| **Severity** | Low |

### RULE-089 — Scroll-jacking on marketing page

| Field | Value |
|-------|-------|
| **ID** | RULE-089 |
| **Category** | motion |
| **Pattern** | Scroll-jacking on marketing page |
| **Why it fails** | User agency violation |
| **Do instead** | Let user control scroll |
| **Detection** | CSS `@media (prefers-reduced-motion)` scan, `animation-duration` >200ms without reduced variant |
| **Severity** | Critical |

### RULE-090 — Loading spinner with no timeout message

| Field | Value |
|-------|-------|
| **ID** | RULE-090 |
| **Category** | motion |
| **Pattern** | Loading spinner with no timeout message |
| **Why it fails** | Indefinite wait anxiety |
| **Do instead** | Show message after 3s; retry option |
| **Severity** | Medium |

### RULE-091 — Transition on every CSS property

| Field | Value |
|-------|-------|
| **ID** | RULE-091 |
| **Category** | motion |
| **Pattern** | Transition on every CSS property |
| **Why it fails** | Performance hit |
| **Do instead** | Transition specific properties only |
| **Severity** | Medium |

### RULE-092 — Carousel auto-advance without pause

| Field | Value |
|-------|-------|
| **ID** | RULE-092 |
| **Category** | motion |
| **Pattern** | Carousel auto-advance without pause |
| **Why it fails** | WCAG 2.2.2 violation |
| **Do instead** | Pause control; 5s+ interval |
| **Detection** | CSS `@media (prefers-reduced-motion)` scan, `animation-duration` >200ms without reduced variant |
| **Severity** | High |

### RULE-093 — Spring physics on form validation

| Field | Value |
|-------|-------|
| **ID** | RULE-093 |
| **Category** | motion |
| **Pattern** | Spring physics on form validation |
| **Why it fails** | Errors feel playful not serious |
| **Do instead** | Instant or subtle shake for errors |
| **Severity** | Medium |

### RULE-094 — Skeleton shimmer too fast

| Field | Value |
|-------|-------|
| **ID** | RULE-094 |
| **Category** | motion |
| **Pattern** | Skeleton shimmer too fast |
| **Why it fails** | Visual noise |
| **Do instead** | 1.5-2s shimmer cycle |
| **Severity** | Low |

### RULE-095 — Route transition blocks interaction

| Field | Value |
|-------|-------|
| **ID** | RULE-095 |
| **Category** | motion |
| **Pattern** | Route transition blocks interaction |
| **Why it fails** | App feels frozen |
| **Do instead** | Non-blocking transitions |
| **Detection** | CSS `@media (prefers-reduced-motion)` scan, `animation-duration` >200ms without reduced variant |
| **Severity** | High |

### RULE-096 — Tooltip delay >300ms

| Field | Value |
|-------|-------|
| **ID** | RULE-096 |
| **Category** | motion |
| **Pattern** | Tooltip delay >300ms |
| **Why it fails** | Feels unresponsive |
| **Do instead** | 100-200ms show delay |
| **Severity** | Low |

### RULE-097 — Confetti on routine actions

| Field | Value |
|-------|-------|
| **ID** | RULE-097 |
| **Category** | motion |
| **Pattern** | Confetti on routine actions |
| **Why it fails** | Celebration inflation |
| **Do instead** | Reserve for true milestones |
| **Severity** | Medium |

### RULE-098 — Stagger delay compounds on long lists

| Field | Value |
|-------|-------|
| **ID** | RULE-098 |
| **Category** | motion |
| **Pattern** | Stagger delay compounds on long lists |
| **Why it fails** | List takes seconds to appear |
| **Do instead** | Cap stagger; batch reveal |
| **Detection** | CSS `@media (prefers-reduced-motion)` scan, `animation-duration` >200ms without reduced variant |
| **Severity** | High |

### RULE-099 — Transform on parent breaks fixed children

| Field | Value |
|-------|-------|
| **ID** | RULE-099 |
| **Category** | motion |
| **Pattern** | Transform on parent breaks fixed children |
| **Why it fails** | Sticky/fixed positioning breaks |
| **Do instead** | Animate child not positioned ancestor |
| **Detection** | CSS `@media (prefers-reduced-motion)` scan, `animation-duration` >200ms without reduced variant |
| **Severity** | High |

### RULE-100 — Reduced motion ignored in JS animations

| Field | Value |
|-------|-------|
| **ID** | RULE-100 |
| **Category** | motion |
| **Pattern** | Reduced motion ignored in JS animations |
| **Why it fails** | Accessibility gap |
| **Do instead** | Check matchMedia in JS anim paths |
| **Detection** | CSS scan: `animation` without `prefers-reduced-motion`, Lighthouse best-practices |
| **Severity** | High |

### RULE-101 — Welcome to our platform!

| Field | Value |
|-------|-------|
| **ID** | RULE-101 |
| **Category** | copy |
| **Pattern** | Welcome to our platform! |
| **Why it fails** | Generic; no user benefit |
| **Do instead** | Lead with outcome user gets today |
| **Detection** | Content lint for banned phrases, heading hierarchy audit (h1→h2) |
| **Severity** | High |

### RULE-102 — Click here links

| Field | Value |
|-------|-------|
| **ID** | RULE-102 |
| **Category** | copy |
| **Pattern** | Click here links |
| **Why it fails** | Non-descriptive for SR and scan |
| **Do instead** | Verb + destination: View invoice |
| **Detection** | Content lint for banned phrases, heading hierarchy audit (h1→h2) |
| **Severity** | High |

### RULE-103 — Passive voice in error messages

| Field | Value |
|-------|-------|
| **ID** | RULE-103 |
| **Category** | copy |
| **Pattern** | Passive voice in error messages |
| **Why it fails** | Blame unclear; user confused |
| **Do instead** | Active: We couldn't save. Try again. |
| **Severity** | Medium |

### RULE-104 — Jargon in consumer-facing UI

| Field | Value |
|-------|-------|
| **ID** | RULE-104 |
| **Category** | copy |
| **Pattern** | Jargon in consumer-facing UI |
| **Why it fails** | Cognitive load; exclusion |
| **Do instead** | Plain language; define terms once |
| **Detection** | Content lint for banned phrases, heading hierarchy audit (h1→h2) |
| **Severity** | High |

### RULE-105 — ALL CAPS labels in body UI

| Field | Value |
|-------|-------|
| **ID** | RULE-105 |
| **Category** | copy |
| **Pattern** | ALL CAPS labels in body UI |
| **Why it fails** | Reads as shouting |
| **Do instead** | Sentence case for labels |
| **Severity** | Medium |

### RULE-106 — Duplicate CTA labels (Learn more ×3)

| Field | Value |
|-------|-------|
| **ID** | RULE-106 |
| **Category** | copy |
| **Pattern** | Duplicate CTA labels (Learn more ×3) |
| **Why it fails** | User can't distinguish actions |
| **Do instead** | Unique label per destination |
| **Detection** | axe-core `label`, `aria-*` rules, eslint-plugin-jsx-a11y `label-has-associated-control` |
| **Severity** | High |

### RULE-107 — Empty state with no next step

| Field | Value |
|-------|-------|
| **ID** | RULE-107 |
| **Category** | copy |
| **Pattern** | Empty state with no next step |
| **Why it fails** | Dead end; user leaves |
| **Do instead** | One clear action in empty state |
| **Detection** | Content lint for banned phrases, heading hierarchy audit (h1→h2) |
| **Severity** | High |

### RULE-108 — Confirmation without consequence

| Field | Value |
|-------|-------|
| **ID** | RULE-108 |
| **Category** | copy |
| **Pattern** | Confirmation without consequence |
| **Why it fails** | Accidental destructive actions |
| **Do instead** | Name what will be deleted |
| **Detection** | Content lint for banned phrases, heading hierarchy audit (h1→h2) |
| **Severity** | Critical |

### RULE-109 — Truncated button text on mobile

| Field | Value |
|-------|-------|
| **ID** | RULE-109 |
| **Category** | copy |
| **Pattern** | Truncated button text on mobile |
| **Why it fails** | Action unclear |
| **Do instead** | Shorter copy or icon+label |
| **Detection** | Content lint for banned phrases, heading hierarchy audit (h1→h2) |
| **Severity** | High |

### RULE-110 — Inconsistent product name casing

| Field | Value |
|-------|-------|
| **ID** | RULE-110 |
| **Category** | copy |
| **Pattern** | Inconsistent product name casing |
| **Why it fails** | Brand feels amateur |
| **Do instead** | One canonical name from BRAND.md |
| **Severity** | Medium |

### RULE-111 — Humor in error states

| Field | Value |
|-------|-------|
| **ID** | RULE-111 |
| **Category** | copy |
| **Pattern** | Humor in error states |
| **Why it fails** | Frustrated users feel mocked |
| **Do instead** | Empathetic, direct error copy |
| **Severity** | Medium |

### RULE-112 — Feature name != user mental model

| Field | Value |
|-------|-------|
| **ID** | RULE-112 |
| **Category** | copy |
| **Pattern** | Feature name != user mental model |
| **Why it fails** | Discovery failure |
| **Do instead** | Use user's words from research |
| **Detection** | Content lint for banned phrases, heading hierarchy audit (h1→h2) |
| **Severity** | High |

### RULE-113 — Tooltip explains obvious UI

| Field | Value |
|-------|-------|
| **ID** | RULE-113 |
| **Category** | copy |
| **Pattern** | Tooltip explains obvious UI |
| **Why it fails** | Noise; patronizing |
| **Do instead** | Tooltips for non-obvious only |
| **Severity** | Low |

### RULE-114 — Legal text in primary flow

| Field | Value |
|-------|-------|
| **ID** | RULE-114 |
| **Category** | copy |
| **Pattern** | Legal text in primary flow |
| **Why it fails** | Conversion killer |
| **Do instead** | Link to terms; don't inline walls |
| **Severity** | Medium |

### RULE-115 — Success toast with no undo

| Field | Value |
|-------|-------|
| **ID** | RULE-115 |
| **Category** | copy |
| **Pattern** | Success toast with no undo |
| **Why it fails** | Anxiety on irreversible feel |
| **Do instead** | Offer undo window when possible |
| **Severity** | Medium |

### RULE-116 — Number formatting inconsistent

| Field | Value |
|-------|-------|
| **ID** | RULE-116 |
| **Category** | copy |
| **Pattern** | Number formatting inconsistent |
| **Why it fails** | Trust erosion in financial UI |
| **Do instead** | Locale-aware formatting everywhere |
| **Detection** | Content lint for banned phrases, heading hierarchy audit (h1→h2) |
| **Severity** | High |

### RULE-117 — Date without timezone context

| Field | Value |
|-------|-------|
| **ID** | RULE-117 |
| **Category** | copy |
| **Pattern** | Date without timezone context |
| **Why it fails** | Scheduling confusion |
| **Do instead** | Show timezone or relative time |
| **Detection** | Content lint for banned phrases, heading hierarchy audit (h1→h2) |
| **Severity** | High |

### RULE-118 — Microcopy longer than necessary

| Field | Value |
|-------|-------|
| **ID** | RULE-118 |
| **Category** | copy |
| **Pattern** | Microcopy longer than necessary |
| **Why it fails** | UI feels crowded |
| **Do instead** | Cut to essential words |
| **Severity** | Medium |

### RULE-119 — Same verb for create and edit

| Field | Value |
|-------|-------|
| **ID** | RULE-119 |
| **Category** | copy |
| **Pattern** | Same verb for create and edit |
| **Why it fails** | Mode confusion |
| **Do instead** | Create X vs Edit X vs Save changes |
| **Severity** | Medium |

### RULE-120 — Marketing superlatives in product UI

| Field | Value |
|-------|-------|
| **ID** | RULE-120 |
| **Category** | copy |
| **Pattern** | Marketing superlatives in product UI |
| **Why it fails** | Credibility gap |
| **Do instead** | Factual statements in app chrome |
| **Severity** | Medium |

### RULE-121 — No clear primary action per screen

| Field | Value |
|-------|-------|
| **ID** | RULE-121 |
| **Category** | layout |
| **Pattern** | No clear primary action per screen |
| **Why it fails** | Decision paralysis |
| **Do instead** | One dominant CTA; secondary de-emphasized |
| **Detection** | Lighthouse CLS/mobile, CSS Grid/Flexbox overflow inspection |
| **Severity** | Critical |

### RULE-122 — Sidebar and content same visual weight

| Field | Value |
|-------|-------|
| **ID** | RULE-122 |
| **Category** | layout |
| **Pattern** | Sidebar and content same visual weight |
| **Why it fails** | Navigation competes with work |
| **Do instead** | De-emphasize chrome; content leads |
| **Detection** | Lighthouse CLS/mobile, CSS Grid/Flexbox overflow inspection |
| **Severity** | High |

### RULE-123 — Z-pattern broken by random alignment

| Field | Value |
|-------|-------|
| **ID** | RULE-123 |
| **Category** | layout |
| **Pattern** | Z-pattern broken by random alignment |
| **Why it fails** | Scan path lost |
| **Do instead** | Align to grid; F or Z for marketing |
| **Detection** | Lighthouse CLS/mobile, CSS Grid/Flexbox overflow inspection |
| **Severity** | High |

### RULE-124 — Critical info below fold on mobile

| Field | Value |
|-------|-------|
| **ID** | RULE-124 |
| **Category** | layout |
| **Pattern** | Critical info below fold on mobile |
| **Why it fails** | Users miss primary task |
| **Do instead** | Primary action visible without scroll |
| **Detection** | Lighthouse CLS/mobile, CSS Grid/Flexbox overflow inspection |
| **Severity** | Critical |

### RULE-125 — Tables on mobile without responsive pattern

| Field | Value |
|-------|-------|
| **ID** | RULE-125 |
| **Category** | layout |
| **Pattern** | Tables on mobile without responsive pattern |
| **Why it fails** | Horizontal scroll hell |
| **Do instead** | Card stack or priority columns |
| **Detection** | Lighthouse CLS/mobile, CSS Grid/Flexbox overflow inspection |
| **Severity** | High |

### RULE-126 — Modal wider than viewport

| Field | Value |
|-------|-------|
| **ID** | RULE-126 |
| **Category** | layout |
| **Pattern** | Modal wider than viewport |
| **Why it fails** | Broken on small screens |
| **Do instead** | Max-width 100vw - margin |
| **Detection** | Lighthouse CLS/mobile, CSS Grid/Flexbox overflow inspection |
| **Severity** | Critical |

### RULE-127 — Fixed bottom bar covers content

| Field | Value |
|-------|-------|
| **ID** | RULE-127 |
| **Category** | layout |
| **Pattern** | Fixed bottom bar covers content |
| **Why it fails** | Content inaccessible |
| **Do instead** | Padding-bottom on main = bar height |
| **Detection** | Lighthouse CLS/mobile, CSS Grid/Flexbox overflow inspection |
| **Severity** | High |

### RULE-128 — Two-column form on narrow mobile

| Field | Value |
|-------|-------|
| **ID** | RULE-128 |
| **Category** | layout |
| **Pattern** | Two-column form on narrow mobile |
| **Why it fails** | Fields too narrow |
| **Do instead** | Single column <768px |
| **Detection** | Lighthouse CLS/mobile, CSS Grid/Flexbox overflow inspection |
| **Severity** | High |

### RULE-129 — Logo larger than page headline

| Field | Value |
|-------|-------|
| **ID** | RULE-129 |
| **Category** | layout |
| **Pattern** | Logo larger than page headline |
| **Why it fails** | Brand over benefit |
| **Do instead** | Headline dominates; logo restrained |
| **Severity** | Medium |

### RULE-130 — Footer as long as main content

| Field | Value |
|-------|-------|
| **ID** | RULE-130 |
| **Category** | layout |
| **Pattern** | Footer as long as main content |
| **Why it fails** | Feels like two pages |
| **Do instead** | Compact footer; link columns |
| **Severity** | Medium |

### RULE-131 — Breadcrumb missing on deep hierarchy

| Field | Value |
|-------|-------|
| **ID** | RULE-131 |
| **Category** | layout |
| **Pattern** | Breadcrumb missing on deep hierarchy |
| **Why it fails** | Users lost in IA |
| **Do instead** | Breadcrumbs for 3+ levels |
| **Severity** | Medium |

### RULE-132 — Search hidden in menu on search-heavy app

| Field | Value |
|-------|-------|
| **ID** | RULE-132 |
| **Category** | layout |
| **Pattern** | Search hidden in menu on search-heavy app |
| **Why it fails** | Core task buried |
| **Do instead** | Persistent search in header |
| **Detection** | Lighthouse CLS/mobile, CSS Grid/Flexbox overflow inspection |
| **Severity** | High |

### RULE-133 — Inconsistent max-width across pages

| Field | Value |
|-------|-------|
| **ID** | RULE-133 |
| **Category** | layout |
| **Pattern** | Inconsistent max-width across pages |
| **Why it fails** | Site feels stitched |
| **Do instead** | One content max-width token |
| **Detection** | Lighthouse CLS/mobile, CSS Grid/Flexbox overflow inspection |
| **Severity** | High |

### RULE-134 — Floating action button overlaps content

| Field | Value |
|-------|-------|
| **ID** | RULE-134 |
| **Category** | layout |
| **Pattern** | Floating action button overlaps content |
| **Why it fails** | Blocks taps and reading |
| **Do instead** | FAB offset with safe padding |
| **Detection** | Lighthouse CLS/mobile, CSS Grid/Flexbox overflow inspection |
| **Severity** | High |

### RULE-135 — Split screen without resize handle

| Field | Value |
|-------|-------|
| **ID** | RULE-135 |
| **Category** | layout |
| **Pattern** | Split screen without resize handle |
| **Why it fails** | One pane always wrong size |
| **Do instead** | Resizable or stacked on mobile |
| **Severity** | Medium |

### RULE-136 — Dashboard widgets random order

| Field | Value |
|-------|-------|
| **ID** | RULE-136 |
| **Category** | layout |
| **Pattern** | Dashboard widgets random order |
| **Why it fails** | No information priority |
| **Do instead** | Rank by user task frequency |
| **Detection** | Lighthouse CLS/mobile, CSS Grid/Flexbox overflow inspection |
| **Severity** | High |

### RULE-137 — Marketing nav in app shell

| Field | Value |
|-------|-------|
| **ID** | RULE-137 |
| **Category** | layout |
| **Pattern** | Marketing nav in app shell |
| **Why it fails** | Context switch confusion |
| **Do instead** | Separate app nav pattern |
| **Detection** | Lighthouse CLS/mobile, CSS Grid/Flexbox overflow inspection |
| **Severity** | High |

### RULE-138 — Inline edit without save affordance

| Field | Value |
|-------|-------|
| **ID** | RULE-138 |
| **Category** | layout |
| **Pattern** | Inline edit without save affordance |
| **Why it fails** | Users unsure if saved |
| **Do instead** | Explicit save or autosave indicator |
| **Detection** | Lighthouse CLS/mobile, CSS Grid/Flexbox overflow inspection |
| **Severity** | High |

### RULE-139 — Pagination when infinite scroll expected

| Field | Value |
|-------|-------|
| **ID** | RULE-139 |
| **Category** | layout |
| **Pattern** | Pagination when infinite scroll expected |
| **Why it fails** | Pattern mismatch for content type |
| **Do instead** | Match feed pattern to content |
| **Severity** | Medium |

### RULE-140 — Empty sidebar on wide screens

| Field | Value |
|-------|-------|
| **ID** | RULE-140 |
| **Category** | layout |
| **Pattern** | Empty sidebar on wide screens |
| **Why it fails** | Wasted space or broken layout |
| **Do instead** | Collapse or use for secondary nav |
| **Severity** | Low |

### RULE-141 — Pure black #000 background

| Field | Value |
|-------|-------|
| **ID** | RULE-141 |
| **Category** | dark-mode |
| **Pattern** | Pure black #000 background |
| **Why it fails** | Halation on OLED; harsh |
| **Do instead** | Use dark gray (#0a0a0a - #121212) |
| **Detection** | axe-core `target-size`, CSS `min-height`/`min-width` audit, `lint-design-rules.mjs` RULE-001–020 |
| **Severity** | High |

### RULE-142 — White text on dark without dimming

| Field | Value |
|-------|-------|
| **ID** | RULE-142 |
| **Category** | dark-mode |
| **Pattern** | White text on dark without dimming |
| **Why it fails** | Eye strain; too bright |
| **Do instead** | Use zinc-100/200 not pure white |
| **Detection** | axe-core `target-size`, CSS `min-height`/`min-width` audit, `lint-design-rules.mjs` RULE-001–020 |
| **Severity** | High |

### RULE-143 — Shadows invisible in dark mode

| Field | Value |
|-------|-------|
| **ID** | RULE-143 |
| **Category** | dark-mode |
| **Pattern** | Shadows invisible in dark mode |
| **Why it fails** | Elevation lost |
| **Do instead** | Use border or lighter surface step |
| **Detection** | axe-core `target-size`, CSS `min-height`/`min-width` audit, `lint-design-rules.mjs` RULE-001–020 |
| **Severity** | High |

### RULE-144 — Images not dimmed in dark mode

| Field | Value |
|-------|-------|
| **ID** | RULE-144 |
| **Category** | dark-mode |
| **Pattern** | Images not dimmed in dark mode |
| **Why it fails** | Bright spots blind users |
| **Do instead** | Slight opacity or dark overlay on imgs |
| **Severity** | Medium |

### RULE-145 — Same border token as light mode

| Field | Value |
|-------|-------|
| **ID** | RULE-145 |
| **Category** | dark-mode |
| **Pattern** | Same border token as light mode |
| **Why it fails** | Borders disappear or glare |
| **Do instead** | Separate dark border token |
| **Detection** | axe-core `target-size`, CSS `min-height`/`min-width` audit, `lint-design-rules.mjs` RULE-001–020 |
| **Severity** | High |

### RULE-146 — Charts use light-mode palette

| Field | Value |
|-------|-------|
| **ID** | RULE-146 |
| **Category** | dark-mode |
| **Pattern** | Charts use light-mode palette |
| **Why it fails** | Illegible on dark bg |
| **Do instead** | Dark-mode chart token set |
| **Detection** | axe-core `target-size`, CSS `min-height`/`min-width` audit, `lint-design-rules.mjs` RULE-001–020 |
| **Severity** | High |

### RULE-147 — Code blocks unchanged in dark

| Field | Value |
|-------|-------|
| **ID** | RULE-147 |
| **Category** | dark-mode |
| **Pattern** | Code blocks unchanged in dark |
| **Why it fails** | Blinding white boxes |
| **Do instead** | Dark syntax theme in dark mode |
| **Detection** | axe-core `target-size`, CSS `min-height`/`min-width` audit, `lint-design-rules.mjs` RULE-001–020 |
| **Severity** | High |

### RULE-148 — Toggle doesn't persist preference

| Field | Value |
|-------|-------|
| **ID** | RULE-148 |
| **Category** | dark-mode |
| **Pattern** | Toggle doesn't persist preference |
| **Why it fails** | User re-selects every visit |
| **Do instead** | localStorage or system + override |
| **Detection** | axe-core `target-size`, CSS `min-height`/`min-width` audit, `lint-design-rules.mjs` RULE-001–020 |
| **Severity** | High |

### RULE-149 — Flash of light theme on load

| Field | Value |
|-------|-------|
| **ID** | RULE-149 |
| **Category** | dark-mode |
| **Pattern** | Flash of light theme on load |
| **Why it fails** | Jarring FOUC |
| **Do instead** | Inline script or CSS default dark |
| **Detection** | axe-core `target-size`, CSS `min-height`/`min-width` audit, `lint-design-rules.mjs` RULE-001–020 |
| **Severity** | High |

### RULE-150 — Icons designed for light only

| Field | Value |
|-------|-------|
| **ID** | RULE-150 |
| **Category** | dark-mode |
| **Pattern** | Icons designed for light only |
| **Why it fails** | Icons vanish on dark |
| **Do instead** | SVG currentColor or dual assets |
| **Detection** | axe-core `target-size`, CSS `min-height`/`min-width` audit, `lint-design-rules.mjs` RULE-001–020 |
| **Severity** | High |

### RULE-151 — Elevation via shadow only

| Field | Value |
|-------|-------|
| **ID** | RULE-151 |
| **Category** | dark-mode |
| **Pattern** | Elevation via shadow only |
| **Why it fails** | Flat mush in dark UI |
| **Do instead** | Surface step + subtle border |
| **Severity** | Medium |

### RULE-152 — Accent too saturated on dark

| Field | Value |
|-------|-------|
| **ID** | RULE-152 |
| **Category** | dark-mode |
| **Pattern** | Accent too saturated on dark |
| **Why it fails** | Neon glow; unprofessional |
| **Do instead** | Desaturate accent 10-20% for dark |
| **Severity** | Medium |

### RULE-153 — Form inputs same as page bg

| Field | Value |
|-------|-------|
| **ID** | RULE-153 |
| **Category** | dark-mode |
| **Pattern** | Form inputs same as page bg |
| **Why it fails** | Fields invisible |
| **Do instead** | Input surface one step lighter |
| **Detection** | axe-core `target-size`, CSS `min-height`/`min-width` audit, `lint-design-rules.mjs` RULE-001–020 |
| **Severity** | Critical |

### RULE-154 — Scrollbar unthemed

| Field | Value |
|-------|-------|
| **ID** | RULE-154 |
| **Category** | dark-mode |
| **Pattern** | Scrollbar unthemed |
| **Why it fails** | Light scrollbar in dark app |
| **Do instead** | Theme scrollbar-color |
| **Severity** | Low |

### RULE-155 — Modal scrim too transparent in dark

| Field | Value |
|-------|-------|
| **ID** | RULE-155 |
| **Category** | dark-mode |
| **Pattern** | Modal scrim too transparent in dark |
| **Why it fails** | Background competes |
| **Do instead** | Darker scrim in dark mode |
| **Severity** | Medium |

### RULE-156 — Placeholder contrast fails in dark

| Field | Value |
|-------|-------|
| **ID** | RULE-156 |
| **Category** | dark-mode |
| **Pattern** | Placeholder contrast fails in dark |
| **Why it fails** | Fields look empty/broken |
| **Do instead** | Test placeholder pairs in dark |
| **Detection** | axe-core `color-contrast`, Lighthouse `color-contrast`, Chrome DevTools contrast ratio panel |
| **Severity** | High |

### RULE-157 — Status badges light-mode only

| Field | Value |
|-------|-------|
| **ID** | RULE-157 |
| **Category** | dark-mode |
| **Pattern** | Status badges light-mode only |
| **Why it fails** | Semantic colors wrong on dark |
| **Do instead** | Dark variants for success/warn/error |
| **Detection** | axe-core `target-size`, CSS `min-height`/`min-width` audit, `lint-design-rules.mjs` RULE-001–020 |
| **Severity** | High |

### RULE-158 — Divider lines too bright

| Field | Value |
|-------|-------|
| **ID** | RULE-158 |
| **Category** | dark-mode |
| **Pattern** | Divider lines too bright |
| **Why it fails** | Visual noise |
| **Do instead** | Subtle divider token (white/10) |
| **Severity** | Medium |

### RULE-159 — Logo doesn't have dark variant

| Field | Value |
|-------|-------|
| **ID** | RULE-159 |
| **Category** | dark-mode |
| **Pattern** | Logo doesn't have dark variant |
| **Why it fails** | Logo box or wrong colors |
| **Do instead** | SVG or dark logo asset |
| **Severity** | Medium |

### RULE-160 — Map/embed widgets light-only

| Field | Value |
|-------|-------|
| **ID** | RULE-160 |
| **Category** | dark-mode |
| **Pattern** | Map/embed widgets light-only |
| **Why it fails** | Bright rectangles in dark UI |
| **Do instead** | Dark map style or container mask |
| **Severity** | Medium |


---

## Feeling & Interaction Integrity

These rules operationalize [../references/apple-feel.md](../references/apple-feel.md). They focus on causality, control, continuity, feedback, trust, and performance rather than visual resemblance.

### RULE-161 — Mechanism with no user intent
| Field | Value |
|---|---|
| **ID** | RULE-161 |
| **Category** | feeling-interaction |
| **Pattern** | Blur, motion, depth, shape, or novelty added with no stated user intent |
| **Why it fails** | Surface style becomes the goal; the treatment cannot explain what it helps the user understand or do |
| **Do instead** | Name Intent → Mechanism → Feeling before keeping the treatment |
| **Severity** | Medium |

### RULE-162 — Non-interruptible spatial transition
| Field | Value |
|---|---|
| **ID** | RULE-162 |
| **Category** | feeling-interaction |
| **Pattern** | User input is ignored while a sheet, route, panel, or shared-element animation finishes |
| **Why it fails** | Breaks perceived control and makes animation feel like latency |
| **Do instead** | Allow cancellation/retargeting or never let visual completion block the next valid action |
| **Severity** | High |

### RULE-163 — Important action exists only as hidden gesture
| Field | Value |
|---|---|
| **ID** | RULE-163 |
| **Category** | feeling-interaction |
| **Pattern** | Swipe, drag, long-press, hover, or keyboard shortcut is the only route to an important action |
| **Why it fails** | Hidden grammar damages discoverability and excludes input modes |
| **Do instead** | Keep the gesture as acceleration but provide a visible operable alternative |
| **Severity** | High |

### RULE-164 — Drag does not preserve directness
| Field | Value |
|---|---|
| **ID** | RULE-164 |
| **Category** | feeling-interaction |
| **Pattern** | Dragged object visibly lags, jumps away from the pointer, or moves by a disconnected canned animation |
| **Why it fails** | Breaks direct manipulation and perceived causality |
| **Do instead** | Track input directly unless resistance communicates a real constraint |
| **Severity** | High |

### RULE-165 — Release motion ignores meaningful gesture velocity
| Field | Value |
|---|---|
| **ID** | RULE-165 |
| **Category** | feeling-interaction |
| **Pattern** | Gesture-driven object always settles identically regardless of release velocity |
| **Why it fails** | Physical response feels disconnected from user input |
| **Do instead** | Hand release velocity into settling or projection when the destination model supports momentum |
| **Severity** | Medium |

### RULE-166 — Spring applied to every transition
| Field | Value |
|---|---|
| **ID** | RULE-166 |
| **Category** | feeling-interaction |
| **Pattern** | Color, opacity, layout, hover, tooltips, and routes all use the same spring |
| **Why it fails** | Physics becomes decoration rather than a model of mass or continuity |
| **Do instead** | Use springs for spatial, mass, and gesture behavior; use timing curves or instant state for simple changes |
| **Severity** | Medium |

### RULE-167 — Reduced motion destroys state comprehension
| Field | Value |
|---|---|
| **ID** | RULE-167 |
| **Category** | feeling-interaction |
| **Pattern** | Reduced-motion mode removes the only cue that state, focus, hierarchy, or completion changed |
| **Why it fails** | Accessibility fallback removes information instead of reducing motion |
| **Do instead** | Replace large movement with instant, opacity, or static cues that preserve meaning |
| **Severity** | Critical |

### RULE-168 — Translucent foreground has backdrop-dependent contrast
| Field | Value |
|---|---|
| **ID** | RULE-168 |
| **Category** | feeling-interaction |
| **Pattern** | Text or icons on glass can pass or fail contrast depending on content scrolling behind |
| **Why it fails** | Legibility becomes nondeterministic |
| **Do instead** | Add tint, scrim, or opaque material strong enough to guarantee readable foreground |
| **Severity** | Critical |

### RULE-169 — Backdrop blur has no opaque fallback
| Field | Value |
|---|---|
| **ID** | RULE-169 |
| **Category** | feeling-interaction |
| **Pattern** | Component depends on backdrop-filter with no supported fallback |
| **Why it fails** | Unsupported or expensive environments lose hierarchy or legibility |
| **Do instead** | Define an opaque semantic surface first; enhance with translucency conditionally |
| **Severity** | High |

### RULE-170 — Glass stacked on glass
| Field | Value |
|---|---|
| **ID** | RULE-170 |
| **Category** | feeling-interaction |
| **Pattern** | Multiple translucent materials overlap inside the same local hierarchy |
| **Why it fails** | Depth becomes ambiguous; contrast and GPU cost become unpredictable |
| **Do instead** | Keep one material layer and use solid subordinate surfaces |
| **Severity** | High |

### RULE-171 — Animation blocks useful input
| Field | Value |
|---|---|
| **ID** | RULE-171 |
| **Category** | feeling-interaction |
| **Pattern** | Controls, pointer events, or navigation are disabled only to protect an animation |
| **Why it fails** | Visual polish takes precedence over agency |
| **Do instead** | Make the animation interruptible or decouple interaction availability from visual completion |
| **Severity** | High |

### RULE-172 — Fake determinate progress
| Field | Value |
|---|---|
| **ID** | RULE-172 |
| **Category** | feeling-interaction |
| **Pattern** | UI shows invented percentages or progress unrelated to measurable work |
| **Why it fails** | Simulated certainty damages trust when timing diverges |
| **Do instead** | Use honest indeterminate status or derive progress from real units |
| **Severity** | High |

### RULE-173 — Loading state changes final geometry
| Field | Value |
|---|---|
| **ID** | RULE-173 |
| **Category** | feeling-interaction |
| **Pattern** | Skeleton or spinner collapses, expands, or materially shifts the final content region |
| **Why it fails** | Spatial instability hurts confidence and perceived performance |
| **Do instead** | Reserve final geometry or use a loading representation that predicts it |
| **Severity** | High |

### RULE-174 — Irreversible action has no consequence framing
| Field | Value |
|---|---|
| **ID** | RULE-174 |
| **Category** | feeling-interaction |
| **Pattern** | Destructive or high-cost action executes without undo or explicit confirmation of object and consequence |
| **Why it fails** | Removes control and safety |
| **Do instead** | Prefer undo when reversible; otherwise confirm with specific consequence language |
| **Severity** | Critical |

### RULE-175 — Complex workflow trapped in oversized modal
| Field | Value |
|---|---|
| **ID** | RULE-175 |
| **Category** | feeling-interaction |
| **Pattern** | Multi-step or navigational workflow is forced into a modal solely to preserve the underlying page |
| **Why it fails** | Modality becomes architecture; history, focus, and recovery get fragile |
| **Do instead** | Use a dedicated route when the task has its own navigation or state model |
| **Severity** | High |

### RULE-176 — Actionable error exists only in transient toast
| Field | Value |
|---|---|
| **ID** | RULE-176 |
| **Category** | feeling-interaction |
| **Pattern** | Error requiring action disappears automatically with no persistent recovery affordance |
| **Why it fails** | Users can miss the only explanation and recovery path |
| **Do instead** | Keep actionable error inline or persistent until resolved or dismissed |
| **Severity** | Critical |

### RULE-177 — Cancel, dismiss, skip, and Not now treated as synonyms
| Field | Value |
|---|---|
| **ID** | RULE-177 |
| **Category** | feeling-interaction |
| **Pattern** | Secondary action label hides whether work is discarded, a prompt deferred, or an optional step skipped |
| **Why it fails** | Ambiguous consequence undermines confidence |
| **Do instead** | Use the verb that matches the actual state transition |
| **Severity** | Medium |

### RULE-178 — Celebration on routine action
| Field | Value |
|---|---|
| **ID** | RULE-178 |
| **Category** | feeling-interaction |
| **Pattern** | Confetti, glow, sound, or elaborate success motion appears on ordinary repeated actions |
| **Why it fails** | Delight becomes noise and slows habitual work |
| **Do instead** | Reserve signature moments for meaningful milestones; routine success gets quiet confirmation |
| **Severity** | Medium |

### RULE-179 — Apple surface imitation overrides web convention
| Field | Value |
|---|---|
| **ID** | RULE-179 |
| **Category** | feeling-interaction |
| **Pattern** | UI copies Apple-specific visual or control forms where familiar web behavior would be clearer |
| **Why it fails** | Apple cosplay substitutes resemblance for usability |
| **Do instead** | Transfer the intent—clarity, continuity, control, feedback—not proprietary-looking surface treatment |
| **Severity** | High |

### RULE-180 — Performance regression dismissed as polish cost
| Field | Value |
|---|---|
| **ID** | RULE-180 |
| **Category** | feeling-interaction |
| **Pattern** | Blur, scroll choreography, motion, or media measurably degrades responsiveness on target hardware |
| **Why it fails** | Perceived control and premium craft collapse when the interface stalls |
| **Do instead** | Reduce effect cost or provide a cheaper fallback; treat performance as a design requirement |
| **Severity** | Critical |
