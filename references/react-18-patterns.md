# Apple Ultra: React Concurrent & Hydration Patterns Reference

> **Legacy filename:** `react-18-patterns.md` is retained so existing skill links do not break. The guidance is maintained for modern React.
>
> **Current compatibility (verified 2026-09-21):** React **19.3** is current stable. React 19.3 makes View Transitions and Fragment Refs stable; React 19 also supports `ref` as a prop for function components, so new code generally does not need `forwardRef`.
>
> Primary sources: https://react.dev/blog/2026/09/09/react-19-3 · https://react.dev/reference/react/forwardRef
>
> Apply [apple-principles-2026.md](./apple-principles-2026.md). The installed React/framework version wins over this reference; verify current official docs before relying on version-sensitive behavior.

## How to use

1. **Review trigger:** Hydration warnings, list keys, transitions, Suspense data fetching, Strict Mode surprises, or concurrent rendering bugs.
2. **Severity:** Critical = user-visible corruption or broken interactivity. High = flaky production behavior. Medium = perf or dev-only confusion.
3. **Output:** `REACT-XXX | Location | Severity | Fix` in standard finding format.
4. **Pair with:** [frontend.md](./frontend.md) for component structure, [next-app-router.md](./next-app-router.md) for RSC + Suspense integration.

## React 19.3 additions that change review behavior

- **Refs:** new function components can receive `ref` as a prop. Do not require `forwardRef` in new React 19 code merely from habit.
- **View Transitions:** `<ViewTransition>` is stable in 19.3. Use it only when spatial continuity explains a real state/navigation relationship; respect the motion contract in [apple-feel.md](./apple-feel.md).
- **Fragment Refs:** explicit `<Fragment ref={...}>` can expose grouped DOM behavior without adding a wrapper element; use the narrowest imperative surface necessary.
- **Effect Events:** `useEffectEvent` can separate non-reactive event logic from Effects. It is not a loophole for hiding real Effect dependencies.
- **Framework React versions:** Next.js App Router can use framework-integrated React releases. Inspect the project’s installed/framework-supported version before applying standalone React assumptions.

---

## Rule index

| Category | Rules | IDs |
|----------|-------|-----|
| Keys & useId | 6 | R18-001–R18-006 |
| useTransition & useDeferredValue | 8 | R18-007–R18-014 |
| Strict Mode double-invoke | 5 | R18-015–R18-019 |
| Hydration mismatch | 7 | R18-020–R18-026 |
| startTransition misuse | 4 | R18-027–R18-030 |
| Suspense & data fetching | 4 | R18-031–R18-034 |

**Total rules: 34**

---

### R18-001 — Array index as key on filterable/sortable lists

| Field | Value |
|-------|-------|
| **ID** | R18-001 |
| **Category** | keys & useId |
| **Pattern** | `items.map((item, i) => <Row key={i} … />)` on a list that reorders or deletes |
| **Why it fails** | React reconciles wrong DOM nodes — input state jumps rows, animations target wrong items |
| **Do instead** | Stable domain ID: `key={item.id}`; generate ID on create if backend omits one |
| **Severity** | Critical |

### R18-002 — `useId()` used as list item key

| Field | Value |
|-------|-------|
| **ID** | R18-002 |
| **Category** | keys & useId |
| **Pattern** | `const id = useId(); key={id}` inside `.map()` |
| **Why it fails** | `useId` is per-component-instance, not per row — all items may share one id or violate Rules of Hooks if called in loop |
| **Do instead** | `useId` for accessibility wiring (`htmlFor` + `id`); list keys come from data |
| **Severity** | Critical |

### R18-003 — Raw `useId()` used as an unescaped CSS selector

| Field | Value |
|-------|-------|
| **ID** | R18-003 |
| **Category** | keys & useId |
| **Pattern** | A `useId()` value is interpolated directly into a CSS selector such as `querySelector('#' + id)` |
| **Why it fails** | React IDs are valid HTML IDs but can contain characters with special meaning in CSS selector syntax |
| **Do instead** | Prefer refs for DOM access; when a selector is genuinely required, escape the ID with `CSS.escape(id)` instead of rewriting React’s identifier |
| **Severity** | Medium |

### R18-004 — Remounting list by changing parent `key` to "reset" children

| Field | Value |
|-------|-------|
| **ID** | R18-004 |
| **Category** | keys & useId |
| **Pattern** | `<ul key={filter}>{items.map(...)}</ul>` to force fresh state on filter change |
| **Why it fails** | Destroys all row state and focus; expensive re-mount; masks key bugs |
| **Do instead** | Reset only controlled state in effect when filter changes; keep stable row keys |
| **Severity** | High |

### R18-005 — Duplicate keys after merging paginated results

