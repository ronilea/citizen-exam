"use client";

import { LevelSelector } from "@/components/level-selector";
import { TierSelector } from "@/components/tier-selector";
import { TypeSelector } from "@/components/type-selector";
import {
  getLevelBySlug,
  getTypeBySlug,
  isValidSelection,
  type Tier,
} from "@/lib/taxonomy";

type StudySelectorsProps = {
  tier: Tier | null;
  levelSlug: string | null;
  typeSlug: string | null;
  onTierChange: (tier: Tier) => void;
  onLevelChange: (levelSlug: string) => void;
  onTypeChange: (typeSlug: string) => void;
};

export function StudySelectors({
  tier,
  levelSlug,
  typeSlug,
  onTierChange,
  onLevelChange,
  onTypeChange,
}: StudySelectorsProps) {
  const isReady =
    levelSlug !== null && isValidSelection(levelSlug, typeSlug);

  return (
    <div className="study-panel">
      <div className="space-y-1">
        <h2 className="study-panel__title">Choose your deck</h2>
        <p className="study-panel__subtitle">
          Pick a tier and level to load the right flashcards.
        </p>
      </div>

      <TierSelector value={tier} onChange={onTierChange} />
      <LevelSelector tier={tier} value={levelSlug} onChange={onLevelChange} />
      <TypeSelector
        levelSlug={levelSlug}
        value={typeSlug}
        onChange={onTypeChange}
      />

      {isReady && levelSlug && (
        <p className="study-panel__summary">
          <span className="study-panel__summary-strong">
            {getLevelBySlug(levelSlug)?.name}
            {typeSlug ? ` · ${getTypeBySlug(levelSlug, typeSlug)?.name}` : ""}
          </span>
        </p>
      )}
    </div>
  );
}
