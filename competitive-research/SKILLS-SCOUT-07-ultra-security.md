# SKILLS-SCOUT-07 — ultra-security-review

**Date:** 2026-06-27  
**Target:** `ultra-security-review`  
**Method:** `npx skills find` on skills.sh (live CLI output)  
**Pack:** apple-ultra-skills `/workspace`

---

## Queries run

```bash
npx skills find "OWASP"
npx skills find "web security"
```

### Raw highlights

| Query | Top result | Installs |
|-------|------------|----------|
| OWASP | `hoodini/ai-agents-skills@owasp-security` | 2.3K |
| OWASP | `agamm/claude-code-owasp@owasp-security` | 1.1K |
| OWASP | `sergiodxa/agent-skills@owasp-security-check` | 1.1K |
| web security | `github/awesome-copilot@web-coder` | 5.6K |
| web security | `cosai-oasis/project-codeguard@software-security` | 238 |
| web security | `academind/ai-config@web-security` | 215 |

**Observation:** Security skills on skills.sh are **low-install fragmented** (top OWASP ≈2.3K) vs TDD (312K) or SEO (147K). `web-coder` (5.6K) is a general web dev skill, not a dedicated security audit.

---

## Top 5 competitors

| Skill | Installs | Steal | Tier |
|-------|----------|-------|------|
| `hoodini/ai-agents-skills@owasp-security` | 2.3K | OWASP Top 10 checklist mapping to code review prompts | **A** |
| `github/awesome-copilot@web-coder` | 5.6K | Secure-by-default web patterns (headers, input handling) | **B** |
| `agamm/claude-code-owasp@owasp-security` | 1.1K | Top 10 walkthrough with severity labels | **B** |
| `sergiodxa/agent-skills@owasp-security-check` | 1.1K | Structured pass/fail per OWASP category | **B** |
| `cosai-oasis/project-codeguard@software-security` | 238 | Supply-chain + dependency audit prompts | **C** |

**Runner-up:** `github/awesome-copilot@agent-owasp-compliance` (1K) — compliance framing, less exploit-scenario depth.

**Runner-up:** `mastepanoski/claude-skills@owasp-llm-top10` (293) — LLM-specific; Ultra mentions LLM output in excuses but no dedicated round.

---

## Gaps — Ultra wins

| Advantage | Evidence |
|-----------|----------|
| **Product attack surface map** | Cron Bearer, dashboard auth, scoped v1 keys, webhook inventory — competitors use generic OWASP lists |
| **5-round weighted protocol** | Auth 30% · Secrets 25% · Webhooks 25% · data protection regulations 15% · Ops 5% |
| **Runnable discovery** | `rg` secret-scan suite, webhook table, file path hints in SKILL.md |
| **Domain depth** | Payment gateway hash, idempotency, SSRF on outbound webhooks, Meta verify token |
| **RUBRIC.md ledger** | S1–S12 security findings with grades |
| **evals.json** | Already exists at `ultra-security-review/evals/evals.json` (ahead of all Top 5) |
| **Chain integration** | `ultra-payments`, `ultra-api-auth`, `ultra-pr-ship-review` handoffs |
| **2025 OWASP awareness** | Supply chain (A03), exceptional conditions (A10) noted in skill body |

## Gaps — Ultra loses

| Gap | Leader | Impact |
|-----|--------|--------|
| **skills.sh presence** | hoodini OWASP (2.3K) still discoverable; Ultra not listed | Even low-install competitors beat zero distribution |
| **OWASP category index** | hoodini / agamm packs | Ultra embeds OWASP notes inline; no `references/OWASP-MAP.md` category → round mapping |
| **LLM Top 10** | `mastepanoski/claude-skills@owasp-llm-top10` (293) | Agent prompt-injection / tool abuse not a dedicated round |
| **Automated scanning** | getsentry/skill-scanner (external, not in find results) | Ultra is manual `rg` only |
| **Parallel review lenses** | awesome-cursor-skills pattern | Single-agent security review on large PRs |
| **Supply-chain automation** | project-codeguard prompts | Ultra mentions A03; no `npm audit` / SBOM step in Round 0 |

---

## Recommended PR

**Title:** `feat(ultra-security-review): OWASP map + supply-chain round + LLM sink round`

### Scope (single PR)

1. **`ultra-security-review/references/OWASP-MAP.md`** — steal structure from `hoodini/ai-agents-skills@owasp-security`:
   | OWASP 2025 | Ultra round | Product example |
   |------------|-------------|-----------------|
   | A01 Broken Access Control | R0 Auth | IDOR via `businessId` |
   | A02 Cryptographic Failures | R1 Secrets | Plaintext API keys |
   | A03 Supply Chain | R4 Ops (new checks) | Critical CVE in prod bundle |
   | A10 Exceptional Conditions | R2 Webhooks | Stack traces on 400 |

2. **Round 0 addition** — supply-chain snippet (from codeguard pattern):
   ```bash
   npm audit --omit=dev --audit-level=high 2>/dev/null | tail -20
   ```

3. **Round 4 expansion** — LLM sink checks (from owasp-llm-top10):
   - Untrusted model output → HTML/SQL/shell sinks
   - Tool calls without scope validation

4. **`evals/evals.json`** — add 2 fixtures:
   - Unauthenticated cron mutation → REJECT
   - Webhook without hash verification → P0 REJECT

5. **Description triggers** — add: `OWASP`, `OWASP Top 10`, `security audit`, `SAST`, `dependency audit` (match skills.sh search terms).

### Acceptance criteria

- [ ] OWASP-MAP.md ≤120 lines; each category links to existing round IDs
- [ ] No regression on existing evals fixtures
- [ ] Supply-chain check is optional when `npm` unavailable (warn, don't block)
- [ ] `validate-skills.py` passes

### Out of scope

- Integrating getsentry skill-scanner CLI (separate ops PR)
- Full parallel subagent security lens (pair with `ultra-pr-ship-review` v1.2)

---

## Strategic note

Ultra **already wins on depth** in this category — the skills.sh long tail tops out at ~5.6K installs. The PR priority is **discoverability** (`npx skills add`) and **OWASP indexability**, not feature parity with shallow checklist skills.
