# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ProfileSite is an Angular 17 application showcasing professional work experience through a job listing interface. The application uses standalone components (no NgModules), Angular Material for UI, and supports server-side rendering via Express.

## Development Commands

All commands should be run from the `solthoth/` directory:

```bash
cd solthoth
```

- **Install dependencies**: `npm install`
- **Development server**: `npm start` (serves on `http://0.0.0.0:4200`)
- **Build for production**: `npm run build`
- **Build with watch mode**: `npm run watch`
- **Run tests**: `npm test` (Karma/Jasmine)
- **SSR production server**: `npm run serve:ssr:solthoth` (serves built SSR app on port 4000)

Note: Tests are currently commented out in CI (see `.github/workflows/ci.yaml:19`).

## Architecture

### Application Structure

The application follows Angular 17's standalone component pattern with dependency injection via the `inject()` function rather than constructor injection.

**Core Components:**

- `AppComponent` - Root component with Material toolbar and router outlet
- `HomeComponent` - Main listing page displaying all jobs
- `JobComponent` - Reusable card component for individual job entries
- `JobDetailsComponent` - Detail view for a specific job (route: `/details/:id`)

**Routing:**

- `/` - HomeComponent (job listing)
- `/details/:id` - JobDetailsComponent (job detail view)

Routes defined in [app.routes.ts](solthoth/src/app/app.routes.ts).

### Data Model

Job data is currently **hardcoded** in [JobService](solthoth/src/app/job.service.ts:9-166) as an in-memory array. The `Job` interface includes:

- `id`: UUID string
- `title`, `companyName`, `companyLink`
- `dateRange`, `internalRange`: String dates (not Date objects)
- `achivements`: Array of accomplishment strings
- `details`: Optional additional details array

### Styling System

Global design tokens are defined in [styles.css](solthoth/src/styles.css:5-39) using CSS custom properties:

- Layout: `--layout-max-width: 960px`
- Spacing scale: `--spacing-{2xs,xs,sm,md,lg,xl,2xl,3xl,4xl}`
- Color system: Primary blue (`#2563eb`), secondary indigo (`#6366f1`)
- Typography: Inter font family via `--font-display`

Components use these tokens for consistent spacing and theming. The app uses Angular Material's indigo-pink prebuilt theme.

### Server-Side Rendering

SSR is configured via [server.ts](solthoth/server.ts) using Angular's CommonEngine with Express. The server:

- Serves static files from `dist/solthoth/browser/`
- Renders Angular routes server-side
- Runs on port 4000 (configurable via `PORT` env var)
- Includes placeholder for REST API endpoints at line 21

### TypeScript Configuration

Strict mode enabled in [tsconfig.json](solthoth/tsconfig.json:7-11) with:

- `strict: true`
- `noImplicitReturns: true`
- `noFallthroughCasesInSwitch: true`
- Angular strict templates enabled

Target: ES2022 with ES2022 modules.

## CI/CD

GitHub Actions workflow (`.github/workflows/ci.yaml`) runs on push/PR:

1. Build job: `npm ci` → `npm run build` → upload browser artifacts
2. Deploy job (main branch only): Downloads artifacts → FTP deploy to production

The default branch for PRs is `master` (not `main`), but deployment triggers on `main`.

## Development Environment

DevContainer configuration available at `.devcontainer/devcontainer.json` with:

- Node.js 20 TypeScript image
- Angular CLI pre-installed
- Azure CLI, Prettier, pre-commit hooks
- Post-create command runs `npm install` in solthoth/
