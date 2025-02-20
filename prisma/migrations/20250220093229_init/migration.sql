-- CreateTable
CREATE TABLE "GameImage" (
    "id" SERIAL NOT NULL,
    "src" TEXT NOT NULL,
    "gameId" INTEGER NOT NULL,

    CONSTRAINT "GameImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConsoleImage" (
    "id" SERIAL NOT NULL,
    "src" TEXT NOT NULL,
    "consoleId" INTEGER NOT NULL,

    CONSTRAINT "ConsoleImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gender" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "gameId" INTEGER NOT NULL,

    CONSTRAINT "Gender_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PEGI" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "gameId" INTEGER NOT NULL,

    CONSTRAINT "PEGI_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Game" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "stars" INTEGER NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Console" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "stars" INTEGER NOT NULL,

    CONSTRAINT "Console_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GameImage" ADD CONSTRAINT "GameImage_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConsoleImage" ADD CONSTRAINT "ConsoleImage_consoleId_fkey" FOREIGN KEY ("consoleId") REFERENCES "Console"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gender" ADD CONSTRAINT "Gender_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PEGI" ADD CONSTRAINT "PEGI_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
