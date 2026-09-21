# Apple Ultra: DevOps Reference

> Cross-reference: [SKILL.md](../SKILL.md). CI/CD, deployment, infrastructure, and monitoring.


> **Decision-quality note:** apply [apple-principles-2026.md](./apple-principles-2026.md). Numeric thresholds not tied to a standard, current vendor documentation, or measured project data are studio defaults/starting points—not universal facts. For version-sensitive behavior, inspect the installed version and current primary docs.
---

## 1. CI/CD — GitHub Actions

### Pipeline Structure

1. 🎯 Pipeline stages: lint → typecheck → test → build → deploy. Fail fast at each stage.
2. 🎯 Keep the fast CI feedback path short enough that developers use it continuously. Track actual queue/run time and optimize the slowest steps instead of enforcing a universal two-minute limit.
3. 🎯 Parallel jobs: lint, typecheck, unit tests run simultaneously.
4. 💡 `concurrency` group: cancel in-progress runs on same PR — save CI minutes.

### Caching

5. 🎯 Cache `node_modules` keyed on `package-lock.json` hash.
6. 🎯 Cache build outputs: `.next/cache`, `dist/`, Turborepo remote cache.
7. 💡 Cache Playwright browsers: `~/.cache/ms-playwright` keyed on Playwright version.
8. ⚡ `actions/cache@v4` with `restore-keys` for partial cache hits.

### Matrix Strategies

9. 🎯 Test matrix: Node 18 + 20, Ubuntu + macOS for cross-platform packages.
10. 💡 Shard test suites: `strategy.matrix.shard: [1, 2, 3, 4]` for parallel test execution.

### Secrets & Environments

11. ⚡ Secrets in GitHub Secrets — never in workflow files, never in env files in repo.
12. 🎯 Environment protection rules: production requires approval, staging auto-deploys.
13. 🎯 Secret rotation: quarterly rotation of API keys, tokens, deploy keys.
14. 💡 OIDC for cloud deployment — no long-lived credentials in CI.

### Workflow Patterns

15. 🎯 Reusable workflows: `ci.yml` called by `pr.yml` and `release.yml`.
16. ⚡ `paths`/`paths-ignore` filters — don't run full CI on README changes.
17. 🎯 PR checks required before merge: lint, test, build, review.
18. 💡 Auto-merge with label when all checks pass — reduce manual merge overhead.

---

## 2. Deployment

### Pipeline Stages

1. 🎯 Build → Test → Staging → Smoke Test → Production → Verify.
2. ⚡ Staging mirrors production: same Node version, same env vars (different values), same build command.
3. 🎯 Smoke tests after deploy: hit health endpoint, verify critical path.
4. 💡 Canary deploys: 5% traffic to new version, monitor error rate, ramp to 100%.

### Rollback Strategies

5. ⚡ One-click rollback: keep previous deployment artifact ready.
6. 🎯 Define rollback/hold triggers from service SLOs and baseline behavior: health-check failure, material error-rate increase, latency regression, or business-critical invariant breach. Store the actual thresholds with the service.
7. 🎯 Prefer backward-compatible expand/migrate/contract rollouts for zero-downtime systems. Explicitly document the exception when a coordinated maintenance window makes a breaking migration safer/simpler.
8. 🎯 Feature flags for risky deploys — deploy code dark, enable flag gradually.

### Environment Promotion

9. 🎯 Use the environment/promotion path that matches risk and architecture. Preview/staging is valuable for integrated changes, but tiny low-risk services may safely promote with automated canaries or production verification instead.
10. ⚡ PR preview deployments for every pull request — test the actual artifact.
11. 🎯 Environment variables managed per environment — Vercel, Railway, or `.env.production`.
12. 💡 Infrastructure as code for environment config — reproducible environments.

---

## 3. Vercel-Specific

### Project Configuration

1. 🎯 `vercel.json`: headers, redirects, rewrites, cron jobs.
2. ⚡ Security headers in `vercel.json` or `next.config.ts` — CSP, HSTS, X-Frame-Options.
3. 🎯 Environment variables: Development, Preview, Production — scoped correctly.
4. 💡 `NEXT_PUBLIC_` prefix only for client-safe values — everything else server-only.

### Edge vs Serverless

5. 🎯 Edge Functions: auth checks, redirects, geo-routing, A/B testing — low latency, limited Node APIs.
6. 🎯 Serverless Functions: database queries, file processing, third-party API calls — full Node runtime.
7. 💡 Edge Middleware: authentication, rate limiting, bot detection — runs before every request.
8. ⚡ Edge has 1MB bundle limit — keep edge functions minimal.

### Analytics & Web Vitals

9. 🎯 `@vercel/analytics` for page views and Web Vitals in production.
10. 🎯 `reportWebVitals` callback for custom analytics integration.
11. 💡 Speed Insights dashboard: monitor LCP, FID/INP, CLS per route.
12. 🎯 Preview deployment URLs for QA — share with stakeholders before merge.

### Cron & Background

