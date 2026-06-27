#!/usr/bin/env node

/**
 * Apple Ultra Skills — Post-install setup
 * Detects agent platform and prints activation guide.
 */

const fs = require('fs');
const path = require('path');

const BANNER = `
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║     █████╗ ██████╗ ██████╗ ██╗     ███████╗                  ║
║    ██╔══██╗██╔══██╗██╔══██╗██║     ██╔════╝                  ║
║    ███████║██████╔╝██████╔╝██║     █████╗                    ║
║    ██╔══██║██╔═══╝ ██╔═══╝ ██║     ██╔══╝                    ║
║    ██║  ██║██║     ██║     ███████╗███████╗                  ║
║    ╚═╝  ╚═╝╚═╝     ╚═╝     ╚══════╝╚══════╝                  ║
║                                                               ║
║    ██╗   ██╗██╗  ████████╗██████╗  █████╗                     ║
║    ██║   ██║██║  ╚══██╔══╝██╔══██╗██╔══██╗                    ║
║    ██║   ██║██║     ██║   ██████╔╝███████║                    ║
║    ██║   ██║██║     ██║   ██╔══██╗██╔══██║                    ║
║    ╚██████╔╝███████╗██║   ██║  ██║██║  ██║                    ║
║     ╚═════╝ ╚══════╝╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝                    ║
║                                                               ║
║    ███████╗██╗  ██╗██╗██╗     ██╗     ███████╗               ║
║    ██╔════╝██║  ██║██║██║     ██║     ██╔════╝               ║
║    ███████╗███████║██║██║     ██║     ███████╗               ║
║    ╚════██║██╔══██║██║██║     ██║     ╚════██║               ║
║    ███████║██║  ██║██║███████╗███████╗███████║               ║
║    ╚══════╝╚═╝  ╚═╝╚═╝╚══════╝╚══════╝╚══════╝               ║
║                                                               ║
║         One skill. Every domain. Zero compromises.            ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
`;

const PLATFORMS = [
  {
    dir: '.claude',
    name: 'Claude Code',
    instructions: [
      'Skill auto-loaded from SKILL.md in your skills directory.',
      'Triggers activate on keywords: component, react, test, deploy, security, etc.',
      'Type natural language — Ultra detects context and activates relevant modes.',
      'Slash commands: /ultra-review, /ultra-prd, /ultra-test, /ultra-a11y, /ultra-perf',
    ],
  },
  {
    dir: '.cursor',
    name: 'Cursor',
    instructions: [
      'Skill available in Agent Skills — auto-activates on matching triggers.',
      'Open any .tsx, .test.ts, or route.ts file to activate domain modes.',
      'Reference files in references/ load automatically for deep expertise.',
      'Use @apple-ultra to explicitly invoke the skill in chat.',
    ],
  },
  {
    dir: '.github',
    name: 'GitHub Copilot',
    instructions: [
      'Install via Copilot custom instructions or skills extension.',
      'Copy SKILL.md content to .github/copilot-instructions.md for global activation.',
      'Or reference per-project in .github/instructions/*.instructions.md',
    ],
  },
  {
    dir: '.windsurf',
    name: 'Windsurf',
    instructions: [
      'Add SKILL.md to .windsurf/rules/ directory.',
      'Cascade will auto-activate based on file context and triggers.',
      'Reference files provide depth when working in specific domains.',
    ],
  },
  {
    dir: '.gemini',
    name: 'Gemini CLI',
    instructions: [
      'Place SKILL.md in .gemini/skills/ directory.',
      'Activate with: gemini --skill apple-ultra',
      'Or set as default skill in .gemini/settings.json',
    ],
  },
  {
    dir: '.cline',
    name: 'Cline',
    instructions: [
      'Add to .cline/skills/ or reference in .clinerules',
      'Skill activates based on file type and user intent keywords.',
    ],
  },
  {
    dir: '.roo',
    name: 'Roo Code',
    instructions: [
      'Install via Roo MCP or custom mode configuration.',
      'Reference SKILL.md in .roo/rules/ for project-level activation.',
    ],
  },
  {
    dir: '.vscode',
    name: 'VS Code',
    instructions: [
      'Works with any VS Code AI extension that supports skills/instructions.',
      'Copy SKILL.md to .github/copilot-instructions.md for Copilot.',
      'Or configure in your preferred AI extension settings.',
    ],
  },
];

