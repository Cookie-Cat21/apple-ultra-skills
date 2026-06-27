# Apple Ultra: Architecture Reference (100+ Patterns)

> Cross-reference: [SKILL.md](../SKILL.md) Section 4. Load when Architecture Ultra-Mode is active.

---

## 1. SOLID Principles (20 Rules)

### Single Responsibility

1. ⚡ One reason to change per module. Violation: `UserService` that handles auth, email, and profile.
   ```typescript
   // Bad: one file does everything
   class UserService { login() {} sendEmail() {} updateProfile() {} }
   // Good: separated concerns
   class AuthService { login() {} }
   class EmailService { send() {} }
   class ProfileService { update() {} }
   ```

### Open/Closed

2. 🎯 Open for extension, closed for modification. Violation: switch statements on type.
   ```typescript
   // Bad: add new type = modify function
   function getPrice(item: Item) { if (item.type === 'book') ... else if ... }
   // Good: strategy pattern
   interface PricingStrategy { getPrice(item: Item): number }
   class BookPricing implements PricingStrategy { getPrice(item) { ... } }
   ```

### Liskov Substitution

3. ⚡ Subtypes must be substitutable for base types. Violation: `Square extends Rectangle` that breaks `setWidth`.
4. 💡 If a subclass throws errors the parent doesn't, or requires preconditions the parent doesn't, it violates LSP.

### Interface Segregation

5. 🎯 Clients should not depend on interfaces they don't use. Violation: fat interface with 20 methods.
   ```typescript
   // Bad: force implementers to stub unused methods
   interface Storage { read(); write(); delete(); list(); watch(); backup(); }
   // Good: segregated
   interface Readable { read(): Data }
   interface Writable { write(data: Data): void }
   ```

### Dependency Inversion

6. ⚡ Depend on abstractions, not concretions. Violation: importing `PrismaClient` directly in business logic.
   ```typescript
   // Bad: tight coupling to Prisma
   import { prisma } from './db'
   function getUser(id: string) { return prisma.user.findUnique({ where: { id } }) }
   // Good: depend on interface
   interface UserRepository { findById(id: string): Promise<User> }
   function getUser(id: string, repo: UserRepository) { return repo.findById(id) }
   ```

7. 🎯 Inject dependencies via constructor or function parameter — not module-level imports.
8. 💡 DI container (or manual wiring) at app entry point — business logic never imports infrastructure.
9. 🎯 Test doubles implement same interface as production — swap without changing business logic.
10. ⚡ No `new DatabaseClient()` inside business functions — pass it in.

### Applied SOLID

11. 🎯 React: one component per concern. Container (data) + Presentational (UI) when complexity warrants.
12. 💡 Custom hooks extract logic (SRP), components handle rendering.
13. 🎯 API routes: thin handlers that validate input, call service, return response. Business logic in services.
14. ⚡ Services don't import `NextRequest`/`NextResponse` — framework-agnostic business logic.
15. 🎯 Event handlers in UI call service functions — never business logic inline in JSX.
16. 💡 Middleware chain pattern: auth → validation → rate limit → handler. Each middleware one concern.
17. 🎯 Plugin architecture for extensibility: define interface, register implementations at startup.
18. ⚡ Configuration via environment variables, not hardcoded constants in business logic.
19. 🎯 Error types as discriminated unions — caller handles each case explicitly.
20. 💡 Composition over inheritance in TypeScript — use interfaces + composition, not class hierarchies.

---

## 2. Feature Slicing (15 Rules)

