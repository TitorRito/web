import React from 'react';

interface NetworkProps {
    network: {
        id: string | number;
        name: string;
    };
}

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


