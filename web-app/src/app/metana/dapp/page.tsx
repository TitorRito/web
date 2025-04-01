"use client";
import { useEffect, useState } from 'react';
import { ethers, Network } from 'ethers';
import { User, Contract } from '@/lib/types';
import LogInWallet from '@/components/w3/WalletLogIn';
import LoginNetwork from '@/components/w3/NetworkLogin';
import LoginContract from '@/components/w3/ContractLogin';
import ContractCreate from '@/components/w3/ContractCreate';
import ContractABI from '@/components/w3/ContractAbi';
import { ErrorNotification } from '@/components/ErrorComponent';
import { getIsWeb3, getWallet } from '@/lib/json-rpc';
import { UserProvider, useUser } from '@/lib/UserContext';

import {
  ErrorIcon,
  CloseIcon,
  SendIcon,
  InfoIcon,
  CheckShieldIcon,
  RefreshIcon,
  LightningIcon,
  WarningIcon,
  ExternalLinkIcon
} from '@/lib/svgs';

const Header = () => (
  <div className="mb-10 text-center opacity-0 translate-y-[-20px] animate-[fadeSlideDown_0.6s_forwards]">
    <h1 className="text-3xl font-bold text-blue-400 mb-2">Wallet to Contract Interaction</h1>
    <p className="text-gray-400 max-w-2xl mx-auto">
      First blockchain shenanigans. Take 0xf7b89162
    </p>
  </div>
);


const ContractView = ({ contract, onReset }) => (
  <div className="bg-gray-800/30 rounded-xl border border-gray-700/50 overflow-hidden shadow-xl">
    <div className="bg-gradient-to-r from-green-900/30 to-blue-900/30 px-4 py-3 border-b border-gray-700 flex items-center">
      <CheckShieldIcon />
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
        <RefreshIcon />
        <span>Change Contract</span>
      </button>
    </div>
  </div>
);

// --- Component: Connect Prompt ---
const ConnectPrompt = ({ onConnect }) => (
  <div className="bg-gray-800/30 rounded-xl border border-gray-700/50 p-8 text-center">
    <div className="inline-flex rounded-full bg-gray-800 p-3 mb-4">
      <LightningIcon />
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
        <WarningIcon />
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
        <ExternalLinkIcon />
      </a>
    </div>
  </div>
);

export default function Dapp() {
  const [error, setError] = useState<string | null>(null);
  const [errorVisible, setErrorVisible] = useState(false);
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


  if (walletDetected === null) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (walletDetected === false) {
    return <WalletNotFound />;
  }

  return (
    <UserProvider>
      <div className='min-h-screen bg-gray-900 text-gray-200 py-10 px-4'>
        <div className='max-w-7xl mx-auto'>
          <Header />

          <ErrorNotification
            error={error}
            visible={errorVisible}
            onClose={() => setErrorVisible(false)}
          />

          <div className='flex flex-col gap-8'>
            <LoginContract />
            <LogInWallet />
            <LoginNetwork />
          </div>
        </div>
      </div>
    </UserProvider>
  );
}
