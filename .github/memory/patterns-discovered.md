# Patterns Discovered

A growing library of code patterns, anti-patterns, and non-obvious solutions encountered in this codebase. Add an entry whenever a pattern is likely to recur.

---

## Template

```
## Pattern: <name>
**Context**: Where/when this pattern applies
**Problem**: What goes wrong without this pattern
**Solution**: What to do instead
**Example**:
\`\`\`js
// bad
...
// good
...
\`\`\`
**Related files**: ...
```

---

## Pattern: Service Initialization — Empty Array vs Null
**Context**: In-memory data stores in Express services (e.g., `packages/backend/src/app.js`)
**Problem**: Initializing a collection as `null` causes `Cannot read properties of null` errors when route handlers attempt to call `.filter()`, `.map()`, or `.find()` before any data has been added.
**Solution**: Always initialize collection variables as empty arrays (`[]`), never `null` or `undefined`.
**Example**:
```js
// bad — causes runtime errors on first request
let todos = null;

// good — safe to iterate immediately
let todos = [];
```
**Related files**: `packages/backend/src/app.js`
