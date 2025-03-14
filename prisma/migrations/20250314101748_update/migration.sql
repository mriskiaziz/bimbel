/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `AkunPengguna` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "AkunPengguna_username_key";

-- CreateIndex
CREATE UNIQUE INDEX "AkunPengguna_email_key" ON "AkunPengguna"("email");
