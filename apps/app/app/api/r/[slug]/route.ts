import { database } from "@repo/database";
import { NextRequest, NextResponse } from "next/server";
import { UAParser } from "ua-parser-js";

export const runtime = "edge";

async function trackClick(
  linkId: string,
  request: NextRequest
): Promise<void> {
  try {
    const userAgent = request.headers.get("user-agent") || "";
    const parser = new UAParser(userAgent);
    const result = parser.getResult();

    // Get IP from various headers
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0] ||
      request.headers.get("x-real-ip") ||
      "unknown";

    // Get geographic data from Vercel headers
    const country = request.geo?.country || null;
    const city = request.geo?.city || null;
    const region = request.geo?.region || null;
    const latitude = request.geo?.latitude
      ? parseFloat(request.geo.latitude)
      : null;
    const longitude = request.geo?.longitude
      ? parseFloat(request.geo.longitude)
      : null;

    // Get referer
    const referer = request.headers.get("referer") || null;

    // Parse URL for UTM parameters
    const url = new URL(request.url);
    const utmSource = url.searchParams.get("utm_source");
    const utmMedium = url.searchParams.get("utm_medium");
    const utmCampaign = url.searchParams.get("utm_campaign");
    const utmTerm = url.searchParams.get("utm_term");
    const utmContent = url.searchParams.get("utm_content");

    // Detect bot
    const botPatterns = [
      /bot/i,
      /crawler/i,
      /spider/i,
      /crawling/i,
      /googlebot/i,
      /bingbot/i,
    ];
    const isBot = botPatterns.some((pattern) => pattern.test(userAgent));

    // Track click async (don't block redirect)
    await database.click.create({
      data: {
        linkId,
        ip: hashIP(ip), // Hash for privacy
        country,
        city,
        region,
        latitude,
        longitude,
        device: result.device.type || "desktop",
        os: result.os.name || null,
        browser: result.browser.name || null,
        referer,
        utmSource,
        utmMedium,
        utmCampaign,
        utmTerm,
        utmContent,
        userAgent,
        bot: isBot,
      },
    });
  } catch (error) {
    // Don't fail redirect if analytics fail
    console.error("Failed to track click:", error);
  }
}

// Simple hash function for IP privacy
function hashIP(ip: string): string {
  let hash = 0;
  for (let i = 0; i < ip.length; i++) {
    const char = ip.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash.toString(36);
}

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;

  if (!slug) {
    return NextResponse.json({ error: "Slug is required" }, { status: 400 });
  }

  // Find link
  const link = await database.link.findFirst({
    where: {
      slug,
      domain: request.headers.get("host") || "localhost:3000",
    },
  });

  if (!link) {
    return NextResponse.redirect(new URL("/404", request.url));
  }

  // Check if link is expired
  if (link.expiresAt && link.expiresAt < new Date()) {
    return NextResponse.redirect(new URL("/expired", request.url));
  }

  // Check if max clicks reached
  if (link.maxClicks) {
    const clickCount = await database.click.count({
      where: { linkId: link.id },
    });

    if (clickCount >= link.maxClicks) {
      return NextResponse.redirect(new URL("/limit-reached", request.url));
    }
  }

  // Check password protection
  if (link.password) {
    const passwordParam = request.nextUrl.searchParams.get("password");
    if (passwordParam !== link.password) {
      return NextResponse.redirect(
        new URL(`/protected?slug=${slug}`, request.url)
      );
    }
  }

  // Track click (async, don't await)
  trackClick(link.id, request);

  // Redirect to destination
  return NextResponse.redirect(link.destination);
}
