/*
  Warnings:

  - A unique constraint covering the columns `[name,providerId]` on the table `stock` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "stock_name_key";

-- AlterTable
ALTER TABLE "stock" ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "stock_name_providerId_key" ON "stock"("name", "providerId");
