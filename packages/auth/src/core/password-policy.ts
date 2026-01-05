import { User } from '../types';

export interface PasswordPolicy {
  minLength: number;
  maxLength?: number;
  requireUppercase?: boolean;
  requireLowercase?: boolean;
  requireNumbers?: boolean;
  requireSpecial?: boolean;
  
  // Advanced
  preventUserData?: boolean; // Checks against email, name
  forbiddenPatterns?: string[]; // Regex strings
}

export interface PasswordValidationResult {
  isValid: boolean;
  errors: string[];
}

export const DEFAULT_PASSWORD_POLICY: PasswordPolicy = {
  minLength: 5,
  maxLength: 10,
  requireUppercase: false,
  requireLowercase: false,
  requireNumbers: false,
  requireSpecial: false,
  preventUserData: false,
  forbiddenPatterns: []
};

/**
 * Validates a password against the given policy and optional user context.
 */
export function validatePassword(
  password: string, 
  policy: PasswordPolicy = DEFAULT_PASSWORD_POLICY,
  userContext?: { email?: string; name?: string; username?: string }
): PasswordValidationResult {
  const errors: string[] = [];

  // 1. Length Checks
  if (password.length < policy.minLength) {
    errors.push(`Password must be at least ${policy.minLength} characters long.`);
  }
  if (policy.maxLength && password.length > policy.maxLength) {
    errors.push(`Password must be no more than ${policy.maxLength} characters long.`);
  }

  // 2. Character Classes
  if (policy.requireUppercase && !/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter.');
  }
  if (policy.requireLowercase && !/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter.');
  }
  if (policy.requireNumbers && !/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number.');
  }
  if (policy.requireSpecial && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character.');
  }

  // 3. Forbidden Patterns (Regex)
  if (policy.forbiddenPatterns && policy.forbiddenPatterns.length > 0) {
    for (const pattern of policy.forbiddenPatterns) {
      try {
        const regex = new RegExp(pattern, 'i');
        if (regex.test(password)) {
             // We try to give a generic error to avoid leaking regex logic too overtly, 
             // but specific enough to be helpful if possible. 
             // Ideally the policy config should have a "description" for the pattern.
             // For now, generic:
            errors.push('Password contains a forbidden pattern (e.g. sequences or common terms).');
            break; 
        }
      } catch (e) {
        console.warn('Invalid regex in password policy:', pattern);
      }
    }
  }

  // 4. Contextual Checks (User Data)
  if (policy.preventUserData && userContext) {
    const dataPoints = [
      userContext.email?.split('@')[0], // username part of email
      userContext.username,
      userContext.name,
    ].filter(Boolean) as string[];

    for (const data of dataPoints) {
       if (data.length < 3) continue; // Skip very short matches like "Al"
       if (password.toLowerCase().includes(data.toLowerCase())) {
         errors.push('Password cannot contain your name, email, or username.');
         break;
       }
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Generates example passwords based on the policy (for Admin suggestions).
 */
export function generateExamplePasswords(policy: PasswordPolicy = DEFAULT_PASSWORD_POLICY): string[] {
    const examples: string[] = [];
    
    const uppers = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowers = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const specials = '!@#$%^&*';
    const pick = (chars: string) => chars[Math.floor(Math.random() * chars.length)];

// Helper to generate a single password with specific strength target
    // strength: 0 = minimum reqs, 1 = moderate, 2 = strong
    const generateTiered = (strength: number) => {
        let password = "";
        
        // 1. Must likely meet all strict requirements first
        if (policy.requireUppercase) password += pick(uppers);
        if (policy.requireLowercase) password += pick(lowers);
        if (policy.requireNumbers) password += pick(numbers);
        if (policy.requireSpecial) password += pick(specials);

        // 2. Determine target length
        const minL = policy.minLength;
        const maxL = policy.maxLength || 20;
        let targetLen = minL;
        
        if (strength === 1) targetLen = Math.min(maxL, minL + 2);
        if (strength === 2) targetLen = Math.min(maxL, minL + 6);

        // 3. Determine allowed pools based on strength
        const pools = [];
        if (policy.requireUppercase || strength > 0) pools.push(uppers); // Add uppers for med/high even if not req
        if (policy.requireLowercase || strength >= 0) pools.push(lowers);
        if (policy.requireNumbers || strength > 0) pools.push(numbers);
        if (policy.requireSpecial || strength > 1) pools.push(specials); // Add specials for high
        
        if (pools.length === 0) pools.push(lowers + uppers + numbers);

        // Fill
        while (password.length < targetLen) {
            const randomPool = pools[Math.floor(Math.random() * pools.length)]!;
            password += pick(randomPool);
        }

        // Shuffle
        return password.split('').sort(() => 0.5 - Math.random()).join('');
    };

    return [
        generateTiered(0), // Weak/Minimum
        generateTiered(1), // Good
        generateTiered(2)  // Strong
    ];
}
