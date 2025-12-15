import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, AuthError } from '../types';
import { storage } from '@labs/utils';

interface Session {
    token: string;
}

interface AuthContextType {
    user: User | null;
    session: Session | null;
    loading: boolean;
    error: AuthError | null;
    signIn: (providerId: string, credentials: any) => Promise<void>;
    signUp: (providerId: string, credentials: any) => Promise<void>;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: React.ReactNode;
    baseUrl?: string;
}

export const AuthProvider = ({ children, baseUrl = '/api/auth' }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<AuthError | null>(null);

    const checkSession = async () => {
        try {
            // Check storage (wrapper handles window check)
            const token = storage.get('auth_token');
            if (!token) {
                setLoading(false);
                return;
            }

            // Optimistic set
            setSession({ token });

            // Validate with API
            const res = await fetch(`${baseUrl}/me`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (res.ok) {
                const data = await res.json();
                setUser(data.user);
                // Ensure session is set if not already
                setSession({ token });
            } else {
                 // Invalid token
                 storage.remove('auth_token');
                 storage.remove('user_info');
                 setUser(null);
                 setSession(null);
            }

        } catch (err: any) {
            console.error('Auth Check Failed', err);
            storage.remove('auth_token');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkSession();
    }, [baseUrl]);

    const signIn = async (providerId: string, credentials: any) => {
        try {
            setError(null);
            
            // Call API directly
            const res = await fetch(`${baseUrl}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials)
            });
            
            const data = await res.json();
            
            if (!res.ok) {
                throw { code: 'AUTH_ERROR', message: data.error || 'Login failed' };
            }

            // Success
            if (data.token) {
                storage.set('auth_token', data.token);
                if (data.user) {
                    storage.setJSON('user_info', data.user);
                }
                setSession({ token: data.token });
                setUser(data.user);
                // window.location.reload(); // Optional: handled by consumer or next page load
            }
            
            // Return full data if needed by caller (but interface says void)
            // returning void for now to match interface
            // return data; 

        } catch (err: any) {
            setError(err);
            throw err;
        }
    };

    const signUp = async (providerId: string, credentials: any) => {
        try {
            setError(null);
            const res = await fetch(`${baseUrl}/signup`, {
                 method: 'POST',
                 headers: { 'Content-Type': 'application/json' },
                 body: JSON.stringify(credentials)
            });
            
            const data = await res.json();

            if (!res.ok) {
                throw { code: 'AUTH_ERROR', message: data.error || 'Signup failed' };
            }
            
            // Auto login logic usually follows, or redirect
            // For now, simple return
            // return data;
            
        } catch (err: any) {
            setError(err);
            throw err;
        }
    };

    const signOut = async () => {
        try {
             storage.remove('auth_token');
             storage.remove('user_info');
             setUser(null);
             setSession(null);
             // Optional: call API to invalidate on server too
             // await fetch(`${baseUrl}/logout`, ...);
        } catch (err: any) {
             setError(err);
        }
    };

    return (
        <AuthContext.Provider value={{ user, session, loading, error, signIn, signUp, signOut }}>
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
