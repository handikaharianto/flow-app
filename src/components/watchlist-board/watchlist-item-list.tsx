import {
  KanbanBoardColumnList,
  KanbanBoardColumnListItem,
} from "@/components/kanban";
import WatchlistItemCard from "@/components/watchlist-board/watchlist-item-card";
import { Watchlist } from "@/types/watchlist";

type Props = {
  watchlistBoard: Watchlist;
};

function WatchlistItemList({ watchlistBoard }: Props) {
  return (
    <KanbanBoardColumnList>
      {watchlistBoard.items.map((item) => (
        <KanbanBoardColumnListItem
          cardId={item.$id}
          key={item.$id}
          // onDropOverListItem={handleDropOverListItem(card.id)}
        >
          <WatchlistItemCard watchlistItem={item} isActive={true} />
          {/* <MyKanbanBoardCard
                      card={card}
                      isActive={activeCardId === card.id}
                      onCardBlur={onCardBlur}
                      onCardKeyDown={onCardKeyDown}
                      onDeleteCard={onDeleteCard}
                      onUpdateCardTitle={onUpdateCardTitle}
                    /> */}
        </KanbanBoardColumnListItem>
      ))}
    </KanbanBoardColumnList>
  );
}

export default WatchlistItemList;
