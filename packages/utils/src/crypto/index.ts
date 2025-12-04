/**
 * Generate unique ID (nanoid-style)
 * @param length - Length of ID (default: 21)
 * @returns Unique ID
 */
export function generateId(length = 21): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let id = '';
  for (let i = 0; i < length; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
}

/**
 * Generate UUID v4
 * @returns UUID string
 */
export function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Simple hash function (NOT cryptographically secure, for non-crypto use only)
 * @param text - Text to hash
 * @returns Hash string
 */
export function hashString(text: string): string {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    const char = text.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(36);
}

/**
 * Generate random string
 * @param length - Length of string
 * @param charset - Character set (default: alphanumeric)
 * @returns Random string
 */
export function randomString(
  length: number,
  charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
): string {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return result;
}

/**
 * Generate secure token
 * @param length - Length of token (default: 32)
 * @returns Secure token
 */
export function generateToken(length = 32): string {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
  return randomString(length, charset);
}

/**
 * Encode string to Base64
 * @param text - Text to encode
 * @returns Base64 encoded string
 */
export function encodeBase64(text: string): string {
  // Node.js environment
  if (typeof globalThis !== 'undefined' && (globalThis as any).Buffer) {
    return (globalThis as any).Buffer.from(text).toString('base64');
  }
  // Browser environment
  return btoa(text);
}

/**
 * Decode Base64 string
 * @param encoded - Base64 encoded string
 * @returns Decoded string
 */
export function decodeBase64(encoded: string): string {
  // Node.js environment
  if (typeof globalThis !== 'undefined' && (globalThis as any).Buffer) {
    return (globalThis as any).Buffer.from(encoded, 'base64').toString();
  }
  // Browser environment
  return atob(encoded);
}
