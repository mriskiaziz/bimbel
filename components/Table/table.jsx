"use client";

import Image from "next/image";

export default function TableComponent({ data, columns, action, actionFunct }) {
  return (
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

            {action && (
              <th scope="col" className="px-6 py-3 border text-nowrap">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            <tr key={item.id}>
              <td className="border">
                <div className=" flex justify-center items-center">{i + 1}</div>
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
                  ) : (
                    item[col.key]
                  )}
                </td>
              ))}
              {action && actionFunct(item)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
