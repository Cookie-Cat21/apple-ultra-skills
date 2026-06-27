# Apple Ultra: Performance Reference

> Cross-reference: [SKILL.md](../SKILL.md) Section 7. Core Web Vitals and optimization deep dive.

---

## 1. Core Web Vitals Deep Dive

### LCP (Largest Contentful Paint) — Target: < 2.5s

1. ⚡ Identify LCP element with Chrome DevTools → Performance → LCP marker.
2. 🎯 If LCP is an image: `fetchpriority="high"`, no lazy loading, preload with `<link rel="preload">`.
3. 🎯 If LCP is text: preload critical font, inline critical CSS for above-fold content.
4. 💡 LCP breakdown: TTFB (server) + resource load delay + resource load time + element render delay.
5. ⚡ Reduce TTFB: CDN edge caching, database query optimization, connection pooling.
6. 🎯 Server-side render the LCP element — don't wait for client JS to render it.
7. 💡 Remove render-blocking resources above the fold — defer non-critical CSS/JS.
8. 🎯 LCP candidates: `<img>`, `<video poster>`, block-level elements with background image, text nodes.

### INP (Interaction to Next Paint) — Target: < 200ms

9. ⚡ Profile with Chrome DevTools → Performance → Interactions track.
10. 🎯 Long tasks (>50ms) on main thread are INP killers — break up with `scheduler.yield()` or Web Workers.
11. 💡 INP measures worst interaction latency — optimize the slowest interaction, not average.
12. 🎯 `startTransition` for non-urgent updates: filtering, sorting, tab switches.
13. ⚡ Debounce input handlers (300ms), throttle scroll handlers (16ms).
14. 🎯 Virtualize lists >50 items — `@tanstack/react-virtual`.
15. 💡 Event delegation for large lists — one listener on parent, not per item.
16. 🎯 `passive: true` on scroll/touch event listeners — browser can scroll without waiting.
17. ⚡ Avoid forced synchronous layout: read layout properties, then write, then read again in same frame.

### CLS (Cumulative Layout Shift) — Target: < 0.1

18. ⚡ Every image/video/ad: explicit `width` + `height` or CSS `aspect-ratio`.
19. 🎯 Reserve space for dynamic content: skeleton placeholders matching final dimensions.
20. 💡 `font-display: swap` with size-adjust fallback font — prevents FOIT layout shift.
21. 🎯 Don't inject content above existing content — append below or use reserved space.
22. ⚡ Animations: only `transform` and `opacity` — never animate `width`, `height`, `top`.
23. 🎯 `scrollbar-gutter: stable` on body — prevents shift when scrollbar appears.
24. 💡 Ad slots: fixed-size containers even before ad loads — ad network fills reserved space.

### TTFB — Target: < 800ms

25. 🎯 CDN edge caching for static and semi-static content.
26. 💡 Database: index frequently queried columns, connection pooling (PgBouncer).
27. 🎯 Server-side caching: Redis for session data, API responses, rendered pages.
28. ⚡ Streaming SSR: send HTML shell immediately, stream slow sections.
29. 🎯 Edge functions for geo-routed, low-latency responses.
30. 💡 HTTP/2 or HTTP/3 — multiplexed connections reduce latency.

### FCP (First Contentful Paint) — Target: < 1.8s

31. 🎯 Inline critical CSS in `<head>` — defer full stylesheet.
32. ⚡ Minimize render-blocking JavaScript — `defer` or `async` on all non-critical scripts.
33. 🎯 Preconnect to critical origins: `<link rel="preconnect" href="https://fonts.example.com">`.
34. 💡 Server-side render at least the page shell — nav, hero text, skeleton.

---

## 2. Bundle Optimization

1. ⚡ Split code at route boundaries — every page loads only what it needs.
2. 🎯 `npx @next/bundle-analyzer` before adding dependencies >10KB gzipped.
3. 💡 Tree-shaking requires ES modules — check `"module"` field in package.json.
4. 🎯 Dynamic import heavy libraries: `const Chart = dynamic(() => import('./Chart'))`.
5. ⚡ No barrel file imports from large libraries — `import debounce from 'lodash/debounce'`.
6. 🎯 Shared chunks: configure `splitChunks` in webpack/turbopack for common vendor code.
7. 💡 `sideEffects: false` in package.json enables aggressive tree-shaking.
8. 🎯 Analyze with `import-cost` VS Code extension during development.
9. ⚡ Remove unused dependencies: `npx depcheck` quarterly.
10. 🎯 Polyfills: only include what you need — `@babel/preset-env` with `useBuiltIns: 'usage'`.

### Preload vs Prefetch vs Preconnect

