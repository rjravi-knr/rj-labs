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

    // Helper to generate a single valid password
    const generateOne = () => {
        let password = "";
        // Ensure required types are present
        if (policy.requireUppercase) password += pick(uppers);
        if (policy.requireLowercase) password += pick(lowers);
        if (policy.requireNumbers) password += pick(numbers);
        if (policy.requireSpecial) password += pick(specials);

        // Fill remaining length
        while (password.length < policy.minLength) {
            const pools = [];
            if (policy.requireUppercase) pools.push(uppers);
            if (policy.requireLowercase) pools.push(lowers);
            if (policy.requireNumbers) pools.push(numbers);
            if (policy.requireSpecial) pools.push(specials);
            // Fallback if no specific requirements but length needed (e.g. only numeric? or none)
            if (pools.length === 0) pools.push(lowers + uppers + numbers);

            const randomPool = pools[Math.floor(Math.random() * pools.length)];
            password += pick(randomPool);
        }

        // Shuffle to avoid predictable patterns (like always starting with Upper)
        password = password.split('').sort(() => 0.5 - Math.random()).join('');

        // Truncate if over max length (unlikely with this logic unless minLength > maxLength which is invalid config)
        if (policy.maxLength && password.length > policy.maxLength) {
            password = password.substring(0, policy.maxLength);
        }
        return password;
    }

    // Generate 3 unique examples
    while (examples.length < 3) {
        const p = generateOne();
        if (!examples.includes(p)) examples.push(p);
    }

    return examples;
}
