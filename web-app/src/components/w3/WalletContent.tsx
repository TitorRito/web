import React from 'react';
import { WalletAddressIcon, CopyIcon, LightningIcon, WalletLoader } from '@/lib/svgs';
import Network from './Network';
import { useUser } from '@/lib/UserContext';

const WalletContent = () => {
    const { user, login } = useUser();

    const shortenAddress = (address: string) => {
        // return address;
        return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        console.log('copied to clipboard:', text);
    };

    if (user) {
        return (
            <>
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
            </>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center py-6">
            <LightningIcon />
            <h3 className="text-lg font-medium text-gray-200 mt-3 mb-1">Connect Your Wallet</h3>
            <p className="text-gray-400 text-center mb-4 max-w-xs">
                Connect your wallet to access blockchain features and manage your digital assets.
            </p>
            <button
                onClick={login}
                className="px-5 py-2.5 bg-gradient-to-br from-blue-500 to-blue-600 text-white font-medium rounded-lg
                    hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105
                    shadow-lg hover:shadow-blue-500/40 flex items-center"
            >
                <span>Connect Wallet</span>
            </button>
        </div>
    );
};

export default WalletContent;
