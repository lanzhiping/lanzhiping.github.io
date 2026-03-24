const CONTENT_ROOT = "./content/";
const GENERATED_ROOT = "./generated/";
const CONTENT_INDEX_FILE = "generated-content-index.md";
const DATE_FORMATTER = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

const state = {
  entries: [],
  site: {},
  profile: {},
  ui: {},
  ai: {},
  uiLabels: {},
  posts: [],
  projects: [],
  skills: [],
  races: [],
  searchQuery: "",
};

let revealObserver;
let motionFrame = null;

async function loadText(path) {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Failed to load ${path}`);
  }
  return response.text();
}

async function loadJson(path) {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Failed to load ${path}`);
  }
  return response.json();
}

function parseFrontmatter(raw) {
  const normalized = raw.replace(/\r\n/g, "\n");
  if (!normalized.startsWith("---\n")) {
    return { attributes: {}, body: normalized.trim() };
  }

  const endIndex = normalized.indexOf("\n---\n", 4);
  if (endIndex === -1) {
    return { attributes: {}, body: normalized.trim() };
  }

  const frontmatter = normalized.slice(4, endIndex).trim();
  const body = normalized.slice(endIndex + 5).trim();
  const attributes = {};

  for (const line of frontmatter.split("\n")) {
    const separator = line.indexOf(":");
    if (separator === -1) continue;
    const key = line.slice(0, separator).trim();
    const value = line.slice(separator + 1).trim();
    attributes[key] = parseFrontmatterValue(value);
  }

  return { attributes, body };
}

function parseFrontmatterValue(value) {
  if (!value) return "";
  if (value.startsWith("[") && value.endsWith("]")) {
    return value
      .slice(1, -1)
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean)
      .map((item) => item.replace(/^"(.*)"$/, "$1").replace(/^'(.*)'$/, "$1"));
  }

  return value.replace(/^"(.*)"$/, "$1").replace(/^'(.*)'$/, "$1");
}

function markdownToHtml(markdown) {
  const lines = markdown.split("\n");
  const html = [];
  let paragraph = [];
  let listItems = [];

  const flushParagraph = () => {
    if (paragraph.length) {
      html.push(`<p>${inlineMarkdown(paragraph.join(" "))}</p>`);
      paragraph = [];
    }
  };

  const flushList = () => {
    if (listItems.length) {
      html.push(`<ul>${listItems.map((item) => `<li>${inlineMarkdown(item)}</li>`).join("")}</ul>`);
      listItems = [];
    }
  };

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed) {
      flushParagraph();
      flushList();
      continue;
    }

    if (trimmed.startsWith("- ")) {
      flushParagraph();
      listItems.push(trimmed.slice(2));
      continue;
    }

    if (trimmed.startsWith("## ")) {
      flushParagraph();
      flushList();
      html.push(`<h2>${inlineMarkdown(trimmed.slice(3))}</h2>`);
      continue;
    }

    if (trimmed.startsWith("### ")) {
      flushParagraph();
      flushList();
      html.push(`<h3>${inlineMarkdown(trimmed.slice(4))}</h3>`);
      continue;
    }

    paragraph.push(trimmed);
  }

  flushParagraph();
  flushList();
  return html.join("");
}

function getFirstTwoParagraphsHtml(html) {
  const matches = String(html || "").match(/<p>[\s\S]*?<\/p>/gi) || [];
  return matches.slice(0, 2).join("") || html || "";
}

