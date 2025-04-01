import React, { useState } from 'react';
import { User } from '@/lib/types';
import { WalletLoader, WalletAddressIcon, CopyIcon, WalletIcon, LoginIcon } from '@/lib/svgs';
import Network from './Network';
import { useUser } from '@/lib/UserContext';
import { getWallet } from '@/lib/json-rpc';
import CardCrypto from './CardCrypto';

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
                <div className="relative h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500"></div>

                <div className="p-5 space-y-4">
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
        <CardCrypto
            title="Wallet"
            icon={<WalletIcon />}
            isLoading={false}
            actionIcon={
                !user ? (
                    isConnecting ? (
                        <WalletLoader />
                    ) : (
                        <div
                            onClick={handleConnectionWithLoading}
                            className="cursor-pointer p-1 rounded-md hover:bg-blue-500/20 transition-colors"
                            title="Connect Wallet"
                        >
                            <LoginIcon />
                        </div>
                    )
                ) : null
            }
        >
            {user ? (
                <UserUI user={user} />
            ) : (

                <>div</>
            )}
        </CardCrypto>
    );
};

export default WalletLogIn;
