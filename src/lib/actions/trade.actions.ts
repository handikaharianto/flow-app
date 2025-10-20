"use server";

import { getUser } from "@/lib/actions/user.actions";
import { createSessionClient } from "@/lib/appwrite";
import { DATABASE_ID, TRADE_PLANS_TABLE_ID } from "@/lib/constants";
import { TradePlan } from "@/types/trade";
import { cookies } from "next/headers";
import { Query } from "node-appwrite";

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