function inlineMarkdown(text) {
  return text
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function formatDate(value) {
  return value ? DATE_FORMATTER.format(new Date(value)) : "";
}

function parsePairs(items) {
  return (Array.isArray(items) ? items : []).map((item) => {
    const [key, url, label] = item.split("|");
    return { key: (key || "").trim(), value: (url || "").trim(), label: (label || "").trim() || null };
  });
}

function toLabelMap(items) {
  return Object.fromEntries(parsePairs(items).map((item) => [item.key, item.value]));
}

function createSectionTitle(title) {
  return `<div class="section-header"><h2 class="panel-title">${title}</h2></div>`;
}

function renderProfileMedia(profile, className = "") {
  const placeholder = profile.image || "";
  const photo = profile.photo || profile.image_lazy || "";
  if (!placeholder && !photo) return "";

  const classes = ["profile-media", className].filter(Boolean).join(" ");
  const alt = profile.name || "";
  const placeholderAlt = photo ? "" : alt;

  return `
    <div class="${classes}" data-profile-media ${photo ? `data-profile-photo="${photo}"` : ""}>
      ${placeholder
      ? `<img class="profile-media-image profile-media-placeholder" src="${placeholder}" alt="${placeholderAlt}" ${photo ? 'aria-hidden="true"' : ""} />`
      : ""
    }
      ${photo
      ? `<img class="profile-media-image profile-media-photo" src="${photo}" alt="${alt}" loading="lazy" decoding="async" />`
      : ""
    }
    </div>
  `;
}

function getPostPath(post) {
  return `#/posts/${post.slug}`;
}

function getProjectPath(project) {
  return `#/projects/${project.slug}`;
}

function getTagPath(tag) {
  return `#/posts?tag=${encodeURIComponent(tag)}`;
}

function getRouteFromHash() {
  const hash = window.location.hash || "#/";
  const normalized = hash.startsWith("#") ? hash.slice(1) : hash;
  const url = new URL(normalized || "/", "https://local.app");
  const parts = url.pathname.replace(/^\/+|\/+$/g, "").split("/").filter(Boolean);

  if (!parts.length) return { name: "home", params: {}, search: url.searchParams };
  if (parts[0] === "about") return { name: "about", params: {}, search: url.searchParams };
  if (parts[0] === "posts" && parts[1]) return { name: "post-detail", params: { slug: parts[1] }, search: url.searchParams };
  if (parts[0] === "posts") return { name: "posts", params: {}, search: url.searchParams };
  if (parts[0] === "projects" && parts[1]) return { name: "project-detail", params: { slug: parts[1] }, search: url.searchParams };
  if (parts[0] === "projects") return { name: "projects", params: {}, search: url.searchParams };
  return { name: "home", params: {}, search: url.searchParams };
}

function getSearchRoute(query) {
  const trimmed = query.trim();
  return trimmed ? `#/posts?q=${encodeURIComponent(trimmed)}` : "#/posts";
}

async function loadEntries() {
  const indexRaw = await loadText(`${CONTENT_ROOT}${CONTENT_INDEX_FILE}`);
  const fileNames = indexRaw
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("- "))
    .map((line) => line.slice(2).trim());

  const files = await Promise.all(
    fileNames.map(async (file) => {
      const raw = await loadText(`${CONTENT_ROOT}${file}`);
      const { attributes, body } = parseFrontmatter(raw);
      return {
        ...attributes,
        body,
        html: markdownToHtml(body),
        file,
      };
    })
  );

  return files;
}

function renderUi(site, ui) {
  document.title = site.title || "Loading...";
  const siteTitle = document.querySelector("#site-title");
  siteTitle.textContent = site.title || "";
  siteTitle.href = "#/";

  const search = document.querySelector("#post-search");
  search.placeholder = ui.search_placeholder || "";
  search.value = state.searchQuery;

  const toggle = document.querySelector("#theme-toggle");
  toggle.setAttribute("aria-label", ui.theme_toggle_aria_label || "");
  toggle.title = ui.theme_toggle_aria_label || "";
  document.querySelector(".theme-toggle-light").textContent = ui.theme_light_label || "";
  document.querySelector(".theme-toggle-dark").textContent = ui.theme_dark_label || "";

  const searchSubmit = document.querySelector("#search-submit");
  if (searchSubmit) {
    searchSubmit.textContent = ui.search_button_label || "Search";
  }
}

function resolveNavHref(label, fallbackHref) {
  const normalized = label.trim().toLowerCase();
  if (normalized === "about") return "#/about";
  if (normalized === "posts") return "#/posts";
  if (normalized === "projects") return "#/projects";
  return fallbackHref || "#/";
}

