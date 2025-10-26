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
import { FormEvent, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { addWatchlistBoard } from "@/lib/actions/watchlist.actions";
import { Field, FieldGroup } from "@/components/ui/field";

type Props = {
  //   onAddColumn: (columnTitle?: string) => void;
};

function AddWatchlistBoard({}: Props) {
  const [showEditor, setShowEditor] = useState(false);
  const newColumnButtonReference = useRef<HTMLButtonElement>(null);
  const inputReference = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof addWatchlistBoardSchema>>({
    resolver: zodResolver(addWatchlistBoardSchema),
    defaultValues: {
      title: "",
    },
  });

  function handleAddColumnClick() {
    flushSync(() => {
      setShowEditor(true);
    });

    // onAddColumn();
  }

  function handleCancelClick() {
    flushSync(() => {
      setShowEditor(false);
    });

    newColumnButtonReference.current?.focus();
  }

  // function handleSubmit(event: FormEvent<HTMLFormElement>) {
  //   event.preventDefault();
  //   const formData = new FormData(event.currentTarget);
  //   const columnTitle = formData.get("columnTitle") as string;
  //   // onAddColumn(columnTitle);
  //   if (inputReference.current) {
  //     inputReference.current.value = "";
  //   }
  // }

  async function submitForm(data: z.infer<typeof addWatchlistBoardSchema>) {
    console.log(data);

    const response = await addWatchlistBoard(data);
    console.log(response);
  }

  return showEditor ? (
    <form
      className={kanbanBoardColumnClassNames}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          handleCancelClick();
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
                      handleCancelClick();
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
          onClick={handleCancelClick}
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
          onClick={handleAddColumnClick}
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
