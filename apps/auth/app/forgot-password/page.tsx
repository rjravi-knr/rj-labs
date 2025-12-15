
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
import { ForgotPasswordForm } from './form';

export const metadata: Metadata = {
  title: 'Forgot Password - RJ Studio',
  description: 'Reset your password',
};

interface PageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ForgotPasswordPage(props: PageProps) {
  const searchParams = await props.searchParams;
  let tenantId = typeof searchParams.tenantId === 'string' ? searchParams.tenantId : undefined;
  
  if (!tenantId) {
      tenantId = process.env.NEXT_PUBLIC_DEFAULT_TENANT_ID;
  }

  return (
    <AuthLayout>
      <Card className="border-none shadow-none sm:border sm:shadow-sm">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight">
            Forgot Password
          </CardTitle>
          <CardDescription>
            Enter your email to receive a password reset link
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ForgotPasswordForm tenantId={tenantId} />
          
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
