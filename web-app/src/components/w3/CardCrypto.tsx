import React, { ReactNode } from 'react';

interface CardCryptoProps {
    title: string;
    icon: ReactNode;
    actionIcon?: ReactNode;
    themeColor?: string;
    children: ReactNode;
}

const CardCrypto = ({
    title,
    icon,
    actionIcon,
    themeColor = '#3B82F6', // Default blue color
    children
}: CardCryptoProps) => {

    const calculateViaColor = () => {
        if (themeColor.startsWith('#')) {
            return '#8B5CF6'; // Default to purple for via color
        }
        return themeColor;
    };

    return (
        <div className="border border-gray-700 rounded-xl shadow-lg bg-gray-900 min-w-[340px]">
            <div className="flex justify-between items-center p-4 border-b border-gray-800">
                <h2 className='font-medium text-lg text-gray-200 flex items-center'>
                    {icon}
                    {title}
                </h2>
                <div className="flex items-center">
                    {actionIcon}
                </div>
            </div>
            <div className="p-4">
                <div className="bg-gradient-to-br from-gray-800 to-black rounded-xl overflow-hidden shadow-lg border border-gray-700/30">
                    <div
                        className="relative h-2"
                        style={{
                            background: `linear-gradient(to right, ${themeColor}, ${calculateViaColor()}, ${themeColor})`
                        }}
                    ></div>
                    <div className="p-5 space-y-4">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardCrypto;
