import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User } from '@/lib/types';
import { getWallet } from '@/lib/json-rpc';

interface UserContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    login: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isInitializing, setIsInitializing] = useState(true);

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
            // Handle network changes
            const handleChainChanged = () => {
                console.log("Network changed, refreshing data...");
                getWallet().then(setUser);
            };

            // Handle account changes
            const handleAccountsChanged = (accounts: string[]) => {
                console.log("Accounts changed:", accounts);
                if (accounts.length === 0) {
                    // User disconnected their wallet
                    console.log("User disconnected wallet");
                    setUser(null);
                } else {
                    // User switched accounts, refresh data
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

    return (
        <UserContext.Provider value={{
            user,
            setUser,
            login: () => getWallet().then(setUser),
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