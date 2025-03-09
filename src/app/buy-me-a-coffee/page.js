
"use client";

import Image from 'next/image';
import { useState } from 'react';
import { FaRegCopy } from 'react-icons/fa';

export default function BuyMeACoffee() {
  const [copied, setCopied] = useState(false);
  const upiId = "icpayee@axl"; // Replace with your actual UPI ID

  const copyUPI = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-yellow-400 via-green-500 to-white text-white p-6">
      <h1 className="text-4xl font-bold mb-4">Buy Me a Coffee ☕</h1>
      <p className="text-lg text-center mb-6">Your support keeps me going! Scan the QR code or use the UPI ID below.</p>
      
      {/* QR Code Placeholder - Replace with your QR image */}
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <Image src="/qr.png" alt="Buy Me a Coffee QR Code" width={200} height={200} className="rounded-md" />
      </div>
      
      {/* UPI ID & Copy Button */}
      <div className="mt-4 flex items-center space-x-2 bg-white/20 p-3 rounded-lg">
        <span className="text-lg">{upiId}</span>
        <button onClick={copyUPI} className="text-xl p-2 bg-black/50 rounded-md hover:bg-black/70 transition">
          <FaRegCopy />
        </button>
      </div>
      {copied && <p className="mt-2 text-sm text-green-200">UPI ID Copied! ✅</p>}
    </div>
  );
}