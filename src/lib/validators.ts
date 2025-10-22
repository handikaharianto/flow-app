import { TradeResult, TradeSide } from "@/types/trade";
import { z } from "zod";

export const addTradePlanSchema = z.object({
  symbol: z
    .string()
    .min(2, "Symbol is required")
    .startsWith("$", "Symbol must start with '$'")
    .max(10, "Symbol must be at most 10 characters long"),
  side: z.enum(TradeSide),
  entry: z
    .string()
    .min(1, "Entry price is required")
    .regex(/^\d+(\.\d+)?$/, "Entry price must be a valid number"),
  target: z
    .string()
    .min(1, "Target price is required")
    .regex(/^\d+(\.\d+)?$/, "Target price must be a valid number"),
  stopLoss: z
    .string()
    .min(1, "Stop loss price is required")
    .regex(/^\d+(\.\d+)?$/, "Stop loss must be a valid number"),
  result: z.enum(TradeResult).optional(),
});
