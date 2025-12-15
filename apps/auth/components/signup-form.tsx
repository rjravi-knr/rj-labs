
'use client';

import * as React from 'react';
import { Button } from '@labs/ui/button';
import { Input } from '@labs/ui/input';
import { PasswordInput } from './password-input';
import { Label } from '@labs/ui/label';
import { toast } from '@labs/ui/sonner';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { storage } from '@labs/utils';

interface SignUpFormProps {
    tenantId: string;
}

import { PasswordStrengthMeter } from './password-strength-meter';
import { PasswordPolicy } from '@labs/auth/password-policy';


export function SignUpForm({ tenantId }: SignUpFormProps) {
    const [isLoading, setIsLoading] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);
    const [policy, setPolicy] = React.useState<PasswordPolicy | undefined>(undefined);
    const [password, setPassword] = React.useState("");
    const router = useRouter();

    React.useEffect(() => {
        const fetchConfig = async () => {
            try {
                const apiBase = process.env.NEXT_PUBLIC_AUTH_API_URL;
                if (!apiBase) return;
                const res = await fetch(`${apiBase}/config?tenantId=${tenantId}`);
                if (res.ok) {
                    const data = await res.json();
                    if (data.passwordPolicy) {
                        setPolicy(data.passwordPolicy);
                    }
                }
            } catch (e) {
                console.error("Failed to fetch auth config", e);
            }
        };
        fetchConfig();
    }, [tenantId]);

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);

        const formData = new FormData(event.currentTarget);
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        try {
            const apiBase = process.env.NEXT_PUBLIC_AUTH_API_URL;
            // Ensure apiBase is defined
            if (!apiBase) throw new Error("Auth API URL not configured.");

            const res = await fetch(`${apiBase}/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                    tenantId
                })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Registration failed');
            }

            toast.success("Account Created!", {
                description: "You have successfully registered. Please sign in."
            });

            // Persist tenantId
            storage.set('tenantId', tenantId);

            // Redirect to Sign In after short delay or immediately
            // For better UX, we could auto-login, but let's stick to simple flow first.
            router.push(`/sign-in?tenantId=${tenantId}`);

        } catch (e: any) {
            toast.error("Registration Failed", {
                description: e.message
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form onSubmit={onSubmit} className="grid gap-4">
             <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                    id="name"
                    name="name"
                    placeholder="My Full Name"
                    type="text"
                    autoCapitalize="words"
                    autoCorrect="off"
                    disabled={isLoading}
                />
            </div>
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
            <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <PasswordInput
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    required
                    policy={policy}
                    showStrengthMeter
                />
            </div>
            <Button disabled={isLoading} type="submit" className="w-full">
                {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>

        </form>
    );
}
