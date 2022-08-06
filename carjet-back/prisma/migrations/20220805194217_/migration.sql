/*
  Warnings:

  - Made the column `location` on table `branches` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "branches" ALTER COLUMN "location" SET NOT NULL;
