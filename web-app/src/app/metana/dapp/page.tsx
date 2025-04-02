"use client";
import { useEffect, useState } from 'react';
import LogInWallet from '@/components/w3/WalletLogIn';
import LoginNetwork from '@/components/w3/NetworkLogin';
import LoginContract from '@/components/w3/ContractLogin';
import { ErrorNotification } from '@/components/ErrorComponent';
import { getIsWeb3 } from '@/lib/json-rpc';
import { UserProvider } from '@/lib/UserContext';

import {
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
