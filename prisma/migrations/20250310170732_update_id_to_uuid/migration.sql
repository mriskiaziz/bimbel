/*
  Warnings:

  - The primary key for the `AkunPengguna` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `HasilScore` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `KategoriSoal` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `PaketSoal` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Soal` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "HasilScore" DROP CONSTRAINT "HasilScore_paketId_fkey";

-- DropForeignKey
ALTER TABLE "HasilScore" DROP CONSTRAINT "HasilScore_siswaId_fkey";

-- DropForeignKey
ALTER TABLE "PaketSoal" DROP CONSTRAINT "PaketSoal_kategoriId_fkey";

-- DropForeignKey
ALTER TABLE "Soal" DROP CONSTRAINT "Soal_kategoriId_fkey";

-- DropForeignKey
ALTER TABLE "Soal" DROP CONSTRAINT "Soal_paketId_fkey";

-- AlterTable
ALTER TABLE "AkunPengguna" DROP CONSTRAINT "AkunPengguna_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "AkunPengguna_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "AkunPengguna_id_seq";

-- AlterTable
ALTER TABLE "HasilScore" DROP CONSTRAINT "HasilScore_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "siswaId" SET DATA TYPE TEXT,
ALTER COLUMN "paketId" SET DATA TYPE TEXT,
ADD CONSTRAINT "HasilScore_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "HasilScore_id_seq";

-- AlterTable
ALTER TABLE "KategoriSoal" DROP CONSTRAINT "KategoriSoal_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "KategoriSoal_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "KategoriSoal_id_seq";

-- AlterTable
ALTER TABLE "PaketSoal" DROP CONSTRAINT "PaketSoal_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "kategoriId" SET DATA TYPE TEXT,
ADD CONSTRAINT "PaketSoal_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "PaketSoal_id_seq";

-- AlterTable
ALTER TABLE "Soal" DROP CONSTRAINT "Soal_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "paketId" SET DATA TYPE TEXT,
ALTER COLUMN "kategoriId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Soal_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Soal_id_seq";

-- AddForeignKey
ALTER TABLE "PaketSoal" ADD CONSTRAINT "PaketSoal_kategoriId_fkey" FOREIGN KEY ("kategoriId") REFERENCES "KategoriSoal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Soal" ADD CONSTRAINT "Soal_paketId_fkey" FOREIGN KEY ("paketId") REFERENCES "PaketSoal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Soal" ADD CONSTRAINT "Soal_kategoriId_fkey" FOREIGN KEY ("kategoriId") REFERENCES "KategoriSoal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HasilScore" ADD CONSTRAINT "HasilScore_siswaId_fkey" FOREIGN KEY ("siswaId") REFERENCES "AkunPengguna"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HasilScore" ADD CONSTRAINT "HasilScore_paketId_fkey" FOREIGN KEY ("paketId") REFERENCES "PaketSoal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
