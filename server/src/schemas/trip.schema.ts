import z from "zod";

export const createTripSchema = z.object({
  title: z.string().min(1),
  startDay: z.iso.date(),
  budget: z.number(),
  yourCurrency: z.string().min(1),
});

export type CreateTripBody = z.infer<typeof createTripSchema>;

export const updateTripSchema = z.object({
  title: z.string().min(1).optional(),
  startDay: z.iso.date().optional(),
  budget: z.number().optional(),
  yourCurrency: z.string().min(1).optional(),
});

export type UpdateTripBody = z.infer<typeof updateTripSchema>;
