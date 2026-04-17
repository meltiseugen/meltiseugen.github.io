---
title: Home
layout: home
nav_order: 1
description: Personal dashboard with quick links to profile, projects, hobbies, and articles.
has_toc: false
---

<div class="hero-panel">
  <p class="hero-eyebrow">Personal Dashboard</p>
  <h1>Software work, personal projects, hobby notes, and useful articles in one place.</h1>
  <p class="hero-summary">This site is structured as a public notebook: a clean landing page for who I am, a place to document personal work, and a set of sections where I can keep writing as ideas turn into articles.</p>
  <div class="hero-actions">
    <a class="btn btn-primary" href="{{ '/about/' | relative_url }}">About Me</a>
    <a class="btn" href="{{ '/projects/' | relative_url }}">Projects</a>
    <a class="btn" href="{{ '/hobbies/' | relative_url }}">Hobbies</a>
    <a class="btn" href="{{ '/articles/' | relative_url }}">Articles</a>
  </div>
</div>

<div class="dashboard-grid">
  <a class="dashboard-card" href="{{ '/about/' | relative_url }}">
    <span class="dashboard-card__eyebrow">Profile</span>
    <strong>About</strong>
    <span>Professional summary, background, strengths, and the short version of who you are.</span>
  </a>
  <a class="dashboard-card" href="{{ '/projects/' | relative_url }}">
    <span class="dashboard-card__eyebrow">Builds</span>
    <strong>Projects</strong>
    <span>Personal projects, experiments, case studies, and postmortems for things you have built.</span>
  </a>
  <a class="dashboard-card" href="{{ '/hobbies/' | relative_url }}">
    <span class="dashboard-card__eyebrow">Interests</span>
    <strong>Hobbies</strong>
    <span>Topic-based sections for areas like 3D printing, with room for deeper subcategories later.</span>
  </a>
  <a class="dashboard-card" href="{{ '/articles/' | relative_url }}">
    <span class="dashboard-card__eyebrow">Writing</span>
    <strong>Articles</strong>
    <span>General notes, opinions, tutorials, and everything that does not belong in a narrower section.</span>
  </a>
</div>

## What belongs here

- A short introduction and professional snapshot on the main pages.
- Longer write-ups about personal projects and technical experiments.
- Hobby notes, especially category-based writing like 3D printing logs, lessons, and setups.
- General-purpose articles for anything else worth publishing.

## What to edit first

1. Replace the prompt-style text on [About]({{ '/about/' | relative_url }}) with your own summary.
2. Add your first page in [Projects]({{ '/projects/' | relative_url }}), [Hobbies]({{ '/hobbies/' | relative_url }}), or [Articles]({{ '/articles/' | relative_url }}).
3. Use the files in `scaffolds/` if you want a copy-and-edit starting point.

{: .note }
Jekyll turns Markdown files with front matter into pages. Just the Docs handles the theme, sidebar navigation, and search. In practice, adding content usually means adding one new `.md` file.
