# arldka.cloud

My personal portfolio and blog, live at **[arldka.cloud](https://arldka.cloud)**. I'm a DevOps / Platform Engineer, and this is where I keep my projects, experience, certifications and writing.

It's a fully static, bilingual (English / 简体中文) site built with Astro and deployed on Cloudflare.

## Features

- **Static output**: `output: "static"`, no server runtime
- **Bilingual routing**: `/en/…` and `/zh-CN/…`, with UI strings in `src/i18n/ui.ts`
- **Blog**: MDX content collections, one folder per locale
- **Data-driven pages**: my projects, experience and certifications live in `src/data/`
- **Light / dark theme** toggle
- **Self-hosted fonts**: Inter and JetBrains Mono through Astro's Fonts API (Fontsource)
- **Sitemap** with i18n alternates

## Tech stack

| Area      | Choice                                    |
| --------- | ----------------------------------------- |
| Framework | [Astro](https://astro.build) 7            |
| Content   | MDX (`@astrojs/mdx`), content collections |
| SEO       | `@astrojs/sitemap`                        |
| Language  | TypeScript                                |
| Tooling   | [Bun](https://bun.sh)                     |
| Hosting   | Cloudflare (Wrangler, static assets)      |

## Project structure

```
src/
├── components/     Nav, Footer, ThemeToggle
├── content/blog/   en/ and zh-CN/ MDX posts
├── data/           projects.ts, experience.ts, certifications.ts
├── i18n/ui.ts      Locales and translation strings
├── layouts/        Layout.astro
├── lib/blog.ts     Blog helpers
├── pages/
│   ├── index.astro         Redirect to /en/
│   └── [lang]/             Home, about, projects, blog
└── styles/global.css
```

## Getting started

You need [Bun](https://bun.sh) installed.

```bash
bun install
bun run dev        # http://localhost:4321
```

## Scripts

| Command                | Description                             |
| ---------------------- | --------------------------------------- |
| `bun run dev`          | Start the dev server                    |
| `bun run check`        | Type-check with `astro check`           |
| `bun run build`        | Type-check, then build to `dist/`       |
| `bun run preview`      | Preview the built site with Astro       |
| `bun run preview:cf`   | Build and preview with Wrangler         |
| `bun run deploy`       | Build and deploy with `wrangler deploy` |

## Adding content

- **Blog post**: add `slug.mdx` under both `src/content/blog/en/` and `src/content/blog/zh-CN/` (schema in `src/content.config.ts`).
- **Project / experience / certification**: edit the matching file in `src/data/`. Descriptions are written per locale.
- **UI text**: add the key to both `en` and `zh-CN` in `src/i18n/ui.ts`.

## Deployment

`bun run deploy` builds the site and uploads `dist/` as Cloudflare static assets (see `wrangler.jsonc`; unknown routes serve the 404 page).

## License

All rights reserved.
