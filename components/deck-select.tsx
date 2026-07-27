"use client";

import type { ReactNode } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export type DeckSelectOption = {
  value: string;
  label: ReactNode;
};

type DeckSelectProps = {
  id: string;
  label: string;
  value: string | null;
  placeholder: string;
  options: DeckSelectOption[];
  disabled?: boolean;
  onChange: (value: string) => void;
};

export function DeckSelect({
  id,
  label,
  value,
  placeholder,
  options,
  disabled = false,
  onChange,
}: DeckSelectProps) {
  return (
    <div className="deck-select">
      <Label htmlFor={id} className="deck-select__label">
        {label}
      </Label>
      <Select
        value={value ?? ""}
        onValueChange={(nextValue) => {
          if (nextValue) onChange(nextValue);
        }}
        disabled={disabled}
      >
        <SelectTrigger id={id} className="deck-select__trigger">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent
          className="deck-select__content"
          align="start"
          alignItemWithTrigger
        >
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
