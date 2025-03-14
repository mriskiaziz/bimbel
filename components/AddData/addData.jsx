"use client";
import { useState, useEffect } from "react";
import TableComponent from "../Table/table";

export default function AddDataComponent({ listInput, collectionName }) {
  const [forms, setForms] = useState({});
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [isPostData, setIsPostData] = useState(false);
  const [globaldata, setglobalData] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const res = await fetch(`/api/items?collectionName=${collectionName}`);
      const data = await res.json();
      setglobalData(data);

      const initialFormState = listInput.reduce((acc, curr) => {
        acc[curr.name] = "";
        return acc;
      }, {});

      collectionName == "dataDiri"
        ? setForms(data[0])
        : setForms(initialFormState);
    };

    fetchItems();
  }, [collectionName, isPostData, listInput]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingUpload(true);
    // console.log(forms);

    const pushData = new FormData();
    pushData.append("data", JSON.stringify(forms));
    pushData.append("collection", JSON.stringify(collectionName));

    if (collectionName == "dataDiri") {
      pushData.append("id", forms.id);
      const res = await fetch("/api/items", {
        method: "PUT",
        body: pushData,
      });

      if (res.ok) {
        alert("Berhasil");
        setIsPostData(!isPostData);
      } else {
        alert("Gagal");
      }
    } else {
      const res = await fetch("/api/items", {
        method: "POST",
        body: pushData,
      });

      if (res.ok) {
        alert("Berhasil");
        setIsPostData(!isPostData);
      } else {
        alert("Gagal");
      }
    }

    setLoadingUpload(false);
  };

  const handleDeleteItem = async (id, imageUrl) => {
    await fetch("/api/items", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, imageUrl, collectionName }),
    });

    setIsPostData(!isPostData);
  };

  return (
    <div className=" block border border-black dark:border-white p-2 lg:p-8 mb-7 ">
      <h1 className="capitalize font-bold text-xl mb-4">{collectionName}</h1>

      <form onSubmit={handleSubmit} className="grid md:gap-4 md:grid-cols-3">
        {listInput.map((input, index) => (
          <div
            className={` mb-4 md:mb-0 ${
              input.type == "textarea" && "md:col-span-3"
            }`}
            key={index}
          >
            <label
              htmlFor={input.name}
              className="block text-base font-medium text-gray-700 mb-2 capitalize"
            >
              {input.name}
            </label>
            {input.type === "textarea" ? (
              <textarea
                id={input.name}
                name={input.name}
                value={forms[input.name] || ""}
                onChange={(e) =>
                  setForms({ ...forms, [input.name]: e.target.value })
                }
                className="w-full h-44 p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={`Masukkan ${input.name}`}
              />
            ) : (
              <input
                type={input.type}
                id={input.name}
                name={input.name}
                value={forms[input.name] || ""}
                onChange={(e) =>
                  setForms({ ...forms, [input.name]: e.target.value })
                }
                className="w-full p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={`Masukkan ${input.name}`}
              />
            )}
          </div>
        ))}

        <button
          type="submit"
          className="w-full mt-4 bg-prime bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loadingUpload}
        >
          {loadingUpload ? "Loading..." : "Submit"}
        </button>
      </form>

      {collectionName != "dataDiri" && (
        <div className="block overflow-x-auto whitespace-normal my-8">
          <TableComponent
            columns={listInput}
            data={globaldata}
            action={true}
            actionFunct={(item) => {
              return (
                <td className="border p-2">
                  <button
                    onClick={() => startEditing(item)}
                    className="bg-green-500 text-white p-2 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteItem(item.id, item.imageUrl)}
                    className="bg-red-500 text-white p-2 mr-2"
                  >
                    Delete
                  </button>
                </td>
              );
            }}
          />
        </div>
      )}
    </div>
  );
}
