import { z } from "zod";

export const createTaskSchema = z.object({
  title: z
    .string()
    .min(1, "Task title cannot be empty")
    .max(200, "Task title is too long")
    .transform((s) => s.trim()),
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
