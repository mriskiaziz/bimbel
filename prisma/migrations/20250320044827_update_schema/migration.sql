/*
  Warnings:

  - You are about to drop the column `jumlahSoal` on the `PaketSoal` table. All the data in the column will be lost.
  - You are about to drop the column `kategoriId` on the `PaketSoal` table. All the data in the column will be lost.
  - You are about to drop the column `tanggalBerakhir` on the `PaketSoal` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "PaketSoal" DROP CONSTRAINT "PaketSoal_kategoriId_fkey";

-- AlterTable
ALTER TABLE "PaketSoal" DROP COLUMN "jumlahSoal",
DROP COLUMN "kategoriId",
DROP COLUMN "tanggalBerakhir";

-- CreateTable
CREATE TABLE "Exam" (
    "id" TEXT NOT NULL,
    "paketId" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "siswaId" TEXT NOT NULL,

    CONSTRAINT "Exam_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Exam" ADD CONSTRAINT "Exam_siswaId_fkey" FOREIGN KEY ("siswaId") REFERENCES "AkunPengguna"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exam" ADD CONSTRAINT "Exam_paketId_fkey" FOREIGN KEY ("paketId") REFERENCES "PaketSoal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
