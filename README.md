# Shana Learning Adventures — Beginners (Phase 1 MVP)

A playful e-learning app for children aged 3–9, built with Angular (standalone
components) and Bootstrap: student + trainer flows and gamification. Accounts,
progress and rewards live in the backend; module content and a few profile fields
are still served from an in-browser mock database while the move to the backend
completes (see "Mock data layer" below).

## Meet Bolt 🤖

Bolt is the app's robot sidekick — a small round-bodied robot rendered as
inline SVG so it stays crisp at any size. Bolt greets students by name the
first time they log in, floats in the corner of every page offering
encouragement, and reacts (cheering, thinking, "oops") to what's happening
in a lesson.

## Tech stack

- Angular 22 (standalone components, signals, new `@if`/`@for` control flow)
- Bootstrap 5.3 (customized via Sass variables — see `src/assets/styles/_variables.scss`)
- Hand-rolled SCSS animations for the playful/gamified moments
- No backend: a `DatabaseService` wraps `localStorage` behind an API that
  looks like a real one (see below)

## Prerequisites

**Node 22 or later is required** — Angular 22's CLI refuses to run on
older Node versions. If your system's default `node -v` is older than 22,
use `nvm`:

```bash
nvm install 22
nvm use 22
```

## Setup

```bash
npm install --include=dev   # --include=dev matters if your shell sets NODE_ENV=production
npm start                   # ng serve — http://localhost:4200, proxies /api to localhost:3000
```

Sign-in, progress and rewards go to the backend
([shana-beginners-backend](../shana-beginners-backend)), so run it alongside —
see its README (`npm run db:setup`, `npm run db:seed:demo`, `npm run dev`).

## Demo accounts

Created in the backend by `npm run db:seed:demo`:

| Role in the app | Email             | Password   |
|-----------------|-------------------|------------|
| Student (beginner) | ava@shana.dev     | Ava12345   |
| Student (advanced) | leo@shana.dev     | Leo12345   |
| Admin           | trainer@shana.dev | Trainer123 |
| Trainer         | coach@shana.dev   | Coach1234  |

Ava has all 24 beginner modules assigned; Leo has the 3 advanced ones. Neither has
started any yet.

Public signup creates **students only**. Admin and Trainer accounts are created by an
administrator in the backend (`npm run staff:create`).

## Curriculum → backend

The curriculum is authored in `src/app/core/services/seed-data.service.ts`. After
changing it, export it to the backend and load it there:

```bash
npm run export:curriculum                          # writes ../shana-beginners-backend/db/curriculum/curriculum.json
cd ../shana-beginners-backend && npm run db:seed:curriculum
```

The export fails — writing nothing — if any module, lesson or exercise id is used
twice. Ids are permanent: students' progress and rewards are keyed on them, so rename
an id only for content no student has done yet.

## Building for production

```bash
npm run build       # outputs to dist/shana-e-learning-beginners/browser
```

## Deploying to Netlify

The included `netlify.toml` is already configured:

