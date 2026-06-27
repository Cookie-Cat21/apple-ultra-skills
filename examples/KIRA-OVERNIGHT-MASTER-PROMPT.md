# Kira — Kapruka Agent Challenge · Apple Ultra Overnight Prompt

**Repo:** https://github.com/Cookie-Cat21/Kira  
**Challenge:** https://www.kapruka.com/contactUs/agentChallenge.html · **Deadline:** 30 June 2026  
**Skills pack:** https://github.com/Cookie-Cat21/apple-ultra-skills

Paste everything below `---` into a **Cursor Cloud Agent (24h)** session with the **Kira** repo open.

---

## ⬇️ PASTE FROM HERE

You are improving **Kira** — Ovindu's Kapruka Agent Challenge entry. The agent and website exist; your job is to bring them to **Apple Ultra quality** and maximize the official 100-point rubric. Work autonomously. Commit, push, deploy after every phase.

```
GITHUB_REPO:     https://github.com/Cookie-Cat21/Kira
LIVE_DEMO_URL:   <FILL IN — Vercel production URL judges will open>
BRANCH:          main (or create cursor/ultra-polish-overnight)
```

### What Kira already has (do NOT rebuild from scratch)

Read these first — they are the source of truth:
- `MASTERPLAN.md` — v2 shipped epics, judge demo script, self-score ~93/100
- `KIRA_E2E_FINDINGS.md` — P1 bugs S1/S2 still need decisions
- `KIRA_WEBSITE_REPLACEMENT_ANALYSIS.md` — shop vs chat gaps
- `LIQUID-GLASS-REVIEW-VERIFICATION.md` — 21 P0/P1 on glass kit branch
- `scripts/judge-dry-run.mjs` — 10-step automated judge path
- `scripts/test-personas.mjs` — 100 persona E2E suite

**Two surfaces — review separately:**
| Surface | Route | Ultra skills |
|---------|-------|--------------|
| **Challenge entry** | `/` (`KiraExperience`) | apple-design-head, ultra-web-quality, ultra-brand-voice |
| **Website replacement** | `/shop`, `/product/[id]` | apple-design-head, ultra-visual-system, ultra-component-discovery |
| **Agent brain** | `app/api/chat/route.ts`, `lib/` | ultra-cto, ultra-tdd, ultra-security-review |
| **Ship** | all | ultra-pr-ship-review |

### Step 0 — Wire Apple Ultra into Kira (do this first)

```bash
# In Kira repo root
curl -fsSL https://raw.githubusercontent.com/Cookie-Cat21/apple-ultra-skills/main/scripts/install.sh | sh
# OR
npx skills add Cookie-Cat21/apple-ultra-skills -y
```

Run **`ultra-teach`** — create `.ultra.md` at Kira root with:

```markdown
## Product
Kira — Sri Lanka's AI shopping companion for Kapruka Agent Challenge 2026.
Primary action: conversational gift shopping → guest checkout pay link.
Stage: submission polish.

## Users
Sri Lankan gift shoppers + diaspora sending gifts home. Judges on mobile.

## Design — Creative North Star
"The thoughtful cousin who knows Kapruka by heart" — warm, Tanglish, never corporate.

## Named Rules
- Full-screen chat is the hero — not a widget.
- Product cards always show image + LKR price + add action.
- Sinhala/Tamil modes must not destroy replies with catalog Unicode (fix S2).
- Shop (/shop) must match chat craft — same tokens, no second-class UI.
- Never hallucinate products — streaming anti-hallucination must work (fix S1).

## Benchmarks
Positive: Kaan-level checkout reliability, Kapruka mobile UX
Anti: generic AI gradient SaaS, wall-of-text product lists

## Stack
Verify: npm run lint && npm run build
Tests: node scripts/run-tests.mjs (62), node scripts/test-personas.mjs (100)
Judge: node scripts/judge-dry-run.mjs
MCP: https://mcp.kapruka.com/mcp
Model: Groq llama-3.3-70b-versatile

## Known P1 (from KIRA_E2E_FINDINGS.md)
- S1: Hallucination stop-hook bypassed during streaming
- S2: EN language guard destroys replies with Sinhala product names

## Paths
Chat UI: app/components/KiraExperience.tsx
Chat API: app/api/chat/route.ts
Shop: app/shop/, app/components/store/
MCP parsing: lib/mcp-parsing.ts
Prompt: lib/kira-prompt.ts
```

Copy or symlink `_shared/` templates from apple-ultra-skills and fill with Kira values.

Kapruka MCP — ensure `.cursor/mcp.json`:
```json
{ "mcpServers": { "kapruka": { "url": "https://mcp.kapruka.com/mcp" } } }
```

---

## Rubric — optimize for these points

| Category | Pts | Kira focus |
|----------|-----|------------|
| Experience & polish | **30** | `/` full-screen, mobile Safari, no jank, skeletons |
| Visual richness | **20** | ProductCard, ProductQuickView, CommerceRail — images not text |
| Personality | **15** | Repair-gift few-shots, Tanglish, CEO personality |
| Usefulness | **15** | Reorder, rush/sale fast-paths, gift discovery |
| End-to-end | **15** | judge-dry-run.mjs 10/10 green |
| Creativity | **5** | Sinhala welcome prompts, gift concierge angle |

