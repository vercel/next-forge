# Setup

## Prerequisites

- Node.js >= 18
- A PostgreSQL database (Neon recommended)
- Stripe CLI (for local webhook testing)
- Mintlify CLI (for docs preview)
- Supported OS: macOS, Linux (Ubuntu 24.04+), Windows 11

## Installation

```bash
npx next-forge@latest init
```

The CLI prompts for:
1. **Project name** — used as the directory name
2. **Package manager** — bun (recommended), npm, yarn, or pnpm

Post-installation, the CLI installs dependencies and copies `.env.example` files to their working equivalents.

## Required Environment Variables

### Database (required)

Set in `packages/database/.env`:

```bash
DATABASE_URL="postgresql://user:password@host:5432/dbname"
```

Neon provides a free PostgreSQL database. Create one at neon.tech and copy the connection string.

### Local URLs (pre-configured)

These defaults work out of the box for local development:

```bash
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_WEB_URL="http://localhost:3001"
NEXT_PUBLIC_API_URL="http://localhost:3002"
NEXT_PUBLIC_DOCS_URL="http://localhost:3004"
```

## Optional Environment Variables

All integrations below are optional. If the corresponding environment variable is not set, the feature is disabled gracefully.

### Authentication (Clerk)

Set in `apps/app/.env.local`:

```bash
CLERK_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_WEBHOOK_SECRET="whsec_..."
```

### Payments (Stripe)

Set in `apps/app/.env.local` and `apps/api/.env.local`:

```bash
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
```

### CMS (BaseHub)

Set in `packages/cms/.env.local`:

```bash
BASEHUB_TOKEN="bshb_..."
```

Fork the `basehub/next-forge` template in BaseHub, then generate a Read Token.

### Email (Resend)

Set in `apps/app/.env.local`:

```bash
RESEND_TOKEN="re_..."
```

### Analytics (PostHog)

Set in `apps/app/.env.local` and `apps/web/.env.local`:

```bash
NEXT_PUBLIC_POSTHOG_KEY="phc_..."
NEXT_PUBLIC_POSTHOG_HOST="https://us.i.posthog.com"
```

### Analytics (Google)

```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID="G-..."
```

### Observability (Sentry)

```bash
SENTRY_ORG="..."
SENTRY_PROJECT="..."
NEXT_PUBLIC_SENTRY_DSN="https://..."
```

### Logging (BetterStack)

```bash
BETTERSTACK_API_KEY="..."
BETTERSTACK_URL="..."
```

### Security (Arcjet)

```bash
ARCJET_KEY="ajkey_..."
```

### Storage (Vercel Blob)

```bash
BLOB_READ_WRITE_TOKEN="vercel_blob_..."
```

### Feature Flags

```bash
FLAGS_SECRET="..."  # Generate: node -e "console.log(crypto.randomBytes(32).toString('base64url'))"
```

### Notifications (Knock)

```bash
KNOCK_API_KEY="sk_..."
NEXT_PUBLIC_KNOCK_PUBLIC_API_KEY="pk_..."
NEXT_PUBLIC_KNOCK_FEED_CHANNEL_ID="..."
```

### Collaboration (Liveblocks)

```bash
LIVEBLOCKS_SECRET="sk_..."
```

### Webhooks (Svix)

```bash
SVIX_TOKEN="..."
```

### Internationalization (Languine)

Set in `packages/internationalization/.env.local`:

```bash
LANGUINE_PROJECT_ID="..."
```

## Database Setup

After setting `DATABASE_URL`, push the schema to the database:

```bash
bun run migrate
```

This runs three Prisma commands in sequence:
1. `prisma format` — formats the schema file
2. `prisma generate` — generates the Prisma client
3. `prisma db push` — pushes the schema to the database

The schema lives at `packages/database/prisma/schema.prisma`. Edit it, then run `bun run migrate` again after changes.

Browse the database visually with Prisma Studio:

```bash
bun dev --filter studio
```

## Stripe CLI Setup

Install the Stripe CLI for local webhook testing:

```bash
brew install stripe/stripe-cli/stripe
stripe login
```

The Stripe CLI automatically forwards webhook events to `http://localhost:3000/api/webhooks/payments` during local development.

## Running Development

Start all apps:

```bash
bun run dev
```

Start a specific app:

```bash
bun dev --filter app         # Port 3000
bun dev --filter web         # Port 3001
bun dev --filter api         # Port 3002
```

## Environment Variable Validation

Each package validates its environment variables at build time using `@t3-oss/env-nextjs` with Zod schemas. The validation files are named `keys.ts` within each package. If a required variable is missing, the build fails with a descriptive error message.
