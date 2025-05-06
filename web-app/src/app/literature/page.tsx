'use client';

import React, { useState } from 'react';
import { FaBookOpen, FaQuoteLeft } from 'react-icons/fa';
import Link from 'next/link';

const librarySections = [
  {
    title: 'writting',
    children: [
      { name: 'My Blog', link: 'https://myblog.com' },
      { name: 'Medium', link: 'https://medium.com' },
    ],
  },
  {
    title: 'readings',
    children: [
      { name: 'How the Web3 Reinvents the Internet', link: 'https://dokumen.pub/token-economy-how-the-web3-reinvents-the-internet-9783982103839-9783982103815-9783982103846.html' },
      { name: 'Learn Ethereum', link: 'https://www.amazon.com/Learn-Ethereum-decentralized-applications-contracts/dp/1789954118' },
      { name: 'Leaving the Rat Race with Python', link: 'https://pdfcoffee.com/leavingtheratracewithpythonv1-pdf-free.html' },
      { name: 'Python Tricks Book', link: 'https://archive.org/details/pythontricks/page/n1/mode/2up' },
      { name: 'A Philosophy of Software Design', link: 'https://www.pdfdrive.com/a-philosophy-of-software-design-e195285924.html' },
      { name: 'Unix Power Tools (3rd Edition)', link: 'https://altair.pw/pub/doc/unix/Unix%20Power%20Tools%20(3rd%20Edition)/' },
      { name: 'The One-Straw Revolution', link: 'https://archive.org/details/TheOne-strawRevolution' },
    ],
  },
  {
    title: 'optimal env',
    children: [
      { name: '.vimrc', link: 'https://www.google.com/search?q=vimrc' },
      { name: '.zshrc', link: 'https://www.google.com/search?q=zshrc' },
      { name: '.env', link: 'https://www.google.com/search?q=env+file' },
      { name: '.wallet3', link: 'https://www.google.com/search?q=wallet3' },
      { name: '.frabrik', link: 'https://www.google.com/search?q=frabrik' },
      { name: 'fzf', link: 'https://github.com/junegunn/fzf' },
    ],
  },
];

const quotesSections = [
  { author: "Elon Musk", quote: "Personality > talent" },
  { author: "Terrence Mackenzie", quote: "The evolution and importance of psychedelics" },
  { author: "Alan Watts", quote: "The power of the mind" },
  { author: "Wim Hoff", quote: "Controlling emotions through cold plunge breathing" },
  { author: "CEO Stefan", quote: "Entrepreneurship, communication and discipline at its best" },
  { author: "Matthew McConaughey", quote: "Myself in 10 years is my hero" },
  { author: "primeagen", quote: "Do u even vim?" },
  { author: "Garry Vee", quote: "What are you complaining about" },
  { author: "Simon Squibb", quote: "There's still good in people" },
  { author: "David X", quote: "It was almost never the best developer in the group" }
];

function Quote() {
  const [selectedIdx, setSelectedIdx] = React.useState(0);
  return (
    <div className="flex flex-col gap-8 w-full max-w-4xl h-screen items-center justify-center snap-center">
      <div className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-700 tracking-wide mb-2 opacity-80 select-none">
        <span className="italic">"Quotes around the internet</span>
      </div>
      <div className="flex gap-12 w-full items-center justify-center">
        {/* Left Column: Highlighted Author */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="p-8 rounded-xl shadow-2xl border-4 border-indigo-800 flex flex-col items-center max-w-xl w-full animate-fade-in">
            <div className="text-2xl font-bold text-indigo-800 mb-2">{quotesSections[selectedIdx].author}</div>
          </div>
        </div>
        {/* Right Column: Quotes */}
        <div className="flex-1 space-y-4">
          {quotesSections.map((item, idx) => (
            <div
              key={idx}
              className={`rounded px-4 py-3 text-base cursor-pointer transition-all duration-300 shadow-md hover:scale-105 border ${selectedIdx === idx ? 'border-purple-400' : 'border-transparent'}`}
              onClick={() => setSelectedIdx(idx)}
            >
              {item.quote}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MyLibrary({ items }: { items: { title: string, children: { name: string, link: string }[] }[] }) {
  const [isEven, setIsEven] = React.useState(true);

  React.useEffect(() => {
    const randomInt = Math.floor(Math.random() * 1000);
    setIsEven(randomInt % 2 === 0);
  }, []);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center snap-center">
      <h2 className={`text-5xl font-bold text-indigo-700 mb-8 transition-transform duration-500 animate-fade-in ${isEven ? 'scale-105' : 'scale-95'}`}
      >
        {isEven ? 'My turn' : 'My Try'}
      </h2>
      <div className="space-y-6 w-full animate-fade-in flex flex-col items-center">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="p-4 rounded shadow border border-indigo-900 bg-gradient-to-r from-gray-900/70 via-gray-800/80 to-indigo-950/70 max-w-2xl w-full"
          >
            <div className="text-lg font-semibold text-indigo-200 mb-3">{item.title}</div>
            <div className="flex flex-wrap gap-3">
              {item.children.map((child, cidx) => (
                <div key={cidx}>
                  <Link
                    href={child.link}
                    passHref
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-5 py-3 rounded-lg border border-indigo-800 bg-gradient-to-r from-gray-800 to-gray-900 text-indigo-100 font-medium shadow transition-all duration-200 hover:bg-indigo-900/70 hover:scale-[1.03] active:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-700"
                    style={{ minWidth: '160px' }}
                  >
                    <FaBookOpen className="text-indigo-400 text-xl" />
                    <span className="flex-1 text-base">{child.name}</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function LiteraturePage() {
  return (
    <div className="w-screen min-h-screen flex flex-col justify-center overflow-y-scroll snap-y snap-mandatory border">
      <Quote />
      <MyLibrary items={librarySections} />
    </div>
  );
}