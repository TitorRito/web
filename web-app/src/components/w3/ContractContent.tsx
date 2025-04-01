import { useUser } from '@/lib/UserContext';
import ContractCreate from './ContractCreate';


export const ContractContent = () => {
    const { contract } = useUser();


    return (
        <>
            {contract ? (
                <div>Contract View</div>
            ) : (
                <ContractCreate />
            )}
        </>
    )
}