"use client";
import { useState } from "react";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { MdQuestionAnswer } from "react-icons/md";
import { IoPerson } from "react-icons/io5";
import { MdCreditScore } from "react-icons/md";
import { SiPacker } from "react-icons/si";
import { MdCategory } from "react-icons/md";

function LayoutAdmin({ children }) {
  const [open, setOpen] = useState(false); // Track if the sidebar is open
  const pathname = usePathname();

  return (
    <>
      {/* Overlay when sidebar is open */}
      {open && (
        <div
          onClick={() => setOpen(false)} // Close sidebar when clicked
          className="fixed inset-0 bg-black opacity-50 z-30"
        ></div>
      )}

      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                onClick={() => setOpen(!open)} // Toggle open state
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <a href="https://flowbite.com" className="flex ms-2 md:me-24">
                <img
                  src="https://flowbite.com/docs/images/logo.svg"
                  className="h-8 me-3"
                  alt="FlowBite Logo"
                />
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white flex">
                  <div className=" hidden md:flex me-2">Dashboard </div> Admin
                </span>
              </a>
            </div>
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => {
                  signOut();
                }}
                className=" cursor-pointer focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              >
                LOGOUT
              </button>
            </div>
          </div>
        </div>
      </nav>

      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${
          open ? "translate-x-0" : "-translate-x-full"
        } bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700`} // Conditional class to show/hide sidebar
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-2 font-medium pt-5 ">
            {navbar_list.map((e, i) => (
              <li key={i}>
                <a
                  href={e.link}
                  className={`${
                    e.link == pathname && "bg-blue-200"
                  } flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-blue-200 dark:hover:bg-gray-700 group`}
                >
                  {e.icon}
                  <span className="ms-3">{e.text}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <div className=" p-4 sm:ml-64 bg-slate-200 h-full my-8 ">
        <div className="p-4 border-2  bg-white border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          {children}
        </div>
      </div>
    </>
  );
}

const navbar_list = [
  {
    text: "kategori soal",
    link: "/admin",
    icon: <MdCategory size={22} />,
  },
  {
    text: "akun",
    link: "/admin/akun",
    icon: <IoPerson size={22} />,
  },
  {
    text: "soal",
    link: "/admin/soal",
    icon: <MdQuestionAnswer size={22} />,
  },
  {
    text: "paket soal",
    link: "/admin/paket-soal",
    icon: <SiPacker size={22} />,
  },
  {
    text: "hasil score",
    link: "/admin/hasil-score",
    icon: <MdCreditScore size={22} />,
  },
];

export default LayoutAdmin;
