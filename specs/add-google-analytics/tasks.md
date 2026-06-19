# Tasks: add-google-analytics

## Overview

Total tasks: 1
Coarse task workflow for improving Google Analytics tracking across the existing static SPA.

## Completion Criteria

- Google Analytics still uses measurement ID `G-EHDL9M60FS`.
- Automatic GA page views are disabled to avoid duplicate SPA tracking.
- Manual `page_view` events identify internal hash routes, listings, filtered pages, and detail pages.
- Key links, buttons, and interactions emit GA events with useful report parameters.
- Static and browser verification pass.

## Phase 1: Implementation

- [x] 1.1 Improve Google Analytics tracking detail
  - **Do**: Add manual SPA page-view tracking, event helpers, stable `data-analytics-*` attributes, delegated click tracking, search tracking, and theme-change tracking.
  - **Files**: `index.html`, `main.js`
  - **Done when**: Route changes and major interactions are visible in `window.dataLayer` with page, content, link, region, and action metadata.
  - **Verify**: `node --check main.js`; static search for analytics configuration and attributes; browser verification of home/listing/detail page views, nav click, search, theme, and post card click events.
  - **Commit**: `feat(analytics): improve spa event tracking`
  - _Requirements: FR-1, FR-2, FR-3, FR-4, FR-5_
  - _Design: Event Taxonomy, Implementation Details_

## Verification Evidence

- `node --check main.js` passed.
- `window.dataLayer` showed:
  - `page_view` for `#/` with `route_name=home`.
  - `nav_click` for the Posts top nav link.
  - `page_view` for `#/posts` with `content_type=listing`.
  - `search` with `search_term=aws`.
  - `page_view` for `#/posts?q=aws` with `content_id=query:aws`.
  - `theme_change` with `theme=dark`.
  - `post_card_click` with `content_id=executing-a-zero-downtime-aws-account-migration`.
  - `page_view` for the post detail route with `content_type=post`.

## Notes

- **POC shortcuts taken**: None.
- **Production TODOs**: Register useful GA4 custom parameters such as `route_name`, `content_type`, `content_id`, `ui_region`, and `link_action` as custom dimensions if they should appear in standard GA reports.

## Dependencies

```text
GA config update -> Analytics helpers -> Render metadata -> Event delegation -> Verification
```