| Field | Value |
|-------|-------|
| **ID** | R18-005 |
| **Category** | keys & useId |
| **Pattern** | Infinite scroll appends page 2 with overlapping IDs from API cursor bug |
| **Why it fails** | React warns and drops duplicate-key siblings — random rows disappear |
| **Do instead** | Dedupe by ID before concat; assert unique keys in dev with a Set |
| **Severity** | High |

### R18-006 — `key={Math.random()}` on every render

| Field | Value |
|-------|-------|
| **ID** | R18-006 |
| **Category** | keys & useId |
| **Pattern** | `key={Math.random()}` or `key={Date.now()}` to force remount |
| **Why it fails** | New key every render — constant unmount/remount, lost focus, infinite loops with effects |
| **Do instead** | Key changes only when identity changes; use `key={resetToken}` intentionally for form reset |
| **Severity** | Critical |

### R18-007 — `useTransition` for urgent input-controlled state

| Field | Value |
|-------|-------|
| **ID** | R18-007 |
| **Category** | useTransition & useDeferredValue |
| **Pattern** | Wrap `setSearchQuery(e.target.value)` in `startTransition` |
| **Why it fails** | Typing feels laggy — text input is urgent and should not be deprioritized |
| **Do instead** | Urgent: direct `setState` on input; transition only the derived filtered list render |
| **Severity** | High |

### R18-008 — `useDeferredValue` on object/array recreated every render

| Field | Value |
|-------|-------|
| **ID** | R18-008 |
| **Category** | useTransition & useDeferredValue |
| **Pattern** | `const deferred = useDeferredValue({ q, filters })` where object is new reference each render |
| **Why it fails** | Deferred value never stabilizes — perpetual stale UI |
| **Do instead** | Defer primitives or memoize: `useDeferredValue(query)` with `useMemo` for derived structures |
| **Severity** | High |

### R18-009 — Choosing `useDeferredValue` when you need pending UI feedback

| Field | Value |
|-------|-------|
| **ID** | R18-009 |
| **Category** | useTransition & useDeferredValue |
| **Pattern** | Deferred search with no loading indicator during lag |
| **Why it fails** | `useDeferredValue` does not expose `isPending` — user cannot tell if UI is stale |
| **Do instead** | `const [isPending, startTransition] = useTransition()` and show subtle pending affordance |
| **Severity** | Medium |

### R18-010 — `useTransition` assuming synchronous state read after `startTransition`

| Field | Value |
|-------|-------|
| **ID** | R18-010 |
| **Category** | useTransition & useDeferredValue |
| **Pattern** | `startTransition(() => setTab('b')); assert(currentTab === 'b')` immediately after |
| **Why it fails** | Transition updates are async — state may still reflect previous tab in same tick |
| **Do instead** | React to state in render or `useEffect` when `tab` changes |
| **Severity** | Medium |

### R18-011 — Heavy sync work inside `startTransition` callback

| Field | Value |
|-------|-------|
| **ID** | R18-011 |
| **Category** | useTransition & useDeferredValue |
| **Pattern** | `startTransition(() => { sort100kItems(); setResults(sorted) })` |
| **Why it fails** | Transition marks update low priority but work still blocks main thread |
| **Do instead** | Web Worker or incremental sort; transition only the `setResults` dispatch |
| **Severity** | High |

### R18-012 — `useDeferredValue` instead of memoization for expensive child

| Field | Value |
|-------|-------|
| **ID** | R18-012 |
| **Category** | useTransition & useDeferredValue |
| **Pattern** | Defer props to `<ExpensiveChart>` without `React.memo` on child |
| **Why it fails** | Child re-renders every parent render anyway — deferral adds lag without savings |
| **Do instead** | `React.memo(ExpensiveChart)` + defer input prop, or move computation to memo |
| **Severity** | Medium |

### R18-013 — Navigation wrapped in transition without handling `useTransition` error reset

| Field | Value |
|-------|-------|
| **ID** | R18-013 |
| **Category** | useTransition & useDeferredValue |
| **Pattern** | Tab switch transition + error boundary leaves `isPending` stuck true |
| **Why it fails** | Suspended or errored transition may not clear pending state without boundary reset |
| **Do instead** | Error boundary `resetKeys={[tab]}` or key error boundary to remount on route change |
| **Severity** | High |

### R18-014 — Server Actions + `useTransition` without `await` handling rejection

| Field | Value |
|-------|-------|
| **ID** | R18-014 |
| **Category** | useTransition & useDeferredValue |
| **Pattern** | `startTransition(() => { formAction(fd) })` — no try/catch on returned promise |
| **Why it fails** | Unhandled rejection; `isPending` false while mutation failed silently |
| **Do instead** | `await` action in async transition handler; surface errors via `useActionState` |
| **Severity** | High |

