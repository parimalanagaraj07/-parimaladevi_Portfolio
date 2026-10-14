# Parimaladevi N — Portfolio

A responsive, cinematic single-page portfolio built with React, TypeScript, and Vite. The visual language follows the supplied Figma reference: an editorial forest composition, Cormorant Garamond display type, Manrope UI text, copper accents, glassmorphism, and a slideshow-style section model. Sections advance with the nav, arrow controls, mouse wheel, touch swipes, and keyboard shortcuts.

## Run locally

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

## Build for production

```bash
pnpm build
pnpm preview
```

The generated static site is in `dist/` and can be deployed to any static host (Netlify, Vercel, GitHub Pages, Cloudflare Pages, or an S3-compatible host). The build is configured for the Webdev runtime on port 3000.

## Content and integrations

All personal content is taken from `Parimaladevi_N_Resume.pdf`. Resume projects, education, skills, experience, certifications, and achievements are not supplemented with invented claims. GitHub repositories are fetched from the public GitHub API at runtime for `parimalanagaraj07`; if GitHub is rate-limited or unavailable, the page shows the two verified resume projects and an honest status message. LinkedIn and LeetCode are direct links to the supplied public profiles.

The hero uses a static CSS/SVG sculptural portrait treatment because no separate portrait photo was present in the supplied attachments. Replace it with an actual portrait-derived asset only when a portrait photo is provided; no video is used anywhere.

## Slideshow controls

Use the top navigation, the previous/next arrows, mouse-wheel or trackpad gestures, and horizontal touch swipes. Keyboard users can use `←` / `→`, `PageUp` / `PageDown`, `Home`, `End`, or `Space` to move between sections. The interaction respects `prefers-reduced-motion`.

## Deployment notes

For a static deployment, run `pnpm build` and publish `dist/`. For Webdev-managed preview, keep the primary listener at `0.0.0.0:3000`. The route manifest is available at `/manus-routes.json`.
