-- CreateTable
CREATE TABLE "Item" (
    "id" SERIAL NOT NULL,
    "name_rus" TEXT NOT NULL,
    "name_eng" TEXT NOT NULL,
    "homebrew" BOOLEAN NOT NULL,
    "price" TEXT,
    "source" TEXT NOT NULL,
    "weight" TEXT,
    "description" TEXT,
    "categories" TEXT[],
    "icon" TEXT,
    "world_id" BIGINT,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "World" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "sources" TEXT[],

    CONSTRAINT "World_pkey" PRIMARY KEY ("id")
);
