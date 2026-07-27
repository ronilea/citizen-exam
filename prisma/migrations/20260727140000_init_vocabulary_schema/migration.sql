-- CreateTable
CREATE TABLE "Level" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "tier" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL,
    "hasTypes" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Level_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContentType" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL,
    "levelId" TEXT NOT NULL,

    CONSTRAINT "ContentType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Flashcard" (
    "id" TEXT NOT NULL,
    "hebrew" TEXT NOT NULL,
    "english" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL,
    "levelId" TEXT NOT NULL,
    "typeId" TEXT,

    CONSTRAINT "Flashcard_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Level_slug_key" ON "Level"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "ContentType_levelId_slug_key" ON "ContentType"("levelId", "slug");

-- CreateIndex
CREATE INDEX "Flashcard_levelId_typeId_idx" ON "Flashcard"("levelId", "typeId");

-- AddForeignKey
ALTER TABLE "ContentType" ADD CONSTRAINT "ContentType_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "Level"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flashcard" ADD CONSTRAINT "Flashcard_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "Level"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flashcard" ADD CONSTRAINT "Flashcard_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "ContentType"("id") ON DELETE CASCADE ON UPDATE CASCADE;
