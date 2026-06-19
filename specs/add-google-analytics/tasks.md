# Tasks: add-google-analytics

## Overview

Total tasks: 1
Coarse task workflow for a narrow static HTML integration.

## Completion Criteria

- Google Analytics loader is present in `index.html`.
- Google Analytics config uses measurement ID `G-EHDL9M60FS`.
- Existing page scripts remain intact.
- Static verification passes.

## Phase 1: Implementation

- [x] 1.1 Add Google Analytics tag
  - **Do**: Insert the provided Google Analytics `gtag.js` snippet in the `index.html` head before existing inline bootstrap scripts.
  - **Files**: `index.html`
  - **Done when**: The official async loader and `gtag('config', 'G-EHDL9M60FS')` are present, and existing page scripts remain present.
  - **Verify**: Static search of `index.html` for the loader URL, measurement ID, existing `main.js` module script, and existing bootstrap scripts.
  - **Commit**: `feat(analytics): add google analytics tag`
  - _Requirements: FR-1, FR-2, AC-1.1, AC-1.2, AC-1.3_
  - _Design: Google Analytics Tag_

## Notes

- **POC shortcuts taken**: None.
- **Production TODOs**: None for the requested scope.

## Dependencies

```text
Implementation -> Static verification
```
