"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { IoPersonSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function AdminPage() {
  const { data } = useSession();
  const [globalData, setglobalData] = useState(null);
  const [exam, setexam] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchItems = async () => {
      if (data) {
        const res = await fetch(
          `/api/akun?model=akunPengguna&&email=${data.user.email}`
        );
        const resjson = await res.json();
        setglobalData(resjson);

        const temp = await fetch(`/api/exam?siswaId=${resjson.id}`);
        const tempjson = await temp.json();
        setexam(tempjson);
      }
    };

    fetchItems();
  }, [data]);

  const handleClick = async () => {
    if (globalData) {
      const score = await fetch(`/api/score?siswaId=${globalData.id}`);
      if (!score.ok) {
        const res = await fetch("/api/akses/data?model=hasilScore", {
          method: "POST",
          body: JSON.stringify({
            siswaId: globalData.id,
            paketId: exam.paketId,
            score: 0,
            tanggal: new Date(new Date().getTime() + exam.duration * 60000),
          }),
        });

        if (res.ok) {
          console.log("berhasil");
        }
      } else {
        console.log("gagal");
      }
    }

    router.push(`/siswa/ujian`);
  };

  return (
    <div className=" flex flex-col space-y-5 justify-center items-center w-full h-screen bg-sky-300 px-5 ">
      <div className=" flex justify-center items-center w-full md:w-96 p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
          <h5 className="mb-2 text-2xl text-center font-bold tracking-tight text-gray-900 dark:text-white">
            Selamat Datang <br /> Di Simulasi Ujian CAT
          </h5>
        </a>
      </div>

      <div className=" flex flex-col w-full md:w-96 p-6 space-y-8 py-8 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
        {globalData && (
          <div className="flex w-full items-center ">
            <IoPersonSharp size={60} className=" w-1/3" />
            <div className=" text-base font-medium space-y-2 ms-3 ">
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

      <div className=" flex flex-col w-full md:w-96 p-6 space-y-8 py-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <div className="flex flex-col w-full items-center space-y-4 ">
          <div className=" text-lg font-bold">Durasi</div>
          <div className=" font-medium">{exam && exam.duration} menit</div>
        </div>
      </div>

      <div className=" flex flex-col w-full md:w-96 p-6 space-y-8 py-8 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <div className=" flex w-full">
          <button
            onClick={() => {
              Swal.fire({
                title: "Mulai Ujian",
                text: "Anda Yakin Akan Ingin Mulai Ujian Ini ?",
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Mulai",
              }).then((result) => {
                if (result.isConfirmed) {
                  handleClick();
                }
              });
            }}
            className="inline-flex cursor-pointer w-full justify-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Mulai Ujian
          </button>
        </div>
      </div>
    </div>
  );
}

{
  /* <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          ini hanya sebuah simulasi ujian berbasi website, Klik Tombol Beriku
          ini jika anda sudah siap mengikuti simulasi ujian ini
        </p>
        <a
          href="/siswa/ujian"
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Mulai Ujian
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </a> */
}
