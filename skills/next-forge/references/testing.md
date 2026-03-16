# Testing

## Test Framework

next-forge uses [Vitest](https://vitest.dev/) with `@vitejs/plugin-react` and `jsdom` for testing. Test configs live in each app that has tests.

## Test Configs

Currently two apps have test configs:

- `apps/app/vitest.config.mts`
- `apps/api/vitest.config.mts`

Both are configured identically with JUnit XML reporters for CI integration:

```ts
import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    reporters: [
      "default",
      ["junit", { outputFile: "./junit.xml", addFileAttribute: true }],
    ],
  },
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./"),
      "@repo": path.resolve(import.meta.dirname, "../../packages"),
    },
  },
});
```

When adding a new app with tests, follow the same pattern: include both the `default` reporter (for console output) and the `junit` reporter (for CI).

## Test Files

Tests live in `__tests__/` directories within each app:

```
apps/app/__tests__/sign-in.test.tsx
apps/app/__tests__/sign-up.test.tsx
apps/api/__tests__/health.test.ts
```

## Running Tests

```bash
bun run test                 # All tests across the monorepo
bun run test --filter app    # Only apps/app tests
bun run test --filter api    # Only apps/api tests
```

The Turborepo pipeline runs `test` before `build` — tests must pass for builds to succeed.

## CI Integration

### Test Workflow

Tests run in `.github/workflows/test.yml` on pull requests and pushes to `main` and `trunk-merge/**` branches. The workflow:

1. Runs `bun run test` with `continue-on-error: true`
2. Uploads JUnit XML reports to [Trunk Flaky Tests](https://trunk.io/flaky-tests) via `trunk-io/analytics-uploader@v1`

The `continue-on-error` and `if: always()` on the upload step ensure test results are always reported, even on failure.

### Trunk Merge Queue

CI workflows include `trunk-merge/**` in their branch triggers. The [Trunk Merge Queue](https://trunk.io/merge-queue) creates these branches to test PR combinations against the predicted state of `main`.

Steps that should only run on actual merges to `main` (like releases) use a guard condition:

```yaml
if: github.ref == 'refs/heads/main'
```

### Required Secrets

- `TRUNK_API_TOKEN` — API token from [app.trunk.io](https://app.trunk.io)
- `TRUNK_ORG_SLUG` — Trunk organization slug (repository variable)

## Adding Tests to a New App

1. Create `apps/<name>/vitest.config.mts` following the pattern above (include both `default` and `junit` reporters)
2. Add `vitest` and `@vitejs/plugin-react` as dev dependencies
3. Create `apps/<name>/__tests__/` for test files
4. Add a `test` script to the app's `package.json`
5. JUnit reports will be automatically picked up by the CI upload step via the `**/junit.xml` glob
