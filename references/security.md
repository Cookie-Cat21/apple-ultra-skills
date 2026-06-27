# Apple Ultra: Security Reference

> Cross-reference: [SKILL.md](../SKILL.md) Section 6. Full OWASP Top 10 2025 applied to React/Next.js/Node.js.

---

## A01: Broken Access Control

1. ⚡ Verify resource ownership on every request — `userId` from session, not request body.
2. 🎯 Middleware auth check on all protected routes — deny by default, allow explicitly.
3. 🎯 Row-level security in database (Supabase RLS, PostgreSQL policies) — defense in depth.
4. 💡 Horizontal privilege escalation: user A accessing user B's data by changing ID in URL.
5. 🎯 Vertical privilege escalation: regular user accessing admin endpoints — role check on every admin route.
6. ⚡ CORS: whitelist specific origins — never `*` with credentials.
7. 🎯 Rate limiting per user/IP on sensitive endpoints — auth, password reset, data export.
8. 💡 Directory traversal: validate file paths, reject `../` in user-supplied paths.
9. 🎯 API keys scoped to minimum permissions — read-only keys can't write.
10. ⚡ Deny by default: new endpoints are protected unless explicitly marked public.

---

## A02: Cryptographic Failures

1. ⚡ HTTPS everywhere — HSTS header with `max-age=31536000; includeSubDomains`.
2. 🎯 Password hashing: bcrypt cost 12+ or argon2id — never MD5, SHA-1, SHA-256 alone.
3. ⚡ Never store passwords in plaintext — even in logs or error reports.
4. 🎯 TLS 1.2+ only — disable TLS 1.0/1.1 in server config.
5. 💡 Encrypt sensitive data at rest (PII, payment info) — AES-256 with managed keys.
6. 🎯 Rotate encryption keys annually — support key versioning for seamless rotation.
7. ⚡ No sensitive data in URLs — tokens, session IDs, PII belong in headers/body.
8. 🎯 `Secure` flag on all cookies containing session/auth data.
9. 💡 Certificate pinning for mobile apps — prevent MITM with rogue certificates.
10. 🎯 Secrets in environment variables — never in source code, never in client bundles.

---

## A03: Injection

1. ⚡ Parameterized queries always — never string-interpolate user input into SQL.
2. 🎯 Zod/Valibot validation at every API boundary — type, format, length, range.
3. ⚡ XSS prevention: sanitize HTML with DOMPurify before `dangerouslySetInnerHTML`.
4. 🎯 Output encoding: escape user content in HTML context, JS context, URL context differently.
5. 💡 NoSQL injection: validate and type-check MongoDB queries — don't pass raw user objects.
6. ⚡ Command injection: never pass user input to `exec()`, `spawn()`, `eval()`.
7. 🎯 LDAP injection: escape special characters in LDAP queries.
8. 💡 Template injection: don't render user input in server-side templates (Handlebars, EJS).
9. 🎯 GraphQL: query depth limiting, complexity analysis — prevent resource exhaustion.
10. ⚡ React auto-escapes JSX — but `dangerouslySetInnerHTML` and `href={userInput}` bypass it.

---

## A04: Insecure Design

1. 🎯 Threat modeling before building: STRIDE analysis for each feature.
2. 💡 Trust boundary identification: client ↔ API ↔ database ↔ third-party — validate at every boundary.
3. 🎯 Security user stories: "As an attacker, I cannot access another user's data."
4. ⚡ Fail securely: errors don't leak stack traces, internal paths, or database schema.
5. 🎯 Rate limiting on authentication: 5 attempts per 15 minutes, exponential lockout.
6. 💡 Account enumeration prevention: same error message for "user not found" and "wrong password."
7. 🎯 Secure defaults: new users have minimum permissions, opt-in to elevated access.
8. 🎯 Business logic validation: price manipulation, quantity overflow, race conditions in checkout.
9. 💡 Separation of duties: admin actions require confirmation or second approver.
10. ⚡ Defense in depth: multiple layers — WAF, input validation, output encoding, CSP.

---

## A05: Security Misconfiguration

1. ⚡ Security headers on every response:
   ```
   Content-Security-Policy: default-src 'self'
   X-Content-Type-Options: nosniff
   X-Frame-Options: DENY
   Referrer-Policy: strict-origin-when-cross-origin
   Strict-Transport-Security: max-age=31536000; includeSubDomains
   Permissions-Policy: camera=(), microphone=(), geolocation=()
   ```
2. 🎯 Next.js `next.config.ts` headers() for global security headers.
3. ⚡ Disable directory listing on web servers — no browsable `/uploads/`.
4. 🎯 Remove default credentials from all services — database, admin panels, CMS.
5. 💡 Disable unnecessary HTTP methods — only allow GET, POST, PUT, PATCH, DELETE as needed.
6. 🎯 Error pages: custom 404/500 — no framework version info, no stack traces.
7. ⚡ `.env` files in `.gitignore` — verify with `git log --all -S "sk-" --source`.
8. 🎯 Separate environments: different credentials for dev/staging/production — never share.
9. 💡 Disable debug mode in production — `NODE_ENV=production`, no source maps in client bundle.
10. 🎯 Cloud storage: private buckets by default, signed URLs for temporary access.

---

## A06: Vulnerable Components

