# Architecture

## Monorepo Structure

next-forge uses Turborepo to manage a monorepo with apps and packages.

```
next-forge/
├── apps/
│   ├── app/          # Main SaaS app (port 3000)
│   ├── web/          # Marketing site (port 3001)
│   ├── api/          # Serverless API (port 3002)
│   ├── email/        # Email preview (port 3003)
│   ├── docs/         # Documentation (port 3004)
│   ├── storybook/    # Component workshop (port 6006)
│   └── studio/       # Prisma Studio (port 3005)
├── packages/
│   ├── ai/                    # AI/LLM integration
│   ├── analytics/             # PostHog, Google Analytics, Vercel Analytics
│   ├── auth/                  # Clerk authentication
│   ├── cms/                   # BaseHub CMS
│   ├── collaboration/         # Liveblocks real-time features
│   ├── cron/                  # Vercel cron jobs
│   ├── database/              # Prisma + Neon PostgreSQL
│   ├── design-system/         # shadcn/ui component library
│   ├── email/                 # Resend + React Email
│   ├── feature-flags/         # Vercel Flags SDK + PostHog
│   ├── internationalization/  # Languine i18n
│   ├── next-config/           # Shared Next.js configuration
│   ├── notifications/         # Knock notification platform
│   ├── observability/         # Sentry + BetterStack
│   ├── payments/              # Stripe integration
│   ├── rate-limit/            # Rate limiting utilities
│   ├── security/              # Arcjet WAF + bot detection
│   ├── seo/                   # Metadata, sitemap, JSON-LD
│   ├── storage/               # Vercel Blob
│   ├── typescript-config/     # Shared TS configs
│   └── webhooks/              # Svix outbound + Stripe/Clerk inbound
├── turbo.json
└── package.json
```

## Apps

### app (Port 3000)
The main user-facing SaaS application. Includes authentication via Clerk, database access via Prisma, collaboration features via Liveblocks, and notification feeds via Knock. Contains authenticated route layouts with security middleware.

### web (Port 3001)
The marketing website. Integrates BaseHub CMS for blog posts and content, SEO optimization with metadata and sitemap generation, analytics tracking, and internationalization support.

### api (Port 3002)
Serverless API endpoints for webhooks (Stripe, Clerk), cron jobs, and any dedicated API routes. Deployed as a separate Vercel project.

### email (Port 3003)
React Email preview server for developing and testing email templates. Templates are React components in the `@repo/email` package.

### docs (Port 3004)
Documentation site built with Mintlify. Requires the Mintlify CLI for local preview.

### storybook (Port 6006)
Storybook instance for previewing and testing design system components in isolation.

### studio (Port 3005)
Prisma Studio provides a visual interface for browsing and editing database records.

## Package Naming

All packages use the `@repo/<name>` convention:

```typescript
import { database } from '@repo/database';
import { auth } from '@repo/auth';
import { stripe } from '@repo/payments';
```

Import from specific subpaths when needed:

```typescript
import { analytics } from '@repo/analytics/server';
import { upload } from '@repo/storage/client';
import { log } from '@repo/observability/log';
```

## Turborepo Pipeline

Defined in `turbo.json`:

| Task | Dependencies | Outputs | Cached | Persistent |
|------|-------------|---------|--------|------------|
| `build` | `^build`, `test` | `.next`, `storybook-static`, `.react-email` | Yes | No |
| `test` | `^test` | — | Yes | No |
| `analyze` | `^analyze` | — | Yes | No |
| `dev` | — | — | No | Yes |
| `translate` | `^translate` | — | No | No |

Global dependencies include `.env.*local` files. Environment mode is loose. The `dev` task is persistent and never cached.

## Root Scripts

| Command | Description |
|---------|-------------|
| `bun run dev` | Start all apps in development mode |
| `bun run build` | Build all apps and packages |
| `bun run test` | Run tests across the monorepo |
| `bun run lint` | Check code style (Ultracite/Biome) |
| `bun run format` | Fix code style |
| `bun run analyze` | Run bundle analysis |
| `bun run translate` | Run i18n translation via Languine |
| `bun run boundaries` | Check Turborepo workspace boundary violations |
| `bun run bump-deps` | Update all dependencies |
| `bun run bump-ui` | Update shadcn/ui components |
| `bun run migrate` | Push database schema (format, generate, db push) |
| `bun run clean` | Remove node_modules across the monorepo |
| `bun run changeset` | Manage changesets for releases |
| `bun run release` | Publish using changesets |

## Filtering

Run commands for a specific app or package:

```bash
bun dev --filter app         # Only the main app
bun dev --filter web         # Only the marketing site
bun build --filter @repo/database  # Only the database package
```

## Build Outputs

- `.next/` — Next.js build output (per app)
- `storybook-static/` — Storybook static export
- `.react-email/` — Compiled email templates
- `**/generated/**` — Auto-generated files (Prisma client, BaseHub SDK)
