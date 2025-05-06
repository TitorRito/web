'use client';

import React from 'react';
import { FaBookOpen, FaFeatherAlt, FaPenNib, FaQuoteLeft, FaUserEdit } from 'react-icons/fa';

// Example apples data array: each item is [left, right]
const apples: [string, string][] = [
  ["Macintosh", "A classic apple, tart and crisp."],
  ["Granny Smith", "Green, sour, and great for baking."],
  ["Honeycrisp", "Sweet, juicy, and crunchy."],
  ["Fuji", "Very sweet and firm, good for snacking."],
  ["Gala", "Mild and sweet, with a floral aroma."],
];

export default function LiteraturePage() {
  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Literature</h1>
      <div className="flex gap-8">
        {/* Left Column */}
        <div className="flex-1 space-y-4">
          <h2 className="font-semibold text-lg mb-2">Apple Names</h2>
          {apples.map(([left], idx) => (
            <div key={idx} className="rounded px-3 py-2 text-gray-800">{left}</div>
          ))}
        </div>
        {/* Right Column */}
        <div className="flex-1 space-y-4">
          <h2 className="font-semibold text-lg mb-2">Apple Descriptions</h2>
          {apples.map(([_, right], idx) => (
            <div key={idx} className="rounded px-3 py-2 text-gray-600">{right}</div>
          ))}
        </div>
      </div>
    </div>
  );
}