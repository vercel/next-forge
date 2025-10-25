"use server";

import {
  auth,
  clerkClient,
  type OrganizationMembership,
} from "@repo/auth/server";
import Fuse from "fuse.js";

const getName = (user: OrganizationMembership): string | undefined => {
  let name = user.publicUserData?.firstName;

  if (name && user.publicUserData?.lastName) {
    name = `${name} ${user.publicUserData.lastName}`;
  } else if (!name) {
    name = user.publicUserData?.identifier;
  }

  return name;
};

export const searchUsers = async (
  query: string
): Promise<
  | {
      data: string[];
    }
  | {
      error: unknown;
    }
> => {
  try {
    const { orgId } = await auth();

    if (!orgId) {
      throw new Error("Not logged in");
    }

    const clerk = await clerkClient();

    const members = await clerk.organizations.getOrganizationMembershipList({
      organizationId: orgId,
      limit: 100,
    });

    const users = members.data.map((user) => ({
      id: user.id,
      name: getName(user) ?? user.publicUserData?.identifier,
      imageUrl: user.publicUserData?.imageUrl,
    }));

    const fuse = new Fuse(users, {
      keys: ["name"],
      minMatchCharLength: 1,
      threshold: 0.3,
    });

    const results = fuse.search(query);
    const data = results.map((result) => result.item.id);

    return { data };
  } catch (error) {
    return { error };
  }
};
