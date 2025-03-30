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
    const [functionParams, setFunctionParams] = useState({}); // Store input parameters for functions

    if (!abi) {
        return (
            <div className="max-w-4xl mx-auto p-6 bg-gray-900 rounded-lg shadow-lg text-gray-200">
                <p className="text-red-400">No ABI provided.</p>
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
            <span key={index} className="text-gray-400">
                {param.name} ({param.type})
                {index < params.length - 1 ? ', ' : ''}
            </span>
        ));
    };

    // Handle parameter input change
    const handleParamChange = (funcName, paramIndex, value) => {
        setFunctionParams(prev => ({
            ...prev,
            [funcName]: {
                ...(prev[funcName] || {}),
                [paramIndex]: value
            }
        }));
    };

    // Call a read function and store the result
    const callReadFunction = async (func) => {
        if (!instance) {
            setResults((prev) => ({ ...prev, [func.name]: 'No instance available' }));
            return;
        }
        
        try {
            console.log(`Calling function: ${func.name}`);
            
            // Prepare parameters from inputs
            const params = [];
            if (func.inputs.length > 0) {
                const funcParams = functionParams[func.name] || {};
                for (let i = 0; i < func.inputs.length; i++) {
                    params.push(funcParams[i] || '');
                }
                console.log('With params:', params);
            }
            
            // Call the function with parameters
            const result = await instance[func.name](...params);
            
            // Format result based on type (ethers v6 compatible)
            let formattedResult;
            if (result === null || result === undefined) {
                formattedResult = String(result);
            } else if (typeof result === 'bigint') {
                formattedResult = result.toString();
            } else if (ArrayBuffer.isView(result) || Array.isArray(result)) {
                formattedResult = Array.from(result).toString();
            } else if (typeof result === 'object') {
                try {
                    formattedResult = JSON.stringify(result);
                } catch (e) {
                    formattedResult = String(result);
                }
            } else {
                formattedResult = String(result);
            }
            
            setResults((prev) => ({ 
                ...prev, 
                [func.name]: formattedResult
            }));
            console.log('Result:', result);
        } catch (e) {
            console.error(`Error calling ${func.name}:`, e);
            setResults((prev) => ({ ...prev, [func.name]: `Error: ${e.message}` }));
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-gray-900 rounded-lg shadow-lg text-gray-200">
            {/* Contract Info */}
            <div className="mb-6 border-b border-gray-700 pb-4">
                <h1 className="text-3xl font-bold text-blue-400">Contract Details</h1>
                <p className="text-gray-400">Address: <span className="font-mono text-green-400">{address || 'Not provided'}</span></p>
                <p className="text-gray-400">Chain ID: <span className="font-mono text-green-400">{chainId || 'Not provided'}</span></p>
            </div>

            {/* Read Functions */}
            <div className="mb-8 border-b border-gray-700 pb-4">
                <h2 className="text-2xl font-bold text-blue-400 mb-4">Read Functions</h2>
                {reads.length > 0 ? (
                    <ul className="space-y-3">
                        {reads.map((func, idx) => (
                            <li key={idx} className="p-3 bg-gray-800 rounded-md shadow-sm flex flex-col">
                                <div className="flex flex-col space-y-3">
                                    <div className="font-mono">
                                        <span className="text-purple-400">function </span>
                                        <span className="text-yellow-400">{func.name}</span>
                                        <span className="text-gray-400">(</span>
                                        {func.inputs.map((input, paramIdx) => (
                                            <React.Fragment key={paramIdx}>
                                                <div className="ml-4 mb-2">
                                                    <span className="text-blue-400">{input.type}</span>
                                                    <span className="text-gray-400"> {input.name}</span>
                                                    <input
                                                        type="text"
                                                        placeholder={`Enter ${input.type}`}
                                                        onChange={(e) => handleParamChange(func.name, paramIdx, e.target.value)}
                                                        className="ml-2 px-2 py-1 bg-gray-700 text-white rounded border border-gray-600 font-mono"
                                                    />
                                                </div>
                                                {paramIdx < func.inputs.length - 1 && <span className="text-gray-400">,</span>}
                                            </React.Fragment>
                                        ))}
                                        <span className="text-gray-400">)</span>
                                        <span className="text-purple-400"> {func.stateMutability}</span>
                                        {func.outputs.length > 0 && (
                                            <>
                                                <span className="text-purple-400"> returns </span>
                                                <span className="text-gray-400">(</span>
                                                {func.outputs.map((output, outIdx) => (
                                                    <span key={outIdx}>
                                                        <span className="text-blue-400">{output.type}</span>
                                                        <span className="text-gray-400"> {output.name}</span>
                                                        {outIdx < func.outputs.length - 1 && <span className="text-gray-400">, </span>}
                                                    </span>
                                                ))}
                                                <span className="text-gray-400">)</span>
                                            </>
                                        )}
                                    </div>
                                    
                                    <div className="flex justify-end">
                                        {instance && (
                                            <button
                                                onClick={() => callReadFunction(func)}
                                                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 font-mono"
                                            >
                                                Execute
                                            </button>
                                        )}
                                    </div>
                                </div>
                                
                                {results[func.name] && (
                                    <div className="mt-3 p-2 bg-black rounded border border-gray-700">
                                        <p className="font-mono text-sm">
                                            <span className="text-green-400">// Output:</span>
                                            <br />
                                            <span className="text-yellow-300">{results[func.name]}</span>
                                        </p>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">No read functions found.</p>
                )}
            </div>

            {/* Write Functions */}
            <div className="mb-8 border-b border-gray-700 pb-4">
                <h2 className="text-2xl font-bold text-green-400 mb-4">Write Functions</h2>
                {writes.length > 0 ? (
                    <ul className="space-y-3">
                        {writes.map((func, idx) => (
                            <li key={idx} className="p-3 bg-gray-800 rounded-md shadow-sm">
                                <div className="font-mono">
                                    <span className="text-purple-400">function </span>
                                    <span className="text-green-400">{func.name}</span>
                                    <span className="text-gray-400">(</span>
                                    {func.inputs.map((input, paramIdx) => (
                                        <span key={paramIdx}>
                                            <span className="text-blue-400">{input.type}</span>
                                            <span className="text-gray-400"> {input.name}</span>
                                            {paramIdx < func.inputs.length - 1 && <span className="text-gray-400">, </span>}
                                        </span>
                                    ))}
                                    <span className="text-gray-400">)</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">No write functions found.</p>
                )}
            </div>

            {/* Events */}
            <div>
                <h2 className="text-2xl font-bold text-purple-400 mb-4">Events</h2>
                {events.length > 0 ? (
                    <ul className="space-y-3">
                        {events.map((event, idx) => (
                            <li key={idx} className="p-3 bg-gray-800 rounded-md shadow-sm">
                                <div className="font-mono">
                                    <span className="text-red-400">event </span>
                                    <span className="text-purple-400">{event.name}</span>
                                    <span className="text-gray-400">(</span>
                                    {event.inputs.map((input, paramIdx) => (
                                        <span key={paramIdx}>
                                            <span className="text-blue-400">{input.type}</span>
                                            <span className="text-gray-400"> {input.name}</span>
                                            {paramIdx < event.inputs.length - 1 && <span className="text-gray-400">, </span>}
                                        </span>
                                    ))}
                                    <span className="text-gray-400">)</span>
                                </div>
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