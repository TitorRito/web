import { useEffect, useRef } from 'react';

interface ContractDetails {
  name?: string;
  address?: string;
  abi?: any[];
  chainId?: number;
  [key: string]: any; // For any other properties in the contract data
}

interface ContractPopUpProps {
  contract: ContractDetails | null;
  onClose: () => void;
  onImport?: (contract: ContractDetails) => void;
}

export default function ContractPopUp({ contract, onClose, onImport }: ContractPopUpProps) {
  const popupRef = useRef<HTMLDivElement>(null);

  // Handle ESC key press to close popup
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    // Handle click outside popup to close it
    function handleClickOutside(event: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handleImport = () => {
    if (contract && onImport) {
      onImport(contract);
      onClose();
    }
  };

  if (!contract) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div ref={popupRef} className="bg-gray-800 p-6 rounded-lg shadow-xl max-w-3xl w-full max-h-[80vh] overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-100">Contract Details</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-200 text-2xl font-bold"
          >
            &times;
          </button>
        </div>

        <div className="space-y-4">
          {/* Contract Name */}
          {contract.name && (
            <div>
              <h3 className="text-gray-300 font-medium">Name</h3>
              <p className="text-gray-100">{contract.name}</p>
            </div>
          )}
          
          {/* Contract Address */}
          {contract.address && (
            <div>
              <h3 className="text-gray-300 font-medium">Address</h3>
              <p className="text-gray-100 break-all">{contract.address}</p>
            </div>
          )}
          
          {/* Contract ChainId */}
          {contract.chainId && (
            <div>
              <h3 className="text-gray-300 font-medium">Chain ID</h3>
              <p className="text-gray-100">{contract.chainId}</p>
            </div>
          )}
          
          {/* Contract ABI */}
          {contract.abi && (
            <div>
              <h3 className="text-gray-300 font-medium">ABI</h3>
              <pre className="bg-gray-700 p-3 rounded text-gray-100 text-sm overflow-auto max-h-80">
                {JSON.stringify(contract.abi, null, 2)}
              </pre>
            </div>
          )}
        </div>

        {/* Add import button at the bottom */}
        <div className="mt-6 flex justify-end">
          {onImport && (
            <button
              onClick={handleImport}
              className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded"
            >
              Import Contract
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
