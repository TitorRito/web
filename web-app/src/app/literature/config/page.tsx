'use client';
import React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const items = [
    { name: '.vimrc', link: 'https://www.google.com/search?q=vimrc' },
    { name: '.zshrc', link: 'https://www.google.com/search?q=zshrc' },
    { name: '.env', link: 'https://www.google.com/search?q=env+file' },
    { name: '.wallet3', link: 'https://www.google.com/search?q=wallet3' },
    { name: '.frabrik', link: 'https://www.google.com/search?q=frabrik' },
    { name: 'fzf', link: 'https://github.com/junegunn/fzf' },
];

export default function FilePage() {
    const searchParams = useSearchParams();
    const selected = searchParams.get('read');

    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-center p-8">
            <h1 className="text-4xl font-bold mb-8 text-indigo-700">Read my configs ... take this everywhere i go...</h1>
            <div className="flex flex-wrap gap-4 mt-4">
                {items.map((item) => (
                    <Link
                        key={item.name}
                        href={`?read=${encodeURIComponent(item.name)}`}
                        scroll={false}
                        className={`px-6 py-3 rounded-lg border-2 transition-colors duration-200 cursor-pointer text-lg font-medium ${selected === item.name ? 'border-indigo-600 bg-indigo-50 text-indigo-800' : 'border-gray-300 hover:border-indigo-400'}`}
                    >
                        {item.name}
                    </Link>
                ))}
            </div>
        </div>
    );
}
