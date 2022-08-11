/*
  Warnings:

  - You are about to drop the column `branchId` on the `services` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name,code]` on the table `services` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `providerId` to the `branches` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "services" DROP CONSTRAINT "services_branchId_fkey";

-- DropIndex
DROP INDEX "stock_providerId_key";

-- AlterTable
ALTER TABLE "branches" ADD COLUMN     "providerId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "services" DROP COLUMN "branchId";

-- CreateIndex
CREATE UNIQUE INDEX "services_name_code_key" ON "services"("name", "code");

-- AddForeignKey
ALTER TABLE "branches" ADD CONSTRAINT "branches_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "providers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
