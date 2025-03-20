import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid"; // Import uuid untuk menghasilkan UUID

const prisma = new PrismaClient();

async function main() {
  // // Tambahkan kategori soal
  // const kategoriTWK = await prisma.kategoriSoal.create({
  //   data: {
  //     id: uuidv4(), // Menetapkan UUID secara manual
  //     namaKategori: "TWK",
  //     deskripsi: "Tes Wawasan Kebangsaan",
  //   },
  // });

  // // Tambahkan paket soal
  // const paket = await prisma.paketSoal.create({
  //   data: {
  //     id: uuidv4(), // Menetapkan UUID secara manual
  //     namaPaket: "Paket 1",
  //     kategoriId: kategoriTWK.id,
  //     jumlahSoal: 10,
  //   },
  // });

  // // Tambahkan soal
  // await prisma.soal.create({
  //   data: {
  //     id: uuidv4(), // Menetapkan UUID secara manual
  //     soal: "Apa ibu kota Indonesia?",
  //     opsi: ["Jakarta", "Bali", "Surabaya", "Bandung"], // Array opsi
  //     jawabanBenar: "Jakarta",
  //     gambarUrl: "", // Tidak ada gambar
  //     paketId: paket.id,
  //     kategoriId: kategoriTWK.id,
  //   },
  // });

  // Menambahkan akun admin
  const hashedAdminPassword = await bcrypt.hash("adminpassword", 10); // Hash password

  const admin = await prisma.akunPengguna.create({
    data: {
      id: uuidv4(), // Menetapkan UUID secara manual
      username: "adminuser",
      password: hashedAdminPassword, // Password yang telah di-hash
      role: "admin",
      email: "admin@example.com",
      nama: "Admin User",
    },
  });

  // // Menambahkan akun siswa
  // const hashedSiswaPassword = await bcrypt.hash("siswapassword", 10); // Hash password

  // const siswa = await prisma.akunPengguna.create({
  //   data: {
  //     id: uuidv4(), // Menetapkan UUID secara manual
  //     username: "siswabray",
  //     password: hashedSiswaPassword, // Password yang telah di-hash
  //     role: "siswa",
  //     email: "siswa@example.com",
  //     nama: "Siswa Bray",
  //   },
  // });

  // // Menambahkan hasil skor untuk siswa
  // await prisma.hasilScore.create({
  //   data: {
  //     id: uuidv4(), // Menetapkan UUID secara manual
  //     siswaId: siswa.id,
  //     paketId: paket.id,
  //     score: 80, // Asumsikan siswa mendapatkan skor 80
  //   },
  // });

  console.log("Data seeded successfully!");
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
