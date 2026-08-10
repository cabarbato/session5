---
description: "Analyze changes, generate commit message, and push to feature branch"
tools: ["read", "execute", "todo"]
---

Commit all staged changes and push to a feature branch.

## Step 1: Require Branch Name

Branch name: `${input:branch-name:Feature branch name (required, e.g. feature/add-delete-endpoint)}`

If no branch name was provided, stop and ask the user for one before proceeding. Never commit to `main`.

## Step 2: Check for Required UI Tests

If the current step included a required UI workflow, confirm that `/run-ui-tests` was completed successfully in this session (or run `npm run test:ui --workspace=frontend` now) before committing. Do not commit if UI tests were required but not run.

## Step 3: Analyze Changes

Run `git diff` and `git status` to understand what was changed:
```
git diff
git status
```

Review the diff to understand the scope and intent of the changes.

## Step 4: Generate a Commit Message

Using the conventional commit format from the project Git Workflow guidelines, generate a descriptive commit message:

- `feat:` — new feature or behavior
- `fix:` — bug fix
- `test:` — adding or updating tests
- `chore:` — build, config, or tooling changes
- `docs:` — documentation only

Keep the subject line under 72 characters. Add a body if the change needs explanation.

## Step 5: Prepare the Branch

Check if the branch exists:
```
git branch --list <branch-name>
```

- If it does not exist: `git checkout -b <branch-name>`
- If it exists: `git checkout <branch-name>`

## Step 6: Stage, Commit, and Push

```
git add .
git commit -m "<generated-message>"
git push origin <branch-name>
```

Only push to the user-provided branch name. Never push to `main` or any other branch.

## Step 7: Report

Confirm the branch name, commit hash, commit message, and files included in the commit.
