# pratyoshdesaraju.com

Personal site of Pratyosh Desaraju, Senior Software Engineer at Liberty Mutual Insurance.

React 18 + Vite, plain CSS with design tokens (light and dark themes), deployed to GitHub Pages from `main`.

## Structure

- `src/data/profile.js` holds all content (experience, contributions, publications, talks, honors, media). Edit facts here only.
- `src/featureFlags` toggles sections. `true` shows a section, `false` hides it.
- `src/pages/` holds Home, Work, Bio, Contact, and NotFound.
- `src/components/` holds the header, footer, and shared UI pieces.
- `src/index.css` holds the design system.

## Develop

```bash
npm ci --legacy-peer-deps
npm run dev
npm run build
```
