# Apple Ultra: Frontend Reference (150+ Rules)

> Cross-reference: [SKILL.md](../SKILL.md) Section 2. Load when Frontend Ultra-Mode is active.
>
> **Current compatibility (verified 2026-09-21):** React 19.3 · Next.js 16.3.3 Active LTS · Tailwind CSS 4.3. Always inspect the project’s installed versions. Apply [apple-principles-2026.md](./apple-principles-2026.md); numeric thresholds not tied to a standard or measured project data are studio defaults, not universal facts.

---

## 1. React Component Patterns (30 Rules)

1. 🎯 Keep component/module boundaries easy to locate and own. One main component per file is a useful default, but colocated private helpers/subcomponents are fine when they remain cohesive.
2. 🎯 Split a component when it mixes responsibilities, becomes hard to test/review, or hides the primary render path. Line count is a smell, not a correctness threshold.
3. ⚡ Never call hooks conditionally or inside loops — Rules of Hooks are not suggestions.
4. 🎯 Extract a custom Hook when it creates a coherent reusable stateful behavior or clarifies a component. Reuse count alone does not require abstraction.
5. 💡 `useRef` for values that persist across renders without triggering re-renders (timers, previous values, DOM refs).
6. 🎯 Prefer refs/Fragment Refs for component-owned DOM access. Direct DOM queries are acceptable at explicit integration boundaries when scope and lifecycle are controlled.
7. 🎯 In React 19+, function components can receive `ref` as a prop; use that for new code. Keep `forwardRef` for compatibility with older React/library patterns where required.
8. 💡 `useImperativeHandle` sparingly — it breaks encapsulation. Prefer declarative props.
9. ⚡ Error boundaries catch render errors only — not event handler errors, async errors, or SSR errors.
10. 🎯 Place error boundaries at route level + around risky third-party widgets.
11. 🎯 Design Suspense fallbacks to preserve meaningful layout/continuity where feasible; exact geometry is not required when the final content genuinely changes size.
12. 💡 `use()` hook (React 19) for reading promises and context in render — replaces some `useEffect` patterns.
13. ⚡ Server Components (RSC): no hooks, no event handlers, no browser APIs. Default in Next.js App Router.
14. 🎯 Client Components: mark with `'use client'` at top of file — not per-function.
15. 🎯 Pass Server Component children to Client Components — don't import Server Components into Client files.
16. 💡 `children` prop type: `React.ReactNode` — includes strings, elements, fragments, null, arrays.
17. ⚡ Discriminated union props for variant components: `{ variant: 'primary' } | { variant: 'link'; href: string }`.
18. 🎯 Generic components: `<List<T> items={T[]} renderItem={(item: T) => ...} />` — type the render function.
19. 💡 `asChild` pattern (Radix): clone child element with merged props instead of wrapping in extra DOM node.
20. 🎯 Controlled vs uncontrolled: pick one per input. Controlled = `value` + `onChange`. Uncontrolled = `defaultValue` + ref.
21. ⚡ Never mix controlled and uncontrolled on the same input — React warns, then breaks silently.
22. 🎯 `key` on component remount resets all internal state — use intentionally for "reset form" patterns.
23. 💡 Use `React.memo`/custom comparison only after identifying a meaningful render cost or stable component boundary. React Compiler/framework tooling may make manual memoization unnecessary.
24. 🎯 Follow the Rules of Hooks and current hook-lint guidance. Do not suppress dependencies to force stability; use `useEffectEvent`, refactoring, or different state ownership when that better expresses the behavior.
25. ⚡ Effects that acquire external resources (subscriptions, timers, sockets, listeners, in-flight work that must be canceled) need the corresponding cleanup. Pure synchronization that acquires nothing may not.
26. 🎯 `useLayoutEffect` only when you need to measure/mutate DOM before paint — causes synchronous layout, use sparingly.
27. 💡 Portals for modals, tooltips, dropdowns: `createPortal(child, document.body)`.
28. 🎯 Strict Mode double-invokes effects in dev — if your effect breaks on double-run, it has a bug.
29. ⚡ Never inject untrusted HTML without a deliberate sanitization/trust boundary. DOMPurify is one option; server-side trusted sanitization, Trusted Types, or framework/CMS guarantees may define the project’s strategy.
30. 💡 Fragment shorthand `<>...</>` for grouping without DOM node — use `<Fragment key={id}>` when key is needed.

