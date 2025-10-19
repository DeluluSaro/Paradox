"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function getIssuesForSprint(sprintId) {
  const { userId, orgId } = await auth();

  if (!userId || !orgId) {
    throw new Error("Unauthorized");
  }

  const issues = await db.issue.findMany({
    where: { sprintId: sprintId },
    orderBy: [{ status: "asc" }, { order: "asc" }],
    include: {
      assignee: true,
      reporter: true,
    },
  });

  // Serialize the issues to plain objects
  return issues.map(issue => ({
    id: issue.id,
    title: issue.title,
    description: issue.description,
    status: issue.status,
    order: issue.order,
    priority: issue.priority,
    assigneeId: issue.assigneeId,
    reporterId: issue.reporterId,
    projectId: issue.projectId,
    sprintId: issue.sprintId,
    createdAt: issue.createdAt.toISOString(),
    updatedAt: issue.updatedAt.toISOString(),
    assignee: issue.assignee ? {
      id: issue.assignee.id,
      clerkUserId: issue.assignee.clerkUserId,
      email: issue.assignee.email,
      name: issue.assignee.name,
      imageUrl: issue.assignee.imageUrl,
      createdAt: issue.assignee.createdAt.toISOString(),
      updatedAt: issue.assignee.updatedAt.toISOString()
    } : null,
    reporter: {
      id: issue.reporter.id,
      clerkUserId: issue.reporter.clerkUserId,
      email: issue.reporter.email,
      name: issue.reporter.name,
      imageUrl: issue.reporter.imageUrl,
      createdAt: issue.reporter.createdAt.toISOString(),
      updatedAt: issue.reporter.updatedAt.toISOString()
    }
  }));
}

export async function createIssue(projectId, data) {
  const { userId, orgId } = await auth();

  if (!userId || !orgId) {
    throw new Error("Unauthorized");
  }

  let user = await db.user.findUnique({ where: { clerkUserId: userId } });

  const lastIssue = await db.issue.findFirst({
    where: { projectId, status: data.status },
    orderBy: { order: "desc" },
  });

  const newOrder = lastIssue ? lastIssue.order + 1 : 0;

  const issue = await db.issue.create({
    data: {
      title: data.title,
      description: data.description,
      status: data.status,
      priority: data.priority,
      projectId: projectId,
      sprintId: data.sprintId,
      reporterId: user.id,
      assigneeId: data.assigneeId || null, // Add this line
      order: newOrder,
    },
    include: {
      assignee: true,
      reporter: true,
    },
  });

  // Serialize the issue to plain object
  return {
    id: issue.id,
    title: issue.title,
    description: issue.description,
    status: issue.status,
    order: issue.order,
    priority: issue.priority,
    assigneeId: issue.assigneeId,
    reporterId: issue.reporterId,
    projectId: issue.projectId,
    sprintId: issue.sprintId,
    createdAt: issue.createdAt.toISOString(),
    updatedAt: issue.updatedAt.toISOString(),
    assignee: issue.assignee ? {
      id: issue.assignee.id,
      clerkUserId: issue.assignee.clerkUserId,
      email: issue.assignee.email,
      name: issue.assignee.name,
      imageUrl: issue.assignee.imageUrl,
      createdAt: issue.assignee.createdAt.toISOString(),
      updatedAt: issue.assignee.updatedAt.toISOString()
    } : null,
    reporter: {
      id: issue.reporter.id,
      clerkUserId: issue.reporter.clerkUserId,
      email: issue.reporter.email,
      name: issue.reporter.name,
      imageUrl: issue.reporter.imageUrl,
      createdAt: issue.reporter.createdAt.toISOString(),
      updatedAt: issue.reporter.updatedAt.toISOString()
    }
  };
}

export async function updateIssueOrder(updatedIssues) {
  const { userId, orgId } = await auth();

  if (!userId || !orgId) {
    throw new Error("Unauthorized");
  }

  // Start a transaction
  await db.$transaction(async (prisma) => {
    // Update each issue
    for (const issue of updatedIssues) {
      await prisma.issue.update({
        where: { id: issue.id },
        data: {
          status: issue.status,
          order: issue.order,
        },
      });
    }
  });

  return { success: true };
}

export async function deleteIssue(issueId) {
  const { userId, orgId } = await auth();

  if (!userId || !orgId) {
    throw new Error("Unauthorized");
  }

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const issue = await db.issue.findUnique({
    where: { id: issueId },
    include: { project: true },
  });

  if (!issue) {
    throw new Error("Issue not found");
  }

  if (
    issue.reporterId !== user.id &&
    !issue.project.adminIds.includes(user.id)
  ) {
    throw new Error("You don't have permission to delete this issue");
  }

  await db.issue.delete({ where: { id: issueId } });

  return { success: true };
}

export async function updateIssue(issueId, data) {
  const { userId, orgId } = await auth();

  if (!userId || !orgId) {
    throw new Error("Unauthorized");
  }

  try {
    const issue = await db.issue.findUnique({
      where: { id: issueId },
      include: { project: true },
    });

    if (!issue) {
      throw new Error("Issue not found");
    }

    if (issue.project.organizationId !== orgId) {
      throw new Error("Unauthorized");
    }

    const updatedIssue = await db.issue.update({
      where: { id: issueId },
      data: {
        status: data.status,
        priority: data.priority,
      },
      include: {
        assignee: true,
        reporter: true,
      },
    });

    return updatedIssue;
  } catch (error) {
    throw new Error("Error updating issue: " + error.message);
  }
}