# Requirements: add-google-analytics

## Goal

Improve Google Analytics tracking detail for the GitHub Pages SPA so visits and interactions can be identified by internal page, content item, link type, UI region, and user action in Google Analytics.

## User Stories

### US-1: SPA Page Analytics

**As a** site owner
**I want to** track each hash-routed page as a distinct page view
**So that** Google Analytics reports show home, about, posts, projects, filtered listings, and detail pages separately

**Acceptance Criteria:**
- AC-1.1: GA automatic page views are disabled in `index.html`.
- AC-1.2: `main.js` sends manual `page_view` events after each route render.
- AC-1.3: Page views include `page_path`, `page_title`, `route_name`, `content_type`, and `content_id`.
- AC-1.4: Duplicate page views are avoided when the same hash route is rendered again.

### US-2: Link And Button Analytics

**As a** site owner
**I want to** track important links, buttons, and content clicks
**So that** I can identify what users interact with and where those interactions happen

**Acceptance Criteria:**
- AC-2.1: Top nav, brand, read-more, topic chips, hero links, post cards, project cards, back links, AI resource links, skill links, and contact links are tracked.
- AC-2.2: Events include link/action metadata: `link_url`, `link_text`, `link_domain`, `outbound`, `ui_region`, `link_action`, `content_type`, and `content_id` where available.
- AC-2.3: Search submits produce a `search` event with `search_term`.
- AC-2.4: Theme changes produce a `theme_change` event with the selected `theme`.

## Functional Requirements

| ID | Requirement | Priority | Acceptance Criteria |
|----|-------------|----------|---------------------|
| FR-1 | Keep Google Analytics configured with measurement ID `G-EHDL9M60FS` | High | AC-1.1 |
| FR-2 | Track hash-routed page views manually | High | AC-1.2, AC-1.3, AC-1.4 |
| FR-3 | Add stable analytics attributes to generated links and controls | High | AC-2.1, AC-2.2 |
| FR-4 | Track delegated click events for internal, resource, contact, and outbound links | High | AC-2.1, AC-2.2 |
| FR-5 | Track search and theme interactions | Medium | AC-2.3, AC-2.4 |

## Non-Functional Requirements

| ID | Requirement | Metric | Target |
|----|-------------|--------|--------|
| NFR-1 | Performance | Dependencies | No new package dependency |
| NFR-2 | Maintainability | Scope | Analytics helper functions stay isolated in `main.js` |
| NFR-3 | Resilience | Missing/blocked GA | Site behavior continues when `gtag` is unavailable |

## Success Criteria

- Browser verification shows manual `page_view` events for home, listing, and detail routes.
- Browser verification shows interaction events for nav, search, theme, and card clicks.
- Static verification confirms `send_page_view: false`, analytics helpers, and `data-analytics-*` attributes are present.
