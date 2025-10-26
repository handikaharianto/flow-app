import { Column } from "@/app/(protected)/watchlist/page";
import {
  KanbanBoardColumnHeader,
  KanbanBoardColumnIconButton,
  KanbanBoardColumnTitle,
  KanbanColorCircle,
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
import { MoreHorizontalIcon, PenIcon, Trash2Icon } from "lucide-react";

type Props = {
  column: Column;
  isEditingTitle: boolean;
};

function WatchlistColumnHeader({ column, isEditingTitle }: Props) {
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
            defaultValue={column.title}
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
          <KanbanBoardColumnTitle columnId={column.id}>
            <KanbanColorCircle color={column.color} />
            {column.title}
          </KanbanBoardColumnTitle>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <KanbanBoardColumnIconButton
              // ref={moreOptionsButtonReference}
              >
                <MoreHorizontalIcon />

                <span className="sr-only">More options for {column.title}</span>
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

export default WatchlistColumnHeader;
