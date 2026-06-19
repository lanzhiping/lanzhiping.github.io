# Requirements: add-google-analytics

## Goal

Add Google Analytics tracking to the GitHub Pages site using the provided Google tag while preserving all existing site behavior.

## User Stories

### US-1: Page Analytics

**As a** site owner
**I want to** load Google Analytics on the GitHub Pages site
**So that** page visits can be measured in Google Analytics

**Acceptance Criteria:**
- AC-1.1: `index.html` loads `https://www.googletagmanager.com/gtag/js?id=G-EHDL9M60FS` with `async`.
- AC-1.2: `gtag('config', 'G-EHDL9M60FS')` is present in the head.
- AC-1.3: Existing scripts and app module loading remain present and in their original roles.

## Functional Requirements

| ID | Requirement | Priority | Acceptance Criteria |
|----|-------------|----------|---------------------|
| FR-1 | Add the Google Analytics tag to the page head | High | Official loader and config snippet appear in `index.html` |
| FR-2 | Preserve existing runtime logic | High | Theme, title, stylesheet, and module script entries remain intact |

## Non-Functional Requirements

| ID | Requirement | Metric | Target |
|----|-------------|--------|--------|
| NFR-1 | Performance | Script loading mode | Analytics loader uses `async` |
| NFR-2 | Maintainability | Scope of change | No app JavaScript refactor or new dependencies |

## Glossary

- **gtag.js**: Google's JavaScript tag library for Google Analytics.
- **Measurement ID**: Google Analytics stream identifier, here `G-EHDL9M60FS`.

## Out of Scope

- Cookie consent UI.
- Custom analytics events.
- Changes to `main.js`, styles, or content files.

## Dependencies

- Google Tag Manager hosted `gtag.js`.

## Success Criteria

- The supplied Google Analytics snippet is present in `index.html`.
- Static validation confirms existing script references remain present.

## Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| External analytics script is blocked by a browser or extension | Low | Site functionality does not depend on the analytics script |
| Snippet accidentally changes app bootstrap order | Medium | Insert before existing scripts without editing their bodies |