function renderNav(site, routeName) {
  const nav = document.querySelector("#site-nav");
  const items = Array.isArray(site.nav) ? site.nav : [];
  nav.innerHTML = items
    .map((item) => {
      const [label, href = "#"] = item.split("|");
      const resolvedHref = resolveNavHref(label, href.trim());
      const normalized = label.trim().toLowerCase();
      const active =
        (routeName === "about" && normalized === "about") ||
        ((routeName === "posts" || routeName === "post-detail") && normalized === "posts") ||
        ((routeName === "projects" || routeName === "project-detail") && normalized === "projects");
      return `<a href="${resolvedHref}"${active ? ' class="is-active"' : ""}>${label.trim()}</a>`;
    })
    .join("");
}

function renderTagList(tags) {
  return (Array.isArray(tags) ? tags : [])
    .map((tag) => `<a class="topic-chip" href="${getTagPath(tag)}">#${tag}</a>`)
    .join("");
}

function escapeAttribute(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function renderPostCard(post) {
  const backgroundStyle = post.image
    ? ` style="${escapeAttribute(`--card-background-image: url('${post.image.replace(/'/g, "\\'")}');`)}"`
    : "";

  return `
    <article class="post-card" data-motion="rise">
      <a class="card-link card-link-main motion-tilt${post.image ? " has-card-image" : ""}" href="${getPostPath(post)}"${backgroundStyle}>
        <div class="post-card-content">
          <h3>${post.title || ""}</h3>
          <div class="meta-row">
            <span>${formatDate(post.date)}</span>
            <span>${post.reading_time || state.uiLabels.post_reading_time_fallback || ""}</span>
          </div>
          <p class="summary">${post.summary || ""}</p>
        </div>
      </a>
      ${post.tags?.length ? `<div class="topic-list compact">${renderTagList(post.tags)}</div>` : ""}
    </article>
  `;
}

function renderProjectCard(project) {
  const backgroundStyle = project.image
    ? ` style="${escapeAttribute(`--card-background-image: url('${project.image.replace(/'/g, "\\'")}');`)}"`
    : "";

  return `
    <article class="project-card" data-motion="rise">
      <a class="card-link card-link-main project-card-link motion-tilt${project.image ? " has-card-image" : ""}" href="${getProjectPath(project)}"${backgroundStyle}>
        <div class="post-card-content">
          <h3>${project.title || ""}</h3>
          <p class="summary">${project.summary || ""}</p>
        </div>
      </a>
    </article>
  `;
}

