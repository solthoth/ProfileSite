# Redesign direction: a live systems topology

**Status:** in progress. Phases 1, 3, and 4 are built, see `src/three/HeroField.tsx`, `src/three/ExperienceGraph.tsx`, `src/data/graph.ts`, `src/hooks/useWebGLCapable.ts`. Only Phase 5 (hardening) remains. This document is the reference for continuing the build in later iterations, not a progress log; update the phase list below as work lands rather than adding status checkboxes here.

## Design read

Reading this as: a developer's resume/portfolio for a technical hiring audience (recruiters, engineering managers, staff+ engineers evaluating a platform leader), with an Awwwards-experimental, cinematic-3D language, replacing the current flat "infrastructure console" page with a navigable 3D systems topology built on React Three Fiber and GSAP. The existing 2D design does not get thrown away. It becomes the fallback layer (see "Fallback strategy" below).

Dials (see `.claude/skills/design-taste-frontend/`): `DESIGN_VARIANCE: 9`, `MOTION_INTENSITY: 9`, `VISUAL_DENSITY: 3` for the 3D/hero layer. The real resume content underneath stays close to the existing density (around 4) because a recruiter still needs to scan achievements and dates quickly. The drama is concentrated in navigation and spectacle, not in how the words themselves are laid out.

Redesign mode: **overhaul** for the visual/interaction layer, **preserve** for content and information architecture. Every fact on the page still traces back to `carlos-barajas-resume.md` through `src/data/resume.ts`, unchanged. Nothing here changes what the site says, only how moving through it feels.

## Why this concept, not a generic WebGL portfolio

The libraries named for this (Babylon.js, Three.js, React Three Fiber, GSAP, D3) show up on a lot of portfolio sites as decoration: a floating glTF astronaut, a purposeless particle vortex, a hero that looks impressive and means nothing. That's the failure mode to avoid here specifically, because the existing design already earned something better: the current site's signature idea (`docs/architecture.md`) is that Carlos's career is presented in the vocabulary of his actual job, a CI/CD pipeline rail with status badges, a CLI-styled status panel. That idea is correct. It's just flat.

The redesign escalates the same idea into three dimensions instead of replacing it with something disconnected:

**The career becomes a live systems topology you fly through.** Each role is a node in a 3D graph. Edges connect them chronologically, with a slow particle flow along each edge suggesting live traffic, the way a service mesh or deployment pipeline actually looks when you're watching it run. Skills become satellite nodes orbiting the roles that used them, so "Terraform" is not a chip in a list, it's a node with real edges into every role where Carlos actually used Terraform. Scrolling drives a scripted camera flythrough (GSAP ScrollTrigger) starting at the current role and traveling backward through the topology, the same reverse-chronological order the resume already uses. Achievement bullets appear in a real HTML panel as each node comes into focus, like a service detail drawer opening in an observability tool.

This is not spectacle for its own sake. It's the pipeline rail and the status panel, made spatial, because that is genuinely what Carlos's day-to-day looks like: topology maps, service graphs, deployment flows.

## Library choices

| Library | Role | Why |
|---|---|---|
| React Three Fiber (`@react-three/fiber`) + `@react-three/drei` + `@react-three/postprocessing` | 3D scene, rendering, bloom | Declarative, fits the existing component tree (`Hero.tsx`, `Experience.tsx` already compose this way). A `<CareerGraph />` becomes just another component, not a second application bolted onto the first. |
| GSAP + ScrollTrigger | Camera choreography | Industry standard for scroll-scrubbed animation, isolated to dedicated client components per the sticky-stack/horizontal-pan patterns in `.claude/skills/design-taste-frontend/`. |
| d3-force (not all of D3) | Graph layout physics only | Computes node positions (chronological clustering, skill-to-role attraction) as plain data. React Three Fiber renders the result. D3 never touches the DOM directly, which avoids the classic D3-vs-React ownership fight. |
| Three.js | Underneath R3F | Not used directly; R3F is the API surface. |

**Babylon.js is deliberately not used.** Babylon is a full engine that wants to own the canvas and the render loop imperatively, the right tool when 3D *is* the app (games, immersive configurators, WebXR). Here, 3D is one layer coexisting with real HTML content across several page sections. React Three Fiber's declarative model keeps the whole codebase in one paradigm (React) instead of bridging two. Revisit this decision only if a future iteration needs something Babylon does better, a physics engine, a complex asset pipeline, WebXR.

