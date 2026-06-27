#!/usr/bin/env python3
"""Validate Apple Ultra Skills pack structure."""

from __future__ import annotations

import argparse
import re
import sys
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SKIP_DIRS = {"competitive-research", "examples", "registry", "scripts", ".cursor-plugin"}

# Engineering skills must include anti-rationalization tables (addyosmani pattern).
ENGINEERING_RATIONALIZATION_SKILLS = {
    "ultra-api-auth",
    "ultra-migrations",
    "ultra-payments",
    "ultra-security-review",
    "ultra-scheduling-engine",
    "ultra-plan-gating",
    "ultra-pr-ship-review",
    "ultra-tdd",
    "ultra-web-quality",
}

RATIONALIZATION_HEADINGS = ("## Common excuses", "## Common Rationalizations")
RATIONALIZATION_TABLE_MARKERS = (
    "| Common excuse |",
    "| Rationalization |",
)


def parse_frontmatter(text: str) -> tuple[dict[str, str], str]:
    if not text.startswith("---"):
        return {}, text
    end = text.find("\n---", 3)
    if end == -1:
        return {}, text
    raw = text[3:end]
    body = text[end + 4 :]
    fm: dict[str, str] = {}
    key: str | None = None
    buf: list[str] = []
    for line in raw.splitlines():
        if re.match(r"^[a-zA-Z0-9_-]+:\s*", line) and not line.startswith(" "):
            if key is not None:
                fm[key] = "\n".join(buf).strip().strip('"').strip("'")
            key, _, val = line.partition(":")
            key = key.strip()
            buf = [val.strip()]
        elif key is not None:
            buf.append(line)
    if key is not None:
        fm[key] = "\n".join(buf).strip().strip('"').strip("'")
    return fm, body


def has_trigger_hints(description: str) -> bool:
    return bool(
        re.search(
            r"(Triggers:|Use when|even if|— even if)",
            description,
            flags=re.I,
        )
    )


def collect_markdown_links(text: str) -> list[str]:
    return re.findall(r"(?<!!)\[[^\]]*\]\(([^)]+)\)", text)


def has_rationalization_section(body: str) -> bool:
    if not any(h in body for h in RATIONALIZATION_HEADINGS):
        return False
    if not any(m in body for m in RATIONALIZATION_TABLE_MARKERS):
        return False
    # Require at least 3 data rows in the excuses table
    section = ""
    for heading in RATIONALIZATION_HEADINGS:
        if heading in body:
            section = body.split(heading, 1)[1]
            break
    rows = [ln for ln in section.splitlines() if ln.startswith("|") and not ln.startswith("|---")]
    return len(rows) >= 4  # header + 3 excuses minimum


def validate_skills(root: Path) -> list[str]:
    errors: list[str] = []
    names: dict[str, list[Path]] = defaultdict(list)

    for path in sorted(root.rglob("SKILL.md")):
        if any(part in SKIP_DIRS for part in path.relative_to(root).parts):
            continue

        text = path.read_text(encoding="utf-8")
        if not text.startswith("---"):
            errors.append(f"{path}: missing frontmatter")
            continue

        fm, body = parse_frontmatter(text)
        name = fm.get("name", "").strip()
        description = fm.get("description", "")

        if not name:
            errors.append(f"{path}: missing name in frontmatter")
            continue

        expected = path.parent.name
        if name != expected:
            errors.append(f"{path}: name '{name}' != folder '{expected}'")

        if not description:
            errors.append(f"{path}: missing description")
        elif not has_trigger_hints(description):
            errors.append(f"{path}: description missing trigger hints (Triggers:/Use when/even if)")

        if len(description) < 80:
            errors.append(f"{path}: description too short ({len(description)} chars) — add trigger phrases")

        names[name].append(path)

        if name in ENGINEERING_RATIONALIZATION_SKILLS and not has_rationalization_section(body):
            errors.append(
                f"{path}: missing anti-rationalization section "
                f"(need '## Common excuses' table with ≥3 rows)"
            )

        for link in collect_markdown_links(text):
            link = link.strip()
            if not link or link.startswith(("http://", "https://", "#", "mailto:", "file://")):
                continue
            link_path = link.split("#", 1)[0]
            target = (path.parent / link_path).resolve()
            if not target.exists():
                errors.append(f"{path}: broken link -> {link}")

    for name, paths in names.items():
        if len(paths) > 1:
            joined = ", ".join(str(p.relative_to(root)) for p in paths)
            errors.append(f"duplicate skill name '{name}': {joined}")

    return errors


def main() -> int:
    parser = argparse.ArgumentParser(description="Validate Apple Ultra Skills")
    parser.add_argument("--root", type=Path, default=ROOT, help="Pack root directory")
    args = parser.parse_args()

    root = args.root.resolve()
    errors = validate_skills(root)
    count = len(
        [p for p in root.rglob("SKILL.md") if not any(x in SKIP_DIRS for x in p.relative_to(root).parts)]
    )

    if errors:
        print("Apple Ultra Skills validation failed:\n", file=sys.stderr)
        for err in errors:
            print(f"  - {err}", file=sys.stderr)
        return 1

    print(f"Validated {count} skills in {root}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
