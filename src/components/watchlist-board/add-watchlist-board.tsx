import {
  kanbanBoardColumnClassNames,
  KanbanBoardColumnFooter,
  KanbanBoardColumnHeader,
} from "@/components/kanban";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { addWatchlistBoardSchema } from "@/lib/validators";
import { PlusIcon } from "lucide-react";
import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { addWatchlistBoard } from "@/lib/actions/watchlist.actions";
import { Field, FieldGroup } from "@/components/ui/field";
import { Watchlist } from "@/types/watchlist";
import { toast } from "sonner";

type Props = {
  onAddWatchlistBoard: (newWatchlistBoard: Watchlist) => void;
};

function AddWatchlistBoard({ onAddWatchlistBoard }: Props) {
  const [showEditor, setShowEditor] = useState(false);
  const newColumnButtonReference = useRef<HTMLButtonElement>(null);
  const inputReference = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof addWatchlistBoardSchema>>({
    resolver: zodResolver(addWatchlistBoardSchema),
    defaultValues: {
      title: "",
    },
  });

  function handleAddWatchlistBoardClick() {
    setShowEditor(true);
  }

  function handleCancelWatchlistBoardClick() {
    setShowEditor(false);

    newColumnButtonReference.current?.focus();
  }

  async function submitForm(data: z.infer<typeof addWatchlistBoardSchema>) {
    const response = await addWatchlistBoard(data);

    if (response.success) {
      toast.success(response.message);
      onAddWatchlistBoard(response.data!);

      form.reset();
      setShowEditor(false);
    } else {
      toast.error(response.message);
    }
  }

  return showEditor ? (
    <form
      className={kanbanBoardColumnClassNames}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          handleCancelWatchlistBoardClick();
        }
      }}
      onSubmit={form.handleSubmit(submitForm)}
    >
      <KanbanBoardColumnHeader>
        <FieldGroup>
          <Controller
            name="title"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <Input
                  {...field}
                  id="title"
                  aria-invalid={fieldState.invalid}
                  name="title"
                  placeholder="New watchlist board title..."
                  autoComplete="off"
                  autoFocus
                  ref={inputReference}
                  onKeyDown={(event) => {
                    if (event.key === "Escape") {
                      handleCancelWatchlistBoardClick();
                    }
                  }}
                />
              </Field>
            )}
          />
        </FieldGroup>
      </KanbanBoardColumnHeader>

      <KanbanBoardColumnFooter>
        <Button size="sm" type="submit">
          Add
        </Button>

        <Button
          onClick={handleCancelWatchlistBoardClick}
          size="sm"
          type="button"
          variant="outline"
        >
          Cancel
        </Button>
      </KanbanBoardColumnFooter>
    </form>
  ) : (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          onClick={handleAddWatchlistBoardClick}
          ref={newColumnButtonReference}
          variant="outline"
        >
          <PlusIcon />

          <span className="sr-only">Add column</span>
        </Button>
      </TooltipTrigger>

      <TooltipContent>Add a new column to the board</TooltipContent>
    </Tooltip>
  );
}

export default AddWatchlistBoard;
