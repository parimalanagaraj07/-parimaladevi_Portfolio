# Parimala Devi Portfolio — Plan

## Product approach
A single-page React/Vite portfolio with a full-viewport cinematic section slider. The public-facing content is sourced only from the supplied resume and the provided public profile URLs. GitHub repositories are fetched client-side with a loading state and resume-backed project fallback when unavailable.

## Design direction
- **Design movement:** cinematic editorial portfolio with autumnal glassmorphism and quiet 3D depth.
- **Core principles:** high-contrast hierarchy, generous breathing room, tactile translucent surfaces, and motion that always preserves orientation.
- **Color philosophy:** forest green anchors trust and technical focus; copper supplies autumn warmth and emphasis; aqua adds a precise digital counterpoint; cream keeps long-form reading calm.
- **Layout paradigm:** asymmetric split-screen slides with content pinned to a readable rail and a floating visual stage; mobile collapses to a stacked story.
- **Signature elements:** copper progress rail, layered leaf/constellation particles, and a translucent “field note” card language.
- **Interaction philosophy:** every transition is deliberate and reversible; navigation is available through tabs, arrows, keyboard, and swipe.
- **Animation:** short ease-out slide/fade transitions, slow ambient drift on background shapes, hover lift on cards, and reduced-motion fallbacks.
- **Typography system:** Fraunces for expressive headings and Inter for UI/body; tight display tracking with relaxed body leading.
- **Brand essence:** an emerging Python and cybersecurity builder who turns careful systems thinking into useful tools. Curious, precise, resilient.
- **Brand voice:** direct, thoughtful, quietly ambitious. Example lines: “I build with care, then make it useful.” / “Let’s turn a hard problem into a clear next step.”
- **Wordmark & logo:** a compact “PN” monogram inside a copper orbit, paired with the name in a small-caps label.
- **Signature brand color:** oxidized copper `#C46E4B`.

## Implementation
- `src/App.tsx`: section state, navigation, data loading, and content.
- `src/styles.css`: responsive layout, theme, motion, glass surfaces, and accessible focus states.
- `src/main.tsx`: Vite entry.
- `public/avatar.svg`: deterministic static 3D-style avatar illustration based on the supplied resume identity; no video.
- `public/manus-routes.json`: route manifest for the single-page route.
- `README.md`: run/build/deploy instructions.

## Runtime
- Vite dev server on port 3000, bound to `0.0.0.0`.
- Static build output in `dist`.
- No server or database required; GitHub API uses the public endpoint with fallback.
