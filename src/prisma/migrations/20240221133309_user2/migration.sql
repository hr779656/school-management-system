/*
  Warnings:

  - Added the required column `city` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "status" BOOLEAN DEFAULT false;
