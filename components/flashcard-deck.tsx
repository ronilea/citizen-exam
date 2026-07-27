"use client";

import { useEffect, useState, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Flashcard } from "@/components/flashcard";
import { FlashcardControls } from "@/components/flashcard-controls";
import { FlashcardFrame, FlashcardLoader } from "@/components/flashcard-frame";
import type { FlashcardPair } from "@/app/actions/vocabulary";

type FlashcardDeckProps = {
  cards: FlashcardPair[];
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
};

function DeckColumn({ children }: { children: ReactNode }) {
  return <div className="deck-column">{children}</div>;
}

function shuffleArray<T>(items: T[]): T[] {
  const shuffled = [...items];

  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

export function FlashcardDeck({
  cards,
  loading = false,
  error = null,
  onRetry,
}: FlashcardDeckProps) {
  const [deck, setDeck] = useState<FlashcardPair[]>(cards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    setDeck(cards);
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [cards]);

  const currentCard = deck[currentIndex];
  const hasCards = deck.length > 0;
  const canGoBack = currentIndex > 0;
  const canGoNext = currentIndex < deck.length - 1;

  function goToCard(nextIndex: number) {
    setIsFlipped(false);
    setCurrentIndex(nextIndex);
  }

  function handleNext() {
    if (!hasCards || !canGoNext) return;
    goToCard(currentIndex + 1);
  }

  function handleBack() {
    if (!hasCards || !canGoBack) return;
    goToCard(currentIndex - 1);
  }

  function handleShuffle() {
    if (!hasCards) return;
    setIsFlipped(false);
    setDeck((currentDeck) => shuffleArray(currentDeck));
    setCurrentIndex(0);
  }

  if (loading) {
    return (
      <DeckColumn>
        <FlashcardLoader />
      </DeckColumn>
    );
  }

  if (error) {
    return (
      <DeckColumn>
        <FlashcardFrame className="flex flex-col items-center justify-center gap-3 p-4 text-center">
          <p className="deck-column__message">{error}</p>
          {onRetry && (
            <Button type="button" size="sm" onClick={onRetry}>
              Try again
            </Button>
          )}
        </FlashcardFrame>
      </DeckColumn>
    );
  }

  if (!hasCards) {
    return (
      <DeckColumn>
        <FlashcardFrame className="flex items-center justify-center p-4 text-center">
          <p className="deck-column__message">
            No flashcards found for this selection.
          </p>
        </FlashcardFrame>
      </DeckColumn>
    );
  }

  return (
    <DeckColumn>
      <p className="deck-column__counter">
        {currentIndex + 1} / {deck.length}
      </p>

      <Flashcard
        key={currentCard.id}
        hebrew={currentCard.hebrew}
        english={currentCard.english}
        isFlipped={isFlipped}
        onFlip={() => setIsFlipped((flipped) => !flipped)}
      />

      <FlashcardControls
        onBack={handleBack}
        onNext={handleNext}
        onShuffle={handleShuffle}
        backDisabled={!canGoBack}
        nextDisabled={!canGoNext}
      />
    </DeckColumn>
  );
}
