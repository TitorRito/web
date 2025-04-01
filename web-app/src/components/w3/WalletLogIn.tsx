import React, { useEffect, useState } from 'react';
import { User } from '@/lib/types';
import { WalletLoader, WalletAddressIcon, CopyIcon, WalletIcon } from '@/lib/svgs';
import Network from './Network';
import { useUser } from '@/lib/UserContext';
import { getWallet } from '@/lib/json-rpc';

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
                                <WalletAddressIcon />
                                ADDRESS
                            </div>
                            <div
                                onClick={() => copyToClipboard(user.address)}
                                className="group cursor-pointer"
                                title="Copy to clipboard"
                            >
                                <CopyIcon />
                            </div>
                        </div>
                        <div
                            onClick={() => copyToClipboard(user.address)}
                            className="font-mono text-sm bg-gray-800/70 px-3 py-2 rounded-lg cursor-pointer transition-colors flex items-center"
                        >
                            <span className="text-gray-200 hover:text-blue-300">{shortenAddress(user.address)}</span>
                        </div>
                    </div>

                    <Network />
                </div>
            </div>
        </div>
    );
};

const WalletLogIn = () => {
    const [isConnecting, setIsConnecting] = useState(false);
    const { user, setUser } = useUser();

    const handleConnectionWithLoading = async () => {
        setIsConnecting(true);
        const data = await getWallet();
        setUser(data);
        setIsConnecting(false);
    };

    return (
        <div className="border border-gray-700 rounded-xl shadow-lg bg-gray-900 min-w-[340px]">
            <div className="flex justify-between items-center p-4 border-b border-gray-800">
                <h2 className='font-medium text-lg text-gray-200 flex items-center'>
                    <WalletIcon />
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
