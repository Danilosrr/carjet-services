/*
  Warnings:

  - A unique constraint covering the columns `[providerId]` on the table `stock` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "stock_providerId_key" ON "stock"("providerId");