1. 🎯 Organize by feature: `src/features/auth/`, `src/features/billing/` — not `src/components/`, `src/hooks/`.
2. ⚡ Feature folder contains: components, hooks, services, types, tests — everything for that feature.
3. 🎯 `src/shared/` for cross-feature utilities — UI primitives, hooks, types used by 2+ features.
4. 💡 `src/app/` (Next.js) for routing only — thin pages that import from features.
5. 🎯 Feature boundaries: a feature never imports from another feature's internals — only from its public API (`index.ts`).
6. ⚡ Shared UI components in `src/shared/ui/` — Button, Input, Modal. Feature-specific in feature folder.
7. 🎯 Feature flags: `src/features/auth/flags.ts` — enable/disable features without deleting code.
8. 💡 A/B test variants as feature subfolders: `src/features/checkout/variants/a/`, `variants/b/`.
9. 🎯 Each feature exports public API via `index.ts` — internal files are not imported externally.
10. 🎯 Feature README: purpose, public API, dependencies, owner team.
11. 💡 Monorepo: each feature can become a package — `packages/auth/`, `packages/billing/`.
12. ⚡ No circular imports between features — if A needs B, extract shared code to `shared/`.
13. 🎯 New feature checklist: folder structure, public API, tests, Storybook stories, feature flag.
14. 🎯 Deprecating a feature: flag off → migrate users → delete folder. Never half-delete.
15. 💡 Vertical slices in backend too: `features/orders/api/`, `features/orders/domain/`, `features/orders/infra/`.

---

## 3. API Design (20 Rules)

