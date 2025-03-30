export interface NetworkConfig {
  chainId: number;
  name: string;
  rpcUrl: string;
  currency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  blockExplorer: string;
  testnet: boolean;
}

export const networks: { [key: string]: NetworkConfig } = {
  ethereum: {
    chainId: 1,
    name: 'Ethereum',
    rpcUrl: 'https://mainnet.infura.io/v3/your-api-key',
    currency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
    },
    blockExplorer: 'https://etherscan.io',
    testnet: false,
  },
  sepolia: {
    chainId: 11155111,
    name: 'Sepolia',
    rpcUrl: 'https://sepolia.infura.io/v3/your-api-key',
    currency: {
      name: 'Sepolia Ether',
      symbol: 'ETH',
      decimals: 18,
    },
    blockExplorer: 'https://sepolia.etherscan.io',
    testnet: true,
  },
  hardhat: {
    chainId: 31337,
    name: 'Hardhat',
    rpcUrl: 'http://localhost:8545',
    currency: {
      name: 'Hardhat Ether',
      symbol: 'ETH',
      decimals: 18,
    },
    blockExplorer: '',
    testnet: true,
  },
};

export const getNetworkByChainId = (chainId: number): NetworkConfig | undefined => {
  return Object.values(networks).find(network => network.chainId === chainId);
};

export const getNetworkNameByChainId = (chainId: number | string): string => {
  const id = typeof chainId === 'string' ? parseInt(chainId) : chainId;
  const network = getNetworkByChainId(id);
  return network?.name || `Unknown Network (${chainId})`;
};
