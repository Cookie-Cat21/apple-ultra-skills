# Kira — Kapruka Agent Challenge Overnight Master Prompt

**Paste everything below the line into a new Cursor Cloud Agent (24-hour) session.**

**Deadline:** 30 June 2026 EOD · **~3 days left**  
**Prize:** Apple M4 Mac Mini · **Judge:** Kapruka engineering team  
**Official rubric:** https://www.kapruka.com/contactUs/agentChallenge.html

---

## ⬇️ PASTE FROM HERE ⬇️

You are building **Kira** — my Kapruka Agent Challenge entry. Win condition: score highest on Kapruka's published 100-point rubric. You have up to 24 hours. Work autonomously. Commit and push after each phase. Deploy to production after every major phase so the live URL always works.

### Repo & demo (FILL THESE IN BEFORE STARTING)

```
GITHUB_REPO:        <e.g. Cookie-Cat21/kira OR local path — agent: find Kira repo with mcp.kapruka.com>
LIVE_DEMO_URL:      <your public Vercel URL — must stay up for judges>
KIRA_PERSONALITY:   Warm Sri Lankan gift-shopping concierge. Fluent in English, Sinhala, and Tanglish. Never robotic.
```

If repo is not in GitHub, clone from wherever it lives first. Search my machine for `mcp.kapruka.com` or `kapruka_create_order` if needed.

### Install Apple Ultra Skills (mandatory — use for every review gate)

```bash
curl -fsSL https://raw.githubusercontent.com/Cookie-Cat21/apple-ultra-skills/main/scripts/install.sh | sh
# OR if already cloned:
npx skills add Cookie-Cat21/apple-ultra-skills -y
```

Skills live in `.cursor/skills/` or project skills folder. **Invoke by name** at each phase below.

### Kapruka MCP (mandatory — the whole challenge runs on this)

```json
// .cursor/mcp.json or project MCP config
{
  "mcpServers": {
    "kapruka": {
      "url": "https://mcp.kapruka.com/mcp"
    }
  }
}
```

**Tools you MUST use end-to-end:**
`kapruka_search_products` · `kapruka_get_product` · `kapruka_list_categories` · `kapruka_list_delivery_cities` · `kapruka_check_delivery` · `kapruka_create_order` · `kapruka_track_order`

**Rate limits (do not get us disqualified):**
- 60 req/min per IP
- 30 `kapruka_create_order` / hour per IP — use test orders sparingly; mock in dev

---

## WINNING STRATEGY (optimize for rubric, not features)

Kapruka scores out of 100:

| Category | Points | How Kira wins |
|----------|--------|---------------|
| Experience & polish | **30** | Full-screen immersive chat, zero jank, mobile-first, fast |
| Visual richness | **20** | Product image cards, carousels, cart UI — NOT walls of text |
| Personality | **15** | Kira voice: warm, witty, culturally Sri Lankan |
| Usefulness | **15** | Gift discovery → decision → cart in <5 turns |
| End-to-end checkout | **15** | Search → cart → delivery → pay link — every judge path works |
| Creativity | **5** | Surprise: Sinhala/Tanglish + gift concierge angle |

**Bonus differentiators (almost nobody has these — prioritize):**
1. 🇱🇰 **Sinhala language support** — UI + agent replies
2. 💬 **Tanglish** — natural code-switching ("mama gift ekak hadanna oni")
3. 🛒 **Multi-item cart**
4. 📅 **Delivery date constraints** with `kapruka_check_delivery`
5. 🎁 **Gift messaging** in checkout flow

