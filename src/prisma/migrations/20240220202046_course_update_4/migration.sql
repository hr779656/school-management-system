/*
  Warnings:

  - Made the column `image` on table `Courses` required. This step will fail if there are existing NULL values in that column.
  - Made the column `price` on table `Courses` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
-- ALTER TABLE "Courses" ALTER COLUMN "image" SET NOT NULL,
-- ALTER COLUMN "price" SET NOT NULL;

-- Migration 1: Allow NULL values
ALTER TABLE "Courses" ALTER COLUMN "image" DROP NOT NULL;
ALTER TABLE "Courses" ALTER COLUMN "price" DROP NOT NULL;
