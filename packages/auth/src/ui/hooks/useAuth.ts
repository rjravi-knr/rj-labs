import { useState, useEffect } from 'react';
import { User, AuthError } from '../../types';
import { onAuthStateChanged, signIn, signOut, signUp } from '../../api';

export function useAuth() {
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

  const login = async (providerId: string, credentials: any) => {
      try {
          setError(null);
          await signIn(providerId, credentials);
      } catch (err: any) {
          setError(err);
          throw err;
      }
  };
  
  const register = async (providerId: string, credentials: any) => {
      try {
          setError(null);
          await signUp(providerId, credentials);
      } catch (err: any) {
          setError(err);
          throw err;
      }
  };

  const logout = async () => {
    try {
        await signOut();
    } catch (err: any) {
        setError(err);
    }
  };

  return {
    user,
    loading,
    error,
    signIn: login,
    signUp: register,
    signOut: logout,
  };
}
