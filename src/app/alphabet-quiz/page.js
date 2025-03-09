"use client";

import { useState, useEffect, useRef } from "react";

export default function AlphabetQuiz() {
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
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let generatedQuestions = [];
    for (let i = 0; i < numQuestions; i++) {
      const randomLetter = alphabet[Math.floor(Math.random() * 26)];
      const position = alphabet.indexOf(randomLetter) + 1;
      generatedQuestions.push({ letter: randomLetter, position });
    }
    setQuestions(generatedQuestions);
  }

  function handleAnswerSubmit(e) {
    e.preventDefault();
    const inputAnswer = parseInt(inputValue);
    if (inputAnswer === questions[currentQuestionIndex].position) {
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black p-6">
      {step === 1 && (
        <div className="text-center bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-4 text-blue-600">Select Number of Questions</h1>
          <div className="grid grid-cols-3 gap-4">
            {[10, 20, 30, 40, 50].map((num) => (
              <button key={num} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition duration-300" onClick={() => { setNumQuestions(num); setStep(2); }}>
                {num}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && questions.length > 0 && (
        <div className="text-center bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-green-600">Question {currentQuestionIndex + 1} / {numQuestions}</h1>
          <p className="text-5xl font-bold my-4 text-purple-600 animate-bounce"> '{questions[currentQuestionIndex].letter}' </p>
          <form onSubmit={handleAnswerSubmit} className="flex flex-col items-center">
            <input 
              ref={inputRef}
              name="answer" 
              type="number" 
              className={`p-3 text-lg rounded-lg border-2 ${isIncorrect ? "border-red-500" : "border-gray-300"}`} 
              required 
              value={inputValue} 
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter Position"
            />
            <button type="submit" className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition duration-300">Submit</button>
          </form>
        </div>
      )}

      {step === 3 && (
        <div className="text-center bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-green-600">Quiz Completed!</h1>
          <p className="text-lg mt-4">Time Taken: <span className="text-blue-500">{((endTime - startTime) / 1000).toFixed(2)} seconds</span></p>
          <p className="text-lg text-green-500">Correct Answers: {questions.filter((q, i) => q.position === userAnswers[i]).length}</p>
          <p className="text-lg text-red-500">Incorrect Answers: {questions.length - questions.filter((q, i) => q.position === userAnswers[i]).length}</p>
        </div>
      )}
    </div>
  );
}
