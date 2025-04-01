import React from 'react';
import { NetworkCardIcon, WalletLoader } from '@/lib/svgs';
import CardCrypto from './CardCrypto';

const NetworkContent = () => {
    return (
        <div className="p-4">
            <div className="bg-gradient-to-br from-gray-800 to-black rounded-xl overflow-hidden shadow-lg border border-gray-700/30">
                <div className="relative h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500"></div>
                <div className="p-5">
                    <div className="text-gray-200">Hello World</div>
                </div>
            </div>
        </div>
    );
};

const NetworkLogin = () => {
    const isConnecting = true;
    
    return (
        <CardCrypto 
            title="Network" 
            icon={<NetworkCardIcon />} 
            isLoading={isConnecting}
            loadingIcon={<WalletLoader />}
        >
            <NetworkContent />
        </CardCrypto>
    );
};

export default NetworkLogin;