```toml
[build]
  command = "npm run build"
  publish = "dist/shana-e-learning-beginners/browser"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

The redirect rule is required because this is a client-side-routed SPA —
without it, refreshing on any route other than `/` would 404 on Netlify.

Steps:
1. Push this project to a Git repo (GitHub/GitLab/Bitbucket).
2. In Netlify, "Add new site" → "Import an existing project" → pick the repo.
3. Netlify will detect `netlify.toml` and use its build command/publish
   directory automatically. Netlify's build image ships a modern Node
   version by default; if it doesn't, set `NODE_VERSION = "22"` (or later)
   as an environment variable in Site settings.
4. Deploy. No other configuration or environment variables are needed —
   there's no backend to connect to in this phase.

## Architecture

### Folder structure

```
src/app/
├── core/
│   ├── models/       # TypeScript interfaces: User, Module, Lesson, Exercise, Progress, Gamification
│   ├── services/      # DatabaseService, SeedDataService, AuthService, ModuleService,
│   │                   # StudentService, TrainerService, ProgressService, GamificationService, SidekickService
│   └── guards/         # studentGuard, trainerGuard (functional CanActivateFn guards)
├── shared/
│   ├── components/
│   │   ├── bolt-avatar/          # Bolt's SVG + mood animations (reused by sidekick + welcome moment)
│   │   ├── sidekick/             # Corner-anchored Bolt + speech bubble, driven by SidekickService
│   │   ├── celebration-overlay/  # Global star/badge/trophy celebration, driven by GamificationService
│   │   ├── app-header/           # Shared top bar (brand, avatar, logout)
│   │   ├── progress-ring/        # Circular progress indicator
│   │   ├── reward-shelf/         # Stars/badges/trophies display
│   │   └── friendly-alert/       # Soft validation/error messaging (no harsh red banners)
│   └── avatar-emoji.ts
├── auth/                # role-select, login, signup
├── student/              # dashboard, module-player, lesson-view, exercise-view, rewards-page
└── trainer/               # dashboard, module-list, module-editor, assign-module
```

### Mock data layer

`DatabaseService` (`core/services/database.service.ts`) is a small generic
wrapper around `localStorage`, exposing collection-style methods
(`getAll`, `getById`, `insert`, `update`, `upsert`, `remove`). Every
feature service — `AuthService`, `ModuleService`, `StudentService`,
`TrainerService`, `ProgressService`, `GamificationService` — sits on top
of it and exposes an API shaped like a real backend client
(`login()`, `getModulesForStudent()`, `assignModuleToStudents()`, etc.),
returning `Observable`s. **Swapping this for a real backend later means
rewriting these service internals to call `HttpClient` — component code
and data models stay the same.**

`SeedDataService` populates the database with demo data (2 students, 1
trainer, 1 sample module) the first time the app runs, gated by a flag in
`localStorage` so it never overwrites real progress on later visits.

### Data model

`Module` → ordered `Lesson[]` → ordered `Exercise[]`. `Exercise` is a
discriminated union on `type` (`'multiple-choice'` is the only variant
implemented now); adding a new question type later means adding a new
interface to the union and a new case in `exercise-view`, without touching
the module/lesson model.

### Gamification rules (as implemented)

- **1 star** per correct exercise answer (awarded once per exercise —
  answering it again on review doesn't double-award).
- **1 badge** per completed lesson (a lesson maps to one "week" of content).
- **1 trophy** per fully completed module.
- All three are idempotent — `GamificationService` checks existing award
  logs before granting, so re-visiting completed content is safe.
- Each award fires a `rewardEvent$` that the global `CelebrationOverlay`
  listens for, so the celebratory animation works no matter where in the
  app the reward was earned.

## Assumptions made

- **Passwords are stored in plain text** in `localStorage`. This is a mock
  auth layer for a backend-less MVP, not real security — replace this
  entirely (hashing, real session tokens, etc.) before any real backend
  is introduced.
- Signup is a single form with a role toggle (Learner/Trainer); there's no
  separate admin role or org/tenant boundary — any trainer's modules can
  be assigned to any student.
- "Upload a module" is implemented as an in-app form (`module-editor`)
  rather than real file upload, per the brief — the data model is shaped
  so a real file-based import could populate the same `Module` structure
  later.
- Unassigning a module from a student isn't implemented (only additive
  assignment) — it wasn't in the brief and the UI reflects that: students
  already assigned to a module show as locked/assigned rather than
  toggleable.
- On incorrect answers, the student can retry the same question rather
  than being penalized or advanced — no permanent "wrong answer" state
  exists, matching the target age group's need for low-stakes retries.
- The one sample module ("Counting Critters") is a placeholder I wrote to
  make the flows demonstrable end-to-end, per your note that real lesson
  content is coming separately.

## Known non-blocking warning

The build emits Sass deprecation warnings for `@import` (Bootstrap itself
still ships Sass files using `@import`, and dropping to `@use` for the
Bootstrap override pattern is a bigger rewrite than this phase needs).
These are warnings only — they don't affect the build output or the
Netlify deploy.
