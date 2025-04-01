import React, { useEffect, useState } from 'react';
import { User } from '@/lib/types';
import { WalletLoader } from '@/lib/svgs';
import Network from './Network';

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

const UserUI = ({ user }: { user: User }) => {

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

                    <Network {...user.network} />
                </div>
            </div>
        </div>
    );
};

const WalletLogIn = ({
    user,
    handleConnection,
}: {
    user: User | null,
    handleConnection: () => Promise<void>,
}) => {
    const [isConnecting, setIsConnecting] = useState(false);

    const handleConnectionWithLoading = async () => {
        setIsConnecting(true);
        try {
            await handleConnection();
        } catch (error) {
            console.error("Connection failed:", error);
        } finally {
            setIsConnecting(false);
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
                <UserUI user={user} />
            ) : (
                <Login handleConnection={handleConnectionWithLoading} isConnecting={isConnecting} />
            )}
        </div>
    );
};

export default WalletLogIn;