No new global animation library is introduced (no Motion/Framer Motion). The design-taste-frontend skill is explicit that GSAP and Three.js should never share a component tree with Motion, they fight over the same frames. This project doesn't use Motion today, so there's nothing to conflict with, and it should stay that way. `useInView` (`src/hooks/useInView.ts`) already covers the simple reveal-on-scroll case without pulling in a second animation runtime.

## Content mapping

| Section | Today | Redesign |
|---|---|---|
| Hero | Static CLI status panel | Same status panel, real HTML, unchanged. Behind it, a sparse ambient field of small glowing nodes drifts into position on load (a few seconds, GSAP-driven). Establishes "you are looking at a live system" before the user scrolls. |
| Skills | Flat grouped chip lists | Chips stay as the readable, accessible representation of the data. The 3D layer adds an orbit view: skill nodes connected to the role nodes that used them, visible once the user reaches the experience section. |
| Experience | 2D pipeline rail, `<ol className="rail">` | Literal 3D topology. Camera flies node to node as the user scrolls, current role first, oldest last. Achievement bullets populate a HUD panel next to the 3D view, same data, same `resume.ts`, no new content. |
| Earlier experience, education, interests | Plain 2D sections | Stay exactly as they are. Not every section needs the 3D treatment. Concentrating the drama in the hero and experience section, then settling back into the calm register for the rest, matches how the original 2D design already modulated intensity (one signature element, restraint elsewhere), and keeps a recruiter's actual reading task easy at the point they need it most. |

## Fallback strategy (non-negotiable)

WebGL is not guaranteed: old hardware, low-power mode, corporate lockdown browsers, screen readers, crawlers, `prefers-reduced-motion`. The current "infrastructure console" 2D design does not get deleted. It becomes the baseline.

- Real semantic HTML for all resume content renders first, always, regardless of WebGL support. This is already true today and does not change.
- The React Three Fiber layer is a progressive enhancement that mounts only when: WebGL is available, `prefers-reduced-motion` is `no-preference`, and a coarse capability check passes (viewport width, rough device-memory heuristic). Fail any of those and the current 2D pipeline rail renders exactly as it does today. No blank canvas, no broken state.
- Under `prefers-reduced-motion: reduce`, skip the WebGL layer entirely rather than rendering a static single frame. This matches the skill's explicit guidance: scroll-hijack and parallax must collapse to static, and the safest static is the design that was already built for it.
- The `<canvas>` is `aria-hidden="true"` / `role="presentation"`. Screen readers read the real DOM content in the same order as today; the 3D layer is decoration, never the only place information lives.
- Keyboard scrolling (Page Down, arrow keys, spacebar) must drive the camera the same way mouse-wheel scrolling does, since ScrollTrigger is scroll-position-driven, not pointer-driven. Nothing in the experience should require a mouse.

## Performance budget

- `three` + `@react-three/fiber` + `@react-three/drei` + `@react-three/postprocessing` + `gsap` add real weight to the bundle. None of it belongs in the initial critical bundle. Code-split with a dynamic import; the existing 2D content paints first regardless, so LCP on the hero headline is unaffected by whether the 3D layer ever loads.
- Mobile: reduce node/particle counts, disable bloom and any post-processing, or simply serve the 2D fallback below a width threshold in the spirit of the existing 560px breakpoint. A cramped 3D scene on a small screen isn't worth the bundle cost.
- Target 60fps for the camera flythrough on mid-tier hardware. If a capability check can't be confident of that, fall back to 2D. Janky 3D reads worse than no 3D.
- Re-run Lighthouse after each build phase. The bar is the current site's Core Web Vitals baseline, not "acceptable for a WebGL site."

## Guardrails specific to this project

Extending `.claude/skills/design-taste-frontend/`'s anti-tell list to this concept specifically:

