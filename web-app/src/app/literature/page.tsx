'use client';

import React, { useState } from 'react';
import { FaBookOpen, FaFeatherAlt, FaPenNib, FaQuoteLeft, FaUserEdit } from 'react-icons/fa';

const apples: [string, string][] = [
  ["Macintosh", "A classic apple, tart and crisp."],
  ["Granny Smith", "Green, sour, and great for baking."],
  ["Honeycrisp", "Sweet, juicy, and crunchy."],
  ["Fuji", "Very sweet and firm, good for snacking."],
  ["Gala", "Mild and sweet, with a floral aroma."],
];

export default function LiteraturePage() {
  const [appleList, setAppleList] = useState(apples);
  const [selectedIdx, setSelectedIdx] = useState(0);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">

      <div className="flex gap-12 w-full max-w-4xl">
        {/* Left Column: Highlighted Name */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="p-8 rounded-xl shadow-2xl border-4 border-indigo-200 flex flex-col items-center max-w-xl w-full animate-fade-in">
            <FaQuoteLeft className="text-3xl text-purple-400 mb-2" />
            <div className="text-2xl font-bold text-indigo-800 mb-2">{appleList[selectedIdx][0]}</div>
          </div>
        </div>
        {/* Right Column: Descriptions */}
        <div className="flex-1 space-y-4">
          {appleList.map(([_, right], idx) => (
            <div
              key={idx}
              className={`rounded px-4 py-3 text-base cursor-pointer transition-all duration-300 shadow-md hover:scale-105 border ${selectedIdx === idx ? 'border-purple-400' : 'border-transparent'}`}
              onClick={() => setSelectedIdx(idx)}
            >
              {right}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}