function renderHomeView() {
  const profile = state.profile;
  const featuredPost = state.posts[0];
  const remainingPosts = state.posts.slice(1);
  const lowered = state.searchQuery.trim().toLowerCase();
  const filteredPosts = remainingPosts.filter((post) => {
    if (!lowered) return true;
    return [post.title, post.summary, ...(post.tags || [])].join(" ").toLowerCase().includes(lowered);
  });
  const contactLinks = parsePairs(profile.links);
  const aiLinks = parsePairs(state.ai.panel_links);
  const completedRaces = state.races.filter((race) => race.bucket !== "upcoming");
  const upcomingRaces = state.races.filter((race) => race.bucket === "upcoming");

  return `
    <aside class="sidebar left-rail">
      <section class="panel" data-motion="rise">
        ${createSectionTitle(state.uiLabels.about || "")}
        <article class="about-card">
          ${renderProfileMedia(profile, "profile-media--about")}
          <div class="rich-text">${profile.previewHtml || profile.html || ""}</div>
          <a class="inline-link" href="#/about">${state.uiLabels.read_more || "Read more"} <span>${state.uiLabels.read_more_arrow || ""}</span></a>
        </article>
      </section>
      ${profile.topics?.length
      ? `
            <section class="panel" data-motion="rise">
              ${createSectionTitle(state.uiLabels.topics || "")}
              <div class="topic-list">
                ${renderTagList(profile.topics)}
              </div>
            </section>
          `
      : ""
    }
    </aside>

    <section class="content-rail">
      ${featuredPost
      ? `
            <article class="hero panel" data-motion="hero">
              ${createSectionTitle(state.uiLabels.featured || "")}
              <div class="hero-shell motion-tilt${featuredPost.image ? " has-feature-image" : ""}" data-href="${getPostPath(featuredPost)}">
                ${featuredPost.image
        ? `
                      <a class="hero-media-link" href="${getPostPath(featuredPost)}" aria-label="${featuredPost.title || ""}">
                        <div class="hero-media">
                          <img class="feature-image" src="${featuredPost.image}" alt="${featuredPost.image_alt || featuredPost.title || ""}" />
                        </div>
                      </a>
                    `
        : ""
      }
                <div class="hero-content">
                  <a class="hero-title-link" href="${getPostPath(featuredPost)}">
                    <h1 class="hero-title">${featuredPost.title || ""}</h1>
                  </a>
                  <div class="meta-row">
                    <span>${formatDate(featuredPost.date)}</span>
                    ${(Array.isArray(featuredPost.tags) ? featuredPost.tags : [])
        .map((tag) => `<a href="${getTagPath(tag)}">${tag}</a>`)
        .join("")}
                  </div>
                  <p class="hero-summary">${featuredPost.summary || ""}</p>
                </div>
              </div>
            </article>
          `
      : ""
    }

      <section class="posts-grid panel" data-motion="rise">
        ${createSectionTitle(state.uiLabels.posts || "")}
        <div class="post-list">
          ${filteredPosts.length
      ? filteredPosts.map(renderPostCard).join("")
      : `<p class="empty-state">${state.uiLabels.empty_post_search || ""}</p>`
    }
        </div>
      </section>

      ${state.projects.length
      ? `
            <section class="projects panel" data-motion="rise">
              ${createSectionTitle(state.uiLabels.projects || "")}
              <div class="project-list">
                ${state.projects.map(renderProjectCard).join("")}
              </div>
            </section>
          `
      : ""
    }

      ${state.skills.length
      ? `
            <section class="skills panel" data-motion="rise">
              ${createSectionTitle(state.uiLabels.skills || "")}
              <div class="skill-list">
                ${state.skills
        .map(
          (skill) => `
                      <article class="skill-card">
                        <h3>${skill.title || ""}</h3>
                        <div class="meta-row">
                          <span>${skill.category || state.uiLabels.default_skill_category || ""}</span>
                          <span>${skill.updated ? formatDate(skill.updated) : ""}</span>
                        </div>
                        <p class="summary">${skill.summary || ""}</p>
                        ${skill.repo || skill.docs
              ? `<div class="skill-links">
                                ${skill.repo ? `<a class="pill-link" href="${skill.repo}">${state.uiLabels.skill_repo_label || ""}</a>` : ""}
                                ${skill.docs ? `<a class="pill-link" href="${skill.docs}">${state.uiLabels.skill_docs_label || ""}</a>` : ""}
                              </div>`
              : ""
            }
                      </article>
                    `
        )
        .join("")}
              </div>
            </section>
          `
      : ""
    }
    </section>

    <aside class="sidebar right-rail">
      ${state.races.length
      ? `
            <section class="panel" data-motion="rise">
              ${createSectionTitle(state.uiLabels.races || "")}
              <div class="race-stack">
                ${completedRaces.length
        ? completedRaces
          .map(
            (race) => `
                            <article class="race-card">
                              <h3>${race.title || ""}</h3>
                              <div class="race-meta">
                                <span>${race.location || ""}</span>
                                <span>${formatDate(race.date)}</span>
                              </div>
                              <p class="summary">${race.summary || ""}</p>
                              ${race.status ? `<div class="race-status">${race.status}</div>` : ""}
                            </article>
                          `
          )
          .join("")
        : `<p class="empty-state">${state.uiLabels.empty_races || ""}</p>`
      }
              </div>
              ${upcomingRaces.length || state.uiLabels.upcoming_races
        ? `
                    <div class="section-header"><h2 class="panel-title">${state.uiLabels.upcoming_races || ""}</h2></div>
                    <div class="race-stack">
                      ${upcomingRaces.length
          ? upcomingRaces
            .map(
              (race) => `
                                  <article class="race-card">
                                    <h3>${race.title || ""}</h3>
                                    <div class="race-meta">
                                      <span>${race.location || ""}</span>
                                      <span>${formatDate(race.date)}</span>
                                    </div>
                                    <p class="summary">${race.summary || ""}</p>
                                    ${race.status ? `<div class="race-status">${race.status}</div>` : ""}
                                  </article>
                                `
            )
            .join("")
          : `<p class="empty-state">${state.uiLabels.empty_upcoming_races || ""}</p>`
        }
                    </div>
                  `
        : ""
      }
            </section>
          `
      : ""
    }

      ${aiLinks.length || state.ai.panel_intro
      ? `
            <section class="panel" data-motion="rise">
        ${createSectionTitle(state.ai.panel_title || "")}
        ${state.ai.panel_intro ? `<p class="panel-copy">${state.ai.panel_intro}</p>` : ""}
        ${aiLinks.length ? `<div class="ai-links">${aiLinks.map((entry) => `<a class="pill-link" href="${entry.value}">${entry.key}</a>`).join("")}</div>` : ""}
      </section>
    `
      : ""
    }

      ${contactLinks.length
      ? `
            <section class="panel" data-motion="rise">
              ${createSectionTitle(state.uiLabels.connect || "")}
              <div class="contact-list">
                ${contactLinks
        .map(
          (entry) => `
                      <a class="contact-item" href="${entry.value}">
                        <span class="contact-label">${entry.key}</span>
                        <span>${entry.value.replace(/^https?:\/\//, "")}</span>
                      </a>
                    `
        )
        .join("")}
              </div>
            </section>
          `
      : ""
    }
    </aside>
  `;
}

