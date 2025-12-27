# Repository Guidelines

## Project Structure & Module Organization
- `html/` holds the static site (HTML, CSS, JS). Entry pages include `index.html` and `experience.html`.
- `html/components/` contains reusable HTML fragments loaded by `html/js/common.js`.
- `html/js/` includes client-side modules like `common.js`, `navigation.js`, and `translations.js`.
- `html/css/` stores global styles; Tailwind CSS is pulled via CDN.
- `html/zhouyi/` and `html/zhouyi-mine/` contain the I Ching content sections and tools.
- `server.js` and `proxy-server.py` provide local dev/proxy support; no production backend is required.

## Build, Test, and Development Commands
- `npm start` runs the local Express server defined in `server.js`.
- `npm run dev` runs the same server with `nodemon` for auto-reload.
- `./start-dev.sh` bootstraps Node, installs deps if needed, and starts the dev server.
- No build step is required; HTML/CSS/JS are served directly.

## Coding Style & Naming Conventions
- Use 4-space indentation; avoid tabs.
- Keep filenames lowercase with hyphens (e.g., `experience.html`).
- For bilingual content, add entries in `html/js/translations.js` and use `data-lang-key` attributes in HTML.
- Favor vanilla JS and Tailwind utility classes; avoid introducing heavy frameworks.

## Testing Guidelines
- No automated test framework is set up.
- Validate changes by opening pages in a browser and checking desktop/mobile layouts.
- For tool pages, verify key flows (e.g., `html/zhouyi/tools/divine/qimen/index.html`).

## Commit & Pull Request Guidelines
- Recent commits use short, imperative Chinese messages (e.g., “修改了…”, “增加了…”).
- Keep commits scoped to a single change and include a brief description of the user-visible impact.
- PRs should include: summary of changes, linked issues (if any), and screenshots for UI updates.

## Configuration & Deployment Notes
- Dependencies are only for the local dev server; the site is static for deployment.
- CDN assets (Tailwind, Font Awesome) are used; ensure links stay valid.
