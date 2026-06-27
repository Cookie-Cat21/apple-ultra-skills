# SKILLS-SCOUT-11 — ultra-scheduling-engine vs skills.sh

**Date:** 2026-06-27  
**Pack:** apple-ultra-skills (`ultra-scheduling-engine`)  
**Method:** `npx skills find` on skills.sh (install counts from CLI output)

## Queries run

```bash
npx skills find booking
npx skills find calendar
npx skills find scheduling
npx skills find appointment
npx skills find availability
```

---

## Top 5 — booking (`npx skills find booking`)

| Rank | Skill | Installs | URL |
|------|-------|----------|-----|
| 1 | `nomadamas/k-skill@ktx-booking` | 3.4K | https://skills.sh/nomadamas/k-skill/ktx-booking |
| 2 | `nomadamas/k-skill@srt-booking` | 3K | https://skills.sh/nomadamas/k-skill/srt-booking |
| 3 | `nomadamas/k-skill@intercity-bus-booking` | 994 | https://skills.sh/nomadamas/k-skill/intercity-bus-booking |
| 4 | `nomadamas/k-skill@express-bus-booking` | 988 | https://skills.sh/nomadamas/k-skill/express-bus-booking |
| 5 | `bookingdesk-ai/kontour-travel-planner@kontour-travel-planner` | 243 | https://skills.sh/bookingdesk-ai/kontour-travel-planner/kontour-travel-planner |

## Top 5 — calendar (`npx skills find calendar`)

| Rank | Skill | Installs | URL |
|------|-------|----------|-----|
| 1 | `open.feishu.cn@lark-calendar` | 300.4K | https://skills.sh/open.feishu.cn/lark-calendar |
| 2 | `larksuite/cli@lark-calendar` | 279.3K | https://skills.sh/larksuite/cli/lark-calendar |
| 3 | `googleworkspace/cli@gws-calendar` | 34.9K | https://skills.sh/googleworkspace/cli/gws-calendar |
| 4 | `googleworkspace/cli@gws-calendar-agenda` | 29.7K | https://skills.sh/googleworkspace/cli/gws-calendar-agenda |
| 5 | `googleworkspace/cli@gws-calendar-insert` | 28.7K | https://skills.sh/googleworkspace/cli/gws-calendar-insert |

## Top 5 — scheduling (`npx skills find scheduling`)

| Rank | Skill | Installs | URL |
|------|-------|----------|-----|
| 1 | `iii-hq/skills@iii-cron-scheduling` | 249 | https://skills.sh/iii-hq/skills/iii-cron-scheduling |
| 2 | `secondsky/sap-skills@sap-btp-job-scheduling` | 161 | https://skills.sh/secondsky/sap-skills/sap-btp-job-scheduling |
| 3 | `claude-dev-suite/claude-dev-suite@cron-scheduling` | 150 | https://skills.sh/claude-dev-suite/claude-dev-suite/cron-scheduling |
| 4 | `louisblythe/salesskills@callback-scheduling` | 133 | https://skills.sh/louisblythe/salesskills/callback-scheduling |
| 5 | `membranedev/application-skills@acuity-scheduling` | 94 | https://skills.sh/membranedev/application-skills/acuity-scheduling |

## Top 5 — appointment + availability (niche queries)

| Rank | Skill | Installs | Query |
|------|-------|----------|-------|
| 1 | `louisblythe/salesskills@appointment-booking` | 203 | appointment |
| 2 | `nomadamas/k-skill@ticket-availability` | 946 | availability |
| 3 | `tddworks/asc-cli-skills@asc-availability` | 43 | availability |
| 4 | `louisblythe/sales-skills@appointment-booking` | 33 | appointment |
| 5 | `membranedev/application-skills@acuity-scheduling` | 94 | scheduling |

## Top 5 — composite scheduling/booking leaderboard (product-relevant)

