---
type: post
title: "Shopping Website Progressive Filtering"
date: "2017-09-15"
reading_time: "6 min read"
tags: ["frontend", "ssr", "react", "architecture"]
summary: "A filtering design that supports both server-side rendering and client-side updates for product listing pages."
---

## Context

At EPAM Systems, I worked on a shopping website experience where filtering needed to work well in both server-rendered and browser-rendered flows. The main challenge was keeping the page fast and shareable without sacrificing interactive behavior once JavaScript was available.

## SSR Flow

On the server side, the page reads the selected filter state from the URL query parameter. That allows the product listing page to be built with the chosen filters already applied, so the initial response is usable immediately and can be indexed or shared as a normal URL.

The server then assembles the product listing items dynamically based on that filter state. This keeps the markup aligned with the selected filters instead of relying on the browser to fix the page after load.

## Client-Side Flow

Once the browser takes over, JavaScript re-renders both the filter component and the product list component. When a user changes a filter, the interface updates the displayed items without requiring a full page reload.

This gives the experience a progressive enhancement model: the server delivers the first useful view, and the client adds smoother interactivity after hydration.

## Why This Design Worked

The design kept SSR and client-side rendering in sync through the same filter state. That reduced edge cases, preserved a good initial load experience, and still let the user refine the listing fluidly in the browser.

It was also a practical architecture choice for commerce pages, where filter URLs need to be stable, shareable, and easy to rebuild from the incoming request.
