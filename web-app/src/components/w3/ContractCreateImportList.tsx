import React, { useState, useEffect } from 'react';
import ContractPopUp from './ContractPopUp';

interface ContractCreateImportListProps {
    handleCreateContract: (contract: any) => void;
}

export default function ContractCreateImportList({ handleCreateContract }: ContractCreateImportListProps) {
    const [contractFiles, setContractFiles] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [contractDetails, setContractDetails] = useState<any>(null);
    const [showPopup, setShowPopup] = useState<boolean>(false);

    const fetchContractFiles = async () => {
        try {
            const response = await fetch('/metana/dapp/api?readContractFactory');
            if (!response.ok) {
                throw new Error(`Failed to fetch contracts: ${response.status}`);
            }
            const data = await response.json();
            setContractFiles(data?.data || []);
        } catch (err: any) {
            console.error("Error loading contracts:", err);
            setError(err.message || "Failed to load contract files");
            setContractFiles([]);
        }
    };

    useEffect(() => {
        fetchContractFiles();
    }, []);

    const handleContractClick = async (fileName: string) => {
        try {
            const response = await fetch(`/metana/dapp/api?getContract=${fileName}`);
            if (!response.ok) {
                throw new Error(`Failed to fetch contract: ${response.status}`);
            }

            const data = await response.json();
            if (data?.data) {
                // Add the filename as the name if not present in data
                if (!data.data.name) {
                    data.data.name = fileName.replace('.json', '');
                }
                setContractDetails(data.data);
                setShowPopup(true);
            } else {
                throw new Error("Invalid contract data received");
            }
        } catch (err: any) {
            console.error("Error loading contract:", err);
            setError(`Failed to load contract ${fileName}: ${err.message}`);
        }
    };

    return (
        <div className="space-y-3">
            <div className="flex justify-between mb-4 items-center">
                <p className="text-gray-600 text-sm p-2">Contracts fetched from my factory logs</p>
            </div>

            {error && (
                <div className="text-gray-800 bg-gray-100 p-2 rounded border border-gray-300">
                    {error}
                </div>
            )}

            {contractFiles.length > 0 ? (
                <div>
                    <ul className="divide-y border rounded-md">
                        {contractFiles.map((fileName, index) => (
                            <li
                                key={index}
                                className="py-2 px-3 hover:bg-gray-600 cursor-pointer"
                                onClick={() => handleContractClick(fileName)}
                            >
                                {fileName}
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div className="text-center py-4 text-gray-500">
                    {error ? "Failed to load contracts." : "No contracts found in your factory."}
                </div>
            )}

            {showPopup && (
                <ContractPopUp
                    contract={contractDetails}
                    onClose={() => setShowPopup(false)}
                    onImport={handleCreateContract}
                />
            )}
        </div>
    );
}
