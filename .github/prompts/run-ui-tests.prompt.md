---
description: "Run UI tests and summarize failures"
agent: test-engineer
tools: ["read", "execute", "todo"]
---

Run the Playwright UI test suite and summarize results.

## Step 1: Install Playwright Dependencies (Required)

In Ubuntu/Linux environments this step is mandatory before every test run (and after any container rebuild):

```
npm run test:ui:install --workspace=frontend
```

This command runs `playwright install --with-deps chromium` and includes automatic remediation for the common Ubuntu package repository key issue, plus one retry.

**If the install fails:**
- Stop immediately
- Report an environment blocker with the failing command and the key error lines
- Do NOT attempt ad-hoc package hunting or broad OS troubleshooting beyond the automated remediation
- Do NOT proceed to run Playwright tests after a failed install

## Step 2: Ensure Servers Are Running

Both backend and frontend must be running before UI tests execute. If they are not already running, start them from the repo root:

```
npm start
```

Wait for both servers to report ready before continuing.

## Step 3: Run UI Tests

```
npm run test:ui --workspace=frontend
```

Capture the full output.

## Step 4: Summarize Results

Report a clear pass/fail summary:

```
## UI Test Results

### Summary
- Total: N
- Passed: N
- Failed: N
- Skipped: N

### Passing tests
- [test name]

### Failing tests
- [test name] — [failure message excerpt]
```

## Step 5: Triage Failures

For each failing test, classify the root cause:

| Failure class | Indicators | Action |
|---------------|-----------|--------|
| **Application defect** | Test expectation is correct; feature is broken | Report — use `/execute-step` to fix with tdd-developer |
| **Test defect** | Selector stale, assertion wrong, test logic flawed | Fix the test here |
| **Environment defect** | Server not running, port conflict, missing dep | Fix environment; document in `.github/memory/scratch/working-notes.md` |

Explain the classification for each failure. Never change a test assertion to make a failure green without confirming it is a test defect.

## Step 6: Report Next Steps

```
## Next Steps
- [Fix required / all passing — recommended next prompt]
```

If all tests pass, the next step is `/validate-step {step-number}`.
If application defects were found, the next step is `/execute-step` to fix them, then re-run `/run-ui-tests`.
