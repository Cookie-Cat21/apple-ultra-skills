# Apple Ultra: Accessibility Reference (Full WCAG 2.2 AA)

> Cross-reference: [SKILL.md](../SKILL.md) Section 8. Complete audit checklist.

---

## 1. Perceivable (25 Rules)

### Text Alternatives (1.1)

1. ⚡ Every `<img>` has `alt` — descriptive for informative, `alt=""` for decorative.
2. 🎯 Informative alt describes content/function: "Chart showing Q3 revenue grew 40%" not "graph.png".
3. 💡 Complex images: short alt + long description via `aria-describedby` or `<figcaption>`.
4. 🎯 Icon-only buttons: `aria-label` describing the action — "Close dialog" not "X".
5. ⚡ SVG icons: `<title>` element or `aria-label` on parent — SVGs are images to screen readers.

### Time-based Media (1.2)

6. 🎯 Video with speech: captions (1.2.2 AA). Audio-only: transcript.
7. 💡 Auto-playing video: muted by default, pause control visible, respects `prefers-reduced-motion`.

### Adaptable (1.3)

8. ⚡ Semantic HTML: `<button>` for actions, `<a>` for navigation, `<h1>-<h6>` for headings.
9. 🎯 Heading hierarchy: one `<h1>` per page, no skipped levels.
10. 🎯 Form labels: `<label htmlFor={id}>` associated with every input.
11. 💡 Data tables: `<th scope="col|row">`, `<caption>` for description.
12. 🎯 Lists: `<ul>`, `<ol>`, `<dl>` — not divs styled as lists.
13. ⚡ Reading order matches visual order — CSS `order` doesn't change screen reader order.
14. 🎯 `aria-hidden="true"` on decorative elements — icons next to visible text.

### Distinguishable (1.4)

15. ⚡ Color contrast: 4.5:1 normal text, 3:1 large text (18px+ or 14px+ bold).
16. 🎯 UI component contrast: 3:1 against adjacent colors (borders, icons, focus indicators).
17. ⚡ Never color-only differentiation — pair with shape, icon, pattern, or text label.
18. 🎯 Text resizable to 200% without loss of content or functionality.
19. 💡 `prefers-contrast: more` — increase contrast for users who request it.
20. 🎯 No content that flashes >3 times per second (seizure risk).
21. 🎯 `scroll-margin-top` on anchor targets — account for sticky headers.
22. 💡 `text-wrap: pretty` — better line breaking reduces widows/orphans.
23. 🎯 Non-text contrast (1.4.11): UI controls and graphics 3:1 against background.
24. 🎯 Reflow (1.4.10): content usable at 320px width without horizontal scrolling.
25. ⚡ `user-scalable` not disabled in viewport meta — users must be able to zoom.

---

## 2. Operable (25 Rules)

### Keyboard Accessible (2.1)

1. ⚡ Every interactive element reachable and operable by keyboard alone.
2. 🎯 Tab order follows visual/logical order — no `tabindex` > 0.
3. 🎯 `tabindex="0"` only to make non-interactive elements focusable (custom widgets).
4. ⚡ `tabindex="-1"` for programmatic focus (skip links, modal focus) — not in tab order.
5. 🎯 Enter/Space activates buttons. Enter activates links. Space toggles checkboxes.
6. 💡 Custom widgets: implement ARIA keyboard patterns (combobox, tabs, menu, dialog).
7. ⚡ No keyboard trap — user can always Tab away, except intentional modal focus trap.

### Enough Time (2.2)

8. 🎯 Session timeout warning: alert user 2 minutes before expiry with extend option.
9. 💡 Auto-advancing content (carousels): pause button, respects `prefers-reduced-motion`.

### Seizures (2.3)

10. ⚡ No flashing content >3 times per second. Animation respects `prefers-reduced-motion`.

### Navigable (2.4)

11. 🎯 Skip navigation link as first focusable element: `<a href="#main">Skip to content</a>`.
12. ⚡ Page `<title>` describes page purpose — unique per page, not just site name.
13. 🎯 Focus order preserves meaning and operability.
14. 🎯 Link purpose clear from text or context — "Read privacy policy" not "click here".
15. 💡 Multiple ways to find content: navigation, search, sitemap.
16. 🎯 Headings and labels describe topic or purpose.
17. 🎯 Focus visible at all times — custom `:focus-visible` style, never `outline: none` without replacement.
18. ⚡ Focus indicator: 3:1 contrast against background, minimum 2px thick.

### Input Modalities (2.5)

19. ⚡ Touch targets: 44×44px minimum (WCAG 2.5.8) — add padding, not just visual size.
20. 🎯 Pointer gestures have single-pointer alternative — no path-based gestures required.
21. 💡 `touch-action: manipulation` — prevents double-tap zoom delay on buttons.
22. 🎯 Label in name (2.5.3): visible label text appears in accessible name.
23. 🎯 Target size (2.5.8): 24×24px minimum with spacing, 44×44px recommended.

