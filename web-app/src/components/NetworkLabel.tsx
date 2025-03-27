import React from 'react';

interface NetworkProps {
    network: {
        id: string | number;
        name: string;
    };
}

//todo: get network and handle dropdown change to request network eth_
const NetworkLabel: React.FC<NetworkProps> = ({ network }) => {
    const handleChange = () => {
        console.log('Network clicked:', network);
    };

    return (
        <div onClick={handleChange} className='bg-cyan-800 p-2 rounded-md'>
            {network.id}  {network.name && network.name != "unknown"}
        </div>
    );
};

export default NetworkLabel;


