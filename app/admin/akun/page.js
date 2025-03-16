"use client";
import React from "react";
import AddDataComponent from "@/components/AddData/addData";

export default function AdminPage() {
  return (
    <div className="container">
      <AddDataComponent
        listInput={akunPengguna}
        collectionName={`akunPengguna`}
      />
    </div>
  );
}

const akunPengguna = [
  {
    name: "username",
    type: "uuid",
    label: "username",
    key: "username",
  },
  {
    name: "password",
    type: "uuid",
    label: "password",
    key: "password",
  },
  {
    name: "role",
    type: "select",
    label: "role",
    key: "role",
    api: "role",
  },
  {
    name: "email",
    type: "datetime",
    label: "email",
    key: "email",
  },
  {
    name: "nama",
    type: "relation",
    label: "nama",
    key: "nama",
  },
];
