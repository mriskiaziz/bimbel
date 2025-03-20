"use client";
import React from "react";
import AddDataComponent from "@/components/AddData/addData";

export default function AdminPage() {
  return (
    <div className="container ">
      <AddDataComponent listInput={exam} collectionName={`exam`} />
    </div>
  );
}

const exam = [
  {
    name: "paketId",
    type: "select",
    label: "Paket ID",
    key: "paketId",
    api: "paketSoal",
    indicator: "namaPaket",
  },
  {
    name: "siswaId",
    type: "select",
    label: "Siswa ID",
    key: "siswaId",
    api: "akunPengguna",
    indicator: "email",
  },
  {
    name: "duration",
    type: "number",
    label: "duration",
    key: "duration",
  },
];
