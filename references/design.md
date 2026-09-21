# Apple Ultra: Design Reference (200+ Rules)

> Cross-reference: [SKILL.md](../SKILL.md) Section 3. Load when Design Ultra-Mode is active.


> **Decision-quality note:** apply [apple-principles-2026.md](./apple-principles-2026.md). Numeric thresholds not tied to a standard, current vendor documentation, or measured project data are studio defaults/starting points—not universal facts. For version-sensitive behavior, inspect the installed version and current primary docs.
---

## 1. Design System Architecture (30 Rules)

1. 🎯 Prefer primitive → semantic → component token layers when the system is large enough to benefit. Small products can stop at semantic tokens; the key rule is that components consume meaning rather than scattered raw values.
2. 🎯 Primitive tokens: `--blue-500: oklch(60% 0.15 250)`. Raw values, no meaning.
3. 🎯 Semantic tokens: `--color-action: var(--blue-500)`. Meaning, swappable per theme.
4. 🎯 Component tokens: `--button-bg: var(--color-action)`. Component-specific overrides.
5. 💡 Version design tokens independently from components — breaking token change ≠ breaking component API.
6. 🎯 Component API: max 3 variant props, rest via composition or children.
7. 🎯 Document reusable/public components to the depth needed for correct use: purpose, API, meaningful states, accessibility behavior, and constraints. Private/simple primitives need less ceremony.
8. 🎯 Figma-to-code: 1:1 token mapping — Figma variables map to CSS custom properties.
9. 💡 Design system changelog: breaking changes require migration guide.
10. 🎯 Component status labels: experimental → stable → deprecated → removed.
11. 🎯 Maintain a living component workbench/catalog when the product has enough reusable UI to justify it. Cover critical states/themes rather than chasing exhaustive stories for trivial internals.
12. 🎯 Accessibility behavior belongs in component documentation when the component is interactive or has non-obvious semantics. Native static primitives need only their relevant constraints.
13. 🎯 Icon system: single library (Lucide, Phosphor), consistent 24px grid, 1.5px stroke.
14. 💡 Illustration style guide: flat vs 3D, color palette, character proportions — one style per product.
15. 🎯 Spacing scale: 4pt grid — 0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96px.
16. 🎯 Border radius scale: 0, 4, 8, 12, 16, 9999 (full). Max 2-3 radii per product.
17. 💡 Shadow scale tied to elevation levels 0-5 — document which components use which level.
18. 🎯 Breakpoint tokens: `--breakpoint-sm: 640px` through `--breakpoint-2xl: 1536px`.
19. ⚡ Dark mode tokens defined alongside light — not inverted programmatically.
20. 🎯 Token naming convention: `--category-property-variant` (e.g., `--color-text-secondary`).
21. 💡 Semantic naming over visual: `--color-danger` not `--color-red` — red might be brand color.
22. 🎯 Grid system: 12-column for web, 4-column for mobile. Gutter: 16px mobile, 24px desktop.
23. 🎯 Max content width: 1280px for dashboards, 720px for prose, 1440px for marketing.
24. 💡 Component composition over configuration: `<Card><Card.Header/><Card.Body/></Card>`.
25. 🎯 Slot-based APIs for flexible content areas — header, body, footer, actions.
26. 🎯 If basic usage requires many interdependent props, reconsider composition or API design. Prop count alone is not a quality metric.
27. 🎯 Error state design for every input component — inline message, icon, border color change.
28. 💡 Empty state design for every list/collection component — illustration, message, CTA.
29. 🎯 Loading state for every async component — skeleton matching final layout.
30. ⚡ Design review checklist before component ships: all states, both themes, mobile, a11y.

---

## 2. Visual Design (40 Rules)

