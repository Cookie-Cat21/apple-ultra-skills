# Agent-Reach — Apple Ultra Skills


> **Decision-quality note:** apply [apple-principles-2026.md](./apple-principles-2026.md). Numeric thresholds not tied to a standard, current vendor documentation, or measured project data are studio defaults/starting points—not universal facts. For version-sensitive behavior, inspect the installed version and current primary docs.
Cross-skill reference for Agent-Reach research workflows. See [SKILL.md](../SKILL.md) Section 16 for the full Agent-Reach Ultra-Mode protocol.

---

## Agent-Reach Channel Reference

| Channel       | Command                              | Best For                          |
|---------------|--------------------------------------|-----------------------------------|
| Web           | `agent-reach web [url]`                | Docs, articles, any URL → clean MD|
| YouTube       | `agent-reach youtube [url]`            | Tutorial transcripts              |
| Twitter/X     | `agent-reach twitter "query"`          | Real-time community sentiment     |
| Reddit        | `agent-reach reddit "query"`           | Long-form community solutions     |
| GitHub        | `agent-reach github owner/repo`        | Source code, issues, READMEs      |
| RSS           | `agent-reach rss [feed-url]`           | Release tracking, changelogs      |
| Search        | `agent-reach search "query"`           | Global web search via Exa         |
| Bilibili      | `agent-reach bilibili [url]`           | Chinese-language video content    |

**HEALTH CHECK:** Run `agent-reach doctor` before any research session.

**SAFE MODE:** `agent-reach --safe` for security-conscious environments (no
credential storage, public content only).

**Install:**

```bash
pip install agent-reach && agent-reach install
```

**Source:** [github.com/Panniantong/Agent-Reach](https://github.com/Panniantong/Agent-Reach)