---

## 2. Next.js App Router Patterns (25 Rules)

1. ⚡ `layout.tsx` wraps all child routes — shared UI (nav, footer) goes here, not in every `page.tsx`.
2. 🎯 `page.tsx` is the route entry — one per route segment. No business logic; compose from features.
3. 🎯 `loading.tsx` auto-wraps page in Suspense — show skeleton matching page layout.
4. ⚡ `error.tsx` must be `'use client'` — catches errors in page/layout, shows recovery UI with `reset()`.
5. 🎯 `not-found.tsx` for 404 within route segment — call `notFound()` from server components.
6. ⚡ Route handlers (`route.ts`): export named functions `GET`, `POST`, etc. Return `NextResponse`.
7. 🎯 Validate request body in route handlers with Zod — same schema as client form validation.
8. 💡 `NextRequest` gives you `request.nextUrl.searchParams` — prefer over manual URL parsing.
9. ⚡ Next.js 16: `middleware.ts` is deprecated in favor of `proxy.ts`. Keep Proxy focused on the request boundary; avoid slow data fetching and do not treat it as the sole authorization layer.
10. 🎯 Proxy matcher config should cover only the paths that need request-boundary logic; broad matchers require an explicit reason and performance/security review.
11. 🎯 Metadata API: export `metadata` object or `generateMetadata` function from `page.tsx`/`layout.tsx`.
12. 💡 `generateStaticParams` for dynamic routes at build time — return array of `{ slug: string }`.
13. 🎯 Invalidate/update cached data according to the installed Next.js caching model. With Next 16 Cache Components, prefer `cacheTag` plus `updateTag`/profiled `revalidateTag` where appropriate; do not cargo-cult legacy calls.
14. 🎯 Treat caching as an explicit product/data-freshness decision. Current bare `fetch` is not cached by default; use the caching API that matches the project’s Next.js version and Cache Components configuration.
15. 🎯 For fresh request-time data, use the current version’s default/explicit uncached model and Suspense where streaming helps. Avoid redundant cache flags when the framework already provides the intended behavior.
16. 💡 Parallel routes (`@modal`): render modals as parallel route slots — URL-driven modal state.
17. 🎯 Intercepting routes (`(.)photo`): show modal over current page while updating URL.
18. ⚡ `redirect('/login')` in Server Components throws — don't wrap in try/catch.
19. 🎯 `cookies()` and `headers()` are async in current Next.js. Keep request-specific values outside shared cache scopes and follow the installed version’s migration guidance.
20. 💡 `draftMode()` for previewing unpublished CMS content — enable via API route with secret.
21. 🎯 `next.config.ts`: `images.remotePatterns` for external image domains — not `domains` (deprecated).
22. ⚡ `next.config.ts`: set `headers()` for security headers on all routes.
23. 🎯 Route groups `(marketing)` don't affect URL — use for layout organization only.
24. 💡 `instrumentation.ts` for OpenTelemetry setup — runs once on server start.
25. 🎯 Server Actions are server endpoints: authenticate/authorize, validate input, model errors, and update/invalidate cache using the installed version’s APIs. A dedicated `'use server'` module is useful for reusable actions but not a universal requirement.

---

## 3. State Management (20 Rules)

