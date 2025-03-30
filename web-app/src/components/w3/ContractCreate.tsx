import { useState } from 'react';
import ContractCreateCustomForm from './ContractCreateCustomForm';
import ContractCreateImportList from './ContractCreateImportList';

interface ContractOptionsProps {
    selectedOption: 'custom' | 'import' | null;
    setSelectedOption: (option: 'custom' | 'import') => void;
}

function ContractOptions({ selectedOption, setSelectedOption }: ContractOptionsProps) {
    return (
        <div className="flex justify-center items-center gap-1 px-1 [&>div]:border [&>div]:grow [&>div]:text-center [&>div]:py-6 [&>div]:hover:scale-105">
            <div
                className={`bg-green-800 cursor-pointer ${selectedOption === 'custom' ? 'ring-2 ring-white' : ''}`}
                onClick={() => setSelectedOption('custom')}
            >
                Custom
            </div>
            <div
                className={`bg-orange-800 cursor-pointer ${selectedOption === 'import' ? 'ring-2 ring-white' : ''}`}
                onClick={() => setSelectedOption('import')}
            >
                Import
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
        <div className="border rounded-lg shadow-md min-w-[250px]">
            <h2 className='text-center text-lg p-2 m-2'>Create Contract</h2>
            <ContractOptions
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
            />
            {selectedOption === 'custom' && (
                <ContractCreateCustomForm handleCreateContract={handleCreateContract} />
            )}

            {selectedOption === 'import' && (
                <ContractCreateImportList handleCreateContract={handleCreateContract} />
            )}
        </div>
    );
}