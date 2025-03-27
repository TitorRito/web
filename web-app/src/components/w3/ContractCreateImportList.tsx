import React from 'react';

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
    return (
        <div className="space-y-3">
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
