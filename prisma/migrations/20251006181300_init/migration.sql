-- CreateTable
CREATE TABLE "Manga" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "genre" TEXT NOT NULL,
    "year" INTEGER,
    "pages" INTEGER,
    "rating" INTEGER,
    "synopsis" TEXT,
    "cover" TEXT,
    "status" TEXT NOT NULL DEFAULT 'QUERO_LER',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
