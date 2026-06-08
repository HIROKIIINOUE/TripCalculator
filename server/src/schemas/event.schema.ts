import z from "zod";

export const createEventSchema = z.object({
  date: z.iso.date(),
  title: z.string().min(1),
  detail: z.string().min(1),
  localCurrency: z.string().min(1),
  priceLocalCurrency: z.number().int(),
  priceYourCurrency: z.number().int(),
});

export type CreateEventBody = z.infer<typeof createEventSchema>;

export const updateEventSchema = z.object({
  date: z.iso.date().optional(),
  title: z.string().min(1).optional(),
  detail: z.string().min(1).optional(),
  localCurrency: z.string().min(1).optional(),
  priceLocalCurrency: z.number().int().optional(),
  priceYourCurrency: z.number().int().optional(),
});

export type UpdateEventBody = z.infer<typeof updateEventSchema>;
