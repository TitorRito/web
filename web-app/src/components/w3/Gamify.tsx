'use client'
import React, { useRef } from 'react';

// SVG Components for Mint and Burn actions
const MintIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 1a1 1 0 0 1 1 1v1.5c0 .28.22.5.5.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 0-.5.5V8c0 .28.22.5.5.5h.5a.5.5 0 0 1 .5.5v.5a.5.5 0 0 0 .5.5h1.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v.5a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 0-.5-.5H8a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 0 .5-.5V9a.5.5 0 0 1 .5-.5h.5a.5.5 0 0 0 .5-.5V6.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h1a.5.5 0 0 0 .5-.5V2a1 1 0 0 1 1-1z" />
    <path d="M15 22c-1.66 0-3-1.34-3-3 0-1.31.84-2.41 2-2.83V14.1A5.002 5.002 0 0 0 9 9.1V7.17C7.84 6.76 7 5.66 7 4.35 7 2.69 8.34 1.35 10 1.35s3 1.34 3 3c0 1.31-.84 2.41-2 2.83v2.07c2.01.37 3.57 1.93 3.94 3.94h2.07c.41-1.16 1.51-2 2.83-2 1.66 0 3 1.34 3 3s-1.34 3-3 3c-1.31 0-2.41-.84-2.83-2h-2.07c-.41 1.16-1.51 2-2.83 2zm0-4a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM10 3.35a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm10 10a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
    <circle cx="18.5" cy="4.5" r="2.5" fill="#4ade80" />
  </svg>
);

const BurnIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 22c-4.97 0-9-2.91-9-6.5 0-1.91.87-3.73 2.44-5.03C6.45 8.74 7.96 7.5 10 7.5c1.93 0 2.68 1 3 1.77.32-.77 1.07-1.77 3-1.77.7 0 1.37.14 2 .42V4.5A1.5 1.5 0 0 0 16.5 3h-9A1.5 1.5 0 0 0 6 4.5v2.07C4.06 7.69 3 9.75 3 12c0 4.42 4.03 8 9 8s9-3.58 9-8c0-1.97-.75-3.87-2.11-5.37a3.35 3.35 0 0 0-.89-.63v1.5c0 2.49-1.76 4.5-4 4.5-1.6 0-2.74-1.53-3-3-.26 1.47-1.4 3-3 3-1.98 0-3-2.06-3-4 0-3.03 2.4-4.5 4-4.5.73 0 1.34.21 1.82.62.81-1.22 2.13-1.82 4.18-1.82.9 0 1.75.18 2.5.5a4 4 0 0 1 3.5 3.97c0 2.21-1.79 4-4 4-1.2 0-2.27-.54-3-1.38-.73.84-1.8 1.38-3 1.38z" />
    <path d="M16.5 1A3.5 3.5 0 0 1 20 4.5v1a1.5 1.5 0 0 1-1.5 1.5h-2A1.5 1.5 0 0 1 15 5.5v-3A1.5 1.5 0 0 1 16.5 1z" fill="#f87171" />
    <path d="M15.24 20.5a5 5 0 0 1-3.24-4.82v-2.42c0-.98.8-1.76 1.76-1.76h.5c.98 0 1.76.78 1.76 1.76v1.24a2 2 0 0 0 4 0v-3c-1.47 0-2.5-1.3-2.5-3V7.26C16.03 6.57 15.1 6 14 6c-2.5 0-4 2-4 5 0 3.25 1.5 5.52 5.11 5.5z" fill="#f87171" />
  </svg>
);

interface GameItem {
  id: number;
  color: string;
  title: string;
  address: string[];
}

