
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, AuthError } from '../types';
import { onAuthStateChanged, signIn as apiSignIn, signOut as apiSignOut, signUp as apiSignUp } from '../api';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    error: AuthError | null;
    signIn: (providerId: string, credentials: any) => Promise<void>;
    signUp: (providerId: string, credentials: any) => Promise<void>;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<AuthError | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged((user) => {
            setUser(user);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const signIn = async (providerId: string, credentials: any) => {
        try {
            setError(null);
            await apiSignIn(providerId, credentials);
        } catch (err: any) {
            setError(err);
            throw err;
        }
    };

    const signUp = async (providerId: string, credentials: any) => {
        try {
            setError(null);
            await apiSignUp(providerId, credentials);
        } catch (err: any) {
            setError(err);
            throw err;
        }
    };

    const signOut = async () => {
        try {
            await apiSignOut();
        } catch (err: any) {
             setError(err);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, error, signIn, signUp, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
