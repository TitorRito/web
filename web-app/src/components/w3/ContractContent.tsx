import { useUser } from '@/lib/UserContext';
import ContractCreate from './ContractCreate';


export const ContractContent = () => {
    const { contract, setContract } = useUser();

    function handleCreateContract(newContract: any) {
        console.log("Contract created from here:", newContract);
    }

    return (
        <ContractCreate
            handleCreateContract={handleCreateContract}
        />
    )
}