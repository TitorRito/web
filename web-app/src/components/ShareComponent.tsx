'use client';

import React, { useState, useEffect, useRef } from 'react';

interface ShareComponentProps {
  url: string;
  title: string;
}

export const ShareComponent: React.FC<ShareComponentProps> = ({ url, title }) => {
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Handle clicks outside the share menu to close it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsShareMenuOpen(false);
      }
    }
    
    // Add event listener when menu is open
    if (isShareMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    // Clean up the event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isShareMenuOpen]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: `Check out this project: ${title}`,
          url: url,
        });
      } catch (error) {
        // Don't log the error to console when user cancels the share dialog
        if ((error as Error).name !== 'AbortError') {
          console.error('Error sharing:', error);
        }
      }
    } else {
      // Fallback to toggle share menu with copy option
      setIsShareMenuOpen(!isShareMenuOpen);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
    setTimeout(() => setIsShareMenuOpen(false), 2000);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button 
        onClick={handleShare}
        className="
          px-3 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded 
          transition-all duration-200 text-sm font-mono
          flex items-center space-x-1
        "
        title="Share this project"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
        <span>Share</span>
      </button>

      {/* Share menu with copy link option */}
      {isShareMenuOpen && (
        <div className="absolute left-0 bottom-full mb-2 bg-gray-800 border border-gray-700 rounded shadow-lg p-2 w-48 z-10">
          <button 
            className="w-full text-left px-2 py-1.5 hover:bg-gray-700 rounded text-sm text-gray-300 flex items-center"
            onClick={handleCopy}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
            </svg>
            {copySuccess ? 'Copied!' : 'Copy link'}
          </button>
        </div>
      )}
    </div>
  );
};
