"use client";

import { useState, useEffect } from "react";
import questions from "@/data/quetion"; // Correct the path if needed

export default function UjianPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [markedAsRagu, setMarkedAsRagu] = useState(
    Array(questions.length).fill(false)
  );
  const [timeLeft, setTimeLeft] = useState(0); // Waktu tersisa dalam detik
  const [timerActive, setTimerActive] = useState(true);

  // Tentukan waktu target (misalnya "10-03-2025 23:20")
  const endTime = new Date("2025-03-14T23:23:00"); // Format: YYYY-MM-DDTHH:mm:ss

  // Effect untuk menghitung waktu mundur dari waktu target
  useEffect(() => {
    // Fungsi untuk menghitung mundur waktu
    const timerId = setInterval(() => {
      const currentTime = new Date();
      const timeRemaining = endTime - currentTime; // Selisih dalam milidetik

      if (timeRemaining <= 0) {
        clearInterval(timerId); // Hentikan timer jika waktu sudah habis
        setTimeLeft(0);
        handleSubmit(); // Ujian selesai setelah waktu habis
      } else {
        setTimeLeft(Math.floor(timeRemaining / 1000)); // Ubah ke detik
      }
    }, 1000);

    // Bersihkan interval jika komponen dibersihkan
    return () => clearInterval(timerId);
  }, []); // Empty array sebagai dependency untuk hanya memulai effect saat komponen pertama kali dimuat

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
    return "bg-gray-500 hover:bg-gray-800 focus:outline-none"; // Unanswered
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex w-full p-7 bg-blue-700 text-white ">
        <div className="text-xl font-bold">Simulasi Ujian CAT</div>
        <div className="ms-auto">Detail</div>
      </div>

      <div className="p-7">
        <div className="grid grid-cols-3 gap-6 ">
          <div className="w-full col-span-2 space-y-3 ">
            {/* Current Question Section */}
            <div className="flex w-full p-6 bg-white border border-gray-200 rounded-md shadow-sm items-center">
              <div className="uppercase flex items-center">
                SOAL NOMOR
                <div className="bg-blue-700 text-white py-2 px-3 ms-2 w-fit">
                  {currentQuestion + 1}
                </div>
              </div>
              <div className="ms-auto">
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
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-sm text-sm px-5 py-2.5 focus:outline-none "
                onClick={handlePrev}
              >
                {"< Sebelumnya"}
              </button>

              <div className="p-2 px-4 rounded-md bg-yellow-500  ">
                {/* Ragu-Ragu Checkbox */}
                <input
                  type="checkbox"
                  checked={markedAsRagu[currentQuestion]}
                  onChange={() => handleRaguChange(currentQuestion)}
                />
                <label className="ms-2">Ragu-Ragu</label>
              </div>

              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-sm text-sm px-5 py-2.5 focus:outline-none "
                onClick={handleNext}
              >
                {"Selanjutnya >"}
              </button>
            </div>
          </div>

          {/* Question number navigation */}
          <div className="w-auto h-auto p-6 bg-white border border-gray-200 rounded-lg shadow-sm ">
            <div className="uppercase mb-4 ms-1">Nomor Soal</div>

            <div className="flex flex-wrap">
              {questions.map((_, i) => (
                <button
                  type="button"
                  key={i}
                  className={`m-1 w-12 h-12 text-white ${getQuestionNumberColor(
                    i
                  )} font-medium rounded-sm text-sm px-3 py-2`}
                  onClick={() => setCurrentQuestion(i)}
                >
                  {i + 1}
                </button>
              ))}
              <button
                type="button"
                className="m-1 uppercase text-white bg-gray-500 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-sm text-sm px-3 py-2 focus:outline-none "
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

// // pages/ujian.js
// "use client";
// import { useState, useEffect } from "react";
// import questions from "@/data/quetion";

// const Ujian = () => {
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [selectedAnswers, setSelectedAnswers] = useState([]);
//   const [isFinished, setIsFinished] = useState(false);
//   const [timeLeft, setTimeLeft] = useState(0); // Waktu tersisa dalam detik
//   const [timerActive, setTimerActive] = useState(true);

//   const currentQuestion = questions[currentQuestionIndex];

//   // Tentukan waktu target (misalnya "10-03-2025 23:20")
//   const endTime = new Date("2025-03-10T23:20:00"); // Format: YYYY-MM-DDTHH:mm:ss

//   // Effect untuk menghitung waktu mundur dari waktu target
//   useEffect(() => {
//     // Fungsi untuk menghitung mundur waktu
//     const timerId = setInterval(() => {
//       const currentTime = new Date();
//       const timeRemaining = endTime - currentTime; // Selisih dalam milidetik

//       if (timeRemaining <= 0) {
//         clearInterval(timerId); // Hentikan timer jika waktu sudah habis
//         setTimeLeft(0);
//         handleSubmit(); // Ujian selesai setelah waktu habis
//       } else {
//         setTimeLeft(Math.floor(timeRemaining / 1000)); // Ubah ke detik
//       }
//     }, 1000);

//     // Bersihkan interval jika komponen dibersihkan
//     return () => clearInterval(timerId);
//   }, []); // Empty array sebagai dependency untuk hanya memulai effect saat komponen pertama kali dimuat

//   const handleAnswerChange = (event) => {
//     const updatedAnswers = [...selectedAnswers];
//     updatedAnswers[currentQuestionIndex] = event.target.value;
//     setSelectedAnswers(updatedAnswers);
//   };

//   const handleNext = () => {
//     if (currentQuestionIndex < questions.length - 1) {
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//     }
//   };

//   const handlePrev = () => {
//     if (currentQuestionIndex > 0) {
//       setCurrentQuestionIndex(currentQuestionIndex - 1);
//     }
//   };

//   const handleSubmit = () => {
//     setIsFinished(true);
//     setTimerActive(false); // Stop the timer once the quiz is finished
//   };

//   const calculateScore = () => {
//     return selectedAnswers.reduce((score, answer, index) => {
//       if (answer === questions[index].correctAnswer) {
//         return score + 1;
//       }
//       return score;
//     }, 0);
//   };

//   const formatTime = (seconds) => {
//     const minutes = Math.floor(seconds / 60);
//     const remainingSeconds = seconds % 60;
//     return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Simulasi Ujian CAT</h2>

//       {!isFinished ? (
//         <>
//           <div>
//             <p>Waktu Tersisa: {formatTime(timeLeft)}</p>
//           </div>

//           <h3>Soal {currentQuestionIndex + 1}</h3>
//           <p>{currentQuestion.question}</p>
//           <div>
//             {currentQuestion.options.map((option, index) => (
//               <div key={index}>
//                 <input
//                   type="radio"
//                   name={`question${currentQuestion.id}`}
//                   value={option}
//                   checked={selectedAnswers[currentQuestionIndex] === option}
//                   onChange={handleAnswerChange}
//                 />
//                 <label>{option}</label>
//               </div>
//             ))}
//           </div>
//           <div>
//             <button onClick={handlePrev} disabled={currentQuestionIndex === 0}>
//               Previous
//             </button>
//             <button
//               onClick={handleNext}
//               disabled={currentQuestionIndex === questions.length - 1}
//             >
//               Next
//             </button>
//           </div>
//         </>
//       ) : (
//         <div>
//           <h2>Hasil Ujian</h2>
//           <p>
//             Skor Anda: {calculateScore()} / {questions.length}
//           </p>
//         </div>
//       )}

//       {currentQuestionIndex === questions.length - 1 && !isFinished && (
//         <button onClick={handleSubmit}>Selesai</button>
//       )}
//     </div>
//   );
// };

// export default Ujian;
