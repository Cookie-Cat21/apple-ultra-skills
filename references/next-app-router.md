# Apple Ultra: Next.js App Router Reference

> Cross-reference: [SKILL.md](../SKILL.md) Section 2 (Frontend Ultra) and Detection Matrix (`app/`, `page.tsx`). Load when Next.js App Router production gotchas exceed SKILL.md scope.

## How to use

1. **Review trigger:** App Router routes, Server Actions, caching, metadata, parallel/intercepting routes, or `'use client'` boundary decisions.
2. **Severity:** Critical = ship blocker or data leak. High = production bug or SEO/cache failure. Medium = perf/maintainability debt.
3. **Output:** `NAR-XXX | Location | Severity | Fix` in standard finding format.
4. **Pair with:** [frontend.md](./frontend.md) for general React patterns, [performance.md](./performance.md) for Core Web Vitals.

## Rule index

| Category | Rules | IDs |
|----------|-------|-----|
| Client boundaries | 8 | NAR-001–NAR-008 |
| Suspense & streaming | 6 | NAR-009–NAR-014 |
| Server Actions | 6 | NAR-015–NAR-020 |
| Route caching | 6 | NAR-021–NAR-026 |
| Metadata API | 4 | NAR-027–NAR-030 |
| Parallel & intercepting routes | 4 | NAR-031–NAR-034 |

**Total rules: 34**

---

### NAR-001 — `'use client'` on layout.tsx for one interactive child

| Field | Value |
|-------|-------|
| **ID** | NAR-001 |
| **Category** | client boundaries |
| **Pattern** | Entire `layout.tsx` marked `'use client'` because nav or sidebar has `onClick` |
| **Why it fails** | All descendant pages lose Server Component benefits — larger JS bundle, no server-only data access in children, worse TTFB |
| **Do instead** | Keep layout as Server Component; extract interactive shell into `NavClient.tsx` with `'use client'` and import it as a child |
| **Severity** | Critical |

### NAR-002 — Importing a Server Component into a Client Component file

| Field | Value |
|-------|-------|
| **ID** | NAR-002 |
| **Category** | client boundaries |
| **Pattern** | `import { ProductList } from './ProductList'` inside a `'use client'` file where `ProductList` is a Server Component |
| **Why it fails** | Build error or silent client bundling of server-only code (`fs`, secrets, direct DB calls) |
| **Do instead** | Pass Server Components as `children` or named slot props from a Server parent: `<ClientShell><ProductList /></ClientShell>` |
| **Severity** | Critical |

### NAR-003 — `'use client'` on `page.tsx` for a single widget

| Field | Value |
|-------|-------|
| **ID** | NAR-003 |
| **Category** | client boundaries |
| **Pattern** | Whole route page is client because one chart or date picker needs hooks |
| **Why it fails** | Page cannot export `metadata`, `generateStaticParams`, or use server `fetch` caching; entire route hydrates |
| **Do instead** | Server `page.tsx` composes client leaf components; fetch data in page and pass serializable props |
| **Severity** | High |

### NAR-004 — Passing non-serializable props across the server/client boundary

| Field | Value |
|-------|-------|
| **ID** | NAR-004 |
| **Category** | client boundaries |
| **Pattern** | `<ClientForm onSubmit={handleSubmit} createdAt={new Date()} items={bigMap} />` from a Server Component |
| **Why it fails** | Functions, class instances, `Date`, `Map`, and symbols cannot cross the RSC wire — runtime errors or silent stripping |
| **Do instead** | Pass JSON-safe primitives; use Server Actions for mutations; serialize dates as ISO strings |
| **Severity** | Critical |

### NAR-005 — Barrel `index.ts` re-export pulling server code into client graph

| Field | Value |
|-------|-------|
| **ID** | NAR-005 |
| **Category** | client boundaries |
| **Pattern** | Client file imports `{ Button }` from `@/components` barrel that also re-exports server-only modules |
| **Why it fails** | Bundler may pull server utilities into client chunk or fail the build unpredictably |
| **Do instead** | Import client components from explicit paths; split `components/client/` and `components/server/` barrels |
| **Severity** | High |

### NAR-006 — Context provider declared in root layout without `'use client'` wrapper

| Field | Value |
|-------|-------|
| **ID** | NAR-006 |
| **Category** | client boundaries |
| **Pattern** | `createContext` + provider inline in server `layout.tsx` |
| **Why it fails** | Context requires client runtime; server layouts cannot hold interactive provider state |
| **Do instead** | `Providers.tsx` with `'use client'` imported once in root layout |
| **Severity** | Critical |

