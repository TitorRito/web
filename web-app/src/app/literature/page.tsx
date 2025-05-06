'use client';

import React, { useState, useEffect } from 'react';
import { FaBookOpen } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const librarySections = [
  {
    title: 'writtings',
    children: [
      { name: 'My Blog', link: '/literature/blog' },
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
    title: 'subscriptions',
    children: [
      { name: 'Morning Brew', link: 'https://www.morningbrew.com/' },
      { name: 'Moby', link: 'https://www.moby.co/' },
      { name: 'Bankless', link: 'https://www.bankless.com/daily-brief' },
      { name: 'Interview Cake', link: 'https://www.interviewcake.com/' },
      { name: 'Pragmatic Engineer', link: 'https://substack.com/@pragmaticengineer' },
      { name: '8020 AI', link: 'https://www.8020ai.co/' },
      { name: 'Horizon AI', link: 'https://www.joinhorizon.ai/' },
      { name: 'Finxter Blog', link: 'https://blog.finxter.com/' },
      { name: 'Superhuman AI', link: 'https://www.superhuman.ai' },
      { name: 'Neuron Daily', link: 'https://www.theneurondaily.com/' },
      { name: 'Bay Area Times', link: 'https://www.bayareatimes.com/' },
      { name: 'Indie Hackers', link: 'https://www.indiehackers.com/' },
      { name: 'Milk Road', link: 'https://milkroad.com/' },
      { name: 'Alchemy', link: 'https://www.alchemy.com/newsletter' },
      { name: 'The Average Joe', link: 'https://readthejoe.com/' },
      { name: 'Engineering Leadership (Gregor Ojstersek)', link: 'https://newsletter.eng-leadership.com/' },
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
  const [selectedIdx, setSelectedIdx] = useState(0);
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen snap-center">
      <div className="flex flex-col items-center justify-center w-full h-full">
        <div className="flex flex-col items-center justify-center w-full">
          <div className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-500 via-gray-600 to-gray-700 tracking-wide mb-8 opacity-90 select-none text-center">
            <span className="italic">--Quotes around the internet--</span>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-12 w-full max-w-4xl items-center justify-center">
          {/* Left Column: Highlighted Author */}
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="p-8 rounded-xl shadow-2xl border-4 border-indigo-800 flex flex-col items-center max-w-xl w-full animate-fade-in">
              <div className="text-2xl font-bold text-purple-400 mb-2">{quotesSections[selectedIdx].author}</div>
            </div>
          </div>
          {/* Right Column: Quotes */}
          <div className="flex-1 flex flex-col space-y-4 w-full">
            {quotesSections.map((item, idx) => (
              <div
                key={idx}
                className={`rounded px-4 py-3 text-base cursor-pointer transition-all duration-300 shadow-md hover:scale-105 border ${selectedIdx === idx ? 'border-cyan-400' : 'border-transparent text-cyan-500'}`}
                onClick={() => setSelectedIdx(idx)}
              >
                {item.quote}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MyLibrary() {
  const [isEven, setIsEven] = useState(true);
  const router = useRouter();
  const items = librarySections;

  useEffect(() => {
    const randomInt = Math.floor(Math.random() * 1000);
    setIsEven(randomInt % 2 === 0);
  }, []);

  return (
    <div className="w-full py-32">
      <h2
        className={`text-4xl p-4 font-bold mb-8 transition-transform duration-500 animate-fade-in ${isEven ? 'scale-105' : 'scale-95'} text-transparent bg-clip-text bg-gradient-to-r from-gray-500 via-gray-600 to-gray-700 opacity-90 text-center`}
      >
        {isEven ? 'My turn' : 'My Try'}
      </h2>
      <div className="space-y-6 animate-fade-in flex flex-col items-center">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="p-4 rounded shadow border border-indigo-900 max-w-2xl w-full"
          >
            <div className="text-lg font-semibold text-indigo-200 mb-3">
              {item.title === 'optimal env' ? (
                <span
                  className="cursor-pointer hover:text-indigo-400"
                  onClick={() => router.push('/literature/file?from=optimal-env')}
                >
                  {item.title}
                </span>
              ) : (
                item.title
              )}
            </div>
            <div className="flex flex-wrap gap-3">
              {item.children.map((child, cidx) => (
                <div key={cidx}>
                  {item.title === 'optimal env' ? (
                    <Link
                      href={`/literature/config?read=${encodeURIComponent(child.name)}`}
                      className="flex items-center gap-3 px-5 py-3 rounded-lg border border-indigo-800 text-indigo-100 font-medium shadow transition-all duration-200 hover:scale-[1.03] active:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-700"
                      style={{ minWidth: '160px' }}
                    >
                      <FaBookOpen className="text-indigo-400 text-xl" />
                      <span className="flex-1 text-base">{child.name}</span>
                    </Link>
                  ) : (
                    <Link
                      href={child.link}
                      passHref
                      target={child.link.startsWith('/') ? undefined : '_blank'}
                      rel={child.link.startsWith('/') ? undefined : 'noopener noreferrer'}
                      className="flex items-center gap-3 px-5 py-3 rounded-lg border border-indigo-800 text-indigo-100 font-medium shadow transition-all duration-200 hover:scale-[1.03] active:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-700"
                      style={{ minWidth: '160px' }}
                    >
                      <FaBookOpen className="text-indigo-400 text-xl" />
                      <span className="flex-1 text-base">{child.name}</span>
                    </Link>
                  )}
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
    <div className='flex  flex-col items-center justify-center [&>*]:scroll-smooth [&>*]:border'>
      <Quote />
      <MyLibrary />
    </div>
  );
}