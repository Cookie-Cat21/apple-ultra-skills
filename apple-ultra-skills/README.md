# Apple Ultra Skills

**One skill. Every domain. Zero compromises.**

```bash
npx skills add Cookie-Cat21/apple-ultra-skills
```

Apple Ultra fuses 50+ top skills.sh patterns into a single context-aware plugin that works across Claude Code, Cursor, GitHub Copilot, Windsurf, Gemini CLI, Cline, VS Code, Roo, Zed, and 20+ other agent platforms.

---

## What Ultra Means

Apple's M-series Ultra chip fuses two powerful dies into one processor. Apple Ultra Skills does the same for AI agent skills — instead of installing 50+ individual skills (frontend-design, react-best-practices, tdd, grill-me, mcp-builder, and dozens more), you install one skill that automatically activates the right expertise based on what you're building.

The agent reads your file type, imports, directory structure, and stated intent — then applies Frontend + Design + Accessibility rules simultaneously when you're building a React component, or Security + Architecture rules when you're writing an API route. Cross-domain awareness is what makes Ultra different from any individual skill.

---

## Ultra-Modes

| Mode | Activates When | Replaces Skills |
|------|---------------|-----------------|
| **Frontend Ultra** | `.tsx`, `.jsx`, `.vue`, `.svelte`, component imports | frontend-design (596K), react-best-practices (506K), web-design-guidelines (419K), ui-ux-pro-max (238K), composition-patterns |
| **Design Ultra** | `globals.css`, tokens, UI/UX intent | canvas-design, brand-guidelines, interface-design, theme-factory, high-end-visual-design |
| **Architecture Ultra** | refactor, API routes, module structure | improve-codebase-architecture (330K), to-prd (292K), to-issues (280K), diagnose (230K) |
| **Testing Ultra** | `.test.ts`, `__tests__/`, spec intent | tdd (312K), grill-me (402K), grill-with-docs (330K) |
| **Security Ultra** | auth, API, middleware, security intent | OWASP skills, auth patterns, CSP guides |
| **Performance Ultra** | optimize, bundle, Core Web Vitals | fixing-motion-performance, bundle optimization guides |
| **Accessibility Ultra** | a11y intent, form components, WCAG | fixing-accessibility, wcag-audit-patterns |
| **Agent Ultra** | MCP, agent, workflow, debug intent | agent-browser (489K), mcp-builder, web-artifacts-builder, schedule |
| **DevOps Ultra** | deploy, CI/CD, infrastructure intent | vercel-deploy-claimable, CI/CD patterns |

---

## Quick Start

### 1. Build a component (activates Frontend + Design + A11y)

```
Create a pricing card component with three tiers.
```

Ultra applies: 5-prop limit, 5 interactive states, semantic color tokens, 44px touch targets, WCAG contrast ratios, and distinctive (non-generic-AI) design — all automatically.

### 2. Review an API route (activates Security + Architecture)

```
Review this route handler for security issues.
```

Ultra applies: Zod validation at boundary, CSRF protection, rate limiting, no secrets in logs, proper error response format, and OWASP Top 10 checklist.

### 3. Write tests (activates Testing Ultra)

```
Write tests for the checkout flow using TDD.
```

Ultra applies: Red-Green-Refactor workflow, given/when/then naming, test pyramid, MSW for API mocking, semantic RTL queries, and Playwright E2E for critical paths.

---

## What It Covers

### Frontend (150+ rules)
React component patterns, Next.js App Router, Vue/Svelte, state management, styling, Web APIs, TypeScript with React.

### Design (200+ rules)
Design system architecture, visual hierarchy, typography, color (oklch), motion, elevation, responsive design, component states.

### Architecture (100+ patterns)
SOLID principles with TypeScript examples, feature slicing, API design (REST/tRPC/GraphQL), state architecture, module boundaries, design patterns.

### Testing (80+ rules)
TDD workflow, Vitest + React Testing Library, Playwright E2E, Mock Service Worker, test factories, CI optimization.

### Security (OWASP Top 10 2025)
Broken access control, cryptographic failures, injection, insecure design, misconfiguration, vulnerable components, auth failures, integrity, logging, SSRF — all applied to React/Next.js/Node.js.

### Performance (Core Web Vitals)
LCP < 2.5s, INP < 200ms, CLS < 0.1, bundle optimization, image/font optimization, SSR/SSG/ISR decision tree, monitoring budgets.

### Accessibility (WCAG 2.2 AA)
Complete audit checklist: perceivable, operable, understandable, robust. ARIA patterns, keyboard testing script, screen reader testing script, axe-core CI integration.

### Agent & Workflow
MCP server architecture, browser automation (semantic selectors), agent loop patterns (Plan-Execute-Verify), multi-agent coordination, debugging protocol.

### DevOps
GitHub Actions CI/CD, Vercel deployment, environment management, monitoring/alerting, database migrations, infrastructure as code.

---

## Project Structure

```
apple-ultra-skills/
├── SKILL.md              ← Master skill (primary entry point)
├── references/
│   ├── frontend.md       ← 150+ frontend rules
│   ├── design.md         ← 200+ design rules
│   ├── architecture.md   ← 100+ architecture patterns
│   ├── testing.md        ← 80+ testing rules
│   ├── security.md       ← OWASP Top 10 checklist
│   ├── performance.md    ← Core Web Vitals guide
│   ├── accessibility.md  ← WCAG 2.2 AA checklist
│   ├── agent-patterns.md ← MCP & agent workflow patterns
│   └── devops.md         ← CI/CD & deployment patterns
├── scripts/
│   └── setup.js          ← Post-install activation guide
├── package.json
└── README.md
```

---

## Slash Commands

Where your agent platform supports slash commands:

| Command | Action |
|---------|--------|
| `/ultra-review` | Full audit of current file (all active modes) |
| `/ultra-prd` | Generate structured mini-PRD from feature description |
| `/ultra-test` | TDD test scaffold for current module |
| `/ultra-a11y` | WCAG 2.2 AA checklist on current component |
| `/ultra-perf` | Core Web Vitals audit on current page |

---

## Contributing

Apple Ultra improves itself. When using the skill:

1. **Skill gaps** — If you encounter an uncovered situation, note it:
   ```
   SKILL GAP DETECTED: [situation]. Suggested rule: [proposed rule].
   ```

2. **Rule conflicts** — If a rule produces a bad outcome:
   ```
   RULE CONFLICT: [rule] produced [bad outcome] because [reason].
   Suggested refinement: [refined rule].
   ```

3. **Project overrides** — If local conventions are better:
   ```
   PROJECT OVERRIDE: [local convention] overrides [global rule] here.
   ```

To contribute rules directly, add numbered rules to the appropriate `references/*.md` file following the quality standards:

- **Specific** over general — "use oklch()" not "use modern color"
- **Measurable** where possible — "< 2.5s LCP" not "fast loading"
- **Prioritized** — ⚡ critical, 🎯 high-impact, 💡 expert insight
- **Actionable** within 30 seconds
- **Connected** — cross-reference related rules in other files

---

## License

MIT
