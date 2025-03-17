"use client";

import { useState, useEffect } from "react";
import questions from "@/data/quetion"; // Pastikan path benar
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import { signOut } from "next-auth/react";

export default function UjianPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [endTime, setendTime] = useState(new Date());
  // const [questions, setquestions] = useState([]);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [logout, setlogout] = useState(false);
  const [markedAsRagu, setMarkedAsRagu] = useState(
    Array(questions.length).fill(false)
  );
  const [timeLeft, setTimeLeft] = useState(0);
  const [dataScore, setDataScore] = useState(null);
  const router = useRouter();
  const { data } = useSession();

  useEffect(() => {
    // Fungsi async untuk mengambil data
    const fetchData = async () => {
      try {
        const score = await fetch(`/api/score?siswaId=${data.user.id}`);
        const scorejson = await score.json();
        setDataScore(scorejson);

        // Mengecek apakah tanggal ujian sudah lewat
        const examDate = new Date(scorejson.tanggal);
        const currentDate = new Date();

        // Jika tanggal ujian lebih kecil dari hari ini, langsung arahkan ke hasil
        if (examDate < currentDate) {
          router.push("/siswa/hasil");
        } else {
          setendTime(examDate); // Set waktu ujian jika belum lewat
        }

        const soal = await fetch(`/api/soal?paketId=${scorejson.paketId}`);
        const soaljson = await soal.json();
        // setquestions(soaljson);
      } catch (error) {
        console.error("Error fetching score:", error);
      }
    };

    if (data?.user?.id) {
      fetchData();
    }
  }, [data?.user?.id, router]); // Hanya jalankan jika data user ada

  useEffect(() => {
    const timerId = setInterval(() => {
      const currentTime = new Date();
      const timeRemaining = endTime - currentTime; // Selisih dalam milidetik

      if (timeRemaining <= 0) {
        clearInterval(timerId); // Hentikan timer jika waktu sudah habis
        setTimeLeft(0);
        if (dataScore) {
          handleSubmit(); // Ujian selesai setelah waktu habis
        }
      } else {
        setTimeLeft(Math.floor(timeRemaining / 1000)); // Ubah ke detik
      }
    }, 1000);

    // Bersihkan interval jika komponen dibersihkan
    return () => clearInterval(timerId);
  }, [endTime]); // Menambahkan `endTime` agar timer berjalan sesuai waktu yang diterima

  // Handle Submit
  const handleSubmit = () => {
    router.push("/siswa/hasil");
  };

  // Handle radio button change
  const handleAnswerChange = (questionIndex, selectedAnswer) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = selectedAnswer;
    setAnswers(newAnswers);
  };

  // Handle "Ragu-Ragu" checkbox change
  const handleRaguChange = (questionIndex) => {
    const newRaguStatus = [...markedAsRagu];
    newRaguStatus[questionIndex] = !newRaguStatus[questionIndex];
    setMarkedAsRagu(newRaguStatus);
  };

  // Handle navigation between questions
  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  // Function to determine the color for question numbers
  const getQuestionNumberColor = (index) => {
    if (markedAsRagu[index]) {
      return "bg-yellow-500 hover:bg-yellow-800 focus:outline-none "; // Ragu-Ragu marked
    }
    if (answers[index]) {
      return "bg-green-500 hover:bg-green-800 focus:outline-none"; // Answered
    }
    return `${
      currentQuestion == index ? "bg-gray-800" : "bg-gray-500"
    } hover:bg-gray-800 focus:outline-none`; // Unanswered
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600); // Menghitung jam
    const minutes = Math.floor((seconds % 3600) / 60); // Menghitung menit
    const remainingSeconds = seconds % 60; // Menghitung detik

    // Format jam, menit, dan detik menjadi string dengan 2 digit untuk menit dan detik
    return `${hours}:${minutes < 10 ? "0" : ""}${minutes}:${
      remainingSeconds < 10 ? "0" : ""
    }${remainingSeconds}`;
  };

  const getInitials = (fullName) => {
    const names = fullName.split(" ");
    const initials = names.map((name) => name.charAt(0).toUpperCase()).join("");
    return initials;
  };

  return (
    <div className="flex flex-col w-full bg-slate-200 h-full md:h-screen">
      <div className="flex w-full p-7 bg-blue-700 text-white">
        <div className="text-2xl font-bold">Simulasi Ujian CAT</div>
        <div className="ms-auto flex space-x-3">
          {data && (
            <>
              <div>
                <div className="flex flex-col">
                  <div className="ms-auto">{data.user.name}</div>
                  <div className="ms-auto">{data.user.email}</div>
                </div>
              </div>
              <div>
                <div className="inline-flex items-center justify-center w-12 h-12 text-white bg-blue-500 rounded-full">
                  <span
                    className="text-xl font-semibold cursor-pointer"
                    onClick={() => setlogout(!logout)}
                  >
                    {getInitials(data.user.name)}
                  </span>
                  {logout && (
                    <div className="p-3 px-6 fixed top-20 right-10 bg-white rounded-sm shadow border border-black ">
                      <button
                        onClick={() => {
                          signOut();
                        }}
                        className=" flex cursor-pointer justify-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="p-7">
        <div className="grid grid-cols-3 gap-6 ">
          <div className="w-full col-span-3 md:col-span-2 space-y-3 ">
            {/* Current Question Section */}
            <div className="flex w-full p-6 bg-white border border-gray-200 rounded-md shadow-sm items-center">
              <div className="uppercase flex items-center font-semibold">
                SOAL NOMOR
                <div className="bg-blue-700 text-white py-2 px-3 ms-2 w-fit">
                  {currentQuestion + 1}
                </div>
              </div>
              <div className="ms-auto font-semibold">
                Waktu Tersisa: {formatTime(timeLeft)}
              </div>
            </div>

            <div className="flex flex-col w-full p-6 bg-white border border-gray-200 shadow-sm ">
              <div className="mb-5">{questions[currentQuestion].question}</div>
              <div>
                {questions[currentQuestion].options.map((option, i) => (
                  <div key={i}>
                    <input
                      type="radio"
                      name={`question${currentQuestion}`}
                      value={option}
                      checked={answers[currentQuestion] === option}
                      onChange={() =>
                        handleAnswerChange(currentQuestion, option)
                      }
                    />
                    <label className="ms-2">{option}</label>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="flex w-full justify-between px-6 p-2 bg-white border border-gray-200 shadow-sm ">
              <button
                type="button"
                className="text-white cursor-pointer text-sm text-nowrap bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-sm px-5 py-2.5 focus:outline-none "
                onClick={handlePrev}
              >
                {"< Prev"}
              </button>

              <div className="p-2 px-4 rounded-md bg-yellow-500 ">
                {/* Ragu-Ragu Checkbox */}
                <input
                  type="checkbox"
                  className=" cursor-pointer"
                  checked={markedAsRagu[currentQuestion]}
                  onChange={() => handleRaguChange(currentQuestion)}
                />
                <label className="ms-2 uppercase">Ragu</label>
              </div>

              <button
                type="button"
                className="text-white cursor-pointer text-nowrap bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-sm text-sm px-5 py-2.5 focus:outline-none "
                onClick={handleNext}
              >
                {"Next >"}
              </button>
            </div>
          </div>

          {/* Question number navigation */}
          <div className="w-auto col-span-3 md:col-span-1 h-auto p-6 bg-white border border-gray-200 rounded-lg shadow-sm ">
            <div className="uppercase mb-4 ms-1">Nomor Soal</div>

            <div className="flex flex-wrap">
              {questions.map((_, i) => (
                <button
                  type="button"
                  key={i}
                  className={`m-1 w-12 h-12 text-white cursor-pointer ${getQuestionNumberColor(
                    i
                  )} font-medium rounded-sm text-sm px-3 py-2`}
                  onClick={() => setCurrentQuestion(i)}
                >
                  {i + 1}
                </button>
              ))}
              <button
                type="button"
                onClick={() => {
                  Swal.fire({
                    title: "Selesaikan Ujian",
                    text: "Anda Yakin Akan Menyelesaikan Ujian Ini ?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, Selesai",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      handleSubmit();
                    }
                  });
                }}
                className="m-1 uppercase cursor-pointer text-white bg-gray-500 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-sm text-sm px-3 py-2 focus:outline-none "
              >
                selesai
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
