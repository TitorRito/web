import { Contract } from "@/lib/types";
import { executeContract } from "@/lib/rpc-contract";
import { useState, useEffect } from "react";
import { ethers } from "ethers";

type TokenTransaction = {
    address: string;
    timestamp?: number;
    txHash?: string;
};

type Token = {
    id: number;
    title: string;
    mintTransactions: TokenTransaction[];
    burnTransactions: TokenTransaction[];
};

const BlockUI = ({ token, onMint, onBurn, isLoading }: {
    token: Token,
    onMint: () => void,
    onBurn: () => void,
    isLoading: boolean
}) => {
    // Calculate current owners (mints - burns)
    const calculateOwners = (): string[] => {
        const owners = new Map<string, number>();

        // Count mints
        token.mintTransactions.forEach(tx => {
            const count = owners.get(tx.address) || 0;
            owners.set(tx.address, count + 1);
        });

        // Subtract burns
        token.burnTransactions.forEach(tx => {
            const count = owners.get(tx.address) || 0;
            if (count > 0) {
                owners.set(tx.address, count - 1);
            }
        });

        // Filter addresses with positive balance
        return Array.from(owners.entries())
            .filter(([_, count]) => count > 0)
            .map(([address]) => address);
    };

    const currentOwners = calculateOwners();

    return (
        <div className="bg-gray-900 border border-gray-700 rounded-lg p-3 shadow-lg hover:shadow-indigo-900/20 transition-all">
            <div className="flex items-center justify-between">
                <div className="flex items-baseline gap-2">
                    <span className="text-xs text-gray-400 opacity-60">{token.id}</span>
                    <span className="text-lg font-medium text-gray-200">{token.title}</span>
                </div>
                <div className="flex space-x-1">
                    <button
                        onClick={onMint}
                        disabled={isLoading}
                        className="bg-transparent border border-indigo-700 text-indigo-300 py-1 px-2 rounded-md text-xs transition-colors hover:bg-indigo-900/30 disabled:opacity-50"
                    >
                        {isLoading ? 'Processing...' : 'Mint'}
                    </button>
                    <button
                        onClick={onBurn}
                        disabled={isLoading || currentOwners.length === 0}
                        className="bg-transparent border border-red-800 text-red-300 py-1 px-2 rounded-md text-xs transition-colors hover:bg-red-900/30 disabled:opacity-50"
                    >
                        {isLoading ? 'Processing...' : 'Burn'}
                    </button>
                </div>
            </div>

            <div className="mt-3 border-t border-gray-800 pt-2">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <div className="text-xs text-gray-500 mb-1">Owners ({currentOwners.length})</div>
                        <div className="max-h-20 overflow-y-auto">
                            {currentOwners.length > 0 ? (
                                currentOwners.map((address, idx) => (
                                    <div key={idx} className="text-xs text-gray-400 truncate">
                                        {address}
                                    </div>
                                ))
                            ) : (
                                <div className="text-xs text-gray-600 italic">No owners yet</div>
                            )}
                        </div>
                    </div>

                    <div>
                        <div className="text-xs text-indigo-500 mb-1">
                            Mint Transactions ({token.mintTransactions.length})
                        </div>
                        <div className="max-h-20 overflow-y-auto">
                            {token.mintTransactions.length > 0 ? (
                                token.mintTransactions.map((tx, idx) => (
                                    <div key={idx} className="text-xs text-gray-400 truncate">
                                        {tx.address.substring(0, 8)}...
                                    </div>
                                ))
                            ) : (
                                <div className="text-xs text-gray-600 italic">No mints yet</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function GamePlay({ contract }: { contract: Contract }) {
    // Token mapping from contract values to our UI

    const [tokens, setTokens] = useState<Token[]>([
        { id: 0, title: "WATER", mintTransactions: [], burnTransactions: [] },
        { id: 1, title: "SOIL", mintTransactions: [], burnTransactions: [] },
        { id: 2, title: "SEED", mintTransactions: [], burnTransactions: [] },
        { id: 3, title: "PLANT", mintTransactions: [], burnTransactions: [] },
        { id: 4, title: "FRUIT", mintTransactions: [], burnTransactions: [] },
        { id: 5, title: "FLOWER", mintTransactions: [], burnTransactions: [] },
        { id: 6, title: "BASKET", mintTransactions: [], burnTransactions: [] },
    ]);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleMint = async (tokenId: number) => {
        try {
            setIsLoading(true);
            
            // Call the mint function on the smart contract
            const result = await executeContract({
                contract,
                functionName: 'mint',
                functionArgs: [tokenId]
            });
            
            // Wait for the transaction to be mined
            const receipt = await result.wait();
            console.log('Mint transaction receipt:', receipt);
            
            // Update the state with the new mint transaction
            // setTokens(prevTokens => 
            //     prevTokens.map(token => {
            //         if (token.id === tokenId) {
            //             return {
            //                 ...token,
            //                 mintTransactions: [
            //                     ...token.mintTransactions,
            //                     { 
            //                         address: contract.instance?.runner?.address || 'Unknown',
            //                         timestamp: Date.now(),
            //                         txHash: receipt.hash
            //                     }
            //                 ]
            //             };
            //         }
            //         return token;
            //     })
            // );
        } catch (error) {
            console.error('Error minting token:', error);
            alert(`Failed to mint token: ${error instanceof Error ? error.message : String(error)}`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleBurn = async (tokenId: number) => {
        try {
            setIsLoading(true);
            
            // Call the burn function on the smart contract
            const result = await executeContract({
                contract,
                functionName: 'burn',
                functionArgs: [tokenId]
            });
            
            // Wait for the transaction to be mined
            const receipt = await result.wait();
            console.log('Burn transaction receipt:', receipt);
            
            // Update the state with the new burn transaction
            // setTokens(prevTokens => 
            //     prevTokens.map(token => {
            //         if (token.id === tokenId) {
            //             return {
            //                 ...token,
            //                 burnTransactions: [
            //                     ...token.burnTransactions,
            //                     { 
            //                         address: contract.instance?.runner?.address || 'Unknown',
            //                         timestamp: Date.now(),
            //                         txHash: receipt.hash
            //                     }
            //                 ]
            //             };
            //         }
            //         return token;
            //     })
            // );
        } catch (error) {
            console.error('Error burning token:', error);
            alert(`Failed to burn token: ${error instanceof Error ? error.message : String(error)}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full my-8 flex flex-col items-center justify-center">
            <div className="text-center text-gray-600 text-xs p-2 mb-4">
                {contract.address} | {contract.chainId}
            </div>

            <div className="grid grid-col-1 gap-3 w-full">
                {tokens.map((token) => (
                    <BlockUI
                        key={token.id}
                        token={token}
                        onMint={() => handleMint(token.id)}
                        onBurn={() => handleBurn(token.id)}
                        isLoading={isLoading}
                    />
                ))}
            </div>
        </div>
    );
}