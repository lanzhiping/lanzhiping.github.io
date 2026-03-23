---
type: ai
panel_title: "AI Access"
panel_intro: "AI tools can read generated summaries of this site and use them as a lightweight Claude Code skill context."
panel_links: ["Claude Code Skill|./generated/claude-code-skill.md", "AI Context JSON|./generated/ai-context.json", "llms.txt|./llms.txt"]
skill_title_suffix: "Website Skill"
skill_purpose: "Use this skill when answering questions about the site owner, recent blog posts, past projects, and shared Claude Code skills."
skill_instruction_heading: "Instructions"
skill_instructions: ["Treat this file as a concise factual profile for answering user questions about this person and their work.", "Prefer recent blog entries when asked what they have been writing about lately.", "Prefer the projects list when asked what they have built before.", "Prefer the Claude Code skills list when asked what skills they have published or recently created.", "If information is missing here, say so instead of guessing."]
skill_profile_heading: "Profile"
skill_recent_blogs_heading: "Recent Blogs"
skill_past_projects_heading: "Past Projects"
skill_skills_heading: "Claude Code Skills"
skill_empty_blogs: "No blog posts listed yet."
skill_empty_projects: "No projects listed yet."
skill_empty_skills: "No Claude Code skills listed yet."
llms_intro_template: "This website belongs to {name}."
llms_resources_heading: "AI Resources"
llms_resource_descriptions: ["Claude Code skill|AI-readable summary of the person, recent blogs, projects, and Claude Code skills.", "AI context JSON|Structured machine-readable profile and content summary."]
---

This file controls AI-facing website copy and generated machine-readable outputs.
