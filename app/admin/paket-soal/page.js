"use client";
import React from "react";
import AddDataComponent from "@/components/AddData/addData";

export default function AdminPage() {
  return (
    <div className="container lg:px-24">
      <AddDataComponent listInput={paketSoal} collectionName={`paketSoal`} />
    </div>
  );
}

const paketSoal = [
  {
    name: "id",
    type: "uuid",
    label: "ID",
    key: "id",
  },
  {
    name: "namaPaket",
    type: "text",
    label: "Nama Paket",
    key: "namaPaket",
  },
  {
    name: "kategoriId",
    type: "uuid",
    label: "Kategori ID",
    key: "kategoriId",
  },
  {
    name: "jumlahSoal",
    type: "number",
    label: "Jumlah Soal",
    key: "jumlahSoal",
  },
  {
    name: "tanggalDibuat",
    type: "datetime",
    label: "Tanggal Dibuat",
    key: "tanggalDibuat",
  },
  {
    name: "tanggalBerakhir",
    type: "datetime",
    label: "Tanggal Berakhir",
    key: "tanggalBerakhir",
  },
  {
    name: "kategori",
    type: "relation",
    label: "Kategori",
    key: "kategori",
  },
  {
    name: "soals",
    type: "array",
    label: "Soals",
    key: "soals",
  },
  {
    name: "hasilScores",
    type: "array",
    label: "Hasil Score",
    key: "hasilScores",
  },
];
