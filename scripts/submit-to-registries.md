# Submit Apple Ultra Skills to Registries

Exact steps to list **Cookie-Cat21/apple-ultra-skills** in community aggregators. Do these after the pack has ≥1 week of public usage (VoltAgent requirement).

---

## 1. VoltAgent/awesome-agent-skills

**URL:** https://github.com/VoltAgent/awesome-agent-skills  
**Guide:** [CONTRIBUTING.md](https://github.com/VoltAgent/awesome-agent-skills/blob/main/CONTRIBUTING.md)

### Requirements
- Public repo with working skill + README or SKILL.md
- Author/org prefix in entry name
- Description **≤10 words**
- Real community usage (not brand-new repos)

### PR title
```
Add skill: Cookie-Cat21/apple-ultra-skills
```

### Entry (add under **Community Skills → Development and Testing** or **Other**)
```markdown
- **[Cookie-Cat21/apple-ultra-skills](https://github.com/Cookie-Cat21/apple-ultra-skills)** - Integrated design, exec, and ship-review pack
```

### PR body
```markdown
## Adding: apple-ultra-skills

- **Repo:** https://github.com/Cookie-Cat21/apple-ultra-skills
- **License:** MIT
- **Install:** `npx skills add Cookie-Cat21/apple-ultra-skills`

Integrated product-team pack: hub router, 25 skills (design chain, executive personas, domain engineering, scored PR/security gates), 160-rule design linter, evals.json on critical review skills, `validate-skills.py` CI.
```

---

## 2. tech-leads-club/agent-skills marketplace

**URL:** https://github.com/tech-leads-club/agent-skills  
**Guide:** [CONTRIBUTING.md](https://github.com/tech-leads-club/agent-skills/blob/main/CONTRIBUTING.md)

### Process
1. Fork repo; `npm ci && npm run build`
2. Use **skill-architect** skill (or follow Description Quality Standards in CONTRIBUTING)
3. Generate scaffold: `nx g @tech-leads-club/skill-plugin:skill apple-ultra-hub --category=development`
4. **Preferred alternative:** Open issue requesting **external catalog link** rather than vendoring entire pack (25 skills)

### Issue title (if not vendoring)
```
Catalog request: apple-ultra-skills external pack
```

### Issue body
```markdown
Request listing in marketplace `skills.json` as external pack:

- **Name:** apple-ultra-skills
- **Repo:** https://github.com/Cookie-Cat21/apple-ultra-skills
- **Category:** development / design
- **Install:** `npx skills add Cookie-Cat21/apple-ultra-skills`
- **Description:** Hub-routed product craft pack — design review, exec personas, SaaS engineering specialists, ship gates.
```

### If vendoring a single entry skill
Add under `packages/skills-catalog/skills/(design)/` with symlink or submodule to upstream; run `npm run validate`.

---

## 3. sickn33/antigravity-awesome-skills

**URL:** https://github.com/sickn33/antigravity-awesome-skills  
**Process:** Search repo README for Contributing section (mirrors VoltAgent format).

### PR title
```
Add apple-ultra-skills
```

### Entry format (match existing list style)
```markdown
- [apple-ultra-skills](https://github.com/Cookie-Cat21/apple-ultra-skills) — Cursor/Claude skill pack: Apple design review, exec personas, TDD + PR ship gates. MIT.
```

### Notes
- Antigravity-specific install: `agy plugin install https://github.com/Cookie-Cat21/apple-ultra-skills`
- Include `.cursor-plugin/plugin.json` path in PR body

---

## 4. skills.sh / officialskills.sh

**URL:** https://skills.sh  
**CLI:** `npx skills add Cookie-Cat21/apple-ultra-skills`

### Publish checklist
- [ ] Repo public, default branch `main`
- [ ] Each skill folder has `SKILL.md` with `name` + `description` frontmatter
- [ ] `registry/skills.json` manifest present
- [ ] README install one-liner works

### Verify locally
```bash
cd /tmp/skills-test && npx skills add Cookie-Cat21/apple-ultra-skills --yes
npx skills list
```

No separate PR — skills.sh indexes public GitHub repos that users install via CLI.

---

## 5. Cursor plugins marketplace

**URL:** https://cursor.com/marketplace (if applicable)  
**Local manifest:** `.cursor-plugin/plugin.json`

### Steps
1. Ensure `plugin.json` has `name`, `displayName`, `version`, `skills: "./"`
2. Submit via Cursor marketplace contributor flow (check current docs at cursor.com/docs)
3. Alternative: users install via `npx skills add` which copies to `.cursor/skills/`

---

## 6. awesome-claude-code lists

**Targets:** `hesreallyhim/awesome-claude-code`, `coleam00/awesome-claude-code` (pick most-starred + recently maintained)

### PR title
```
Add apple-ultra-skills: integrated product craft pack
```

### Entry
```markdown
- [apple-ultra-skills](https://github.com/Cookie-Cat21/apple-ultra-skills): 25-skill pack — design review (160 rules), exec personas, SaaS engineering, PR ship gate. Hub router + evals.
```

---

## Submission order (recommended)

| Order | Registry | Why |
|-------|----------|-----|
| 1 | skills.sh (npx) | Immediate install path; no PR wait |
| 2 | VoltAgent awesome-agent-skills | Highest traffic aggregator |
| 3 | sickn33/antigravity-awesome-skills | Antigravity audience |
| 4 | awesome-claude-code | Claude Code users |
| 5 | tech-leads-club marketplace | Requires maintainer buy-in |

## What NOT to do

- Don't submit to 5 lists same day with cross-linked PR bodies (looks spammy)
- Don't claim "220K stars" or compare to superpowers in PR titles
- Don't submit before `npx skills add` works on a clean machine
- VoltAgent will reject if repo has 0 stars and 0 usage — wait for initial adopters

## Post-merge

- Add badge to README: `[![Skills](https://img.shields.io/badge/skills.sh-apple--ultra--skills-blue)](https://skills.sh)`
- Track referral traffic in GitHub Insights → Traffic
