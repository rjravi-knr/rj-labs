"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import type { Session, User } from "../types";

interface AuthContextType {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  signIn: (data: any) => Promise<void>; // Type this better later
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({
  children,
  baseUrl = "/api/auth", // URL to the Auth Service
}: {
  children: React.ReactNode;
  baseUrl?: string;
}) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchSession() {
      try {
        const res = await fetch(`${baseUrl}/session`);
        if (res.ok) {
          const data = await res.json();
          setSession(data.session);
          setUser(data.user);
        }
      } catch (err) {
        console.error("Failed to fetch session", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchSession();
  }, [baseUrl]);

  const signIn = async (data: any) => {
    // Implementation for sign in (call API)
    // This is a minimal stub
    console.log("Sign in with", data);
  };

  const signOut = async () => {
    // Implementation for sign out
    setSession(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ session, user, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useSession() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useSession must be used within an AuthProvider");
  }
  return context;
}

export function useUser() {
  const { user } = useSession();
  return user;
}
