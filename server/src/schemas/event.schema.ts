import z from "zod";

const MAX_EVENT_PRICE = 2147483647;

export const createEventSchema = z.object({
  date: z.iso.date(),
  title: z.string().min(1),
  detail: z.string(),
  localCurrency: z.string().min(1),
  priceLocalCurrency: z.number().int().min(0).max(MAX_EVENT_PRICE),
});

export type CreateEventBody = z.infer<typeof createEventSchema>;

export const updateEventSchema = z.object({
  date: z.iso.date().optional(),
  title: z.string().min(1).optional(),
  detail: z.string().optional(),
  localCurrency: z.string().min(1).optional(),
  priceLocalCurrency: z.number().int().min(0).max(MAX_EVENT_PRICE).optional(),
  priceYourCurrency: z.number().int().optional(),
  appliedExchangeRate: z.number().positive().optional(),
});

export type UpdateEventBody = z.infer<typeof updateEventSchema>;
