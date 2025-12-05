import { scrypt, randomBytes, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

const scryptAsync = promisify(scrypt);

/**
 * Generates a random session token (32 bytes hex)
 */
export function generateSessionToken(): string {
  return randomBytes(32).toString("hex");
}

/**
 * Hashes a password using scrypt
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");
  const derivedKey = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${salt}:${derivedKey.toString("hex")}`;
}

/**
 * Verifies a password against a hash
 */
export async function verifyPassword(storedHash: string, password: string): Promise<boolean> {
  const [salt, key] = storedHash.split(":");
  if (!salt || !key) return false;

  const keyBuffer = Buffer.from(key, "hex");
  const derivedKey = (await scryptAsync(password, salt, 64)) as Buffer;
  
  return timingSafeEqual(keyBuffer, derivedKey);
}
