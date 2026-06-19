---
spec: "add-google-analytics"
phase: research
created: "2026-06-19"
---

# Research: add-google-analytics

## Executive Summary

The site is a static GitHub Pages project with a single `index.html` entrypoint and JavaScript loaded from `main.js`. Google Analytics can be added by placing the official `gtag.js` snippet in the document head without changing the app logic.

## External Research

### Best Practices
- Use the Google-provided async `gtag.js` loader and configure it with measurement ID `G-EHDL9M60FS`.
- Keep the tag in the head so page measurement initializes early, while the `async` loader avoids blocking render.

### Prior Art
- The existing page already uses head-level scripts for bootstrapping theme and title behavior.

### Pitfalls to Avoid
- Do not wrap the analytics snippet in the app module or make analytics depend on `main.js`.
- Do not modify existing theme, title, navigation, or content-loading logic.

## Codebase Analysis

### Existing Patterns
- `index.html` contains inline head scripts for independent page bootstrap behavior.
- `main.js` is loaded as a body-end module and should not be changed for a global analytics tag.

### Dependencies
- No new package dependencies are required.

### Constraints
- The requested measurement ID is `G-EHDL9M60FS`.
- The change should not alter existing runtime behavior besides loading Google Analytics.

## Related Specs

| Spec | Relevance | Relationship | May Need Update |
|------|-----------|--------------|-----------------|
| None | Low | No existing specs found | No |

## Feasibility Assessment

| Aspect | Assessment | Notes |
|--------|------------|-------|
| Technical Viability | High | Static HTML supports the official snippet directly |
| Effort Estimate | S | One HTML entrypoint change |
| Risk Level | Low | Async external script and isolated inline setup |

## Recommendations for Requirements

1. Add the exact Google tag snippet with measurement ID `G-EHDL9M60FS`.
2. Place it in `index.html` head before existing app-specific scripts.
3. Verify the snippet is present and existing scripts remain unchanged.

## Open Questions

- None.

## Sources

- `index.html` for page entrypoint and existing head script placement.