1. 🎯 Gestalt proximity: items within 8px are perceived as grouped. Increase to 24px+ to separate groups.
2. 🎯 Gestalt similarity: same shape/color/size = same function. Don't vary appearance for same action.
3. 💡 Gestalt closure: users complete partial shapes — use for loading states and icon design.
4. 🎯 Gestalt continuity: eye follows lines and curves — use for step indicators and timelines.
5. 🎯 Visual weight: size × color saturation × contrast = attention. Balance across the viewport.
6. ⚡ One focal point per viewport section — if everything screams, nothing does.
7. 🎯 Rule of thirds for hero images and marketing layouts — key content at intersection points.
8. 💡 Golden ratio (1.618) for aspect ratios: 16:10 displays, card proportions, image crops.
9. 🎯 Icon size matches text size: 16px icon with 16px text, 20px with 20px, 24px with 24px+.
10. 🎯 Important actions need a discoverable accessible name. Visible text is usually clearest; familiar icon-only controls can work when meaning is well established and an accessible name/tooltip or equivalent aid is present.
11. 🎯 Icon consistency: filled for active/selected, outlined for inactive/default.
12. 💡 Custom icons only when stock doesn't communicate the concept — custom ≠ better.
13. 🎯 Illustration style: one per product. Mixing flat icons with 3D illustrations looks amateur.
14. 🎯 Photography: consistent color grading, aspect ratios, and subject framing across all images.
15. 💡 Data visualization: start with grayscale, add color only to encode meaning — not decoration.
16. 🎯 Chart color palette: max 6 distinguishable hues. Use patterns for colorblind accessibility.
17. ⚡ Never use red/green as the only differentiator in charts — add patterns or labels.
18. 🎯 Card design: consistent padding (16-24px), consistent border-radius, consistent shadow level.
19. 💡 Card density: compact (12px padding) for data tables, comfortable (24px) for content cards.
20. 🎯 List items: 48-56px height minimum for touch, 40px acceptable for desktop-only dense lists.
21. 🎯 Use a small consistent avatar size scale derived from density and layout; exact values belong to project tokens.
22. 💡 Badge/chip design: pill shape for counts, rounded rectangle for status labels.
23. 🎯 Divider usage: sparingly. Whitespace separates better than lines in most layouts.
24. 🎯 When dividers needed: 1px, semantic color token `--color-border-subtle`, full-width or inset.
25. 💡 Inset dividers (with left margin) for nested list items — full-width for section breaks.
26. 🎯 Toolbar/action bar: primary action right-aligned (F-pattern endpoint), destructive left or hidden in menu.
27. ⚡ Destructive actions must communicate consequence and provide appropriate recovery. Prefer undo for reversible deletion; use explicit confirmation for irreversible/high-cost deletion. Color is supporting semantics, not the safety mechanism.
28. 🎯 Use breadcrumbs when users benefit from seeing/using hierarchy, especially in deep information architectures. Route depth alone does not mandate them.
29. 💡 Progress indicators: determinate (percentage) when duration known, indeterminate (spinner) when unknown.
30. 🎯 Step indicators: numbered for sequential flows, checkmarks for completed steps.
31. 🎯 Notification hierarchy: toast (auto-dismiss) < banner (dismissible) < modal (requires action).
32. 💡 Toast position: bottom-right for confirmations, top-center for errors — consistent per product.
33. 🎯 Search UI: magnifying glass icon left, clear button right, keyboard shortcut hint (⌘K).
34. 🎯 Make active filters visible and individually reversible; provide a clear-all action when multiple filters make recovery cumbersome. Chips are one pattern, not a requirement.
35. 💡 Sidebar navigation: icons + labels expanded, icons-only collapsed with tooltips.
36. 🎯 Tab design: underline for primary tabs, pill/chip for secondary/filter tabs.
37. ⚡ Active tab must be visually distinct by more than color alone — weight, underline, or background.
38. 🎯 Table design: left-align text, right-align numbers, consistent row height, zebra optional.
39. 💡 Sticky headers can preserve column context in long tables; use them when they do not create cramped layouts, nested-scroll problems, or accessibility issues.
40. 🎯 Responsive tables: card layout on mobile, horizontal scroll as last resort with scroll indicator.

---

## 3. Typography (30 Rules)

