import * as z from "zod";

export const createUserSchema = z.object({
  displayName: z.string().min(1).max(16),
  email: z.email(),
  password: z.string().min(6),
  language: z.enum(["en", "ja", "fr"]),
});

export type CreateUserBody = z.infer<typeof createUserSchema>;
