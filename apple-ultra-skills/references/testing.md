# Apple Ultra: Testing Reference (80+ Rules)

> Cross-reference: [SKILL.md](../SKILL.md) Section 5. Load when Testing Ultra-Mode is active.

---

## 1. TDD Workflow (15 Rules)

1. ⚡ Red → Green → Refactor. Always. Write the failing test first.
2. 🎯 Simplest failing test first — prove behavior doesn't exist, not comprehensive coverage.
3. ⚡ Test behavior, not implementation — refactoring internals shouldn't break tests.
4. 🎯 One logical assertion per test — multiple assertions obscure which behavior failed.
5. 💡 Test the contract at module boundaries — internals are free to change.
6. 🎯 TDD cycle time: <2 minutes per red-green-refactor iteration. Slow tests kill TDD.
7. ⚡ If you can't write a test, the API design is wrong — redesign before implementing.
8. 🎯 Start with integration test for new feature, then unit tests for edge cases.
9. 💡 Characterization tests before refactoring legacy code — capture current behavior, then improve.
10. 🎯 Test names are documentation — a new developer reads test names to understand behavior.
11. ⚡ Delete tests that only check implementation details — they slow refactoring.
12. 🎯 Refactor only on green — never refactor and add features in the same step.
13. 💡 Spike first for unknown APIs, then delete spike and TDD the real implementation.
14. 🎯 Test data builders over object literals — `buildUser({ role: 'admin' })` not `{ id: '1', name: '...', ... }`.
15. ⚡ TDD for bug fixes: write test that reproduces bug, then fix. Test prevents regression.

---

## 2. Test Naming & Organization (10 Rules)

1. 🎯 Format: `given [precondition], when [action], then [expected outcome]`.
2. 🎯 `describe` blocks match module/function under test — nested `describe` for method groups.
3. 💡 `it` blocks are sentences: `it('redirects unauthenticated users to login')`.
4. 🎯 Test file next to source: `Button.test.tsx` beside `Button.tsx`.
5. 🎯 Test utilities in `test-utils/` or `__tests__/helpers/` — render wrappers, factories, mocks.
6. 💡 Shared test setup in `beforeEach` — reset state, clear mocks, seed data.
7. 🎯 `afterEach` cleanup: restore timers, clear DOM, reset modules if needed.
8. ⚡ Never `test.only` or `describe.only` in committed code — CI must run all tests.
9. 🎯 Skip tests with `it.skip` + TODO comment explaining why — not deleted.
10. 💡 Tag slow tests: `it('full checkout flow', { timeout: 30000 }, ...)` — separate from fast suite.

---

## 3. What to Test (15 Rules)

1. ⚡ Test pyramid: many unit → fewer integration → few E2E.
2. 🎯 E2E covers 5 critical flows: sign up, log in, core action, payment, log out.
3. 💡 Don't mock what you don't own — mock 3rd party APIs, use real implementations for your code.
4. ⚡ No `Math.random()` or `Date.now()` — `vi.setSystemTime()`, fixed seeds.
5. 🎯 Test error paths explicitly — every `catch` block needs a test.
6. 💡 Property-based testing (`fast-check`) for pure functions with many input combinations.
7. 🎯 Boundary values: 0, 1, max, max+1, empty, null, undefined.
8. ⚡ Test async code with `await` and `waitFor` — never arbitrary `setTimeout` in tests.
9. 🎯 Snapshot tests for stable output (error messages, generated HTML) — not for components that change often.
10. 💡 Snapshot review in PR: changed snapshots must be intentional, not auto-accepted.
11. 🎯 Test accessibility in component tests: `expect(screen.getByRole('button')).toBeInTheDocument()`.
12. ⚡ Test loading, error, and empty states — not just happy path.
13. 🎯 Test authorization: can user A access user B's resource? Test the negative case.
14. 💡 Contract tests between services: consumer defines expected API shape, provider verifies.
15. 🎯 Mutation testing quarterly (`stryker`) — surviving mutants mean weak tests.

---

## 4. Vitest + React Testing Library (15 Rules)

1. 🎯 Query priority: `getByRole` > `getByLabelText` > `getByText` > `getByTestId`.
2. ⚡ `getByRole('button', { name: 'Submit' })` — accessible name, not CSS selector.
3. 🎯 `userEvent` over `fireEvent` — simulates real user interactions (typing, clicking, tabbing).
4. 💡 `userEvent.setup()` per test for proper event handling and cleanup.
5. 🎯 `render` with providers wrapper: `render(<Component />, { wrapper: AllProviders })`.
6. ⚡ `screen` from RTL — not destructuring `render` return value.
7. 🎯 `waitFor` for async state changes — `await waitFor(() => expect(...).toBeInTheDocument())`.
8. 💡 `findBy` queries are `waitFor` + `getBy` combined — use for elements that appear async.
9. 🎯 `within(container)` to scope queries — test modal content without matching background.
10. ⚡ `vi.mock()` at module level — mock external dependencies, not internal modules.
11. 🎯 `vi.fn()` for spy callbacks — `expect(mockFn).toHaveBeenCalledWith(expected)`.
12. 💡 `vi.spyOn(console, 'error')` to verify error handling without suppressing output.
13. 🎯 `@testing-library/jest-dom` matchers: `toBeVisible`, `toBeDisabled`, `toHaveTextContent`.
14. ⚡ `cleanup` is automatic with Vitest + RTL — don't manually unmount unless testing cleanup.
15. 🎯 `renderHook` for testing custom hooks — `const { result } = renderHook(() => useMyHook())`.

