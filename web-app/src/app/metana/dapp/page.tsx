"use client";
import { use, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { User, Contract } from '@/lib/types';
import LogInWallet from '@/components/LogInWallet';

async function getUserProvider(): Promise<User> {
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
  const [contract, setContract] = useState<Contract | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('useEffect: entry');

    // (async () => {
    //   try {
    //     const userData = await getUserProvider();
    //     setUser(userData);
    //   } catch (error: any) {
    //     console.error("Failed to connect wallet:", error);
    //     setError(error.message || "Failed to connect wallet");
    //   }
    // })();
  }, []);

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

  const handleCreateContract = async () => {
    console.log('handle: create contract');

    if (!user) {
      setError('Please connect your wallet first');
      return;
    }
    if (!user.signer) {
      setError('Error: no user signer instance from ethers provided');
      return;
    }


  }

  if (window) {
    window.u = user;
    window.c = contract;
  }

  return (
    <div className='flex flex-col items-center justify-around gap-4 h-screen'>
      <LogInWallet
        user={user}
        handleConnection={handleConnectWallet}
      />
    </div>
  );
}
