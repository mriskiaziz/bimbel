"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { IoPersonSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

export default function HasilPage() {
  const { data } = useSession();
  const [globalData, setglobalData] = useState(null);
  const [dataScore, setdataScore] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchItems = async () => {
      if (data) {
        const res = await fetch(
          `/api/akun?model=akunPengguna&&email=${data.user.email}`
        );
        const resjson = await res.json();
        setglobalData(resjson);

        const score = await fetch(`/api/score?siswaId=${resjson.id}`);
        const scorejson = await score.json();
        setdataScore(scorejson);
      }
    };

    fetchItems();
  }, [data]);

  const handleClick = async () => {
    signOut();
  };

  return (
    <div className=" flex flex-col space-y-5 justify-center items-center w-full h-screen bg-sky-300 px-5 ">
      <div className=" flex justify-center items-center w-full md:w-96 p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
          <h5 className="mb-2 text-2xl text-center font-bold tracking-tight text-gray-900 dark:text-white">
            Hasil Simulasi Ujian CAT
          </h5>
        </a>
      </div>

      <div className=" flex flex-col w-full md:w-96 p-6 space-y-8 py-8 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
        {globalData && (
          <div className="flex w-full items-center ">
            <IoPersonSharp size={60} className=" w-1/3" />
            <div className=" text-base font-medium space-y-2 ">
              <div>
                <div className=" font-bold">Email:</div>
                {globalData.email}
              </div>

              <div>
                <div className=" font-bold">Nama:</div>
                {globalData.nama}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className=" flex flex-col w-full md:w-96 p-6 space-y-3 py-8 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
        {dataScore && (
          <>
            <div className=" text-base font-bold">Score</div>
            <div
              className={`w-full flex justify-center text-4xl font-bold ${
                dataScore.score >= 70 ? "text-green-800" : "text-red-800"
              } `}
            >
              {dataScore.score}
            </div>
          </>
        )}
      </div>

      <div className=" flex flex-col w-full md:w-96 p-6 space-y-8 py-8 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <div className=" flex w-full">
          <button
            onClick={() => {
              handleClick();
            }}
            className="inline-flex cursor-pointer w-full justify-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
          >
            LOGOUT
          </button>
        </div>
      </div>
    </div>
  );
}
