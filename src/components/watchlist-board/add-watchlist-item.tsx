import {
  KanbanBoardCardTextarea,
  KanbanBoardColumnButton,
  KanbanBoardColumnFooter,
  kanbanBoardColumnListItemClassNames,
} from "@/components/kanban";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { addWatchlistItem } from "@/lib/actions/watchlist.actions";
import { addWatchlistItemSchema } from "@/lib/validators";
import { Watchlist, WatchlistItem } from "@/types/watchlist";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "lucide-react";
import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

type Props = {
  watchlistBoard: Watchlist;
  onAddWatchlistItem: (item: WatchlistItem) => void;
};

function AddWatchlistItem({ watchlistBoard, onAddWatchlistItem }: Props) {
  const addButtonReference = useRef<HTMLButtonElement>(null);
  const submitButtonReference = useRef<HTMLButtonElement>(null);
  const [showNewCardForm, setShowNewCardForm] = useState(false);

  const form = useForm<z.infer<typeof addWatchlistItemSchema>>({
    resolver: zodResolver(addWatchlistItemSchema),
    defaultValues: {
      title: "",
    },
  });

  function handleAddCardClick() {
    setShowNewCardForm(true);

    // scrollList();
  }

  function handleCancelClick() {
    setShowNewCardForm(false);
    form.reset();

    addButtonReference.current?.focus();
  }

  // function handleInputChange(event: ChangeEvent<HTMLTextAreaElement>) {
  //   setCardContent(event.currentTarget.value);
  // }

  async function submitForm(data: z.infer<typeof addWatchlistItemSchema>) {
    const response = await addWatchlistItem({
      ...data,
      watchlist: watchlistBoard.$id,
    });

    if (response.success) {
      toast.success(response.message);

      onAddWatchlistItem(response.data as unknown as WatchlistItem);
    } else if (!response.success) {
      toast.error(response.message);
    }
  }

  return showNewCardForm ? (
    <>
      <form
        onBlur={(event) => {
          // when focus moves outside the form, cancel adding a new card
          if (!event.currentTarget.contains(event.relatedTarget)) {
            handleCancelClick();
          }
        }}
        onSubmit={form.handleSubmit(submitForm)}
      >
        <div className={kanbanBoardColumnListItemClassNames}>
          <FieldGroup>
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <KanbanBoardCardTextarea
                    {...field}
                    id="title"
                    autoFocus
                    name="title"
                    placeholder="New watchlist item..."
                    onInput={(event) => {
                      const input = event.currentTarget as HTMLTextAreaElement;
                      if (/\S/.test(input.value)) {
                        // Clear the error message if input is valid
                        input.setCustomValidity("");
                      } else {
                        input.setCustomValidity(
                          "Card content cannot be empty or just whitespace.",
                        );
                      }
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" && !event.shiftKey) {
                        event.preventDefault();
                        submitButtonReference.current?.click();
                      }

                      if (event.key === "Escape") {
                        handleCancelClick();
                      }
                    }}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </div>

        <KanbanBoardColumnFooter>
          <Button ref={submitButtonReference} size="sm" type="submit">
            Add
          </Button>

          <Button
            onClick={handleCancelClick}
            size="sm"
            variant="outline"
            type="button"
          >
            Cancel
          </Button>
        </KanbanBoardColumnFooter>
      </form>
    </>
  ) : (
    <KanbanBoardColumnFooter>
      <KanbanBoardColumnButton
        onClick={handleAddCardClick}
        ref={addButtonReference}
      >
        <PlusIcon />

        <span aria-hidden>New card</span>

        <span className="sr-only">Add new card to {watchlistBoard.title}</span>
      </KanbanBoardColumnButton>
    </KanbanBoardColumnFooter>
  );
}

export default AddWatchlistItem;
