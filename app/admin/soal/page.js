"use client";
import React from "react";
import AddDataComponent from "@/components/AddData/addData";

export default function AdminPage() {
  return (
    <div className="container lg:px-24">
      <AddDataComponent listInput={soal} collectionName={`soal`} />
    </div>
  );
}

const soal = [
  {
    name: "id",
    type: "uuid",
    label: "ID",
    key: "id",
  },
  {
    name: "paketId",
    type: "uuid",
    label: "Paket ID",
    key: "paketId",
  },
  {
    name: "kategoriId",
    type: "uuid",
    label: "Kategori ID",
    key: "kategoriId",
  },
  {
    name: "soal",
    type: "text",
    label: "Soal",
    key: "soal",
  },
  {
    name: "opsiA",
    type: "text",
    label: "Opsi A",
    key: "opsiA",
  },
  {
    name: "opsiB",
    type: "text",
    label: "Opsi B",
    key: "opsiB",
  },
  {
    name: "opsiC",
    type: "text",
    label: "Opsi C",
    key: "opsiC",
  },
  {
    name: "opsiD",
    type: "text",
    label: "Opsi D",
    key: "opsiD",
  },
  {
    name: "jawabanBenar",
    type: "text",
    label: "Jawaban Benar",
    key: "jawabanBenar",
  },
  {
    name: "gambarUrl",
    type: "text",
    label: "Gambar URL",
    key: "gambarUrl",
  },
  {
    name: "paket",
    type: "relation",
    label: "Paket",
    key: "paket",
  },
  {
    name: "kategori",
    type: "relation",
    label: "Kategori",
    key: "kategori",
  },
];