1. 🎯 Default: `useState` for local UI state. Don't reach for global state until proven necessary.
2. 💡 Lift state only when 2+ siblings need it — parent holds state, passes down via props.
3. 🎯 Context for theme, auth, locale — low-frequency updates shared across deep tree.
4. 🎯 Avoid placing high-frequency shared state in a broad Context when it causes costly fan-out. Measure/select/split context or use an external store when the actual render behavior warrants it.
5. 🎯 Zustand for client global state: simple API, no Provider wrapper, works outside React.
6. 💡 Zustand slices: `create((set) => ({ ...authSlice(set), ...cartSlice(set) }))` for large stores.
7. 🎯 TanStack Query for server state: fetching, caching, invalidation, optimistic updates.
8. 🎯 Configure server-state freshness from product semantics. Know the library defaults, but don’t invent a universal `staleTime` such as five minutes.
9. 🎯 Optimistic updates: `onMutate` → update cache → `onError` → rollback → `onSettled` → refetch.
10. 💡 Prefetch when intent likelihood, payload cost, cache lifetime, and network conditions justify it; hover alone is not a universal signal.
11. 🎯 Use the repo’s form/validation stack and keep authoritative validation consistent across client/server. React Hook Form + Zod is one strong option, not a requirement.
12. 🎯 Choose validation timing per field and consequence. Validate early enough to help, but avoid noisy validation that punishes normal typing.
13. 🎯 Form state vs URL state: filters/pagination in URL (`useSearchParams`), form drafts in local state.
14. 💡 `useSyncExternalStore` for subscribing to external stores (localStorage, WebSocket) in React 18+.
15. 🎯 Choose a global-state tool from the project’s needs and existing conventions; Redux Toolkit remains valid beyond a fixed checklist of use cases.
16. 🎯 Normalize relational client state when updates/lookups benefit from stable identity; simple nested data can stay simple when it is not causing correctness/performance problems.
17. 🎯 Selectors memoized with `reselect` or Zustand derived state — compute once, read many times.
18. 💡 Persist critical client state to `localStorage` with Zustand `persist` middleware — not all state.
19. 🎯 Hydration mismatch: server and client must render same initial state — use `useEffect` for client-only data.
20. ⚡ URL as state for shareable/bookmarkable UI: tabs, filters, modals via search params.

---

## 4. Styling Patterns (25 Rules)

1. 🎯 Keep product semantics in shared design tokens. CSS custom properties are a strong web implementation, but token storage and scope should follow the project’s theming architecture.
2. 🎯 Tailwind: use `@apply` only in component-level CSS files, not in JSX class strings.
3. 🎯 Tailwind: `cn()` utility (clsx + tailwind-merge) for conditional classes — prevents conflicts.
4. 💡 Repeated semantic values belong in theme tokens. A one-off arbitrary value can be appropriate for optical correction or external constraints when its intent is clear.
5. ⚡ CSS Modules: `import styles from './Button.module.css'` — scoped by default, no naming collisions.
6. 🎯 CSS Modules: compose classes with `composes: btn from './base.module.css'`.
7. 🎯 Use a consistent responsive strategy driven by content. Tailwind’s min-width variants make mobile-first convenient, but component/container needs can justify other structure.
8. 💡 Container queries (`@container`) for component-responsive design — better than viewport breakpoints for reusable components.
9. 🎯 Implement theme selection through the project’s documented token/theme mechanism (`data-*`, class, media query, etc.); no single selector convention is universally required.
10. 🎯 `color-scheme: dark` on dark theme root — fixes native form controls and scrollbars.
11. 🎯 Print styles: `@media print { .no-print { display: none; } }` — hide nav, show URLs.
12. 💡 `aspect-ratio: 16/9` on media containers — prevents CLS before image loads.
13. 🎯 Choose `cover`, `contain`, intrinsic sizing, or art direction from the content’s cropping requirements; never distort media unintentionally.
14. ⚡ `outline-offset: 2px` on focus rings — prevents clipping by `overflow: hidden` parents.
15. 🎯 `scroll-margin-top` on anchor targets — accounts for sticky header height.
16. 💡 `scrollbar-gutter: stable` on body — prevents layout shift when scrollbar appears/disappears.
17. 🎯 Choose Grid, Flexbox, normal flow, or container queries based on the layout relationship. Grid often excels at two-dimensional alignment and Flexbox at one-dimensional distribution, but this is a heuristic.
18. 🎯 `gap` over margin for spacing between siblings — no last-child margin hacks.
19. 🎯 Prefer dynamic/small/large viewport units where mobile browser chrome matters; use `vh`/Tailwind viewport utilities according to the actual layout and browser support target.
20. 💡 `clamp(1rem, 2.5vw, 1.5rem)` for fluid spacing and typography.
21. 🎯 Layer order: `@layer base, components, utilities` — predictable specificity.
22. 🎯 Treat `!important` as an escalation tool. Prefer layers/specificity architecture, but allow intentional use for utilities, third-party overrides, or accessibility fixes when documented.
23. 💡 `@starting-style` for entry animations on newly displayed elements (CSS 2024).
24. 🎯 Use skeletons only when they improve perceived continuity and approximate final structure; prefer static placeholders/status when animation or prediction adds no value.
25. 🎯 Use tokens/classes for shared semantic values. Inline styles remain appropriate for runtime-computed values when they intentionally consume tokens or cannot be represented statically.

