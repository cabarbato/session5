---
description: "Create UI tests for required critical user journeys"
agent: test-engineer
tools: ["search", "read", "edit", "execute", "todo"]
---

Create Playwright UI tests for critical user journeys.

## Step 1: Determine Journeys

Journeys to cover: `${input:journeys:Journeys to test (leave blank for defaults: create, edit, toggle, delete, error-state)}`

If no journeys were specified, use the default set:
- Create a new todo
- Edit an existing todo
- Toggle a todo complete/incomplete
- Delete a todo
- At least one error-state or empty-state flow

## Step 2: Audit Existing Tests

Read `packages/frontend/tests/ui/` to understand what Playwright tests already exist. Avoid duplicating covered scenarios.

## Step 3: Apply the Hard Limit

**Maximum 5 Playwright test cases (`test(...)` / `it(...)`) for this run.**

- Target 3–5 tests total
- Include at least 1 error-path or edge-case test within that count
- If more than 5 candidate scenarios exist, select the 5 highest-risk ones and list the deferred scenarios in your report — do not create more than 5

## Step 4: Author Tests Using POM

Follow the Page Object Model pattern:

- Place reusable selectors and interaction helpers in `packages/frontend/tests/ui/pages/` (create `TodoPage.js` if it does not exist)
- Keep test files in `packages/frontend/tests/ui/` focused on scenario intent and assertions
- Do not duplicate selectors or interaction flows across test files — reference the page object

**Selector priority**: `getByRole` → `getByLabel` → `getByText` → `data-testid` — never CSS class selectors.

**Waits**: Use state-based waits (`expect(...).toBeVisible()`, `waitForResponse`) — never `waitForTimeout`.

**Isolation**: Each test must be independent. Use `beforeEach` to navigate to a known starting state.

## Step 5: Verify the Count

Before finishing, count the total number of `test(` and `it(` calls in all authored/modified Playwright files. If the count exceeds 5, remove the lowest-priority scenarios until the count is within the limit.

## Step 6: Report

```
## UI Tests Created

### Files changed
- tests/ui/pages/TodoPage.js — [new/updated]
- tests/ui/e2e.spec.js — [new/updated]

### Scenarios covered (N of 5 max)
1. [scenario name]
2. ...

### Deferred scenarios (if any)
- [scenario] — reason for deferral

### Next step
Run `/run-ui-tests` to execute these tests.
```