**Bonus:** multi-cart ✅ · delivery dates ✅ · gift message ✅ · Sinhala/Tanglish ✅ · reorder ✅

---

## PHASE 1 — Fix P1 bugs (hours 0–4) · ultra-cto + ultra-tdd

From `KIRA_E2E_FINDINGS.md` — these lose judge trust if unfixed:

1. **S1** `app/api/chat/route.ts` — buffer first sentence before streaming OR run hallucination check pre-stream
2. **S2** Language guard — strip offending runs, don't replace entire reply when Kapruka product names contain Sinhala
3. Port `SENTINEL_RE` fallback detection to `scripts/evaluate.mjs` (core test suite)
4. Run: `node scripts/run-tests.mjs` → 62/62 · `node scripts/test-personas.mjs` → target 95%+ genuine pass

Commit: `fix(agent): S1 S2 streaming and language guard` → deploy

---

## PHASE 2 — Apple design review on chat (hours 4–8) · apple-design-head

Invoke **`apple-design-head`** on `app/components/`:
- KiraExperience.tsx, ProductCard, ProductQuickView, CheckoutModal, CommerceRail
- Run: `node scripts/lint-design-rules.mjs --path app/components/` (copy script from apple-ultra-skills if needed)
- Fix all RULE Critical/High from apple-design-head/RULES.md
- Targets: 44px touch targets, contrast, motion reduced, no AI-slop gradients on booking path

Invoke **`ultra-web-quality`** on LIVE_DEMO_URL:
- Lighthouse mobile: LCP <2.5s, CLS <0.1
- axe-core on chat flow

Commit: `feat(ui): apple-design-head P0/P1 fixes` → deploy

---

## PHASE 3 — Shop website polish (hours 8–12) · ultra-visual-system

The `/shop` replacement site must not look worse than chat — judges may browse both.

Invoke **`ultra-visual-system`** — audit `app/globals.css`, store tokens, dark mode  
Invoke **`apple-design-head`** on `app/components/store/`  
Invoke **`ultra-component-discovery`** — only if StoreProductCard needs upgrade

If `liquid-glass-kit` branch has unmerged fixes, evaluate P0s from `plans/009-liquid-glass-kit-review-findings.md` — do not merge broken glass effects to main.

Commit: `feat(shop): visual system alignment with chat` → deploy

---

## PHASE 4 — Personality & judge path (hours 12–16) · ultra-brand-voice

Invoke **`ultra-brand-voice`** — audit `lib/kira-prompt.ts`:
- Sinhala starter prompts on hero (MASTERPLAN judge script step 2)
- "Wife is angry" repair-gift path must fire deterministically (test 57)

Run judge script until green:
```bash
npm run dev   # or test against production
node scripts/judge-dry-run.mjs
npx playwright test
```

Record output in `CHALLENGE-AUDIT.md` with rubric self-score.

---

## PHASE 5 — Ship gate (hours 16–20) · ultra-pr-ship-review

```bash
npm run lint && npm run build
node scripts/run-tests.mjs
node scripts/test-personas.mjs --concurrency 1
node scripts/judge-dry-run.mjs
```

Invoke **`ultra-pr-ship-review`** — require SHIP verdict:
- No secrets in diff
- GROQ_API_KEY server-only
- Rate limit respect on kapruka_create_order (max 30/hr in testing)

Update `MASTERPLAN.md` submission checklist — live URL verified.

---

## PHASE 6 — Submission (hours 20–24)

1. Incognito mobile test of LIVE_DEMO_URL — full journey A→pay link
2. README.md — demo URL at top, 30-sec judge instructions
3. Create `SUBMISSION.md` — self-score table, demo script, sample prompts
4. Output final summary for Ovindu

### Judge journeys (all must pass)

| # | Prompt | Pass criteria |
|---|--------|---------------|
| A | "Birthday gift for amma in Colombo under 5000 LKR" | Products + cards |
| B | Sinhala: "මට තෑග්ගක් ඕනේ" | Unicode reply, products |
| C | "Wife is angry, send flowers" | Advice before search |
| D | Full checkout → pay link | kapruka_create_order |
| E | "Order again" | Reorder from session |
| F | "Track KP-XXXXX" | OrderTracker |

---

## Rules

- **Apple Ultra skills by name** at each phase — this is the quality standard Ovindu built the pack for.
- **Deploy after every phase** — judges need live URL.
- **Don't rewrite Kira** — fix P1s, polish, align shop to chat.
- **3 days left** — cut scope that doesn't move rubric points.

## Done when

- [ ] judge-dry-run.mjs 10/10 on production URL
- [ ] S1 + S2 fixed
- [ ] apple-design-head: 0 Critical on chat components
- [ ] CHALLENGE-AUDIT.md self-score ≥90/100
- [ ] LIVE_DEMO_URL works in mobile incognito

Output: final URL, rubric table, top 5 changes, Kapruka submission blurb.

## ⬆️ END PROMPT ⬆️
