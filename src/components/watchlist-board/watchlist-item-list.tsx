import { Card, Column } from "@/app/(protected)/watchlist/page";
import {
  KanbanBoardColumnList,
  KanbanBoardColumnListItem,
} from "@/components/kanban";
import WatchlistCard from "@/components/watchlist-board/watchlist-card";

type Props = {
  column: Column;
};

function WatchlistItemList({ column }: Props) {
  return (
    <KanbanBoardColumnList>
      {column.items.map((card: Card) => (
        <KanbanBoardColumnListItem
          cardId={card.id}
          key={card.id}
          // onDropOverListItem={handleDropOverListItem(card.id)}
        >
          <WatchlistCard card={card} isActive={true} />
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
