import { z } from "zod";

export const insertTradePlanSchema = z.object({
  symbol: z.string().max(10, "Symbol must be at most 10 characters long"),
  side: z.enum(["LONG", "SHORT"]),
  entry: z.string().max(50, "Entry must be at most 50 characters long"),
});
