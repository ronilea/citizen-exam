export const TIERS = ["Foundation", "Flow", "Freedom"] as const;
export type Tier = (typeof TIERS)[number];

export type Level = {
  slug: string;
  name: string;
  tier: Tier;
  sortOrder: number;
  color: string;
  hasTypes: boolean;
};

export type ContentType = {
  slug: string;
  name: string;
  sortOrder: number;
};

export const LEVELS: Level[] = [
  { slug: "red", name: "Red", tier: "Foundation", sortOrder: 1, color: "#E53935", hasTypes: false },
  { slug: "orange", name: "Orange", tier: "Foundation", sortOrder: 2, color: "#FB8C00", hasTypes: false },
  { slug: "pink", name: "Pink", tier: "Foundation", sortOrder: 3, color: "#EC407A", hasTypes: false },
  { slug: "yellow", name: "Yellow", tier: "Foundation", sortOrder: 4, color: "#FDD835", hasTypes: false },
  { slug: "light-blue", name: "Light Blue", tier: "Flow", sortOrder: 5, color: "#4FC3F7", hasTypes: false },
  { slug: "blue", name: "Blue", tier: "Flow", sortOrder: 6, color: "#1E88E5", hasTypes: false },
  { slug: "lime", name: "Lime", tier: "Flow", sortOrder: 7, color: "#C0CA33", hasTypes: false },
  { slug: "green", name: "Green", tier: "Flow", sortOrder: 8, color: "#43A047", hasTypes: false },
  { slug: "dark-green", name: "Dark Green", tier: "Freedom", sortOrder: 9, color: "#2E7D32", hasTypes: true },
  { slug: "turquoise", name: "Turquoise", tier: "Freedom", sortOrder: 10, color: "#26A69A", hasTypes: true },
  { slug: "indigo", name: "Indigo", tier: "Freedom", sortOrder: 11, color: "#5C6BC0", hasTypes: true },
  { slug: "purple", name: "Purple", tier: "Freedom", sortOrder: 12, color: "#8E24AA", hasTypes: false },
];

const TYPES_BY_LEVEL: Record<string, ContentType[]> = {
  "dark-green": buildTypes(4),
  turquoise: buildTypes(4),
  indigo: buildTypes(6),
};

function buildTypes(count: number): ContentType[] {
  return Array.from({ length: count }, (_, i) => ({
    slug: `pack-${i + 1}`,
    name: `Pack ${i + 1}`,
    sortOrder: i + 1,
  }));
}

export function getLevelsForTier(tier: Tier): Level[] {
  return LEVELS.filter((level) => level.tier === tier);
}

export function getLevelBySlug(slug: string): Level | undefined {
  return LEVELS.find((level) => level.slug === slug);
}

export function getTypesForLevel(levelSlug: string): ContentType[] {
  return TYPES_BY_LEVEL[levelSlug] ?? [];
}

export function getTypeBySlug(
  levelSlug: string,
  typeSlug: string,
): ContentType | undefined {
  return getTypesForLevel(levelSlug).find((type) => type.slug === typeSlug);
}

export function isValidSelection(
  levelSlug: string,
  typeSlug: string | null,
): boolean {
  const level = getLevelBySlug(levelSlug);
  if (!level) return false;

  if (!level.hasTypes) return typeSlug === null;

  return typeSlug !== null && getTypeBySlug(levelSlug, typeSlug) !== undefined;
}
