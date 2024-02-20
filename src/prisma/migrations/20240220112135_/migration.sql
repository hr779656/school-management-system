/*
  Warnings:

  - You are about to drop the column `discription` on the `Courses` table. All the data in the column will be lost.
  - Added the required column `description` to the `Courses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Courses" DROP COLUMN "discription",
ADD COLUMN     "description" TEXT NOT NULL;