---

## 5. Web APIs (20 Rules)

1. 🎯 `IntersectionObserver` for lazy loading and scroll-triggered animations — not scroll event listeners.
2. 💡 `IntersectionObserver` `rootMargin: '200px'` for preloading before element enters viewport.
3. 🎯 `ResizeObserver` for responsive components that adapt to container size — not window resize events.
4. 💡 `MutationObserver` for third-party widget integration — detect when external DOM changes.
5. 🎯 Web Workers for CPU-intensive tasks (image processing, parsing large files) — keep main thread free.
6. ⚡ `postMessage` between Worker and main thread — structured clone, not shared memory (unless SharedArrayBuffer).
7. 🎯 Service Workers for offline caching and push notifications — register in `useEffect` or app init.
8. 💡 Service Worker cache strategy: cache-first for static assets, network-first for API data.
9. ⚡ `localStorage` for user preferences only — not auth tokens, not large data, not structured data.
10. 🎯 `sessionStorage` for tab-scoped temporary state — cleared on tab close.
11. 💡 IndexedDB for client-side structured data > 5MB — use Dexie.js or idb wrapper, not raw API.
12. 🎯 `navigator.clipboard.writeText()` for copy-to-clipboard — with fallback for older browsers.
13. ⚡ `AbortController` for cancellable fetch requests — abort on component unmount or new search.
14. 🎯 `requestIdleCallback` for non-critical work (analytics, prefetch) — runs when browser is idle.
15. 💡 `BroadcastChannel` for cross-tab communication — sync logout, cart updates.
16. 🎯 `matchMedia('(prefers-reduced-motion: reduce)')` in JS — not just CSS, for JS-driven animations too.
17. ⚡ `navigator.share()` for mobile share sheet — progressive enhancement with clipboard fallback.
18. 🎯 `URL.createObjectURL()` for client-generated file downloads — revoke with `revokeObjectURL()` after.
19. 💡 `structuredClone()` for deep copying — faster and more correct than `JSON.parse(JSON.stringify())`.
20. 🎯 Feature detection over browser sniffing: `'IntersectionObserver' in window` not `navigator.userAgent`.

---

## 6. TypeScript with React (15 Rules)

