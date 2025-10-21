import { z } from "zod";
import { addTradePlanSchema } from "@/lib/validators";

export type TradePlan = z.infer<typeof addTradePlanSchema> & {
  userId: string;
  $id: string;
  $createdAt: string;
  $updatedAt: string;
};

export type AddTradePlan = z.infer<typeof addTradePlanSchema> & {
  userId: string;
};

export type AddTradePlanResponse = {
  success: boolean;
  message: string;
  data?: TradePlan;
};
