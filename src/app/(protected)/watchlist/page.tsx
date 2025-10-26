import { KanbanBoardCircleColor } from "@/components/kanban";
import WatchlistKanbanBoard from "@/components/watchlist-board/watchlist-kanban-board";
import {
  getWatchlistBoard,
  getWatchlistItems,
} from "@/lib/actions/watchlist.actions";

async function WatchlistPage() {
  let watchlists = await getWatchlistBoard();

  const watchlistItems = await getWatchlistItems();

  // insert watchlist items into their respective watchlist boards
  watchlists = watchlists.map((watchlist) => {
    const items = watchlistItems.filter(
      (item) => item.watchlist === watchlist.$id,
    );

    return {
      ...watchlist,
      items,
    };
  });

  return <WatchlistKanbanBoard watchlists={watchlists} />;
}

export default WatchlistPage;
