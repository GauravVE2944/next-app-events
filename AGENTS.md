# AGENTS.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

DevEvent — a Next.js 16 (App Router) event-listing and booking platform. Users browse developer events (hackathons, conferences, meetups), view details, and book spots. Authentication is handled by Clerk; data is stored in MongoDB via Mongoose.

## Build / Dev / Lint Commands

```
npm run dev      # Start dev server on localhost:3000
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint (flat config, eslint.config.mjs)
```

There is no test framework configured in this project.

## Environment Variables

Required in `.env.local`:
- `MONGODB_URI` (or `MONGO_URI`) — MongoDB connection string
- `NEXT_PUBLIC_BASE_URL` — Base URL for internal API fetches (defaults to `http://localhost:3000`)
- Clerk keys (managed via `.clerk/` and `.env.local`): `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`

## Architecture

### Routing (App Router)

- `app/page.tsx` — Home page; server-side fetches events from its own API (`/api/events`) and renders `EventCard` list.
- `app/events/[slug]/page.tsx` — Event detail page; fetches single event via `/api/events/[slug]`, shows details, booking form, and related events.
- `app/api/events/route.ts` — `GET` returns all events (selected fields); `POST` creates an event from `FormData` (tags sent as JSON string).
- `app/api/events/[slug]/route.ts` — `GET` returns a single event by slug.

### Data Layer (`database/`, `lib/`)

- `database/event.model.ts` — Mongoose `Event` model with `IEvent` interface. Has a `pre('save')` hook that auto-generates slugs from titles and normalizes date/time formats.
- `database/booking.model.ts` — Mongoose `Booking` model with `IBooking` interface. Unique compound index on `(eventId, email)` enforces one booking per user per event. `pre('save')` hook validates that the referenced event exists.
- `database/index.ts` — Barrel file re-exporting models and types.
- `lib/mongodb.ts` — Singleton `connectToDatabase()` using global caching to avoid multiple connections in dev (hot-reload safe).
- `lib/actions/event.action.ts` — Server action `getRelatedEvents` finds events sharing tags with the given slug.
- `lib/actions/booking.action.ts` — Server action `createBooking` creates a booking document.

### Authentication (`middleware.ts`)

Clerk middleware protects routes matching `/create(.*)`. All other routes are public. Clerk's `<ClerkProvider>` wraps the root layout; `<Show>`, `<SignInButton>`, and `<UserButton>` are used in `Navbar`.

### UI & Styling

- Tailwind CSS v4 with `@tailwindcss/postcss`. Custom design tokens (colors, fonts) defined as CSS variables in `app/globals.css` using `@theme inline`.
- shadcn/ui (new-york style, RSC-enabled) configured in `components.json`. Add components via `npx shadcn add <component>`.
- Custom utility classes: `flex-center`, `text-gradient`, `glass`, `card-shadow` (defined in `globals.css`).
- Fonts: Schibsted Grotesk (`--font-schibsted-grotesk`) and Martian Mono (`--font-martian-mono`) loaded via `next/font`.
- `LightRays` component — WebGL background effect using the `ogl` library with custom GLSL shaders. It is rendered as a full-screen background in the root layout.
- Remote images from `images.unsplash.com` are allowed in `next.config.ts`.

### Path Aliases

`@/*` maps to the project root (configured in `tsconfig.json`). Use `@/components/...`, `@/lib/...`, `@/database/...` for imports.

### Key Conventions

- Client components must use `"use client"` directive. Server components are the default.
- Server actions use `"use server"` directive and live in `lib/actions/`.
- API routes use Next.js route handlers (`route.ts`) with `NextRequest`/`NextResponse`.
- Event slugs are the primary lookup key for event detail pages and API routes.
- The `connectToDatabase()` helper must be called before any Mongoose operation in both API routes and server actions.
