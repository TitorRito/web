import { useUser } from '@/lib/UserContext';
import ContractCreate from './ContractCreate';
export const ContractContent = () => {
    const { contract, setContract } = useUser();

    return (
        <ContractCreate
            handleCreateContract={(newContract) => {
                // setContract(newContract);
                console.log("Contract created:", newContract);
            }
            }
        />
    )
}