1. 🎯 Treat ~16px body text as a strong web starting point, then tune for the typeface, density, viewport, zoom, and audience. Do not present a studio minimum as a WCAG rule.
2. ⚡ Line height: 1.5 for body, 1.2-1.3 for headings, 1.6-1.75 for long-form prose.
3. 🎯 Max line length: 60-75 characters (≈45-65rem at 16px). Use `max-width: 65ch`.
4. 💡 Optimal line length for code: 80-100 characters — match editor config.
5. 🎯 Type scale ratio 1.25 (Major Third): 12, 14, 16, 20, 24, 32, 40, 48, 64px.
6. 🎯 Limit to 3 heading sizes per page section — more creates hierarchy confusion.
7. 💡 Display/hero text: 48-64px, tight line-height (1.1), letter-spacing -0.02em.
8. 🎯 Font weight scale: 400 (regular), 500 (medium), 600 (semibold), 700 (bold). Skip 300 and 800.
9. 🎯 Avoid weights/styles that reduce legibility at the rendered size/device. Test the actual font; a numeric weight threshold is not universal across type families.
10. 🎯 `font-feature-settings: 'tnum' 1` for tabular numbers in tables and prices.
11. 💡 `font-variant-numeric: proportional-nums` for body text — tabular only in data contexts.
12. 🎯 Letter-spacing: 0 for body, -0.01 to -0.03em for large headings, +0.05em for uppercase labels.
13. 🎯 Use uppercase sparingly where the brand/semantic role supports it; avoid long uppercase passages because they can reduce readability. No fixed word-count rule is required.
14. 💡 Small caps (`font-variant-caps: all-small-caps`) for elegant label treatment.
15. 🎯 Choose font-display and preloading from layout-shift/readability/performance goals. `swap` is a strong default for many products, but metric-compatible fallbacks or other strategies can be better.
16. ⚡ Subset fonts to used character ranges — WOFF2 format only.
17. 🎯 Self-host fonts — no Google Fonts CDN in production (privacy + performance).
18. 💡 System font stack fallback: `-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`.
19. 🎯 Monospace for code: `'JetBrains Mono', 'Fira Code', ui-monospace, monospace`.
20. 🎯 Code font size: 14px (0.875rem) — slightly smaller than body is standard.
21. 💡 Ligatures in code fonts: enable for readability (`font-feature-settings: 'calt' 1`).
22. 🎯 Truncation: `text-overflow: ellipsis` with `overflow: hidden` and `white-space: nowrap`.
23. 🎯 Multi-line truncation: `-webkit-line-clamp: 3` with `display: -webkit-box`.
24. 💡 `text-wrap: balance` on headings — prevents orphaned words on last line.
25. 🎯 `text-wrap: pretty` on body paragraphs — better line breaking (CSS 2024).
26. 🎯 Paragraph spacing: 1em between paragraphs, 0.5em between list items.
27. 💡 Drop caps or first-line styling for editorial/marketing long-form content only.
28. 🎯 Links must be identifiable from surrounding text without relying on color alone when context requires it. Underlines are the strongest default in prose; navigation/toolbars can use other persistent affordances.
29. 🎯 Blockquote: left border 3px, padding-left 16px, italic or muted color — not both.
30. ⚡ `user-select: none` only on UI chrome (buttons, nav) — never on content text.

---

## 4. Color (30 Rules)