| Rank | Skill | Installs | Category |
|------|-------|----------|----------|
| 1 | `googleworkspace/cli@gws-calendar` | 34.9K | calendar API (external sync) |
| 2 | `nomadamas/k-skill@ktx-booking` | 3.4K | vertical booking (transport) |
| 3 | `nomadamas/k-skill@srt-booking` | 3K | vertical booking (transport) |
| 4 | `louisblythe/salesskills@appointment-booking` | 203 | appointment SaaS |
| 5 | `membranedev/application-skills@acuity-scheduling` | 94 | Acuity integration |

*Feishu/Lark calendar skills (300K+ installs) are enterprise calendar APIs — not appointment-slot engines.*

---

## Gaps — ultra-scheduling-engine vs skills.sh leaders

| Dimension | skills.sh leaders | ultra-scheduling-engine today | Gap |
|-----------|-------------------|---------------------------------|-----|
| **Category shape** | Transport booking (nomadamas 3.4K), calendar APIs (Google 35K), cron scheduling (249) | Public `/book` slot engine with holds + TZ | No direct competitor for **SaaS appointment slots** |
| **Calendar sync** | gws-calendar 34.9K — insert/agenda/list events | Confirmed page calendar display only | No Google/Outlook two-way sync skill or doc |
| **Vertical booking** | KTX/SRT bus skills — domain-specific APIs | Generic service/staff/slot model | Ahead on **reusable booking invariants** (B1–B7) |
| **Acuity/Calendly** | acuity-scheduling 94 — integration wrapper | First-party engine | Opportunity: "migrate from Acuity" guide |
| **Sales appointment** | appointment-booking 203 — sales workflow | Product booking + payment handoff | Sales skill lacks holds/idempotency/TZ rigor |
| **Cron scheduling** | iii-cron-scheduling 249 | Hold expiry via app logic | Document cron release path for stale holds |
| **Distribution** | Fragmented low-install niche skills | Not on skills.sh | Could own "appointment booking engine" search |

**Net:** ultra-scheduling-engine is **ahead of everything on skills.sh for slot holds, timezone correctness, and double-book protection**. Closest competitors are **vertical transport bookers** and **calendar API wrappers**, not appointment SaaS engines. Biggest gap: **external calendar sync** and **skills.sh discoverability**.

---

## Recommended PR

**Title:** `feat(ultra-scheduling-engine): evals + calendar-sync stub + skills.sh appointment niche`

### Scope

1. **`evals/evals.json`** — 4 regression cases (match `apple-design-head` pattern):
   - Client-only hold → P0
   - UTC slot label for Asia/target market business → P0
   - Double POST book without idempotency key → P0
   - SC6 inline next-slot recovery missing → P1

2. **`references/calendar-sync.md`** (stub, not full implementation):
   - When to integrate `googleworkspace/cli@gws-calendar` (34.9K) for **post-book event insert**
   - Explicit non-goal: two-way availability sync in v1
   - Handoff to `ultra-integrations` for OAuth scaffolding

3. **Hold expiry cron doc** — Link `iii-hq/skills@iii-cron-scheduling` pattern to existing cron route in `_shared/PATHS.md`; add invariant B8: stale holds released by cron within 2× `SLOT_HOLD_MINUTES`.

4. **`references/migrate-from-acuity.md`** — Compete with `membranedev/application-skills@acuity-scheduling` (94 installs):
   - Map Acuity concepts → your schema (services, availability, buffers)
   - Preserve B1–B7 during migration

5. **skills.sh publish** — Keywords: `booking`, `appointment`, `availability`, `scheduling`, `timezone`, `slots`. Description: *"Public booking engine: holds, timezone-aware slots, idempotent create — not a calendar API wrapper."*

### Success metrics

- evals in CI; 4/4 fail without skill loaded
- `ultra-pr-ship-review` booking checklist cross-links PATTERNS.md SC1–SC10
- skills.sh baseline under `booking` + `appointment` queries (vs louisblythe 203)

### Out of scope

- Feishu/Lark calendar integration
- Full Google Calendar two-way sync implementation
- Transport/ticketing verticals (nomadamas domain)
