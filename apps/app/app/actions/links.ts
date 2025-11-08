"use server";

import { auth } from "@repo/auth/server";
import { database } from "@repo/database";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";

export async function createLink(data: {
  destination: string;
  slug?: string;
  title?: string;
  domain?: string;
  folderId?: string;
}) {
  const { userId, orgId } = await auth();

  if (!userId) {
    return { error: "Unauthorized" };
  }

  // Validate URL
  try {
    new URL(data.destination);
  } catch {
    return { error: "Invalid destination URL" };
  }

  // Generate slug if not provided
  const slug = data.slug || nanoid(7);

  // Check if slug is already taken
  const existing = await database.link.findFirst({
    where: {
      slug,
      domain: data.domain || "localhost:3000",
    },
  });

  if (existing) {
    return { error: "Slug already taken" };
  }

  // Create link
  const link = await database.link.create({
    data: {
      slug,
      destination: data.destination,
      title: data.title,
      domain: data.domain || "localhost:3000",
      userId,
      orgId,
      folderId: data.folderId,
    },
  });

  revalidatePath("/links");
  return { success: true, link };
}

export async function getLinks(folderId?: string) {
  const { userId } = await auth();

  if (!userId) {
    return [];
  }

  const links = await database.link.findMany({
    where: {
      userId,
      folderId: folderId || null,
    },
    include: {
      _count: {
        select: {
          clicks: true,
          qrCodes: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 100,
  });

  return links;
}

export async function getLink(id: string) {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const link = await database.link.findFirst({
    where: {
      id,
      userId,
    },
    include: {
      qrCodes: true,
      _count: {
        select: {
          clicks: true,
        },
      },
    },
  });

  return link;
}

export async function updateLink(
  id: string,
  data: {
    destination?: string;
    title?: string;
    password?: string;
    expiresAt?: Date | null;
    maxClicks?: number | null;
  }
) {
  const { userId } = await auth();

  if (!userId) {
    return { error: "Unauthorized" };
  }

  // Verify ownership
  const link = await database.link.findFirst({
    where: { id, userId },
  });

  if (!link) {
    return { error: "Link not found" };
  }

  // Update link
  const updated = await database.link.update({
    where: { id },
    data,
  });

  revalidatePath("/links");
  revalidatePath(`/links/${id}`);
  return { success: true, link: updated };
}

export async function deleteLink(id: string) {
  const { userId } = await auth();

  if (!userId) {
    return { error: "Unauthorized" };
  }

  // Verify ownership
  const link = await database.link.findFirst({
    where: { id, userId },
  });

  if (!link) {
    return { error: "Link not found" };
  }

  // Delete link (cascades to QR codes and clicks)
  await database.link.delete({
    where: { id },
  });

  revalidatePath("/links");
  return { success: true };
}

export async function getLinkStats(id: string, days: number = 7) {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const link = await database.link.findFirst({
    where: { id, userId },
  });

  if (!link) {
    return null;
  }

  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  // Get clicks over time
  const clicks = await database.click.findMany({
    where: {
      linkId: id,
      timestamp: {
        gte: startDate,
      },
    },
    orderBy: {
      timestamp: "asc",
    },
  });

  // Aggregate by country
  const countries = await database.click.groupBy({
    by: ["country"],
    where: {
      linkId: id,
      country: { not: null },
    },
    _count: true,
  });

  // Aggregate by device
  const devices = await database.click.groupBy({
    by: ["device"],
    where: {
      linkId: id,
      device: { not: null },
    },
    _count: true,
  });

  // Aggregate by browser
  const browsers = await database.click.groupBy({
    by: ["browser"],
    where: {
      linkId: id,
      browser: { not: null },
    },
    _count: true,
  });

  return {
    link,
    totalClicks: clicks.length,
    clicks,
    countries: countries.map((c) => ({
      country: c.country,
      count: c._count,
    })),
    devices: devices.map((d) => ({
      device: d.device,
      count: d._count,
    })),
    browsers: browsers.map((b) => ({
      browser: b.browser,
      count: b._count,
    })),
  };
}
