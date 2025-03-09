"use client";

export default function CubeList() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900 p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold  text-center mt-16 text-green-600">Cubes of Numbers (1-50)</h1>
      
      <div className="bg-white/10 backdrop-blur-md p-4 sm:p-6 rounded-lg shadow-lg text-center w-full max-w-4xl">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-lg sm:text-xl">
          {Array.from({ length: 50 }, (_, i) => (
            <div key={i + 1} className="p-2 border border-green-600 bg-gray-100 text-center rounded-md">
              {i + 1}³ = {(i + 1) * (i + 1) * (i + 1)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}