import React from 'react';
import { ContractIcon } from '@/lib/svgs';
import CardCrypto from './CardCrypto';
import { ContractContent } from '@/components/w3/ContractContent';

const ContractLogin = () => {

    return (
        <CardCrypto
            title="Contract"
            icon={<ContractIcon />}
            themeColor="#10B981" // Green theme for Contract
        >
            <ContractContent />
        </CardCrypto>
    );
};

export default ContractLogin;
