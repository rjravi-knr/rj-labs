
import { Metadata } from 'next';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@labs/ui/card';
import { AuthLayout } from '../components/auth-layout';
import { TenantSelectionForm } from '../components/tenant-selection-form';
import { SocialButtons } from '../components/social-buttons';
import { AuthRedirect } from '../components/auth-redirect';
import { SignUpForm } from './signup-form';
import { Alert, AlertDescription, AlertTitle } from '@labs/ui/alert';
import { AlertCircle } from 'lucide-react';


export const metadata: Metadata = {
  title: 'Sign Up - RJ SaaS',
  description: 'Create an account',
};

async function getAuthConfig(tenantId: string) {
    const apiBase = process.env.NEXT_PUBLIC_AUTH_API_URL;
    if (!apiBase) return null;

    try {
        const res = await fetch(`${apiBase}/config?tenantId=${tenantId}`, { cache: 'no-store' });
        if (!res.ok) return null;
        return res.json();
    } catch (e) {
        return null;
    }
}

interface PageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function SignUpPage(props: PageProps) {
  const searchParams = await props.searchParams;
  
  // 1. Resolve Tenant ID
  let tenantId = typeof searchParams.tenantId === 'string' ? searchParams.tenantId : undefined;
  if (!tenantId) {
      tenantId = process.env.NEXT_PUBLIC_DEFAULT_TENANT_ID;
  }

  // 2. Fallback if no tenant
  if (!tenantId || tenantId === 'default') {
      return (
          <AuthLayout>
              <TenantSelectionForm />
          </AuthLayout>
      );
  }

  // 3. Fetch Config
  const authConfig = await getAuthConfig(tenantId);
  const { enabledProviders = [], name: tenantName, selfRegistrationEnabled, termsUrl, privacyUrl } = authConfig || {};

  if (authConfig && !selfRegistrationEnabled) {
       return (
          <AuthLayout>
              <Card>
                <CardHeader>
                    <CardTitle>Registration Disabled</CardTitle>
                    <CardDescription>
                        New user registration is currently disabled for {tenantName || tenantId}.
                    </CardDescription>
                    <div className="mt-4">
                        <Link href={`/sign-in?tenantId=${tenantId}`} className="text-primary hover:underline">
                            Back to Sign In
                        </Link>
                    </div>
                </CardHeader>
              </Card>
          </AuthLayout>
       );
  }

  return (
    <AuthLayout>
      <AuthRedirect />
      <Card className="border-none shadow-none sm:border sm:shadow-sm w-full max-w-xl">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight">
            Create an account
          </CardTitle>
          <CardDescription>
            Enter your details to create your account for {tenantName}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            
            <SocialButtons enabledProviders={enabledProviders} tenantId={tenantId} />

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

            <SignUpForm tenantId={tenantId} />

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

      <div className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <Link
          href={`/sign-in?tenantId=${tenantId}`}
          className="font-semibold text-primary underline-offset-4 hover:underline"
        >
          Sign in
        </Link>
      </div>
    </AuthLayout>
  );
}
