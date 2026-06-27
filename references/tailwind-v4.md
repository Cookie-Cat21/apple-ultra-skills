# Apple Ultra: Tailwind CSS v4 Reference

> Cross-reference: [SKILL.md](../SKILL.md) Section 2 (Frontend Ultra) and Detection Matrix (`tailwind.config`, `@theme`, `@import "tailwindcss"`). Load when Tailwind v4 CSS-first config and migration gotchas exceed SKILL.md scope.

## How to use

1. **Review trigger:** Tailwind v4 migration, `@theme` tokens, `@layer` overrides, dynamic class strings, or v3→v4 utility renames.
2. **Severity:** Critical = styles missing in production build. High = visual regression or token drift. Medium = maintainability or dev/prod parity issues.
3. **Output:** `TW4-XXX | Location | Severity | Fix` in standard finding format.
4. **Pair with:** [design.md](./design.md) for token semantics, [frontend.md](./frontend.md) for component class composition.

## Rule index

| Category | Rules | IDs |
|----------|-------|-----|
| CSS-first config | 8 | TW4-001–TW4-008 |
| @layer behavior | 6 | TW4-009–TW4-014 |
| JIT & dynamic classes | 8 | TW4-015–TW4-022 |
| v3 utility renames & removals | 8 | TW4-023–TW4-030 |
| Build & tooling | 4 | TW4-031–TW4-034 |

**Total rules: 34**

---

### TW4-001 — Keeping v3 `tailwind.config.js` as sole source of theme truth

| Field | Value |
|-------|-------|
| **ID** | TW4-001 |
| **Category** | CSS-first config |
| **Pattern** | Full `theme.extend` in JS while CSS entry has only `@import "tailwindcss"` |
| **Why it fails** | v4 prefers `@theme` in CSS; JS config is optional legacy bridge — tokens may not compile as expected |
| **Do instead** | Define design tokens in CSS: `@theme { --color-brand: oklch(...); --spacing-grid: 0.25rem; }` |
| **Severity** | High |

### TW4-002 — Missing `@import "tailwindcss"` in CSS entry after v4 upgrade

| Field | Value |
|-------|-------|
| **ID** | TW4-002 |
| **Category** | CSS-first config |
| **Pattern** | `globals.css` still uses `@tailwind base/components/utilities` directives |
| **Why it fails** | v4 single import replaces three directives — utilities never generated |
| **Do instead** | ` @import "tailwindcss"; ` as first line of main CSS entry |
| **Severity** | Critical |

### TW4-003 — Custom colors in JS config not mirrored in `@theme`

| Field | Value |
|-------|-------|
| **ID** | TW4-003 |
| **Category** | CSS-first config |
| **Pattern** | `bg-brand` works in dev via PostCSS plugin reading old config; CI uses CSS-only pipeline |
| **Why it fails** | Dev/prod plugin paths diverge — brand utilities missing in production |
| **Do instead** | `@theme { --color-brand: #0066cc; }` — utilities derive from CSS variables |
| **Severity** | Critical |

### TW4-004 — `@config` path pointing to deleted or gitignored config

| Field | Value |
|-------|-------|
| **ID** | TW4-004 |
| **Category** | CSS-first config |
| **Pattern** | `@config "../../tailwind.config.ts"` after migrating theme to CSS |
| **Why it fails** | Silent fallback to defaults or build failure depending on toolchain |
| **Do instead** | Remove `@config` when fully on CSS-first; or keep one minimal config for `content` paths only |
| **Severity** | High |

### TW4-005 — Defining breakpoints only in JS `theme.screens`

| Field | Value |
|-------|-------|
| **ID** | TW4-005 |
| **Category** | CSS-first config |
| **Pattern** | `md:` works locally but custom `3xl:` missing in built CSS |
| **Why it fails** | v4 custom breakpoints belong in `@theme { --breakpoint-3xl: 120rem; }` |
| **Do instead** | Register breakpoints as theme variables; use `3xl:` after `--breakpoint-3xl` is defined |
| **Severity** | High |

### TW4-006 — Font family tokens without `--font-*` namespace

| Field | Value |
|-------|-------|
| **ID** | TW4-006 |
| **Category** | CSS-first config |
| **Pattern** | `--font-sans` defined outside `@theme` expecting `font-sans` utility |
| **Why it fails** | v4 theme namespace gates utility generation from custom properties |
| **Do instead** | `@theme { --font-sans: "Inter", ui-sans-serif, system-ui; }` |
| **Severity** | High |

