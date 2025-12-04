/**
 * Email validation regex (RFC 5322 simplified)
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * URL validation regex
 */
const URL_REGEX = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;

/**
 * UUID validation regex (v4)
 */
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

/**
 * Validate email address
 * @param email - Email to validate
 * @returns True if valid email
 */
export function isEmail(email: string): boolean {
  return EMAIL_REGEX.test(email);
}

/**
 * Validate URL
 * @param url - URL to validate
 * @returns True if valid URL
 */
export function isUrl(url: string): boolean {
  return URL_REGEX.test(url);
}

/**
 * Validate phone number (simple international format)
 * @param phone - Phone number to validate
 * @returns True if valid phone
 */
export function isPhone(phone: string): boolean {
  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, '');
  // Check if between 10-15 digits (international format)
  return digits.length >= 10 && digits.length <= 15;
}

/**
 * Validate UUID (v4)
 * @param uuid - UUID to validate
 * @returns True if valid UUID
 */
export function isUUID(uuid: string): boolean {
  return UUID_REGEX.test(uuid);
}

/**
 * Validate slug format
 * @param slug - Slug to validate
 * @returns True if valid slug
 */
export function isSlug(slug: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
}

/**
 * Validate credit card number using Luhn algorithm
 * @param number - Credit card number
 * @returns True if valid credit card
 */
export function isCreditCard(number: string): boolean {
  const digits = number.replace(/\D/g, '');
  
  if (digits.length < 13 || digits.length > 19) {
    return false;
  }
  
  // Luhn algorithm
  let sum = 0;
  let isEven = false;
  
  for (let i = digits.length - 1; i >= 0; i--) {
    const char = digits[i];
    if (!char) continue;
    let digit = parseInt(char, 10);
    
    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    
    sum += digit;
    isEven = !isEven;
  }
  
  return sum % 10 === 0;
}

/**
 * Validate IP address (v4)
 * @param ip - IP address to validate
 * @returns True if valid IP
 */
export function isIPAddress(ip: string): boolean {
  const parts = ip.split('.');
  if (parts.length !== 4) return false;
  
  return parts.every((part) => {
    const num = parseInt(part, 10);
    return num >= 0 && num <= 255 && part === num.toString();
  });
}

/**
 * Validate hex color
 * @param color - Hex color to validate
 * @returns True if valid hex color
 */
export function isHexColor(color: string): boolean {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
}

/**
 * Check if password is strong
 * @param password - Password to check
 * @returns True if strong password
 */
export function isStrongPassword(password: string): boolean {
  // Minimum 8 characters, at least one uppercase, one lowercase, one number, one special char
  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  return hasMinLength && hasUppercase && hasLowercase && hasNumber && hasSpecialChar;
}

/**
 * Password strength levels
 */
export type PasswordStrength = 'weak' | 'fair' | 'good' | 'strong';

/**
 * Validate password strength with detailed analysis
 * @param password - Password to analyze
 * @returns Password strength level
 */
export function validatePasswordStrength(password: string): PasswordStrength {
  let score = 0;
  
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;
  
  if (score <= 2) return 'weak';
  if (score <= 3) return 'fair';
  if (score <= 4) return 'good';
  return 'strong';
}

/**
 * Check if string is alphanumeric
 * @param text - Text to check
 * @returns True if alphanumeric
 */
export function isAlphanumeric(text: string): boolean {
  return /^[a-zA-Z0-9]+$/.test(text);
}

/**
 * Check if string is numeric
 * @param text - Text to check
 * @returns True if numeric
 */
export function isNumeric(text: string): boolean {
  return /^\d+$/.test(text);
}

/**
 * Check if string is valid JSON
 * @param text - Text to check
 * @returns True if valid JSON
 */
export function isJSON(text: string): boolean {
  try {
    JSON.parse(text);
    return true;
  } catch {
    return false;
  }
}

/**
 * Check if string is valid Base64
 * @param text - Text to check
 * @returns True if valid Base64
 */
export function isBase64(text: string): boolean {
  try {
    return btoa(atob(text)) === text;
  } catch {
    return false;
  }
}
