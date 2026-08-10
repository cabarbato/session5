---
description: "Execute instructions from the current GitHub Issue step"
agent: tdd-developer
tools: ["search", "read", "edit", "execute", "web", "todo"]
---

Execute the instructions from the current GitHub Issue step.

## Step 1: Find the Issue

If an issue number was provided: `${input:issue-number:Issue number (leave blank to auto-detect)}`

If no issue number was given, use the GitHub CLI to find the exercise issue:
```
gh issue list --state open
```
The main exercise issue will have "Exercise:" in the title. Use that issue number.

## Step 2: Get the Issue Content

Fetch the full issue including all comments:
```
gh issue view <issue-number> --comments
```

## Step 3: Parse the Current Step

Read through the issue body and comments to identify the latest step that contains unexecuted `:keyboard: Activity:` sections.

## Step 4: Execute Each Activity

Work through every `:keyboard: Activity:` section in order:

- Follow the instructions exactly as written
- Make all required code changes
- Run tests after each change to verify progress (use `npm test` in the relevant package)
- Apply TDD discipline: write tests first for new features, fix minimal code for failing tests

**Scope boundary**: Do NOT create or run Playwright UI tests in this prompt. UI test work must use `/create-ui-tests` and `/run-ui-tests` which auto-switch to the `test-engineer` agent.

## Step 5: Stop — Do NOT Commit or Push

Do not run `git add`, `git commit`, or `git push`. Committing and pushing is handled by `/commit-and-push`.

## Step 6: Report Completion and Next Commands

After all activities are complete, report what was done and provide the next commands in this exact order:

**If the current step requires UI workflow:**
1. `/create-ui-tests` — author Playwright tests (switches to test-engineer)
2. `/run-ui-tests` — run and triage UI tests (switches to test-engineer)
3. `/validate-step {step-number}` — validate success criteria (switches to code-reviewer)

**If UI workflow is not required:**
1. `/validate-step {step-number}` — validate success criteria (switches to code-reviewer)

Never recommend `/validate-step` before required UI prompts have been completed.
