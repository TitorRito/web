'use client';

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { ShareComponent } from "../ShareComponent";

interface DappCardProps {
    title: string;
    link: string;
    objectives: string[];
    stack?: string[];
}

export const DappCard: React.FC<DappCardProps> = ({ title, link, objectives, stack }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [typedTitle, setTypedTitle] = useState('');
    const [showCursor, setShowCursor] = useState(true);

    // Typing animation effect
    useEffect(() => {
        let currentIndex = 0;
        let timer: NodeJS.Timeout;
        
        // Only start the animation when component mounts
        const typingAnimation = () => {
            if (currentIndex <= title.length) {
                setTypedTitle(title.substring(0, currentIndex));
                currentIndex++;
                timer = setTimeout(typingAnimation, 100); // Speed of typing
            } else {
                // Once typing is done, toggle cursor blink
                const cursorTimer = setInterval(() => {
                    setShowCursor(prev => !prev);
                }, 600);
                return () => clearInterval(cursorTimer);
            }
        };

        typingAnimation();
        return () => clearTimeout(timer);
    }, [title]);

    return (
        <div
            className="bg-gray-900 rounded-lg shadow-lg overflow-hidden border border-gray-700 hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-1 group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Terminal-like header with typing effect */}
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-4 py-3 border-b border-gray-700">
                <h2 className="text-lg font-mono text-blue-400 tracking-tight">
                    ~$ ./
                    <span className="text-green-400 font-bold">{typedTitle}</span>
                    <span className={`text-gray-400 ${showCursor ? 'opacity-100' : 'opacity-0'}`}>|</span>
                </h2>
            </div>

            <div className="p-5 bg-gradient-to-b from-gray-900 to-gray-950">
                {/* Description section */}
                <div className="space-y-3 mb-4">
                    <h3 className="text-gray-400 text-sm font-mono flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span className="text-blue-400">Description</span>
                    </h3>
                    <ul className="list-none pl-2 space-y-2 border-l-2 border-gray-800 group-hover:border-green-800 transition-colors">
                        {objectives.map((objective, index) => (
                            <li
                                key={index}
                                className="text-gray-400 text-sm pl-3 font-mono leading-relaxed group-hover:text-gray-300 transition-colors"
                                style={{ transitionDelay: `${index * 50}ms` }}
                            >
                                <span className="text-blue-500 mr-2">&gt;</span>
                                {objective}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Libraries section */}
                {stack && stack.length > 0 && (
                    <div className="space-y-3 mt-6 pt-4 border-t border-gray-800">
                        <h3 className="text-gray-400 text-sm font-mono flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                            </svg>
                            <span className="text-blue-400">Libraries</span>
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {stack.map((tech, index) => (
                                <div
                                    key={index}
                                    className="group/chip relative"
                                >
                                    <span className="group-hover/chip:opacity-100 opacity-0 absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-mono bg-gray-800 text-blue-300 px-2 py-1 rounded shadow-lg transition-opacity">
                                        {tech}
                                    </span>
                                    <span
                                        className={`
                      px-2 py-1 bg-gray-800 rounded-md text-xs font-mono 
                      ${isHovered ? 'text-green-400' : 'text-blue-300'}
                      hover:bg-gray-700 transition-all duration-300
                      transform hover:scale-105
                    `}
                                        style={{ transitionDelay: `${index * 30}ms` }}
                                    >
                                        {tech.split(' ')[0]}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className="bg-gray-950 px-4 py-3 flex justify-between items-center border-t border-gray-800 group-hover:border-blue-900/40 transition-colors">
                <ShareComponent url={`${window.location.origin}/${link}`} title={title} />
                
                <Link
                    href={link}
                    className="
                        px-4 py-2 bg-blue-900/50 hover:bg-blue-700 text-blue-200 rounded 
                        transition-all duration-300 text-sm font-mono 
                        group-hover:shadow-[0_0_12px_rgba(59,130,246,0.3)] 
                        flex items-center space-x-2
                    "
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    <span>Open</span>
                </Link>
            </div>
        </div>
    );
};
