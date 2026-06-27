# Apple Ultra: Agent & Workflow Patterns

> Cross-reference: [SKILL.md](../SKILL.md) Section 9. MCP, browser automation, and agent loop design.

---

## 1. MCP Server Architecture

### Tool Design

1. ⚡ One tool per distinct capability — composable, not monolithic.
2. 🎯 Tool name: verb-noun format (`search_users`, `create_order`, `get_weather`).
3. 🎯 Description written for the LLM reader: what it does, when to use, when NOT to use.
4. ⚡ Input schema with Zod — typed, validated, with descriptions on every field.
5. 🎯 Output schema typed — structured JSON, not free-form text.
6. 💡 `required` vs `optional` fields explicit in schema — LLM needs to know what's mandatory.
7. 🎯 Enum fields for fixed choices — `z.enum(['asc', 'desc'])` not free string.
8. ⚡ Idempotent tools: same input → same result, no duplicate side effects on retry.

### Error Handling

9. 🎯 Structured error codes: `{ code: "NOT_FOUND", message: "User 123 not found", retryable: false }`.
10. ⚡ Distinguish retryable (network timeout) from non-retryable (validation error) errors.
11. 🎯 Error messages actionable: "Invalid email format" not "Validation failed".
12. 💡 Include `suggestion` field in errors: "Did you mean user ID 124?"

### Server Setup

13. 🎯 MCP server entry: `src/index.ts` with `Server` instance, tool registration, transport.
14. ⚡ Authentication: API key in env var, validated on server start — not per-tool.
15. 🎯 Rate limiting per client — prevent runaway agent loops.
16. 💡 Health check endpoint or tool — agent can verify server is responsive.
17. 🎯 Logging: tool name, input (sanitized), duration, success/failure — never log secrets.
18. ⚡ Streaming responses for long operations — progress updates via SSE or MCP streaming.

### Schema Design

19. 🎯 Field descriptions are prompts: "User email address. Must be valid format. Required."
20. 💡 Examples in descriptions: "ISO 8601 date, e.g., '2024-01-15T10:30:00Z'".
21. 🎯 Default values in schema where sensible — reduce required fields.
22. ⚡ Max length on string fields — prevent token overflow from huge inputs.

---

## 2. Browser Automation

### Selector Strategy

1. ⚡ Semantic selectors only: `getByRole`, `getByLabel`, `getByText`, `getByPlaceholder`.
2. 🎯 `getByRole('button', { name: 'Submit' })` — accessible name, not CSS class.
3. 💡 `getByTestId` as last resort — when no semantic selector exists.
4. ⚡ Never CSS selectors (`#id`, `.class`) — break on redesign.
5. 🎯 Never XPath — fragile, unreadable, breaks on DOM changes.

### Waiting Strategies

6. 🎯 `await expect(locator).toBeVisible()` — auto-waits up to timeout.
7. ⚡ Never `await page.waitForTimeout(5000)` — arbitrary sleeps are flaky.
8. 🎯 `page.waitForURL('/dashboard')` after navigation.
9. 💡 `page.waitForResponse('**/api/users')` for API-dependent UI.
10. 🎯 `locator.waitFor({ state: 'attached' })` before interacting with dynamic elements.

### Interaction Patterns

11. 🎯 `userEvent` patterns: click, type, select, hover — simulate real user behavior.
12. ⚡ Clear input before typing: `await locator.clear()` then `await locator.fill(value)`.
13. 🎯 File upload: `await page.setInputFiles('input[type="file"]', 'path/to/file')`.
14. 💡 Drag and drop: `locator.dragTo(target)` — not manual mouse events.
15. 🎯 Multi-tab: `const newPage = await context.waitForEvent('page')`.

### Network Interception

16. 🎯 `page.route('**/api/**', handler)` — mock or modify API responses.
17. ⚡ Block unnecessary resources in tests: images, fonts, analytics scripts.
18. 💡 Record HAR for debugging: `recordHar: { path: 'trace.har' }` in browser context.

---

## 3. Agent Loop Patterns

### Plan → Execute → Verify

1. ⚡ Every multi-step task: Plan (what to do) → Execute (do it) → Verify (confirm result).
2. 🎯 Plan written before execution — user can review and approve.
3. 🎯 Verify by checking actual output against goal — not assuming success.
4. 💡 Re-plan on failure — don't retry the same failed approach blindly.

### ReAct Pattern

