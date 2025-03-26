"use client";
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
/*
my first wallet interaction. from ethers
we need | provider, contract, signer,
......... address, network, balance

wallet/user steps:
1. user connects wallet using web provider
2. user can now see his address, network, balance

contract/abi steps:
1. user can create instance of contract | abi and address is needed
2. user can browse our contracts, or complelety greate new contract
3. user can interact with contract, read, write, listen

dudus and improvements:
- toast notification when eth_ tx are called. ()
- user can switch network
- 2 buttons. play my gameplay, or new contract interaction
*/

// Declare the ethereum provider on the window object
declare global {
  interface Window {
    ethereum?: any;  // Changed to optional to avoid TypeScript errors
  }
}

type User = {
  address: string;
  network: string;
  chainId: number;  // Add chainId property
  balance: string;
  signer: ethers.JsonRpcSigner;
  provider: ethers.BrowserProvider;
}

type Contract = {
  address: string;
  abi: ethers.InterfaceAbi;
  instance: ethers.Contract;
}

async function getUserProvider(): Promise<User> {
  // Check if ethereum provider exists
  if (!window.ethereum) {
    throw new Error("No Ethereum provider found. Please install MetaMask or another wallet extension.");
  }

  try {
    // Request account access - check if request method existsimplementations 
    // Fallback for older providers or different wallet implementations 
    if (typeof window.ethereum.request !== 'function') {
      if (typeof window.ethereum.enable === 'function') {
        await window.ethereum.enable();
      } else {
        throw new Error("Ethereum provider doesn't have request or enable method");
      }
    } else {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const address = await signer.getAddress();

    const network = await provider.getNetwork();
    const chainId = Number(network.chainId);  // Get chainId as a number

    const balanceWei = await provider.getBalance(address);
    const balance = ethers.formatEther(balanceWei);

    return {
      address,
      network: network.name,
      chainId,
      balance,
      signer,
      provider
    };
  } catch (error) {
    console.error("Error connecting to wallet:", error);
    throw error;
  }
}

export default function Dapp() {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleConnectWallet = async () => {
    try {
      setError(null);
      console.log('handle: connect wallet');
      const userData = await getUserProvider();
      setUser(userData);
    } catch (error: any) {
      console.error("Failed to connect wallet:", error);
      setError(error.message || "Failed to connect wallet");
    }
  }

  return (
    <div className='flex flex-col items-center justify-around gap-4 h-screen'>
      <div className='flex gap-4 [&>div]:border [&>div]:rounded-xl [&>div]:p-12 [&>div]:border-gray-300'>
        <div className="flex flex-col items-center justify-center gap-4 [&>div]:border [&>div]:p-4 [&>div]:rounded-xl">
          <button onClick={handleConnectWallet}>
            Connect Wallet
          </button>
          {error && <div className="text-red-500">{error}</div>}
          <div>User Address: <span>{user ? user.address : 'null'}</span></div>
          <div>User Network: <span>{user ? user.network : 'null'}</span></div>
          <div>Chain ID: <span>{user ? user.chainId : 'null'}</span></div>
          <div>User Balance: <span>{user ? user.balance : 'null'}</span></div>
        </div>
        <button>Connect Address</button>
      </div>
    </div>
  );
}