const ULTRA_MODES = [
  { mode: 'Frontend Ultra', covers: 'React, Next.js, Vue, Svelte, Web APIs, TypeScript' },
  { mode: 'Design Ultra', covers: 'Visual hierarchy, typography, color, motion, design systems' },
  { mode: 'Architecture Ultra', covers: 'SOLID, feature slicing, API design, module boundaries' },
  { mode: 'Testing Ultra', covers: 'TDD, Vitest, Playwright, MSW, CI optimization' },
  { mode: 'Security Ultra', covers: 'OWASP Top 10, auth, CSP, input validation' },
  { mode: 'Performance Ultra', covers: 'Core Web Vitals, bundle, images, fonts, rendering' },
  { mode: 'Accessibility Ultra', covers: 'WCAG 2.2 AA, ARIA, keyboard, screen readers' },
  { mode: 'Agent Ultra', covers: 'MCP servers, browser automation, agent loops, debugging' },
  { mode: 'DevOps Ultra', covers: 'CI/CD, Vercel, monitoring, IaC, environments' },
];

function detectPlatforms() {
  const cwd = process.cwd();
  const detected = [];
  const notDetected = [];

  for (const platform of PLATFORMS) {
    const platformPath = path.join(cwd, platform.dir);
    if (fs.existsSync(platformPath)) {
      detected.push(platform);
    } else {
      notDetected.push(platform);
    }
  }

  return { detected, notDetected };
}

function printModes() {
  console.log('\n📦 Ultra-Modes Available:\n');
  console.log('  Mode                    │ Covers');
  console.log('  ────────────────────────┼──────────────────────────────────────────');
  for (const { mode, covers } of ULTRA_MODES) {
    const paddedMode = mode.padEnd(23);
    console.log(`  ${paddedMode} │ ${covers}`);
  }
}

function printQuickStart() {
  console.log('\n🚀 Quick Start:\n');
  console.log('  1. Open any source file (.tsx, .test.ts, route.ts, etc.)');
  console.log('  2. Ask your agent to build, review, or fix something');
  console.log('  3. Ultra auto-detects context and activates relevant modes');
  console.log('');
  console.log('  Example prompts:');
  console.log('    "Build a login form component"     → Frontend + Design + A11y');
  console.log('    "Review this API route for security" → Security + Architecture');
  console.log('    "Write tests for this hook"         → Testing Ultra');
  console.log('    "Make this page faster"             → Performance Ultra');
  console.log('');
  console.log('  Slash commands (where supported):');
  console.log('    /ultra-review  — Full audit of current file');
  console.log('    /ultra-prd     — Generate structured mini-PRD');
  console.log('    /ultra-test    — TDD test scaffold');
  console.log('    /ultra-a11y    — WCAG 2.2 AA checklist');
  console.log('    /ultra-perf    — Core Web Vitals audit');
}

function printReferences() {
  const refsDir = path.join(__dirname, '..', 'references');
  if (!fs.existsSync(refsDir)) return;

  console.log('\n📚 Reference Files (deep expertise):\n');
  const files = fs.readdirSync(refsDir).filter((f) => f.endsWith('.md'));
  for (const file of files) {
    const name = file.replace('.md', '').padEnd(20);
    console.log(`  references/${file.padEnd(22)} — ${getRefDescription(file)}`);
  }
}

function getRefDescription(file) {
  const descriptions = {
    'frontend.md': '150+ React/Next.js/Vue/Svelte rules',
    'design.md': '200+ visual design and design system rules',
    'architecture.md': '100+ SOLID, API, and module patterns',
    'testing.md': '80+ TDD, Vitest, Playwright, MSW rules',
    'security.md': 'OWASP Top 10 full checklist',
    'performance.md': 'Core Web Vitals optimization guide',
    'accessibility.md': 'WCAG 2.2 AA complete audit checklist',
    'agent-patterns.md': 'MCP, browser automation, agent loops',
    'devops.md': 'CI/CD, Vercel, monitoring, IaC',
  };
  return descriptions[file] || 'Reference documentation';
}

function main() {
  console.log(BANNER);

  const { detected, notDetected } = detectPlatforms();

  if (detected.length > 0) {
    console.log('✅ Detected Agent Platforms:\n');
    for (const platform of detected) {
      console.log(`  🟢 ${platform.name} (${platform.dir}/)`);
      for (const instruction of platform.instructions) {
        console.log(`     → ${instruction}`);
      }
      console.log('');
    }
  }

  if (detected.length === 0) {
    console.log('ℹ️  No agent platform directories detected in current project.\n');
    console.log('   Universal setup — works with any platform that reads SKILL.md:\n');
    for (const platform of PLATFORMS.slice(0, 4)) {
      console.log(`  📌 ${platform.name}:`);
      for (const instruction of platform.instructions) {
        console.log(`     → ${instruction}`);
      }
      console.log('');
    }
  } else if (notDetected.length > 0) {
    console.log('ℹ️  Other supported platforms (not detected):');
    console.log(`   ${notDetected.map((p) => p.name).join(', ')}\n`);
  }

  printModes();
  printQuickStart();
  printReferences();

  console.log('\n─────────────────────────────────────────────────────────────');
  console.log('  Apple Ultra Skills v1.0.0 — MIT License');
  console.log('  One skill. Every domain. Zero compromises.');
  console.log('─────────────────────────────────────────────────────────────\n');
}

main();
