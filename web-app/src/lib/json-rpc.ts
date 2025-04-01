import { ethers } from "ethers";
import { User } from "./types";

export function getIsWeb3() {
    return typeof window.ethereum !== 'undefined' || typeof window.web3 !== 'undefined';
}

async function getWalletCredentials(provider) {
    const signer = await provider.getSigner();
    const address = await signer.getAddress();
    const network = await provider.getNetwork();
    const balance = await provider.getBalance(address);

    return {
        address,
        chainId: network.chainId.toString(),
        network: network.name,
        balance: ethers.formatEther(balance),
        signer,
    };
}

export async function getWallet(): Promise<User | null> {
    if (!getIsWeb3()) return null;

    try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const { address, network, chainId, balance, signer } = await getWalletCredentials(provider);
        return {
            address,
            chainId,
            network,
            balance,
            provider,
            signer
        };
    } catch (error) {
        console.error("Error creating provider:", error);
        return null;
    }
}


//add network to wallet function


//switch network function




