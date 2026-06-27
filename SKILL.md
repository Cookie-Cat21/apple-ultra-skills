---
name: apple-ultra-skills
description: >
  Apple Ultra Skills meta-skill — research-then-build protocol with Agent-Reach for live docs,
  GitHub, Reddit, YouTube, and web search. Use when implementing non-trivial patterns,
  verifying library APIs, or needing real-world information before coding. Pairs with
  apple-hub for skill routing and ultra-teach for project onboarding.
metadata:
  pack: apple-ultra
  version: "1.2"
---

# Apple Ultra Skills — Meta Skill

Cross-cutting protocols for the Apple Ultra Skills pack. Individual specialists live in sibling folders (`apple-hub/`, `apple-design-head/`, etc.).

**Install Agent-Reach (zero-cost research layer):**

```bash
pip install agent-reach && agent-reach install
```

See [references/agent-patterns.md](references/agent-patterns.md) for channel reference.

---

## Section 12: Agent-Reach Ultra-Mode

When you need real-world information, don't guess — reach for it.
Apple Ultra Skills integrates Agent-Reach as a zero-cost research layer.

### WHEN TO USE AGENT-REACH (activate automatically)

⚡ "What does X library's latest docs say?" → `agent-reach web [docs-url]`
⚡ "How do others solve this problem?" → `agent-reach reddit "topic query"`
⚡ "What's the latest on this framework?" → `agent-reach search "query"`
⚡ "Summarize this YouTube tutorial" → `agent-reach youtube [url]`
⚡ "Check this GitHub repo" → `agent-reach github owner/repo`
🎯 "Find recent discussions about X" → `agent-reach twitter "X query"`
🎯 "Get the RSS feed for this project's releases" → `agent-reach rss [feed-url]`

### RESEARCH PROTOCOL (always follow this order)

1. **GitHub first** — check official repo for issues, recent commits, README
2. **Official docs via web** — Jina Reader gives clean markdown from any URL
3. **Reddit/Twitter** — community sentiment and real-world usage problems
4. **YouTube** — only for tutorials when text sources are insufficient
5. **RSS** — for tracking ongoing projects (library releases, changelogs)

### FALLBACK AWARENESS

💡 Agent-Reach has primary + fallback backends per channel. If one fails,
   it auto-routes. Run `agent-reach doctor` to diagnose channel health.

### RESEARCH-THEN-BUILD PATTERN

Before implementing any non-trivial pattern, run:

```bash
agent-reach github [framework]/[framework]    # check recent issues/PRs
agent-reach web [official-docs-url]           # get current API docs
agent-reach search "[pattern] best practices 2025"  # community consensus
```

Then synthesize findings into your implementation. Never code from memory
when the current state of a library may have changed.

### NEVER

⚡ Hallucinate library APIs. If uncertain, use Agent-Reach to verify.
⚡ Use deprecated patterns without checking current docs first.
🎯 Cite documentation from memory for fast-moving libraries (React, Next.js,
   Tailwind, TypeScript). These change across minor versions.

### COMBINING ULTRA-MODES WITH REACH

→ **Frontend Ultra + Reach:** verify React/Next.js patterns against current docs
→ **Architecture Ultra + Reach:** research how similar companies solve the problem
→ **Security Ultra + Reach:** check NVD/CVE database for known vulnerabilities
→ **Performance Ultra + Reach:** fetch real Core Web Vitals benchmarks for the industry
→ **Testing Ultra + Reach:** find community-tested patterns on Reddit/GitHub