---

## 3. Understandable (20 Rules)

### Readable (3.1)

1. 🎯 `<html lang="en">` on every page. Foreign phrases: `lang` attribute.
2. 💡 Unusual words, abbreviations: provide definition on first use or via `<abbr title>`.

### Predictable (3.2)

3. 🎯 Focus doesn't trigger unexpected context changes — no auto-submit on focus.
4. 🎯 Input doesn't trigger unexpected context changes — no auto-navigate on select.
5. 💡 Consistent navigation across pages — same position, same items.
6. 🎯 Consistent identification — same icon/label for same function across site.

### Input Assistance (3.3)

7. ⚡ Form errors identified in text — not color-only. `aria-invalid="true"` on invalid fields.
8. 🎯 Error messages associated via `aria-describedby` — screen reader announces error.
9. 🎯 Error suggestions provided when possible — "Email must include @".
10. 💡 Labels and instructions before input — not just placeholder text.
11. ⚡ Legal/financial transactions: confirm before submit, review before final, reversible when possible.
12. 🎯 Required fields marked with `aria-required="true"` and visible indicator.
13. 🎯 Autocomplete attributes: `autocomplete="email"`, `autocomplete="current-password"`.
14. 💡 Help text via `aria-describedby` — associated with input, announced on focus.

---

## 4. Robust (10 Rules)

1. ⚡ Valid HTML — no duplicate IDs, proper nesting, closed tags.
2. 🎯 ARIA roles, states, properties correct — use semantic HTML first, ARIA when insufficient.
3. 💡 First rule of ARIA: don't use ARIA if native HTML element exists.
4. 🎯 `role="status"` for success messages, `role="alert"` for errors — live regions.
5. ⚡ `aria-live="polite"` for non-urgent updates, `aria-live="assertive"` for urgent errors.
6. 🎯 `aria-atomic="true"` when entire region should be announced on change.
7. 💡 `aria-expanded`, `aria-selected`, `aria-checked` — reflect current state.
8. 🎯 Custom components: correct role + keyboard interaction + state management.
9. ⚡ Test with accessibility API — browser DevTools Accessibility panel.
10. 🎯 Status messages (4.1.3): success/error communicated to assistive tech without focus change.

---

## 5. Component ARIA Patterns

### Dialog/Modal

1. ⚡ `role="dialog"`, `aria-modal="true"`, `aria-labelledby` pointing to title.
2. 🎯 Focus trap while open — Tab cycles within modal.
3. 🎯 Return focus to trigger element on close.
4. ⚡ Dismissible with Escape key.
5. 💡 `inert` attribute on background content when modal open.

### Menu/Dropdown

6. 🎯 `role="menu"`, items `role="menuitem"`. Arrow keys navigate, Enter selects, Escape closes.
7. 💡 `aria-haspopup="true"` on trigger, `aria-expanded` reflects open state.

### Tabs

8. 🎯 `role="tablist"`, tabs `role="tab"`, panels `role="tabpanel"`.
9. 🎯 Arrow keys switch tabs, `aria-selected="true"` on active tab.

### Combobox/Select

10. 🎯 `role="combobox"`, `aria-expanded`, `aria-activedescendant` for highlighted option.

---

## 6. Testing Workflow

### Automated (CI)

1. 🎯 `@axe-core/playwright` in E2E suite — zero violations on critical pages.
2. ⚡ `eslint-plugin-jsx-a11y` in development — catch issues before commit.
3. 🎯 Lighthouse accessibility score >95 in CI.

### Manual Keyboard Test Script

4. ⚡ Tab through entire page — every interactive element reachable, focus visible.
5. 🎯 Enter/Space activates buttons and links.
6. 🎯 Escape closes modals, dropdowns, tooltips.
7. 🎯 Arrow keys work in menus, tabs, radio groups, sliders.
8. 💡 No keyboard traps outside intentional modal focus traps.

### Screen Reader Test Script

9. ⚡ VoiceOver (Mac): Cmd+F5 to enable. Navigate with VO+arrow keys.
10. 🎯 NVDA (Windows) + Firefox: free, widely used combination.
11. 🎯 Verify: page title announced, headings navigable, form labels read, errors announced.
12. 💡 What you hear IS the product for screen reader users — test before shipping.

### Audit Checklist (Per Component)

- [ ] Keyboard accessible (Tab, Enter, Escape)
- [ ] Focus visible
- [ ] Color contrast passes (4.5:1 text, 3:1 UI)
- [ ] Not color-only state indication
- [ ] ARIA roles/states correct
- [ ] Screen reader announces purpose and state
- [ ] Touch target ≥44×44px
- [ ] `prefers-reduced-motion` respected
- [ ] Error states announced
- [ ] All 5 interactive states defined (default, hover, focus, active, disabled)
