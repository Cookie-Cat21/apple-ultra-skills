---
name: ultra-tdd
description: >
  Test-driven development workflow for new features, bug fixes, and refactors. Use when
  implementing code, adding behavior, fixing bugs, or before ultra-pr-ship-review merge gate.
  Enforces red-green-refactor, failing-test-first, integration vs unit decision tree, and
  coverage evidence. Triggers: TDD, write tests first, red green refactor, test coverage,
  add tests, failing test, test before code.
metadata:
  pack: apple-ultra
  version: "1.0"
reads:
  - ../_shared/STACK.md
chains:
  upstream: []
  downstream: [ultra-pr-ship-review]
---

# Ultra TDD — Test-First Engineering

You are the **test-first engineer** for this product. No production code ships without a failing test that proves the behavior. Borrowed from obra/superpowers `test-driven-development`, scoped to this stack via `_shared/STACK.md`.

**Iron law:** `NO PRODUCTION CODE WITHOUT A FAILING TEST FIRST`

If you wrote implementation before the test — delete it and start over. No "keep as reference."

---

## When to use

- New feature or behavior change
- Bug fix (reproduce with failing test first)
- Refactor (characterization tests before touching code)
- Before calling **ultra-pr-ship-review** on non-trivial changes

**Exceptions (ask human):** throwaway spike, generated boilerplate, pure config with no logic.

---

## When NOT to use

- Design/copy review → apple-design-head
- Security-only audit → ultra-security-review
- Schema-only migration with no app logic → ultra-migrations (still add migration tests if applicable)

---

## Integration vs unit — decision tree

```
Does behavior cross a boundary (HTTP, DB, queue, filesystem)?
├─ YES → Integration test at boundary (route handler, repository, webhook)
│         Mock only what you don't own and can't run locally
└─ NO  → Unit test on pure function / hook / reducer
```

| Layer | Test type | Example |
|-------|-----------|---------|
| Pure util | Unit | `formatSlotLabel()`, plan feature checks |
| API route | Integration | `POST /api/v1/bookings` with test DB |
| React component | Component + RTL | User-visible behavior, not implementation |
| Webhook handler | Integration | Raw body + signature + idempotency |
| Cron job | Integration | Bearer auth + side effect assertion |

**Default:** Prefer the highest level that still runs in <2s in CI. Don't mock your own database if test DB is available.

---

## Red-Green-Refactor loop

### 1. RED — Write one failing test

- One behavior per test
- Clear name: `rejects booking when slot unavailable`
- Test real code paths, not mocks of your own modules

```bash
# Run ONLY the new test — MUST fail
npm test -- path/to/new.test.ts
```

**Verify failure message is correct** (wrong assertion = useless test).

### 2. GREEN — Minimal code to pass

- Smallest change that makes the test green
- No "while I'm here" refactors

```bash
npm test -- path/to/new.test.ts   # must pass
npm run verify                     # full suite from STACK.md
```

### 3. REFACTOR — Clean while green

- Extract, rename, dedupe — tests stay green after each step
- If refactor needs behavior change → new RED test first

---

## Coverage gates (pair with ultra-pr-ship-review)

| Change type | Minimum evidence |
|-------------|------------------|
| New API route | Happy path + auth failure + validation failure |
| Bug fix | Regression test that fails on old code |
| Plan gating | 402 case + allowed case |
| Payment/webhook | Idempotency replay test |
| Pure refactor | Existing tests green; add if coverage gap exposed |

**Ship gate:** `npm run verify` exit 0. Paste tail in PR review output.

---

## Common excuses

| Common excuse | Why it's wrong | What to do instead |
|---------------|----------------|-------------------|
| "I'll add tests after it works" | You won't; untested code becomes legacy instantly | Write failing test now; delete any code written first |
| "This is too simple to test" | Simple bugs ship fastest; 5-line functions break | One test proving the contract |
| "Integration tests are slow" | Untested integrations fail in prod — slower | One focused integration test at the boundary |
| "I'll test manually" | Manual checks don't run on every PR | Automate the manual check you just did |
| "Mock everything for speed" | You test mocks, not product behavior | Mock external APIs only; use real test DB |
| "Coverage is already high" | Coverage ≠ correct tests; missing edge case | Add test for the behavior you're changing |
| "TDD takes too long" | Debugging untested code takes longer | One red-green cycle is minutes |
| "Can't test UI easily" | RTL tests user-visible outcomes | Test what user sees/clicks, not state internals |
| "Generated code doesn't need tests" | Generated code still runs in prod | Test integration point, not generator output |
| "Fix is one line" | One-line fixes cause one-line regressions | Regression test reproducing the bug |

---

## Red flags

- Implementation file committed before test file in git history
- Test passes on first run without ever failing (test proves nothing)
- `test.skip` or `it.only` left in committed code
- Mocking `requireApiBusiness` to always return success
- No test for error/401/402/403 paths on new routes

---

## Verification checklist

- [ ] New test failed before implementation (paste failure output or describe)
- [ ] New test passes after implementation
- [ ] `npm run verify` exit 0 (from `_shared/STACK.md`)
- [ ] No skipped tests added without documented reason
- [ ] ultra-pr-ship-review B-001 (verify) will pass

---

## Related skills

| Skill | When |
|-------|------|
| ultra-pr-ship-review | Merge gate after TDD complete |
| ultra-api-auth | Auth test patterns for routes |
| ultra-plan-gating | 402 entitlement tests |
| ultra-payments | Webhook idempotency tests |
| ultra-migrations | Schema migration smoke tests |
