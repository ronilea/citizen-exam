"use client";

import { DeckSelect } from "@/components/deck-select";
import { TIERS, type Tier } from "@/lib/taxonomy";

type TierSelectorProps = {
  value: Tier | null;
  onChange: (tier: Tier) => void;
};

export function TierSelector({ value, onChange }: TierSelectorProps) {
  return (
    <DeckSelect
      id="tier-select"
      label="Tier"
      value={value}
      placeholder="Choose a tier"
      options={TIERS.map((tier) => ({ value: tier, label: tier }))}
      onChange={(nextValue) => onChange(nextValue as Tier)}
    />
  );
}
