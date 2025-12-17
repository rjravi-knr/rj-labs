'use client';

import * as React from 'react';
import { Button } from '@labs/ui/button';
import { Input } from '@labs/ui/input';
import { Label } from '@labs/ui/label';
import { toast } from '@labs/ui/sonner';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@labs/auth/client';
import { storage } from '@labs/utils';
import { AuthConfig } from '@labs/auth'; 

interface LoginFormProps {
    tenantId: string;
    config: AuthConfig;
}

type IdentifierMode = 'email' | 'phone';
type ChallengeMethod = 'password' | 'otp' | 'pin';

export function LoginForm({ tenantId, config }: LoginFormProps) {
    const router = useRouter();
    const { signIn } = useAuth();
    
    // Core State
    const [mode, setMode] = React.useState<IdentifierMode>('email'); // Default to email
    
    // Input State
    const [identifier, setIdentifier] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [otpCode, setOtpCode] = React.useState('');
    
    // UI State
    const [isLoading, setIsLoading] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);
    
    // Method Selection (Password vs OTP vs PIN)
    // We default to 'password' usually, but if password disabled for phone, default to otp.
    const [method, setMethod] = React.useState<ChallengeMethod>('password');

    // -- Derived Config --
    
    // Check global enablement from config setup
    // Assuming config structure: config.loginMethods.email.password = true/false
    const methods = config.loginMethods || { 
        email: { password: true, otp: false, pin: false }, 
        phone: { password: true, otp: true, pin: false } 
    };

    const isEmailEnabled = true; 
    
    const phoneConfig = methods.phone || { password: false, otp: false, pin: false };
    const isPhoneEnabled = phoneConfig.password || phoneConfig.otp || phoneConfig.pin;


    // Compute enabled methods for CURRENT mode
    const currentMethods = mode === 'email' ? (methods.email || { password: true }) : phoneConfig;

    // Check individual enablements for "Email Mode" (which now includes Username)
    const isEmailLoginEnabled = methods.email?.password || methods.email?.otp || methods.email?.pin;
    const isUsernameLoginEnabled = methods.username?.password || methods.username?.otp || methods.username?.pin;
    
    // Determine Label and Placeholder based on configuration
    const getEmailModeLabel = () => {
        if (isEmailLoginEnabled && isUsernameLoginEnabled) return 'Email address or username';
        if (isUsernameLoginEnabled) return 'Username';
        return 'Email address';
    };

    const getEmailModePlaceholder = () => {
        if (isEmailLoginEnabled && isUsernameLoginEnabled) return 'name@example.com or username';
        if (isUsernameLoginEnabled) return 'username';
        return 'name@example.com';
    };

    const isInputEmailType = isEmailLoginEnabled && !isUsernameLoginEnabled; // Only enforce email type if ONLY email is enabled

    // Effect to reset method when mode changes
    React.useEffect(() => {
        // Smart Defaulting
        if (mode === 'email') {
             // For email/username mode, check preferences in order
             const targetConfig = isUsernameLoginEnabled ? (methods.username || {}) : (methods.email || {});
             // If both are enabled, we might need a merged view or arguably just default to password which is common for both.
             // But 'currentMethods' variable above logic might need tweak if we want strict per-type method availability (e.g. username only allows password)
             // For simplicity in this merged View, we assume if you are in "Email/Username" tab, we show Union of methods or default to Password which is safe.
             
             if (currentMethods.password || methods.username?.password) setMethod('password');
             else if (currentMethods.otp || methods.username?.otp) setMethod('otp');
        } else {
             // Phone often defaults to OTP
             if (currentMethods.otp) setMethod('otp');
             else if (currentMethods.password) setMethod('password');
        }
        
        // Clear inputs on switch
        setIdentifier('');
        setPassword('');
        setOtpCode('');
    }, [mode]);

    // -- Handlers --

    const requestOtp = async () => {
        if (!identifier) {
            toast.error("Please enter your " + (mode === 'email' ? 'email' : 'phone number'));
            return;
        }
        
        setIsLoading(true);
        try {
            await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    tenantId, 
                    identifier, 
                    action: 'request_otp',
                    strategy: mode === 'email' ? 'email' : 'sms'
                })
            });
            toast.message("OTP Sent", { description: `We sent a code to your ${mode}.` });
        } catch (e) {
            toast.error("Failed to send OTP");
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            let payload: any = {
                tenantId,
                identifier,
                strategy: mode === 'email' ? 'email' : 'sms'
            };

            if (method === 'password') {
                payload.action = 'verify_password';
                payload.password = password;
            } else if (method === 'otp') {
                payload.action = 'verify_otp';
                payload.code = otpCode;
            } else if (method === 'pin') {
                 payload.action = 'verify_password'; // Reuse generic verify? Or specifically pin?
                 payload.password = password; // Reuse password field
            }

            const res = await fetch('/api/auth/login', {
                 method: 'POST',
                 body: JSON.stringify(payload)
            });
            
            const data = await res.json();
            
            if (!res.ok) throw new Error(data.error || "Login Failed");
            
            toast.success("Login Successful");
            storage.set('tenantId', tenantId);
            if (data.token) {
                storage.set('auth_token', data.token);
            }
            if (data.user) {
                storage.set('user_info', JSON.stringify(data.user));
            }

            if (data?.user?.isSuperAdmin) {
                // User asked to remove URL params as storage is set above
                window.location.href = `/settings`;
            } else {
                 window.location.href = `/`;
            }

        } catch (e: any) {
             toast.error("Login Failed", { description: e.message });
        } finally {
            setIsLoading(false);
        }
    };

    // -- Render Helpers --

    const renderToggle = () => {
        if (!isPhoneEnabled) return null; // If phone not enabled, no toggle needed (assuming email default)
        
        if (mode === 'email') {
            return (
                <button 
                    type="button" 
                    onClick={() => setMode('phone')}
                    className="text-sm font-medium text-primary hover:underline float-right"
                >
                    Use phone
                </button>
            );
        } else {
            return (
                <button 
                    type="button" 
                    onClick={() => setMode('email')}
                    className="text-sm font-medium text-primary hover:underline float-right"
                >
                    Use email
                </button>
            );
        }
    };

    const renderMethodSwitcher = () => {
         // Show links to switch between Password / OTP / PIN if multiple enabled
         const options: React.ReactNode[] = [];
         
         if (currentMethods.password && method !== 'password') {
             options.push(
                <button key="pass" type="button" onClick={() => setMethod('password')} className="text-xs text-muted-foreground hover:text-primary underline underline-offset-4">
                    Login with Password
                </button>
             );
         }
         if (currentMethods.otp && method !== 'otp') {
             options.push(
                <button key="otp" type="button" onClick={() => setMethod('otp')} className="text-xs text-muted-foreground hover:text-primary underline underline-offset-4">
                    Login via OTP
                </button>
             );
         }
         if (currentMethods.pin && method !== 'pin') {
             options.push(
                <button key="pin" type="button" onClick={() => setMethod('pin')} className="text-xs text-muted-foreground hover:text-primary underline underline-offset-4">
                    Login with PIN
                </button>
             );
         }
         
         if (options.length === 0) return null;
         
         return (
             <div className="flex gap-4 pt-2 justify-end">
                 {options}
             </div>
         );
    };


    return (
        <form onSubmit={handleLogin} className="space-y-4">
            
            {/* Identifier Section */}
            <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <Label htmlFor="identifier">
                        {mode === 'email' ? getEmailModeLabel() : 'Phone number'}
                    </Label>
                    {renderToggle()}
                </div>
                <Input
                    id="identifier"
                    type={mode === 'email' ? (isInputEmailType ? 'email' : 'text') : 'tel'}
                    placeholder={mode === 'email' ? getEmailModePlaceholder() : '+1 555 000 0000'}
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    disabled={isLoading}
                    required
                />
            </div>

            {/* Challenge Section */}
            <div className="space-y-2">
                 {/* Label + Forgot Link */}
                 <div className="flex justify-between items-center">
                    <Label htmlFor="challenge">
                        {method === 'password' ? 'Password' : (method === 'otp' ? 'Verification Code' : 'PIN')}
                    </Label>
                    
                    {method === 'password' && (
                        <Link href="#" className="text-xs text-muted-foreground hover:text-primary">
                            Forgot Password?
                        </Link>
                    )}
                 </div>

                 {/* Inputs */}
                 <div className="relative">
                    {method === 'password' && (
                        <>
                            <Input 
                                id="challenge"
                                type={showPassword ? "text" : "password"} 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="pr-10"
                                required
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                        </>
                    )}

                    {method === 'otp' && (
                         <div className="flex gap-2">
                            <Input 
                                id="challenge"
                                placeholder="123456" 
                                value={otpCode}
                                onChange={(e) => setOtpCode(e.target.value)}
                                maxLength={6}
                                className="tracking-widest"
                            />
                             <Button type="button" variant="outline" onClick={requestOtp} disabled={isLoading || !identifier} className="shrink-0">
                                Get Code
                             </Button>
                         </div>
                    )}

                    {method === 'pin' && (
                        <Input 
                            id="challenge"
                            type="password" 
                            inputMode="numeric"
                            pattern="[0-9]*"
                            value={password} // Reusing field
                            onChange={(e) => setPassword(e.target.value)}
                            maxLength={6}
                        />
                    )}
                 </div>
                 
                 {/* Internal Switcher (Pass vs OTP) */}
                 {renderMethodSwitcher()}

            </div>

            <Button disabled={isLoading} type="submit" className="w-full">
                {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>
        </form>
    );
}
