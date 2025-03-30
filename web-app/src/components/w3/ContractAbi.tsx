import React, { useState } from 'react';
import { ethers } from 'ethers';

// Helper to parse human-readable ABI strings
const parseAbiString = (abiString) => {
    const parts = abiString.match(/(constructor|error|event|function)\s+(\w+)\s*\((.*?)\)(?:\s+(view|pure))?(?:\s+returns\s*\((.*?)\))?/i);
    if (!parts) return null;

    const [, type, name, inputsStr, stateMutability, outputsStr] = parts;

    const parseParams = (str) => {
        if (!str) return [];
        return str.split(',').map((param, index) => {
            const [type, name = `arg${index}`] = param.trim().split(/\s+/).reverse();
            return { name, type };
        });
    };

    return {
        type,
        name,
        inputs: parseParams(inputsStr),
        outputs: parseParams(outputsStr || ''),
        stateMutability: stateMutability || 'nonpayable' // Default for non-view/pure
    };
};

const ContractABI = ({ contract }) => {
    const { address, chainId, abi, instance } = contract;
    const [results, setResults] = useState({}); // Store results of read calls

    if (!abi) {
        return (
            <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
                <p className="text-red-500">No ABI provided.</p>
            </div>
        );
    }

    // Parse the string ABI into objects
    const abiJson = abi.map(parseAbiString).filter(Boolean);

    // Filter into reads, writes, and events
    const reads = abiJson.filter(
        (item) => item.type === 'function' && (item.stateMutability === 'view' || item.stateMutability === 'pure')
    );
    const writes = abiJson.filter(
        (item) => item.type === 'function' && item.stateMutability !== 'view' && item.stateMutability !== 'pure'
    );
    const events = abiJson.filter((item) => item.type === 'event');

    // Helper to render function/event params
    const renderParams = (params) => {
        return params.map((param, index) => (
            <span key={index} className="text-gray-600">
                {param.name} ({param.type})
                {index < params.length - 1 ? ', ' : ''}
            </span>
        ));
    };

    // Call a read function and store the result
    const callReadFunction = async (funcName) => {
        if (!instance) {
            setResults((prev) => ({ ...prev, [funcName]: 'No instance available' }));
            return;
        }
        try {
            console.log('Calling function from ContractAbi:', funcName);
            const result = await instance[funcName]();
            setResults((prev) => ({ ...prev, [funcName]: result.toString() }));
            console.log('Result = ', result);
        } catch (e) {
            setResults((prev) => ({ ...prev, [funcName]: `Error: ${e.message}` }));
        }
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
                            <li key={idx} className="p-3 bg-white rounded-md shadow-sm flex flex-col">
                                <div className="flex justify-between items-center">
                                    <span>
                                        <span className="font-mono text-blue-600">{func.name}</span>
                                        ({renderParams(func.inputs)}) →{' '}
                                        {func.outputs.length > 0 ? renderParams(func.outputs) : 'void'}
                                    </span>
                                    {instance && (
                                        <button
                                            onClick={() => callReadFunction(func.name)}
                                            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                                        >
                                            Call
                                        </button>
                                    )}
                                </div>
                                {results[func.name] && (
                                    <p className="mt-2 text-gray-700 text-sm">Result: {results[func.name]}</p>
                                )}
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