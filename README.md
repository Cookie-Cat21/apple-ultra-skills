# Apple Ultra Skills

**Apple-quality craft × startup discipline × engineering rigor** — a Cursor skill plugin with 25 specialized personas, shared context templates, and a design-layer component discovery workflow.

**Version:** 1.3.0 · **Skills:** 26 (includes `ultra-teach`, `ultra-tdd`, `ultra-web-quality`)

---

## Install

### Bootstrap script (recommended)

```bash
curl -fsSL https://raw.githubusercontent.com/Cookie-Cat21/apple-ultra-skills/main/scripts/install.sh | sh
```

Detects Cursor (`.cursor/skills/`), Claude (`.claude/skills/`), and Agents (`.agents/skills/`). Falls back to git clone + sync if `npx` unavailable.

### Via skills CLI (once listed on skills.sh)

```bash
npx skills add Cookie-Cat21/apple-ultra-skills
```

Not yet registered — use bootstrap script above.

### Sync from a local clone

```bash
git clone https://github.com/Cookie-Cat21/apple-ultra-skills.git
cd apple-ultra-skills
node scripts/sync-platforms.mjs --target all --dest /path/to/your/project
```

Targets: `cursor` · `claude` · `agents` · `all`

### Manual

Copy this folder into `.cursor/skills/apple-ultra-skills/` (or merge skill subfolders into `.cursor/skills/`).

### Validate

```bash
python3 scripts/validate-skills.py
node scripts/lint-design-rules.mjs --path src/
```

---

## Supercharged by Agent-Reach