function renderPageIntro(eyebrow, title, copy) {
  return `
    <header class="page-header panel" data-motion="rise">
      ${eyebrow ? `<div class="feature-label">${eyebrow}</div>` : ""}
      <h1 class="page-title">${title}</h1>
      ${copy ? `<p class="page-summary">${copy}</p>` : ""}
    </header>
  `;
}

function renderAboutView() {
  const links = parsePairs(state.profile.links);
  console.log("Parsed profile links:", links);
  return `
    <section class="page-view">
      ${renderPageIntro("Profile", state.profile.name || "About", state.profile.tagline || "")}
      <section class="panel detail-grid">
        <article class="detail-card" data-motion="rise">
          ${renderProfileMedia(state.profile, "detail-image portrait")}
          <div class="rich-text">${state.profile.html || ""}</div>
        </article>
        <aside class="detail-sidebar">
          ${links.length
      ? `
                <section class="panel inset-panel" data-motion="rise">
                  ${createSectionTitle(state.uiLabels.connect || "Contact")}
                  <div class="contact-list">
                    ${links
        .map(
          (entry) => `
                          <a class="contact-item" href="${entry.value}">
                            <span class="contact-label">${entry.key}</span>
                            <span>${entry.label || entry.value.replace(/^https?:\/\//, "").replace(/^mailto:/, "").replace(/^tel:/, "")}</span>
                          </a>
                        `
        )
        .join("")}
                  </div>
                </section>
              `
      : ""
    }
          ${state.profile.topics?.length
      ? `
                <section class="panel inset-panel" data-motion="rise">
                  ${createSectionTitle("Topics")}
                  <div class="topic-list">
                    ${renderTagList(state.profile.topics)}
                  </div>
                </section>
              `
      : ""
    }
        </aside>
      </section>
      <section class="panel" data-motion="rise">
        ${createSectionTitle("Work Experience")}
        <div class="project-list">
          ${state.projects.map(renderProjectCard).join("")}
        </div>
      </section>
    </section>
  `;
}

function filterPostsByRoute(route) {
  const tag = route.search.get("tag") || "";
  const loweredTag = tag.toLowerCase();
  const loweredQuery = state.searchQuery.trim().toLowerCase();

  return state.posts.filter((post) => {
    const matchesTag = !loweredTag || (post.tags || []).some((item) => item.toLowerCase() === loweredTag);
    const matchesQuery =
      !loweredQuery || [post.title, post.summary, ...(post.tags || [])].join(" ").toLowerCase().includes(loweredQuery);
    return matchesTag && matchesQuery;
  });
}

