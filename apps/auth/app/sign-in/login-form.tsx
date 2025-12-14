

'use client';

import * as React from 'react';
import { Button } from '@labs/ui/button';
import { Input } from '@labs/ui/input';
import { Label } from '@labs/ui/label';

import { toast } from '@labs/ui/sonner';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';

interface LoginFormProps {
    tenantId: string;
}


export function LoginForm({ tenantId }: LoginFormProps) {
    const [isLoading, setIsLoading] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);

        const formData = new FormData(event.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        try {
            const apiBase = process.env.NEXT_PUBLIC_AUTH_API_URL;
            const res = await fetch(`${apiBase}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    password,
                    tenantId
                })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Invalid credentials');
            }

            toast.success("Login Successful", {
                description: "You have successfully signed in."
            });
            
            console.log('Login Token:', data.token);

        } catch (e: any) {
            toast.error("Login Failed", {
                description: e.message
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form onSubmit={onSubmit} className="grid gap-4">
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
                <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link
                        href={`/forgot-password?tenantId=${tenantId}`}
                        className="text-xs font-medium text-primary underline-offset-4 hover:underline"
                    >
                        Forgot password?
                    </Link>
                </div>
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
                {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>
        </form>
    );
}
