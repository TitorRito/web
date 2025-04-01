import { ethers } from "ethers";
import { User } from "./types";

export function getIsWeb3() {
    return typeof window.ethereum !== 'undefined' || typeof window.web3 !== 'undefined';
}

async function getWalletCredentials(provider: ethers.BrowserProvider) {
    const signer = await provider.getSigner();
    const address = await signer.getAddress();
    const network = await provider.getNetwork();
    const balance = await provider.getBalance(address);
    const currency = "ETH"; // default to ETH, you can modify this based on the network

    // check name, id, and balance is not null....
    return {
        address,
        signer,
        network: {
            id: network.chainId.toString(),
            name: network.name,
            balance: ethers.formatEther(balance),
            currency: currency
        }
    };
}

export async function getWallet(): Promise<User | null> {
    if (!getIsWeb3()) return null;

    try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const { address, network, signer } = await getWalletCredentials(provider);
        return {
            address,
            network,
            provider,
            signer
        };
    } catch (error) {
        console.error("Error creating provider:", error);
        return null;
    }
}


const INFURA_PROJECT_ID = process.env.NEXT_PUBLIC_INFURA_PROJECT_ID;

export const networkChains = [
    {
        id: "1",
        name: "Ethereum Mainnet",
        rpcUrl: `https://mainnet.infura.io/v3/${INFURA_PROJECT_ID}`
    },
    {
        id: "59144",
        name: "Linea Mainnet",
        rpcUrl: `https://linea-mainnet.infura.io/v3/${INFURA_PROJECT_ID}`
    },
    {
        id: "31337",
        name: "Localhost (Hardhat)",
        rpcUrl: "http://127.0.0.1:8545"
    },
    {
        id: "1337",
        name: "Localhost (Ganache)",
        rpcUrl: "http://127.0.0.1:8545"
    }
];

//switch network function
export async function switchNetwork(chainId: string) {
    const chain = networkChains.find((chain) => chain.id === chainId);
    return chain ? 'chain saw' : 'chain hidden';
}




