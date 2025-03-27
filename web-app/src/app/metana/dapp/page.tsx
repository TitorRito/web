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


--game theory for contract 1155 -> login with wallet, select contract, play game, start time, if highscore in localhost. share compontent to social share
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
  chainId: number;
  balance: string;
  signer: ethers.JsonRpcSigner;
  provider: ethers.BrowserProvider;
}

type Contract = {
  address: string | null;
  abi: ethers.InterfaceAbi | null;
  instance: ethers.Contract | null;
  state: string | null;
  // events: ethers.EventFilter | null;
  // signer: ethers.JsonRpcSigner | null;
  // provider: ethers.BrowserProvider | null;
  //a provider = read only, a signer = read and write | important when creating the instance of a contract
}

const testContractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const testContractAbi = [
  "event URI(string,uint256)",
  "function BASKET() view",
  "function COOLDOWN() view",
  "function FLOWER() view",
  "function FRUIT() view",
  "function PLANT() view",
  "function SEED() view",
  "function SOIL() view",
  "function WATER() view",
  "function balanceOf(address,uint256) view",
  "function balanceOfBatch(address[],uint256[]) view",
  "function burnToken(uint256) nonpayable",
  "function forgeToken(uint256) nonpayable",
  "function lastMintTime(address) view",
]

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
  const [contract, setContract] = useState<Contract | null>(null);
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

  //new ethers.Contract( address , abi , signerOrProvider )
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

    let address = (document.getElementById('ui-contract') as HTMLInputElement).value;

    if (address.length < 1)
      address = testContractAddress;


    const userAbi = (document.getElementById('ui-abi') as HTMLTextAreaElement).value;

    let abi = [];
    if (userAbi.length < 1)
      abi = testContractAbi;
    else
      abi = userAbi.split(',').filter((line) => line.trim() !== "");

    console.log('address, ', address);
    console.log('abi, ', abi);

    try {
      const contractInstance = new ethers.Contract(address, abi, user.signer);
      console.log('contract instance', contractInstance);
      setContract({
        address,
        abi: abi,
        instance: contractInstance,
        state: 'created'
      });
    } catch (e) {
      console.log('big fat error', e);
    }

  }

  if (window) {
    window.u = user;
    window.c = contract;
  }

  return (
    <div className='flex flex-col items-center justify-around gap-4 h-screen'>
      <div className='flex gap-4 [&>div]:border [&>div]:rounded-xl [&>div]:p-12 [&>div]:border-gray-300'>
        <div className="flex flex-col items-center justify-center gap-4 [&>div]:border [&>div]:p-4 [&>div]:rounded-xl">
          <button onClick={handleConnectWallet}>
            Connect Wallet
          </button>
          <div>User Address: <span>{user ? user.address : 'null'}</span></div>
          <div>User Network: <span>{user ? user.network : 'null'}</span></div>
          <div>Chain ID: <span>{user ? user.chainId : 'null'}</span></div>
          <div>User Balance: <span>{user ? user.balance : 'null'}</span></div>
        </div>

        {error && <div className="text-red-500">{error}</div>}

        <div className="flex flex-col gap-4 w-[800px]">
          <h2 className='border-b text-blue-500 text-center'>Contracts</h2>
          {/* do dropdown with custom contracts or update new */}

          <div id='ui-contract-form' className='border rounded-xl'>
            <div className='flex justify-between items-center gap-4 bg-cyan-900 p-1 rounded-t-xl'>
              <h2 className='pl-2'>Create un Contract</h2>
              <button onClick={handleCreateContract} disabled={!user}>Create</button>
            </div>
            <div className='flex flex-col gap-4 my-4 p-4 rounded-xl'>
              <div className='flex gap-4 items-center'>
                <label htmlFor="ui-contract">Address:</label>
                <input id="ui-contract" type="text" className="border p-2 rounded" placeholder="0x240" />
              </div>
              <div className='flex gap-4 items-center'>
                <label htmlFor="ui-abi">ABI:</label>
                <textarea style={{ minHeight: '400px' }} id="ui-abi" className="border p-2 rounded grow" placeholder="[]" />
              </div>
              <div className='flex gap-4 items-center'>
                <label htmlFor="ui-signer">Signer:</label>
                <input
                  id="ui-signer"
                  disabled
                  type="text"
                  className="border p-2 rounded"
                  placeholder="user wallet?"
                  value={user ? user.address : ''}
                />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
