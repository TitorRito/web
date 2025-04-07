'use client'
import React, { useRef } from 'react';
import { MiningIcon, PitIcon } from '../../lib/svgs';

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
    <div className="w-full p-6 rounded-lg"
      style={{width: '100%'}}
    >
      {/* User input section */}
      <div className="mb-6 p-4 border rounded-lg bg-gray-800">
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
              <MiningIcon />
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
              <PitIcon />
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
                  <MiningIcon />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBurn(item.id);
                  }}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-700 hover:bg-gray-600 text-red-400 transition-all"
                  title="Burn"
                >
                  <PitIcon />
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
