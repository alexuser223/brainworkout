"use client";

import Link from "next/link";
import { FaTable, FaSquareRootAlt, FaCube, FaCalculator, FaSortNumericDown, FaSortNumericUpAlt, FaSortAlphaDown } from "react-icons/fa";


export default function Home() {
  const learnItems = [
    { name: "Learn Table", link: "/learn-table", icon: <FaTable />, bgColor: "bg-blue-500" },
    { name: "Learn Square", link: "/squares", icon: <FaSquareRootAlt />, bgColor: "bg-green-500" },
    { name: "Learn Cubes", link: "/cubes", icon: <FaCube />, bgColor: "bg-purple-500" },
  ];

  const quizItems = [
    { name: "Table Quiz", link: "/table-quiz", icon: <FaTable />, bgColor: "bg-lime-500" },
    { name: "Multiplication Quiz", link: "/multiplication-quiz", icon: <FaCalculator />, bgColor: "bg-red-500" },
    { name: "Division Quiz", link: "/division-quiz", icon: <FaCalculator />, bgColor: "bg-yellow-500" },
    { name: "Addition Quiz", link: "/addition-quiz", icon: <FaSortNumericUpAlt />, bgColor: "bg-indigo-500" },
    { name: "Subtraction Quiz", link: "/subtraction-quiz", icon: <FaSortNumericDown />, bgColor: "bg-teal-500" },
    { name: "Alphabet Position Quiz", link: "/alphabet-quiz", icon: <FaSortAlphaDown />, bgColor: "bg-orange-500" },
    { name: "Square Quiz", link: "/square-quiz", icon: <FaSquareRootAlt />, bgColor: "bg-pink-500" },
    { name: "Cube Quiz", link: "/cube-quiz", icon: <FaCube />, bgColor: "bg-cyan-500" },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900 p-4 md:p-6">
      {/* Header */}
      <h1 className="text-xl md:text-4xl font-bold text-center mt-16 text-blue-600">
        <span className="text-green-600">Brain Workout</span> : Boost Your Calculation
      </h1>
      <p className="text-xs md:text-lg text-gray-700 mt-4 text-center ">
        🚀 SSC, RRB, Banking, UPSC, और अन्य प्रतियोगी परीक्षाओं की तैयारी के लिए गणित को मज़बूत करें! 💡 तेज़ Calculation, सही उत्तर, और कम समय में बेहतरीन प्रदर्शन! 📊 गणित को आसान बनाएं और अपनी स्पीड बढ़ाएं! अब गणना में महारत हासिल करें और परीक्षा में बढ़त पाएं! 🔥
      </p>
      

      {/* Learn Section */}
      <h2 className="text-2xl md:text-3xl font-semibold mt-8 text-gray-800">Learn</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl mt-4">
        {learnItems.map((item, index) => (
          <Link key={index} href={item.link}>
            <div className={`p-6 ${item.bgColor} text-white rounded-lg shadow-lg text-center transition transform hover:scale-105 cursor-pointer flex flex-col items-center`}> 
              <div className="text-3xl md:text-4xl mb-2">{item.icon}</div>
              <h2 className="text-lg md:text-xl font-semibold">{item.name}</h2>
            </div>
          </Link>
        ))}
      </div>

      {/* Quizzes Section */}
      <h2 className="text-2xl md:text-3xl font-semibold mt-8 text-gray-800">Quizzes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl mt-4">
        {quizItems.map((quiz, index) => (
          <Link key={index} href={quiz.link}>
            <div className={`p-6 ${quiz.bgColor} text-white rounded-lg shadow-lg text-center transition transform hover:scale-105 cursor-pointer flex flex-col items-center`}> 
              <div className="text-3xl md:text-4xl mb-2">{quiz.icon}</div>
              <h2 className="text-lg md:text-xl font-semibold">{quiz.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}