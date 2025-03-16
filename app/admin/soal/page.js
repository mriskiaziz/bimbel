"use client";
import React from "react";
import AddDataComponent from "@/components/AddData/addData";

export default function AdminPage() {
  return (
    <div className="container">
      <AddDataComponent listInput={soal} collectionName={`soal`} />
    </div>
  );
}

const soal = [
  {
    name: "paketId",
    type: "select",
    label: "Paket ID",
    key: "paketId",
    api: "PaketSoal",
    indicator: "namaPaket",
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
    name: "soal",
    type: "text",
    label: "Soal",
    key: "soal",
    api: null,
  },
  {
    name: "opsiA",
    type: "text",
    label: "Opsi A",
    key: "opsiA",
    api: null,
  },
  {
    name: "opsiB",
    type: "text",
    label: "Opsi B",
    key: "opsiB",
    api: null,
  },
  {
    name: "opsiC",
    type: "text",
    label: "Opsi C",
    key: "opsiC",
    api: null,
  },
  {
    name: "opsiD",
    type: "text",
    label: "Opsi D",
    key: "opsiD",
    api: null,
  },
  {
    name: "jawabanBenar",
    type: "text",
    label: "Jawaban Benar",
    key: "jawabanBenar",
    api: null,
  },
  {
    name: "gambarUrl",
    type: "text",
    label: "Gambar URL",
    key: "gambarUrl",
    api: null,
  },
];
