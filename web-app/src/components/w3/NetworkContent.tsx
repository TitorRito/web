import React from 'react';
import { networkChains, switchNetwork } from '@/lib/json-rpc';
import { useUser } from '@/lib/UserContext';

const NetworkContent = () => {
    const { user } = useUser();
    const currentNetworkId = user?.network?.id;

    const handleNetworkSwitch = async (chainId: string) => {
        if (chainId === currentNetworkId) return;
        try {
            const res = await switchNetwork(chainId);
            console.log('Network switch response:', res);
        } catch (error) {
            console.error('Failed to switch network:', error);
        }
    };

    const getNetworkClassName = (isCurrentNetwork: boolean) => {
        const baseClasses = "rounded-lg p-3 transition-colors cursor-pointer border";
        const activeClasses = "bg-purple-900/30 border-purple-500/70 shadow-lg shadow-purple-900/20";
        const inactiveClasses = "bg-gray-800/70 border-gray-700/50 hover:bg-gray-700/50";
        
        return `${baseClasses} ${isCurrentNetwork ? activeClasses : inactiveClasses}`;
    };

    return (
        <div className="text-gray-200">
            <div className="grid grid-cols-1 gap-3">
                {networkChains.map((chain) => {
                    const isCurrentNetwork = chain.id === currentNetworkId;
                    return (
                        <div
                            key={chain.id}
                            className={getNetworkClassName(isCurrentNetwork)}
                            onClick={() => handleNetworkSwitch(chain.id)}
                        >
                            <div className="flex flex-col items-center justify-center text-center">
                                <span className={`font-medium text-sm ${isCurrentNetwork ? 'text-purple-300' : 'text-gray-200'}`}>
                                    {chain.name}
                                </span>
                                <span className="text-xs text-gray-400 mt-1">Chain ID: {chain.id}</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default NetworkContent;
