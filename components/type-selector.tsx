"use client";

import { DeckSelect } from "@/components/deck-select";
import { getLevelBySlug, getTypesForLevel } from "@/lib/taxonomy";

type TypeSelectorProps = {
  levelSlug: string | null;
  value: string | null;
  onChange: (typeSlug: string) => void;
};

export function TypeSelector({ levelSlug, value, onChange }: TypeSelectorProps) {
  if (!levelSlug || !getLevelBySlug(levelSlug)?.hasTypes) {
    return null;
  }

  const types = getTypesForLevel(levelSlug);

  return (
    <DeckSelect
      id="type-select"
      label="Type"
      value={value}
      placeholder="Choose a content pack"
      options={types.map((type) => ({
        value: type.slug,
        label: type.name,
      }))}
      onChange={onChange}
    />
  );
}
