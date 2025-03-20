"use client";
import React from "react";
import AddDataComponent from "@/components/AddData/addData";

export default function AdminPage() {
  return (
    <div className="container">
      <AddDataComponent
        listInput={kategoriSoal}
        collectionName={`kategoriSoal`}
      />
    </div>
  );
}

const kategoriSoal = [
  {
    name: "namaKategori",
    type: "text",
    label: "namaKategori",
    key: "namaKategori",
  },
  { name: "deskripsi", type: "text", label: "deskripsi", key: "deskripsi" },
];
