"use client";

import { useState, useEffect } from "react";
// import questions from "@/data/quetion"; // Pastikan path benar
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import { signOut } from "next-auth/react";

export default function UjianPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [endTime, setEndTime] = useState(new Date());
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [markedAsRagu, setMarkedAsRagu] = useState([]);
  const [kunciJawaban, setKunciJawaban] = useState([]);
  const [logout, setLogout] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [dataScore, setDataScore] = useState(null);
  const router = useRouter();
  const { data } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const score = await fetch(`/api/score?siswaId=${data.user.id}`);
        const scorejson = await score.json();
        setDataScore(scorejson);

        const examDate = new Date(scorejson.tanggal);
        const currentDate = new Date();

        if (examDate < currentDate) {
          router.push("/siswa/hasil");
        } else {
          setEndTime(examDate);
        }

        const soal = await fetch(`/api/soal?paketId=${scorejson.paketId}`);
        const soaljson = await soal.json();
        const kj = soaljson.map((e) => {
          return e.jawabanBenar;
        });
        setQuestions(soaljson);
        setKunciJawaban(kj);
        setAnswers(Array(soaljson.length).fill(null)); // Initialize answers with null for each question
        setMarkedAsRagu(Array(soaljson.length).fill(false)); // Initialize markedAsRagu with false for each question
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (data?.user?.id) {
      fetchData();
    }
  }, [data?.user?.id, router]);

  useEffect(() => {
    const timerId = setInterval(() => {
      const currentTime = new Date();
      const timeRemaining = endTime - currentTime;

      if (timeRemaining <= 0) {
        clearInterval(timerId);
        setTimeLeft(0);
        if (dataScore) {
          handleSubmit();
        }
      } else {
        setTimeLeft(Math.floor(timeRemaining / 1000)); // Update timeLeft in seconds
      }
    }, 1000);

    return () => clearInterval(timerId);
  }, [endTime]);

  const handleSubmit = async () => {
    let benar = kunciJawaban.filter(
      (value, index) => value == parseInt(answers[index])
    ).length;

    // try {
    //   await fetch(`/api/akses/data?model=hasilScore&&id=${dataScore.id}`, {
    //     method: "PATCH",
    //     body: { ...dataScore, score: benar },
    //   });
    // } catch (error) {
    //   alert("data gagal dikirimkan");
    // }

    // router.push("/siswa/hasil");
  };

  const handleAnswerChange = (questionIndex, selectedIndex) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = selectedIndex;
    setAnswers(newAnswers);
  };

  const handleRaguChange = (questionIndex) => {
    const newRaguStatus = [...markedAsRagu];
    newRaguStatus[questionIndex] = !newRaguStatus[questionIndex];
    setMarkedAsRagu(newRaguStatus);
  };

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

  const getQuestionNumberColor = (index) => {
    if (markedAsRagu[index]) {
      return "bg-yellow-500 hover:bg-yellow-800 focus:outline-none ";
    }
    if (answers[index] !== null) {
      return "bg-green-500 hover:bg-green-800 focus:outline-none";
    }
    return `${
      currentQuestion === index ? "bg-gray-800" : "bg-gray-500"
    } hover:bg-gray-800 focus:outline-none`;
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
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
      <div className="flex w-full p-7 items-center bg-blue-700 text-white">
        <div className="text-2xl font-bold">Simulasi Ujian CAT</div>
        <div className="ms-auto flex space-x-3">
          {data && (
            <>
              <div>
                <div className="flex-col hidden md:flex ">
                  <div className="ms-auto">{data.user.name}</div>
                  <div className="ms-auto">{data.user.email}</div>
                </div>
              </div>
              <div>
                <div className="inline-flex items-center justify-center w-12 h-12 text-white bg-blue-500 rounded-full">
                  <span
                    className="text-xl font-semibold cursor-pointer"
                    onClick={() => setLogout(!logout)}
                  >
                    {getInitials(data.user.name)}
                  </span>
                  {logout && (
                    <div className="p-3 px-6 fixed top-20 right-10 bg-white rounded-sm shadow border border-black ">
                      <button
                        onClick={() => {
                          signOut();
                        }}
                        className="flex cursor-pointer justify-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
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
        <div className="grid grid-cols-3 gap-6">
          <div className="w-full col-span-3 md:col-span-2 space-y-3">
            {/* Current Question Section */}
            <div className="flex flex-col md:flex-row w-full space-y-3 md:space-y-0 p-6 bg-white border border-gray-200 rounded-md shadow-sm md:items-center">
              <div className="uppercase flex items-center font-semibold">
                SOAL NOMOR
                <div className="bg-blue-700 text-white py-2 px-3 ms-2 w-fit">
                  {currentQuestion + 1}
                </div>
              </div>
              <div className="flex md:ms-auto font-semibold">
                Waktu Tersisa: {formatTime(timeLeft)}
              </div>
            </div>

            <div className="flex flex-col w-full p-6 bg-white border border-gray-200 shadow-sm ">
              {questions.length !== 0 && (
                <>
                  <div className="mb-5">{questions[currentQuestion].soal}</div>
                  <div>
                    {questions[currentQuestion].opsi.map((option, i) => (
                      <div key={i}>
                        <input
                          type="radio"
                          name={`question${currentQuestion}`}
                          value={i}
                          checked={answers[currentQuestion] === i} // Ensure the radio button is checked if the answer matches
                          onChange={() =>
                            handleAnswerChange(currentQuestion, i)
                          }
                        />
                        <label className="ms-2">{option}</label>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Navigation buttons */}
            <div className="flex w-full justify-between px-6 p-2 bg-white border border-gray-200 shadow-sm">
              <button
                type="button"
                className="text-white cursor-pointer text-sm text-nowrap bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-sm px-5 py-2.5 focus:outline-none"
                onClick={handlePrev}
              >
                {"< Prev"}
              </button>

              {markedAsRagu.length != 0 && (
                <div className="p-2 px-4 rounded-md bg-yellow-500">
                  <input
                    type="checkbox"
                    className="cursor-pointer"
                    checked={markedAsRagu[currentQuestion]}
                    onChange={() => handleRaguChange(currentQuestion)}
                  />
                  <label className="ms-2 uppercase">Ragu</label>
                </div>
              )}

              <button
                type="button"
                className="text-white cursor-pointer text-nowrap bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-sm text-sm px-5 py-2.5 focus:outline-none"
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
                className="m-1 uppercase cursor-pointer text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-sm text-sm px-3 py-2 focus:outline-none"
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
