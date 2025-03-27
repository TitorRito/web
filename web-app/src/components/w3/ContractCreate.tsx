import { useState, FormEvent } from 'react';
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

export default function ContractCreate() {
    const [selectedOption, setSelectedOption] = useState<'custom' | 'import' | null>(null);
    const [formData, setFormData] = useState({
        address: '',
        abi: '',
        chainId: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log('Form Data:', formData);
    };

    // Mock data for import list
    const importList = [
        { id: 1, name: 'ERC20 Token', address: '0x1234...5678', chainId: 1 },
        { id: 2, name: 'NFT Collection', address: '0xabcd...efgh', chainId: 137 },
        { id: 3, name: 'DAO Contract', address: '0x9876...5432', chainId: 42161 }
    ];

    return (
        <div className="border rounded-lg shadow-md min-w-[250px]">
            <h2 className='text-center text-lg p-2'>Create Contract</h2>
            <ContractOptions
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
            />

            <div className="p-4">
                {selectedOption === 'custom' && (
                    <ContractCreateCustomForm
                        formData={formData}
                        handleInputChange={handleInputChange}
                        handleSubmit={handleSubmit}
                    />
                )}

                {selectedOption === 'import' && (
                    <ContractCreateImportList importList={importList} />
                )}
            </div>
        </div>
    );
}