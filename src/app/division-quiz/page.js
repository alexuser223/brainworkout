"use client";

import { useState, useEffect, useRef } from "react";

export default function DivisionQuiz() {
  const [step, setStep] = useState(1);
  const [numQuestions, setNumQuestions] = useState(20);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [isIncorrect, setIsIncorrect] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (step === 2) {
      generateQuestions();
      setStartTime(Date.now());
    }
  }, [step]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentQuestionIndex]);

  function generateQuestions() {
    let generatedQuestions = [];
    for (let i = 0; i < numQuestions; i++) {
      let divisor = Math.floor(Math.random() * 9 + 2);
      let quotient = Math.floor(Math.random() * 90 + 10);
      let dividend = divisor * quotient;
      generatedQuestions.push({ dividend, divisor, quotient });
    }
    setQuestions(generatedQuestions);
  }

  function handleAnswerSubmit(e) {
    e.preventDefault();
    const inputAnswer = parseInt(inputValue.trim(), 10);
    if (inputAnswer === questions[currentQuestionIndex].quotient) {
      setUserAnswers([...userAnswers, inputAnswer]);
      setIsIncorrect(false);
      setInputValue("");
      
      if (currentQuestionIndex + 1 < questions.length) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setEndTime(Date.now());
        setStep(3);
      }
    } else {
      setIsIncorrect(true);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900 p-6">
      {step === 1 && (
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-6 text-blue-600">Select Number of Questions</h1>
          {[10, 20, 30, 40, 50].map((num) => (
            <button key={num} className="m-2 px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition" onClick={() => { setNumQuestions(num); setStep(2); }}>
              {num}
            </button>
          ))}
        </div>
      )}

      {step === 2 && questions.length > 0 && (
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-6 text-green-600">Question {currentQuestionIndex + 1} / {numQuestions}</h1>
          <p className="text-2xl mb-6 font-semibold">What is {questions[currentQuestionIndex].dividend} ÷ {questions[currentQuestionIndex].divisor}?</p>
          <form onSubmit={handleAnswerSubmit} className="flex flex-col items-center">
            <input 
              ref={inputRef}
              name="answer" 
              type="number" 
              className={`p-3 text-lg rounded-lg shadow-md focus:outline-none focus:ring-2 transition ${isIncorrect ? "border-2 border-red-500 focus:ring-red-400" : "border-2 border-gray-300 focus:ring-green-400"}`} 
              required 
              value={inputValue} 
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter Quotient"
            />
            <button type="submit" className="mt-4 px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition">Submit</button>
          </form>
        </div>
      )}

      {step === 3 && (
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-6 text-purple-600">Quiz Completed!</h1>
          <p className="text-lg font-semibold">Time Taken: <span className="text-blue-500">{((endTime - startTime) / 1000).toFixed(2)} seconds</span></p>
          <p className="text-lg text-green-600 font-semibold">Correct Answers: {questions.filter((q, i) => q.quotient === userAnswers[i]).length}</p>
          <p className="text-lg text-red-600 font-semibold">Incorrect Answers: {questions.length - questions.filter((q, i) => q.quotient === userAnswers[i]).length}</p>
        </div>
      )}
    </div>
  );
}
