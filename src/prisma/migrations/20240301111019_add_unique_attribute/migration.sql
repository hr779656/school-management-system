/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `UserCourseProgress` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserCourseProgress_userId_key" ON "UserCourseProgress"("userId");
