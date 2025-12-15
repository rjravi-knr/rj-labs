
'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@labs/ui/button';
import { Input } from '@labs/ui/input';
import { PasswordInput } from '../../components/password-input';
import { Label } from '@labs/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@labs/ui/alert';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

interface ResetPasswordFormProps {
    token: string;
    tenantId: string | undefined;
}

export function ResetPasswordForm({ token, tenantId }: ResetPasswordFormProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const [success, setSuccess] = React.useState<boolean>(false);

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);
        setError(null);

        const formData = new FormData(event.currentTarget);
        const password = formData.get('password') as string;
        const confirmPassword = formData.get('confirmPassword') as string;

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            setIsLoading(false);
            return;
        }

        if (password.length < 8) {
            setError("Password must be at least 8 characters long");
            setIsLoading(false);
            return;
        }

        try {
            const apiBase = process.env.NEXT_PUBLIC_AUTH_API_URL || 'http://localhost:3002/api/auth';
            const res = await fetch(`${apiBase}/reset-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    token,
                    password,
                    tenantId
                })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Something went wrong');
            }

            setSuccess(true);
            
            // Redirect after short delay
            setTimeout(() => {
                router.push(`/sign-in?tenantId=${tenantId || ''}`);
            }, 3000);

        } catch (e: any) {
            setError(e.message);
        } finally {
            setIsLoading(false);
        }
    }

    if (success) {
         return (
             <Alert className="border-green-500/50 text-green-600 dark:border-green-500/30 dark:text-green-500">
                <CheckCircle2 className="h-4 w-4" />
                <AlertTitle>Password Reset</AlertTitle>
                <AlertDescription>
                    Your password has been reset successfully. Redirecting to sign in...
                </AlertDescription>
             </Alert>
         )
    }

    return (
        <form onSubmit={onSubmit} className="grid gap-4">
            {error && (
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}
            <div className="grid gap-2">
                <Label htmlFor="password">New Password</Label>
                <PasswordInput
                    id="password"
                    name="password"
                    disabled={isLoading}
                    required
                    showStrengthMeter
                    // Reset form doesn't explicitly fetch policy yet, but strength meter has default. 
                    // Ideally pass policy prop if available.
                />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <PasswordInput
                    id="confirmPassword"
                    name="confirmPassword"
                    disabled={isLoading}
                    required
                    showStrengthMeter={false} // No meter needed for confirm
                />
            </div>
            <Button disabled={isLoading} type="submit" className="w-full">
                {isLoading ? 'Resetting...' : 'Reset Password'}
            </Button>
        </form>
    );
}
