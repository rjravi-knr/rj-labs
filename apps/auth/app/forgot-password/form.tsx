
'use client';

import * as React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@labs/ui/button';
import { Input } from '@labs/ui/input';
import { Label } from '@labs/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@labs/ui/alert';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { api } from '../../lib/api';

interface ForgotPasswordFormProps {
    tenantId: string | undefined;
}

export function ForgotPasswordForm({ tenantId }: ForgotPasswordFormProps) {
    // Priority: Prop -> Query Param -> Default
    const searchParams = useSearchParams();
    const effectiveTenantId = tenantId || searchParams.get('tenantId') || 'rj_local';

    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const [success, setSuccess] = React.useState<boolean>(false);

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);
        setError(null);
        setSuccess(false);

        const formData = new FormData(event.currentTarget);
        const email = formData.get('email') as string;

        try {
            await api.post('/forgot-password', {
                email,
                tenantId: effectiveTenantId
            });

            setSuccess(true);
        } catch (e: any) {
            setError(e.message || "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    }

    if (success) {
         return (
             <Alert className="border-green-500/50 text-green-600 dark:border-green-500/30 dark:text-green-500">
                <CheckCircle2 className="h-4 w-4" />
                <AlertTitle>Check your email</AlertTitle>
                <AlertDescription>
                    We have sent a password reset link to your email address.
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
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    name="email"
                    placeholder="name@example.com"
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    disabled={isLoading}
                    required
                />
            </div>
            <Button disabled={isLoading} type="submit" className="w-full">
                {isLoading ? 'Sending...' : 'Send Reset Link'}
            </Button>
        </form>
    );
}
