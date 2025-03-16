"use client";
import React from "react";
import AddDataComponent from "@/components/AddData/addData";

export default function AdminPage() {
  return (
    <div className="container">
      <AddDataComponent listInput={hasilScore} collectionName={`hasilScore`} />
    </div>
  );
}

const hasilScore = [
  {
    name: "siswaId",
    type: "select",
    label: "Siswa ID",
    key: "siswaId",
    api: "akunPengguna",
    indicator: "email",
  },
  {
    name: "paketId",
    type: "select",
    label: "Paket ID",
    key: "paketId",
    api: "PaketSoal",
    indicator: "namaPaket",
  },
  {
    name: "score",
    type: "number",
    label: "Score",
    key: "score",
  },
];
