import React from 'react';

export interface SearchFilters {
    searchText: string;
    includeRead: boolean;
    includeWrite: boolean;
    includeEvents: boolean;
    stateMutability: {
        view: boolean;
        pure: boolean;
        nonpayable: boolean;
        payable: boolean;
    };
}

interface ContractSearchProps {
    filters: SearchFilters;
    onFiltersChange: (filters: SearchFilters) => void;
    readCount: number;
    writeCount: number;
    eventsCount: number;
}

interface FilterCheckboxProps {
    label: string;
    checked: boolean;
    onChange: () => void;
    count?: number;
}

const FilterCheckbox: React.FC<FilterCheckboxProps> = ({ label, checked, onChange, count }) => (
    <label className="flex items-center py-1 cursor-pointer hover:bg-gray-700 px-2 rounded">
        <input
            type="checkbox"
            checked={checked}
            onChange={onChange}
            className="form-checkbox h-4 w-4 text-gray-600 bg-gray-800 border border-gray-600 rounded focus:ring-0 focus:ring-offset-0"
        />
        <span className={`ml-2 text-sm ${checked ? 'text-white' : 'text-gray-400'}`}>{label}</span>
        {count !== undefined && (
            <span className="ml-1.5 text-xs text-gray-500">({count})</span>
        )}
    </label>
);

const ContractSearch: React.FC<ContractSearchProps> = ({
    filters,
    onFiltersChange,
    readCount,
    writeCount,
    eventsCount
}) => {
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onFiltersChange({
            ...filters,
            searchText: e.target.value
        });
    };

    const toggleFilter = (filterKey: keyof SearchFilters | keyof SearchFilters['stateMutability'], nestedKey?: string) => {
        if (nestedKey) {
            onFiltersChange({
                ...filters,
                [filterKey]: {
                    ...filters[filterKey as keyof SearchFilters],
                    [nestedKey]: !filters.stateMutability[nestedKey as keyof SearchFilters['stateMutability']]
                }
            });
        } else {
            onFiltersChange({
                ...filters,
                [filterKey]: !filters[filterKey as keyof SearchFilters]
            });
        }
    };

    const handleClearFilters = () => {
        onFiltersChange({
            searchText: '',
            includeRead: true,
            includeWrite: true,
            includeEvents: true,
            stateMutability: {
                view: true,
                pure: true,
                nonpayable: true,
                payable: true
            }
        });
    };

    return (
        <div className="mb-6 bg-gray-800 rounded-sm border border-gray-700">
            {/* Search input */}
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                <input
                    type="text"
                    placeholder="Search functions..."
                    className="block w-full pl-10 pr-10 py-2 border-none bg-gray-800 text-white focus:outline-none border-b border-gray-700"
                    value={filters.searchText}
                    onChange={handleSearchChange}
                />
            </div>

            {/* Filter sections */}
            <div className="p-3 border-t border-gray-700 text-sm">
                <div className="flex flex-wrap gap-2 mb-3">
                    <div className="text-gray-400 mr-2 flex items-center">Types:</div>
                    <FilterCheckbox
                        label="Read"
                        checked={filters.includeRead}
                        onChange={() => toggleFilter('includeRead')}
                        count={readCount}
                    />
                    <FilterCheckbox
                        label="Write"
                        checked={filters.includeWrite}
                        onChange={() => toggleFilter('includeWrite')}
                        count={writeCount}
                    />
                    <FilterCheckbox
                        label="Events"
                        checked={filters.includeEvents}
                        onChange={() => toggleFilter('includeEvents')}
                        count={eventsCount}
                    />
                </div>

                <div className="flex flex-wrap gap-2">
                    <div className="text-gray-400 mr-2 flex items-center">Mutability:</div>
                    <FilterCheckbox
                        label="View"
                        checked={filters.stateMutability.view}
                        onChange={() => toggleFilter('stateMutability', 'view')}
                    />
                    <FilterCheckbox
                        label="Pure"
                        checked={filters.stateMutability.pure}
                        onChange={() => toggleFilter('stateMutability', 'pure')}
                    />
                    <FilterCheckbox
                        label="Non-payable"
                        checked={filters.stateMutability.nonpayable}
                        onChange={() => toggleFilter('stateMutability', 'nonpayable')}
                    />
                    <FilterCheckbox
                        label="Payable"
                        checked={filters.stateMutability.payable}
                        onChange={() => toggleFilter('stateMutability', 'payable')}
                    />

                    <button
                        onClick={handleClearFilters}
                        className="ml-auto text-xs text-gray-500 hover:text-white px-2 py-1 rounded hover:bg-gray-700"
                    >
                        Reset
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ContractSearch;
