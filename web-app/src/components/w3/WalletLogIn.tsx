import React, { useState } from 'react';
import { User } from '@/lib/types';
import NetworkLabel from './NetworkLabel';
import { WalletLoader } from '@/lib/svgs';
import NetworkSelector from './NetworkSelector';
import { networks, NetworkConfig } from '@/lib/networks';

const Login = ({ handleConnection, isConnecting }: { handleConnection: () => Promise<void>, isConnecting: boolean }) => {
    return (
        <div className="p-4">
            <button
                onClick={handleConnection}
                className="w-full py-3 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 text-white font-medium shadow-lg hover:from-blue-600 hover:to-blue-800 transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
                {isConnecting ? 'Connecting...' : 'Connect Wallet'}
            </button>
        </div>
    )
};

const UserUI = ({ user, onSwitchNetwork }: { user: User, onSwitchNetwork: (network: NetworkConfig) => void }) => {
    const [showNetworkSelector, setShowNetworkSelector] = useState(false);

    const shortenAddress = (address: string) => {
        return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        console.log('copied to clipboard:', text);
    };

    return (
        <div className="p-4">
            <div className="bg-gradient-to-br from-gray-800 to-black rounded-xl overflow-hidden shadow-lg border border-gray-700/30">
                {/* Card header with subtle accent */}
                <div className="relative h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500"></div>
                
                {/* Card contents */}
                <div className="p-5 space-y-4">
                    {/* Address section with improved styling */}
                    <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center text-xs text-gray-400 font-medium">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v-1l1-1 1-1 .257-.257A6 6 0 1118 8zm-6-4a1 1 0 100 2h2a1 1 0 100-2h-2z" clipRule="evenodd" />
                                </svg>
                                ADDRESS
                            </div>
                            <div 
                                onClick={() => copyToClipboard(user.address)}
                                className="group cursor-pointer"
                                title="Copy to clipboard"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 group-hover:text-blue-400 transition-colors" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                                    <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                                </svg>
                            </div>
                        </div>
                        <div
                            onClick={() => copyToClipboard(user.address)}
                            className="font-mono text-sm bg-gray-800/70 px-3 py-2 rounded-lg cursor-pointer transition-colors flex items-center"
                        >
                            <span className="text-gray-200 hover:text-blue-300">{shortenAddress(user.address)}</span>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        {/* Network section */}
                        <div className="space-y-1.5 relative">
                            <div className="flex items-center text-xs text-gray-400 font-medium">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                                </svg>
                                NETWORK
                            </div>
                            <div 
                              className="h-9 flex items-center cursor-pointer hover:bg-gray-800 p-1 rounded-lg transition-colors group"
                              onClick={() => setShowNetworkSelector(!showNetworkSelector)}
                            >
                                <NetworkLabel network={{ id: user.chainId || 'Unknown', name: user.network }} />
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 text-gray-500 group-hover:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                            
                            {showNetworkSelector && (
                              <NetworkSelector
                                currentChainId={user.chainId || '0'}
                                onNetworkChange={onSwitchNetwork}
                                onClose={() => setShowNetworkSelector(false)}
                              />
                            )}
                        </div>
                        
                        {/* Balance section - Improved to show full ETH value */}
                        <div className="space-y-1.5">
                            <div className="flex items-center text-xs text-gray-400 font-medium">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                                </svg>
                                BALANCE
                            </div>
                            <div className="bg-gray-800/70 px-3 py-2 rounded-lg text-gray-200 h-9 font-mono flex items-center justify-between">
                                <span className="truncate mr-2">{parseFloat(user.balance).toFixed(4)}</span>
                                <span className="text-xs text-gray-400 flex-shrink-0">ETH</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Card accent footer */}
                <div className="h-1 bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
            </div>
        </div>
    );
};

const WalletLogIn = ({
    user,
    handleConnection,
    onSwitchNetwork
}: {
    user: User | null,
    handleConnection: () => Promise<void>,
    onSwitchNetwork?: (network: NetworkConfig) => void
}) => {
    const [isConnecting, setIsConnecting] = useState(false);

    const handleConnectionWithLoading = async () => {
        setIsConnecting(true);

        try {
            // Connect immediately without delay
            await handleConnection();
        } catch (error) {
            console.error("Connection failed:", error);
        } finally {
            setIsConnecting(false);
        }
    };

    const handleNetworkSwitch = (network: NetworkConfig) => {
        if (onSwitchNetwork) {
            onSwitchNetwork(network);
        }
    };

    return (
        <div className="border border-gray-700 rounded-xl shadow-lg bg-gray-900 min-w-[340px]">
            <div className="flex justify-between items-center p-4 border-b border-gray-800">
                <h2 className='font-medium text-lg text-gray-200 flex items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                        <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                    </svg>
                    Wallet
                </h2>
                <div>
                    {!user && isConnecting && <WalletLoader />}
                </div>
            </div>
            {user ? (
                <UserUI user={user} onSwitchNetwork={handleNetworkSwitch} />
            ) : (
                <Login handleConnection={handleConnectionWithLoading} isConnecting={isConnecting} />
            )}
        </div>
    );
};

export default WalletLogIn;
