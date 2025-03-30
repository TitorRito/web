import { useState } from 'react';
import ContractCreateCustomForm from './ContractCreateCustomForm';
import ContractCreateImportList from './ContractCreateImportList';

interface ContractOptionsProps {
    selectedOption: 'custom' | 'import' | null;
    setSelectedOption: (option: 'custom' | 'import') => void;
}

function ContractOptions({ selectedOption, setSelectedOption }: ContractOptionsProps) {
    return (
        <div className="flex justify-center items-center gap-1 px-1 [&>div]:border [&>div]:grow [&>div]:text-center [&>div]:py-2 [&>div]:transition-all [&>div]:duration-200">
            <div
                className={`bg-gray-800 cursor-pointer hover:bg-gray-700 border-gray-600 text-gray-200 ${selectedOption === 'custom' ? 'border-b-2 border-b-blue-400' : ''}`}
                onClick={() => setSelectedOption('custom')}
            >
                <span className="font-mono">New Contract</span>
            </div>
            <div
                className={`bg-gray-800 cursor-pointer hover:bg-gray-700 border-gray-600 text-gray-200 ${selectedOption === 'import' ? 'border-b-2 border-b-blue-400' : ''}`}
                onClick={() => setSelectedOption('import')}
            >
                <span className="font-mono">Import Existing</span>
            </div>
        </div>
    );
}

interface ContractCreateProps {
    handleCreateContract: (contract: any) => void;
}

export default function ContractCreate({ handleCreateContract }: ContractCreateProps) {
    const [selectedOption, setSelectedOption] = useState<'custom' | 'import' | null>('custom');

    return (
        <div className="border border-gray-700 rounded-lg shadow-md min-w-[250px] bg-gray-900 text-gray-200">
            <h2 className='text-center text-lg p-2 m-2 font-mono text-blue-400 border-b border-gray-700'>Contract Interface</h2>
            <ContractOptions
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
            />
            <div className="p-4">
                {selectedOption === 'custom' && (
                    <ContractCreateCustomForm handleCreateContract={handleCreateContract} />
                )}

                {selectedOption === 'import' && (
                    <ContractCreateImportList handleCreateContract={handleCreateContract} />
                )}
            </div>
        </div>
    );
}