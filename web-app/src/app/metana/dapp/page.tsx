"use client";
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { User, Contract } from '@/lib/types';
import LogInWallet from '@/components/w3/WalletLogIn';
import ContractCreate from '@/components/w3/ContractCreate';
import ContractABI from '@/components/w3/ContractAbi';
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

// --- Component: Error Notification ---
const ErrorNotification = ({ error, visible, onClose }) => {
  if (!visible || !error) return null;

  return (
    <div className="fixed top-5 right-5 bg-red-900 border border-red-700 text-white px-4 py-3 rounded shadow-lg z-50 flex items-start max-w-md animate-[fadeIn_0.3s_ease-in-out]">
      <div className="mr-2 flex-shrink-0 pt-0.5">
        <ErrorIcon />
      </div>
      <div>
        <p className="font-medium">Error</p>
        <p className="text-sm">{error}</p>
      </div>
      <button
        onClick={onClose}
        className="ml-auto flex-shrink-0 -mr-1 text-red-300 hover:text-white transition-colors"
      >
        <CloseIcon />
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
          <SendIcon />
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
const Sidebar = ({ onSendEth, isSending, txHash, hasContract }) => (
  <div className="mx-auto grid grid-cols-1 lg:col-span-3 space-y-6 opacity-0 translate-x-[-20px] animate-[fadeSlideRight_0.6s_0.2s_forwards]">
    <LogInWallet />

    {/* {user && (
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
              <InfoIcon />
              Create a contract to start hacking
            </p>
          </div>
        )}
      </>
    )} */}

  </div>
);

// --- Component: Contract View ---
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
import { UserProvider } from '@/lib/UserContext';

// --- Main Dapp Component ---
export default function Dapp() {
  const [contract, setContract] = useState<Contract | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [errorVisible, setErrorVisible] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [txHash, setTxHash] = useState('');
  const [walletDetected, setWalletDetected] = useState<boolean | null>(null);

  useEffect(() => {
    setWalletDetected(getIsWeb3());
    // async function fetchWallet() {
    //   const data = await getWallet();
    //   setUser(data);
    // } //for develiopment flow
    // fetchWallet();
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
    <UserProvider>

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
              onSendEth={handleSendEth}
              isSending={isSending}
              txHash={txHash}
              hasContract={!!contract}
            />

            {/* <MainContent
              contract={contract}
              handleCreateContract={handleCreateContract}
              handleResetContract={handleResetContract}
            /> */}
          </div>

          <Footer />
        </div>
      </div>
    </UserProvider>

  );
}
