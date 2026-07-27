"use client";

import { useEffect, useState } from "react";

import {
  fetchFlashcards,
  type FlashcardPair,
} from "@/app/actions/vocabulary";
import { FlashcardDeck } from "@/components/flashcard-deck";
import { StudySelectors } from "@/components/study-selectors";
import { cn } from "@/lib/utils";
import { isValidSelection, type Tier } from "@/lib/taxonomy";

export function StudyPage() {
  const [tier, setTier] = useState<Tier | null>(null);
  const [levelSlug, setLevelSlug] = useState<string | null>(null);
  const [typeSlug, setTypeSlug] = useState<string | null>(null);
  const [cards, setCards] = useState<FlashcardPair[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  const isReady =
    levelSlug !== null && isValidSelection(levelSlug, typeSlug);

  useEffect(() => {
    if (!isReady || !levelSlug) {
      setCards([]);
      setLoading(false);
      setError(null);
      return;
    }

    let cancelled = false;
    const activeLevelSlug = levelSlug;
    const activeTypeSlug = typeSlug;

    async function loadCards() {
      setLoading(true);
      setError(null);

      try {
        const result = await fetchFlashcards(activeLevelSlug, activeTypeSlug);
        if (!cancelled) {
          setCards(result);
        }
      } catch {
        if (!cancelled) {
          setCards([]);
          setError("Could not load flashcards. Please try again.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadCards();

    return () => {
      cancelled = true;
    };
  }, [isReady, levelSlug, typeSlug, reloadKey]);

  function handleTierChange(nextTier: Tier) {
    setTier(nextTier);
    setLevelSlug(null);
    setTypeSlug(null);
  }

  function handleLevelChange(nextLevelSlug: string) {
    setLevelSlug(nextLevelSlug);
    setTypeSlug(null);
  }

  return (
    <div className="study-shell">
      <div className="study-shell__viewport">
        <div className="study-shell__row">
          <section
            className={cn("study-shell__hero", isReady && "hidden lg:block")}
          >
            <h1 className="study-shell__hero-title">
              Learn Hebrew, one card at a time
            </h1>
            <p className="study-shell__hero-copy">
              Choose your tier and level, flip the card to reveal the answer, and
              shuffle to keep practicing.
            </p>
          </section>

          <div className="study-shell__workspace">
            <StudySelectors
              tier={tier}
              levelSlug={levelSlug}
              typeSlug={typeSlug}
              onTierChange={handleTierChange}
              onLevelChange={handleLevelChange}
              onTypeChange={setTypeSlug}
            />

            {isReady && (
              <section
                aria-label="Flashcard study area"
                className="flex min-h-0 flex-col items-center"
              >
                <FlashcardDeck
                  cards={cards}
                  loading={loading}
                  error={error}
                  onRetry={() => setReloadKey((key) => key + 1)}
                />
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
