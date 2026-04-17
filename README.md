# meltiseugen.github.io

Personal site built with Jekyll and the Just the Docs theme, deployed to GitHub Pages with GitHub Actions.

## How this works

- Jekyll reads Markdown files that have front matter and turns them into HTML pages.
- Just the Docs provides the layout, navigation, search, and base styling.
- GitHub Actions runs `bundle exec jekyll build` and deploys the generated `_site/` output to GitHub Pages.

If you know almost nothing about Jekyll, the important part is simple: most content changes are just Markdown file edits.

## Site structure

```text
.
├── index.md
├── about/
│   └── index.md
├── projects/
│   └── index.md
├── hobbies/
│   ├── index.md
│   └── 3d-printing/
│       └── index.md
├── articles/
│   └── index.md
├── scaffolds/
│   ├── article.md
│   ├── hobby-category.md
│   ├── project.md
│   └── three-d-printing-article.md
└── .github/workflows/
    ├── ci.yml
    └── pages.yml
```

## Adding a new page

Add a new Markdown file in the section where it belongs. Nothing else is required unless you want custom ordering.

### General article

Create `articles/my-topic.md`:

```md
---
title: My Topic
parent: Articles
---

Write here.
```

### Project article

Create `projects/my-project.md`:

```md
---
title: My Project
parent: Projects
---

Write here.
```

### 3D printing article

Create `hobbies/3d-printing/my-print-log.md`:

```md
---
title: My Print Log
parent: 3D Printing
grand_parent: Hobbies
---

Write here.
```

Optional: add `nav_order: 10` if you want to control sidebar order instead of using alphabetical sorting.

## Local preview

1. Install the macOS build tools if needed: `xcode-select --install`
2. Install `rbenv` and `ruby-build`: `brew install rbenv ruby-build`
3. Install the pinned Ruby version from [`.ruby-version`](/Users/meltis/git/meltiseugen.github.io/.ruby-version): `rbenv install`
4. Install Bundler: `gem install bundler:2.3.26`
5. Start the site with `bin/dev`
6. Open `http://127.0.0.1:4000`

The first `bin/dev` run will install gems automatically if they are missing.

By default `bin/dev` runs Jekyll with `JEKYLL_ENV=production` so the local output is closer to GitHub Pages. If you want a different port, run `PORT=4001 bin/dev`.

### Fixing native gem install errors

If Bundler fails while installing `eventmachine`, first retry through the helper script:

```bash
rm -rf vendor/bundle
bin/dev
```

`bin/dev` automatically handles a common macOS/rbenv issue where Ruby reports `CXX=false` even though `clang++` is installed. If it still fails because C++ headers are missing, reinstall the Command Line Tools:

```bash
xcode-select --install
rm -rf vendor/bundle
bin/dev
```

## GitHub Pages

- Deployment is handled by `.github/workflows/pages.yml`.
- CI builds are handled by `.github/workflows/ci.yml`.
- In the repository settings on GitHub, the Pages source should be set to `GitHub Actions`.