### TW4-007 — Duplicating token in `@theme` and `:root` with different values

| Field | Value |
|-------|-------|
| **ID** | TW4-007 |
| **Category** | CSS-first config |
| **Pattern** | `@theme { --color-primary: blue }` and `:root { --color-primary: red }` |
| **Why it fails** | Utilities use theme layer; arbitrary `var(--color-primary)` may resolve differently |
| **Do instead** | Single source in `@theme`; use `@layer theme` overrides for dark mode variants |
| **Severity** | Medium |

### TW4-008 — Import order: component CSS before Tailwind import

| Field | Value |
|-------|-------|
| **ID** | TW4-008 |
| **Category** | CSS-first config |
| **Pattern** | `@import "./components.css"` before `@import "tailwindcss"` |
| **Why it fails** | Theme and layers not established — `@apply` in components may fail or order wrong |
| **Do instead** | Tailwind import first, then feature CSS; or use `@layer` blocks in correct order |
| **Severity** | High |

### TW4-009 — Custom base styles outside `@layer base`

| Field | Value |
|-------|-------|
| **ID** | TW4-009 |
| **Category** | @layer behavior |
| **Pattern** | Global `h1 { font-size: 2rem }` in unlayered CSS after Tailwind import |
| **Why it fails** | Unlayered CSS beats layered utilities unpredictably after v4 cascade changes |
| **Do instead** | `@layer base { h1 { @apply text-3xl font-semibold; } }` |
| **Severity** | High |

### TW4-010 — `@apply` inside `@layer utilities` creating circular dependency

| Field | Value |
|-------|-------|
| **ID** | TW4-010 |
| **Category** | @layer behavior |
| **Pattern** | `.btn { @apply px-4 py-2 }` defined in utilities layer referencing other custom utilities |
| **Why it fails** | v4 stricter about `@apply` resolution order — build error or missing styles |
| **Do instead** | Put component classes in `@layer components` or use `@utility` for first-class utilities |
| **Severity** | High |

### TW4-011 — Expecting `@layer components` to override utilities by source order alone

| Field | Value |
|-------|-------|
| **ID** | TW4-011 |
| **Category** | @layer behavior |
| **Pattern** | Component layer class and `p-4` utility on same element — assumes component wins |
| **Why it fails** | Tailwind layer order is `theme, base, components, utilities` — utilities win |
| **Do instead** | Remove conflicting utility from JSX; or use variant/`!` important modifier intentionally |
| **Severity** | Medium |

### TW4-012 — Third-party CSS not assigned to a layer

| Field | Value |
|-------|-------|
| **ID** | TW4-012 |
| **Category** | @layer behavior |
| **Pattern** | npm package injects unlayered reset that overrides `bg-background` |
| **Why it fails** | Unlayered styles sit above Tailwind layers in v4 cascade |
| **Do instead** | Wrap import: `@import "vendor.css" layer(base);` or load vendor before Tailwind |
| **Severity** | High |

### TW4-013 — Using `@tailwind` directives mixed with v4 `@import`

| Field | Value |
|-------|-------|
| **ID** | TW4-013 |
| **Category** | @layer behavior |
| **Pattern** | `@import "tailwindcss"` plus `@tailwind utilities` in same file |
| **Why it fails** | Duplicate utility generation or PostCSS plugin errors |
| **Do instead** | v4-only entry: single `@import "tailwindcss"` |
| **Severity** | Critical |

### TW4-014 — `@utility` name colliding with built-in utility

| Field | Value |
|-------|-------|
| **ID** | TW4-014 |
| **Category** | @layer behavior |
| **Pattern** | `@utility flex { display: flex; }` redefining core utility |
| **Why it fails** | Undefined override behavior — may break layout utilities site-wide |
| **Do instead** | Prefix custom utilities: `@utility stack-flex { ... }` or use semantic component class |
| **Severity** | High |

### TW4-015 — Template literal dynamic class: `` `bg-${color}-500` ``

| Field | Value |
|-------|-------|
| **ID** | TW4-015 |
| **Category** | JIT & dynamic classes |
| **Pattern** | Runtime-composed color class strings from API values |
| **Why it fails** | JIT scans static sources — dynamic permutations absent from built CSS |
| **Do instead** | Safelist map: `const tones = { red: 'bg-red-500', blue: 'bg-blue-500' }[color]` |
| **Severity** | Critical |

### TW4-016 — Spreading props into `className` from untyped string builder

