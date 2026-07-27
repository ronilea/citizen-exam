"use server";

import { prisma } from "@/lib/prisma";
import { getLevelBySlug, isValidSelection } from "@/lib/taxonomy";

export type FlashcardPair = {
  id: string;
  hebrew: string;
  english: string;
};

export async function fetchFlashcards(
  levelSlug: string,
  typeSlug: string | null,
): Promise<FlashcardPair[]> {
  if (!isValidSelection(levelSlug, typeSlug)) {
    return [];
  }

  const level = getLevelBySlug(levelSlug)!;

  return prisma.flashcard.findMany({
    where: {
      level: { slug: levelSlug },
      ...(level.hasTypes && typeSlug
        ? { type: { slug: typeSlug } }
        : { typeId: null }),
    },
    orderBy: { sortOrder: "asc" },
    select: {
      id: true,
      hebrew: true,
      english: true,
    },
  });
}
