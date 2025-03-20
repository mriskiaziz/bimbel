"use client";
import AddDataComponent from "@/components/AddData/addData";
import { useState, useEffect } from "react";
import TableComponent from "@/components/Table/table";

export default function AdminPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    nama: "",
    username: "",
    role: "",
  });
  const [globaldata, setglobaldata] = useState([]);
  const [isPostData, setisPostData] = useState(false);
  const [method, setmethod] = useState("POST");

  useEffect(() => {
    const fetchItems = async () => {
      const res = await fetch(`/api/items?collectionName=akunPengguna`);
      const data = await res.json();
      setglobaldata(data);
    };

    fetchItems();
  }, [isPostData]);

  const reset = () =>
    setForm({
      email: "",
      password: "",
      nama: "",
      username: "",
      role: "",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (method == "POST") {
      const res = await fetch("/api/akun", {
        method: "POST",
        body: JSON.stringify(form),
      });
      reset();
    } else if (method == "PATCH") {
      const getId = form.id;
      const temp = form;
      const res = await fetch(`/api/akun?id=${getId}`, {
        method: "PATCH",
        body: JSON.stringify(temp),
      });
      reset();
    }

    setisPostData(!isPostData);
  };

  const handleDeleteItem = async (id) => {
    await fetch(`/api/akses/data?model=akunPengguna&&id=${id}`, {
      method: "DELETE",
    });

    setisPostData(!isPostData);
  };

  const handleEditing = async (item) => {
    setForm(item);
    setmethod("PATCH");
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Email
            </label>
            <input
              type="email"
              value={form.email}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Email"
              onChange={(e) => {
                setForm({ ...form, email: e.target.value });
              }}
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Password
            </label>
            <input
              type="text"
              value={form.password}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Nama Lengkap"
              onChange={(e) => {
                setForm({ ...form, password: e.target.value });
              }}
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Nama Lengkap
            </label>
            <input
              type="text"
              value={form.nama}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Nama Lengkap"
              onChange={(e) => {
                setForm({ ...form, nama: e.target.value });
              }}
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Username
            </label>
            <input
              type="text"
              value={form.username}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Username"
              onChange={(e) => {
                setForm({ ...form, username: e.target.value });
              }}
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Role
            </label>
            <select
              value={form.role}
              onChange={(e) => {
                setForm({ ...form, role: e.target.value });
              }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">Pilih Role</option>
              <option value="admin">Admin</option>
              <option value="siswa">Siswa</option>
            </select>
          </div>
        </div>
        <button
          type="submit"
          className="text-white cursor-pointer bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>

      <div className="block overflow-x-auto whitespace-normal my-8">
        <TableComponent
          columns={akunPengguna}
          data={globaldata}
          action={true}
          actionFunct={(item) => (
            <td className="border p-2 whitespace-nowrap">
              <button
                onClick={() => handleEditing(item)}
                className="bg-green-500 text-white p-2 mr-2 cursor-pointer"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteItem(item.id)}
                className="bg-red-500 text-white p-2 mr-2 cursor-pointer"
              >
                Delete
              </button>
            </td>
          )}
        />
      </div>
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
  {
    name: "role",
    type: "select",
    label: "role",
    key: "role",
    api: "role",
  },
];
