# Apple Ultra: Design Reference (200+ Rules)

> Cross-reference: [SKILL.md](../SKILL.md) Section 3. Load when Design Ultra-Mode is active.

---

## 1. Design System Architecture (30 Rules)

1. ⚡ Three-layer token hierarchy: primitive → semantic → component. Never skip semantic.
2. 🎯 Primitive tokens: `--blue-500: oklch(60% 0.15 250)`. Raw values, no meaning.
3. 🎯 Semantic tokens: `--color-action: var(--blue-500)`. Meaning, swappable per theme.
4. 🎯 Component tokens: `--button-bg: var(--color-action)`. Component-specific overrides.
5. 💡 Version design tokens independently from components — breaking token change ≠ breaking component API.
6. 🎯 Component API: max 3 variant props, rest via composition or children.
7. ⚡ Document every component: purpose, props, states, accessibility notes, do/don't examples.
8. 🎯 Figma-to-code: 1:1 token mapping — Figma variables map to CSS custom properties.
9. 💡 Design system changelog: breaking changes require migration guide.
10. 🎯 Component status labels: experimental → stable → deprecated → removed.
11. 🎯 Storybook (or equivalent) as living documentation — every component, every state, every theme.
12. ⚡ Accessibility notes in every component doc: keyboard behavior, ARIA roles, screen reader text.
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
26. ⚡ No component should require >5 props for basic usage — sensible defaults for everything.
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
10. ⚡ Icons always paired with text labels for primary actions — icon-only for secondary/tertiary with tooltip.
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
21. 🎯 Avatar sizes on consistent scale: 24, 32, 40, 48, 64px — never arbitrary.
22. 💡 Badge/chip design: pill shape for counts, rounded rectangle for status labels.
23. 🎯 Divider usage: sparingly. Whitespace separates better than lines in most layouts.
24. 🎯 When dividers needed: 1px, semantic color token `--color-border-subtle`, full-width or inset.
25. 💡 Inset dividers (with left margin) for nested list items — full-width for section breaks.
26. 🎯 Toolbar/action bar: primary action right-aligned (F-pattern endpoint), destructive left or hidden in menu.
27. ⚡ Destructive actions: red text/button, confirmation dialog, never one-click delete.
28. 🎯 Breadcrumbs for navigation depth >2 — not needed for flat IA.
29. 💡 Progress indicators: determinate (percentage) when duration known, indeterminate (spinner) when unknown.
30. 🎯 Step indicators: numbered for sequential flows, checkmarks for completed steps.
31. 🎯 Notification hierarchy: toast (auto-dismiss) < banner (dismissible) < modal (requires action).
32. 💡 Toast position: bottom-right for confirmations, top-center for errors — consistent per product.
33. 🎯 Search UI: magnifying glass icon left, clear button right, keyboard shortcut hint (⌘K).
34. 🎯 Filter UI: chips for active filters with × to remove, "Clear all" when >2 active.
35. 💡 Sidebar navigation: icons + labels expanded, icons-only collapsed with tooltips.
36. 🎯 Tab design: underline for primary tabs, pill/chip for secondary/filter tabs.
37. ⚡ Active tab must be visually distinct by more than color alone — weight, underline, or background.
38. 🎯 Table design: left-align text, right-align numbers, consistent row height, zebra optional.
39. 💡 Sticky table headers for scrollable data — user always knows column context.
40. 🎯 Responsive tables: card layout on mobile, horizontal scroll as last resort with scroll indicator.

---

## 3. Typography (30 Rules)

1. 🎯 Base font size: 16px. Never below 14px for body text.
2. ⚡ Line height: 1.5 for body, 1.2-1.3 for headings, 1.6-1.75 for long-form prose.
3. 🎯 Max line length: 60-75 characters (≈45-65rem at 16px). Use `max-width: 65ch`.
4. 💡 Optimal line length for code: 80-100 characters — match editor config.
5. 🎯 Type scale ratio 1.25 (Major Third): 12, 14, 16, 20, 24, 32, 40, 48, 64px.
6. 🎯 Limit to 3 heading sizes per page section — more creates hierarchy confusion.
7. 💡 Display/hero text: 48-64px, tight line-height (1.1), letter-spacing -0.02em.
8. 🎯 Font weight scale: 400 (regular), 500 (medium), 600 (semibold), 700 (bold). Skip 300 and 800.
9. ⚡ Never use font weight below 400 for text on screens — thin weights fail on low-DPI displays.
10. 🎯 `font-feature-settings: 'tnum' 1` for tabular numbers in tables and prices.
11. 💡 `font-variant-numeric: proportional-nums` for body text — tabular only in data contexts.
12. 🎯 Letter-spacing: 0 for body, -0.01 to -0.03em for large headings, +0.05em for uppercase labels.
13. 🎯 Uppercase text: only for labels/badges <3 words. Never for body text or headings.
14. 💡 Small caps (`font-variant-caps: all-small-caps`) for elegant label treatment.
15. 🎯 Font loading: `font-display: swap` always. Preload only critical weight.
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
28. 🎯 Link styling: underline by default, color change on hover. Never underline + color-only distinction.
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
9. ⚡ Error red must not be the brand red — users confuse brand with error states.
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
26. 🎯 Status dot colors: 8px circle, paired with text label — never color-only status.
27. 💡 Heat maps: sequential palette (light→dark single hue) for magnitude, diverging for +/- data.
28. 🎯 Transparent colors: `oklch(60% 0.15 250 / 0.1)` — alpha in oklch, not separate opacity.
29. ⚡ Print styles: force high contrast, remove background colors, ensure text is black.
30. 🎯 High contrast mode: respect `forced-colors` media query — don't override system colors.

