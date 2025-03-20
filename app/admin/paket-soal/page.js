"use client";
import React from "react";
import AddDataComponent from "@/components/AddData/addData";

export default function AdminPage() {
  return (
    <div className="container ">
      <AddDataComponent
        listInput={paketSoal}
        collectionName={`paketSoal`}
        url="/admin/soal"
      />
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
];
