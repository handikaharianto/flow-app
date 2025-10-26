import {
  KanbanBoardColumnHeader,
  KanbanBoardColumnIconButton,
  KanbanBoardColumnTitle,
} from "@/components/kanban";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Watchlist } from "@/types/watchlist";
import { MoreHorizontalIcon, PenIcon, Trash2Icon } from "lucide-react";

type Props = {
  watchlistBoard: Watchlist;
  isEditingTitle: boolean;
};

function WatchlistBoardHeader({ watchlistBoard, isEditingTitle }: Props) {
  return (
    <KanbanBoardColumnHeader>
      {isEditingTitle ? (
        <form
          className="w-full"
          // onSubmit={handleSubmit}
          // onBlur={event => {
          //   if (!event.currentTarget.contains(event.relatedTarget)) {
          //     closeDropdownMenu();
          //   }
          // }}
        >
          <Input
            aria-label="Column title"
            autoFocus
            defaultValue={watchlistBoard.title}
            name="columnTitle"
            // onKeyDown={event => {
            //   if (event.key === 'Escape') {
            //     closeDropdownMenu();
            //   }
            // }}
            required
          />
        </form>
      ) : (
        <>
          <KanbanBoardColumnTitle columnId={watchlistBoard.$id}>
            {/* <KanbanColorCircle color={column.color} /> */}
            {watchlistBoard.title}
          </KanbanBoardColumnTitle>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <KanbanBoardColumnIconButton
              // ref={moreOptionsButtonReference}
              >
                <MoreHorizontalIcon />

                <span className="sr-only">
                  More options for {watchlistBoard.title}
                </span>
              </KanbanBoardColumnIconButton>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Column</DropdownMenuLabel>

              <DropdownMenuGroup>
                <DropdownMenuItem
                // onClick={() => setIsEditingTitle(true)}
                >
                  <PenIcon />
                  Edit Details
                </DropdownMenuItem>

                <DropdownMenuItem
                  className="text-destructive"
                  // onClick={() => onDeleteColumn(column.id)}
                >
                  <Trash2Icon />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )}
    </KanbanBoardColumnHeader>
  );
}

export default WatchlistBoardHeader;
