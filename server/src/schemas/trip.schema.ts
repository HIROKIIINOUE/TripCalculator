import z from "zod";

const MAX_TRIP_BUDGET = 2147483647;

export const createTripSchema = z.object({
  title: z.string().min(1),
  startDay: z.iso.date(),
  budget: z.number().int().min(1).max(MAX_TRIP_BUDGET),
  yourCurrency: z.string().min(1),
});

export type CreateTripBody = z.infer<typeof createTripSchema>;

export const updateTripSchema = z.object({
  title: z.string().min(1).optional(),
  startDay: z.iso.date().optional(),
  budget: z.number().int().min(1).max(MAX_TRIP_BUDGET).optional(),
  yourCurrency: z.string().min(1).optional(),
});

export type UpdateTripBody = z.infer<typeof updateTripSchema>;
