---
description: "Validate that all success criteria for the current step are met"
agent: code-reviewer
tools: ["search", "read", "execute", "web", "todo"]
---

Validate that all success criteria for a specific step are met.

## Step 1: Require Step Number

Step number: `${input:step-number:Step number to validate (required, e.g. 5-0, 5-1)}`

If no step number was provided, stop and ask the user for one.

## Step 2: Find the Exercise Issue

Use the GitHub CLI to locate the main exercise issue:
```
gh issue list --state open
```
The exercise issue will have "Exercise:" in the title.

## Step 3: Get the Full Issue with Comments

```
gh issue view <issue-number> --comments
```

## Step 4: Find the Step

Search through the issue body and comments for the section:
```
# Step {step-number}:
```

Extract the complete **Success Criteria** section from that step.

## Step 5: Check Each Criterion

For each criterion in the Success Criteria section, verify the current workspace state:

- Read relevant source files to confirm implementation
- Run tests if the criterion relates to test coverage or passing tests
- Check file structure if the criterion relates to file creation or organization
- Run lint if the criterion requires clean lint output

## Step 6: Report Results

Provide a structured report:

```
## Validation: Step {step-number}

### ✅ Passing
- Criterion 1 — confirmed by [evidence]
- Criterion 2 — confirmed by [evidence]

### ❌ Incomplete
- Criterion 3 — [specific gap and how to fix it]

### Result
PASS / FAIL — [summary]
```

If any criteria are incomplete, give specific, actionable guidance on what still needs to be done.