function renderPostsView(route) {
  const tag = route.search.get("tag");
  const posts = filterPostsByRoute(route);
  const title = tag ? `Posts tagged #${tag}` : state.uiLabels.posts || "Posts";
  const summary = tag
    ? "Related writing filtered by the selected topic."
    : "Browse the blog posts and open any entry for the full write-up.";

  return `
    <section class="page-view">
      ${renderPageIntro("Writing", title, summary)}
      <section class="panel" data-motion="rise">
        <div class="post-list listing">
          ${posts.length
      ? posts.map(renderPostCard).join("")
      : `<p class="empty-state">${state.uiLabels.empty_post_search || "No matching posts found."}</p>`
    }
        </div>
      </section>
    </section>
  `;
}

function renderPostDetailView(post) {
  if (!post) {
    return `
      <section class="page-view">
        ${renderPageIntro("Writing", "Post not found", "The selected post could not be loaded.")}
      </section>
    `;
  }

  return `
    <article class="page-view article-view">
      <a class="back-link" href="#/posts" data-motion="rise">← Back to posts</a>
      ${renderPageIntro("Writing", post.title || "", post.summary || "")}
      ${post.image ? `<img class="detail-image" data-motion="rise" src="${post.image}" alt="${post.image_alt || post.title || ""}" />` : ""}
      <div class="meta-row article-meta" data-motion="rise">
        <span>${formatDate(post.date)}</span>
        <span>${post.reading_time || state.uiLabels.post_reading_time_fallback || ""}</span>
      </div>
      ${post.tags?.length ? `<div class="topic-list" data-motion="rise">${renderTagList(post.tags)}</div>` : ""}
      <section data-motion="rise">
        <div class="rich-text article-body">${post.html || ""}</div>
      </section>
    </article>
  `;
}

function renderProjectsView() {
  return `
    <section class="page-view">
      ${renderPageIntro("Projects", state.uiLabels.projects || "Projects", "Open a project to read more context and outcomes.")}
      <section class="panel" data-motion="rise">
        <div class="project-list listing">
          ${state.projects.map(renderProjectCard).join("")}
        </div>
      </section>
    </section>
  `;
}

function renderProjectDetailView(project) {
  if (!project) {
    return `
      <section class="page-view">
        ${renderPageIntro("Projects", "Project not found", "The selected project could not be loaded.")}
      </section>
    `;
  }

  return `
    <article class="page-view article-view">
      <a class="back-link" href="#/projects" data-motion="rise">← Back to projects</a>
      ${renderPageIntro("Projects", project.title || "", project.summary || "")}
      ${project.image ? `<img class="detail-image" data-motion="rise" src="${project.image}" alt="${project.image_alt || project.title || ""}" />` : ""}
      <section data-motion="rise">
        <div class="rich-text article-body">${project.html || ""}</div>
      </section>
    </article>
  `;
}

function applyMotionDelays(root) {
  const groups = [
    ".page-header",
    ".hero",
    ".left-rail .panel",
    ".posts-grid .post-card",
    ".projects .project-card",
    ".skill-list > *",
    ".right-rail .panel",
    ".detail-grid > *",
    ".listing > *",
    ".article-view > *",
  ];

  groups.forEach((selector) => {
    root.querySelectorAll(selector).forEach((element, index) => {
      if (!element.hasAttribute("data-motion")) {
        element.setAttribute("data-motion", "rise");
      }
      element.style.setProperty("--motion-delay", `${Math.min(index * 70, 420)}ms`);
    });
  });
}

function initializeRevealObserver() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  revealObserver?.disconnect();
  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.16,
      rootMargin: "0px 0px -10% 0px",
    }
  );
}

function initializePageMotion() {
  const app = document.querySelector("#app");
  if (!app) return;

  applyMotionDelays(app);
  initializeRevealObserver();

  const motionNodes = app.querySelectorAll("[data-motion]");
  motionNodes.forEach((element) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      element.classList.add("is-visible");
      return;
    }
    revealObserver?.observe(element);
  });

  requestAnimationFrame(() => {
    motionNodes.forEach((element) => {
      const rect = element.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.92) {
        element.classList.add("is-visible");
        revealObserver?.unobserve(element);
      }
    });
  });
}

