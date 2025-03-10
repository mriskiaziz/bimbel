// // pages/skor.js
// import { useRouter } from "next/router";
// import answer from "@/data/answer";

// const Skor = () => {
//   const router = useRouter();

//   const calculateScore = () => {
//     return selectedAnswers.reduce((score, answer, index) => {
//       const question = questions[index];
//       if (answer === question.correctAnswer) {
//         return score + 1;
//       }
//       return score;
//     }, 0);
//   };

//   const score = calculateScore();

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Hasil Ujian</h2>
//       <p>
//         Skor Anda: {score} / {questions.length}
//       </p>
//     </div>
//   );
// };

// export default Skor;