11. 🎯 `preload`: critical resources for current page (hero image, critical font).
12. 💡 `prefetch`: resources for likely next navigation (next page's JS bundle).
13. 🎯 `preconnect`: establish early connection to third-party origin (API, CDN).
14. ⚡ Don't preload everything — preloading non-critical resources competes with critical ones.
15. 🎯 `<Link prefetch>` in Next.js for in-viewport links — automatic prefetch on hover.

---

## 3. Image Optimization

1. ⚡ `next/image` or equivalent — never raw `<img>` for user-facing images.
2. 🎯 Format selection: AVIF for photos, WebP for illustrations, SVG for icons/logos.
3. 🎯 Responsive images: `srcset` with `w` descriptors + `sizes` attribute.
4. 💡 `sizes="(max-width: 768px) 100vw, 50vw"` — tell browser actual display size.
5. 🎯 Blur-up placeholder: `placeholder="blur"` with `blurDataURL` in Next.js Image.
6. ⚡ Lazy load below-fold images — `loading="lazy"` (default in next/image).
7. 🎯 Above-fold images: `priority` prop in next/image — disables lazy loading, adds preload.
8. 💡 CDN image optimization: Cloudinary, imgix, or Vercel Image Optimization.
9. 🎯 Art direction: `<picture>` with different crops per breakpoint.
10. ⚡ Image dimensions in HTML — prevent CLS even before CSS loads.

---

## 4. Font Optimization

1. ⚡ `font-display: swap` on all custom fonts — show fallback immediately.
2. 🎯 Self-host via `next/font` or `@fontsource` — no third-party CDN DNS lookup.
3. 🎯 Subset to used character ranges — Latin-only app doesn't need CJK glyphs.
4. 💡 Preload only the single weight used above the fold.
5. 🎯 WOFF2 format only — 30% smaller than WOFF, supported everywhere.
6. ⚡ `size-adjust` in `@font-face` for fallback font — reduces CLS during swap.
7. 🎯 Variable fonts: one file for all weights — fewer HTTP requests.
8. 💡 `font-optical-sizing: auto` — browser adjusts optical size per font size.
9. 🎯 Limit font weights loaded: regular (400) + semibold (600) + bold (700) maximum.
10. ⚡ System font stack as fallback: `-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`.

---

## 5. Rendering Strategies

### Decision Tree

1. 🎯 **SSG** (Static): marketing pages, docs, blog — build-time HTML, CDN cached.
2. 🎯 **ISR** (Incremental Static): product catalogs, news — static with periodic revalidation.
3. 🎯 **SSR** (Server): personalized content, auth-required pages — fresh HTML per request.
4. 🎯 **CSR** (Client): authenticated dashboards with heavy interactivity — JS renders after load.
5. 💡 Hybrid: SSR shell + CSR interactive islands — best of both.

### Streaming SSR

6. 🎯 React Suspense boundaries at route level — stream HTML as sections resolve.
7. 💡 `loading.tsx` in Next.js auto-wraps in Suspense — progressive page rendering.
8. 🎯 Prioritize above-fold content in stream — hero renders before sidebar data.
9. ⚡ Don't await slow data in layout — move to page-level Suspense boundary.
10. 💡 `React.use()` for streaming data promises in Server Components.

### Caching Strategy

11. 🎯 Static assets: `Cache-Control: public, max-age=31536000, immutable`.
12. 🎯 API responses: `Cache-Control: private, max-age=0, must-revalidate` or `s-maxage=60`.
13. 💡 Stale-while-revalidate: serve cached, fetch fresh in background.
14. 🎯 Service Worker cache-first for static assets, network-first for API.
15. ⚡ CDN cache invalidation on deploy — purge or versioned asset URLs.

---

## 6. Runtime Performance

1. ⚡ `React.memo` only after Profiler shows unnecessary re-renders.
2. 🎯 `useMemo`/`useCallback` only when passing to memoized children or expensive computation.
3. 💡 React Compiler (React 19): automatic memoization — reduces manual optimization need.
4. 🎯 Web Workers for CPU-intensive tasks — image processing, PDF parsing, data transformation.
5. ⚡ `requestIdleCallback` for non-critical work — analytics, prefetch, cleanup.
6. 🎯 `IntersectionObserver` for lazy loading — not scroll event listeners.
7. 💡 `content-visibility: auto` for off-screen sections — browser skips rendering.
8. 🎯 `contain: layout style paint` on independent components — limits layout recalculation scope.
9. ⚡ Avoid `useEffect` for data fetching — use Server Components or TanStack Query.
10. 🎯 Batch DOM reads and writes — read all layout properties, then write all changes.

---

## 7. Monitoring & Budgets

1. 🎯 Performance budgets in CI: max bundle size, max LCP, max CLS.
2. ⚡ Lighthouse CI on every PR — block merge if scores drop below threshold.
3. 🎯 Real User Monitoring (RUM): Vercel Analytics, web-vitals library, Google CrUX.
4. 💡 Field data > lab data — CrUX reports actual user experience.
5. 🎯 Alert on P75 LCP/INP/CLS degradation — not just averages.
6. 🎯 `web-vitals` npm package: report CWV to analytics endpoint.
7. 💡 Performance regression tests in Playwright: measure LCP programmatically.
8. 🎯 Bundle size tracking over time — `@next/bundle-analyzer` in CI artifact.
9. ⚡ Source maps in production for error tracking only — not in client bundle.
10. 🎯 Monthly performance review: top 10 slowest pages, regression trends, action items.