1. ⚡ Define all colors in `oklch()` — perceptually uniform, P3 gamut support.
2. 🎯 Neutral palette: 9-11 steps from near-white to near-black. Use for text, borders, backgrounds.
3. 🎯 Brand palette: 3-5 hues with 5-9 steps each. Primary, secondary, accent at minimum.
4. 💡 60-30-10 rule: 60% neutral, 30% primary, 10% accent — prevents color overload.
5. ⚡ Contrast ratios: 4.5:1 body text, 3:1 large text (18px+), 3:1 UI components (WCAG 1.4.3).
6. 🎯 Test contrast in both light and dark mode — a combo that passes in light may fail in dark.
7. 💡 Don't trust your eyes — use [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) or DevTools.
8. 🎯 Semantic color mapping: success=green, warning=amber, error=red, info=blue — universal conventions.
9. 🎯 Error treatment needs a stable semantic role distinguishable from ordinary brand emphasis. A brand can use red, but error state must remain unambiguous through context, icon/text, and tokens.
10. 🎯 Background layers: base → surface-1 → surface-2 → surface-3 (increasing elevation/lightness).
11. 💡 Tinted neutrals: add 2-3% of brand hue to gray palette — feels cohesive vs pure gray.
12. 🎯 Text hierarchy: primary (high contrast), secondary (medium), tertiary (low), disabled (lowest).
13. 🎯 Border colors: subtler than text — `--color-border-subtle` at 10-15% opacity of text color.
14. 💡 Colored shadows: tint box-shadow with brand hue at 5-10% opacity — more natural than pure black.
15. 🎯 Data visualization: use ColorBrewer or Paul Tol palettes — designed for accessibility.
16. ⚡ Never encode meaning with color alone — always add icon, pattern, or label (WCAG 1.4.1).
17. 🎯 Colorblind-safe: test with Deuteranopia and Protanopia simulation — 8% of men affected.
18. 💡 `#000` pure black on `#FFF` pure white causes halation for dyslexic readers — use off-black/off-white.
19. 🎯 Dark mode: not inverted light mode. Reduce contrast, increase surface lightness for elevation.
20. 🎯 Dark mode text: off-white (`oklch(95% 0 0)`) not pure white — reduces eye strain.
21. 💡 Dark mode saturated colors appear brighter — reduce chroma by 10-20% vs light mode equivalents.
22. 🎯 Focus ring color: high contrast against both background and component — often brand primary.
23. 🎯 Selection color: `::selection { background: var(--color-selection) }` — brand-tinted.
24. 💡 Gradient usage: one per page maximum. Subtle (5-10% lightness shift), not rainbow.
25. 🎯 Overlay/scrim: `oklch(0% 0 0 / 0.5)` for modals — 50% black, not 80%.
26. 🎯 Status indicators need non-color semantics (text/icon/shape/context). Dot size and form belong to the product’s density/token system.
27. 💡 Heat maps: sequential palette (light→dark single hue) for magnitude, diverging for +/- data.
28. 🎯 Transparent colors: `oklch(60% 0.15 250 / 0.1)` — alpha in oklch, not separate opacity.
29. ⚡ Print styles: force high contrast, remove background colors, ensure text is black.
30. 🎯 High contrast mode: respect `forced-colors` media query — don't override system colors.

---

## 5. Motion (30 Rules)

> Apply with [apple-feel.md](./apple-feel.md). These are web implementation rules, not claims about undocumented Apple constants.

1. ⚡ Every animation must explain state, continuity, hierarchy, causality, or feedback. If it does none, remove it.
2. 🎯 Write Intent → Mechanism → Feeling before tuning motion on a primary interaction.
3. 🎯 Use springs for gesture-driven, snapping, spatial, or mass-like movement; do not spring simple color/opacity by default.
4. 🎯 Use timing curves for simple property transitions where physics adds no information.
5. ⚡ Never use a single global spring preset for every component.
6. 🎯 Name spring presets by purpose (control, spatial, soft), not by arbitrary “fast/slow” alone.
7. 💡 Starting point for Motion control spring: stiffness 520, damping 40, mass 1; tune per interaction.
8. 💡 Starting point for Motion spatial spring: stiffness 360, damping 32, mass 1; tune per travel and scale.
9. 💡 Starting point for Motion soft spring: stiffness 240, damping 28, mass 1; reserve for low-urgency adaptation.
10. ⚡ These spring values are studio defaults, not claimed Apple parameters.
11. 🎯 Gesture-driven objects track pointer/touch directly unless resistance communicates a real boundary.
12. 🎯 Preserve release velocity into settling motion when momentum is meaningful.
13. ⚡ A running animation must not block the next valid user action.
14. 🎯 Retarget or cancel motion when the user reverses intent.
15. 🎯 Shared-element transitions only connect the same conceptual object across states/routes.
16. 💡 Preserve origin and destination in sheets, expanding cards, media, and selected-item transitions where it improves orientation.
17. ⚡ Hidden page/route transitions must never disguise blocked main-thread work.
18. 🎯 Press feedback is immediate; visual acknowledgement precedes network completion.
19. 🎯 Hover motion is optional enhancement; primary understanding must not depend on hover.
20. ⚡ Focus appearance is immediate and must not wait for decorative animation.
21. 🎯 Scroll-linked motion needs a narrative or spatial reason; do not animate merely because the page scrolls.
22. ⚡ Parallax, zoom, and large spatial travel require a reduced-motion alternative.
23. 🎯 In reduced motion, preserve status and hierarchy with instant changes or restrained opacity—not information loss.
24. 🎯 Repeated ambient animation should stop or remain sufficiently quiet during task-focused use.
25. 🎯 Skeletons preserve the geometry of the content they predict.
26. ⚡ Never display fake determinate progress unrelated to measurable work.
27. 🎯 Loading indicators should communicate uncertainty honestly; determinate progress only when work units are known.
28. 💡 Signature animation belongs at meaningful milestones, not routine repeated actions.
29. ⚡ Test interaction motion on target mobile hardware; blur/filter/large compositing cost is a design regression.
30. 🎯 Judge motion by the resulting feeling—control, calm, confidence, delight—not by how noticeable the animation is.
---

