
import { AuthConfig } from "@labs/auth/types";

export interface ConfigRule {
    icon: string; // Emoji or Lucide name
    text: string;
    status: 'good' | 'warning' | 'info' | 'critical';
}

export interface ConfigSection {
    title: string;
    rules: ConfigRule[];
}

export function generateConfigSummary(config: AuthConfig): ConfigSection[] {
    const sections: ConfigSection[] = [];

    // 1. Providers
    const providerRules: ConfigRule[] = [];
    if (config.enabledProviders && config.enabledProviders.length > 0) {
        const names = config.enabledProviders.map(p => p.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '));
        providerRules.push({
            icon: "✅",
            text: `Users can log in using: ${names.join(', ')}.`,
            status: 'good'
        });
    } else {
        providerRules.push({
            icon: "⚠️",
            text: "No login providers are enabled. Users cannot log in.",
            status: 'critical'
        });
    }
    
    if (config.selfRegistrationEnabled) {
        providerRules.push({ icon: "user-plus", text: "Self-registration is enabled. Anyone can sign up.", status: 'info' });
    } else {
        providerRules.push({ icon: "lock", text: "Self-registration is disabled. Invite only.", status: 'warning' });
    }
    
    sections.push({ title: "Login & Registration", rules: providerRules });

    // 2. Email Policy
    const emailRules: ConfigRule[] = [];
    if (config.emailPolicy) {
        const { allowedDomains, blockedDomains, allowPublicDomains } = config.emailPolicy;
        
        if (allowedDomains && allowedDomains.length > 0) {
             emailRules.push({ icon: "shield-check", text: `Only emails from these domains are allowed: ${allowedDomains.join(', ')}.`, status: 'good' });
        }
        
        if (blockedDomains && blockedDomains.length > 0) {
             emailRules.push({ icon: "ban", text: `Emails from these domains are explicitly blocked: ${blockedDomains.join(', ')}.`, status: 'warning' });
        }
        
        if (allowPublicDomains === false) {
             emailRules.push({ icon: "building", text: "Public email domains (e.g. Gmail, Yahoo) are blocked. Business email required.", status: 'good' });
        } else {
             emailRules.push({ icon: "globe", text: "Public email domains are allowed.", status: 'info' });
        }
    } else {
        emailRules.push({ icon: "globe", text: "No specific email domain restrictions are active.", status: 'info' });
    }
    sections.push({ title: "Email Security", rules: emailRules });

    // 3. Password Policy
    const passwordRules: ConfigRule[] = [];
    if (config.passwordPolicy) {
        const pp = config.passwordPolicy;
        passwordRules.push({ icon: "key", text: `Minimum password length is ${pp.minLength || 8} characters.`, status: 'info' });
        
        const complexity = [];
        if (pp.requireUppercase) complexity.push("Uppercase");
        if (pp.requireLowercase) complexity.push("Lowercase");
        if (pp.requireNumbers) complexity.push("Numbers");
        if (pp.requireSpecial) complexity.push("Special Characters");
        
        if (complexity.length > 0) {
            passwordRules.push({ icon: "complex", text: `Passwords must contain: ${complexity.join(', ')}.`, status: 'good' });
        } else {
             passwordRules.push({ icon: "unlock", text: "No basic complexity requirements (uppercase, numbers, etc.) enforced.", status: 'warning' });
        }
    }
    sections.push({ title: "Password Policy", rules: passwordRules });
    
    // 4. MFA & OTP
    const mfaRules: ConfigRule[] = [];
    if (config.mfaEnabled) {
        mfaRules.push({ icon: "shield-alert", text: "Multi-Factor Authentication (MFA) is enabled.", status: 'good' });
    } else {
         mfaRules.push({ icon: "shield-off", text: "MFA is currently disabled.", status: 'warning' });
    }
    
    if (config.otpPolicy) {
        mfaRules.push({ icon: "clock", text: `OTP codes contain ${config.otpPolicy.length} digits and expire in ${config.otpPolicy.expiry} seconds.`, status: 'info' });
    }
    sections.push({ title: "MFA & Security Codes", rules: mfaRules });

    return sections;
}
