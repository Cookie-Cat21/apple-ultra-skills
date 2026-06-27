#!/usr/bin/env node
/**
 * Deterministic linter for Critical/High design anti-patterns.
 * Maps to apple-design-head/RULES.md — machine-enforceable subset.
 *
 * Usage:
 *   node scripts/lint-design-rules.mjs --path src/
 *   node scripts/lint-design-rules.mjs --path examples/ --warn-only
 */

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, resolve } from "node:path";

const EXTENSIONS = new Set([".tsx", ".ts", ".jsx", ".js", ".html", ".css", ".vue"]);

/** @type {{ id: string; severity: "Critical" | "High"; pattern: RegExp; message: string }[]} */
const RULES = [
  {
    id: "RULE-041",
    severity: "High",
    pattern: /bg-gradient-to-[a-z]+\s+from-(purple|violet|fuchsia|indigo)-(400|500|600)\s+to-(blue|sky|cyan)-(400|500|600)/g,
    message: "AI-slop purple-to-blue gradient — use solid neutral + single accent",
  },
  {
    id: "RULE-042",
    severity: "High",
    pattern: /linear-gradient\([^)]*(?:purple|violet|#(?:6|7|8|9a-f])[0-9a-f]{5})[^)]*(?:blue|#(?:0|1|2)[0-9a-f]{5})/gi,
    message: "Purple-blue CSS gradient fingerprint",
  },
  {
    id: "RULE-061",
    severity: "Critical",
    pattern: /<div[^>]+onClick[^>]*(?!role=)/g,
    message: "div with onClick missing button role — use <button> or role=button",
  },
  {
    id: "RULE-062",
    severity: "Critical",
    pattern: /outline:\s*none|outline:\s*0\b|outline-none(?![\w-])/g,
    message: "Focus outline removed — add :focus-visible ring",
  },
  {
    id: "RULE-063",
    severity: "Critical",
    pattern: /<img(?![^>]*\balt=)[^>]*>/gi,
    message: "Image missing alt attribute",
  },
  {
    id: "RULE-064",
    severity: "High",
    pattern: /\bclick here\b/gi,
    message: "Non-descriptive link text — use verb + destination",
  },
  {
    id: "RULE-065",
    severity: "High",
    pattern: /\b(build something amazing|unlock your potential|revolutionize|game[- ]changer)\b/gi,
    message: "Generic AI marketing copy",
  },
  {
    id: "RULE-066",
    severity: "High",
    pattern: /\blorem ipsum\b/gi,
    message: "Lorem ipsum in UI — use real copy or marked placeholder",
  },
  {
    id: "RULE-067",
    severity: "Critical",
    pattern: /<video[^>]+autoplay[^>]*(?!muted)/gi,
    message: "Autoplay video with sound — mute or user-initiated play",
  },
  {
    id: "RULE-068",
    severity: "High",
    pattern: /animate-pulse(?!.*skeleton|.*loading|.*placeholder)/gi,
    message: "Pulse animation on non-loading element",
  },
  {
    id: "RULE-069",
    severity: "High",
    pattern: /backdrop-blur-(?:xl|2xl|3xl)/g,
    message: "Heavy glassmorphism — use solid surfaces in product UI",
  },
  {
    id: "RULE-070",
    severity: "High",
    pattern: /(?:text|bg)-(?:purple|violet|fuchsia)-(?:400|500)\b.*(?:text|bg)-(?:blue|sky)-(?:400|500)/g,
    message: "Competing accent hues in same scope",
  },
  {
    id: "RULE-071",
    severity: "Critical",
    pattern: /tabIndex=\{?0\}?[^>]*onClick|<button[^>]*tabIndex=\{-1\}/g,
    message: "Keyboard trap or removed tab order on interactive element",
  },
  {
    id: "RULE-072",
    severity: "High",
    pattern: /transition-all\b/g,
    message: "transition-all hurts performance — transition specific properties",
  },
  {
    id: "RULE-073",
    severity: "High",
    pattern: /duration-(?:700|1000|1500|2000)\b/g,
    message: "Animation duration >500ms on micro-interaction",
  },
  {
    id: "RULE-074",
    severity: "High",
    pattern: /scale-\[?1\.(?:[1-9]|[1-9]\d)/g,
    message: "Hover scale >1.05 causes layout shift",
  },
  {
    id: "RULE-075",
    severity: "Critical",
    pattern: /placeholder=["'][^"']+["'][^>]*>(?!.*<label)/gi,
    message: "Placeholder-only input — add visible <label>",
  },
  {
    id: "RULE-076",
    severity: "High",
    pattern: /target=["']_blank["'](?![^>]*rel=)/gi,
    message: "target=_blank without rel=noopener noreferrer",
  },
  {
    id: "RULE-077",
    severity: "High",
    pattern: /#000000?\b|#fff(?:fff)?\b(?![0-9a-f])/gi,
    message: "Pure black/white — use off-black/off-white tokens",
  },
  {
    id: "RULE-078",
    severity: "High",
    pattern: /text-black\b(?!\s*\/\*)/g,
    message: "Tailwind text-black — use zinc-950 or token",
  },
  {
    id: "RULE-079",
    severity: "High",
    pattern: /bg-\[#(?:[0-9a-f]{3}){1,2}\]/gi,
    message: "Arbitrary hex in className — use design token",
  },
  {
    id: "RULE-080",
    severity: "Critical",
    pattern: /aria-hidden=["']true["'][^>]*(?:<button|<a |tabIndex)/gi,
    message: "aria-hidden on focusable content",
  },
  {
    id: "RULE-081",
    severity: "High",
    pattern: /@keyframes[^}]+(?!prefers-reduced-motion)/gi,
    message: "Keyframes without prefers-reduced-motion fallback nearby",
  },
  {
    id: "RULE-082",
    severity: "High",
    pattern: /scroll-jacking|scroll-snap-type:\s*y\s+mandatory/gi,
    message: "Scroll-jacking reduces user agency",
  },
  {
    id: "RULE-083",
    severity: "High",
    pattern: /rounded-3xl.*rounded-3xl.*rounded-3xl/g,
    message: "rounded-3xl overuse — vary radius by component role",
  },
  {
    id: "RULE-084",
    severity: "High",
    pattern: /✨|🚀|💡|🔥/g,
    message: "Sparkle/rocket emoji in product UI reads as AI-generated",
  },
  {
    id: "RULE-085",
    severity: "Critical",
    pattern: /<html(?![^>]*\blang=)/gi,
    message: "Missing lang attribute on <html>",
  },
  {
    id: "RULE-086",
    severity: "High",
    pattern: /min-h-\[(?:3[0-9]|[4-9]\d)px\]/g,
    message: "Touch target under 44px",
  },
  {
    id: "RULE-087",
    severity: "High",
    pattern: /style=\{\{[^}]*fontSize:\s*['"]?1[0-7]px/g,
    message: "Arbitrary small font size — use type scale token",
  },
  {
    id: "RULE-088",
    severity: "High",
    pattern: /bg-black\/(?:0\)|0\s|5\b|10\b)/g,
    message: "Modal scrim too light — use 40-60% opacity",
  },
];

function parseArgs(argv) {
  const args = { path: ".", warnOnly: false };
  for (let i = 2; i < argv.length; i++) {
    if (argv[i] === "--path" || argv[i] === "-p") args.path = argv[++i];
    else if (argv[i] === "--warn-only") args.warnOnly = true;
    else if (argv[i] === "--help" || argv[i] === "-h") {
      console.log("Usage: node scripts/lint-design-rules.mjs [--path DIR] [--warn-only]");
      process.exit(0);
    }
  }
  return args;
}

function walk(dir, files = []) {
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return files;
  }
  for (const name of entries) {
    if (name === "node_modules" || name === ".git" || name === "dist") continue;
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) walk(full, files);
    else if (EXTENSIONS.has(name.slice(name.lastIndexOf(".")))) files.push(full);
  }
  return files;
}

function lintFile(filePath, root) {
  const content = readFileSync(filePath, "utf8");
  const rel = relative(root, filePath);
  const findings = [];
  for (const rule of RULES) {
    rule.pattern.lastIndex = 0;
    const m = content.match(rule.pattern);
    if (m && m.length > 0) {
      findings.push({ ...rule, file: rel, count: m.length });
    }
  }
  return findings;
}

function main() {
  const { path: scanPath, warnOnly } = parseArgs(process.argv);
  const root = resolve(scanPath);

  if (!statSync(root, { throwIfNoEntry: false })?.isDirectory()) {
    console.log(`Skip lint: ${root} not found (no UI files to scan)`);
    process.exit(0);
  }

  const files = walk(root);
  if (files.length === 0) {
    console.log(`No lintable files in ${root}`);
    process.exit(0);
  }

  const all = files.flatMap((f) => lintFile(f, root));
  const critical = all.filter((f) => f.severity === "Critical");
  const high = all.filter((f) => f.severity === "High");

  if (all.length === 0) {
    console.log(`✓ ${files.length} files scanned — 0 rule violations`);
    process.exit(0);
  }

  for (const f of all) {
    const icon = f.severity === "Critical" ? "✗" : "⚠";
    console.log(`${icon} ${f.id} [${f.severity}] ${f.file} (${f.count}x) — ${f.message}`);
  }

  console.log(`\n${files.length} files — ${critical.length} Critical, ${high.length} High`);

  if (critical.length > 0 && !warnOnly) {
    process.exit(1);
  }
  process.exit(0);
}

main();
