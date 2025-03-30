import React, { useState } from 'react';
import ContractPopUp from './ContractPopUp';

export default function ContractCreateImportList(handleCreateContract: any) {
    const [contractFiles, setContractFiles] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedContract, setSelectedContract] = useState<string | null>(null);
    const [contractLoading, setContractLoading] = useState<boolean>(false);
    const [contractDetails, setContractDetails] = useState<any>(null);
    const [showPopup, setShowPopup] = useState<boolean>(false);

    const handleLoadJsonFiles = async () => {
        console.log("Reading JSON files...");
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('/metana/dapp/api?readContractFactory');

            if (!response.ok) {
                throw new Error(`Failed to fetch contracts: ${response.status}`);
            }

            const data = await response.json();
            console.log("Fetched contract files:", data);

            if (data && data.data) {
                setContractFiles(data.data);
            } else {
                setContractFiles([]);
            }
        } catch (err: any) {
            console.error("Error loading contracts:", err);
            setError(err.message || "Failed to load contract files");
            setContractFiles([]);
        } finally {
            setLoading(false);
        }
    };

    const handleContractClick = async (fileName: string) => {
        console.log(`Fetching contract: ${fileName}`);
        setSelectedContract(fileName);
        setContractLoading(true);

        try {
            const response = await fetch(`/metana/dapp/api?getContract=${fileName}`);

            if (!response.ok) {
                throw new Error(`Failed to fetch contract: ${response.status}`);
            }

            const data = await response.json();
            console.log("Contract details:", data);

            // Store contract details and show the popup
            if (data && data.data) {
                // Add the filename as the name if not present in data
                if (!data.data.name) {
                    data.data.name = fileName.replace('.json', '');
                }

                setContractDetails(data.data);
                setShowPopup(true);
                handleCreateContract(data.data);
            } else {
                throw new Error("Invalid contract data received");
            }

        } catch (err: any) {
            console.error("Error loading contract:", err);
            setError(`Failed to load contract ${fileName}: ${err.message}`);
        } finally {
            setContractLoading(false);
        }
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    return (
        <div className="space-y-3">
            <div className="flex justify-between mb-4 items-center">
                <button
                    onClick={handleLoadJsonFiles}
                    className="text-gray-100 py-2 px-4 rounded"
                    disabled={loading}
                >
                    {loading ? "Loading..." : "Load JSON Files"}
                </button>
            </div>

            {error && (
                <div className="text-gray-800 bg-gray-100 p-2 rounded border border-gray-300">
                    {error}
                </div>
            )}

            {loading ? (
                <div className="text-center py-4">Loading contract files...</div>
            ) : contractFiles.length > 0 ? (
                <div>
                    <ul className="divide-y border rounded-md">
                        {contractFiles.map((fileName, index) => (
                            <li
                                key={index}
                                className={`py-2 px-3 hover:bg-gray-600 cursor-pointer ${selectedContract === fileName ? 'bg-gray-700' : ''}`}
                                onClick={() => handleContractClick(fileName)}
                            >
                                {fileName}
                                {selectedContract === fileName && contractLoading && (
                                    <span className="ml-2 text-xs">loading...</span>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div className="text-center py-4 text-gray-500">
                    {error ? "Failed to load contracts." : "No contracts loaded. Click the button to load contracts."}
                </div>
            )}

            {/* Contract Popup */}
            {showPopup && (
                <ContractPopUp
                    contract={contractDetails}
                    onClose={handleClosePopup}
                />
            )}
        </div>
    );
}
