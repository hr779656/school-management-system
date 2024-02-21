-- CreateTable
CREATE TABLE "_Enrollment" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_Enrollment_AB_unique" ON "_Enrollment"("A", "B");

-- CreateIndex
CREATE INDEX "_Enrollment_B_index" ON "_Enrollment"("B");

-- AddForeignKey
ALTER TABLE "_Enrollment" ADD CONSTRAINT "_Enrollment_A_fkey" FOREIGN KEY ("A") REFERENCES "Courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Enrollment" ADD CONSTRAINT "_Enrollment_B_fkey" FOREIGN KEY ("B") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
