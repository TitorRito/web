import React from 'react';
import { User } from '@/lib/types';
import NetworkLabel from './NetworkLabel';

const Login = ({ handleConnection }: { handleConnection: () => Promise<void> }) => {
    return (
        <div className="">
            <button
                onClick={handleConnection}
                className="w-full py-3 rounded-md font-medium "
            >
                Connect Wallet
            </button>
        </div>
    );
};

const UserUI = ({ user }: { user: User }) => {
    const shortenAddress = (address: string) => {
        return `${address.substring(0, 2)}-${address.substring(address.length - 3)}`;
    };

    return (
        <div className="flex flex-col gap-3">
            <div className="bg-gray-700 p-3 rounded-md">
                <div className="flex justify-between items-center mb-2">
                    <div className="text-gray-300">Address:</div>
                    <div className="flex items-center">
                        <div className="font-mono">{shortenAddress(user.address)}</div>
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

// Main component that conditionally renders Login or UserUI
const LogInWallet = ({
    user,
    handleConnection
}: {
    user: User | null,
    setUser: React.Dispatch<React.SetStateAction<User | null>>,
    handleConnection: () => Promise<void>
}) => {

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        console.log('copied to clipboard:', text);
    };

    return (
        <div className="border rounded-lg shadow-md min-w-[250px]">
            <div className="flex justify-between items-center my-2 bg-purple-500 ">
                <h2 className='p-2 font-xl grow'>Wallet</h2>
                <div>
                    {user ? (
                        <div
                            onClick={() => copyToClipboard(user.address)}
                            className="p-2 cursor-pointer"
                        >
                            📋
                        </div>
                    ) : (
                        <div className="p-2">🔒</div>
                    )}
                </div>
            </div>
            {user ? (
                <UserUI user={user} />
            ) : (
                <Login handleConnection={handleConnection} />
            )}
        </div>
    );
};

export default LogInWallet;
