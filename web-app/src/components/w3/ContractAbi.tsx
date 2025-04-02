import React, { useState, useEffect } from 'react';
import { Contract } from '@/lib/types';
import { parseAndCategorizeAbi, SolItem, SolParam, SolItemType } from '@/lib/abi-rpc';

interface ContractState {
  [functionName: string]: {
    functionSol: SolItem;
    loading: boolean;
    response?: string;
    args?: Record<string, string>;
    trigger?: boolean;
  };
}

const ExecuteComponent: React.FC<{
  functionName: string;
  contractState: ContractState;
  setContractState: React.Dispatch<React.SetStateAction<ContractState>>;
}> = ({ functionName, contractState, setContractState }) => {
  const [isHover, setIsHover] = useState(false);

  const funcState = contractState[functionName];
  const func = funcState.functionSol;
  const isLoading = funcState.loading;

  const handleInputChange = (paramName: string, value: string) => {
    setContractState(prev => {
      const newState = { ...prev };
      newState[functionName] = {
        ...funcState,
        args: {
          ...(funcState.args || {}),
          [paramName]: value
        }
      };
      return newState;
    });
  };

  const handleExecute = () => {
    if (isLoading) return;

    // Check if all required arguments are provided
    const requiredInputs = func.inputs;
    const currentArgs = funcState.args || {};

    const missingArgs = requiredInputs.filter((input, idx) => {
      const paramKey = input.name || `param${idx}`;
      return !currentArgs[paramKey] || currentArgs[paramKey].trim() === '';
    });

    if (missingArgs.length > 0) {
      const missingNames = missingArgs.map((input, idx) =>
        input.name || `Parameter ${idx}`
      ).join(', ');

      setContractState(prev => {
        const newState = { ...prev };
        newState[functionName] = {
          ...funcState,
          response: `Error: Missing required arguments: ${missingNames}`
        };
        return newState;
      });

      return;
    }

    // Check if all pareams 
    // Set trigger to true -> runExecute from Parent : ContractABI
    setContractState(prev => {
      const newState = { ...prev };
      newState[functionName] = {
        ...funcState,
        loading: true,
        trigger: true,
        response: undefined // Clear any previous error messages
      };
      return newState;
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleExecute();
    }
  };

  return (
    <div
      className={`px-3 py-2 font-mono text-sm border-b border-gray-800 flex items-center cursor-pointer transition-colors ${isHover && !isLoading ? 'bg-gray-900' : ''}`}
      onClick={handleExecute}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      aria-disabled={isLoading}
    >
      <div className={`whitespace-nowrap ${isHover && !isLoading ? 'text-green-400' : 'text-gray-400'} transition-colors`}>
        $ ./{func.name}
      </div>

      {/* Function arguments - Using inputs that directly update contractState */}
      {func.inputs.length > 0 && (
        <div className="flex flex-nowrap gap-2 px-2 flex-grow overflow-x-auto">
          {func.inputs.map((input: SolParam, idx: number) => {
            const paramKey = input.name || `param${idx}`;
            return (
              <input
                key={paramKey}
                type="text"
                disabled={isLoading}
                placeholder={input.name || `${idx}: ${input.type}`}
                className="max-w-[100px] min-w-[60px] px-2 py-0.5 bg-gray-800 text-white rounded border border-gray-700 font-mono text-xs focus:border-blue-500 focus:outline-none disabled:opacity-50"
                value={(funcState.args && funcState.args[paramKey]) || ''}
                onChange={(e) => handleInputChange(paramKey, e.target.value)}
                onKeyDown={handleKeyDown}
                onClick={(e) => e.stopPropagation()} // Prevent terminal click when clicking input
              />
            );
          })}
        </div>
      )}

      {isLoading && (
        <div className="ml-auto flex items-center text-blue-400 text-xs">
          <span className="w-3 h-3 border-2 border-blue-300 border-t-transparent rounded-full animate-spin mr-2"></span>
          Processing...
        </div>
      )}
    </div>
  );
};

const FunctionTerminal: React.FC<{
  functionName: string;
  contractState: ContractState;
  setContractState: React.Dispatch<React.SetStateAction<ContractState>>;
}> = ({ functionName, contractState, setContractState }) => {
  const funcState = contractState[functionName];

  return (
    <div className="mt-2">
      <div className="bg-black rounded border border-gray-800">
        <ExecuteComponent
          functionName={functionName}
          contractState={contractState}
          setContractState={setContractState}
        />

        <div className="px-3 py-2">
          {funcState.response && (
            <pre className="text-xs overflow-x-auto whitespace-pre-wrap text-gray-300 font-mono">{funcState.response}</pre>
          )}
        </div>
      </div>
    </div>
  );
};

const FunctionSignature: React.FC<{
  functionSol: SolItem;
  color: string;
}> = ({ functionSol, color }) => {
  const isEvent = functionSol.type === 'event';

  return (
    <div className="font-mono">
      <span className={`text-${isEvent ? 'red' : 'purple'}-400`}>{functionSol.type} </span>
      <span className={`text-${color}-400`}>{functionSol.name}</span>
      <span className="text-gray-400">(</span>
      {functionSol.inputs.map((input, inputIndex) => (
        <span key={inputIndex}>
          <span className="text-blue-400">{input.type}</span>
          <span className="text-gray-400"> {input.name}</span>
          {inputIndex < functionSol.inputs.length - 1 && <span className="text-gray-400">, </span>}
        </span>
      ))}
      <span className="text-gray-400">)</span>

      {/* Only show stateMutability and outputs for functions */}
      {functionSol.type === 'function' && (
        <>
          <span className="text-purple-400"> {functionSol.stateMutability}</span>
          {functionSol.outputs && functionSol.outputs.length > 0 && (
            <>
              <span className="text-purple-400"> returns </span>
              <span className="text-gray-400">(</span>
              {functionSol.outputs.map((output, outputIndex) => (
                <span key={outputIndex}>
                  <span className="text-blue-400">{output.type}</span>
                  <span className="text-gray-400"> {output.name}</span>
                  {outputIndex < functionSol.outputs.length - 1 && <span className="text-gray-400">, </span>}
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

const ContractFunction: React.FC<{
  functionName: string;
  contractState: ContractState;
  setContractState?: React.Dispatch<React.SetStateAction<ContractState>>;
}> = ({ functionName, contractState, setContractState }) => {
  const funcState = contractState[functionName];
  const solItem = funcState.functionSol;

  const isRead = solItem.itemType === SolItemType.READ;
  const isFunction = solItem.type === 'function';

  const getTypeStyles = () => {
    const border = 'border-l-4 ';
    switch (solItem.itemType) {
      case SolItemType.READ:
        return border + 'border-blue-700';
      case SolItemType.WRITE:
        return border + 'border-green-700';
      case SolItemType.EVENT:
        return border + 'border-purple-700';
      default:
        return '';
    }
  };

  const getColor = () => {
    switch (solItem.itemType) {
      case SolItemType.READ:
        return 'yellow';
      case SolItemType.WRITE:
        return 'green';
      case SolItemType.EVENT:
        return 'purple';
      default:
        return 'gray';
    }
  };

  return (
    <li className={`p-3 bg-gray-800 rounded-md shadow-sm ${getTypeStyles()}`}>
      <div className="flex flex-col">
        <FunctionSignature functionSol={solItem} color={getColor()} />

        {isRead && isFunction && setContractState && (
          <FunctionTerminal
            functionName={functionName}
            contractState={contractState}
            setContractState={setContractState}
          />
        )}
      </div>
    </li>
  );
};

const ContractABI = ({ contract }: { contract: Contract }) => {
  const [contractState, setContractState] = useState<ContractState>(() => {
    if (!contract.abi) return {};

    const { reads, writes, events } = parseAndCategorizeAbi(contract.abi);
    const initialState: ContractState = {};

    [...reads, ...writes, ...events].forEach(solItem => {
      initialState[solItem.name] = {
        functionSol: solItem,
        loading: false,
        args: {},
        trigger: false
      };
    });

    return initialState;
  });

  useEffect(() => {
    // Find any function with trigger=true
    const triggeredContract = Object.entries(contractState).find(
      ([_, state]) => state.trigger === true
    );

    if (triggeredContract) {
      runExecute(triggeredContract);
    }
  }, [contractState]);

  if (!contract.abi) {
    return <NoAbiProvided />;
  }

  const { reads, writes, events } = parseAndCategorizeAbi(contract.abi);

  const runExecute = (triggeredContract: [string, ContractState[string]]) => {
    const [functionName, funcState] = triggeredContract;

    console.log('Hello, executing function:', triggeredContract);
    console.log('Function name:', functionName);
    console.log('Loading state:', funcState.loading);
    console.log('Function details:', funcState.functionSol);
    console.log('Arguments:', funcState.args);

    try {
      // Convert arguments from the state to an array in the correct order
      const args = funcState.functionSol.inputs.map((input) => {
        const paramKey = input.name;
        return funcState.args?.[paramKey] || '';
      });

      const result = contract.instance?.[functionName](...args);

      setContractState(prev => {
        const newState = { ...prev };
        newState[functionName] = {
          ...funcState,
          loading: false,
          trigger: false,
          response: `Result: ${JSON.stringify(result)}`
        };
        return newState;
      });
    } catch (e) {
      console.error('Error executing function:', e);
      setContractState(prev => {
        const newState = { ...prev };
        newState[functionName] = {
          ...funcState,
          loading: false,
          trigger: false,
          response: `Error: ${e.message || 'Unknown error occurred'}`
        };
        return newState;
      });
    }
  };

  // DEBUGS
  window.state = contractState;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-900 rounded-lg shadow-lg text-gray-200">
      <ContractHeader contract={contract} />

      <ContractSection title="Read Functions" titleColor="text-blue-400" isEmpty={reads.length === 0}>
        <ul className="space-y-3">
          {reads.map((solItem, idx) => (
            <ContractFunction
              key={idx}
              functionName={solItem.name}
              contractState={contractState}
              setContractState={setContractState}
            />
          ))}
        </ul>
      </ContractSection>

      <ContractSection title="Write Functions" titleColor="text-green-400" isEmpty={writes.length === 0}>
        <ul className="space-y-3">
          {writes.map((solItem, idx) => (
            <ContractFunction
              key={idx}
              functionName={solItem.name}
              contractState={contractState}
            />
          ))}
        </ul>
      </ContractSection>

      <ContractSection title="Events" titleColor="text-purple-400" isEmpty={events.length === 0}>
        <ul className="space-y-3">
          {events.map((solItem, idx) => (
            <ContractFunction
              key={idx}
              functionName={solItem.name}
              contractState={contractState}
            />
          ))}
        </ul>
      </ContractSection>
    </div>
  );
};

//basic UI
const ContractHeader: React.FC<{ contract: Contract }> = ({ contract }) => (
  <div className="mb-6 border-b border-gray-700 pb-4">
    <h1 className="text-3xl font-bold text-blue-400">Contract Details</h1>
    <p className="text-gray-400">
      Address: <span className="font-mono text-green-400">{contract.address || 'Not provided'}</span>
    </p>
    <p className="text-gray-400">
      Chain ID: <span className="font-mono text-green-400">{contract.chainId || 'Not provided'}</span>
    </p>
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

export default ContractABI;