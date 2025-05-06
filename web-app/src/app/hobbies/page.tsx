'use client'
import { useRef } from 'react';

const content = [
  { name: 'videos', onClick: () => console.log('Clicked videos') },
  { name: 'content', onClick: () => console.log('Clicked content') },
  { name: 'social', onClick: () => console.log('Clicked social') },
  { name: 'kitetomania', onClick: () => console.log('Clicked kitetomania') },
  { name: 'programming', onClick: () => console.log('Clicked programming') },
  { name: 'education', onClick: () => console.log('Clicked education') },
];

export default function HobbiesPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="w-screen h-screen flex flex-col items-center justify-center overflow-y-scroll snap-y snap-mandatory"
      style={{ minHeight: '100vh' }}
    >
      {content.map((item, idx) => (
        <div
          key={item.name}
          className="snap-center w-full flex items-center justify-center h-screen transition-transform duration-700 hover:scale-105 cursor-pointer group"
          onClick={item.onClick}
        >
          <h1 className="text-5xl font-bold text-gray-900 drop-shadow-lg group-hover:text-purple-700 transition-colors duration-500">
            {item.name}
          </h1>
        </div>
      ))}
    </div>
  );
}