Study competitor pattern: [Kaan gift concierge](https://medium.com/@kalanarandil/how-i-built-kaan-a-smart-gift-concierge-for-kapruka-866ebdb767ab) uses deterministic state machine + MCP. Kira should match reliability but beat on **visual polish + Sinhala**.

---

## PHASE 0 — Bootstrap (first 30 min)

1. Run **`ultra-teach`** — create `.ultra.md` for Kira with:
   - Product: Kira — Kapruka AI shopping agent for Agent Challenge
   - Users: Sri Lankan gift shoppers, diaspora sending gifts home
   - Creative North Star: "The thoughtful cousin who knows Kapruka by heart"
   - Named Rules: full-screen chat only; product cards always show image+price; Sinhala toggle visible
   - Benchmarks: positive = Kaan-level checkout reliability; anti = generic ChatGPT widget
   - Stack: fill from actual repo (likely Next.js + AI SDK + Kapruka MCP)

2. Run **`apple-hub`** — confirm skill routing plan for this sprint

3. **Audit live demo** — open LIVE_DEMO_URL, run 3 judge journeys (record failures):
   - Journey A: "Birthday gift for amma in Colombo under 5000 LKR"
   - Journey B: Full checkout to pay link (use test data)
   - Journey C: Sinhala or Tanglish request
   - Journey D: Track order (if supported)

4. Write `CHALLENGE-AUDIT.md` at repo root: rubric self-score /100 + P0 blocker list

---

## PHASE 1 — Design & UX blitz (hours 1–4)

Invoke **`ultra-web-quality`** — Lighthouse/CWV/a11y/SEO on LIVE_DEMO_URL  
Invoke **`apple-design-head`** — full review; fix all RULE Critical/High from RULES.md  
Invoke **`ultra-visual-system`** — token pass on chat UI, product cards, dark mode  
Invoke **`ultra-component-discovery`** — upgrade product cards/carousels if current UI is weak

**P0 design targets:**
- Full-screen chat (not corner widget) — rubric requirement
- Product results = image cards with price, stock, add-to-cart — min 3 visible without scrolling on mobile
- Loading/skeleton states for MCP search (no blank flash)
- `prefers-reduced-motion` respected
- Touch targets ≥44px

Commit: `feat(design): rubric P0 visual pass` → deploy → verify LIVE_DEMO_URL

---

## PHASE 2 — Agent brain & checkout reliability (hours 4–10)

Invoke **`ultra-cto`** — review agent architecture (state machine vs pure LLM chaos)  
Reference: deterministic checkout steps like Kaan:
1. Discover → 2. Cart → 3. City → 4. Delivery date (`kapruka_check_delivery`) → 5. Recipient → 6. Sender → 7. Gift message → 8. Review → 9. `kapruka_create_order` → 10. Pay link

**Must implement/fix:**
- [ ] Multi-item cart (bonus points)
- [ ] `kapruka_check_delivery` before order — cakes/flowers perishable warning
- [ ] Gift message field in checkout
- [ ] Graceful MCP error handling (rate limit, out of stock, city not found)
- [ ] Conversation memory: rejected products not re-suggested
- [ ] Sinhala + Tanglish: detect language, reply in kind; optional UI language toggle

Invoke **`ultra-brand-voice`** — write Kira system prompt: personality, sample greetings in EN/SI/Tanglish, banned phrases (no "As an AI language model")

Commit: `feat(agent): checkout state machine + sinhala` → deploy → run Journey A–D again

---

## PHASE 3 — Engineering hardening (hours 10–16)

Invoke **`ultra-tdd`** — add tests for:
- Cart add/remove/update
- Checkout state transitions
- MCP response parsing (fixture JSON)
- Delivery date validation

Invoke **`ultra-security-review`** — no secrets in client; validate all user input before MCP calls; rate-limit your own API routes

Invoke **`ultra-pr-ship-review`** — full PR before merge to main:
- `npm run build` passes
- No `console.error` on happy path in prod
- Environment vars documented in README

Use **`obra systematic debugging`** pattern from ultra-pr-ship-review if anything breaks: root cause before fix.

Commit: `test: checkout + MCP fixtures` → deploy

---

## PHASE 4 — Polish sprint for maximum rubric points (hours 16–20)

Invoke **`apple-design-head`** again — target 90+ score  
Invoke **`ultra-content-review`** — microcopy on buttons, errors, empty states  
Invoke **`ultra-head-of-growth`** — 30-second demo script for judges

**High-impact polish checklist:**
- [ ] Welcome screen with 3 suggested prompts ("Gift for wedding", "Flowers to Kandy tomorrow", "මට තෑග්ගක් ඕනේ")
- [ ] Product carousel swipe on mobile
- [ ] Cart badge with item count always visible
- [ ] Order summary before pay link with edit option
- [ ] Success state with pay link button + track order hint
- [ ] Favicon, OG image, page title "Kira — Kapruka Shopping Agent"
- [ ] Page works on mobile Safari (judges will use phones)

Commit: `feat(polish): judge-ready demo` → deploy → final Lighthouse run

---

## PHASE 5 — Submission prep (hours 20–24)

1. **`ultra-pr-ship-review`** final gate — SHIP verdict required
2. **`ultra-ceo`** — one paragraph: why Kira wins vs other entries
3. Update README with:
   - Live demo URL (big, top of README)
   - 30-second judge instructions
   - MCP tools used
   - Sinhala/Tanglish feature callout
4. Create `SUBMISSION.md`:
   - Demo URL
   - Test accounts / sample prompts for judges
   - Known limitations (honest)
   - Self-score against rubric table
5. **Smoke test LIVE_DEMO_URL from incognito** — if broken, fix before stopping
6. Do NOT spam `kapruka_create_order` in testing

---

## RULES OF ENGAGEMENT

- **Ship working code every phase.** Judges need a live URL — broken deploy = 0 points.
- **Use Apple Ultra skills by name** at each phase — don't skip gates.
- **Prioritize rubric points over clever tech.** 30 pts experience > 5 pts creativity.
- **Sinhala is the secret weapon.** Even partial Sinhala UI beats 95% of entries.
- **No feature creep.** If it doesn't move the rubric, cut it.
- **Commit messages:** conventional, descriptive.
- **If stuck on MCP:** read https://mcp.kapruka.com/ and github.com/kapruka/mcp — do not hallucinate tool params.

---

## DEFINITION OF DONE

- [ ] LIVE_DEMO_URL loads full-screen chat in <3s on mobile
- [ ] Judge Journey A–D all pass without hand-holding
- [ ] Self-score ≥85/100 on Kapruka rubric in CHALLENGE-AUDIT.md
- [ ] Sinhala OR Tanglish works in at least 3 conversation turns
- [ ] Multi-item cart + gift message + delivery date check implemented
- [ ] README + SUBMISSION.md ready for Kapruka form
- [ ] All changes on `main` (or `release/challenge`) and deployed

**When done, output:**
1. Final LIVE_DEMO_URL
2. Rubric self-score table
3. Top 5 things improved overnight
4. Top 3 risks before judging
5. Exact text to paste into Kapruka submission form

## ⬆️ END PROMPT ⬆️