### NAR-007 — Third-party library imported in Server Component without `'use client'` leaf

| Field | Value |
|-------|-------|
| **ID** | NAR-007 |
| **Category** | client boundaries |
| **Pattern** | `import Chart from 'recharts'` directly in server `page.tsx` |
| **Why it fails** | Libraries using `window`, `useState`, or `useEffect` break RSC or bloat server bundle |
| **Do instead** | `dynamic(() => import('./Chart'), { ssr: false })` in a dedicated client wrapper |
| **Severity** | High |

### NAR-008 — `'use client'` directive below imports or mid-file

| Field | Value |
|-------|-------|
| **ID** | NAR-008 |
| **Category** | client boundaries |
| **Pattern** | Imports above `'use client'` or directive inside a function |
| **Why it fails** | Directive must be first statement (after comments); misplaced directive does not apply to the module |
| **Do instead** | `'use client'` as line 1 of the file, before all imports |
| **Severity** | High |

### NAR-009 — Awaiting slow fetch in page without Suspense boundary

| Field | Value |
|-------|-------|
| **ID** | NAR-009 |
| **Category** | suspense & streaming |
| **Pattern** | `const data = await fetchSlow()` at top of `page.tsx` with no `loading.tsx` or `<Suspense>` |
| **Why it fails** | Entire route blocks streaming; user sees blank screen until all data resolves |
| **Do instead** | Split into async child components wrapped in `<Suspense fallback={<Skeleton />}>` or rely on route-level `loading.tsx` |
| **Severity** | High |

### NAR-010 — `loading.tsx` skeleton dimensions mismatch resolved content

| Field | Value |
|-------|-------|
| **ID** | NAR-010 |
| **Category** | suspense & streaming |
| **Pattern** | Generic spinner in `loading.tsx` while page renders a tall data table |
| **Why it fails** | Layout shift when Suspense resolves — CLS regression and jarring UX |
| **Do instead** | Skeleton mirrors final layout: same heights, column count, and image aspect ratios |
| **Severity** | High |

### NAR-011 — Nested Suspense with single outer fallback hiding partial progress

| Field | Value |
|-------|-------|
| **ID** | NAR-011 |
| **Category** | suspense & streaming |
| **Pattern** | One `<Suspense>` wraps header, sidebar, and main content with one full-page fallback |
| **Why it fails** | Fast sections wait for slowest section; no progressive rendering |
| **Do instead** | Granular boundaries per independent async region so fast content streams first |
| **Severity** | Medium |

### NAR-012 — `error.tsx` expected to catch Server Action failures in the same segment

| Field | Value |
|-------|-------|
| **ID** | NAR-012 |
| **Category** | suspense & streaming |
| **Pattern** | Throwing inside a Server Action and expecting route `error.tsx` to render |
| **Why it fails** | Server Action errors return to the calling client form, not the route error boundary |
| **Do instead** | Return `{ error: string }` from the action or use `useActionState`; reserve `error.tsx` for render/data errors |
| **Severity** | High |

### NAR-013 — Suspense fallback inside `layout.tsx` wrapping `{children}`

| Field | Value |
|-------|-------|
| **ID** | NAR-013 |
| **Category** | suspense & streaming |
| **Pattern** | `<Suspense><main>{children}</main></Suspense>` in shared layout |
| **Why it fails** | Layout suspense re-triggers on every child navigation; persistent chrome flickers |
| **Do instead** | Suspense inside individual `page.tsx` or `loading.tsx` per route segment |
| **Severity** | Medium |

### NAR-014 — Using `useSearchParams()` without Suspense boundary

| Field | Value |
|-------|-------|
| **ID** | NAR-014 |
| **Category** | suspense & streaming |
| **Pattern** | Client component calls `useSearchParams()` rendered directly in static page |
| **Why it fails** | Next.js requires Suspense around search-param consumers to avoid de-opting static rendering |
| **Do instead** | Wrap the component in `<Suspense fallback={null}>` or a skeleton |
| **Severity** | High |

### NAR-015 — Server Action without explicit error return shape

| Field | Value |
|-------|-------|
| **ID** | NAR-015 |
| **Category** | server actions |
| **Pattern** | `throw new Error('Invalid')` as the only failure path in `async function createPost()` |
| **Why it fails** | Client receives opaque 500-style failures; forms cannot show field-level errors |
| **Do instead** | Return discriminated result: `return { ok: false, error: 'Title required' }` and branch in `useActionState` |
| **Severity** | High |

### NAR-016 — Server Action missing `revalidatePath` / `revalidateTag` after mutation

