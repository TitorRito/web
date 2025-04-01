import { Network as NetworkType } from "@/lib/types";
import React from "react";
import { NetworkIcon, BalanceIcon } from "@/lib/svgs";
import { useUser } from "@/lib/UserContext";

interface NetworkDisplayProps {
    title: string;
    icon: React.ReactNode;
    content: React.ReactNode;
    subtitle?: React.ReactNode;
    onClick?: () => void;
}

const NetworkDisplayComponent: React.FC<NetworkDisplayProps> = ({ title, icon, content, subtitle, onClick }) => {
    return (
        <div className="space-y-1.5 relative">
            <div className="flex items-center text-xs text-gray-400 font-medium">
                {icon}
                {title}
            </div>
            <div
                className="bg-gray-800/70 px-3 py-2 rounded-lg text-gray-200 h-9 font-mono flex items-center justify-between hover:bg-gray-700/70 transition-colors cursor-pointer"
                onClick={onClick}
            >
                <div className="truncate mr-2">{content}</div>
                {subtitle && <div className="text-xs text-gray-400 flex-shrink-0">{subtitle}</div>}
            </div>
        </div>
    );
};

const NetworkComponent = () => {
    const { user, setUser } = useUser();
    const network = user.network;

    const handleNetworkClick = () => {
        console.log('Network clicked: lets begin');
        
        // Update the network chainId to 100 for testing purposes
        setUser({
            ...user,
            network: {
                ...user.network,
                id: '100'
            }
        });
        
        console.log('Chain ID set to 100 for testing');
    };

    return (
        <div className="grid grid-cols-2 gap-4">
            <NetworkDisplayComponent
                title="NETWORK"
                icon={<NetworkIcon />}
                content={network.name}
                subtitle={network.id}
                onClick={handleNetworkClick}
            />

            <NetworkDisplayComponent
                title="BALANCE"
                icon={<BalanceIcon />}
                content={parseFloat(network.balance).toFixed(4)}
                subtitle={network.currency}
            />
        </div>
    );
};

export default NetworkComponent;