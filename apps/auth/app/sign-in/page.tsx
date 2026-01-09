
import { Metadata } from 'next';
import { SocialButtons } from '../../components/social-buttons';
import { TenantSelectionForm } from '../../components/tenant-selection-form';
import { AuthRedirect } from '../../components/auth-redirect';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@labs/ui/card';

import { AuthLayout } from '../../components/auth-layout';
import { LoginForm } from '../../components/login-form';

export const metadata: Metadata = {
  title: 'Sign In - RJ Studio',
  description: 'Sign in to your account',
};


import { api } from '../../lib/api';

// Helper to fetch config from API
async function getAuthConfig(tenantId: string) {
    try {
        console.log(`[SignInPage] Fetching config for tenant: ${tenantId}`);
        
        const config = await api.get<any>(`/config?tenantId=${tenantId}`, {
            cache: 'no-store'
        } as RequestInit);
        
        return config;
    } catch (e: any) {
        console.error('[SignInPage] Failed to fetch auth config:', e.message || e);
        return null; // Return null to trigger fallback UI
    }
}


import { Alert, AlertDescription, AlertTitle } from '@labs/ui/alert';
import { AlertCircle } from 'lucide-react';

interface PageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function SignInPage(props: PageProps) {
  const searchParams = await props.searchParams;
  

  // 1. Resolve Tenant ID
  // Priority: URL Query -> Env Var
  let tenantId = typeof searchParams.tenantId === 'string' ? searchParams.tenantId : undefined;
  
  if (!tenantId) {
      tenantId = process.env.NEXT_PUBLIC_DEFAULT_TENANT_ID;
  }

  console.log('[SignInPage] Resolved Tenant ID:', tenantId);

  // 2. If no tenant resolved, show selection form
  if (!tenantId || tenantId === 'default') {
      console.log('[SignInPage] No tenant ID resolved, showing selection form.');
      return (
          <AuthLayout>
              <TenantSelectionForm />
          </AuthLayout>
      );
  }

  // 3. Fetch Config
  const authConfig = await getAuthConfig(tenantId);
  console.log('[SignInPage] Auth Config Fetch Result:', authConfig ? 'Success' : 'Failed');

  // If invalid tenant ID (config fetch failed), fallback to selection with Alert
  if (!authConfig) {
       return (
          <AuthLayout>
              <TenantSelectionForm />
              <div className="mt-6">
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                        Tenant not found or configuration could not be loaded. Please try again.
                    </AlertDescription>
                </Alert>
              </div>
          </AuthLayout>
      );
  }


  const { enabledProviders = [], name: tenantName, selfRegistrationEnabled, termsUrl, privacyUrl } = authConfig;

  return (
    <AuthLayout>
      <AuthRedirect 
          redirectParam={typeof searchParams.redirect === 'string' ? searchParams.redirect : undefined}
          allowedBase={authConfig.redirectUrl}
      />
      <Card className="border-none shadow-none sm:border sm:shadow-sm w-full max-w-xl">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight">
            Sign In to {tenantName || tenantId}
          </CardTitle>
          <CardDescription>
            Enter your details to sign in to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">

            <SocialButtons enabledProviders={enabledProviders} tenantId={tenantId} />

            {/* Separator if both Social and Email are present (or if we assume Email is always there for now) */}
            {(enabledProviders.length > 0) && (
                <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                    </span>
                </div>
                </div>
            )}


            <LoginForm 
                tenantId={tenantId} 
                config={authConfig} 
                redirectUrl={typeof searchParams.redirect === 'string' ? searchParams.redirect : undefined} 
            />
          </div>
          
          {(termsUrl || privacyUrl) && (
            <div className="mt-4 text-center text-xs text-muted-foreground">
                By clicking continue, you agree to our{' '}
                {termsUrl && (
                <Link
                    href={termsUrl}
                    className="underline underline-offset-4 hover:text-primary"
                    target="_blank"
                >
                    Terms of Service
                </Link>
                )}{' '}
                {termsUrl && privacyUrl && 'and '}{' '}
                {privacyUrl && (
                <Link
                    href={privacyUrl}
                    className="underline underline-offset-4 hover:text-primary"
                    target="_blank"
                >
                    Privacy Policy
                </Link>
                )}
                .
            </div>
          )}
        </CardContent>
      </Card>

      {selfRegistrationEnabled && (
        <div className="mt-6 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Link
            href={`/sign-up?tenantId=${tenantId}`}
            className="font-semibold text-primary underline-offset-4 hover:underline"
            >
            Sign up
            </Link>
        </div>
      )}
    </AuthLayout>
  );
}
