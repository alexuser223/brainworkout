"use client";

import { useState, useEffect } from "react";

export default function CubeQuiz() {
  const [step, setStep] = useState(2);
  const [range, setRange] = useState(null);
  const [number, setNumber] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [correct, setCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    if (step === 3 && number === null) generateNewQuestion();
  }, [step]);

  const selectRange = (selectedRange) => {
    setRange(selectedRange);
    setStep(3);
    setNumber(null);
  };

  const generateNewQuestion = () => {
    let min = 1, max = 9;
    if (range === 2) [min, max] = [10, 99];
    if (range === 3) [min, max] = [100, 999];
    if (range === 10) [min, max] = [1, 10];
    if (range === 20) [min, max] = [1, 20];
    if (range === 30) [min, max] = [1, 30];
    if (range === 50) [min, max] = [1, 50];
    
    const newNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    setNumber(newNumber);
    setUserAnswer("");
    setCorrect(null);
  };

  const checkAnswer = () => {
    const correctAnswer = number * number * number;
    if (parseInt(userAnswer) === correctAnswer) {
      setCorrect(true);
      setScore(score + 1);
      setAttempts(attempts + 1);
      setTimeout(generateNewQuestion, 1000);
    } else {
      setCorrect(false);
      setAttempts(attempts + 1);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900 p-6">
      {step === 2 && (
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Select a Range</h1>
          <button onClick={() => selectRange(1)} className="m-2 px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600">1-Digit</button>
          <button onClick={() => selectRange(2)} className="m-2 px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600">2-Digit</button>
          <button onClick={() => selectRange(3)} className="m-2 px-6 py-3 bg-purple-500 text-white rounded-md hover:bg-purple-600">3-Digit</button>
          <button onClick={() => selectRange(10)} className="m-2 px-6 py-3 bg-yellow-500 text-white rounded-md hover:bg-yellow-600">Up to 10</button>
          <button onClick={() => selectRange(20)} className="m-2 px-6 py-3 bg-orange-500 text-white rounded-md hover:bg-orange-600">Up to 20</button>
          <button onClick={() => selectRange(30)} className="m-2 px-6 py-3 bg-red-500 text-white rounded-md hover:bg-red-600">Up to 30</button>
          <button onClick={() => selectRange(50)} className="m-2 px-6 py-3 bg-indigo-500 text-white rounded-md hover:bg-indigo-600">Up to 50</button>
        </div>
      )}

      {step === 3 && number !== null && (
        <div className="text-center bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4">What is {number}³?</h1>
          <input
            type="number"
            className={`p-3 border rounded-md w-full text-center focus:ring-2 focus:ring-blue-400 ${correct === false ? 'border-red-500' : 'border-gray-300'}`}
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && checkAnswer()}
            placeholder="Enter Cube"
          />
          <button
            className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-full"
            onClick={checkAnswer}
          >
            Submit
          </button>
          {correct !== null && (
            <p className={`mt-4 text-lg font-semibold ${correct ? "text-green-500" : "text-red-500"}`}>
              {correct ? "Correct! 🎉" : "Incorrect ❌ Try Again"}
            </p>
          )}
        </div>
      )}

      <div className="mt-6 text-lg">
        <p>Score: {score} / {attempts}</p>
      </div>
    </div>
  );
}