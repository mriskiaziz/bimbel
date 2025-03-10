-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'siswa');

-- CreateTable
CREATE TABLE "KategoriSoal" (
    "id" SERIAL NOT NULL,
    "namaKategori" TEXT NOT NULL,
    "deskripsi" TEXT,

    CONSTRAINT "KategoriSoal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaketSoal" (
    "id" SERIAL NOT NULL,
    "namaPaket" TEXT NOT NULL,
    "kategoriId" INTEGER NOT NULL,
    "jumlahSoal" INTEGER NOT NULL,
    "tanggalDibuat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tanggalBerakhir" TIMESTAMP(3),

    CONSTRAINT "PaketSoal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Soal" (
    "id" SERIAL NOT NULL,
    "paketId" INTEGER NOT NULL,
    "kategoriId" INTEGER NOT NULL,
    "soal" TEXT NOT NULL,
    "opsiA" TEXT NOT NULL,
    "opsiB" TEXT NOT NULL,
    "opsiC" TEXT NOT NULL,
    "opsiD" TEXT NOT NULL,
    "jawabanBenar" TEXT NOT NULL,
    "gambarUrl" TEXT,

    CONSTRAINT "Soal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AkunPengguna" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "email" TEXT,
    "nama" TEXT NOT NULL,
    "tanggalDaftar" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AkunPengguna_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HasilScore" (
    "id" SERIAL NOT NULL,
    "siswaId" INTEGER NOT NULL,
    "paketId" INTEGER NOT NULL,
    "score" INTEGER NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HasilScore_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AkunPengguna_username_key" ON "AkunPengguna"("username");

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
