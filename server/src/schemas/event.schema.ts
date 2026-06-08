import z from "zod";

export const createEventSchema = z.object({
  date: z.iso.date(),
  detail: z.string().min(1),
  localCurrency: z.string().min(1),
  priceLocalCurrency: z.string().min(1),
  priceYourCurrency: z.string().min(1),
});

export type CreateEventBody = z.infer<typeof createEventSchema>;

export const updateEventSchema = z.object({
  date: z.iso.date().optional(),
  detail: z.string().min(1).optional(),
  localCurrency: z.string().min(1).optional(),
  priceLocalCurrency: z.string().min(1).optional(),
  priceYourCurrency: z.string().min(1).optional(),
});

export type UpdateEventBody = z.infer<typeof updateEventSchema>;
