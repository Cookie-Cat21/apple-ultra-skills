#!/usr/bin/env node
/**
 * Sync Apple Ultra Skills from repo root to agent skill directories.
 *
 * Usage:
 *   node scripts/sync-platforms.mjs --target cursor
 *   node scripts/sync-platforms.mjs --target claude
 *   node scripts/sync-platforms.mjs --target agents
 *   node scripts/sync-platforms.mjs --target all
 *   node scripts/sync-platforms.mjs --target all --dest /path/to/project
 */

import { cpSync, existsSync, mkdirSync, readdirSync, rmSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..");

const SKIP = new Set([
  ".git",
  ".cursor-plugin",
  "competitive-research",
  "examples",
  "registry",
  "scripts",
  "node_modules",
]);

const TARGETS = {
  cursor: ".cursor/skills",
  claude: ".claude/skills",
  agents: ".agents/skills",
};

function parseArgs(argv) {
  const args = { target: "all", dest: process.cwd(), dryRun: false };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--target" || a === "-t") args.target = argv[++i];
    else if (a === "--dest" || a === "-d") args.dest = resolve(argv[++i]);
    else if (a === "--dry-run") args.dryRun = true;
    else if (a === "--help" || a === "-h") {
      console.log(`Usage: node scripts/sync-platforms.mjs [--target cursor|claude|agents|all] [--dest DIR] [--dry-run]`);
      process.exit(0);
    }
  }
  return args;
}

function isSkillDir(name, fullPath) {
  if (SKIP.has(name) || name.startsWith(".")) return false;
  if (!statSync(fullPath).isDirectory()) return false;
  return existsSync(join(fullPath, "SKILL.md"));
}

function listSkillDirs(root) {
  return readdirSync(root)
    .filter((name) => isSkillDir(name, join(root, name)))
    .sort();
}

function syncSkill(skillName, destRoot, dryRun) {
  const src = join(REPO_ROOT, skillName);
  const dest = join(destRoot, skillName);
  if (dryRun) {
    console.log(`[dry-run] ${src} → ${dest}`);
    return;
  }
  rmSync(dest, { recursive: true, force: true });
  cpSync(src, dest, { recursive: true });
  console.log(`✓ ${skillName} → ${dest}`);
}

function main() {
  const { target, dest, dryRun } = parseArgs(process.argv);
  const skills = listSkillDirs(REPO_ROOT);

  if (skills.length === 0) {
    console.error("No skill directories found at repo root.");
    process.exit(1);
  }

  const selected =
    target === "all" ? Object.keys(TARGETS) : target.split(",").map((t) => t.trim());

  for (const t of selected) {
    if (!TARGETS[t]) {
      console.error(`Unknown target "${t}". Use: ${Object.keys(TARGETS).join(", ")}, all`);
      process.exit(1);
    }
    const destRoot = join(dest, TARGETS[t]);
    if (!dryRun) mkdirSync(destRoot, { recursive: true });
    console.log(`\nSyncing ${skills.length} skills → ${destRoot}`);
    for (const skill of skills) {
      syncSkill(skill, destRoot, dryRun);
    }
  }

  console.log(`\nDone. ${skills.length} skill(s) per target.`);
}

main();
