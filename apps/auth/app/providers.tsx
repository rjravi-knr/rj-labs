"use client";




import { AuthProvider } from "@labs/auth/client";
import { Toaster } from "@labs/ui/sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (

    <AuthProvider baseUrl={`${process.env.NEXT_PUBLIC_AUTH_API_URL || ""}/api/auth`}>
      {children as any}
      <Toaster />
    </AuthProvider>
  );
}
