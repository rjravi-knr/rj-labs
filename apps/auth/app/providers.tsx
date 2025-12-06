"use client";

import { AuthProvider } from "@labs/auth/client";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider baseUrl="/api/auth">
      {children}
    </AuthProvider>
  );
}
