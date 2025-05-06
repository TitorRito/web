import React, { useState } from 'react';
import { Contract } from '@/lib/types';

interface ContractCreateCustomFormProps {
    handleCreateContract: (contract: Contract) => void;
}

export default function ContractCreateCustomForm({ handleCreateContract }: ContractCreateCustomFormProps) {
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        chainId: '',
        abi: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const abiLines = formData.abi.split('\n').filter(line => line.trim() !== '');

            handleCreateContract({
                name: formData.name,
                address: formData.address,
                chainId: formData.chainId ? parseInt(formData.chainId) : undefined,
                abi: abiLines,
                instance: null, //maybe error bug
            });

            // Reset form
            setFormData({
                name: '',
                address: '',
                chainId: '',
                abi: ''
            });
        } catch (error) {
            console.error('Error creating contract:', error);
            // Could add error handling UI here
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Optional fields group */}
            <div className="mb-4 pb-3 border-b border-gray-700">
                <div className="flex items-center mb-2">
                    <span className="text-sm font-mono text-gray-400">Optional fields</span>
                    <span className="text-xs text-gray-500 ml-2 px-1.5 py-0.5 bg-gray-800 rounded border border-gray-700">optional</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label htmlFor="name" className="block text-sm font-mono text-gray-400">Contract Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="ERC1155Token"
                            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-gray-200 font-mono focus:outline-none focus:ring-1 focus:ring-blue-400"
                        />
                    </div>

                    <div className="space-y-1">
                        <label htmlFor="chainId" className="block text-sm font-mono text-gray-400">Chain ID</label>
                        <input
                            type="text"
                            id="chainId"
                            name="chainId"
                            value={formData.chainId}
                            onChange={handleChange}
                            placeholder="1"
                            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-gray-200 font-mono focus:outline-none focus:ring-1 focus:ring-blue-400"
                        />
                    </div>
                </div>
            </div>

            {/* Required fields */}
            <div className="space-y-1">
                <label htmlFor="address" className="block text-sm font-mono text-gray-400">Contract Address</label>
                <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="0x742d35Cc6634C0532925a3b844Bc454e4438f44e"
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-gray-200 font-mono focus:outline-none focus:ring-1 focus:ring-blue-400"
                    required
                />
            </div>

            <div className="space-y-1">
                <label htmlFor="abi" className="block text-sm font-mono text-gray-400">Contract ABI</label>
                <textarea
                    id="abi"
                    name="abi"
                    value={formData.abi}
                    onChange={handleChange}
                    rows={8}
                    placeholder={`function balanceOf(address,uint256) view returns (uint256)
function ownerOf(uint256) view returns (address)`}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-gray-200 font-mono text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
                    required
                />
                <div className="flex items-center justify-between mt-1">
                    <p className="text-xs text-gray-500 font-mono">Each function on a separate line</p>
                    <a
                        href="https://docs.ethers.org/v5/getting-started/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-400 hover:text-blue-300 font-mono"
                    >
                        Need help? ethers.js docs →
                    </a>
                </div>
            </div>

            <div className="flex justify-end pt-4">
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200"
                >
                    Deploy Interface
                </button>
            </div>
        </form>
    );
}

/*
check new contract abi is compatible with my create contract component

*/