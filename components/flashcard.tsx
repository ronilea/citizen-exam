"use client";

import { cn } from "@/lib/utils";

import { FlashcardFrame } from "@/components/flashcard-frame";

type FlashcardProps = {
  hebrew: string;
  english: string;
  isFlipped: boolean;
  onFlip: () => void;
};

export function Flashcard({
  hebrew,
  english,
  isFlipped,
  onFlip,
}: FlashcardProps) {
  return (
    <button
      type="button"
      onClick={onFlip}
      aria-label={isFlipped ? "Show Hebrew" : "Show English"}
      aria-pressed={isFlipped}
      className="group w-full [perspective:1000px] focus-visible:outline-none"
    >
      <FlashcardFrame className="shadow-none">
        <div
          className={cn(
            "relative h-full w-full [transform-style:preserve-3d] transition-transform duration-500",
            isFlipped && "[transform:rotateY(180deg)]",
          )}
        >
          <div className="flashcard-face flashcard-face--front">
            <p className="flashcard-face__eyebrow">Hebrew</p>
            <p dir="rtl" lang="he" className="flashcard-face__hebrew">
              {hebrew}
            </p>
            <p className="flashcard-face__hint">Tap to reveal</p>
          </div>

          <div className="flashcard-face flashcard-face--back">
            <p className="flashcard-face__eyebrow">English</p>
            <p className="flashcard-face__english">{english}</p>
            <p className="flashcard-face__hint">Tap to flip back</p>
          </div>
        </div>
      </FlashcardFrame>
    </button>
  );
}