1. 🎯 REST conventions: nouns for resources (`/users`, `/orders`), HTTP verbs for actions.
2. ⚡ `GET` idempotent and safe. `POST` creates. `PUT` replaces. `PATCH` partial update. `DELETE` removes.
3. 🎯 Status codes: 200 OK, 201 Created, 204 No Content, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 409 Conflict, 422 Unprocessable, 429 Too Many Requests, 500 Internal Error.
4. 💡 Error response format: `{ error: { code: "VALIDATION_ERROR", message: "...", details: [...] } }`.
5. 🎯 Pagination: cursor-based for real-time data, offset for static lists. Always include `hasMore` and `nextCursor`.
6. ⚡ Rate limiting headers: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`.
7. 🎯 API versioning: `/v1/users` in URL path — not headers. Version when breaking, not for every change.
8. 💡 tRPC: end-to-end type safety. Define router with Zod input, TypeScript output — client gets types automatically.
9. 🎯 GraphQL: colocate fragments with components. `UserCard.fragments.user` — fetch only needed fields.
10. 🎯 GraphQL mutations: return the modified object + affected fields — client updates cache without refetch.
11. ⚡ Input validation at API boundary with Zod — same schema shared with client forms.
12. 🎯 Idempotency keys for POST: `Idempotency-Key` header — prevent duplicate creates on retry.
13. 💡 Webhook design: POST with signature verification, retry with exponential backoff, idempotent processing.
14. 🎯 Bulk operations: `POST /users/bulk` with array — return partial success with per-item errors.
15. 🎯 Filtering: `?status=active&sort=-createdAt&limit=20` — consistent query param conventions.
16. ⚡ Never expose internal IDs that leak information — use UUIDs or opaque tokens.
17. 🎯 HATEOAS links in responses for discoverable APIs: `{ data: {...}, links: { self, next, prev } }`.
18. 💡 OpenAPI/Swagger spec generated from code — not maintained separately.
19. 🎯 Request/response logging: log method, path, status, duration — never log bodies with PII.
20. ⚡ CORS: whitelist specific origins — never `Access-Control-Allow-Origin: *` with credentials.

---

## 4. State Architecture (15 Rules)

1. 🎯 Decision tree: local state → lifted state → context → Zustand → Redux. Start simple, escalate when needed.
2. 💡 Server state (TanStack Query) is separate from client state (Zustand/Context) — different lifecycles.
3. 🎯 Normalized state: `{ users: { byId: { '1': {...} }, allIds: ['1', '2'] } }` — O(1) lookups.
4. ⚡ Denormalize for display when read performance matters — sync on write, not on every read.
5. 🎯 Selectors: derive computed state from normalized store — don't store what you can compute.
6. 💡 Zustand slices with middleware: `persist` for localStorage, `devtools` for debugging, `immer` for immutable updates.
7. 🎯 Optimistic updates: update UI immediately, rollback on error, reconcile on server response.
8. ⚡ URL as state for shareable UI: filters, pagination, selected tab in search params.
9. 🎯 Form state isolated from global state — `react-hook-form` manages form, submits to server state.
10. 💡 Event sourcing for audit-critical domains: store events, derive state — orders, payments, permissions.
11. 🎯 State machines (XState) for complex flows: checkout, onboarding, multi-step forms.
12. ⚡ Hydration: server-rendered state must match client initial state — mismatch causes React warnings.
13. 🎯 Persistence: only persist user preferences and drafts — not fetched data (TanStack Query handles cache).
14. 💡 State colocation: keep state as close to where it's used as possible — global state is a last resort.
15. 🎯 Cleanup on unmount: cancel in-flight requests, clear timers, unsubscribe from stores.

---

## 5. Module Boundaries (15 Rules)

1. 🎯 Barrel exports (`index.ts`) at feature boundaries only — not in every subdirectory.
2. ⚡ Deep barrel exports hide dependency graphs and slow TypeScript compilation.
3. 🎯 Named exports only for shared modules — enables tree-shaking and refactoring.
4. 💡 `package.json` `exports` field for monorepo packages — explicit public API surface.
5. 🎯 Circular dependency detection: `madge --circular src/` in CI — zero tolerance.
6. ⚡ Fix circular deps by extracting shared code to a third module — not by merging modules.
7. 🎯 Import direction: `app → features → shared → lib` — never upstream.
8. 💡 Type-only imports (`import type`) don't create runtime circular dependencies — but still a design smell.
9. 🎯 Absolute imports via path aliases: `@/features/auth` — not `../../../features/auth`.
10. 🎯 `tsconfig paths` match bundler aliases — keep them in sync.
11. 💡 Monorepo: Turborepo or Nx for build orchestration — independent package builds with shared cache.
12. 🎯 Shared packages versioned independently — breaking change in `@repo/ui` doesn't force bump in `@repo/auth`.
13. ⚡ No business logic in `shared/` — only generic utilities, UI primitives, types.
14. 🎯 Dead code elimination: `knip` or `ts-prune` in CI — unused exports are tech debt.
15. 💡 Module size limit: 300 lines soft, 500 lines hard — split when exceeded.

---

## 6. Design Patterns (15 Rules)

### Repository Pattern

1. 🎯 Abstract data access behind interface. Swap database without changing business logic.
   ```typescript
   interface OrderRepository { findById(id: string): Promise<Order | null> }
   class PrismaOrderRepository implements OrderRepository { ... }
   ```

### Command Pattern

2. 💡 Encapsulate actions as objects with `execute()` — enables undo, logging, queuing.
   ```typescript
   interface Command { execute(): Promise<void>; undo(): Promise<void> }
   class CreateOrderCommand implements Command { ... }
   ```

### Observer Pattern

3. 🎯 Event bus for cross-feature communication — publish/subscribe without direct imports.
   ```typescript
   eventBus.emit('order:created', { orderId })
   eventBus.on('order:created', sendConfirmationEmail)
   ```

### Factory Pattern

4. 💡 Factory functions for complex object creation — hide construction logic.
   ```typescript
   function createPaymentProcessor(provider: 'stripe' | 'paypal'): PaymentProcessor { ... }
   ```

### Strategy Pattern

5. 🎯 Pluggable algorithms via interface — pricing, shipping, notification channels.
   ```typescript
   interface NotificationChannel { send(message: Message): Promise<void> }
   ```

### Applied Patterns

6. 🎯 React render props and compound components are composition patterns — prefer over HOCs.
7. 💡 Middleware pattern in Next.js, Express, tRPC — chain of responsibility for request processing.
8. 🎯 Adapter pattern: wrap third-party APIs behind your interface — swap providers without changing consumers.
9. ⚡ Decorator pattern: wrap functions with logging, caching, auth — via higher-order functions in TypeScript.
10. 🎯 Builder pattern for complex configuration objects — fluent API with validation at `build()`.
11. 💡 Saga pattern for distributed transactions — compensating actions on failure.
12. 🎯 CQRS: separate read and write models for complex domains — different optimization strategies.
13. ⚡ Anti-corruption layer between bounded contexts — translate external models to your domain.
14. 🎯 Specification pattern: composable business rules as objects — `isActive.and(hasPermission('edit'))`.
15. 💡 Outbox pattern for reliable event publishing — write event to DB in same transaction as state change.
