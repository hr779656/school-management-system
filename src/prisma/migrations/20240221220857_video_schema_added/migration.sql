-- CreateTable
CREATE TABLE "Videos" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Videos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_VideoCourseRelation" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_VideoCourseRelation_AB_unique" ON "_VideoCourseRelation"("A", "B");

-- CreateIndex
CREATE INDEX "_VideoCourseRelation_B_index" ON "_VideoCourseRelation"("B");

-- AddForeignKey
ALTER TABLE "_VideoCourseRelation" ADD CONSTRAINT "_VideoCourseRelation_A_fkey" FOREIGN KEY ("A") REFERENCES "Courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_VideoCourseRelation" ADD CONSTRAINT "_VideoCourseRelation_B_fkey" FOREIGN KEY ("B") REFERENCES "Videos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
