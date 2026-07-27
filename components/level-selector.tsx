"use client";

import { DeckSelect } from "@/components/deck-select";
import { getLevelsForTier, type Tier } from "@/lib/taxonomy";

type LevelSelectorProps = {
  tier: Tier | null;
  value: string | null;
  onChange: (levelSlug: string) => void;
};

export function LevelSelector({ tier, value, onChange }: LevelSelectorProps) {
  const levels = tier ? getLevelsForTier(tier) : [];

  return (
    <DeckSelect
      id="level-select"
      label="Level"
      value={value}
      placeholder={tier ? "Choose a level" : "Select a tier first"}
      disabled={!tier}
      options={levels.map((level) => ({
        value: level.slug,
        label: (
          <span className="level-option">
            <span
              className="level-option__swatch"
              style={{ backgroundColor: level.color }}
              aria-hidden="true"
            />
            {level.name}
          </span>
        ),
      }))}
      onChange={onChange}
    />
  );
}
