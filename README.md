# Personal Portfolio

A fast, static portfolio and services site with a developer-CLI look. Built with SvelteKit, pre-rendered to plain HTML, and hosted on GitHub Pages.

It is organized around two audiences: recruiters looking for quick signal on back-end and systems work, and small businesses looking for data pipelines, workflow automation, and practical AI integration.

## Stack

- **SvelteKit** (Svelte 5) with `@sveltejs/adapter-static`, fully pre-rendered
- **Tailwind CSS v4**, configured with design tokens in CSS (no `tailwind.config.js`)
- **Melt UI** (`melt` package) for accessible headless primitives: tooltip, dialog, tabs, and toggle
- **Fonts:** Inter and JetBrains Mono, self-hosted through Fontsource
- **Hosting:** GitHub Pages, deployed by GitHub Actions

Project conventions follow SvelteKit 3: configuration lives in `vite.config.ts` (there is no `svelte.config.js`), the `#lib` alias is defined in `package.json` `imports`, and global CSS is `src/routes/layout.css`. Imports through `#lib` need explicit file extensions, for example `#lib/data/site.ts`.

## Requirements

Node 22.17 or newer and npm.

## Getting started

```bash
npm install
npm run dev
```

Other scripts:

```bash
npm run build      # pre-render to ./build
npm run preview    # serve the production build locally
npm run check      # type-check and Svelte diagnostics
```

To test the site as it will appear on a GitHub Pages project site (served from a sub-path), set the base path:

```bash
BASE_PATH=/your-repo-name npm run build
BASE_PATH=/your-repo-name npm run preview
```

## Editing content

All content lives in typed data files in `src/lib/data/`. Components only render what is in these files, so you rarely need to touch a component to change text.

| File | Controls |
| --- | --- |
| `site.ts` | Name, title, tagline, links, email, deployed URL, resume file, nav |
| `status.ts` | The terminal status box in the hero |
| `projects.ts` | Project cards: summary, stack, architecture diagram nodes, decisions, links |
| `services.ts` | The three service offerings |
| `playground.ts` | The simulated playground scenarios and their steps |
| `about.ts` | Summary, education, timeline |
| `stack.ts` | Tech stack, the roles used for filtering, and each skill's role tags |

Static files live in `static/`: `resume.pdf`, `og.png` (1200x630 link preview image), `favicon.svg`, and `robots.txt`.

### Before you deploy: replace the placeholders

- [ ] `site.ts`: name, title, links, email, and `url`
- [ ] `static/resume.pdf`
- [ ] `static/og.png`, regenerated with your real name
- [ ] `projects.ts`: descriptions, repo links, demo links, and every metric
- [ ] `stack.ts`: skills and role tags that reflect what you actually use
- [ ] `about.ts`: education details and timeline
- [ ] `package.json`: set `version` (the footer shows `build: v<version>-<commit>`)

## Deploying to GitHub Pages

1. Push the repository to GitHub.
2. In the repository, go to **Settings > Pages** and set **Source** to **GitHub Actions**.
3. Push to `main`. The workflow in `.github/workflows/deploy.yml` builds and deploys the site.

The workflow sets `BASE_PATH` to `/<repository-name>`, which is correct for a project site at `https://<user>.github.io/<repository-name>/`.

Two cases need a one-line change in `deploy.yml`:

- **User site** (a repository named `<user>.github.io`): set `BASE_PATH` to an empty string.
- **Custom domain:** set `BASE_PATH` to an empty string and add a `CNAME` file to `static/`.

In every case, set `url` in `src/lib/data/site.ts` to the final public URL, including the trailing slash. The canonical link, Open Graph tags, and structured data are built from it.

## Project structure

```
src/
  app.html                 HTML shell (dark by default, no flash)
  app.d.ts                 Types for build-time constants
  routes/
    +layout.ts             Pre-render everything, trailing slashes
    +layout.svelte         Skip link, header, main, footer, font preloads
    +page.svelte           Page assembly and SEO tags
    layout.css             Design tokens, fonts, base styles, utilities
  lib/
    button.ts              Shared button classes
    data/                  Typed content (see above)
    components/
      Hero, Projects, Services, About       Page sections
      ProjectCard, TerminalFrame, Terminal-  Cards and terminal chrome
        Widget, FlowDiagram
      Modal, Hint, Playground, ScenarioRunner,
        StackMatrix, FilterChip             Interactive pieces (Melt UI)
      SiteHeader, SiteFooter, LinkButton    Shared UI
static/                    Files served as-is
```

## Design system

Colors, fonts, radius, and container width are defined once in `src/routes/layout.css`. The default Tailwind palette is removed, so only these colors exist:

| Token | Use |
| --- | --- |
| `bg`, `surface` | Page and card backgrounds |
| `line`, `line-strong` | 1px borders |
| `fg`, `muted` | Main and secondary text |
| `accent`, `accent-bright` | Prompts, focus, status, calls to action |
| `warn`, `danger` | Caveats and failures |

There is deliberately no green. Focus styling is a crisp cyan outline, with a soft glow through the `focus-glow` utility, and no heavy shadows.

## Interactive components

- **Tooltip** (`Hint.svelte`): explains the availability status in the hero.
- **Dialog** (`Modal.svelte`): shows each project's architecture diagram.
- **Tabs** (`Playground.svelte`): switches between playground scenarios.
- **Toggle** (`FilterChip.svelte`): role filters that highlight related skills in the tech stack.

The playground and the "Live demo" links are simulated or placeholders. Playground output is static sample data in `playground.ts`. To use real output later, serve results of the same shape from an endpoint and replace the data source.

## Performance and accessibility

- Fully pre-rendered, with the page CSS inlined into the HTML and only the Latin font subsets preloaded.
- Reserved space and fixed heights on dynamic regions to keep layout shift at zero.
- Semantic landmarks, a skip link, visible keyboard focus, `prefers-reduced-motion` support, and live-region announcements for interactive state.

`AUDIT.md` is a manual checklist covering keyboard, screen reader, viewport, and link-preview testing. Run it against a production build before major releases.

## License

Add a license of your choice before publishing, or keep the repository all rights reserved.