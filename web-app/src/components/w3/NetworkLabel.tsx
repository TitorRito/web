import React from 'react';

interface NetworkLabelProps {
  network: {
    id: string | number;
    name?: string;
  };
}

const NetworkLabel = ({ network }: NetworkLabelProps) => {
  const { id, name } = network;
  
  // Format display as chainId: name if name exists
  const displayText = name ? `${id}: ${name}` : id;
  
  // Determine background color based on network id
  let bgColorClass = 'bg-gray-600';
  
  // Common networks
  if (id === '1' || id === 1) bgColorClass = 'bg-blue-600';  // Ethereum Mainnet
  else if (id === '11155111' || id === 11155111) bgColorClass = 'bg-green-600';  // Sepolia
  else if (id === '31337' || id === 31337) bgColorClass = 'bg-purple-600';  // Hardhat
  else if (id === '5' || id === 5) bgColorClass = 'bg-yellow-600';  // Goerli
  else if (id === '137' || id === 137) bgColorClass = 'bg-indigo-600';  // Polygon
  
  return (
    <span className={`px-2 py-1 rounded text-xs font-medium ${bgColorClass} text-white`}>
      {displayText}
    </span>
  );
};

export default NetworkLabel;


