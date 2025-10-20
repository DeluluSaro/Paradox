"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function createSprint(projectId, data) {
  const { userId, orgId } = await auth();

  if (!userId || !orgId) {
    throw new Error("Unauthorized");
  }

  const project = await db.project.findUnique({
    where: { id: projectId },
    include: { sprints: { orderBy: { createdAt: "desc" } } },
  });

  if (!project || project.organizationId !== orgId) {
    throw new Error("Project not found");
  }

  // Check if sprint name already exists for this project
  const existingSprint = await db.sprint.findFirst({
    where: {
      projectId: projectId,
      name: data.name
    }
  });

  if (existingSprint) {
    throw new Error("A sprint with this name already exists for this project");
  }

  // Validate date range
  const startDate = new Date(data.startDate);
  const endDate = new Date(data.endDate);
  
  if (startDate >= endDate) {
    throw new Error("End date must be after start date");
  }

  // Check for overlapping sprints
  const overlappingSprint = await db.sprint.findFirst({
    where: {
      projectId: projectId,
      status: { in: ["PLANNED", "ACTIVE"] },
      OR: [
        {
          AND: [
            { startDate: { lte: startDate } },
            { endDate: { gte: startDate } }
          ]
        },
        {
          AND: [
            { startDate: { lte: endDate } },
            { endDate: { gte: endDate } }
          ]
        },
        {
          AND: [
            { startDate: { gte: startDate } },
            { endDate: { lte: endDate } }
          ]
        }
      ]
    }
  });

  if (overlappingSprint) {
    throw new Error("Sprint dates overlap with existing sprint: " + overlappingSprint.name);
  }

  const sprint = await db.sprint.create({
    data: {
      name: data.name,
      startDate: startDate,
      endDate: endDate,
      status: "PLANNED",
      projectId: projectId,
    },
  });

  // Serialize the sprint to plain object
  return {
    id: sprint.id,
    name: sprint.name,
    startDate: sprint.startDate.toISOString(),
    endDate: sprint.endDate.toISOString(),
    status: sprint.status,
    projectId: sprint.projectId,
    createdAt: sprint.createdAt.toISOString(),
    updatedAt: sprint.updatedAt.toISOString()
  };
}

export async function getSprints(projectId) {
  const { userId, orgId } = await auth();

  if (!userId || !orgId) {
    throw new Error("Unauthorized");
  }

  const project = await db.project.findUnique({
    where: { id: projectId },
    include: { sprints: { orderBy: { createdAt: "desc" } } },
  });

  if (!project || project.organizationId !== orgId) {
    throw new Error("Project not found");
  }

  // Serialize sprints to plain objects
  return project.sprints.map(sprint => ({
    id: sprint.id,
    name: sprint.name,
    startDate: sprint.startDate.toISOString(),
    endDate: sprint.endDate.toISOString(),
    status: sprint.status,
    projectId: sprint.projectId,
    createdAt: sprint.createdAt.toISOString(),
    updatedAt: sprint.updatedAt.toISOString()
  }));
}

export async function updateSprintStatus(sprintId, newStatus) {
  const { userId, orgId, orgRole } = await auth();

  if (!userId || !orgId) {
    throw new Error("Unauthorized");
  }

  try {
    const sprint = await db.sprint.findUnique({
      where: { id: sprintId },
      include: { project: true },
    });
    console.log(sprint, orgRole);

    if (!sprint) {
      throw new Error("Sprint not found");
    }

    if (sprint.project.organizationId !== orgId) {
      throw new Error("Unauthorized");
    }

    if (orgRole !== "org:admin") {
      throw new Error("Only Admin can make this change");
    }

    const now = new Date();
    const startDate = new Date(sprint.startDate);
    const endDate = new Date(sprint.endDate);

    if (newStatus === "ACTIVE" && (now < startDate || now > endDate)) {
      throw new Error("Cannot start sprint outside of its date range");
    }

    if (newStatus === "COMPLETED" && sprint.status !== "ACTIVE") {
      throw new Error("Can only complete an active sprint");
    }

    const updatedSprint = await db.sprint.update({
      where: { id: sprintId },
      data: { status: newStatus },
    });

    // Serialize the sprint to plain object
    const serializedSprint = {
      id: updatedSprint.id,
      name: updatedSprint.name,
      startDate: updatedSprint.startDate.toISOString(),
      endDate: updatedSprint.endDate.toISOString(),
      status: updatedSprint.status,
      projectId: updatedSprint.projectId,
      createdAt: updatedSprint.createdAt.toISOString(),
      updatedAt: updatedSprint.updatedAt.toISOString()
    };

    return { success: true, sprint: serializedSprint };
  } catch (error) {
    throw new Error(error.message);
  }
}