| Field | Value |
|-------|-------|
| **ID** | TW4-016 |
| **Category** | JIT & dynamic classes |
| **Pattern** | `className={['text', size, weight].join('-')}` producing `text-lg-bold` |
| **Why it fails** | Non-standard concatenations never exist as utilities |
| **Do instead** | `cn(size === 'lg' && 'text-lg', weight === 'bold' && 'font-bold')` with full class names |
| **Severity** | Critical |

### TW4-017 — `@source` glob missing monorepo package paths

| Field | Value |
|-------|-------|
| **ID** | TW4-017 |
| **Category** | JIT & dynamic classes |
| **Pattern** | v4 auto content detection scans app only; UI package in `packages/ui` ignored |
| **Why it fails** | Package component classes purged from production CSS |
| **Do instead** | `@source "../packages/ui/src/**/*.{tsx,ts}";` in app CSS entry |
| **Severity** | Critical |

### TW4-018 — Conditional classes hidden behind non-scanning function wrapper

| Field | Value |
|-------|-------|
| **ID** | TW4-018 |
| **Category** | JIT & dynamic classes |
| **Pattern** | `tw('hidden md:block')` custom helper with string stored in DB |
| **Why it fails** | Scanner does not execute helpers or read database strings |
| **Do instead** | Full class strings in source; safelist file for CMS-driven classes if unavoidable |
| **Severity** | High |

### TW4-019 — Relying on `purge`/`content` in JS while CSS `@source` is empty

| Field | Value |
|-------|-------|
| **ID** | TW4-019 |
| **Category** | JIT & dynamic classes |
| **Pattern** | Migrated to v4 CSS entry but removed all content paths assuming "auto" |
| **Why it fails** | Auto detection misses unconventional folders (`features/`, MDX co-located) |
| **Do instead** | Explicit `@source` for every non-standard directory |
| **Severity** | High |

### TW4-020 — Arbitrary value with invalid CSS variable reference

| Field | Value |
|-------|-------|
| **ID** | TW4-020 |
| **Category** | JIT & dynamic classes |
| **Pattern** | `bg-[var(--sidebar-bg)]` when variable defined only in shadow DOM or runtime |
| **Why it fails** | Build succeeds but color transparent in SSR or first paint |
| **Do instead** | Register in `@theme` or define variable in `@layer base` on `:root` |
| **Severity** | Medium |

### TW4-021 — `clsx` truthy object keys as dynamic class fragments

| Field | Value |
|-------|-------|
| **ID** | TW4-021 |
| **Category** | JIT & dynamic classes |
| **Pattern** | `clsx({ [\`text-${c}\`]: true })` |
| **Why it fails** | Scanner cannot see runtime object keys |
| **Do instead** | Explicit branch map with complete utility strings |
| **Severity** | Critical |

### TW4-022 — Using `@apply` with class names built at runtime

| Field | Value |
|-------|-------|
| **ID** | TW4-022 |
| **Category** | JIT & dynamic classes |
| **Pattern** | PostCSS script generates `@apply bg-${name}` from JSON token list |
| **Why it fails** | v4 requires resolvable utilities at compile time for `@apply` |
| **Do instead** | Generate full CSS with `@theme` variables, not dynamic `@apply` targets |
| **Severity** | High |

### TW4-023 — `bg-opacity-*` / `text-opacity-*` after v4 color model change

| Field | Value |
|-------|-------|
| **ID** | TW4-023 |
| **Category** | v3 utility renames & removals |
| **Pattern** | `bg-black bg-opacity-50` stack on overlay |
| **Why it fails** | Opacity modifiers removed — separate opacity utilities no longer generated |
| **Do instead** | Slash syntax: `bg-black/50` or `text-white/80` |
| **Severity** | High |

### TW4-024 — `flex-grow` / `flex-shrink` instead of `grow` / `shrink`

| Field | Value |
|-------|-------|
| **ID** | TW4-024 |
| **Category** | v3 utility renames & removals |
| **Pattern** | Legacy class names from v3 tutorials |
| **Why it fails** | Renamed utilities may not exist depending on compatibility preset |
| **Do instead** | `grow`, `shrink`, `grow-0`, `shrink-0` |
| **Severity** | Medium |

### TW4-025 — `overflow-ellipsis` instead of `text-ellipsis`

| Field | Value |
|-------|-------|
| **ID** | TW4-025 |
| **Category** | v3 utility renames & removals |
| **Pattern** | Truncate recipe uses removed alias |
| **Why it fails** | Ellipsis styles not applied — layout overflow visible |
| **Do instead** | `truncate` shorthand or `text-ellipsis overflow-hidden` |
| **Severity** | Medium |

