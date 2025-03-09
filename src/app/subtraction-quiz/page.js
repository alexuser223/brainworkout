"use client";

import { useState, useEffect, useRef } from "react";

export default function SubtractionQuiz() {
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
      let num1 = Math.floor(Math.random() * (10 ** difficulty));
      let num2 = Math.floor(Math.random() * (10 ** difficulty));
      if (num1 < num2) [num1, num2] = [num2, num1]; // Ensure no negative answers
      const answer = num1 - num2;
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900 p-6">
      {step === 1 && (
        <div className="text-center bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl mb-4 font-semibold">Select Number of Questions</h1>
          <div className="flex flex-wrap justify-center">
            {[10, 20, 30, 40, 50].map((num) => (
              <button key={num} className="m-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition" onClick={() => { setNumQuestions(num); setStep(2); }}>
                {num}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="text-center bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl mb-4 font-semibold">Select Difficulty Level</h1>
          <div className="flex flex-wrap justify-center">
            {[1, 2, 3, 4, 5].map((level) => (
              <button key={level} className="m-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition" onClick={() => { setDifficulty(level); setStep(3); }}>
                {level}-Digit Subtraction
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 3 && questions.length > 0 && (
        <div className="text-center bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl mb-4 font-semibold">Question {currentQuestionIndex + 1} / {numQuestions}</h1>
          <p className="text-xl mb-4 font-medium">{questions[currentQuestionIndex].num1} - {questions[currentQuestionIndex].num2} = ?</p>
          <form onSubmit={handleAnswerSubmit} className="flex flex-col items-center">
            <input 
              ref={inputRef}
              name="answer" 
              type="number" 
              className={`text-gray-900 p-2 rounded border-2 ${isIncorrect ? "border-red-500" : "border-gray-300"}`} 
              required 
              value={inputValue} 
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter Difference"
            />
            <button type="submit" className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Submit</button>
          </form>
        </div>
      )}

      {step === 4 && (
        <div className="text-center bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl mb-4 font-semibold">Quiz Completed!</h1>
          <p className="text-lg font-medium">Time Taken: {((endTime - startTime) / 1000).toFixed(2)} seconds</p>
          <p className="text-lg text-green-600 font-medium">Correct Answers: {questions.filter((q, i) => q.answer === userAnswers[i]).length}</p>
          <p className="text-lg text-red-600 font-medium">Incorrect Answers: {questions.length - questions.filter((q, i) => q.answer === userAnswers[i]).length}</p>
        </div>
      )}
    </div>
  );
}