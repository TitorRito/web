"use client";
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { User, Contract } from '@/lib/types';
import LogInWallet from '@/components/w3/WalletLogIn';
import ContractCreate from '@/components/w3/ContractCreate';
import ContractABI from '@/components/w3/ContractAbi';

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


--game theory for contract 1155 -> login with wallet, select contract, play game, start time, if highscore in localhost. share compontent to social share
*/


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
    const chainId = network.chainId.toString();

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
  }, []);

  useEffect(() => {
    if (contract) {
      console.log('Contract updated:');
    }
  }, [contract]);

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

  const handleCreateContract = async (arg: any) => {
    if (!user) {
      setError('Please connect your wallet first');
      return;
    }
    if (!user.signer) {
      setError('Error: no user signer instance from ethers provided');
      return;
    }

    try {
      const contractAddress = arg.address;
      const contractABI = arg.abi;

      if (!contractAddress || !ethers.isAddress(contractAddress)) {
        setError('Invalid contract address');
        return;
      }

      if (!contractABI) {
        setError('Missing contract ABI');
        return;
      }

      const contractInstance = new ethers.Contract(
        contractAddress,
        contractABI,
        user.signer
      );

      setContract({
        address: contractAddress,
        chainId: Number(user.chainId),
        abi: contractABI,
        instance: contractInstance
      });

      setError(null);

    } catch (e: any) {
      console.error('Error creating contract instance:', e);
      setError(e.message || 'Failed to create contract instance');
    }
  }

  const handleResetContract = () => {
    setContract(null);
  };

  return (
    <div className='flex flex-col items-center justify-start gap-4 h-screen py-8'>
      {error && (
        <div className="text-red-500">
          Error: {error}
        </div>
      )}

      <LogInWallet
        user={user}
        handleConnection={handleConnectWallet}
      />

      {contract ? (
        <div className="w-full max-w-4xl py-5">
          <ContractABI contract={contract} />
          <div className="mt-4 text-center">
            <button
              onClick={handleResetContract}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
            >
              Use Different Contract
            </button>
          </div>
        </div>
      ) : (
        <ContractCreate handleCreateContract={handleCreateContract} />
      )}
    </div>
  );
}
