import { useState, useEffect, useRef } from 'react';
import { networks, NetworkConfig } from '@/lib/networks';
import NetworkLabel from './NetworkLabel';

interface NetworkSelectorProps {
  currentChainId: string | number;
  onNetworkChange: (networkConfig: NetworkConfig) => void;
  onClose: () => void;
}

export default function NetworkSelector({
  currentChainId,
  onNetworkChange,
  onClose
}: NetworkSelectorProps) {
  const [isOpen, setIsOpen] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const currentId = typeof currentChainId === 'string' ? parseInt(currentChainId) : currentChainId;

  return (
    <div className="fixed inset-0" style={{ zIndex: 1000 }}>
      <div className="absolute inset-0" onClick={onClose}></div>
      <div 
        className="absolute top-auto left-auto mt-1 w-[calc(100%-16px)] max-w-xs rounded-lg shadow-2xl" 
        style={{ zIndex: 1001 }}
        ref={dropdownRef}
      >
        <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg overflow-hidden">
          <div className="p-3 border-b border-gray-700">
            <h3 className="text-sm font-medium text-gray-300">Select Network</h3>
          </div>
          
          <ul className="max-h-60 overflow-auto py-1">
            {Object.values(networks).map((network) => (
              <li 
                key={network.chainId} 
                className={`px-3 py-2 cursor-pointer hover:bg-gray-700 transition-colors flex items-center justify-between ${
                  network.chainId === currentId ? 'bg-gray-700/50' : ''
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  onNetworkChange(network);
                  onClose();
                }}
              >
                {/* Updated NetworkLabel with chainId: name format */}
                <NetworkLabel network={{ id: network.chainId.toString(), name: network.name }} />
                
                {network.chainId === currentId && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