### TW4-026 — `decoration-slice` / `decoration-clone` rename to `box-decoration-*`

| Field | Value |
|-------|-------|
| **ID** | TW4-026 |
| **Category** | v3 utility renames & removals |
| **Pattern** | Gradient text hack still references `decoration-slice` |
| **Why it fails** | Utility missing after upgrade — gradient clipping breaks |
| **Do instead** | `box-decoration-slice` and `box-decoration-clone` |
| **Severity** | Medium |

### TW4-027 — `shadow-sm` expecting v3 subtle shadow value

| Field | Value |
|-------|-------|
| **ID** | TW4-027 |
| **Category** | v3 utility renames & removals |
| **Pattern** | Card shadows unchanged after migration — visual QA skipped |
| **Why it fails** | v4 retuned default shadow scale — `shadow-sm` darker/larger than v3 |
| **Do instead** | Re-audit elevation tokens; override in `@theme { --shadow-sm: ... }` |
| **Severity** | Medium |

### TW4-028 — `ring` default width/offset behavior change

| Field | Value |
|-------|-------|
| **ID** | TW4-028 |
| **Category** | v3 utility renames & removals |
| **Pattern** | Focus ring `ring` without width looks invisible or too thick post-migration |
| **Why it fails** | v4 ring defaults aligned to CSS `outline` semantics |
| **Do instead** | Explicit `ring-2 ring-offset-2 ring-brand` on focus-visible utilities |
| **Severity** | High |

### TW4-029 — `border` default color now `currentColor`

| Field | Value |
|-------|-------|
| **ID** | TW4-029 |
| **Category** | v3 utility renames & removals |
| **Pattern** | `border` alone expecting `gray-200` default from v3 preflight |
| **Why it fails** | Borders inherit text color — low contrast on colored text |
| **Do instead** | Explicit `border-border` token or `border-gray-200` |
| **Severity** | High |

### TW4-030 — Plugin `addUtilities` API incompatible without upgrade

| Field | Value |
|-------|-------|
| **ID** | TW4-030 |
| **Category** | v3 utility renames & removals |
| **Pattern** | Custom v3 plugin registering utilities via JS API |
| **Why it fails** | v4 plugin surface changed — utilities may not register |
| **Do instead** | Migrate plugin utilities to `@utility` blocks in CSS or official v4 plugin adapter |
| **Severity** | High |

### TW4-031 — PostCSS config missing `@tailwindcss/postcss` plugin

| Field | Value |
|-------|-------|
| **ID** | TW4-031 |
| **Category** | build & tooling |
| **Pattern** | Still using `tailwindcss` alone as PostCSS plugin name in v4 project |
| **Why it fails** | Build completes with empty utility set or cryptic PostCSS error |
| **Do instead** | `plugins: { '@tailwindcss/postcss': {} }` in `postcss.config.mjs` |
| **Severity** | Critical |

### TW4-032 — Vite without `@tailwindcss/vite` for SSR apps

| Field | Value |
|-------|-------|
| **ID** | TW4-032 |
| **Category** | build & tooling |
| **Pattern** | PostCSS-only Tailwind in Vite SSR — double processing or HMR stale CSS |
| **Why it fails** | Vite plugin path optimizes v4 HMR; PostCSS-only may lag on `@theme` edits |
| **Do instead** | Add `@tailwindcss/vite` to `vite.config.ts` plugins array |
| **Severity** | Medium |

### TW4-033 — Running Tailwind CLI v3 against v4 CSS syntax

| Field | Value |
|-------|-------|
| **ID** | TW4-033 |
| **Category** | build & tooling |
| **Pattern** | CI script `npx tailwindcss -i ./globals.css` on v3 CLI version pin |
| **Why it fails** | `@import "tailwindcss"` and `@theme` not understood — empty output CSS |
| **Do instead** | Pin `@tailwindcss/cli@4` or use framework-integrated build (Next/Vite plugin) |
| **Severity** | Critical |

### TW4-034 — Prettier `prettier-plugin-tailwindcss` major mismatch with v4

| Field | Value |
|-------|-------|
| **ID** | TW4-034 |
| **Category** | build & tooling |
| **Pattern** | Old plugin version sorts classes but strips unknown v4 utilities in CI |
| **Why it fails** | Plugin lag behind v4 class names causes false "invalid" sorting or dropped classes in edge versions |
| **Do instead** | Upgrade `prettier-plugin-tailwindcss` to v4-compatible release before enforcing format CI |
| **Severity** | Medium |
