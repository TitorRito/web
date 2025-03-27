import React from 'react';
// import { readJsonFilesFromDirectory, getAllJson, getJsonByName } from '../../lib/jsons';
interface ImportItem {
    id: number;
    name: string;
    address: string;
    chainId: number;
}

interface ContractCreateImportList {
    importList: ImportItem[];
}

export default function ContractCreateImportList({ importList }: ContractCreateImportList) {
    const handleLoadJsonFiles = () => {
        console.log("Reading JSON files...");
    };

    return (
        <div className="space-y-3">
            <div className="flex justify-end mb-4">
                <button 
                    onClick={handleLoadJsonFiles}
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                >
                    Load JSON Files
                </button>
            </div>
            
            <ul className="divide-y">
                {importList.map(item => (
                    <li key={item.id} className="py-3 hover:bg-gray-100 cursor-pointer rounded px-2">
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-gray-500">Address: {item.address}</div>
                        <div className="text-xs text-gray-400">Chain ID: {item.chainId}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
