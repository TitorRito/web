import React, { useState } from 'react';
import { Contract } from '@/lib/types';
import { parseAndCategorizeAbi, SolItem, SolParam, SolItemType } from '@/lib/abi-rpc';

// Updated interface for contract state
interface ContractState {
  [functionName: string]: {
    loading: boolean;
    status?: number;
    message?: string;
  };
}

const NoAbiProvided: React.FC = () => (
  <div className="max-w-4xl mx-auto p-6 bg-gray-900 rounded-lg shadow-lg text-gray-200">
    <div className="flex flex-col items-center justify-center py-8">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-16 w-16 text-red-400 mb-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
      <h2 className="text-2xl font-bold text-red-400 mb-2">No ABI Provided</h2>
      <p className="text-gray-400 text-center">
        Contract ABI is required to display functions and events.
        <br />
        Please provide a valid ABI to interact with the contract.
      </p>
    </div>
  </div>
);

// Function Arguments Component - Updated props
const FunctionArguments: React.FC<{
  func: SolItem;
  isLoading: boolean;
  onChange?: (index: number, value: string) => void;
}> = ({ func, isLoading, onChange }) => {
  if (func.inputs.length === 0) {
    return null;
  }

  return (
    <div className="mt-2 mb-2">
      <div className="flex flex-wrap gap-2">
        {func.inputs.map((input, idx) => (
          <div key={idx} className="flex-grow-0 min-w-[120px] relative">
            <input
              type="text"
              disabled={isLoading}
              placeholder={input.name || `${idx}: ${input.type}`}
              className="w-full px-3 py-1 bg-gray-700 text-white rounded border border-gray-600 font-mono text-sm focus:border-blue-500 focus:outline-none disabled:opacity-50"
              onChange={(e) => onChange && onChange(idx, e.target.value)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

// Clickable terminal header component for execution - Updated props
const ExecuteComponent: React.FC<{
  funcName: string;
  isLoading: boolean;
  onExecute: () => void;
}> = ({ funcName, isLoading, onExecute }) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      className={`px-3 py-2 font-mono text-sm border-b border-gray-800 flex justify-between items-center cursor-pointer transition-colors ${isHover && !isLoading ? 'bg-gray-900' : ''}`}
      onClick={() => !isLoading && onExecute()}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      aria-disabled={isLoading}
    >
      <span className="text-gray-400">
        $ ./{funcName}
      </span>

      {isLoading && (
        <span className="flex items-center text-blue-400">
          <span className="w-4 h-4 border-2 border-blue-300 border-t-transparent rounded-full animate-spin mr-2"></span>
          Processing...
        </span>
      )}

      {!isLoading && isHover && (
        <span className="text-blue-400 text-xs">Click to execute</span>
      )}
    </div>
  );
};

// Simplified Terminal Component - Remove background color
const FunctionTerminal: React.FC<{
  func: SolItem;
  runFunction?: (funcName: string) => void;
  contractState: ContractState;
}> = ({ func, runFunction, contractState }) => {
  const funcState = contractState[func.name] || { loading: false };
  const isLoading = funcState.loading;

  const handleExecute = () => {
    runFunction && runFunction(func.name);
  };

  return (
    <div className="mt-2">
      {/* Terminal with clickable execute header */}
      <div className="bg-black rounded border border-gray-800">
        <ExecuteComponent
          funcName={func.name}
          isLoading={isLoading}
          onExecute={handleExecute}
        />

        {/* Terminal output - only shown when there's a result or loading */}
        {(funcState.message || isLoading) && (
          <div className="px-3 py-2">
            <pre className="text-xs overflow-x-auto whitespace-pre-wrap text-gray-300 font-mono">
              {isLoading ? "Loading..." : funcState.message}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

// Function Signature Component using unified SolItem interface
const FunctionSignature: React.FC<{
  item: SolItem;
  color: string;
}> = ({ item, color }) => {
  const isEvent = item.type === 'event';

  return (
    <div className="font-mono">
      <span className={`text-${isEvent ? 'red' : 'purple'}-400`}>{item.type} </span>
      <span className={`text-${color}-400`}>{item.name}</span>
      <span className="text-gray-400">(</span>
      {item.inputs.map((input, paramIdx) => (
        <span key={paramIdx}>
          <span className="text-blue-400">{input.type}</span>
          <span className="text-gray-400"> {input.name}</span>
          {paramIdx < item.inputs.length - 1 && <span className="text-gray-400">, </span>}
        </span>
      ))}
      <span className="text-gray-400">)</span>

      {/* Only show stateMutability and outputs for functions */}
      {item.type === 'function' && (
        <>
          <span className="text-purple-400"> {item.stateMutability}</span>
          {item.outputs && item.outputs.length > 0 && (
            <FunctionOutputs outputs={item.outputs} />
          )}
        </>
      )}
    </div>
  );
};

// Generalized Function Component - Updated to use contractState
const ContractFunction: React.FC<{
  item: SolItem;
  contractState: ContractState;
  runFunction?: (funcName: string) => void;
}> = ({ item, contractState, runFunction }) => {
  const isRead = item.itemType === SolItemType.READ;
  const isFunction = item.type === 'function';
  const funcState = contractState[item.name] || { loading: false };
  const isLoading = funcState.loading;

  // Use subtle border accents but keep original component colors
  const getTypeStyles = () => {
    switch (item.itemType) {
      case SolItemType.READ: return 'border-l-4 border-blue-700';
      case SolItemType.WRITE: return 'border-l-4 border-green-700';
      case SolItemType.EVENT: return 'border-l-4 border-purple-700';
      default: return '';
    }
  };

  // Determine color based on item type
  const getColor = () => {
    switch (item.itemType) {
      case SolItemType.READ: return 'yellow';
      case SolItemType.WRITE: return 'green';
      case SolItemType.EVENT: return 'purple';
      default: return 'gray';
    }
  };

  return (
    <li className={`p-3 bg-gray-800 rounded-md shadow-sm ${getTypeStyles()}`}>
      <div className="flex flex-col">
        {/* Function Signature */}
        <FunctionSignature
          item={item}
          color={getColor()}
        />

        {/* Only show arguments and terminal for read functions */}
        {isRead && isFunction && (
          <>
            <FunctionArguments func={item} isLoading={isLoading} />
            <FunctionTerminal
              func={item}
              runFunction={runFunction}
              contractState={contractState}
            />
          </>
        )}
      </div>
    </li>
  );
};

// Function Outputs - updated to use SolParam
const FunctionOutputs: React.FC<{ outputs: SolParam[] }> = ({ outputs }) => (
  <>
    <span className="text-purple-400"> returns </span>
    <span className="text-gray-400">(</span>
    {outputs.map((output, outIdx) => (
      <span key={outIdx}>
        <span className="text-blue-400">{output.type}</span>
        <span className="text-gray-400"> {output.name}</span>
        {outIdx < outputs.length - 1 && <span className="text-gray-400">, </span>}
      </span>
    ))}
    <span className="text-gray-400">)</span>
  </>
);

const ContractHeader: React.FC<{ contract: Contract }> = ({ contract }) => (
  <div className="mb-6 border-b border-gray-700 pb-4">
    <h1 className="text-3xl font-bold text-blue-400">Contract Details</h1>
    <p className="text-gray-400">Address: <span className="font-mono text-green-400">{contract.address || 'Not provided'}</span></p>
    <p className="text-gray-400">Chain ID: <span className="font-mono text-green-400">{contract.chainId || 'Not provided'}</span></p>
  </div>
);

const ContractSection: React.FC<{
  title: string;
  titleColor: string;
  children: React.ReactNode;
  isEmpty: boolean;
}> = ({ title, titleColor, children, isEmpty }) => (
  <div className="mb-8 border-b border-gray-700 pb-4">
    <h2 className={`text-2xl font-bold ${titleColor} mb-4`}>{title}</h2>
    {isEmpty ? <p className="text-gray-500">No {title.toLowerCase()} found.</p> : children}
  </div>
);

// Main component - Updated to use contractState with simplified structure
const ContractABI = ({ contract }: { contract: Contract }) => {
  const [contractState, setContractState] = useState<ContractState>({});

  if (!contract.abi) {
    return <NoAbiProvided />;
  }

  const { reads, writes, events } = parseAndCategorizeAbi(contract.abi);

  // Run function with simplified state management
  const runFunction = (funcName: string) => {
    // Set loading state
    setContractState(prev => {
      const newState = { ...prev };
      newState[funcName] = { 
        loading: true,
        message: "Loading..."
      };
      return newState;
    });

    setTimeout(() => {
      // Simulate random success/error responses
      const random = Math.random();
      let updatedState;

      if (random > 0.8) {
        // Error
        updatedState = {
          loading: false,
          status: 400,
          message: JSON.stringify({ error: "Execution failed", code: 400, reason: "Invalid parameters or contract error" }, null, 2)
        };
      } else {
        // Success
        updatedState = {
          loading: false,
          status: 200,
          message: JSON.stringify({
            success: true,
            data: {
              result: "0x" + Math.floor(Math.random() * 1000000).toString(16),
              gasUsed: Math.floor(Math.random() * 50000),
              blockNumber: 12345678
            }
          }, null, 2)
        };
      }

      setContractState(prev => {
        const newState = { ...prev };
        newState[funcName] = updatedState;
        return newState;
      });
    }, 3000);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-900 rounded-lg shadow-lg text-gray-200">
      <ContractHeader contract={contract} />

      <ContractSection title="Read Functions" titleColor="text-blue-400" isEmpty={reads.length === 0}>
        <ul className="space-y-3">
          {reads.map((item, idx) => (
            <ContractFunction
              key={idx}
              item={item}
              contractState={contractState}
              runFunction={runFunction}
            />
          ))}
        </ul>
      </ContractSection>

      <ContractSection title="Write Functions" titleColor="text-green-400" isEmpty={writes.length === 0}>
        <ul className="space-y-3">
          {writes.map((item, idx) => (
            <ContractFunction
              key={idx}
              item={item}
              contractState={contractState}
            />
          ))}
        </ul>
      </ContractSection>

      <ContractSection title="Events" titleColor="text-purple-400" isEmpty={events.length === 0}>
        <ul className="space-y-3">
          {events.map((item, idx) => (
            <ContractFunction
              key={idx}
              item={item}
              contractState={contractState}
            />
          ))}
        </ul>
      </ContractSection>
    </div>
  );
};

export default ContractABI;