import React, { FormEvent } from 'react';

interface FormData {
    address: string;
    abi: string;
    chainId: string;
}

interface ContractCustomFormProps {
    formData: FormData;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleSubmit: (e: FormEvent) => void;
}

export default function ContractCreateCustomForm({ formData, handleInputChange, handleSubmit }: ContractCustomFormProps) {
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium mb-1">Contract Address</label>
                <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
                    placeholder="0x..."
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Contract ABI</label>
                <textarea
                    name="abi"
                    value={formData.abi}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
                    placeholder="[{...}]"
                    rows={4}
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Chain ID (optional)</label>
                <input
                    type="text"
                    name="chainId"
                    value={formData.chainId}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
                    placeholder="1 (Ethereum Mainnet)"
                />
            </div>

            <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded"
            >
                Add Contract
            </button>
        </form>
    );
}
