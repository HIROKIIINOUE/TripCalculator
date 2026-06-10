import z from "zod";
import { supportedCurrencyCodes } from "../constants/currencies";

const MAX_TRIP_BUDGET = 2147483647;

export const addTripSchema = z.object({
  title: z.string().min(1, "trip.errors.title.required"),
  startDay: z.iso.date("trip.errors.startDay.invalid"), // "YYYY-MM-DD"形の文字列を通す
  budget: z
    .string()
    .min(1, "trip.errors.budget.required")
    .regex(/^[0-9]+$/, "trip.errors.budget.invalid")
    .refine((value) => Number(value) > 0, {
      message: "trip.errors.budget.min",
    })
    .refine((value) => Number(value) <= MAX_TRIP_BUDGET, {
      message: "trip.errors.budget.max",
    }),
  yourCurrency: z
    .string()
    .refine(
      (value) => supportedCurrencyCodes.includes(value),
      "trip.errors.yourCurrency.invalid",
    ),
});

export type AddTripBody = z.infer<typeof addTripSchema>;

// regexで文字列のパターンを判定
// 今回のbudget:
// - ^ : 文字列の先頭
// - [0-9]+ : 半角数字が1文字以上
// - $ : 文字列の末尾

// refine で意味、条件を検証
// 今回のbudget: 値が0より大きいかどうかを判定している
