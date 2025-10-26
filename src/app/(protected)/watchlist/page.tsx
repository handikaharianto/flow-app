import { KanbanBoardCircleColor } from "@/components/kanban";
import WatchlistKanbanBoard from "@/components/watchlist-board/watchlist-kanban-board";

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

function WatchlistPage() {
  return <WatchlistKanbanBoard />;
}

export default WatchlistPage;
