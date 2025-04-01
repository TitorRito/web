import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User, Contract } from '@/lib/types';
import { getWallet } from '@/lib/json-rpc';

interface UserContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    login: () => void;
    contract: Contract | null;
    setContract: React.Dispatch<React.SetStateAction<Contract | null>>;
    updateContract: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isInitializing, setIsInitializing] = useState(true);
    const [contract, setContract] = useState<Contract | null>(null);

    // Initialize user on mount
    useEffect(() => {
        const initializeUser = async () => {
            try {
                const initialUser = await getWallet();
                if (initialUser) {
                    setUser(initialUser);
                    console.log("User wallet initialized automatically");
                }
            } catch (error) {
                console.error("Error initializing wallet:", error);
            } finally {
                setIsInitializing(false);
            }
        };

        initializeUser();
    }, []);

    // Evnet Listening for onChanged
    useEffect(() => {
        if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
            const handleChainChanged = () => {
                console.log("Network changed, refreshing data...");
                getWallet().then(setUser);
            };

            const handleAccountsChanged = (accounts: string[]) => {
                console.log("Accounts changed:", accounts);
                if (accounts.length === 0) {
                    console.log("User disconnected wallet");
                    setUser(null);
                } else {
                    getWallet().then(setUser);
                }
            };

            window.ethereum.on('chainChanged', handleChainChanged);
            window.ethereum.on('accountsChanged', handleAccountsChanged);

            return () => {
                window.ethereum.removeListener('chainChanged', handleChainChanged);
                window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
            };
        }
    }, [user]);

    function updateContract() {
        if (user) {
            console.log("Contract instance updated");
        } else {
            console.error("User not connected, cannot update contract");
        }
    }

    return (
        <UserContext.Provider value={{
            user,
            setUser,
            login: () => getWallet().then(setUser),
            contract,
            setContract,
            updateContract,
        }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};