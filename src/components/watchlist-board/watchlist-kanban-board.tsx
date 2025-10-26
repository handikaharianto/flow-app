"use client";

import {
  KanbanBoard,
  KanbanBoardColumn,
  KanbanBoardExtraMargin,
  KanbanBoardProvider,
} from "@/components/kanban";
import AddWatchlistBoard from "@/components/watchlist-board/add-watchlist-board";
import WatchlistBoardHeader from "@/components/watchlist-board/watchlist-board-header";
import WatchlistItemList from "@/components/watchlist-board/watchlist-item-list";
import { useJsLoaded } from "@/hooks/use-js-loaded";
import { Watchlist } from "@/types/watchlist";
import { useState } from "react";

type Props = {
  watchlists: Watchlist[];
};

function WatchlistKanbanBoard({ watchlists }: Props) {
  const jsLoaded = useJsLoaded();

  const [watchlistBoards, setWatchlistBoards] = useState<Watchlist[]>(
    () => watchlists,
  );

  function handleAddWatchlistBoard(newWatchlistBoard: Watchlist) {
    setWatchlistBoards((currentWatchlistBoards) => [
      ...currentWatchlistBoards,
      newWatchlistBoard,
    ]);
  }

  return (
    <KanbanBoardProvider>
      <KanbanBoard className="p-4">
        {/* Kanban Board */}
        {watchlistBoards.map((watchlistBoard: Watchlist) =>
          jsLoaded ? (
            <KanbanBoardColumn
              key={watchlistBoard.$id}
              columnId={watchlistBoard.$id}
            >
              {/* Kanban Column Header */}
              <WatchlistBoardHeader
                watchlistBoard={watchlistBoard}
                isEditingTitle={false}
              />
              {/* Kanban Item List */}
              <WatchlistItemList watchlistBoard={watchlistBoard} />

              {/* <AddWatchlistCard watchlistBoard={watchlistBoard} /> */}
            </KanbanBoardColumn>
          ) : (
            <div key={watchlistBoard.$id}>loading</div>
          ),
        )}

        {/* Add a new column */}
        {jsLoaded ? (
          <AddWatchlistBoard onAddWatchlistBoard={handleAddWatchlistBoard} />
        ) : (
          <div>loading</div>
        )}
      </KanbanBoard>
      <KanbanBoardExtraMargin />
    </KanbanBoardProvider>
  );
}

export default WatchlistKanbanBoard;