---

## 5. Motion (30 Rules)

1. ⚡ Never `linear` easing for UI — use `ease-out` for enter, `ease-in` for exit.
2. 🎯 Standard easing: `cubic-bezier(0.4, 0, 0.2, 1)` (Material standard) as default.
3. 💡 Emphasized easing: `cubic-bezier(0.2, 0, 0, 1)` for important transitions.
4. 🎯 Duration scale: 100ms (micro), 200ms (state), 300ms (component), 500ms (page).
5. ⚡ `@media (prefers-reduced-motion: reduce)` — disable all non-essential animation globally.
6. 🎯 Hover transitions: 150ms ease-out on color, background, transform — not all properties at once.
7. 💡 Scale on hover: `transform: scale(1.02)` max — more feels gimmicky. Cards and buttons only.
8. 🎯 Press/active state: `transform: scale(0.98)` with 100ms — tactile feedback.
9. 🎯 Modal enter: fade + scale from 0.95 (200ms ease-out). Exit: fade only (150ms ease-in).
10. 💡 Drawer enter: slide from edge (300ms ease-out). Exit: slide back (200ms ease-in).
11. 🎯 Toast enter: slide up + fade (200ms). Exit: fade out (150ms). Auto-dismiss after 5s.
12. 🎯 Page transition: crossfade 300ms or slide 400ms — never both simultaneously.
13. 💡 Stagger children: 30-50ms delay per item in lists/grids — `animation-delay: calc(var(--i) * 40ms)`.
14. 🎯 Skeleton shimmer: 1.5s infinite linear gradient sweep — respects reduced motion (static gray).
15. 🎯 Loading spinner: 0.8-1s rotation, ease-in-out — not frantic 0.3s spins.
16. 💡 Progress bar: indeterminate animation 1.5s, determinate uses CSS transition on width.
15. 🎯 Accordion: height transition with `overflow: hidden` — or use `grid-template-rows: 0fr → 1fr` trick.
18. 💡 Number counter animation: count up over 500ms for stats/metrics — delight without distraction.
19. 🎯 Parallax: max 20% speed difference — more causes motion sickness.
20. ⚡ No autoplay video animations — user controls or intersection-observer triggered only.
21. 🎯 Scroll-triggered animations: `IntersectionObserver` threshold 0.2 — animate once, not on every scroll.
22. 💡 Spring animations (framer-motion): stiffness 300, damping 30 for UI elements.
23. 🎯 Drag interactions: follow cursor at 1:1, snap with 200ms spring on release.
24. 🎯 Tooltip delay: 300ms show, 0ms hide — prevents tooltip spam on mouse movement.
25. 💡 Focus ring animation: instant appearance, no transition — accessibility requires immediate feedback.
26. 🎯 Collapse/expand icon rotation: 200ms ease-out, 90° or 180° — consistent direction per product.
27. 🎯 Tab indicator slide: 200ms ease-out following active tab — underline or background pill.
28. 💡 Celebration animations (confetti, checkmark draw): 1-2s max, once per action — not on every click.
29. 🎯 Error shake: 3px horizontal, 3 cycles, 300ms — signals invalid input without being aggressive.
30. ⚡ Performance: animate only `transform` and `opacity` — never `width`, `height`, `top`, `left`.

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
2. 🎯 Loading state: skeleton or spinner matching final dimensions — never blank space.
3. 🎯 Error state: red border + icon + message below — never color-only indication.
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
17. 🎯 Overflow state: "Show more" or scroll with fade indicator — never silently clip content.
18. 💡 Stale data: "Last updated 5 minutes ago" with refresh button — transparent freshness.
19. 🎯 Validation: inline on blur, summary on submit — field-level + form-level errors.
20. ⚡ Focus state must be visible in every other state — hover + focus, disabled + focus-visible.