## 6. Responsive & Adaptive (20 Rules)

1. 🎯 Mobile-first: base styles for 320px+, enhance with `min-width` breakpoints.
2. 🎯 Breakpoints by content, not devices — if layout breaks at 700px, that's your breakpoint.
3. 💡 Standard breakpoints: 640 (sm), 768 (md), 1024 (lg), 1280 (xl), 1536 (2xl).
4. 🎯 Container queries (`@container`) for component-level responsiveness — card grids, sidebars.
5. ⚡ `dvh` units over `vh` — accounts for mobile browser chrome (address bar).
6. 🎯 `clamp(min, preferred, max)` for fluid typography and spacing — no breakpoint jumps.
7. 💡 `min()` and `max()` for responsive padding: `padding: min(5vw, 48px)`.
8. 🎯 Touch targets: 44×44px minimum on touch devices — use `@media (pointer: coarse)`.
9. 🎯 Hover effects only on devices that support hover: `@media (hover: hover)`.
10. 💡 `@media (pointer: fine)` for dense desktop layouts — smaller targets acceptable.
11. 🎯 Stack columns on mobile, side-by-side on desktop — single column is the mobile default.
12. 🎯 Navigation: hamburger menu below `md` breakpoint, horizontal nav above.
13. 💡 Bottom navigation bar on mobile for apps with 3-5 top-level sections.
14. 🎯 Responsive images: `srcset` with `w` descriptors, `sizes` attribute matching layout breakpoints.
15. 🎯 Responsive tables: card layout on mobile (each row = card), table on desktop.
16. 💡 Hide non-essential columns on tablet, show on desktop — `display: none` per breakpoint.
17. 🎯 Modal on desktop → bottom sheet on mobile — same content, adapted presentation.
18. 🎯 Form layout: single column on mobile, two-column for related short fields on desktop.
19. 💡 Landscape phone: reduce vertical padding, horizontal layout for toolbars.
20. ⚡ Test at 320px width — if it works at 320, it works everywhere.

---

## 7. Component States (20 Rules)

1. ⚡ Every interactive component defines: default, hover, focus, active, disabled — all five.
2. 🎯 Loading state should preserve context and communicate ongoing work. Choose skeleton, progress, inline status, optimistic state, or no placeholder based on expected latency and layout.
3. ⚡ Error state must be perceivable and actionable without color alone. Border/icon/message placement follows the component and accessibility semantics; associate messages programmatically.
4. 🎯 Empty state: illustration + message + primary CTA — "No items yet. Create one."
5. 🎯 Success state: brief confirmation (toast or inline checkmark) — auto-dismiss after 3s.
6. 💡 Partial success: "3 of 5 items imported" with expandable error details.
7. 🎯 Read-only state: same layout as edit, muted styling, no interactive affordances.
8. 🎯 Selected state: background change + checkmark or border — not color-only.
9. 💡 Indeterminate checkbox: dash icon, distinct from checked and unchecked.
10. 🎯 Expanded/collapsed: icon rotation + aria-expanded — content animates open/closed.
11. 🎯 Drag state: elevated shadow + reduced opacity of original — drop target highlighted.
12. 💡 Offline state: banner + cached data with stale indicator — not blank error page.
13. 🎯 Permission denied: explain what's restricted and how to get access — not generic 403.
14. 🎯 Rate limited: show retry countdown — "Try again in 30 seconds."
15. 💡 Maintenance mode: branded page with estimated return time — not raw error.
16. 🎯 First-use/onboarding: highlight key features with coach marks — dismissible, don't repeat.
17. 🎯 Make meaningful overflow discoverable and accessible. Use expansion, scroll affordance, pagination, truncation with disclosure, or another pattern that fits the content.
18. 💡 Stale data: "Last updated 5 minutes ago" with refresh button — transparent freshness.
19. 🎯 Validation: inline on blur, summary on submit — field-level + form-level errors.
20. ⚡ Focus state must be visible in every other state — hover + focus, disabled + focus-visible.
