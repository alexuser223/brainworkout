"use client";

import { useState } from "react";
import Navbar from "../Components/nav/page";

export default function Home() {
  const [number, setNumber] = useState(2);

  return (

    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900 p-4">
      {/* Table Section */}
      
        <h1 className="text-2xl 6 mt-16 font-bold mb-4 text-center text-green-600">
          Multiplication Table of {number}
        </h1>

       

      <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-lg ">
        <table className="border-collapse border border-green-600 w-64 text-center">
          <tbody>
            {Array.from({ length: 10 }, (_, i) => (
              <tr key={i} className="border border-green-600 ">
                <td className="p-2">{number} × {i + 1} = {number * (i + 1)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Number Selection */}
      <div className="mt-6 text-black">
        <label className="block text-lg mb-2 text">Select a Number:</label>
        <select
          className="p-2 rounded-md bg-white/20 text-black border border-gray-500 focus:outline-none "
          value={number}
          onChange={(e) => setNumber(Number(e.target.value))}
        >
          {Array.from({ length: 50 }, (_, i) => (
            <option key={i + 1} value={i + 1} className="text-black">
              Table of :{i + 1}
            </option>
          ))}
        </select>
      </div>

      
    </div>
  );
}
