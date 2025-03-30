import React, { useState, FormEvent } from 'react';
import ContractPopUp from './ContractPopUp';

interface ContractDetails {
  address: string;
  abi: any;
  chainId?: number;
  name?: string;
}

interface ContractCustomFormProps {
  handleCreateContract: (contract: ContractDetails) => void;
}

// Helper function to convert simplified function signatures to ABI format
function parseSimplifiedAbi(input: string): any[] {
  // If input looks like JSON, try parsing it directly
  if ((input.trim().startsWith('[') && input.trim().endsWith(']')) || 
      (input.trim().startsWith('{') && input.trim().endsWith('}'))) {
    try {
      return JSON.parse(input);
    } catch (e) {
      throw new Error('Invalid JSON format');
    }
  }

  // Otherwise treat as simplified format
  const signatures = input
    .split(',')
    .map(sig => sig.trim())
    .filter(sig => sig.length > 0);
  
  if (signatures.length === 0) {
    throw new Error('No valid function signatures provided');
  }

  return signatures.map(signature => {
    // Match function or event name and parameters
    const match = signature.match(/^(\w+)(?:\((.*)\))?(?:\s*->\s*(.*))?$/);
    if (!match) {
      throw new Error(`Invalid signature format: ${signature}`);
    }

    const [, name, inputParams = '', outputParams = ''] = match;
    
    // Parse input parameters
    const inputs = inputParams.split(/\s*,\s*/).filter(p => p).map((param, i) => {
      const parts = param.split(/\s+/);
      return {
        name: parts.length > 1 ? parts[0] : `arg${i}`,
        type: parts.length > 1 ? parts[1] : parts[0] || 'uint256'
      };
    });

    // Parse output parameters
    const outputs = outputParams.split(/\s*,\s*/).filter(p => p).map((param, i) => {
      const parts = param.split(/\s+/);
      return {
        name: parts.length > 1 ? parts[0] : ``,
        type: parts.length > 1 ? parts[1] : parts[0] || 'uint256'
      };
    });

    // Determine if this is a function or event by convention (events usually start with uppercase)
    const isEvent = name.charAt(0) === name.charAt(0).toUpperCase();
    const isView = name.startsWith('get') || name.startsWith('view') || 
                   name.startsWith('is') || name.startsWith('has');

    if (isEvent) {
      return {
        type: 'event',
        name,
        inputs,
        anonymous: false
      };
    } else {
      return {
        type: 'function',
        name,
        inputs,
        outputs,
        stateMutability: isView ? 'view' : 'nonpayable'
      };
    }
  });
}

export default function ContractCreateCustomForm({ handleCreateContract }: ContractCustomFormProps) {
  const [formData, setFormData] = useState({
    address: '',
    abi: '',
    chainId: '',
    name: 'Custom Contract'
  });
  const [error, setError] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [previewData, setPreviewData] = useState<ContractDetails | null>(null);

  // Add example JSON ABI for placeholder tooltip
  const jsonExample = `[
  {
    "type": "function",
    "name": "balanceOf",
    "inputs": [{"name": "owner", "type": "address"}],
    "outputs": [{"type": "uint256"}],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "transfer",
    "inputs": [
      {"name": "to", "type": "address"},
      {"name": "value", "type": "uint256"}
    ],
    "outputs": [{"type": "bool"}],
    "stateMutability": "nonpayable"
  }
]`;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(null); // Clear any error when user types
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // Validate address
    if (!formData.address.trim()) {
      setError('Contract address is required');
      return;
    }
    
    try {
      // Parse ABI (either JSON or simplified format)
      let parsedAbi: any;
      try {
        parsedAbi = parseSimplifiedAbi(formData.abi);
      } catch (err: any) {
        setError(err.message || 'Invalid ABI format');
        return;
      }
      
      // Prepare preview data
      const contractData: ContractDetails = {
        address: formData.address,
        abi: parsedAbi,
        name: formData.name || 'Custom Contract'
      };
      
      // Add chainId if provided
      if (formData.chainId.trim()) {
        const chainId = parseInt(formData.chainId, 10);
        if (isNaN(chainId)) {
          setError('Chain ID must be a number');
          return;
        }
        contractData.chainId = chainId;
      }
      
      // Show preview
      setPreviewData(contractData);
      setShowPreview(true);
      
    } catch (err: any) {
      setError(err.message || 'Failed to process contract data');
    }
  };
  
  const handleImport = (contract: ContractDetails) => {
    handleCreateContract(contract);
  };

  return (
    <div className="p-4">
      {error && (
        <div className="text-red-500 mb-4 p-2 bg-red-50 border border-red-200 rounded">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Contract Name (optional)</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
            placeholder="My Custom Contract"
          />
        </div>
        
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
          <label className="block text-sm font-medium mb-1">
            Contract ABI
            <span className="ml-1 text-xs text-gray-500">
              (comma-separated function signatures or JSON)
            </span>
          </label>
          <textarea
            name="abi"
            value={formData.abi}
            onChange={handleInputChange}
            className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
            placeholder="Option 1: balanceOf(address) -> uint256, transfer(address,uint256)"
            rows={4}
            required
          />
          <div className="flex flex-col text-xs text-gray-500 mt-1 space-y-1">
            <p><strong>Option 1:</strong> Simple format - functions and events separated by commas</p>
            <p className="font-mono">balanceOf(address) -> uint256, transfer(address,uint256), Approval(address,address,uint256)</p>
            <details className="cursor-pointer">
              <summary className="mb-1"><strong>Option 2:</strong> JSON ABI format (click to expand)</summary>
              <pre className="whitespace-pre-wrap bg-gray-50 p-2 rounded text-xs overflow-auto max-h-48">
                {jsonExample}
              </pre>
            </details>
          </div>
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
          Preview Contract
        </button>
      </form>
      
      {showPreview && previewData && (
        <ContractPopUp
          contract={previewData}
          onClose={() => setShowPreview(false)}
          onImport={handleImport}
        />
      )}
    </div>
  );
}
