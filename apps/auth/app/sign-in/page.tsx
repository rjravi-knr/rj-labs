import { Metadata } from 'next';
import Link from 'next/link';
import { Command } from 'lucide-react';
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

export const metadata: Metadata = {
  title: 'Sign In - RJ SaaS',
  description: 'Sign in to your account',
};

export default function SignInPage() {
  return (
    <div className="flex min-h-screen w-full flex-col lg:flex-row">
      {/* Brand Section - 60% */}
      <div className="relative hidden w-full flex-col bg-zinc-900 p-10 text-white dark:border-r lg:flex lg:w-[60%]">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Command className="mr-2 h-6 w-6" />
          RJ Studios
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;This library has saved me countless hours of work and
              helped me deliver stunning designs to my clients faster than
              ever before.&rdquo;
            </p>
            <footer className="text-sm">Sofia Davis</footer>
          </blockquote>
        </div>
      </div>

      {/* Login Section - 40% */}
      <div className="flex w-full items-center justify-center lg:w-[40%] bg-zinc-50 dark:bg-zinc-950">
        <div className="mx-auto w-full max-w-sm p-4">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">Sign in</CardTitle>
              <CardDescription>
                Enter your email below to login to your account
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
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      href="/forgot-password"
                      className="text-sm font-medium text-muted-foreground underline-offset-4 hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <Input id="password" type="password" />
                </div>
                <Button type="submit" className="w-full">
                  Sign In
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{' '}
                <Link href="/sign-up" className="underline">
                  Sign up
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
