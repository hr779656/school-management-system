/*
  Warnings:

  - Made the column `image` on table `Courses` required. This step will fail if there are existing NULL values in that column.
  - Made the column `price` on table `Courses` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Courses" ALTER COLUMN "image" SET NOT NULL,
ALTER COLUMN "image" SET DEFAULT 'will added later',
ALTER COLUMN "price" SET NOT NULL,
ALTER COLUMN "price" SET DEFAULT 10;
