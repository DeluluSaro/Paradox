"use server";

import { db } from "@/lib/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server";

export async function getOrganization(slug) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  // Check if user exists in database, if not create them
  let user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) {
    // Get user data from Clerk
    const clerkUser = await clerkClient().users.getUser(userId);
    const name = `${clerkUser.firstName ?? ""} ${clerkUser.lastName ?? ""}`.trim();
    
    // Create user in database
    user = await db.user.create({
      data: {
        clerkUserId: clerkUser.id,
        name: name || clerkUser.emailAddresses?.[0]?.emailAddress || "Unknown",
        imageUrl: clerkUser.imageUrl ?? "",
        email: clerkUser.emailAddresses?.[0]?.emailAddress ?? "",
      },
    });
  }

  const organization = await clerkClient().organizations.getOrganization({
    slug,
  });

  if (!organization) {
    return null;
  }

  const { data: membership } =
    await clerkClient().organizations.getOrganizationMembershipList({
      organizationId: organization.id,
    });

  const userMembership = membership.find(
    (member) => member.publicUserData.userId === userId
  );

  if (!userMembership) {
    return null;
  }

  // Serialize the organization to plain object
  return {
    id: organization.id,
    name: organization.name,
    slug: organization.slug,
    imageUrl: organization.imageUrl,
    createdBy: organization.createdBy,
    createdAt: organization.createdAt,
    updatedAt: organization.updatedAt,
    membersCount: organization.membersCount,
    pendingInvitationsCount: organization.pendingInvitationsCount,
    maxAllowedMemberships: organization.maxAllowedMemberships,
    adminDeleteEnabled: organization.adminDeleteEnabled,
    publicMetadata: organization.publicMetadata,
    privateMetadata: organization.privateMetadata,
    hasImage: organization.hasImage,
    members: organization.members || [],
    pendingInvitations: organization.pendingInvitations || []
  };
}

export async function getOrganizationUsers(orgId) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) {
    throw new Error("User Not Found");
  }

  const organizationMembership =
    await clerkClient().organizations.getOrganizationMembershipList({
      organizationId: orgId,
    });

  const userIds = organizationMembership.data.map(
    (membership) => membership.publicUserData.userId
  );

  // Get existing users from database
  const existingUsers = await db.user.findMany({
    where: {
      clerkUserId: {
        in: userIds
      }
    }
  });

  // Find users that exist in Clerk but not in our database
  const existingUserIds = existingUsers.map(user => user.clerkUserId);
  const missingUserIds = userIds.filter(id => !existingUserIds.includes(id));

  // Create missing users in the database
  if (missingUserIds.length > 0) {
    const clerkUsers = await Promise.all(
      missingUserIds.map(id => clerkClient().users.getUser(id))
    );

    const newUsers = await Promise.all(
      clerkUsers.map(async (clerkUser) => {
        const name = `${clerkUser.firstName ?? ""} ${clerkUser.lastName ?? ""}`.trim();
        return await db.user.create({
          data: {
            clerkUserId: clerkUser.id,
            name: name || clerkUser.emailAddresses?.[0]?.emailAddress || "Unknown",
            imageUrl: clerkUser.imageUrl ?? "",
            email: clerkUser.emailAddresses?.[0]?.emailAddress ?? "",
          },
        });
      })
    );

    // Return both existing and newly created users
    return [...existingUsers, ...newUsers];
  }

  return existingUsers;
}