1. ⚡ `strict: true` in tsconfig — no exceptions for application code.
2. 🎯 Discriminated unions for component variants: `type ButtonProps = { variant: 'primary' } | { variant: 'link'; href: string }`.
3. 🎯 Generic components: `function List<T>({ items, renderItem }: { items: T[]; renderItem: (item: T) => ReactNode })`.
4. 💡 `satisfies` operator for config objects: `const config = { ... } satisfies Config` — infers narrow type, checks constraint.
5. 🎯 `import type { Foo }` for type-only imports — enables `verbatimModuleSyntax` and faster builds.
6. ⚡ Never `any` — use `unknown` and narrow with type guards.
7. 🎯 Template literal types for design tokens: `type Spacing = \`${number}px\`` or union of allowed values.
8. 💡 `ComponentPropsWithoutRef<'button'>` to extend native element props without ref conflicts.
9. 🎯 `React.FC` is discouraged — explicit return type `React.ReactElement` or implicit inference.
10. 🎯 Event handler types: `React.MouseEvent<HTMLButtonElement>`, not generic `Event`.
11. 💡 `as const` on config objects for literal type inference.
12. 🎯 Utility types: `Pick`, `Omit`, `Partial`, `Required` — don't reinvent.
13. ⚡ Exhaustive switch: `default: const _exhaustive: never = value` catches unhandled cases.
14. 🎯 Zod schemas generate TypeScript types: `type User = z.infer<typeof UserSchema>`.
15. 💡 `satisfies` + `as const` for route configs, theme tokens, and API endpoint maps.

---

## 7. Vue Patterns (15 Rules)

1. 🎯 `<script setup>` for all new Vue 3 components — less boilerplate, better TypeScript inference.
2. ⚡ `defineProps<{ msg: string }>()` with TypeScript — runtime + compile-time safety.
3. 🎯 `defineEmits<{ submit: [payload: FormData] }>()` — typed events.
4. 💡 `defineModel()` for v-model binding in child components (Vue 3.4+).
5. 🎯 Composables (`useXxx`) mirror React custom hooks — extract reusable logic.
6. ⚡ `ref()` for primitives, `reactive()` for objects — don't destructure reactive objects (loses reactivity).
7. 🎯 `computed()` for derived state — never `watch` when `computed` suffices.
8. 💡 `watchEffect` for side effects tied to reactive deps — auto-tracks, auto-cleans up.
9. 🎯 `<Teleport to="body">` for modals and tooltips — same as React portals.
10. ⚡ `v-for` always needs `:key` with stable unique ID — same rule as React.
11. 🎯 `v-if` vs `v-show`: `v-if` for expensive/rare components, `v-show` for frequent toggles.
12. 💡 Pinia for global state — replaces Vuex, simpler API, TypeScript-first.
13. 🎯 Nuxt 3: auto-imports components and composables — don't manually import from `#imports`.
14. ⚡ Nuxt `useFetch` / `useAsyncData` for SSR data fetching — handles hydration automatically.
15. 🎯 Scoped styles `<style scoped>` — add `:deep()` for child component styling.

---

## 8. Svelte Patterns (15 Rules)

1. 🎯 Reactive declarations `$: doubled = count * 2` — Svelte's killer feature for derived state.
2. ⚡ `$:` blocks re-run when dependencies change — don't put side effects that should run once.
3. 🎯 Stores (`writable`, `readable`, `derived`) for cross-component state — simpler than Context.
4. 💡 `$store` auto-subscription syntax — unsubscribes on component destroy.
5. 🎯 `{#each items as item (item.id)}` — keyed each blocks, same as React keys.
6. ⚡ `{#if}` / `{:else if}` / `{:else}` — no ternary in template for complex conditions.
7. 🎯 `on:click|preventDefault` event modifiers — declarative event handling.
8. 💡 `use:action` for DOM behaviors reusable across components — Svelte's ref callback pattern.
9. 🎯 `bind:value` for two-way binding — use sparingly, prefer one-way data flow.
10. ⚡ SvelteKit: `+page.server.ts` for server-only data loading, `+page.ts` for universal.
11. 🎯 SvelteKit form actions: progressive enhancement — works without JS.
12. 💡 `{@html sanitizedContent}` — same XSS risk as `dangerouslySetInnerHTML`, sanitize first.
13. 🎯 Transitions: `transition:fade`, `in:fly` — built-in, performant, respects reduced motion.
14. ⚡ `svelte:head` for per-page meta tags in SvelteKit.
15. 🎯 `$app/stores` for page, navigating, updated — SvelteKit navigation state.