13. 🎯 Vercel Cron for scheduled tasks: `vercel.json` cron config → API route.
14. 💡 Cron routes protected with `CRON_SECRET` — verify in handler.
15. 🎯 Long-running tasks: queue (Inngest, Trigger.dev) not serverless function — 10s/60s timeout limits.

---

## 4. Monitoring & Alerting

### Error Tracking

1. ⚡ Sentry (or equivalent) on client AND server — source maps uploaded on deploy.
2. 🎯 Error grouping: deduplicate by stack trace, not message text.
3. 🎯 Breadcrumbs: user actions leading to error — click, navigation, API call.
4. 💡 Release tracking: tag errors with git SHA — know which deploy introduced the bug.
5. ⚡ PII scrubbing in Sentry: `beforeSend` hook removes emails, tokens, passwords.

### Performance Monitoring

6. 🎯 APM for API routes: response time P50/P95/P99 per endpoint.
7. 🎯 Database query monitoring: slow query log, connection pool utilization.
8. 💡 Real User Monitoring (RUM): field CWV data from actual users.
9. 🎯 Synthetic monitoring: uptime check every 1-5 minutes from multiple regions.

### Alerting Thresholds

10. 🎯 Page on error-rate conditions derived from the service SLO/error budget and traffic volume; avoid a universal percentage that is noisy for one service and dangerously lax for another.
11. 🎯 Alert on sustained latency regressions relative to SLO/baseline and user impact; define percentile/window per service.
12. 🎯 Alert on resource exhaustion early enough to act, using workload-specific headroom, growth rate, and saturation behavior instead of universal percentages.
13. 💡 Monitor certificate expiry with enough lead time to recover from your actual renewal process; automated renewal failures should alert well before user impact.
14. 🎯 Failed deployments → immediate notification.

### Incident Response

15. 🎯 Runbook for common incidents: database down, API rate limited, CDN failure.
16. ⚡ Incident commander role: one person coordinates, others execute.
17. 🎯 Post-mortem template: timeline, root cause, action items, blameless.
18. 💡 Status page for user-facing incidents — communicate proactively.

---

## 5. Database & Migrations

1. ⚡ Migrations are forward-only in production — no `down` migrations in prod.
2. 🎯 Backward-compatible migrations: add column (nullable) → deploy code → backfill → add constraint.
3. 🎯 Migration testing on staging with production-size data snapshot.
4. 💡 Connection pooling: PgBouncer or serverless driver (Neon, PlanetScale) for serverless.
5. ⚡ Never run destructive migrations without backup: drop column, drop table, change type.
6. 🎯 Seed data for development — factory functions, not production data copies.
7. 🎯 Database backups: automated daily, tested restore quarterly.
8. 💡 Read replicas for read-heavy workloads — route analytics queries to replica.

---

## 6. Infrastructure as Code

### When to Use

1. 🎯 Use infrastructure as code when reproducibility, reviewability, multi-environment consistency, or recovery value outweighs its maintenance cost. Team size alone is not the trigger.
2. 💡 Skip IaC when: single Vercel deployment, solo developer, prototype.

### Terraform Basics

3. 🎯 One state file per environment — `staging.tfstate`, `production.tfstate`.
4. ⚡ Team-managed IaC state must use a supported shared backend with locking/concurrency protection. S3/DynamoDB is one Terraform option, not a universal backend.
5. 🎯 Modules for reusable infrastructure: `modules/database/`, `modules/cdn/`.
6. 💡 `terraform plan` in CI — review changes before apply.
7. 🎯 Secrets via environment variables or secret manager — not in `.tf` files.
8. ⚡ `lifecycle { prevent_destroy = true }` on production databases.

### Pulumi Alternative

9. 💡 Pulumi: infrastructure in TypeScript — same language as application code.
10. 🎯 Pulumi stacks map to environments — `pulumi stack select production`.

---

## 7. Environment Management

1. 🎯 `.env.example` committed to repo — documents all required variables without values.
2. ⚡ `.env`, `.env.local`, `.env.production` in `.gitignore` — always.
3. 🎯 Validate env vars at startup with Zod — fail fast on missing/invalid config.
4. 💡 Different secrets per environment — never share production DB credentials with staging.
5. 🎯 Feature flags: environment variable or feature flag service (LaunchDarkly, Flagsmith).
6. ⚡ `NODE_ENV=production` disables debug logging, enables optimizations.
7. 🎯 Log level per environment: `debug` in dev, `info` in staging, `warn` in production.
8. 💡 Config as code: `config/` directory with typed, validated configuration objects.

---

## 8. Security in DevOps

1. ⚡ Dependabot/Renovate for automated dependency updates.
2. 🎯 SAST in CI: `semgrep` or `codeql` for security pattern detection.
3. 🎯 Container scanning if using Docker: `trivy` or `snyk container`.
4. ⚡ Branch protection: require reviews, require CI pass, no force push to main.
5. 🎯 Signed commits: GPG or SSH signing for verified commit history.
6. 💡 SBOM generation on release — software bill of materials for compliance.
7. 🎯 Least privilege CI tokens — GitHub Actions token scoped to repository only.
8. ⚡ Audit log monitoring: unexpected admin actions, secret access, deploy from unknown IP.
