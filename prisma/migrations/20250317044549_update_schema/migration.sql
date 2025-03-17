/*
  Warnings:

  - You are about to drop the column `opsiA` on the `Soal` table. All the data in the column will be lost.
  - You are about to drop the column `opsiB` on the `Soal` table. All the data in the column will be lost.
  - You are about to drop the column `opsiC` on the `Soal` table. All the data in the column will be lost.
  - You are about to drop the column `opsiD` on the `Soal` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Soal" DROP COLUMN "opsiA",
DROP COLUMN "opsiB",
DROP COLUMN "opsiC",
DROP COLUMN "opsiD",
ADD COLUMN     "opsi" TEXT[];