| Field | Value |
|-------|-------|
| **ID** | NAR-016 |
| **Category** | server actions |
| **Pattern** | Action writes to DB but UI shows stale cached RSC payload until hard refresh |
| **Why it fails** | Router cache and fetch cache retain old server-rendered HTML |
| **Do instead** | `revalidatePath('/posts')` or `revalidateTag('posts')` after successful mutation |
| **Severity** | Critical |

### NAR-017 — Trusting client-hidden fields in Server Actions without server-side validation

| Field | Value |
|-------|-------|
| **ID** | NAR-017 |
| **Category** | server actions |
| **Pattern** | `formData.get('role')` accepted as `'admin'` without Zod + auth check |
| **Why it fails** | Server Actions are public HTTP endpoints — any client can POST arbitrary FormData |
| **Do instead** | Validate with Zod; authorize with session on server; never trust hidden inputs |
| **Severity** | Critical |

### NAR-018 — Server Action bound to client state via `.bind()` with user-controlled args

| Field | Value |
|-------|-------|
| **ID** | NAR-018 |
| **Category** | server actions |
| **Pattern** | `deletePost.bind(null, postIdFromClient)` where `postId` is not re-verified server-side |
| **Why it fails** | Bound arguments can be tampered; IDOR if ownership is not checked in the action |
| **Do instead** | Re-fetch resource in action with session-scoped query: `where: { id, userId: session.user.id }` |
| **Severity** | Critical |

### NAR-019 — Redirect inside Server Action without handling `redirect()` throw

| Field | Value |
|-------|-------|
| **ID** | NAR-019 |
| **Category** | server actions |
| **Pattern** | `try/catch` around action body catches `redirect('/success')` as an error |
| **Why it fails** | `redirect()` throws a special `NEXT_REDIRECT` digest — catching it blocks navigation |
| **Do instead** | Call `redirect()` outside try/catch or rethrow when `isRedirectError(error)` |
| **Severity** | High |

### NAR-020 — Optimistic UI without rollback on Server Action failure

| Field | Value |
|-------|-------|
| **ID** | NAR-020 |
| **Category** | server actions |
| **Pattern** | `useOptimistic` updates list immediately; failed action leaves phantom row |
| **Why it fails** | UI diverges from server truth; users act on data that does not exist |
| **Do instead** | Reset optimistic state in action error branch; show toast and refetch |
| **Severity** | High |

### NAR-021 — Assuming `fetch` in Server Component is always dynamic

| Field | Value |
|-------|-------|
| **ID** | NAR-021 |
| **Category** | route caching |
| **Pattern** | No cache options on `fetch()` expecting fresh data on every request in production |
| **Why it fails** | Default static caching may serve build-time or stale data until revalidation |
| **Do instead** | `fetch(url, { cache: 'no-store' })` for always-fresh, or `{ next: { revalidate: 60 } }` for ISR |
| **Severity** | Critical |

### NAR-022 — `export const dynamic = 'force-static'` on auth-gated pages

| Field | Value |
|-------|-------|
| **ID** | NAR-022 |
| **Category** | route caching |
| **Pattern** | Dashboard page statically generated and CDN-cached |
| **Why it fails** | User A's HTML may be served to User B at the edge |
| **Do instead** | `export const dynamic = 'force-dynamic'` or per-user `cookies()` / `headers()` access |
| **Severity** | Critical |

### NAR-023 — `unstable_cache` key omitting tenant or user scope

| Field | Value |
|-------|-------|
| **ID** | NAR-023 |
| **Category** | route caching |
| **Pattern** | `unstable_cache(getOrg, ['org'], …)` without org ID in key parts |
| **Why it fails** | Cross-tenant data leak via shared cache entry |
| **Do instead** | Include all scope dimensions in key: `['org', orgId]` |
| **Severity** | Critical |

### NAR-024 — Calling `revalidatePath` with wrong path depth after nested route change

| Field | Value |
|-------|-------|
| **ID** | NAR-024 |
| **Category** | route caching |
| **Pattern** | `revalidatePath('/blog')` after editing `/blog/[slug]` detail only |
| **Why it fails** | List page updates but detail page cache may remain stale (or vice versa) |
| **Do instead** | Revalidate specific paths and tags: `revalidatePath('/blog/' + slug)` + `revalidateTag('blog-posts')` |
| **Severity** | High |

### NAR-025 — Route Handlers cached by default with `GET` returning user-specific JSON

