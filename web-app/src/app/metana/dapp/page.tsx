"use client";
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { User, Contract } from '@/lib/types';
import { NetworkConfig } from '@/lib/networks';
import LogInWallet from '@/components/w3/WalletLogIn';
import ContractCreate from '@/components/w3/ContractCreate';
import ContractABI from '@/components/w3/ContractAbi';

// --- Component: Error Notification ---
const ErrorNotification = ({ error, visible, onClose }) => {
  if (!visible || !error) return null;

  return (
    <div className="fixed top-5 right-5 bg-red-900 border border-red-700 text-white px-4 py-3 rounded shadow-lg z-50 flex items-start max-w-md animate-[fadeIn_0.3s_ease-in-out]">
      <div className="mr-2 flex-shrink-0 pt-0.5">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-300" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zm-1 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
        </svg>
      </div>
      <div>
        <p className="font-medium">Error</p>
        <p className="text-sm">{error}</p>
      </div>
      <button
        onClick={onClose}
        className="ml-auto flex-shrink-0 -mr-1 text-red-300 hover:text-white transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
};

// --- Component: Page Header ---
const Header = () => (
  <div className="mb-10 text-center opacity-0 translate-y-[-20px] animate-[fadeSlideDown_0.6s_forwards]">
    <h1 className="text-3xl font-bold text-blue-400 mb-2">Wallet to Contract Interaction</h1>
    <p className="text-gray-400 max-w-2xl mx-auto">
      First blockchain shenanigans. Take 0xf7b89162
    </p>
  </div>
);

// --- Component: Send ETH Form ---
const SendEthForm = ({ user, onSend, isSending, txHash }) => {
  const [sendEthAmount, setSendEthAmount] = useState('');
  const [sendEthAddress, setSendEthAddress] = useState('');

  const handleSendClick = () => {
    onSend(sendEthAddress, sendEthAmount);
  };

  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden min-w-[340px]">
      <div className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 px-4 py-3 border-b border-gray-700">
        <h3 className="font-medium text-blue-300">Quick Actions</h3>
      </div>

      <div className="p-4 space-y-3">
        <h4 className="text-sm font-medium text-gray-300 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
          Send ETH
        </h4>

        <div className="space-y-2">
          <input
            type="text"
            placeholder="Recipient address"
            value={sendEthAddress}
            onChange={(e) => setSendEthAddress(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-gray-200 text-sm"
          />
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Amount"
              value={sendEthAmount}
              onChange={(e) => setSendEthAmount(e.target.value)}
              className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded text-gray-200 text-sm"
            />
            <button
              onClick={handleSendClick}
              disabled={isSending || !user}
              className={`px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors ${isSending ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isSending ? 'Sending...' : 'Send'}
            </button>
          </div>

          {txHash && (
            <div className="text-xs bg-green-900/30 border border-green-800/30 rounded p-2 mt-2">
              <p className="text-green-400 font-medium">Transaction sent!</p>
              <p className="text-gray-400 truncate">Hash: {txHash}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Component: Sidebar ---
const Sidebar = ({ user, handleConnection, onSwitchNetwork, onSendEth, isSending, txHash, hasContract }) => (
  <div className="lg:col-span-3 space-y-6 opacity-0 translate-x-[-20px] animate-[fadeSlideRight_0.6s_0.2s_forwards]">
    <LogInWallet
      user={user}
      handleConnection={handleConnection}
      onSwitchNetwork={onSwitchNetwork}
    />

    {user && (
      <>
        <SendEthForm
          user={user}
          onSend={onSendEth}
          isSending={isSending}
          txHash={txHash}
        />

        {!hasContract && (
          <div className="text-center mt-4 border-gray-700 pt-4 bg-gray-800/50 rounded-lg p-3">
            <p className="text-sm text-blue-400 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Create a contract to start hacking
            </p>
          </div>
        )}
      </>
    )}
  </div>
);

// --- Component: Contract View ---
const ContractView = ({ contract, onReset }) => (
  <div className="bg-gray-800/30 rounded-xl border border-gray-700/50 overflow-hidden shadow-xl">
    <div className="bg-gradient-to-r from-green-900/30 to-blue-900/30 px-4 py-3 border-b border-gray-700 flex items-center">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
      <h3 className="font-medium text-green-300">Contract Locked and Loaded</h3>
    </div>

    <ContractABI contract={contract} />

    <div className="p-4 border-t border-gray-700/50 bg-gray-800/50 flex justify-between items-center">
      <span className="text-sm text-gray-400 font-mono">
        Contract: <span className="text-blue-400">{contract.address.substring(0, 6)}...{contract.address.substring(contract.address.length - 4)}</span>
      </span>
      <button
        onClick={onReset}
        className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-md transition-all duration-200 flex items-center space-x-1 text-sm"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        <span>Change Contract</span>
      </button>
    </div>
  </div>
);

// --- Component: Connect Prompt ---
const ConnectPrompt = ({ onConnect }) => (
  <div className="bg-gray-800/30 rounded-xl border border-gray-700/50 p-8 text-center">
    <div className="inline-flex rounded-full bg-gray-800 p-3 mb-4">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    </div>
    <h3 className="text-xl font-semibold mb-2 text-gray-200">Ready to Hack the Chain?</h3>
    <p className="text-gray-400 mb-6 max-w-md mx-auto">
      Connect your wallet to start messing with contracts. No fluff, just code.
    </p>
    {/* <button
      onClick={onConnect}
      className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200"
    >
      Connect Wallet
    </button> */}
  </div>
);

// --- Component: 404 Wallet Not Found ---
const WalletNotFound = () => (
  <div className="min-h-screen bg-gray-900 text-gray-200 flex items-center justify-center">
    <div className="text-center max-w-lg px-4">
      <div className="inline-flex rounded-full bg-red-900/30 p-4 mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h1 className="text-3xl font-bold text-red-400 mb-4">No Wallet Found</h1>
      <p className="text-gray-400 mb-8">
        To interact with this dApp, you need an Ethereum wallet like MetaMask installed in your browser.
      </p>
      <a
        href="https://metamask.io/download/"
        target="_blank"
        rel="noopener noreferrer"
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200 inline-flex items-center"
      >
        <span>Install MetaMask</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
    </div>
  </div>
);

// --- Component: Main Content ---
const MainContent = ({ user, contract, handleCreateContract, handleResetContract, handleConnectWallet }) => (
  <div className="lg:col-span-9 opacity-0 animate-[fadeIn_0.8s_0.4s_forwards]">
    {contract ? (
      <ContractView contract={contract} onReset={handleResetContract} />
    ) : (
      user ? (
        <ContractCreate handleCreateContract={handleCreateContract} />
      ) : (
        <ConnectPrompt onConnect={handleConnectWallet} />
      )
    )}
  </div>
);

// --- Component: Footer ---
const Footer = () => (
  <div className="mt-12 pt-6 border-t border-gray-800 text-center text-gray-500 text-sm opacity-0 animate-[fadeIn_0.8s_0.6s_forwards]">
    <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-4">
      <li className="flex items-center">
        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
        Connect wallet
      </li>
      <li className="flex items-center">
        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
        Deploy contract
      </li>
      <li className="flex items-center">
        <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
        Ship transactions
      </li>
    </ul>
    <p>My first implementation to web3…</p>
  </div>
);


import { getIsWeb3, getWallet } from '@/lib/json-rpc';

// --- Main Dapp Component ---
export default function Dapp() {
  const [user, setUser] = useState<User | null>(null);
  const [contract, setContract] = useState<Contract | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [errorVisible, setErrorVisible] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [txHash, setTxHash] = useState('');
  const [walletDetected, setWalletDetected] = useState<boolean | null>(null);

  useEffect(() => {
    setWalletDetected(getIsWeb3());
  }, []);

  useEffect(() => {
    if (error) {
      setErrorVisible(true);
      const timer = setTimeout(() => {
        setErrorVisible(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleConnectWallet = async () => {
    try {
      setError(null);
      const data = await getWallet();
      setUser(data);
    } catch (error: any) {
      console.error("Failed to connect wallet:", error);
      setError(error.message || "Failed to connect wallet");
    }
  };

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
  };

  const handleResetContract = () => {
    setContract(null);
  };


  const handleSwitchNetwork = async (networkConfig: NetworkConfig) => {
    console.log('click: handleSwitchNetwork');
  };

  const handleSendEth = async (recipient: string, amount: string) => {
    if (!user?.signer) {
      setError('Please connect your wallet first');
      return;
    }

    try {
      setIsSending(true);
      setError(null);

      if (!ethers.isAddress(recipient)) {
        setError('Invalid recipient address');
        setIsSending(false);
        return;
      }

      if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
        setError('Please enter a valid amount');
        setIsSending(false);
        return;
      }

      const tx = await user.signer.sendTransaction({
        to: recipient,
        value: ethers.parseEther(amount)
      });

      setTxHash(tx.hash);
    } catch (e: any) {
      console.error('Error sending ETH:', e);
      setError(e.message || 'Failed to send ETH');
    } finally {
      setIsSending(false);
    }
  };

  // If wallet detection check is still in progress, show a loading state
  if (walletDetected === null) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // If no wallet is detected, show the WalletNotFound component
  if (walletDetected === false) {
    return <WalletNotFound />;
  }

  // If wallet is detected, show the main dApp
  return (
    <div className='min-h-screen bg-gray-900 text-gray-200 py-10 px-4'>
      <div className='max-w-7xl mx-auto'>
        <Header />

        <ErrorNotification
          error={error}
          visible={errorVisible}
          onClose={() => setErrorVisible(false)}
        />

        <div className='grid grid-cols-1 lg:grid-cols-12 gap-6'>
          <Sidebar
            user={user}
            handleConnection={handleConnectWallet}
            onSwitchNetwork={handleSwitchNetwork}
            onSendEth={handleSendEth}
            isSending={isSending}
            txHash={txHash}
            hasContract={!!contract}
          />

          <MainContent
            user={user}
            contract={contract}
            handleCreateContract={handleCreateContract}
            handleResetContract={handleResetContract}
            handleConnectWallet={handleConnectWallet}
          />
        </div>

        <Footer />
      </div>
    </div>
  );
}

// --- Helper function ---
async function getUserProvider(): Promise<User> {
  if (!window.ethereum) {
    throw new Error("No Ethereum provider found. Please install MetaMask or another wallet extension.");
  }

  try {
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
