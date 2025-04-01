import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '@/lib/types';
import { getWallet } from '@/lib/json-rpc';
import { get } from 'http';
interface UserContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    login: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    window.uu = user;
    return (
        <UserContext.Provider value={{ user, setUser, login: () => getWallet().then(setUser) }}>
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