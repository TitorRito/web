import React from 'react';
import { NetworkCardIcon } from '@/lib/svgs';
import CardCrypto from './CardCrypto';
import NetworkContent from './NetworkContent';

const NetworkLogin = () => {
  return (
    <CardCrypto 
      title="Networks" 
      icon={<NetworkCardIcon />}
      themeColor="#9333EA" // Purple theme for Network
    >
      <NetworkContent />
    </CardCrypto>
  );
};

export default NetworkLogin;
