
import { Metadata } from 'next';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@labs/ui/card';
import { AuthLayout } from '../../components/auth-layout';
import { ResetPasswordForm } from './form';
import { Alert, AlertDescription, AlertTitle } from '@labs/ui/alert';
import { AlertCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Reset Password - RJ Studio',
  description: 'Create a new password',
};

interface PageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ResetPasswordPage(props: PageProps) {
  const searchParams = await props.searchParams;
  let tenantId = typeof searchParams.tenantId === 'string' ? searchParams.tenantId : undefined;
  
  if (!tenantId) {
      tenantId = process.env.NEXT_PUBLIC_DEFAULT_TENANT_ID;
  }

  const token = typeof searchParams.token === 'string' ? searchParams.token : undefined;

  if (!token) {
       return (
        <AuthLayout>
             <Card className="border-none shadow-none sm:border sm:shadow-sm">
                <CardHeader className="space-y-1 text-center">
                    <CardTitle className="text-2xl font-bold tracking-tight">Invalid Request</CardTitle>
                </CardHeader>
                <CardContent>
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Missing Token</AlertTitle>
                        <AlertDescription>
                            This password reset link is invalid. Please request a new one.
                        </AlertDescription>
                    </Alert>
                    <div className="mt-4 text-center">
                        <Link href={`/forgot-password?tenantId=${tenantId || ''}`} className="text-sm font-medium hover:underline">
                            Request new link
                        </Link>
                    </div>
                </CardContent>
             </Card>
        </AuthLayout>
       )
  }

  return (
    <AuthLayout>
      <Card className="border-none shadow-none sm:border sm:shadow-sm">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight">
            Reset Password
          </CardTitle>
          <CardDescription>
            Enter your new password below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResetPasswordForm token={token} tenantId={tenantId} />
           
           <div className="mt-4 text-center text-sm text-muted-foreground">
            <Link
              href={`/sign-in?tenantId=${tenantId || ''}`}
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              Back to Sign In
            </Link>
          </div>
        </CardContent>
      </Card>
    </AuthLayout>
  );
}
