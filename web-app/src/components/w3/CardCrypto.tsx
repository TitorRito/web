import React, { ReactNode } from 'react';

interface CardCryptoProps {
  title: string;
  icon: ReactNode;
  isLoading?: boolean;
  loadingIcon?: ReactNode;
  children: ReactNode;
}

const CardCrypto = ({ title, icon, isLoading = false, loadingIcon, children }: CardCryptoProps) => {
  return (
    <div className="border border-gray-700 rounded-xl shadow-lg bg-gray-900 min-w-[340px]">
      <div className="flex justify-between items-center p-4 border-b border-gray-800">
        <h2 className='font-medium text-lg text-gray-200 flex items-center'>
          {icon}
          {title}
        </h2>
        <div>
          {isLoading && loadingIcon}
        </div>
      </div>
      {children}
    </div>
  );
};

export default CardCrypto;