5. 🎯 Reason → Act → Observe loop: think about what to do, call a tool, read the result, repeat.
6. ⚡ Max iterations: 10-20 steps — escalate to human if not resolved.
7. 🎯 Each step logs: reasoning, action taken, observation — auditable trail.
8. 💡 Chain-of-thought before tool calls — LLM explains why it's calling this tool.

### Output Schemas

9. ⚡ Agent outputs typed JSON when downstream tools expect it — not prose.
10. 🎯 Define output schema upfront: `{ status: 'success' | 'error', data: T, message: string }`.
11. 💡 Structured outputs via tool use — LLM calls a "report_result" tool with typed payload.

### Error Recovery

12. ⚡ Catch specific errors, log with context, retry with exponential backoff (max 3).
13. 🎯 Non-retryable errors: escalate to human immediately with full context.
14. 💡 Partial success: report what succeeded and what failed — don't silent-fail.
15. 🎯 Timeout per step: 30s for API calls, 5min for builds — kill and escalate.

### Context Management

16. 🎯 Summarize completed steps — don't carry full history into every tool call.
17. 💡 Working memory: keep active task context, archive completed task details.
18. 🎯 Token budget: allocate 60% to context, 30% to reasoning, 10% to output.
19. ⚡ Truncate large tool outputs — summarize or extract relevant fields.
20. 🎯 File references over inline content — "see /path/to/file.ts:42" not pasting 500 lines.

---

## 4. Multi-Agent Coordination

1. 🎯 Task decomposition: break complex task into independent subtasks with clear interfaces.
2. 💡 Handoff protocol: agent A produces typed output that agent B consumes — schema contract.
3. 🎯 Shared memory: file system or database for inter-agent state — not conversation history.
4. ⚡ Conflict resolution: last-writer-wins for independent fields, human escalation for conflicts.
5. 🎯 Agent specialization: research agent, code agent, review agent — each with focused tools.
6. 💡 Orchestrator pattern: one agent decomposes and delegates, workers execute, orchestrator verifies.
7. 🎯 Parallel execution for independent subtasks — sequential only when dependencies exist.
8. ⚡ Human-in-the-loop for irreversible actions: delete, deploy, send email, merge PR.

---

## 5. Claude Code / Cursor Integration

### SKILL.md Authoring

1. 🎯 Frontmatter: `name`, `description`, `triggers` — description is the activation prompt.
2. ⚡ Triggers: specific keywords the user would say — not generic terms.
3. 🎯 SKILL.md body: principles + rules + reference links — under 1000 lines.
4. 💡 Reference files for depth — SKILL.md is the index, references are the encyclopedia.

### Trigger Optimization

5. 🎯 20-30 triggers covering domain keywords — component, test, deploy, security, etc.
6. ⚡ Description must say WHEN to use and WHAT it does — agent reads this to decide activation.
7. 🎯 Negative triggers in description: "Do NOT use for X" — prevents wrong activation.

### Reference File Organization

8. 🎯 One reference file per domain — frontend, design, security, etc.
9. 💡 Numbered rules for easy citation: "See frontend.md rule 14".
10. 🎯 Cross-references between files: "See security.md A03 for XSS prevention".

### Slash Commands

11. 🎯 `/ultra-review` — audit current file with all active modes.
12. 🎯 `/ultra-prd` — generate structured mini-PRD.
13. 🎯 `/ultra-test` — TDD test scaffold for current module.
14. 🎯 `/ultra-a11y` — WCAG 2.2 AA checklist on current component.
15. 🎯 `/ultra-perf` — Core Web Vitals audit on current page.

---

## 6. Debugging Protocol (from diagnose)

1. ⚡ Form hypothesis before touching code: "Bug is in X because Y."
2. 🎯 Smallest reproduction: isolate the minimum steps to trigger the bug.
3. 🎯 Follow data flow: source → transformations → symptom. Bug is where data diverges.
4. 💡 Is the code you're reading the code that's running? Check: build cache, wrong env, hot-reload.
5. 🎯 Binary search: disable half the system, see if bug persists, repeat.
6. ⚡ Read the full error message — answer is usually in the last line of stack trace.
7. 🎯 `console.log` at data divergence point — not everywhere.
8. 💡 Git bisect for regressions: `git bisect start`, find the commit that introduced the bug.
9. 🎯 Rubber duck: explain the bug to an imaginary developer — often reveals the assumption.
10. ⚡ Fix the root cause, not the symptom — band-aids accumulate into tech debt.
