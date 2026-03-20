---
name: next-forge
description: Expert assistance for next-forge — a production-grade Turborepo template for Next.js SaaS apps. Triggers on questions about next-forge installation, setup, architecture, packages, customization, deployment, and development workflows.
---

# next-forge

next-forge is a production-grade Turborepo template for building Next.js SaaS applications. It provides a monorepo structure with multiple apps, shared packages, and integrations for authentication, database, payments, email, CMS, analytics, observability, security, and more.

## Quick Start

Initialize a new project:

```bash
npx next-forge@latest init
```

The CLI prompts for a project name and package manager (bun, npm, yarn, or pnpm). After installation:

1. Set the `DATABASE_URL` in `packages/database/.env` pointing to a PostgreSQL database (Neon recommended).
2. Run database migrations: `bun run migrate`
3. Add any optional integration keys to the appropriate `.env.local` files.
4. Start development: `bun run dev`

All integrations besides the database are optional. Missing environment variables gracefully disable features rather than causing errors.

## Architecture Overview

The monorepo contains apps and packages. Apps are deployable applications. Packages are shared libraries imported as `@repo/<package-name>`.

**Apps** (in `/apps/`):

| App | Port | Purpose |
|-----|------|---------|
| `app` | 3000 | Main authenticated SaaS application |
| `web` | 3001 | Marketing website with CMS and SEO |
| `api` | 3002 | Serverless API for webhooks, cron jobs |
| `email` | 3003 | React Email preview server |
| `docs` | 3004 | Documentation site (Mintlify) |
| `storybook` | 6006 | Design system component workshop |
| `studio` | 3005 | Prisma Studio for database editing |

**Core Packages**: `auth`, `database`, `payments`, `email`, `cms`, `design-system`, `analytics`, `observability`, `security`, `storage`, `seo`, `feature-flags`, `internationalization`, `webhooks`, `cron`, `notifications`, `collaboration`, `ai`, `rate-limit`, `next-config`, `typescript-config`.

For detailed structure, see `references/architecture.md`.

## Key Concepts

### Environment Variables

Environment variable files live alongside apps and packages:

- `apps/app/.env.local` — Main app keys (Clerk, Stripe, etc.)
- `apps/web/.env.local` — Marketing site keys
- `apps/api/.env.local` — API keys
- `packages/database/.env` — `DATABASE_URL` (required)
- `packages/cms/.env.local` — BaseHub token
- `packages/internationalization/.env.local` — Languine project ID

Each package has a `keys.ts` file that validates environment variables with Zod via `@t3-oss/env-nextjs`. Type safety is enforced at build time.

### Inter-App URLs

Local URLs are pre-configured:

- `NEXT_PUBLIC_APP_URL=http://localhost:3000`
- `NEXT_PUBLIC_WEB_URL=http://localhost:3001`
- `NEXT_PUBLIC_API_URL=http://localhost:3002`
- `NEXT_PUBLIC_DOCS_URL=http://localhost:3004`

Update these to production domains when deploying (e.g., `app.yourdomain.com`, `www.yourdomain.com`).

### Server Components First

`page.tsx` and `layout.tsx` files are always server components. Client interactivity goes in separate files with `'use client'`. Access databases, secrets, and server-only APIs directly in server components and server actions.

### Graceful Degradation

All integrations beyond the database are optional. Clients use optional chaining (e.g., `stripe?.prices.list()`, `resend?.emails.send()`). If the corresponding environment variable is not set, the feature is silently disabled.

## Common Tasks

### Running Development

```bash
bun run dev                  # All apps
bun dev --filter app         # Single app (port 3000)
bun dev --filter web         # Marketing site (port 3001)
```

### Database Migrations

After changing `packages/database/prisma/schema.prisma`:

```bash
bun run migrate
```

This runs Prisma format, generate, and db push in sequence.

### Adding shadcn/ui Components

```bash
npx shadcn@latest add [component] -c packages/design-system
```

Update existing components:

```bash
bun run bump-ui
```

### Adding a New Package

Create a new directory in `/packages/` with a `package.json` using the `@repo/<name>` naming convention. Add it as a dependency in consuming apps.

### Linting and Formatting

```bash
bun run lint                 # Check code style (Ultracite/Biome)
bun run format               # Fix code style
```

### Testing

```bash
bun run test                 # Run tests across monorepo
```

### Building

```bash
bun run build                # Build all apps and packages
bun run analyze              # Bundle analysis
```

### Deployment

Deploy to Vercel by creating separate projects for `app`, `web`, and `api` — each pointing to its respective root directory under `/apps/`. Add environment variables per project or use Vercel Team Environment Variables.

For detailed setup and customization instructions, see:

- `references/setup.md` — Installation, prerequisites, environment variables, database and Stripe CLI setup
- `references/packages.md` — Detailed documentation for every package
- `references/customization.md` — Swapping providers, extending features, deployment configuration
- `references/architecture.md` — Full monorepo structure, Turborepo pipeline, scripts