1. ⚡ `npm audit` before every release — HIGH/CRITICAL is a blocker.
2. 🎯 Dependabot or Renovate for automated dependency updates — weekly PRs.
3. 💡 Pin dependencies with lockfile — `package-lock.json` committed to git.
4. 🎯 Review new packages: download count, last publish date, maintainer count, known vulnerabilities.
5. ⚡ Supply chain: verify package integrity with `npm audit signatures`.
6. 🎯 Minimal dependencies: every package is an attack surface — justify each addition.
7. 💡 `npx depcheck` to find unused dependencies — remove them.
8. 🎯 Override/resolutions for transitive vulnerabilities when upstream fix pending.
9. ⚡ No packages with install scripts that access network — review `postinstall` scripts.
10. 🎯 SBOM (Software Bill of Materials) for compliance — `npm sbom` or Syft.

---

## A07: Authentication Failures

1. ⚡ Session management: regenerate session ID on login — prevent session fixation.
2. 🎯 HttpOnly, Secure, SameSite=Strict cookies for session tokens.
3. ⚡ Never store JWTs in localStorage — httpOnly cookies only.
4. 🎯 Password requirements: 12+ characters, check against breached password lists (HaveIBeenPwned API).
5. 💡 MFA for admin accounts — TOTP (authenticator app) or WebAuthn (security key).
6. 🎯 Account lockout after failed attempts — with notification to account owner.
7. ⚡ Password reset: time-limited token (1 hour), single use, sent to registered email only.
8. 🎯 OAuth: validate `state` parameter — prevent CSRF in OAuth flow.
9. 💡 Session timeout: 30 minutes idle, 24 hours absolute — configurable per sensitivity.
10. 🎯 Logout: invalidate server-side session, clear all auth cookies, clear client state.

---

## A08: Software & Data Integrity

1. ⚡ CI/CD pipeline integrity: signed commits, protected branches, required reviews.
2. 🎯 Package lock integrity: `npm ci` in CI — exact versions from lockfile.
3. 💡 Subresource Integrity (SRI) for CDN scripts — `integrity` attribute on `<script>`.
4. 🎯 Webhook signature verification: HMAC-SHA256 with shared secret — Stripe, GitHub, etc.
5. ⚡ Auto-update mechanisms: verify update signatures before applying.
6. 🎯 Code signing for desktop/mobile apps — prevent tampered distributions.
7. 💡 Immutable deployments: container images tagged by git SHA — never `latest` in production.
8. 🎯 Database migration safety: backward-compatible migrations, rollback plan.
9. ⚡ Content integrity: CSP `require-trusted-types-for 'script'` where supported.
10. 🎯 Audit trail for sensitive operations: who changed what, when, from where.

---

## A09: Logging & Monitoring Failures

1. ⚡ Never log: passwords, tokens, API keys, credit card numbers, SSN, full email addresses.
2. 🎯 Log: authentication events, authorization failures, input validation failures, admin actions.
3. 🎯 Structured logging (JSON) with correlation IDs — trace requests across services.
4. 💡 Log levels: ERROR for failures, WARN for suspicious, INFO for business events, DEBUG for development only.
5. 🎯 Centralized logging: aggregate logs from all services — Datadog, CloudWatch, ELK.
6. ⚡ Alerting on anomalies: spike in 401/403, failed login rate, error rate threshold.
7. 🎯 Audit trail for compliance: immutable log storage, retention policy, access controls on logs.
8. 💡 PII in logs: hash or truncate — `user_***@example.com`, not full email.
9. 🎯 Request ID in every log entry — `X-Request-Id` header propagated through services.
10. ⚡ Monitor for credential stuffing: same IP, many accounts, short time window.

---

## A10: Server-Side Request Forgery (SSRF)

1. ⚡ Validate and allowlist URLs before server-side `fetch()` — block internal IPs.
2. 🎯 Block: `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`, `127.0.0.0/8`, `169.254.0.0/16`, `0.0.0.0`.
3. 💡 DNS rebinding protection: resolve hostname, check IP, then connect — not just validate URL string.
4. 🎯 Disable HTTP redirects in server-side fetch — or re-validate redirect target.
5. ⚡ Never pass user-supplied URLs directly to `fetch()` — webhook URLs, image imports, RSS feeds.
6. 🎯 Egress firewall: server can only reach known external services — not arbitrary internet.
7. 💡 Cloud metadata endpoint protection: block `169.254.169.254` (AWS/GCP metadata).
8. 🎯 URL scheme allowlist: `https` only — block `file://`, `gopher://`, `dict://`.
9. ⚡ Response size limits on server-side fetch — prevent memory exhaustion.
10. 🎯 Timeout on server-side fetch: 5-10 seconds max — prevent hanging connections.

---

## Frontend-Specific Security

1. ⚡ CSP: `default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:`.
2. 🎯 `rel="noopener noreferrer"` on all `target="_blank"` links — prevent tabnabbing.
3. ⚡ Subresource integrity for third-party scripts loaded via `<script>`.
4. 🎯 Client-side routing: don't expose admin routes in client bundle — server enforces access.
5. 💡 Service Worker scope: limit to app's origin — don't cache sensitive API responses.
6. 🎯 Web Storage: never store auth tokens in localStorage/sessionStorage.
7. ⚡ PostMessage: validate `event.origin` before processing cross-frame messages.
8. 🎯 Clipboard API: only copy what user explicitly requested — no auto-copy of sensitive data.
9. 💡 Feature Policy/Permissions Policy: disable camera, microphone, geolocation unless needed.
10. ⚡ React DevTools and Redux DevTools disabled in production builds.