const gameItems: GameItem[] = [
  { id: 0, color: '#433334', title: 'SEED', address: ['0xFire1', '0xFire2', '0xFire3'] },
  { id: 1, color: '#2D3748', title: 'WATER', address: ['0xWater1', '0xWater2'] },
  { id: 2, color: '#28403A', title: 'SOIL', address: ['0xEarth1', '0xEarth2', '0xEarth3'] },
  { id: 3, color: '#4A4A23', title: 'PLANT', address: ['0xLightning1'] },
  { id: 4, color: '#3C2F46', title: 'FRUIT', address: ['0xMagic1', '0xMagic2'] },
  { id: 5, color: '#463342', title: 'FLOWER', address: ['0xPsychic1', '0xPsychic2'] },
  { id: 6, color: '#383838', title: 'BASKET', address: ['0xMetal1', '0xMetal2', '0xMetal3'] },
];


/* todos
get user wallet, ethers
get contract automatically load from localhost -> later from sepolia...
interacrt with contract
  - click on box to mint, see updated address inside block
  - click on box to burn, see updated address inside block
do we need events then? for .on...?
wait for transaction ...?
switch wallet and see if it still works?

*/

export default function Gamify() {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = (id: number) => {
    console.log(`Clicked on item with ID: ${id}`);
  };

  const handleMint = (id: number) => {
    if (id < 0 || id > 6) {
      console.error("Invalid token ID for minting");
      return;
    }
    console.log(`Minting item with ID: ${id}`);
  };

  const handleBurn = (id: number) => {
    if (id < 0 || id > 6) {
      console.error("Invalid token ID for burning");
      return;
    }
    console.log(`Burning item with ID: ${id}`);
  };

  return (
    <div className="w-full bg-gray-900 text-gray-200 p-6 rounded-lg">
      {/* User input section */}
      <div className="mb-6 p-4 border border-gray-700 rounded-lg bg-gray-800">
        <h3 className="text-lg font-semibold mb-3">Actions</h3>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-grow">
            <label htmlFor="tokenId" className="block text-sm font-medium text-gray-400 mb-1">
              Token ID (0-6)
            </label>
            <input
              id="tokenId"
              ref={inputRef}
              type="number"
              min="0"
              max="6"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter token ID"
            />
          </div>
          <div className="flex items-end gap-2">
            <button
              onClick={() => {
                const id = parseInt(inputRef.current?.value || '');
                if (isNaN(id)) {
                  console.error("Please enter a valid token ID");
                  return;
                }
                handleMint(id);
                if (inputRef.current) inputRef.current.value = '';
              }}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-green-400 rounded flex items-center transition-colors"
            >
              <MintIcon />
              <span className="ml-2">Mint</span>
            </button>
            <button
              onClick={() => {
                const id = parseInt(inputRef.current?.value || '');
                if (isNaN(id)) {
                  console.error("Please enter a valid token ID");
                  return;
                }
                handleBurn(id);
                if (inputRef.current) inputRef.current.value = '';
              }}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-red-400 rounded flex items-center transition-colors"
            >
              <BurnIcon />
              <span className="ml-2">Burn</span>
            </button>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-bold mb-4 text-gray-200">Game Blocks</h2>
      <div className="grid grid-cols-1 gap-4">
        {gameItems.map((item, index) => (
          <React.Fragment key={item.id}>
            <div
              onClick={() => handleClick(item.id)}
              className="p-4 rounded-lg cursor-pointer transition-transform hover:scale-105 relative bg-gray-800"
              style={{
                border: `2px solid ${item.color}`,
                boxShadow: `0 0 8px rgba(0,0,0,0.5)`
              }}
            >
              {/* Elegant buttons positioned at the top right */}
              <div className="absolute top-2 right-2 flex space-x-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMint(item.id);
                  }}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-700 hover:bg-gray-600 text-green-400 transition-all"
                  title="Mint"
                >
                  <MintIcon />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBurn(item.id);
                  }}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-700 hover:bg-gray-600 text-red-400 transition-all"
                  title="Burn"
                >
                  <BurnIcon />
                </button>
              </div>

              <h2 className="font-bold text-gray-200">{item.id}: {item.title}</h2>
              <div className="mt-2">
                {item.address.map((addr, idx) => (
                  <p key={idx} className="text-gray-400">{addr}</p>
                ))}
              </div>
            </div>
            {index === 2 && (
              <hr className="border-t-2 border-gray-700 my-4 w-full" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
