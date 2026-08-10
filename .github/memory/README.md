# Development Memory System

This directory is a working memory system for tracking discoveries, decisions, and patterns during development of the TODO application.

## Purpose

AI assistants have no memory between sessions. This system bridges that gap by providing structured files where findings can be recorded and retrieved. It makes future work more context-aware and reduces repeated debugging of the same issues.

## Two Types of Memory

| Type | Location | Committed? | Purpose |
|------|----------|------------|---------|
| **Persistent** | `.github/copilot-instructions.md` | Yes | Foundational principles, workflows, agent roles — things that never change |
| **Working** | `.github/memory/` | Varies | Discoveries, patterns, and session notes accumulated during development |

## Directory Structure

```
.github/memory/
├── README.md                  # This file — how to use the system
├── session-notes.md           # Historical summaries of completed sessions (committed)
├── patterns-discovered.md     # Accumulated code patterns and learnings (committed)
└── scratch/
    ├── .gitignore             # Excludes all scratch files from git
    └── working-notes.md       # Active session notes (NOT committed)
```

### `session-notes.md`

A historical log of completed development sessions. Each entry captures what was done, what was found, and what decisions were made. Committed to git so it persists across machines and collaborators.

**When to update**: At the end of a session, before committing. Summarize from `scratch/working-notes.md`.

### `patterns-discovered.md`

A growing library of code patterns and anti-patterns encountered in this codebase. Each entry follows a structured template so patterns are easy to scan and apply.

**When to update**: When a recurring pattern, a tricky initialization issue, or a non-obvious solution is identified. Committed so the library grows over time.

### `scratch/working-notes.md`

A scratchpad for the current active session. Write freely here — track hypotheses, dead ends, and in-progress findings. Not committed to git (excluded by `scratch/.gitignore`).

**When to update**: Continuously during active work. At session end, promote key findings to `session-notes.md` and any patterns to `patterns-discovered.md`, then clear or reset this file.

## When to Use Each File

### During TDD Workflows
- Open `scratch/working-notes.md` before starting
- Record current task, approach, and test names being written
- Note failures and what they revealed
- On completion, summarize in `session-notes.md`

### During Linting / Code Quality Workflows
- Record lint rule patterns in `patterns-discovered.md` (e.g., "this rule fires when X")
- Track which files needed fixes and why in `scratch/working-notes.md`

### During Debugging Workflows
- Use `scratch/working-notes.md` to track hypotheses and what was ruled out
- When the root cause is found, add it to `patterns-discovered.md` if it's likely to recur

## How AI Reads and Applies These Patterns

At the start of a task, an AI assistant should:

1. Read `patterns-discovered.md` to check for known patterns relevant to the current work
2. Read `session-notes.md` to understand recent history and prior decisions
3. Read `scratch/working-notes.md` if continuing an active session

By referencing these files, the AI can give suggestions that are grounded in the actual history of this codebase rather than generic advice.

## Session End Checklist

- [ ] Promote key findings from `scratch/working-notes.md` to `session-notes.md`
- [ ] Add any reusable patterns to `patterns-discovered.md`
- [ ] Commit `session-notes.md` and `patterns-discovered.md`
- [ ] `scratch/` files are automatically excluded from git — no action needed
