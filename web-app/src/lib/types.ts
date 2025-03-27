import { ethers } from 'ethers';

export type User = {
    address: string;
    network: string;
    chainId: number;
    balance: string;
    signer: ethers.JsonRpcSigner;
    provider: ethers.BrowserProvider;
}

export type Contract = {
    address: string | null;
    chainId: number | null;
    abi: ethers.InterfaceAbi | null;
    instance: ethers.Contract | null;
}