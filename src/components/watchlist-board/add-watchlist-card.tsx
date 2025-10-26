import { Column } from "@/app/(protected)/watchlist/page";
import {
  KanbanBoardCardTextarea,
  KanbanBoardColumnButton,
  KanbanBoardColumnFooter,
  kanbanBoardColumnListItemClassNames,
} from "@/components/kanban";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { flushSync } from "react-dom";

type Props = {
  column: Column;
  //   onAddCard: (columnId: string, cardContent: string) => void;
  //   scrollList: () => void;
};

function AddWatchlistCard({ column }: Props) {
  const [cardContent, setCardContent] = useState("");
  const newCardButtonReference = useRef<HTMLButtonElement>(null);
  const submitButtonReference = useRef<HTMLButtonElement>(null);
  const [showNewCardForm, setShowNewCardForm] = useState(false);

  function handleAddCardClick() {
    flushSync(() => {
      setShowNewCardForm(true);
    });

    // scrollList();
  }

  function handleCancelClick() {
    flushSync(() => {
      setShowNewCardForm(false);
      setCardContent("");
    });

    newCardButtonReference.current?.focus();
  }

  function handleInputChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setCardContent(event.currentTarget.value);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    flushSync(() => {
      //   onAddCard(column.id, cardContent.trim());
      setCardContent("");
    });

    // scrollList();
  }

  return showNewCardForm ? (
    <>
      <form
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            handleCancelClick();
          }
        }}
        onSubmit={handleSubmit}
      >
        <div className={kanbanBoardColumnListItemClassNames}>
          <KanbanBoardCardTextarea
            aria-label="New card content"
            autoFocus
            name="cardContent"
            onChange={handleInputChange}
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
            placeholder="New post ..."
            required
            value={cardContent}
          />
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
        ref={newCardButtonReference}
      >
        <PlusIcon />

        <span aria-hidden>New card</span>

        <span className="sr-only">Add new card to {column.title}</span>
      </KanbanBoardColumnButton>
    </KanbanBoardColumnFooter>
  );
}

export default AddWatchlistCard;
