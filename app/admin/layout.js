"use client";
import { useState } from "react";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

function LayoutAdmin({ children }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900 shadow-lg ">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href="/admin"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Dashboard Admin
            </span>
          </a>
          <button
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            onClick={() => {
              setOpen(!open);
            }}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div
            className={`${open ? "" : "hidden"} w-full md:block md:w-auto`}
            id="navbar-default"
          >
            <ul className="font-medium items-center flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              {navbar_list.map((e, i) => {
                return (
                  <li key={i}>
                    <a
                      href={e.link}
                      className={`block py-2 px-3 ${
                        pathname == e.link ? "text-blue-500" : "text-gray-900"
                      } rounded capitalize hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent`}
                    >
                      {e.text}
                    </a>
                  </li>
                );
              })}

              <li className="flex bg-red-500 p-2 rounded-md text-white ">
                <button
                  onClick={() => {
                    signOut();
                  }}
                  className="block py-2 uppercase px-3  rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="px-3 py-10">{children}</div>
    </>
  );
}

const navbar_list = [
  {
    text: "kategori soal",
    link: "/admin",
  },
  {
    text: "soal",
    link: "/admin/soal",
  },
  {
    text: "paket soal",
    link: "/admin/paket-soal",
  },
  {
    text: "hasil score",
    link: "/admin/hasil-score",
  },
];

export default LayoutAdmin;
