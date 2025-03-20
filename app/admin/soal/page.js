"use client";
import React, { useState, useEffect } from "react";

export default function AdminPage() {
  const [form, setForm] = useState({
    paketId: "",
    kategoriId: "",
    soal: "",
    opsi: ["", "", "", ""], // Menyimpan opsi A, B, C, D
    jawabanBenar: "", // This will store the index of the correct answer
    gambarUrl: "",
  });

  const [paketOptions, setPaketOptions] = useState([]);
  const [kategoriOptions, setKategoriOptions] = useState([]);
  const [getid, setgetid] = useState(null);
  const [isPostData, setIsPostData] = useState(false);
  const [globalData, setglobalData] = useState([]);
  const [method, setmethod] = useState("POST");

  // Fetch data for paket and kategori options
  useEffect(() => {
    const fetchItems = async () => {
      const soalRes = await fetch("/api/items?collectionName=soal");
      const soalData = await soalRes.json();
      setglobalData(soalData);

      console.log(soalData);

      const paketRes = await fetch("/api/items?collectionName=paketSoal");
      const paketData = await paketRes.json();
      setPaketOptions(paketData);

      const kategoriRes = await fetch("/api/items?collectionName=kategoriSoal");
      const kategoriData = await kategoriRes.json();
      setKategoriOptions(kategoriData);
    };

    fetchItems();
  }, [isPostData]);

  const reset = () =>
    setForm({
      paketId: "",
      kategoriId: "",
      soal: "",
      opsi: ["", "", "", ""], // Reset opsi array
      jawabanBenar: "", // Reset jawabanBenar
      gambarUrl: "",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (method == "POST") {
      const res = await fetch("/api/soal", {
        method: "POST",
        body: JSON.stringify(form),
      });
      if (res.ok) {
        reset();
      }
    } else {
      getid &&
        (await fetch(`/api/soal?id=${getid}`, {
          method: "PATCH",
          body: JSON.stringify(form),
        }));
      reset();
    }

    setIsPostData(!isPostData);
  };

  const handleOpsiChange = (index, value) => {
    const updatedOpsi = [...form.opsi];
    updatedOpsi[index] = value;
    setForm({ ...form, opsi: updatedOpsi });
  };

  const handleJawabanBenarChange = (e) => {
    setForm({ ...form, jawabanBenar: e.target.value });
  };

  const nomorKeAbjad = (nomor) => {
    return String.fromCharCode(65 + nomor);
  };

  // Function to start editing
  const startEditing = (item) => {
    setgetid(item.id);
    setForm({
      paketId: item.paketId,
      kategoriId: item.kategoriId,
      soal: item.soal,
      opsi: item.opsi,
      jawabanBenar: item.jawabanBenar,
      gambarUrl: item.gambarUrl,
    });
    setmethod("PATCH");
  };

  const handleDeleteItem = async (id) => {
    await fetch(`/api/akses/data?model=akunPengguna&&id=${id}`, {
      method: "DELETE",
    });

    setIsPostData(!isPostData);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          {/* Paket ID */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Paket ID
            </label>
            <select
              value={form.paketId}
              onChange={(e) => setForm({ ...form, paketId: e.target.value })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            >
              <option value="">Select Paket</option>
              {paketOptions.map((paket) => (
                <option key={paket.id} value={paket.id}>
                  {paket.namaPaket}
                </option>
              ))}
            </select>
          </div>

          {/* Kategori ID */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Kategori ID
            </label>
            <select
              value={form.kategoriId}
              onChange={(e) => setForm({ ...form, kategoriId: e.target.value })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            >
              <option value="">Select Kategori</option>
              {kategoriOptions.map((kategori) => (
                <option key={kategori.id} value={kategori.id}>
                  {kategori.namaKategori}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Soal */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Soal
          </label>
          <input
            type="text"
            value={form.soal}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Soal"
            onChange={(e) => setForm({ ...form, soal: e.target.value })}
            required
          />
        </div>

        {/* Opsi */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Opsi
          </label>
          {form.opsi.map((opsi, index) => (
            <div key={index} className="mb-2">
              <input
                type="text"
                value={opsi}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={`Opsi ${String.fromCharCode(65 + index)}`}
                onChange={(e) => handleOpsiChange(index, e.target.value)}
                required
              />
            </div>
          ))}
        </div>

        {/* Jawaban Benar (Select berdasarkan opsi) */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Jawaban Benar
          </label>
          <select
            value={form.jawabanBenar}
            onChange={handleJawabanBenarChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          >
            <option value="">Select Jawaban Benar</option>
            {form.opsi.map((_, index) => (
              <option key={index} value={index}>
                {String.fromCharCode(65 + index)} {/* Display A, B, C, D */}
              </option>
            ))}
          </select>
        </div>

        {/* Gambar URL */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Gambar URL
          </label>
          <input
            type="text"
            value={form.gambarUrl}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Gambar URL (Opsional)"
            onChange={(e) => setForm({ ...form, gambarUrl: e.target.value })}
          />
        </div>

        <button
          type="submit"
          className="text-white cursor-pointer bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>

      <div className="block overflow-x-auto whitespace-normal my-8">
        <div>
          <table id="default-table" className="mt-10 w-full">
            <thead>
              <tr>
                <th scope="col" className="px-2 py-2 border ">
                  No
                </th>
                {columns.map((col, i) => (
                  <th
                    key={i}
                    scope="col"
                    className="px-6 py-3 border whitespace-nowrap"
                  >
                    {col.label}
                  </th>
                ))}

                <th scope="col" className="px-6 py-3 border text-nowrap">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {globalData.map((item, i) => (
                <tr key={item.id}>
                  <td className="border">
                    <div className=" flex justify-center items-center">
                      {i + 1}
                    </div>
                  </td>
                  {columns.map((col, i) => (
                    <td key={i} className="border p-2 ">
                      {col.key === "imageUrl" ? (
                        item.imageUrl ? (
                          <Image
                            src={item.imageUrl}
                            alt={item.name}
                            width={50}
                            height={100}
                          />
                        ) : (
                          "No image"
                        )
                      ) : col.key === "opsi" ? (
                        item[col.key].map((e, j) => (
                          <div className=" text-nowrap" key={j}>
                            {nomorKeAbjad(j)} {"."} {e} <br />
                          </div>
                        ))
                      ) : col.key === "jawabanBenar" ? (
                        <div className=" text-center">
                          {nomorKeAbjad(parseInt(item[col.key]))}
                        </div>
                      ) : (
                        item[col.key]
                      )}
                    </td>
                  ))}

                  <td className="border p-2 whitespace-nowrap">
                    <button
                      onClick={() => startEditing(item)}
                      className="bg-green-500 text-white p-2 mr-2 cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteItem(item.id, item.gambarUrl)}
                      className="bg-red-500 text-white p-2 mr-2 cursor-pointer"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const columns = [
  { label: "Paket ID", key: "paketId" },
  { label: "Kategori ID", key: "kategoriId" },
  { label: "Soal", key: "soal" },
  { label: "Opsi", key: "opsi" },
  { label: "Jawaban Benar", key: "jawabanBenar" },
  { label: "Gambar", key: "gambarUrl" },
];
