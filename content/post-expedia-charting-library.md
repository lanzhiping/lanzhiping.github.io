---
type: post
date: "2025-06-15"
reading_time: "6 min read"
title: "Building a Shared Charting Library Across Multiple Expedia Teams"
image_alt: "Abstract system graphic representing a reusable frontend visualization platform"
tags: ["expedia", "frontend architecture", "typescript", "react", "design systems"]
status: "draft"
summary: "How a reusable charting library reduced duplication, standardized data visualization, and improved delivery speed across internal teams."
---

## Context

At Expedia Group, I built a custom charting library that was adopted across multiple teams. The original problem was repeated effort: teams were solving similar data visualization needs with inconsistent implementations, styling, and maintenance costs.

## Current Direction

The article will focus on the design constraints that pushed the team toward a shared library, the API decisions that helped adoption, and the balance between flexibility and consistency.

## Draft Story

The core goal was not just to build components, but to create a reliable internal platform for product teams shipping metrics-heavy experiences. By packaging shared charting patterns into a reusable library, we reduced duplication and made dashboards easier to build and maintain.

This project also created a common language for frontend teams. Instead of rebuilding chart behavior for each surface, teams could focus on business logic and product outcomes.

## Planned Expansion

The final version will add concrete adoption details, before-and-after implementation examples, and lessons learned from rollout.
