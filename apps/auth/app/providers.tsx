"use client";


import { AuthProvider } from "@labs/auth/client";
import { Toaster } from "@labs/ui/sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (

    <AuthProvider baseUrl="/api/auth">
      {children}
      <Toaster />
    </AuthProvider>
  );
}
