import React, { useState } from 'react';
import { networkChains, switchNetwork, ApiResponse } from '@/lib/json-rpc';
import { useUser } from '@/lib/UserContext';
import { ErrorIcon, WarningIcon } from '@/lib/svgs';

const NetworkContent = () => {
    const { user } = useUser();
    const currentNetworkId = user?.network?.id;
    const [apiMsg, setApiMsg] = useState<ApiResponse | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleNetworkSwitch = async (chainId: string) => {
        if (!user) return;
        if (chainId === currentNetworkId) return;

        setApiMsg(null);
        setIsProcessing(true);

        try {
            const response = await switchNetwork(chainId);
            setApiMsg(response);

        } catch (error) {
            console.error("Unexpected error during network switch:", error);
            setApiMsg({
                success: false,
                message: "An unexpected error occurred",
                type: 'error'
            });
        } finally {
            setIsProcessing(false);
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





            {/* API Response Message */}
            {apiMsg && (
                <div className={`mt-4 p-3 rounded-lg text-sm border ${apiMsg.type === 'error'
                    ? "bg-red-900/20 border-red-700/50 text-red-300"
                    : apiMsg.type === 'warning'
                        ? "bg-orange-900/20 border-orange-700/50 text-orange-300"
                        : "bg-green-900/20 border-green-700/50 text-green-300"
                    }`}>
                    <div className="flex items-start">
                        {apiMsg.type === 'error' && <ErrorIcon />}
                        {apiMsg.type === 'warning' && <WarningIcon className="h-5 w-5 text-orange-300" />}
                        <div className="ml-2">
                            {apiMsg.code && (
                                <p className="font-medium">Error Code: {apiMsg.code}</p>
                            )}
                            <p>{apiMsg.message}</p>
                        </div>
                    </div>
                </div>
            )}

            {isProcessing && (
                <div className="mt-4 text-center">
                    <span className="text-sm text-purple-400 animate-pulse">Processing network switch...</span>
                </div>
            )}
        </div>
    );
};

export default NetworkContent;
