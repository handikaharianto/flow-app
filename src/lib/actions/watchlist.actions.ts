"use server";

import { getUser } from "@/lib/actions/user.actions";
import { createSessionClient } from "@/lib/appwrite";
import { DATABASE_ID, WATCHLISTS_TABLE_ID } from "@/lib/constants";
import { addWatchlistBoardSchema } from "@/lib/validators";
import { AddWatchlistBoardResponse, Watchlist } from "@/types/watchlist";
import { cookies } from "next/headers";
import { ID, Models, Query } from "node-appwrite";
import { z } from "zod";

export async function getWatchlistBoard() {
  const sessionCookie = (await cookies()).get("session");

  try {
    const { tablesDB } = await createSessionClient(sessionCookie?.value);

    const user = await getUser();
    if (!user) {
      throw new Error("User not found.");
    }

    const { rows } = await tablesDB.listRows({
      databaseId: DATABASE_ID,
      tableId: WATCHLISTS_TABLE_ID,
      queries: [Query.equal("userId", user.$id), Query.orderAsc("$createdAt")],
    });

    return rows as unknown as Watchlist[];
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function addWatchlistBoard(
  data: z.infer<typeof addWatchlistBoardSchema>,
): Promise<AddWatchlistBoardResponse> {
  const sessionCookie = (await cookies()).get("session");

  try {
    const { tablesDB } = await createSessionClient(sessionCookie?.value);

    const user = await getUser();
    if (!user) {
      throw new Error("User not found.");
    }

    const response = await tablesDB.createRow<Models.DefaultRow & Watchlist>({
      databaseId: DATABASE_ID,
      tableId: WATCHLISTS_TABLE_ID,
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
        $id: response.$id,
        title: response.title,
        items: response.items,
        userId: response.userId,
        $createdAt: response.$createdAt,
        $updatedAt: response.$updatedAt,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Failed to add new watchlist board.",
    };
  }
}
