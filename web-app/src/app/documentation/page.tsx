'use client';

import { FaGithub } from 'react-icons/fa';

export default function DocumentationPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-800">
      <header className="w-full flex flex-col items-center mt-24">
        <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 drop-shadow-lg tracking-tight mb-6">
          Documentation
        </h1>
        <p className="text-lg text-indigo-200 opacity-80 mt-2">
          Welcome to the docs. Explore, learn, and build!
        </p>
      </header>
      <footer className="w-full flex justify-center items-center py-10">
        <a
          href="https://github.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 text-indigo-300 hover:text-white transition-colors duration-200"
        >
          <FaGithub className="text-4xl group-hover:scale-110 transition-transform duration-200" />
          <span className="sr-only">GitHub</span>
        </a>
      </footer>
    </div>
  );
}