function updateTilt(element, clientX, clientY) {
  const rect = element.getBoundingClientRect();
  const offsetX = (clientX - rect.left) / rect.width - 0.5;
  const offsetY = (clientY - rect.top) / rect.height - 0.5;
  element.style.setProperty("--pointer-rotate-x", `${offsetY * -6}deg`);
  element.style.setProperty("--pointer-rotate-y", `${offsetX * 8}deg`);
  element.style.setProperty("--pointer-shift-x", `${offsetX * 6}px`);
  element.style.setProperty("--pointer-shift-y", `${offsetY * 6}px`);
}

function resetTilt(element) {
  element.style.setProperty("--pointer-rotate-x", "0deg");
  element.style.setProperty("--pointer-rotate-y", "0deg");
  element.style.setProperty("--pointer-shift-x", "0px");
  element.style.setProperty("--pointer-shift-y", "0px");
}

function initializeInteractiveMotion() {
  const interactiveSelector = ".hero-shell, .card-link, .pill-link, .topic-chip, .contact-item, .search-submit, .theme-toggle";

  document.addEventListener(
    "pointermove",
    (event) => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const target = event.target.closest(".motion-tilt");
      if (!target) return;

      if (motionFrame) cancelAnimationFrame(motionFrame);
      motionFrame = requestAnimationFrame(() => updateTilt(target, event.clientX, event.clientY));
    },
    { passive: true }
  );

  document.addEventListener(
    "pointerout",
    (event) => {
      const target = event.target.closest(".motion-tilt");
      if (target && !target.contains(event.relatedTarget)) {
        resetTilt(target);
      }
    },
    true
  );

  document.addEventListener("click", (event) => {
    const target = event.target.closest(interactiveSelector);
    if (!target) return;

    const rect = target.getBoundingClientRect();
    target.style.setProperty("--ripple-x", `${event.clientX - rect.left}px`);
    target.style.setProperty("--ripple-y", `${event.clientY - rect.top}px`);
    target.classList.remove("is-pressed");
    void target.offsetWidth;
    target.classList.add("is-pressed");
    window.setTimeout(() => target.classList.remove("is-pressed"), 650);
  });
}

function initializeTopbarMotion() {
  const topbar = document.querySelector(".topbar");
  if (!topbar) return;

  const syncTopbar = () => {
    topbar.classList.toggle("is-scrolled", window.scrollY > 12);
  };

  syncTopbar();
  window.addEventListener("scroll", syncTopbar, { passive: true });
}

function initializeProfileMedia() {
  document.querySelectorAll("[data-profile-media]").forEach((container) => {
    const photo = container.querySelector(".profile-media-photo");
    if (!photo) {
      container.classList.add("is-loaded");
      return;
    }

    const markLoaded = () => {
      container.classList.remove("has-error");
      container.classList.add("is-loaded");
    };
    const markError = () => {
      container.classList.remove("is-loaded");
      container.classList.add("has-error");
    };

    if (photo.complete) {
      if (photo.naturalWidth > 0) {
        markLoaded();
      } else {
        markError();
      }
      return;
    }

    if (photo.dataset.profileMediaBound === "true") return;
    photo.dataset.profileMediaBound = "true";

    photo.addEventListener("load", markLoaded, { once: true });
    photo.addEventListener("error", markError, { once: true });
  });
}

function renderRoute() {
  const route = getRouteFromHash();
  state.searchQuery = route.search.get("q") || "";
  renderUi(state.site, state.ui);
  renderNav(state.site, route.name);

  const app = document.querySelector("#app");
  app.classList.toggle("single-column", route.name !== "home");

  if (route.name === "about") {
    app.innerHTML = renderAboutView();
    initializePageMotion();
    initializeProfileMedia();
    return;
  }

  if (route.name === "posts") {
    app.innerHTML = renderPostsView(route);
    initializePageMotion();
    initializeProfileMedia();
    return;
  }

  if (route.name === "post-detail") {
    const post = state.posts.find((entry) => entry.slug === route.params.slug);
    app.innerHTML = renderPostDetailView(post);
    initializePageMotion();
    initializeProfileMedia();
    return;
  }

  if (route.name === "projects") {
    app.innerHTML = renderProjectsView();
    initializePageMotion();
    initializeProfileMedia();
    return;
  }

  if (route.name === "project-detail") {
    const project = state.projects.find((entry) => entry.slug === route.params.slug);
    app.innerHTML = renderProjectDetailView(project);
    initializePageMotion();
    initializeProfileMedia();
    return;
  }

  app.innerHTML = renderHomeView();
  initializePageMotion();
  initializeProfileMedia();
}

