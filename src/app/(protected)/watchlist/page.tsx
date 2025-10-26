import { KanbanBoardCircleColor } from "@/components/kanban";
import WatchlistKanbanBoard from "@/components/watchlist-board/watchlist-kanban-board";
import { getWatchlistBoard } from "@/lib/actions/watchlist.actions";

export type Card = {
  id: string;
  title: string;
};

export type Column = {
  id: string;
  title: string;
  color: KanbanBoardCircleColor;
  items: Card[];
};

async function WatchlistPage() {
  const watchlists = await getWatchlistBoard();
  console.log(watchlists);

  return <WatchlistKanbanBoard watchlists={watchlists} />;
}

export default WatchlistPage;