Apple Ultra Skills pairs with [Agent-Reach](https://github.com/Panniantong/Agent-Reach) for real-time internet access:

```bash
pip install agent-reach && agent-reach install
```

Once installed, your AI agent can research while it builds — checking
live docs, scanning GitHub issues, reading Reddit solutions, and pulling
YouTube transcripts without a single paid API key.

The combination: Ultra Skills knows **HOW** to build anything.
Agent-Reach knows **WHAT** is true right now.
Together: the most capable AI coding agent setup available, completely free.

See [SKILL.md](SKILL.md) Section 12 and [references/agent-patterns.md](references/agent-patterns.md) for the research protocol.

---

## Plugin structure

```
apple-ultra-skills/
├── README.md                 ← you are here
├── SKILL.md                  ← meta skill (Agent-Reach Ultra-Mode, Section 12)
├── references/               ← agent-patterns.md channel reference
├── _shared/                  ← fill in before use (BRAND, VISUAL, STACK, …)
├── apple-hub/                ← skill router — start here
├── apple-design-head/
│   └── RULES.md              ← 160 deterministic anti-pattern rules
├── ultra-tdd/                ← test-first workflow (NEW v1.2)
├── registry/                 ← skills.json + bundles.json
├── ultra-web-quality/        ← performance, a11y, SEO audit (NEW v1.3)
├── scripts/
│   ├── sync-platforms.mjs    ← multi-platform sync
│   ├── install.sh            ← bootstrap installer
│   ├── lint-design-rules.mjs ← 30 regex rules (CI)
│   └── validate-skills.py
└── .github/workflows/validate.yml
└── .cursor-plugin/plugin.json
```

Skills are **flat folders** (Cursor discovery-friendly). Sections below group them logically.

---

## Design & craft

| Skill | Role | Use when… |
|-------|------|-----------|
| **ultra-component-discovery** | Component sourcing | Find/install UI blocks (21st, Aceternity, Magic UI, HyperUI, Tremor, …) |
| **ultra-visual-system** | Visual design lead | Design tokens, palette, typography, dark mode |
| **apple-design-head** | Head of Apple Design | UI/UX ship review, 160-rule enforcement, accessibility, craft |
| **ultra-web-quality** | Web quality engineer | Lighthouse, CWV, SEO, a11y metrics audit |
| **ultra-brand-voice** | Brand guardian | Copy audit, positioning, banned phrases |
| **ultra-content-review** | Content lead | Multi-channel content alignment |

**Design implementation chain:**

```
ultra-component-discovery → ultra-visual-system → ultra-web-quality → apple-design-head
```

Copy/content chain: `ultra-brand-voice` → `ultra-content-review` → `apple-design-head`

---

## Executive

| Skill | Role | Use when… |
|-------|------|-----------|
| ultra-ceo | Startup CEO | Strategy, focus, beachhead, say-no |
| ultra-cpo | CPO | Feature priority, MVP scope, plan tiers |
| ultra-cto | CTO | Architecture, schema, boundaries |
| ultra-cfo | CFO | Unit economics, pricing, margins |

---

## Go-to-market

| Skill | Role | Use when… |
|-------|------|-----------|
| ultra-head-of-growth | Head of Growth | GTM, density, launch waves |
| ultra-head-of-sales | Head of Sales | Outreach, objections, close patterns |

---

## Engineering

| Skill | Role | Use when… |
|-------|------|-----------|
| **ultra-tdd** | Test-first engineer | Red-green-refactor, coverage before merge |
| ultra-scheduling-engine | Scheduling | Slots, holds, timezone, booking |
| ultra-payments | Payments | Gateway, webhooks, checkout |
| ultra-messaging | Messaging | Notifications, templates, multi-channel |
| ultra-migrations | Database | Schema, migrations, backfills |
| ultra-api-auth | API auth | Route auth, scopes, validation |
| ultra-plan-gating | Entitlements | Subscription tiers, feature gates |
| ultra-security-review | Security | Auth audit, secrets, compliance |
| ultra-pr-ship-review | Eng lead | PR merge gate, verify, conventions |
| ultra-events | Events | Ticketing, capacity, event commerce |
| ultra-integrations | Integrations | Third-party APIs, scope-locked access |

---

## Infrastructure

| Skill | Role | Use when… |
|-------|------|-----------|
| **apple-hub** | Skill router | "Which skill should I use?" |
| **ultra-teach** | Project onboarding | First setup — writes `.ultra.md` |
| dag-task-runner | Task orchestrator | Parallel subagent DAG execution |

---

## Setup: `_shared/` templates

Fill these with your project before using skills:

| File | Contents |
|------|----------|
| `_shared/BRAND.md` | Voice, CTAs, banned phrases, objections |
| `_shared/VISUAL.md` | Design tokens, palette, typography |
| `_shared/PRODUCT.md` | Pillars, plan tiers, feature labels |
| `_shared/STACK.md` | Tech stack, verify commands, boundaries |
| `_shared/PATHS.md` | Routes, API prefixes, auth patterns |
| `_shared/COMPETITORS.md` | Competitive landscape |

Example entries use fictional **Acme Scheduling** — not any real product.

---

## Review protocol (all review skills)

- **Rounds 0–4:** Weighted domain checks (sum to 100%)
- **Severity:** P0 blocker · P1 iterate · P2 polish · P3 nit
- **Grades:** A (93+) · A- (85+) · B (75+) · C (60+) · D (<60)
- **Verdicts:** SHIP (≥85, 0 P0, ≤2 P1) · ITERATE · REJECT
- **Finding format:** Severity → Location → Principle → Measure → Fix → Effort
- **Design rules:** [apple-design-head/RULES.md](apple-design-head/RULES.md) — 160 deterministic anti-patterns

---

## Quick start

1. `curl -fsSL https://raw.githubusercontent.com/Cookie-Cat21/apple-ultra-skills/main/scripts/install.sh | sh`
2. Run **`ultra-teach`** to write `.ultra.md` and fill `_shared/*.md`
3. Ask: **"Use apple-hub to route this"** or **"Apple design review the checkout"**
4. For UI blocks: **"Use ultra-component-discovery to find a footer"**
5. Before merge: **`ultra-tdd`** → **`ultra-pr-ship-review`**

---

## Competitive research

See `competitive-research/IMPROVEMENTS.md` for synthesis. Registry listing steps: `scripts/submit-to-registries.md`.

**Registry:** `registry/skills.json` and `registry/bundles.json` for hub routing and bundle installs (design, ship-ready, executive).

---

## License

MIT
