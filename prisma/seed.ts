import "dotenv/config";

import { prisma } from "../lib/prisma";
import {
  LEVELS,
  getTypesForLevel,
} from "../lib/taxonomy";
import { seedData } from "../seed/data";

async function main() {
  console.log("Seeding database...");

  await prisma.flashcard.deleteMany();
  await prisma.contentType.deleteMany();
  await prisma.level.deleteMany();

  const levelIdBySlug = new Map<string, string>();
  const typeIdByKey = new Map<string, string>();

  for (const level of LEVELS) {
    const created = await prisma.level.create({
      data: {
        slug: level.slug,
        name: level.name,
        tier: level.tier,
        sortOrder: level.sortOrder,
        hasTypes: level.hasTypes,
      },
    });

    levelIdBySlug.set(level.slug, created.id);

    for (const contentType of getTypesForLevel(level.slug)) {
      const createdType = await prisma.contentType.create({
        data: {
          slug: contentType.slug,
          name: contentType.name,
          sortOrder: contentType.sortOrder,
          levelId: created.id,
        },
      });

      typeIdByKey.set(`${level.slug}:${contentType.slug}`, createdType.id);
    }
  }

  let cardCount = 0;

  for (const pack of seedData) {
    const level = LEVELS.find((entry) => entry.name === pack.level);
    if (!level) {
      throw new Error(`Unknown level in seed data: ${pack.level}`);
    }

    const levelId = levelIdBySlug.get(level.slug);
    if (!levelId) {
      throw new Error(`Missing level id for: ${level.slug}`);
    }

    let typeId: string | null = null;

    if (pack.type) {
      const contentType = getTypesForLevel(level.slug).find(
        (entry) => entry.name === pack.type,
      );

      if (!contentType) {
        throw new Error(
          `Unknown type "${pack.type}" for level "${pack.level}" in seed data`,
        );
      }

      typeId = typeIdByKey.get(`${level.slug}:${contentType.slug}`) ?? null;

      if (!typeId) {
        throw new Error(
          `Missing type id for ${level.slug}:${contentType.slug}`,
        );
      }
    } else if (level.hasTypes) {
      throw new Error(`Level "${pack.level}" requires a type in seed data`);
    }

    for (const [index, pair] of pack.pairs.entries()) {
      await prisma.flashcard.create({
        data: {
          hebrew: pair.hebrew,
          english: pair.english,
          sortOrder: index + 1,
          levelId,
          typeId,
        },
      });
      cardCount += 1;
    }
  }

  console.log(`Seeded ${levelIdBySlug.size} levels.`);
  console.log(`Seeded ${typeIdByKey.size} content types.`);
  console.log(`Seeded ${cardCount} flashcards.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
