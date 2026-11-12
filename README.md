# Frontend Developer Portfolio

A minimal, responsive portfolio built with React, TypeScript, Tailwind CSS v4, Motion (Framer Motion), and Lucide icons.

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build
npm run lint
```

## Make it yours

| What | Where |
| --- | --- |
| Name, email, availability, nav, social links | `src/data/site.ts` |
| Skills | `src/data/skills.ts` |
| Projects (add `liveUrl` / `githubUrl` when ready) | `src/data/projects.ts` |
| Project thumbnails | `src/assets/projects/` |
| Page title and meta description | `index.html` |
| Colors / design tokens (light + dark) | `src/index.css` |

Project buttons without a URL render as disabled "coming soon" links.

## Contact form

The form validates all fields client-side. No message is sent by the site itself unless you connect a service:

- **No endpoint (default):** on submit, the visitor's email app opens with the message prefilled.
- **With an endpoint:** copy `.env.example` to `.env` and set `VITE_CONTACT_ENDPOINT` to a service that accepts JSON POST requests (e.g. Formspree). Success or error feedback is shown based on the real response.

## Features

- Dark mode by default, light/dark toggle persisted in `localStorage` (applied before first paint, no flash)
- Sticky navbar with active-section highlight and an accessible mobile menu
- Viewport-triggered fade/slide animations with staggered lists; respects `prefers-reduced-motion`
- Semantic HTML, skip link, labelled controls, lazy-loaded images
