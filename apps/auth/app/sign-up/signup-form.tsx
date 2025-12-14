
'use client';

import * as React from 'react';
import { Button } from '@labs/ui/button';
import { Input } from '@labs/ui/input';
import { Label } from '@labs/ui/label';
import { toast } from '@labs/ui/sonner';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface SignUpFormProps {
    tenantId: string;
}

export function SignUpForm({ tenantId }: SignUpFormProps) {
    const [isLoading, setIsLoading] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);
    const router = useRouter();

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
                    placeholder="Ravi Kiran J"
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
                <div className="relative">
                    <Input 
                        id="password" 
                        name="password" 
                        type={showPassword ? "text" : "password"}
                        disabled={isLoading} 
                        required 
                        className="pr-10"
                    />
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                        <span className="sr-only">
                            {showPassword ? "Hide password" : "Show password"}
                        </span>
                    </Button>
                </div>
            </div>
            <Button disabled={isLoading} type="submit" className="w-full">
                {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
        </form>
    );
}
