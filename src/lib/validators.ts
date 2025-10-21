import { z } from "zod";

export const addTradePlanSchema = z.object({
  symbol: z
    .string()
    .min(2, "Symbol is required")
    .startsWith("$", "Symbol must start with '$'")
    .max(10, "Symbol must be at most 10 characters long"),
  side: z.enum(["LONG", "SHORT"]),
  entry: z.string().max(50, "Entry must be at most 50 characters long"),
});
