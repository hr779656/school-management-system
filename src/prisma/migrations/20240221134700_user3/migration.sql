/*
  Warnings:

  - You are about to drop the column `statuss` on the `Users` table. All the data in the column will be lost.

*/
-- AlterTable
-- ALTER TABLE "Users" DROP COLUMN "statuss",
-- ADD COLUMN     "status" BOOLEAN DEFAULT false;
-- RENAME "statuss" TO "status"

ALTER TABLE "Users"
RENAME COLUMN "statuss" TO "status";
