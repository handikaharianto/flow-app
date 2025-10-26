"use client";

import { Column } from "@/app/(protected)/watchlist/page";
import {
  KanbanBoard,
  KanbanBoardColumn,
  KanbanBoardExtraMargin,
  KanbanBoardProvider,
} from "@/components/kanban";
import AddWatchlistBoard from "@/components/watchlist-board/add-watchlist-board";
import AddWatchlistCard from "@/components/watchlist-board/add-watchlist-card";
import WatchlistColumnHeader from "@/components/watchlist-board/watchlist-column-header";
import WatchlistItemList from "@/components/watchlist-board/watchlist-item-list";
import { useJsLoaded } from "@/hooks/use-js-loaded";
import { useState } from "react";

function WatchlistKanbanBoard() {
  const jsLoaded = useJsLoaded();

  const [columns, setColumns] = useState<Column[]>([
    {
      id: "eowdjiak9f9jr27po347jr47",
      title: "Backlog",
      color: "primary",
      items: [
        {
          id: "1",
          title: "Add a new column",
        },
        {
          id: "2",
          title: "Add a new card",
        },
        {
          id: "3",
          title: "Move a card to another column",
        },
        {
          id: "4",
          title: "Delete a column",
        },
        {
          id: "5",
          title: "Delete a card",
        },
        {
          id: "6",
          title: "Update a card title",
        },
        {
          id: "7",
          title: "Edit a column title",
        },
        {
          id: "8",
          title: `Check out

multi line

card content`,
        },
        {
          id: "9",
          title: "Move a card between two other cards",
        },
        {
          id: "10",
          title: "Turn on screen reader and listen to the announcements",
        },
        {
          id: "11",
          title: "Notice how with enough cards, the colomns become scrollable",
        },
      ],
    },
    {
      id: "ad1wx5djclsilpu8sjmp9g70",
      title: "To Do",
      color: "blue",
      items: [
        {
          id: "12",
          title: "Install the Shadcn Kanban board into your project",
        },
        {
          id: "13",
          title: "Build amazing apps",
        },
      ],
    },
    {
      id: "zm3vyxyo0x47tl60340w8jrl",
      title: "In Progress",
      color: "red",
      items: [
        {
          id: "14",
          title: "Make some magic",
        },
        {
          id: "15",
          title: "Stay healthy",
        },
        {
          id: "16",
          title: "Drink water 💧",
        },
      ],
    },
    {
      id: "rzaksqoyfvgjbw466puqu9uk",
      title: "In Review",
      color: "yellow",
      items: [],
    },
    {
      id: "w27comaw16gy2jxphpmt9xxv",
      title: "Done",
      color: "green",
      items: [
        {
          id: "17",
          title: "Hey, the column to the left of me is empty!",
        },
        {
          id: "18",
          title:
            "And using the button to the right of me, you can add columns.",
        },
      ],
    },
  ]);

  return (
    <KanbanBoardProvider>
      <KanbanBoard className="p-4">
        {/* Kanban Board */}
        {columns.map((column: Column) =>
          jsLoaded ? (
            <KanbanBoardColumn key={column.id} columnId={column.id}>
              {/* Kanban Column Header */}
              <WatchlistColumnHeader column={column} isEditingTitle={false} />
              {/* Kanban Item List */}
              <WatchlistItemList column={column} />

              <AddWatchlistCard column={column} />
            </KanbanBoardColumn>
          ) : (
            <div key={column.id}>loading</div>
          ),
        )}

        {/* Add a new column */}
        {jsLoaded ? (
          <AddWatchlistBoard
          // onAddColumn={handleAddColumn}
          />
        ) : (
          <div>loading</div>
        )}
      </KanbanBoard>
      <KanbanBoardExtraMargin />
    </KanbanBoardProvider>
  );
}

export default WatchlistKanbanBoard;