### R18-015 — Effect with side effect assuming single mount in dev

| Field | Value |
|-------|-------|
| **ID** | R18-015 |
| **Category** | strict mode double-invoke |
| **Pattern** | `useEffect(() => { analytics.identify() }, [])` fires twice in dev Strict Mode |
| **Why it fails** | Duplicate identify calls, double subscriptions, inflated metrics |
| **Do instead** | Idempotent setup + cleanup; guard with ref only when cleanup is correct, not to "fix" Strict Mode |
| **Severity** | High |

### R18-016 — `useEffect` fetch without AbortController cleanup

| Field | Value |
|-------|-------|
| **ID** | R18-016 |
| **Category** | strict mode double-invoke |
| **Pattern** | Fetch on mount with no abort — Strict Mode double-fetch races |
| **Why it fails** | Stale response from first aborted mount can overwrite newer data |
| **Do instead** | `const ac = new AbortController(); fetch(url, { signal: ac.signal }); return () => ac.abort()` |
| **Severity** | Critical |

### R18-017 — Creating WebSocket in effect without teardown

| Field | Value |
|-------|-------|
| **ID** | R18-017 |
| **Category** | strict mode double-invoke |
| **Pattern** | `new WebSocket(url)` in `useEffect` — dev opens two sockets |
| **Why it fails** | Duplicate connections, duplicate messages, server resource leak |
| **Do instead** | `return () => ws.close()` in cleanup; tolerate brief double-connect in dev |
| **Severity** | High |

### R18-018 — Mutating global singleton in mount effect

| Field | Value |
|-------|-------|
| **ID** | R18-018 |
| **Category** | strict mode double-invoke |
| **Pattern** | `window.__SDK__ = initSDK()` on every mount without teardown |
| **Why it fails** | Strict Mode remount re-inits global — duplicate listeners or corrupted singleton |
| **Do instead** | Module-level init once, or cleanup that destroys SDK instance |
| **Severity** | High |

### R18-019 — Disabling Strict Mode to "fix" double-render bugs

| Field | Value |
|-------|-------|
| **ID** | R18-019 |
| **Category** | strict mode double-invoke |
| **Pattern** | Remove `<React.StrictMode>` after effect double-fire |
| **Why it fails** | Hides non-idempotent effects that will still break on remount, SSR, or concurrent features |
| **Do instead** | Fix effect idempotency and cleanup; keep Strict Mode in dev |
| **Severity** | High |

### R18-020 — `typeof window !== 'undefined'` branch rendering different markup

| Field | Value |
|-------|-------|
| **ID** | R18-020 |
| **Category** | hydration mismatch |
| **Pattern** | Server renders placeholder; client immediately renders `localStorage` theme |
| **Why it fails** | React hydration mismatch warning — attributes and text differ |
| **Do instead** | Suppress mismatch with `suppressHydrationWarning` on `<html>` for theme only, or render after mount |
| **Severity** | High |

### R18-021 — `Date.now()` or `new Date().toLocaleString()` in SSR render

| Field | Value |
|-------|-------|
| **ID** | R18-021 |
| **Category** | hydration mismatch |
| **Pattern** | "Last updated" timestamp rendered on server and client in different timezones/ms |
| **Why it fails** | Text content mismatch at hydration |
| **Do instead** | Format date on server only; pass ISO string prop; or client-only `<ClientTime />` after mount |
| **Severity** | High |

### R18-022 — Invalid HTML nesting (`<p>` inside `<p>`, `<div>` inside `<p>`)

| Field | Value |
|-------|-------|
| **ID** | R18-022 |
| **Category** | hydration mismatch |
| **Pattern** | Rich text component wraps block elements in `<p>` |
| **Why it fails** | Browser auto-corrects DOM differently than React VDOM — hydration error |
| **Do instead** | Use `<div>` or `<span className="prose">` for rich content containers |
| **Severity** | High |

### R18-023 — Browser extension modifying DOM before hydration

| Field | Value |
|-------|-------|
| **ID** | R18-023 |
| **Category** | hydration mismatch |
| **Pattern** | Password manager injects nodes into form fields |
| **Why it fails** | Unavoidable client-only DOM drift — React cannot reconcile |
| **Do instead** | `suppressHydrationWarning` on affected inputs; mount sensitive widgets client-only |
| **Severity** | Medium |

### R18-024 — `dangerouslySetInnerHTML` with server/client sanitization drift

| Field | Value |
|-------|-------|
| **ID** | R18-024 |
| **Category** | hydration mismatch |
| **Pattern** | DOMPurify config differs between Node SSR and browser |
| **Why it fails** | HTML string mismatch — hydration fails on CMS content |
| **Do instead** | Sanitize once on server; pass clean HTML string; client renders without re-sanitize |
| **Severity** | High |