| Field | Value |
|-------|-------|
| **ID** | NAR-025 |
| **Category** | route caching |
| **Pattern** | `export async function GET()` returns session user profile without `dynamic` or cache headers |
| **Why it fails** | Static optimization caches personalized response |
| **Do instead** | `export const dynamic = 'force-dynamic'` or `Cache-Control: private, no-store` |
| **Severity** | Critical |

### NAR-026 — Mixing `cookies()`/`headers()` in static subtree without segment config

| Field | Value |
|-------|-------|
| **ID** | NAR-026 |
| **Category** | route caching |
| **Pattern** | Child layout reads `cookies()` while parent assumed static for ISR |
| **Why it fails** | Entire segment tree becomes dynamic — ISR silently disabled |
| **Do instead** | Isolate dynamic reads in nested layout or parallel route slot with explicit `dynamic` export |
| **Severity** | High |

### NAR-027 — Static `metadata` object with runtime-only values

| Field | Value |
|-------|-------|
| **ID** | NAR-027 |
| **Category** | metadata API |
| **Pattern** | `export const metadata = { title: user.name }` where `user` is request-scoped |
| **Why it fails** | Top-level metadata export is evaluated at build time for static routes |
| **Do instead** | `export async function generateMetadata({ params })` with server fetch |
| **Severity** | High |

### NAR-028 — `generateMetadata` fetch not deduped with page fetch

| Field | Value |
|-------|-------|
| **ID** | NAR-028 |
| **Category** | metadata API |
| **Pattern** | Separate `fetch('/api/post/' + slug)` in metadata and page with different cache options |
| **Why it fails** | Double latency and inconsistent cache/revalidate behavior |
| **Do instead** | Shared `getPost(slug)` helper using same `fetch` cache tags; React `cache()` for DB layer |
| **Severity** | Medium |

### NAR-029 — Open Graph image URL pointing to localhost or relative path without `metadataBase`

| Field | Value |
|-------|-------|
| **ID** | NAR-029 |
| **Category** | metadata API |
| **Pattern** | `openGraph: { images: ['/og.png'] }` without `metadataBase` in production |
| **Why it fails** | Social crawlers resolve relative URLs incorrectly; previews break |
| **Do instead** | Set `metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL)` in root layout |
| **Severity** | High |

### NAR-030 — `robots: { index: false }` on production by copy-paste from staging layout

| Field | Value |
|-------|-------|
| **ID** | NAR-030 |
| **Category** | metadata API |
| **Pattern** | Staging `noindex` metadata shipped in production root layout |
| **Why it fails** | Entire site de-indexed from search engines |
| **Do instead** | Environment-gated metadata: `robots: process.env.VERCEL_ENV === 'production' ? { index: true } : { index: false }` |
| **Severity** | Critical |

### NAR-031 — Parallel route `@modal` slot missing `default.tsx`

| Field | Value |
|-------|-------|
| **ID** | NAR-031 |
| **Category** | parallel & intercepting routes |
| **Pattern** | `@modal` parallel slot defined but no `default.tsx` returning `null` |
| **Why it fails** | Hard 404 on routes that do not render the modal slot |
| **Do instead** | Add `@modal/default.tsx` with `export default function Default() { return null }` |
| **Severity** | Critical |

### NAR-032 — Intercepting route `(.)` segment mismatch after folder restructure

| Field | Value |
|-------|-------|
| **ID** | NAR-032 |
| **Category** | parallel & intercepting routes |
| **Pattern** | `(.)photo/[id]` intercepts wrong depth after moving `photo` under `(marketing)` |
| **Why it fails** | Soft navigation shows full page instead of modal; URL and UI diverge |
| **Do instead** | Match intercept convention to route depth: `(.)` same level, `(..)` one up, `(...)` from root |
| **Severity** | High |

### NAR-033 — Parallel route refresh loses modal state on `router.refresh()`

| Field | Value |
|-------|-------|
| **ID** | NAR-033 |
| **Category** | parallel & intercepting routes |
| **Pattern** | Calling `router.refresh()` after Server Action while intercepting modal is open |
| **Why it fails** | Full RSC refresh can unmount parallel slot; modal closes unexpectedly |
| **Do instead** | `revalidatePath` targeted to data routes; update modal content via action return value |
| **Severity** | Medium |

### NAR-034 — Hard navigation to intercepted URL bypasses modal shell

| Field | Value |
|-------|-------|
| **ID** | NAR-034 |
| **Category** | parallel & intercepting routes |
| **Pattern** | External link opens `/photos/123` expecting modal overlay |
| **Why it fails** | Intercepting routes only apply to client-side soft navigation from within the app |
| **Do instead** | Full `photos/[id]/page.tsx` must render complete standalone page for direct loads and SEO |
| **Severity** | High |