function initializeThemeToggle() {
  const toggle = document.querySelector("#theme-toggle");
  const root = document.documentElement;
  const getTheme = () => root.dataset.theme || "light";

  toggle.addEventListener("click", () => {
    const nextTheme = getTheme() === "dark" ? "light" : "dark";
    root.dataset.theme = nextTheme;
    localStorage.setItem("theme", nextTheme);
  });
}

function initializeSearch() {
  const search = document.querySelector("#post-search");
  const form = document.querySelector("#search-form");
  if (!search || !form) return;

  search.addEventListener("input", (event) => {
    state.searchQuery = event.target.value;
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const nextQuery = search.value || "";
    state.searchQuery = nextQuery;
    window.location.hash = getSearchRoute(nextQuery).replace(/^#/, "");
  });
}

function initializeHeroCardNavigation() {
  const app = document.querySelector("#app");
  app.addEventListener("click", (event) => {
    const shell = event.target.closest(".hero-shell[data-href]");
    if (!shell) return;
    if (event.target.closest("a")) return;
    window.location.hash = shell.dataset.href.replace(/^#/, "");
  });
}

function initializeAnalytics(measurementId) {
  if (!measurementId || !/^G-[A-Z0-9]+$/i.test(measurementId) || window.gtag) return;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", measurementId);
}

async function init() {
  try {
    const entries = await loadEntries();
    await loadJson(`${GENERATED_ROOT}ai-context.json`).catch(() => ({}));

    state.entries = entries;
    state.site = entries.find((entry) => entry.type === "site") || {};
    {
      const profile = entries.find((entry) => entry.type === "profile") || {};
      state.profile = {
        ...profile,
        previewHtml: getFirstTwoParagraphsHtml(profile.html),
      };
    }
    state.ui = entries.find((entry) => entry.type === "ui") || {};
    state.ai = entries.find((entry) => entry.type === "ai") || {};
    state.uiLabels = {
      ...toLabelMap(state.ui.sections),
      read_more: state.ui.read_more_label,
      read_more_arrow: state.ui.read_more_arrow,
      default_skill_category: state.ui.default_skill_category,
      empty_post_search: state.ui.empty_post_search,
      empty_races: state.ui.empty_races,
      empty_upcoming_races: state.ui.empty_upcoming_races,
      post_reading_time_fallback: state.ui.post_reading_time_fallback,
      project_status_fallback: state.ui.project_status_fallback,
      skill_repo_label: state.ui.skill_repo_label,
      skill_docs_label: state.ui.skill_docs_label,
    };
    state.posts = entries
      .filter((entry) => entry.type === "post")
      .map((entry) => ({ ...entry, slug: slugify(entry.title || entry.file) }))
      .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
    state.projects = entries
      .filter((entry) => entry.type === "project")
      .map((entry) => ({ ...entry, slug: slugify(entry.title || entry.file) }));
    state.skills = entries
      .filter((entry) => entry.type === "skill")
      .sort((a, b) => new Date(b.updated || 0) - new Date(a.updated || 0));
    state.races = entries
      .filter((entry) => entry.type === "race")
      .sort((a, b) => new Date(a.date || 0) - new Date(b.date || 0));

    initializeThemeToggle();
    initializeSearch();
    initializeHeroCardNavigation();
    initializeInteractiveMotion();
    initializeTopbarMotion();
    initializeAnalytics(state.profile.ga_measurement_id);
    window.addEventListener("hashchange", renderRoute);
    renderRoute();
  } catch (error) {
    const app = document.querySelector("#app");
    app.classList.add("single-column");
    app.innerHTML = `<section class="page-view"><p class="empty-state">${error.message}</p></section>`;
    console.error(error);
  }
}

init();
