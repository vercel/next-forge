import { authMiddleware } from "@repo/auth/middleware";
import { internationalizationMiddleware } from "@repo/internationalization/middleware";
import { parseError } from "@repo/observability/error";
import { secure } from "@repo/security";
import {
  noseconeOptions,
  noseconeOptionsWithToolbar,
  securityMiddleware,
} from "@repo/security/middleware";
import { createNEMO } from "@rescale/nemo";
import {
  type NextMiddleware,
  type NextRequest,
  NextResponse,
} from "next/server";
import { env } from "@/env";

export const config = {
  // matcher tells Next.js which routes to run the middleware on. This runs the
  // middleware on all routes except for static assets and Posthog ingest
  matcher: ["/((?!_next/static|_next/image|ingest|favicon.ico).*)"],
  runtime: "nodejs",
};

const securityHeaders = env.FLAGS_SECRET
  ? securityMiddleware(noseconeOptionsWithToolbar)
  : securityMiddleware(noseconeOptions);

// Custom middleware for Arcjet security checks
const arcjetMiddleware = async (request: NextRequest) => {
  if (!env.ARCJET_KEY) {
    return;
  }

  try {
    await secure(
      [
        // See https://docs.arcjet.com/bot-protection/identifying-bots
        "CATEGORY:SEARCH_ENGINE", // Allow search engines
        "CATEGORY:PREVIEW", // Allow preview links to show OG images
        "CATEGORY:MONITOR", // Allow uptime monitoring services
      ],
      request
    );
  } catch (error) {
    const message = parseError(error);
    return NextResponse.json({ error: message }, { status: 403 });
  }
};

// Compose non-Clerk middleware with Nemo
const composedMiddleware = createNEMO(
  {},
  {
    before: [internationalizationMiddleware, arcjetMiddleware],
  }
);

// Clerk middleware wraps other middleware in its callback
export default authMiddleware(async (_auth, request, event) => {
  // Run security headers first
  const headersResponse = securityHeaders();

  // Then run composed middleware (i18n + arcjet)
  const middlewareResponse = await composedMiddleware(
    request as unknown as NextRequest,
    event
  );

  // Return middleware response if it exists, otherwise headers response
  return middlewareResponse || headersResponse;
}) as unknown as NextMiddleware;
