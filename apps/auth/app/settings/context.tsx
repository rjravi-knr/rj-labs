import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAuth } from "@labs/auth/client";
import { AuthProviderType, LoginMethods } from "@labs/auth/types";
import { toast } from "@labs/ui/sonner";
import { useSearchParams, useRouter } from "next/navigation";
import { storage } from "@labs/utils";
import { api } from "../../lib/api";

// Types matching the backend config
export interface AuthConfig {
    name: string;
    selfRegistrationEnabled: boolean;
    termsUrl: string;
    privacyUrl: string;
    redirectUrl: string; // Integration Callback
    mfaEnabled: boolean;
    providers: AuthProviderType[]; // Legacy/Compat
    enabledProviders: AuthProviderType[];
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
    emailPolicy?: { // Added emailPolicy
        allowedDomains: string[];
        blockedDomains: string[];
        allowPublicDomains: boolean;
    };
    loginMethods: LoginMethods;
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
    initialConfig: AuthConfig; // Added for diffing
    isLoading: boolean;
    isSaving: boolean;
    hasUnsavedChanges: boolean;
    updateConfig: (updates: Partial<AuthConfig>) => void;
    updateProviderConfig: (provider: 'google' | 'github' | 'microsoft' | 'linkedin', data: any) => void;
    saveConfig: () => Promise<void>;
    refreshConfig: () => Promise<void>;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children, tenantId: propTenantId }: { children: ReactNode; tenantId?: string | null }) {
    const { user, session, loading: isAuthLoading } = useAuth();
    const searchParams = useSearchParams();
    
    // Resolve Tenant ID: Prop > URL > User Context > LocalStorage
    const tenantId = propTenantId || searchParams.get("tenantId") || user?.tenantId || storage.get('tenantId');

    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

    // Initial State
    const [config, setConfig] = useState<AuthConfig>({
        name: "",
        selfRegistrationEnabled: true,
        termsUrl: "",
        privacyUrl: "",
        redirectUrl: "",
        mfaEnabled: false,
        providers: [],
        enabledProviders: ['email_password'],
        passwordPolicy: { minLength: 8 },
        otpPolicy: { length: 6, expiry: 300, maxAttempts: 3 },
        pinPolicy: { length: 4, expiry: 0, maxAttempts: 5 },
        emailPolicy: { allowedDomains: [], blockedDomains: [], allowPublicDomains: true }, // Default
        providerConfig: {},
        loginMethods: {
            email: { password: true, otp: true, pin: false },
            phone: { password: false, otp: false, pin: false }
        },
        settings: {}
    });

    // Track original config for diffing
    const [initialConfig, setInitialConfig] = useState<AuthConfig>(config);

    const fetchConfig = async () => {
        if (!session?.token || !tenantId) return;
        try {
            const data = await api.get<AuthConfig>(`/config?tenantId=${tenantId}`);
            
            const loadedConfig = {
                name: data.name || "",
                selfRegistrationEnabled: data.selfRegistrationEnabled ?? true,
                termsUrl: data.termsUrl || "",
                privacyUrl: data.privacyUrl || "",
                redirectUrl: data.redirectUrl || "",
                mfaEnabled: data.mfaEnabled || false,
                providers: data.providers || [],
                enabledProviders: data.enabledProviders || ['email_password'],
                passwordPolicy: data.passwordPolicy || { minLength: 8 },
                otpPolicy: data.otpPolicy || { length: 6, expiry: 300, maxAttempts: 3 },
                pinPolicy: data.pinPolicy || { length: 4, expiry: 0, maxAttempts: 5 },
                emailPolicy: data.emailPolicy || { allowedDomains: [], blockedDomains: [], allowPublicDomains: true }, // Map from API
                providerConfig: data.providerConfig || {},
                loginMethods: data.loginMethods || {
                    email: { password: true, otp: true, pin: false },
                    phone: { password: false, otp: false, pin: false }
                },
                settings: data.settings || {}
            };
            
            setConfig(loadedConfig);
            setInitialConfig(loadedConfig); // Sync initial state
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
        console.log("Updating config", updates);
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

            console.log("[Frontend] Saving payload:", JSON.stringify(payload, null, 2));

            await api.patch(`/config?tenantId=${tenantId}`, payload);

            toast.success("Settings updated successfully!");
            setHasUnsavedChanges(false);
            // Refresh to get the updated enabledProviders from server
            await fetchConfig();
        } catch (error: any) {
            toast.error(error.message || "Update failed");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <SettingsContext.Provider value={{
            config,
            initialConfig,
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
