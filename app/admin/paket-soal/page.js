"use client";
import React from "react";
import AddDataComponent from "@/components/AddData/addData";

export default function AdminPage() {
  return (
    <div className="container ">
      <AddDataComponent listInput={paketSoal} collectionName={`paketSoal`} />
    </div>
  );
}

const paketSoal = [
  {
    name: "namaPaket",
    type: "text",
    label: "Nama Paket",
    key: "namaPaket",
  },
  {
    name: "kategoriId",
    type: "select",
    label: "Kategori ID",
    key: "kategoriId",
    api: "kategoriSoal",
    indicator: "namaKategori",
  },
  {
    name: "jumlahSoal",
    type: "number",
    label: "Jumlah Soal",
    key: "jumlahSoal",
  },
  {
    name: "tanggalBerakhir",
    type: "datetime",
    label: "Tanggal Berakhir",
    key: "tanggalBerakhir",
  },
];
