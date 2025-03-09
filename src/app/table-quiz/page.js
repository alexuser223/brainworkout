"use client";

import { useState, useEffect, useRef } from "react";

export default function QuizPage() {
  const [step, setStep] = useState(1);
  const [numQuestions, setNumQuestions] = useState(20);
  const [selectedTables, setSelectedTables] = useState([]);
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
      const table = selectedTables[Math.floor(Math.random() * selectedTables.length)];
      const multiplier = Math.floor(Math.random() * 10) + 1;
      generatedQuestions.push({ table, multiplier, answer: table * multiplier });
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900 p-6">
      {step === 1 && (
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-6 text-blue-600">Select Number of Questions</h1>
          <div className="flex gap-3">
            {[10, 20, 30, 40, 50].map((num) => (
              <button key={num} className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700" onClick={() => { setNumQuestions(num); setStep(2); }}>
                {num}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-6 text-green-600">Select Tables</h1>
          <div className="grid grid-cols-5 gap-3">
            {Array.from({ length: 20 }, (_, i) => (
              <button key={i + 1} className={`px-6 py-3 rounded-lg font-semibold ${selectedTables.includes(i + 1) ? "bg-green-500 text-white" : "bg-gray-300"}`} 
                onClick={() => {
                  setSelectedTables(selectedTables.includes(i + 1) ? selectedTables.filter(n => n !== i + 1) : [...selectedTables, i + 1]);
                }}>
                {i + 1}
              </button>
            ))}
          </div>
          <button className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700" disabled={selectedTables.length === 0} onClick={() => setStep(3)}>Start Quiz</button>
        </div>
      )}

      {step === 3 && questions.length > 0 && (
        <div className="text-center bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4 text-purple-600">Question {currentQuestionIndex + 1} / {numQuestions}</h1>
          <p className="text-xl font-semibold mb-4">{questions[currentQuestionIndex].table} × {questions[currentQuestionIndex].multiplier} = ?</p>
          <form onSubmit={handleAnswerSubmit} className="flex flex-col items-center">
            <input 
              ref={inputRef}
              name="answer" 
              type="number" 
              className={`p-3 border rounded-md text-center focus:ring-2 focus:ring-blue-400 w-full ${isIncorrect ? "border-red-500" : "border-gray-300"}`} 
              required 
              value={inputValue} 
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button type="submit" className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700 w-full">Submit</button>
          </form>
          {isIncorrect && <p className="mt-4 text-lg font-semibold text-red-500">Incorrect, try again! ❌</p>}
        </div>
      )}

      {step === 4 && (
        <div className="text-center bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-3xl font-bold mb-4 text-green-600">Quiz Completed! 🎉</h1>
          <p className="text-lg">Time Taken: <span className="font-semibold">{((endTime - startTime) / 1000).toFixed(2)} seconds</span></p>
          <p className="text-lg text-green-500 font-semibold">Correct Answers: {questions.filter((q, i) => q.answer === userAnswers[i]).length}</p>
          <p className="text-lg text-red-500 font-semibold">Incorrect Answers: {questions.length - questions.filter((q, i) => q.answer === userAnswers[i]).length}</p>
          <button className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700" onClick={() => window.location.reload()}>Restart</button>
        </div>
      )}
    </div>
  );
}
