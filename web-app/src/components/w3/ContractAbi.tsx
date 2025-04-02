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

// Clickable terminal header component for execution - Updated styling and removed Run button
const ExecuteComponent: React.FC<{
  func: SolItem;
  isLoading: boolean;
  onExecute: () => void;
  onChange?: (index: number, value: string) => void;
}> = ({ func, isLoading, onExecute, onChange }) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      className={`px-3 py-2 font-mono text-sm border-b border-gray-800 flex items-center cursor-pointer transition-colors ${isHover && !isLoading ? 'bg-gray-900' : ''}`}
      onClick={() => !isLoading && onExecute()}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      aria-disabled={isLoading}
    >
      {/* Command prefix and function name with hover effect */}
      <div
        className={`whitespace-nowrap ${isHover && !isLoading ? 'text-green-400' : 'text-gray-400'} transition-colors`}
      >
        $ ./{func.name}
      </div>

      {/* Function arguments */}
      {func.inputs.length > 0 && (
        <div className="flex flex-nowrap gap-2 px-2 flex-grow overflow-x-auto">
          {func.inputs.map((input, idx) => (
            <input
              key={idx}
              type="text"
              disabled={isLoading}
              placeholder={input.name || `${idx}: ${input.type}`}
              className="max-w-[100px] min-w-[60px] px-2 py-0.5 bg-gray-800 text-white rounded border border-gray-700 font-mono text-xs focus:border-blue-500 focus:outline-none disabled:opacity-50"
              onChange={(e) => onChange && onChange(idx, e.target.value)}
              onClick={(e) => e.stopPropagation()} // Prevent terminal click when clicking input
            />
          ))}
        </div>
      )}

      {/* Loading indicator */}
      {isLoading && (
        <div className="ml-auto flex items-center text-blue-400 text-xs">
          <span className="w-3 h-3 border-2 border-blue-300 border-t-transparent rounded-full animate-spin mr-2"></span>
          Processing...
        </div>
      )}
    </div>
  );
};

// Simplified Terminal Component with integrated arguments
const FunctionTerminal: React.FC<{
  func: SolItem;
  runFunction?: (funcName: string) => void;
  contractState: ContractState;
}> = ({ func, runFunction, contractState }) => {
  const funcState = contractState[func.name] || { loading: false };
  const isLoading = funcState.loading;
  const [args, setArgs] = useState<{ [key: number]: string }>({});

  const handleExecute = () => {
    runFunction && runFunction(func.name);
  };

  const handleArgChange = (index: number, value: string) => {
    setArgs(prev => ({
      ...prev,
      [index]: value
    }));
  };

  return (
    <div className="mt-2">
      <div className="bg-black rounded border border-gray-800">
        <ExecuteComponent
          func={func}
          isLoading={isLoading}
          onExecute={handleExecute}
          onChange={handleArgChange}
        />

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
      {item.inputs.map((input, inputIndex) => (
        <span key={inputIndex}>
          <span className="text-blue-400">{input.type}</span>
          <span className="text-gray-400"> {input.name}</span>
          {inputIndex < item.inputs.length - 1 && <span className="text-gray-400">, </span>}
        </span>
      ))}
      <span className="text-gray-400">)</span>

      {/* Only show stateMutability and outputs for functions */}
      {item.type === 'function' && (
        <>
          <span className="text-purple-400"> {item.stateMutability}</span>
          {item.outputs && item.outputs.length > 0 && (
            <>
              <span className="text-purple-400"> returns </span>
              <span className="text-gray-400">(</span>
              {item.outputs.map((output, outputIndex) => (
                <span key={outputIndex}>
                  <span className="text-blue-400">{output.type}</span>
                  <span className="text-gray-400"> {output.name}</span>
                  {outputIndex < item.outputs.length - 1 && <span className="text-gray-400">, </span>}
                </span>
              ))}
              <span className="text-gray-400">)</span>
            </>
          )}
        </>
      )}
    </div>
  );
};

// Generalized Function Component
const ContractFunction: React.FC<{
  item: SolItem;
  contractState: ContractState;
  runFunction?: (funcName: string) => void;
}> = ({ item, contractState, runFunction }) => {
  const isRead = item.itemType === SolItemType.READ;
  const isFunction = item.type === 'function';

  const getTypeStyles = () => {
    switch (item.itemType) {
      case SolItemType.READ: return 'border-l-4 border-blue-700';
      case SolItemType.WRITE: return 'border-l-4 border-green-700';
      case SolItemType.EVENT: return 'border-l-4 border-purple-700';
      default: return '';
    }
  };

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

        <FunctionSignature
          item={item}
          color={getColor()}
        />

        {isRead && isFunction && (
          <FunctionTerminal
            func={item}
            runFunction={runFunction}
            contractState={contractState}
          />
        )}
      </div>
    </li>
  );
};


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

const ContractABI = ({ contract }: { contract: Contract }) => {
  const [contractState, setContractState] = useState<ContractState>({});

  if (!contract.abi) {
    return <NoAbiProvided />;
  }

  const { reads, writes, events } = parseAndCategorizeAbi(contract.abi);

  const runFunction = (funcName: string) => {

    setContractState(prev => {
      const newState = { ...prev };
      newState[funcName] = {
        loading: true,
        message: "Loading..."
      };
      return newState;
    });

    setTimeout(() => {
      // Error
      const updatedState = {
        loading: false,
        status: 400,
        message: JSON.stringify({ error: "Execution failed", code: 400, reason: "Invalid parameters or contract error" }, null, 2)
      };

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