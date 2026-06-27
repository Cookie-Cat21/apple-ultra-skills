# SKILLS-SCOUT-10 — ultra-payments vs skills.sh

**Date:** 2026-06-27  
**Pack:** apple-ultra-skills (`ultra-payments`)  
**Method:** `npx skills find` on skills.sh (install counts from CLI output)

## Queries run

```bash
npx skills find stripe
npx skills find payments
```

---

## Top 5 — stripe (`npx skills find stripe`)

| Rank | Skill | Installs | URL |
|------|-------|----------|-----|
| 1 | `stripe/ai@stripe-best-practices` | 49.8K | https://skills.sh/stripe/ai/stripe-best-practices |
| 2 | `stripe/ai@upgrade-stripe` | 41.6K | https://skills.sh/stripe/ai/upgrade-stripe |
| 3 | `stripe/ai@stripe-projects` | 38.3K | https://skills.sh/stripe/ai/stripe-projects |
| 4 | `docs.stripe.com@stripe-directory` | 5.7K | https://skills.sh/docs.stripe.com/stripe-directory |
| 5 | `claude-office-skills/skills@stripe-payments` | 3K | https://skills.sh/claude-office-skills/skills/stripe-payments |

## Top 5 — payments (`npx skills find payments`)

| Rank | Skill | Installs | URL |
|------|-------|----------|-----|
| 1 | `shopify/shopify-ai-toolkit@shopify-payments-apps` | 5.5K | https://skills.sh/shopify/shopify-ai-toolkit/shopify-payments-apps |
| 2 | `claude-office-skills/skills@stripe-payments` | 3K | https://skills.sh/claude-office-skills/skills/stripe-payments |
| 3 | `okx/onchainos-skills@okx-agent-payments-protocol` | 1.9K | https://skills.sh/okx/onchainos-skills/okx-agent-payments-protocol |
| 4 | `dodopayments/skills@webhook-integration` | 707 | https://skills.sh/dodopayments/skills/webhook-integration |
| 5 | `dodopayments/skills@subscription-integration` | 668 | https://skills.sh/dodopayments/skills/subscription-integration |

## Top 5 — composite payments leaderboard (merged queries)

| Rank | Skill | Installs | Provider |
|------|-------|----------|----------|
| 1 | `stripe/ai@stripe-best-practices` | 49.8K | Stripe (official) |
| 2 | `stripe/ai@upgrade-stripe` | 41.6K | Stripe (official) |
| 3 | `stripe/ai@stripe-projects` | 38.3K | Stripe (official) |
| 4 | `shopify/shopify-ai-toolkit@shopify-payments-apps` | 5.5K | Shopify |
| 5 | `docs.stripe.com@stripe-directory` | 5.7K | Stripe docs |

---

## Gaps — ultra-payments vs skills.sh leaders

| Dimension | skills.sh leaders | ultra-payments today | Gap |
|-----------|-------------------|----------------------|-----|
| **Provider focus** | Stripe dominates (49.8K+ official skills) | payment gateway (MD5 hash, FormData webhooks, LKR) | Correct for product market; invisible to "stripe" / "payments" search |
| **PCI / 3DS guidance** | Stripe skills embed Elements, PaymentIntent flows | Research section cites PCI/3DS generically | Good theory; not mapped to gateway hosted checkout model |
| **Webhook idempotency** | dodopayments webhook-integration 707 | P2/P3 invariants P1–P7, strong | Ahead on booking-specific idempotency; tie to `event_id` pattern from Stripe skills |
| **Subscriptions** | dodopayments subscription-integration 668; Stripe projects 38.3K | `payment-gateway-subscriptions.ts` path documented | No eval fixture for subscription webhook replay |
| **Multi-provider** | Shopify, OKX crypto, Dodo | PayPal/manual in `src/lib/payments/providers/` mentioned briefly | No routing skill for "which provider" decisions |
| **Distribution** | Stripe official pack = 130K+ combined installs | Not on skills.sh | Zero share of largest payments category |

**Net:** ultra-payments is **best-in-class for non-Stripe regional gateways** (hash verify, redirect UX, booking confirm path). skills.sh is **Stripe-centric**. Opportunity: publish as **"webhook idempotency + hosted checkout"** skill that complements—not competes with—`stripe/ai@stripe-best-practices`.

---

## Recommended PR

**Title:** `feat(ultra-payments): provider-router + webhook evals + skills.sh non-Stripe niche`

### Scope

1. **`references/provider-matrix.md`** — When to use payment gateway vs PayPal vs manual; link to Stripe skill for teams that migrate:
   > "Stripe path → `npx skills add stripe/ai@stripe-best-practices`"

2. **Normalize webhook dedupe language** — Align P3 invariant with dodopayments/Stripe pattern:
   - Dedupe key: `(provider, event_id)` not body hash
   - Atomic claim-then-process in transaction
   - Document in Research section (already partially there; make P1 blocker in review mode)

3. **`evals/evals.json`** — 3 cases:
   - Unverified webhook updates booking → P0 fail
   - Duplicate notify replay → idempotent pass
   - `amount.toFixed(2)` hash mismatch → P0 fail

4. **`chains.parallel_when`** in SKILL.md (mirror pr-ship-review):
   - Payment PRs → `ultra-security-review`
   - Booking checkout UI → `ultra-scheduling-engine`

5. **skills.sh publish** — Keywords: `payments`, `webhook`, `checkout`, `idempotency`, `subscription` (not `stripe`). Description line: *"Regional gateway + webhook idempotency for booking SaaS — complements Stripe official skills."*

### Success metrics

- evals pass in CI (`validate-skills.py`)
- Cross-link from `ultra-cto` R2 and `ultra-pr-ship-review` payment checklist
- skills.sh listing under `payments` query (baseline vs dodopayments 707)

### Out of scope

- Forking or republishing Stripe official skills
- Crypto/OKX payment protocol support
