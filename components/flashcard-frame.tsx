"use client";

import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

type FlashcardFrameProps = {
  children: React.ReactNode;
  className?: string;
};

export function FlashcardFrame({ children, className }: FlashcardFrameProps) {
  return <div className={cn("flashcard-frame", className)}>{children}</div>;
}

export function FlashcardLoader() {
  return (
    <FlashcardFrame className="flex items-center justify-center">
      <Loader2
        className="size-8 animate-spin text-brand-charcoal"
        aria-label="Loading flashcards"
      />
    </FlashcardFrame>
  );
}
