-- CreateTable
CREATE TABLE "languages" (
    "id" SMALLSERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "languages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tools" (
    "id" SMALLSERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "tools_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_heroesTolanguages" (
    "A" BIGINT NOT NULL,
    "B" SMALLINT NOT NULL
);

-- CreateTable
CREATE TABLE "_heroesTotools" (
    "A" BIGINT NOT NULL,
    "B" SMALLINT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_heroesTolanguages_AB_unique" ON "_heroesTolanguages"("A", "B");

-- CreateIndex
CREATE INDEX "_heroesTolanguages_B_index" ON "_heroesTolanguages"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_heroesTotools_AB_unique" ON "_heroesTotools"("A", "B");

-- CreateIndex
CREATE INDEX "_heroesTotools_B_index" ON "_heroesTotools"("B");

-- AddForeignKey
ALTER TABLE "_heroesTolanguages" ADD CONSTRAINT "_heroesTolanguages_A_fkey" FOREIGN KEY ("A") REFERENCES "heroes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_heroesTolanguages" ADD CONSTRAINT "_heroesTolanguages_B_fkey" FOREIGN KEY ("B") REFERENCES "languages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_heroesTotools" ADD CONSTRAINT "_heroesTotools_A_fkey" FOREIGN KEY ("A") REFERENCES "heroes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_heroesTotools" ADD CONSTRAINT "_heroesTotools_B_fkey" FOREIGN KEY ("B") REFERENCES "tools"("id") ON DELETE CASCADE ON UPDATE CASCADE;