### R18-025 — Random IDs from non-`useId` source in SSR components

| Field | Value |
|-------|-------|
| **ID** | R18-025 |
| **Category** | hydration mismatch |
| **Pattern** | `id={crypto.randomUUID()}` during render in shared component |
| **Why it fails** | Server and client generate different IDs |
| **Do instead** | `useId()` in client components; server passes deterministic id prop |
| **Severity** | Critical |

### R18-026 — Conditional render based on `window.innerWidth` during first client render

| Field | Value |
|-------|-------|
| **ID** | R18-026 |
| **Category** | hydration mismatch |
| **Pattern** | `const isMobile = window.innerWidth < 768` at module scope in client component |
| **Why it fails** | Server rendered desktop layout; client hydrates mobile layout |
| **Do instead** | CSS media queries for layout; `matchMedia` in effect for JS-only behavior |
| **Severity** | High |

### R18-027 — `startTransition` around state that triggers synchronous DOM measurement

| Field | Value |
|-------|-------|
| **ID** | R18-027 |
| **Category** | startTransition misuse |
| **Pattern** | Transition tab change then immediate `getBoundingClientRect` in same handler |
| **Why it fails** | DOM not updated yet — measurements wrong, scroll position breaks |
| **Do instead** | Measure in `useLayoutEffect` after committed state, or `flushSync` for measurement-critical updates |
| **Severity** | High |

### R18-028 — `startTransition` for every setState "as best practice"

| Field | Value |
|-------|-------|
| **ID** | R18-028 |
| **Category** | startTransition misuse |
| **Pattern** | Utility wrapper applies `startTransition` to all dispatches |
| **Why it fails** | Urgent updates (errors, focus, open menus) feel sluggish |
| **Do instead** | Transition only expensive tree updates: filters, route-like tabs, large lists |
| **Severity** | Medium |

### R18-029 — Event handler `e.preventDefault()` after async transition

| Field | Value |
|-------|-------|
| **ID** | R18-029 |
| **Category** | startTransition misuse |
| **Pattern** | `startTransition(async () => { await save(); router.push('/') })` on form submit without sync preventDefault |
| **Why it fails** | Full page navigation or double submit before transition runs |
| **Do instead** | `e.preventDefault()` synchronously at top of handler; then start transition |
| **Severity** | High |

### R18-030 — Nesting `startTransition` calls expecting ordering guarantees

| Field | Value |
|-------|-------|
| **ID** | R18-030 |
| **Category** | startTransition misuse |
| **Pattern** | Outer transition opens panel; inner transition loads data — assumed sequential commit |
| **Why it fails** | React may batch/interleave — panel opens before data ready without Suspense |
| **Do instead** | Single state machine or Suspense boundary for data inside panel |
| **Severity** | Medium |

### R18-031 — `use()` / Suspense with fetch that does not cache per request

| Field | Value |
|-------|-------|
| **ID** | R18-031 |
| **Category** | suspense & data fetching |
| **Pattern** | New `fetch()` promise created inline on every render without `cache()` |
| **Why it fails** | Suspense re-triggers infinitely or waterfalls duplicate requests |
| **Do instead** | React `cache()` wrapper for server data loaders; stable promise map keyed by id on client |
| **Severity** | Critical |

### R18-032 — Throwing promise in client component without Error Boundary sibling

| Field | Value |
|-------|-------|
| **ID** | R18-032 |
| **Category** | suspense & data fetching |
| **Pattern** | Client Suspense data library throws fetch promise — rejected fetch uncaught |
| **Why it fails** | Unhandled rejection white-screens above nearest error boundary |
| **Do instead** | Pair Suspense with Error Boundary per data region; model error as thrown Error not bare rejection |
| **Severity** | High |

### R18-033 — Sibling Suspense boundaries sharing one slow promise

| Field | Value |
|-------|-------|
| **ID** | R18-033 |
| **Category** | suspense & data fetching |
| **Pattern** | Two children call `use(getPromise())` where `getPromise()` creates new promise each call |
| **Why it fails** | Duplicate fetches; both fallbacks flash |
| **Do instead** | Hoist promise to parent or dedupe with `cache()` / data library |
| **Severity** | High |

### R18-034 — Suspense fallback as `null` on layout-critical shell

| Field | Value |
|-------|-------|
| **ID** | R18-034 |
| **Category** | suspense & data fetching |
| **Pattern** | `<Suspense fallback={null}>` around header cart count |
| **Why it fails** | Layout collapse when count loads — CLS and mis-clicks |
| **Do instead** | Sized fallback preserving height: skeleton badge or `min-h` placeholder |
| **Severity** | Medium |
