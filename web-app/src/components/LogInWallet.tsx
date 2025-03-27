import React, { useState } from 'react';
import { User } from '@/lib/types';
import NetworkLabel from './NetworkLabel';
import { WalletLoader } from '@/lib/svgs';

const Login = ({ handleConnection, isConnecting }: { handleConnection: () => Promise<void>, isConnecting: boolean }) => {
    return (
        <button
            onClick={handleConnection}
            className="w-full py-3 rounded-md font-medium"
        >
            {isConnecting ? 'Connecting...' : 'Connect Wallet'}
        </button>
    )
};

const UserUI = ({ user }: { user: User }) => {
    const shortenAddress = (address: string) => {
        return `${address.substring(0, 2)}-${address.substring(address.length - 3)}`;
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        console.log('copied to clipboard:', text);
    };

    return (
        <div className="flex flex-col gap-3">
            <div className="bg-gray-700 p-3 rounded-md">
                <div className="flex justify-between items-center mb-2">
                    <div className="text-gray-300">Address:</div>
                    <div className="flex items-center">
                        <div
                            className="font-mono bg-green-700/30 px-2 py-1 rounded-md cursor-pointer hover:scale-105 transition-transform"
                            onClick={() => copyToClipboard(user.address)}
                            title="Click to copy"
                        >
                            {shortenAddress(user.address)}
                        </div>
                    </div>
                </div>

                <div className="flex justify-between items-center mb-2">
                    <div className="text-gray-300">Network:</div>
                    <NetworkLabel network={{ id: user.chainId || 'Unknown', name: user.network || 'Unknown' }} />
                </div>

                <div className="flex justify-between items-center">
                    <div className="text-gray-300">Balance:</div>
                    <div>{parseFloat(user.balance)}</div>
                </div>
            </div>
        </div>
    );
};

const LogInWallet = ({
    user,
    handleConnection
}: {
    user: User | null,
    handleConnection: () => Promise<void>
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

    return (
        <div className="border rounded-lg shadow-md min-w-[250px]">
            <div className="flex justify-between items-center my-2 bg-purple-800 ">
                <h2 className='p-2 font-xl grow'>Wallet</h2>
                <div className="p-2">
                    {!user && <WalletLoader />}
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

export default LogInWallet;
