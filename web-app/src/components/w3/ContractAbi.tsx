import React from 'react';
import { ethers } from 'ethers';

const ContractABI = ({ contract }) => {
    // Destructure the contract prop
    const { address, chainId, abi, instance } = contract;

    // If no ABI, bail out early
    if (!abi) {
        return (
            <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
                <p className="text-red-500">No ABI provided.</p>
            </div>
        );
    }

    // Convert InterfaceAbi to JSON ABI if needed (ethers can handle this)
    const parsedAbi = abi instanceof ethers.Interface ? abi.format('json') : abi;
    const abiJson = typeof parsedAbi === 'string' ? JSON.parse(parsedAbi) : parsedAbi;

    // Filter ABI into reads, writes, and events
    const reads = abiJson.filter(
        (item) => item.type === 'function' && (item.stateMutability === 'view' || item.stateMutability === 'pure')
    );
    const writes = abiJson.filter(
        (item) => item.type === 'function' && item.stateMutability !== 'view' && item.stateMutability !== 'pure'
    );
    const events = abiJson.filter((item) => item.type === 'event');

    // Helper to render function/event params
    const renderParams = (inputs) => {
        return inputs.map((input, index) => (
            <span key={index} className="text-gray-600">
                {input.name || `arg${index}`} ({input.type})
                {index < inputs.length - 1 ? ', ' : ''}
            </span>
        ));
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
            {/* Contract Info */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Contract Details</h1>
                <p className="text-gray-600">Address: <span className="font-mono">{address || 'Not provided'}</span></p>
                <p className="text-gray-600">Chain ID: <span className="font-mono">{chainId || 'Not provided'}</span></p>
            </div>

            {/* Read Functions */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-blue-700 mb-4">Read Functions</h2>
                {reads.length > 0 ? (
                    <ul className="space-y-3">
                        {reads.map((func, idx) => (
                            <li key={idx} className="p-3 bg-white rounded-md shadow-sm">
                                <span className="font-mono text-blue-600">{func.name}</span>
                                ({renderParams(func.inputs)}) →{' '}
                                {func.outputs.length > 0 ? renderParams(func.outputs) : 'void'}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">No read functions found.</p>
                )}
            </div>

            {/* Write Functions */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-green-700 mb-4">Write Functions</h2>
                {writes.length > 0 ? (
                    <ul className="space-y-3">
                        {writes.map((func, idx) => (
                            <li key={idx} className="p-3 bg-white rounded-md shadow-sm">
                                <span className="font-mono text-green-600">{func.name}</span>
                                ({renderParams(func.inputs)})
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">No write functions found.</p>
                )}
            </div>

            {/* Events */}
            <div>
                <h2 className="text-2xl font-bold text-purple-700 mb-4">Events</h2>
                {events.length > 0 ? (
                    <ul className="space-y-3">
                        {events.map((event, idx) => (
                            <li key={idx} className="p-3 bg-white rounded-md shadow-sm">
                                <span className="font-mono text-purple-600">{event.name}</span>
                                ({renderParams(event.inputs)})
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">No events found.</p>
                )}
            </div>
        </div>
    );
};

export default ContractABI;