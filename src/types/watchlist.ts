import { addWatchlistBoardSchema } from "@/lib/validators";
import { z } from "zod";

export type Watchlist = z.infer<typeof addWatchlistBoardSchema> & {
  $id: string;
  userId: string;
  items: WatchlistItem[];
  $createdAt: string;
  $updatedAt: string;
};

export type WatchlistItem = {
  $id: string;
  title: string;
  watchlist: string;
  $createdAt: string;
  $updatedAt: string;
};

export type AddWatchlistBoardResponse = {
  success: boolean;
  message: string;
  data?: Watchlist;
};
