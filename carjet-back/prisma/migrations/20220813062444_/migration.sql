/*
  Warnings:

  - A unique constraint covering the columns `[name,code,providerId]` on the table `services` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "services_name_code_key";

-- CreateIndex
CREATE UNIQUE INDEX "services_name_code_providerId_key" ON "services"("name", "code", "providerId");
