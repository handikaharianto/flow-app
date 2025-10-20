import { z } from "zod";
import { insertTradePlanSchema } from "@/lib/validators";

export type TradePlan = z.infer<typeof insertTradePlanSchema> & {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
};
