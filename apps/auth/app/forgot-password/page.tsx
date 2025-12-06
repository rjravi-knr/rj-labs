import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@labs/ui/button';
import { Input } from '@labs/ui/input';
import { Label } from '@labs/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@labs/ui/card';
import { AuthLayout } from '../components/auth-layout';

export const metadata: Metadata = {
  title: 'Forgot Password - RJ SaaS',
  description: 'Reset your password',
};

export default function ForgotPasswordPage() {
  return (
    <AuthLayout>
      <Card className="border-none shadow-none sm:border sm:shadow-sm">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight">
            Forgot password?
          </CardTitle>
          <CardDescription>
            Enter your email address and we'll send you a link to reset your
            password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="name@example.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
              />
            </div>
            <Button className="w-full">
              Send Reset Link
            </Button>
          </div>
          <div className="mt-4 text-center text-sm text-muted-foreground">
            Remember your password?{' '}
            <Link
              href="/sign-in"
              className="font-semibold text-primary underline-offset-4 hover:underline"
            >
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </AuthLayout>
  );
}