- No floating glTF astronaut, no generic starfield, no particle vortex that doesn't map to anything. Every visual element in the scene corresponds to real resume data (a role, a skill, a connection between them).
- No new color palette. The 3D layer uses the existing tokens (`--accent` copper, `--status-ok` and `--status-current` greens/ambers from `src/index.css`), not a new neon cyan/purple WebGL-cliché palette.
- No text rendered inside the canvas. Achievement bullets, dates, titles stay real HTML, adjacent to or overlaid on the canvas, never Three.js `Text` geometry standing in for body copy.
- No camera roll or aggressive FOV changes. Smooth, primarily translational movement. The goal is "flying through a system," not a rollercoaster.
- No em-dashes, no AI-copy filler verbs, no fake-precise numbers, consistent with the rest of the site's existing copy discipline.

## Phased roadmap

1. **Spike.** Done. `three`, `@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing`, `gsap`, `d3-force` installed and confirmed working under this project's Vite 8 + React 19 + strict TypeScript setup.
2. **Data and capability layer.** Done, scoped down from the original plan: `src/data/graph.ts` derives role nodes (id, current flag) and chronological order from `resume.ts`. Skill nodes and skill-to-role edges were deliberately deferred rather than built on a guess, see the note in that file. `src/hooks/useWebGLCapable.ts` covers the WebGL/reduced-motion/viewport-width check; the lazy-mount wrapper lives directly in `Hero.tsx` (`React.lazy` + `Suspense`, gated on the hook).
3. **Hero ambient field.** Done. `src/three/HeroField.tsx`, a sparse phyllotaxis-spiral scatter of the role nodes behind the hero text, GSAP-driven scale-in entrance plus slow idle rotation. Verified with a real headless-Chrome WebGL render (not just a compile check) in both color themes and confirmed the sub-560px path renders no `<canvas>` at all.
4. **Experience topology.** Done, with the skill-to-role mapping question resolved by deferring it (option a from the Open questions list): the graph is role-nodes-only, chronological edges only, laid out with d3-force (`forceX`/`forceY`/`forceLink`/`forceManyBody` together, not just charge+link like the hero field, since there's a real directional spine to respect here). `src/three/ExperienceGraph.tsx` pins the section with GSAP ScrollTrigger and scrubs a camera flythrough from the current role backward through time; achievements render in a real HTML HUD panel (`AchievementList`/`StatusBadge`, extracted so the 2D fallback and the 3D HUD share the exact same rendering, not a re-implementation). `Experience.tsx` branches on `useWebGLCapable()` between this and the existing `ExperienceRail` (also extracted, unchanged logic) rather than layering 3D behind always-visible 2D the way the hero field does, since showing the full rail and the full graph at once would just be redundant clutter.
5. **Hardening.** Not started. Lighthouse pass, bundle analysis (capable users now download ~293kB gzipped across the hero and experience chunks combined, three.js/R3F/drei/gsap/d3-force; see the PR for the exact split), cross-browser and cross-device check, reduced-motion and keyboard-only walkthroughs. Also the point to properly resolve the HUD panel's screen-reader experience during scroll-scrubbing, `aria-live="polite"` is a reasonable baseline but not verified with an actual screen reader yet.

Each phase should land as its own reviewable change. Don't attempt the whole roadmap in one pass.

## Open questions for the next iteration

- **Skill-to-role edges: resolved for now, revisit later.** Phase 4 went with option (a) from the original list here: skills stay a 2D-only chip list, the experience graph is role-nodes-only. If a future iteration wants skill nodes in the 3D graph, option (b) (deriving edges by matching a skill's exact name as a substring of an achievement's text) is still the one worth trying first, it's a mechanical, verifiable derivation rather than an invented association, but would need a pass to check it doesn't produce misleading matches.
- Node/edge visual language beyond current-vs-complete coloring (sphere size scaling by tenure? line thickness by seniority?) wasn't explored, current implementation uses two fixed sizes and one line style.
- Mobile treatment for the experience section: currently just inherits the same 560px WebGL-capability cutoff as the hero field, full 2D fallback below it. Not separately tuned or tested on a real device between 560px and, say, 900px, where the topology's fixed 78vh height and HUD panel overlay might feel cramped.
- The HUD panel's screen-reader experience during scroll-scrubbing (see Phase 5 note above) is unverified.
- The hero field's node scatter (`seededPosition` in `HeroField.tsx`) was tuned by eye against one viewport size. Worth a pass across a few real breakpoints once the experience section exists, to keep the two 3D moments visually consistent.
