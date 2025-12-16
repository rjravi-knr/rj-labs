import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAuth } from "@labs/auth/client";
import { toast } from "@labs/ui/sonner";
import { useSearchParams, useRouter } from "next/navigation";
import { storage } from "@labs/utils";

// Types matching the backend config
export interface AuthConfig {
    name: string;
    selfRegistrationEnabled: boolean;
    termsUrl: string;
    privacyUrl: string;
    mfaEnabled: boolean;
    enabledProviders: string[];
    passwordPolicy: {
        minLength: number;
        maxLength?: number;
        requireUppercase?: boolean;
        requireLowercase?: boolean;
        requireNumbers?: boolean;
        requireSpecial?: boolean;
        preventUserData?: boolean;
    };
    // New Policy Logic
    otpPolicy: { length: number; expiry: number; maxAttempts: number };
    pinPolicy: { length: number; expiry: number; maxAttempts: number };
    loginMethods: {
        email: { password: boolean; otp: boolean; pin: boolean };
        phone: { password: boolean; otp: boolean; pin: boolean };
    };
    providerConfig: {
        google?: { clientId?: string; clientSecret?: string; redirectUri?: string; };
        github?: { clientId?: string; clientSecret?: string; redirectUri?: string; };
        microsoft?: { clientId?: string; clientSecret?: string; redirectUri?: string; tenantId?: string; };
        linkedin?: { clientId?: string; clientSecret?: string; redirectUri?: string; };
    };
    settings?: Record<string, any>;
}

interface SettingsContextType {
    config: AuthConfig;
    isLoading: boolean;
    isSaving: boolean;
    hasUnsavedChanges: boolean;
    updateConfig: (updates: Partial<AuthConfig>) => void;
    updateProviderConfig: (provider: 'google' | 'github' | 'microsoft' | 'linkedin', data: any) => void;
    saveConfig: () => Promise<void>;
    refreshConfig: () => Promise<void>;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
    const { user, session, loading: isAuthLoading } = useAuth();
    const searchParams = useSearchParams();
    
    // Resolve Tenant ID: URL > User Context > LocalStorage
    const tenantId = searchParams.get("tenantId") || user?.tenantId || storage.get('tenantId');

    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

    // Initial State
    const [config, setConfig] = useState<AuthConfig>({
        name: "",
        selfRegistrationEnabled: true,
        termsUrl: "",
        privacyUrl: "",
        mfaEnabled: false,
        enabledProviders: ['email_password'],
        passwordPolicy: { minLength: 8 },
        otpPolicy: { length: 6, expiry: 300, maxAttempts: 3 },
        pinPolicy: { length: 4, expiry: 0, maxAttempts: 5 },
        providerConfig: {},
        loginMethods: {
            email: { password: true, otp: true, pin: false },
            phone: { password: false, otp: false, pin: false }
        },
        settings: {}
    });

    const fetchConfig = async () => {
        if (!session?.token || !tenantId) return;
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_AUTH_API_URL}/config?tenantId=${tenantId}`);
            if (!res.ok) throw new Error("Failed to load config");
            const data = await res.json();
            
            setConfig({
                name: data.name || "",
                selfRegistrationEnabled: data.selfRegistrationEnabled ?? true,
                termsUrl: data.termsUrl || "",
                privacyUrl: data.privacyUrl || "",
                mfaEnabled: data.mfaEnabled || false,
                enabledProviders: data.enabledProviders || ['email_password'],
                passwordPolicy: data.passwordPolicy || { minLength: 8 },
                otpPolicy: data.otpPolicy || { length: 6, expiry: 300, maxAttempts: 3 },
                pinPolicy: data.pinPolicy || { length: 4, expiry: 0, maxAttempts: 5 },
                providerConfig: data.providerConfig || {},
                loginMethods: data.loginMethods || {
                    email: { password: true, otp: true, pin: false },
                    phone: { password: false, otp: false, pin: false }
                },
                settings: data.settings || {}
            });
            setHasUnsavedChanges(false);
        } catch (error) {
            console.error(error);
            toast.error("Could not load settings.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!isAuthLoading && session) {
            fetchConfig();
        }
    }, [isAuthLoading, session, tenantId]);

    const updateConfig = (updates: Partial<AuthConfig>) => {
        setConfig(prev => ({ ...prev, ...updates }));
        setHasUnsavedChanges(true);
    };

    const updateProviderConfig = (provider: 'google' | 'github' | 'microsoft' | 'linkedin', data: any) => {
        setConfig(prev => ({
            ...prev,
            providerConfig: {
                ...prev.providerConfig,
                [provider]: {
                    ...(prev.providerConfig[provider] || {}),
                    ...data
                }
            }
        }));
        setHasUnsavedChanges(true);
    };

    const saveConfig = async () => {
        setIsSaving(true);
        try {
            // Compute enabledProviders based on which providers have clientId configured
            const enabledProviders = ['email_password']; // Always include email_password
            
            // Add social providers that have clientId set
            Object.entries(config.providerConfig).forEach(([provider, settings]) => {
                if (settings && settings.clientId) {
                    enabledProviders.push(provider);
                }
            });

            const payload = {
                ...config,
                enabledProviders
            };

            const res = await fetch(`${process.env.NEXT_PUBLIC_AUTH_API_URL}/config?tenantId=${tenantId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${session?.token}`
                },
                body: JSON.stringify(payload)
            });

            if (!res.ok) {
                 const err = await res.json();
                 throw new Error(err.error || "Update failed");
            }

            toast.success("Settings updated successfully!");
            setHasUnsavedChanges(false);
            // Refresh to get the updated enabledProviders from server
            await fetchConfig();
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <SettingsContext.Provider value={{
            config,
            isLoading,
            isSaving,
            hasUnsavedChanges,
            updateConfig,
            updateProviderConfig,
            saveConfig,
            refreshConfig: fetchConfig
        }}>
            {children}
        </SettingsContext.Provider>
    );
}

export function useSettings() {
    const context = useContext(SettingsContext);
    if (context === undefined) {
        throw new Error("useSettings must be used within a SettingsProvider");
    }
    return context;
}
