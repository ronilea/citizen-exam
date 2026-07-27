"use client";

import { ArrowLeft, ArrowRight, Shuffle } from "lucide-react";

import { Button } from "@/components/ui/button";

type FlashcardControlsProps = {
  onBack: () => void;
  onNext: () => void;
  onShuffle: () => void;
  backDisabled?: boolean;
  nextDisabled?: boolean;
};

export function FlashcardControls({
  onBack,
  onNext,
  onShuffle,
  backDisabled = false,
  nextDisabled = false,
}: FlashcardControlsProps) {
  return (
    <div className="deck-controls">
      <Button
        type="button"
        variant="outline"
        size="lg"
        className="deck-controls__outline"
        onClick={onBack}
        disabled={backDisabled}
      >
        <ArrowLeft className="shrink-0" />
        <span className="truncate">Back</span>
      </Button>
      <Button
        type="button"
        variant="outline"
        size="lg"
        className="deck-controls__outline"
        onClick={onShuffle}
      >
        <Shuffle className="shrink-0" />
        <span className="truncate">Shuffle</span>
      </Button>
      <Button
        type="button"
        size="lg"
        className="deck-controls__primary"
        onClick={onNext}
        disabled={nextDisabled}
      >
        <span className="truncate">Next</span>
        <ArrowRight className="shrink-0" />
      </Button>
    </div>
  );
}
