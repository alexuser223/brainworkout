"use client";

import { useState, useEffect, useRef } from "react";

export default function AdditionQuiz() {
  const [step, setStep] = useState(1);
  const [numQuestions, setNumQuestions] = useState(20);
  const [difficulty, setDifficulty] = useState(1);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [isIncorrect, setIsIncorrect] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (step === 3) {
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
      const num1 = Math.floor(Math.random() * (10 ** difficulty));
      const num2 = Math.floor(Math.random() * (10 ** difficulty));
      const answer = num1 + num2;
      generatedQuestions.push({ num1, num2, answer });
    }
    setQuestions(generatedQuestions);
  }

  function handleAnswerSubmit(e) {
    e.preventDefault();
    const inputAnswer = parseInt(inputValue);
    if (inputAnswer === questions[currentQuestionIndex].answer) {
      setUserAnswers([...userAnswers, inputAnswer]);
      setIsIncorrect(false);
      setInputValue("");
      
      if (currentQuestionIndex + 1 < questions.length) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setEndTime(Date.now());
        setStep(4);
      }
    } else {
      setIsIncorrect(true);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black p-6">
      {step === 1 && (
        <div className="text-center">
          <h1 className="text-2xl mb-4 font-bold text-gray-800">Select Number of Questions</h1>
          {[10, 20, 30, 40, 50].map((num) => (
            <button key={num} className="m-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={() => { setNumQuestions(num); setStep(2); }}>
              {num}
            </button>
          ))}
        </div>
      )}

      {step === 2 && (
        <div className="text-center">
          <h1 className="text-2xl mb-4 font-bold text-gray-800">Select Difficulty Level</h1>
          {[1, 2, 3, 4, 5].map((level) => (
            <button key={level} className="m-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600" onClick={() => { setDifficulty(level); setStep(3); }}>
              {level}-Digit Addition
            </button>
          ))}
        </div>
      )}

      {step === 3 && questions.length > 0 && (
        <div className="text-center bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl mb-4 font-bold text-gray-800">Question {currentQuestionIndex + 1} / {numQuestions}</h1>
          <p className="text-xl mb-4 font-semibold text-gray-700">{questions[currentQuestionIndex].num1} + {questions[currentQuestionIndex].num2} = ?</p>
          <form onSubmit={handleAnswerSubmit} className="flex flex-col items-center">
            <input 
              ref={inputRef}
              name="answer" 
              type="number" 
              className={`p-2 rounded border-2 text-black ${isIncorrect ? "border-red-500" : "border-gray-300"}`} 
              required 
              value={inputValue} 
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter Sum"
            />
            <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Submit</button>
          </form>
        </div>
      )}

      {step === 4 && (
        <div className="text-center bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl mb-4 font-bold text-gray-800">Quiz Completed!</h1>
          <p className="text-lg font-semibold text-gray-700">Time Taken: {((endTime - startTime) / 1000).toFixed(2)} seconds</p>
          <p className="text-lg text-green-600 font-bold">Correct Answers: {questions.filter((q, i) => q.answer === userAnswers[i]).length}</p>
          <p className="text-lg text-red-600 font-bold">Incorrect Answers: {questions.length - questions.filter((q, i) => q.answer === userAnswers[i]).length}</p>
        </div>
      )}
    </div>
  );
}