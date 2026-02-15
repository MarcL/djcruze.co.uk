# DJ Cruze Website — AI Assistant Guide

## AI Usage Policy

AI is **never** used to write articles, blog posts, podcast descriptions, or any site content. AI is only used to help maintain the site — code, templates, configuration, and build tooling.

## Project Overview

Static website for [djcruze.co.uk](https://www.djcruze.co.uk) built with **Eleventy v3** and **Tailwind CSS v3**, deployed on **Netlify**.

## Commands

- `npm run serve` — local dev server (port 8080) + Tailwind CSS watch
- `npm run build` — production build → `_site/`
- `npm run build:css` — rebuild Tailwind CSS only
- `npm run link-check` — check for broken links (requires local server running)
- Node 20 required (see `.nvmrc`)

## Project Structure

```
src/
├── _data/           # Global data (site.js, theme.js, podcast.js, menus)
├── _includes/       # Liquid layouts (default, audio, post, homepage) and partials
├── pages/
│   ├── podcasts/    # Podcast episodes (Markdown + frontmatter)
│   ├── mixes/       # DJ mixes
│   ├── productions/ # Original/remix productions
│   ├── posts/       # News articles
│   └── xmlFeeds/    # RSS feed template
├── images/          # Static images (optimized images output to images/generated/)
├── css/             # Compiled Tailwind CSS output
├── fonts/           # Custom fonts
└── favicons/        # Favicon assets
```

## Architecture

- **Content**: Markdown files with YAML frontmatter in `src/pages/`, organized by collection
- **Templates**: Liquid templates in `src/_includes/`
- **Global data**: `src/_data/` — site config, theme classes, navigation menus, podcast metadata
- **Theme**: Tailwind utility classes stored as data in `src/_data/theme.js`, referenced in templates as `{{theme.section.property}}`
- **Images**: Optimized via `@11ty/eleventy-img` — generates AVIF, WebP, JPEG at multiple widths (300, 600, 1024, 1280)
- **Audio hosting**: Media files served from Backblaze B2 (`site.mediaFilesUrl`)
- **Custom filters/shortcodes**: Defined in `.eleventy.js` — `image`, `pageDate`, `rfc822Date`, `tracklistToJson`, etc.

## Content Collections

Each collection has a `.11tydata.json` file setting default layout and tags:

| Collection   | Directory          | Layout  | Tag          |
|--------------|--------------------|---------|--------------|
| Podcasts     | `pages/podcasts/`  | `audio` | `podcast`    |
| Mixes        | `pages/mixes/`     | `audio` | `mix`        |
| Productions  | `pages/productions/`| `audio`| `production` |
| News         | `pages/posts/`     | `post`  | `news`       |

## Conventions

- Content filenames follow `YYYY-MM-DD-slug.md` format
- No test framework — use `npm run link-check` for validation
- Renovate Bot manages dependency updates (see `renovate.json`)
- Environment-aware URLs: `ELEVENTY_ENV=dev` for localhost, `CONTEXT=production` for Netlify production
