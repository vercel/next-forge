# Customization

## Swapping Providers

next-forge is designed to be modular. Each integration can be replaced by modifying its corresponding package.

### Database / ORM

**Default**: Prisma + Neon PostgreSQL

**Alternatives**:
- **Drizzle** — Replace Prisma schema with Drizzle schema definitions. Update `@repo/database` exports to use Drizzle client.
- **PlanetScale** — Change the Prisma datasource provider or use PlanetScale's serverless driver.
- **Supabase** — Use Supabase's PostgreSQL connection string as `DATABASE_URL`, or swap to the Supabase client SDK.
- **Turso** — Use Turso's libSQL adapter with Prisma or Drizzle.
- **EdgeDB** — Replace Prisma with EdgeDB's schema and query builder.
- **Prisma Postgres** — Use Prisma's managed PostgreSQL service.

To swap: update `packages/database/`, change the client export, and update `DATABASE_URL`.

### Authentication

**Default**: Clerk

**Alternatives**:
- **Supabase Auth** — Replace `@repo/auth` with Supabase Auth client. Update middleware and session handling.
- **Auth.js** — Implement Auth.js (NextAuth v5) with chosen providers. Update session access patterns.
- **Better Auth** — Use Better Auth's session management. Update `@repo/auth` exports.

To swap: replace `packages/auth/`, update the `AuthProvider` in the design system, and update webhook handlers.

### CMS

**Default**: BaseHub

**Alternatives**:
- **Content Collections** — Use local MDX/Markdown files with content collections. Remove BaseHub SDK dependency.

To swap: replace `packages/cms/` with the new CMS client and update content queries in the `web` app.

### Payments

**Default**: Stripe

**Alternatives**:
- **Paddle** — Replace Stripe SDK with Paddle SDK. Update webhook handlers at `/api/webhooks/payments`.
- **Lemon Squeezy** — Replace Stripe SDK with Lemon Squeezy SDK. Update webhook verification logic.

To swap: update `packages/payments/`, replace the webhook handler in `apps/api/`, and update pricing page logic.

### Design System

**Default**: shadcn/ui (New York style, neutral colors)

**Alternatives**:
- **Tailwind Catalyst** — Replace shadcn/ui components with Catalyst components.
- Any Tailwind-based component library can be integrated.

To swap: replace components in `packages/design-system/`. Keep `DesignSystemProvider` as the wrapper.

### Email

**Default**: Resend + React Email

To swap: replace the `resend` client in `packages/email/` with another provider SDK (SendGrid, Postmark, AWS SES). Keep React Email templates as they compile to standard HTML.

### Documentation

**Default**: Mintlify

**Alternative**: Fumadocs — MDX-based documentation framework for Next.js.

To swap: replace the `docs` app with a Fumadocs Next.js app.

### Notifications

**Default**: Knock

**Alternative**: Novu — similar workflow-based notification platform.

To swap: replace `packages/notifications/` with the new provider's SDK and update workflow triggers.

### Code Formatting

**Default**: Ultracite (Biome-based)

**Alternative**: ESLint configurations.

Commands remain the same: `bun run lint`, `bun run format`.

## Deployment to Vercel

### Project Setup

Create three separate Vercel projects, one for each deployable app:

1. **app** — Root directory: `apps/app`
2. **web** — Root directory: `apps/web`
3. **api** — Root directory: `apps/api`

For each project:
1. Import the repository in Vercel.
2. Set the Root Directory to the app's path (e.g., `apps/app`).
3. Vercel auto-detects the Next.js framework.
4. Add all required environment variables.
5. Deploy.

### Environment Variables on Vercel

Use Vercel Team Environment Variables to share common variables across projects (e.g., `DATABASE_URL`, Stripe keys). This avoids duplicating values per project.

Recommended: install the BetterStack and Sentry Vercel integrations to auto-inject their environment variables.

### Production URLs

Update inter-app URL variables to production domains:

```bash
NEXT_PUBLIC_APP_URL="https://app.yourdomain.com"
NEXT_PUBLIC_WEB_URL="https://www.yourdomain.com"
NEXT_PUBLIC_API_URL="https://api.yourdomain.com"
NEXT_PUBLIC_DOCS_URL="https://docs.yourdomain.com"
```

### Preview Deployments

Three strategies for preview environment inter-app communication:

1. **Point to production** — Preview apps use production URLs for other apps. Simplest setup.
2. **Branch-based URLs** — Use Vercel's deterministic branch URLs derived from `VERCEL_GIT_COMMIT_REF`. Each branch gets a stable preview URL.
3. **Manual override** — Set custom URLs per preview deployment in Vercel project settings.

## Adding New Apps

1. Create a new directory under `/apps/`.
2. Initialize a Next.js app (or other framework).
3. Add `@repo/*` package dependencies as needed.
4. Add the app to `turbo.json` if it needs custom pipeline tasks.
5. Assign a unique development port.

## Adding New Packages

1. Create a new directory under `/packages/`.
2. Add a `package.json` with the `@repo/<name>` naming convention.
3. Export the package's public API.
4. Add a `keys.ts` file if the package requires environment variables (use `@t3-oss/env-nextjs` with Zod).
5. Add the package as a dependency in consuming apps.

## Design System Theming

### Colors

The design system uses CSS custom properties for theming. Edit the theme in the design system's global CSS file. shadcn/ui provides a theme generator at ui.shadcn.com/themes.

### Dark Mode

Dark mode is handled by `next-themes` via `DesignSystemProvider`. The provider supports system preference detection and manual theme toggling. Use the `dark:` Tailwind prefix for dark mode styles.

### Fonts

Font configuration is centralized in the design system package. Update the font imports and CSS variables to change the application font.

### Adding Components

Add new shadcn/ui components:

```bash
npx shadcn@latest add [component] -c packages/design-system
```

Create custom compound components following the composable pattern:

```typescript
import { Banner, BannerContent, BannerTitle, BannerDescription } from '@repo/design-system/components/banner';
```

## Extending Features

### Adding API Routes

Add routes in `apps/api/app/` following Next.js App Router conventions. Export named HTTP method handlers (`GET`, `POST`, etc.).

### Adding Cron Jobs

1. Create a route at `apps/api/app/cron/[job-name]/route.ts` with a `GET` handler.
2. Add the schedule to `apps/api/vercel.json`:
   ```json
   { "path": "/cron/job-name", "schedule": "0 * * * *" }
   ```

### Adding Webhook Handlers

Create routes in `apps/api/app/webhooks/` for inbound webhooks. Verify signatures using the provider's SDK.

### Adding Feature Flags

1. Define the flag in `packages/feature-flags/index.ts` using `createFlag('key')`.
2. Create the flag in PostHog.
3. Use it: `const enabled = await myFlag()`.

### Adding Email Templates

Create React components in the email package. Preview them at `http://localhost:3003`. Use the `resend` client to send them.
