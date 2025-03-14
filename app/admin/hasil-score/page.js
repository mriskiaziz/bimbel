"use client";
import React from "react";
import AddDataComponent from "@/components/AddData/addData";

export default function AdminPage() {
  return (
    <div className="container lg:px-24">
      <AddDataComponent listInput={hasilScore} collectionName={`hasilScore`} />
    </div>
  );
}

const hasilScore = [
  {
    name: "id",
    type: "uuid",
    label: "ID",
    key: "id",
  },
  {
    name: "siswaId",
    type: "uuid",
    label: "Siswa ID",
    key: "siswaId",
  },
  {
    name: "paketId",
    type: "uuid",
    label: "Paket ID",
    key: "paketId",
  },
  {
    name: "score",
    type: "number",
    label: "Score",
    key: "score",
  },
  {
    name: "tanggal",
    type: "datetime",
    label: "Tanggal",
    key: "tanggal",
  },
  {
    name: "siswa",
    type: "relation",
    label: "Siswa",
    key: "siswa",
  },
  {
    name: "paket",
    type: "relation",
    label: "Paket",
    key: "paket",
  },
];
