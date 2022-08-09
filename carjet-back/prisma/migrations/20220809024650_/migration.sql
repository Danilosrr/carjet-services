/*
  Warnings:

  - You are about to drop the column `code` on the `stock` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `stock` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `Info` to the `stock` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "stock" DROP COLUMN "code",
ADD COLUMN     "Info" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "stock_name_key" ON "stock"("name");
