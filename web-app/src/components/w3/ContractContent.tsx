import { useUser } from '@/lib/UserContext';
import ContractCreate from './ContractCreate';
import ContractABI from './ContractAbi';

export const ContractContent = () => {
    const { contract } = useUser();

    return (
        <>
            {contract ? (
                <ContractABI contract={contract} />
            ) : (
                <ContractCreate />
            )}
        </>
    )
}