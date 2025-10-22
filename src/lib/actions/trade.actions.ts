"use server";

import { z } from "zod";
import { getUser } from "@/lib/actions/user.actions";
import { createSessionClient } from "@/lib/appwrite";
import { DATABASE_ID, TRADE_PLANS_TABLE_ID } from "@/lib/constants";
import { addTradePlanSchema } from "@/lib/validators";
import { AddTradePlanResponse, TradePlan } from "@/types/trade";
import { cookies } from "next/headers";
import { ID, Models, Query } from "node-appwrite";

export async function getTradePlans(): Promise<TradePlan[]> {
  const sessionCookie = (await cookies()).get("session");

  try {
    const { tablesDB } = await createSessionClient(sessionCookie?.value);

    const user = await getUser();
    if (!user) {
      throw new Error("User not found.");
    }

    const { rows } = await tablesDB.listRows({
      databaseId: DATABASE_ID,
      tableId: TRADE_PLANS_TABLE_ID,
      queries: [Query.equal("userId", user.$id), Query.orderDesc("$createdAt")],
    });

    return rows as unknown as TradePlan[];
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function addTradePlan(
  data: z.infer<typeof addTradePlanSchema>,
): Promise<AddTradePlanResponse> {
  const sessionCookie = (await cookies()).get("session");
  // console.log(formData);

  try {
    const { tablesDB } = await createSessionClient(sessionCookie?.value);

    const user = await getUser();
    if (!user) {
      throw new Error("User not found.");
    }

    const response = await tablesDB.createRow<
      Models.DefaultRow & z.infer<typeof addTradePlanSchema>
    >({
      databaseId: DATABASE_ID,
      tableId: TRADE_PLANS_TABLE_ID,
      rowId: ID.unique(),
      data: {
        ...data,
        userId: user.$id,
      },
    });

    return {
      success: true,
      message: "A new trade plan has been added successfully.",
      data: {
        symbol: response.symbol,
        side: response.side,
        entry: response.entry,
        target: response.target,
        stopLoss: response.stopLoss,
        result: response.result,
        userId: response.userId,
        $id: response.$id,
        $createdAt: response.$createdAt,
        $updatedAt: response.$updatedAt,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Failed to add a new trade plan.",
    };
  }
}
