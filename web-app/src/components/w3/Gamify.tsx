'use client';
import React, { useState, useEffect } from 'react';
import { useUser } from "@/lib/UserContext";
import WalletLogIn from "./WalletLogIn";
import GamePlay from "./GamePlay";

const Game = () => {

  const { contract, updateContract } = useUser();

  const fileName = "ErikForge-sepolia.json";

  const handleContractClick = async (fileName: string) => {
    try {
      const response = await fetch(`/metana/dapp/api?getContract=${fileName}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch contract: ${response.status}`);
      }

      const data = await response.json();
      if (data?.data) {
        // Add the filename as the name if not present in data
        if (!data.data.name) {
          data.data.name = fileName.replace('.json', '');
        }
        updateContract(data.data);
      } else {
        throw new Error("Invalid contract data received");
      }
    } catch (err: any) {
      console.error("Error loading contract:", err);
    }
  };

  return (
    <div>
      {contract ? (
      <GamePlay contract={contract} />
      ) : (
      <div
        className="w-full animate-slide-up border rounded p-4 text-center"
        onClick={() => handleContractClick(fileName)}
      >
        Create Game, by importing the contract.
      </div>
      )}
    </div>
  );
};

export default function Gamify() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 space-y-6">
      <div className="w-full animate-slide-down">
        <WalletLogIn />
      </div>
      <Game />
    </div>
  );
}