---

## 5. Playwright E2E Patterns (15 Rules)

1. 🎯 Page Object Model: `class LoginPage { constructor(page) {} async login(email, pwd) {} }`.
2. ⚡ Semantic selectors: `page.getByRole('button', { name: 'Sign in' })` — not CSS/XPath.
3. 🎯 `await expect(locator).toBeVisible()` — auto-waits, no manual `sleep`.
4. 💡 `page.waitForURL('/dashboard')` after navigation actions.
5. 🎯 Fixtures for auth state: `test.use({ storageState: 'auth.json' })` — login once, reuse.
6. ⚡ `test.beforeEach` for common setup — navigate to page, seed data.
7. 🎯 Parallel execution: `test.describe.configure({ mode: 'parallel' })` for independent tests.
8. 💡 `test.step()` for readable test reports — group related actions.
9. 🎯 Visual regression: `await expect(page).toHaveScreenshot()` — baseline in CI.
10. ⚡ Network interception: `page.route('**/api/users', route => route.fulfill({ json: mockUsers }))`.
11. 🎯 Mobile viewport testing: `test.use({ viewport: { width: 375, height: 812 } })`.
12. 💡 `trace: 'on-first-retry'` in config — debug flaky tests with Playwright trace viewer.
13. 🎯 Test isolation: each test gets fresh browser context — no shared state between tests.
14. ⚡ `test.slow()` for tests >30s — triples timeout, marks in report.
15. 🎯 CI: run against production build (`npm run build && npm start`), not dev server.

---

## 6. Mock Service Worker (10 Rules)

1. 🎯 MSW intercepts at network level — tests use real `fetch`, real React Query, real components.
2. ⚡ Handlers in `mocks/handlers.ts` — one handler per API endpoint.
3. 🎯 `http.get('/api/users', () => HttpResponse.json(mockUsers))` — match URL patterns.
4. 💡 `server.use()` in individual tests to override default handlers — test error cases.
5. 🎯 `onUnhandledRequest: 'error'` in test setup — catch missing handlers early.
6. ⚡ MSW in browser (development) and Node (tests) — same handlers, different setup.
7. 🎯 Response delays: `delay(500)` to test loading states realistically.
8. 💡 `graphql.query()` and `graphql.mutation()` for GraphQL APIs.
9. 🎯 Seed realistic data with factory functions — not hardcoded arrays of 1 item.
10. ⚡ Reset handlers after each test: `afterEach(() => server.resetHandlers())`.

---

## 7. Testing Data & Factories (10 Rules)

1. 🎯 Factory functions: `buildUser(overrides?)` returns valid user with sensible defaults.
2. 💡 Faker.js for realistic data — `faker.internet.email()`, not `test@example.com` everywhere.
3. 🎯 Factory relationships: `buildOrder({ user: buildUser() })` — nested factories.
4. ⚡ Deterministic faker: `faker.seed(123)` in test setup — reproducible "random" data.
5. 🎯 Test database seeding: truncate + seed in `beforeEach` — clean state per test.
6. 💡 `test/fixtures/` for static files: images, CSVs, JSON responses.
7. 🎯 Builder pattern for complex test objects: `new OrderBuilder().withItems(3).withStatus('paid').build()`.
8. 🎯 Minimal data: create only fields the test needs — not full production objects.
9. 💡 Shared fixtures via `test.extend()` in Playwright — inject page objects and data.
10. ⚡ Never use production data in tests — generate synthetic data always.

---

## 8. CI Optimization (10 Rules)

1. 🎯 Parallel test runners: Vitest `pool: 'forks'`, Playwright `workers: 4`.
2. 🎯 Test splitting: run unit tests on every PR, E2E on merge to main.
3. 💡 Cache `node_modules` and test results in CI — GitHub Actions cache keyed on lockfile.
4. 🎯 Fail fast: `bail: 1` in CI for unit tests — don't run 500 tests after first failure.
5. ⚡ Flaky test detection: `--retry 2` in CI, flag tests that pass on retry.
6. 🎯 Coverage thresholds in CI: 80% lines, 70% branches — block PR if below.
7. 💡 Test report artifacts: upload HTML coverage report and Playwright trace on failure.
8. 🎯 Separate jobs: lint → typecheck → unit → integration → E2E — parallel where possible.
9. ⚡ E2E against preview deployment URL — test the actual deployed artifact.
10. 🎯 `@axe-core/playwright` in E2E suite — accessibility regression in CI.
