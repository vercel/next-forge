"use server";

import { auth } from "@repo/auth/server";
import { database } from "@repo/database";
import { revalidatePath } from "next/cache";

export async function createQRCode(data: {
  linkId: string;
  size?: number;
  fgColor?: string;
  bgColor?: string;
  errorLevel?: "L" | "M" | "Q" | "H";
  logo?: string;
  style?: "square" | "dots" | "rounded";
}) {
  const { userId } = await auth();

  if (!userId) {
    return { error: "Unauthorized" };
  }

  // Verify link ownership
  const link = await database.link.findFirst({
    where: {
      id: data.linkId,
      userId,
    },
  });

  if (!link) {
    return { error: "Link not found" };
  }

  // Create QR code
  const qrCode = await database.qRCode.create({
    data: {
      linkId: data.linkId,
      size: data.size || 512,
      fgColor: data.fgColor || "#000000",
      bgColor: data.bgColor || "#FFFFFF",
      errorLevel: data.errorLevel || "M",
      logo: data.logo,
      style: data.style || "square",
    },
  });

  revalidatePath(`/links/${data.linkId}`);
  return { success: true, qrCode };
}

export async function getQRCode(id: string) {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const qrCode = await database.qRCode.findFirst({
    where: {
      id,
    },
    include: {
      link: true,
    },
  });

  // Verify ownership through link
  if (qrCode?.link.userId !== userId) {
    return null;
  }

  return qrCode;
}

export async function deleteQRCode(id: string) {
  const { userId } = await auth();

  if (!userId) {
    return { error: "Unauthorized" };
  }

  // Verify ownership
  const qrCode = await database.qRCode.findFirst({
    where: { id },
    include: { link: true },
  });

  if (!qrCode || qrCode.link.userId !== userId) {
    return { error: "QR code not found" };
  }

  await database.qRCode.delete({
    where: { id },
  });

  revalidatePath(`/links/${qrCode.linkId}`);
  return { success: true };
}
