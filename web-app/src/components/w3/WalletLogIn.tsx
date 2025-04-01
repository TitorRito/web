import React from 'react';
import { WalletIcon } from '@/lib/svgs';
import CardCrypto from './CardCrypto';
import WalletContent from './WalletContent';

const WalletLogIn = () => {
    return (
        <CardCrypto
            title="Wallet"
            icon={<WalletIcon />}
            themeColor="#3B82F6" // Blue theme for Wallet
        >
            <WalletContent />
        </CardCrypto>
    );
};

export default WalletLogIn;
