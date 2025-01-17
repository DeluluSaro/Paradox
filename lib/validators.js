import { z } from "zod";

export const projectSchema = z.object({
  name: z
    .string()
    .min(1, "Project name is required")
    .max(100, "Project name should be 100 characters or less."),
  key: z
    .string()
    .min(2, "Project key must be minimum 2 characters")
    .max(10, "Project key must be less than 10 characters"),
  description: z
    .string()
    .max(500, "Description must be less than 500 characters.")
    .optional(),
});
