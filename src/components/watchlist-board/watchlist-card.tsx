import { Card } from "@/app/(protected)/watchlist/page";
import {
  KanbanBoardCard,
  KanbanBoardCardButton,
  KanbanBoardCardButtonGroup,
  KanbanBoardCardDescription,
  KanbanBoardCardTextarea,
} from "@/components/kanban";
import { Trash2Icon } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";

type Props = {
  card: Card;
  isActive: boolean;
  //   onCardBlur: () => void;
  //   onCardKeyDown: (
  //     event: KeyboardEvent<HTMLButtonElement>,
  //     cardId: string,
  //   ) => void;
  //   onDeleteCard: (cardId: string) => void;
  //   onUpdateCardTitle: (cardId: string, cardTitle: string) => void;
};

function WatchlistCard({ card, isActive }: Props) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const kanbanBoardCardReference = useRef<HTMLButtonElement>(null);
  // This ref tracks the previous `isActive` state. It is used to refocus the
  // card after it was discarded with the keyboard.
  const previousIsActiveReference = useRef(isActive);
  // This ref tracks if the card was cancelled via Escape.
  const wasCancelledReference = useRef(false);

  useEffect(() => {
    // Maintain focus after the card is picked up and moved.
    if (isActive && !isEditingTitle) {
      kanbanBoardCardReference.current?.focus();
    }

    // Refocus the card after it was discarded with the keyboard.
    if (
      !isActive &&
      previousIsActiveReference.current &&
      wasCancelledReference.current
    ) {
      kanbanBoardCardReference.current?.focus();
      wasCancelledReference.current = false;
    }

    previousIsActiveReference.current = isActive;
  }, [isActive, isEditingTitle]);

  function handleBlur() {
    flushSync(() => {
      setIsEditingTitle(false);
    });

    kanbanBoardCardReference.current?.focus();
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const cardTitle = formData.get("cardTitle") as string;
    // onUpdateCardTitle(card.id, cardTitle);
    handleBlur();
  }

  return isEditingTitle ? (
    <form onBlur={handleBlur} onSubmit={handleSubmit}>
      <KanbanBoardCardTextarea
        aria-label="Edit card title"
        autoFocus
        defaultValue={card.title}
        name="cardTitle"
        onFocus={(event) => event.target.select()}
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
            event.currentTarget.form?.requestSubmit();
          }

          if (event.key === "Escape") {
            handleBlur();
          }
        }}
        placeholder="Edit card title ..."
        required
      />
    </form>
  ) : (
    <KanbanBoardCard
      data={card}
      isActive={isActive}
      //   onBlur={onCardBlur}
      onClick={() => setIsEditingTitle(true)}
      onKeyDown={(event) => {
        if (event.key === " ") {
          // Prevent the button "click" action on space because that should
          // be used to pick up and move the card using the keyboard.
          event.preventDefault();
        }

        if (event.key === "Escape") {
          // Mark that this card was cancelled.
          wasCancelledReference.current = true;
        }

        // onCardKeyDown(event, card.id);
      }}
      ref={kanbanBoardCardReference}
    >
      <KanbanBoardCardDescription>{card.title}</KanbanBoardCardDescription>
      <KanbanBoardCardButtonGroup disabled={isActive}>
        <KanbanBoardCardButton
          className="text-destructive"
          //   onClick={() => onDeleteCard(card.id)}
          tooltip="Delete card"
        >
          <Trash2Icon />

          <span className="sr-only">Delete card</span>
        </KanbanBoardCardButton>
      </KanbanBoardCardButtonGroup>
    </KanbanBoardCard>
  );
}

export default WatchlistCard;
