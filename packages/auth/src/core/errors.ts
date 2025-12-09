import { AuthError } from '../types';

export class AuthErrorImpl extends Error implements AuthError {
  public code: string;
  public details?: any;

  constructor(code: string, message: string, details?: any) {
    super(message);
    this.name = 'AuthError';
    this.code = code;
    this.details = details;
  }
}

export const AuthErrors = {
  NETWORK_REQUEST_FAILED: {
    code: 'auth/network-request-failed',
    message: 'A network error connection occurred.',
  },
  INVALID_API_KEY: {
    code: 'auth/invalid-api-key',
    message: 'The provided API key is invalid.',
  },
  USER_NOT_FOUND: {
    code: 'auth/user-not-found',
    message: 'No user record found for this identifier.',
  },
  WRONG_PASSWORD: {
    code: 'auth/wrong-password',
    message: 'Invalid password or identifier.',
  },
  EMAIL_ALREADY_IN_USE: {
    code: 'auth/email-already-in-use',
    message: 'The email address is already in use by another account.',
  },
  WEAK_PASSWORD: {
    code: 'auth/weak-password',
    message: 'The password is too weak.',
  },
  UNAUTHORIZED_DOMAIN: {
    code: 'auth/unauthorized-domain',
    message: 'This domain is not authorized for OAuth operations.',
  },
  POPUP_CLOSED_BY_USER: {
    code: 'auth/popup-closed-by-user',
    message: 'The popup was closed by the user before finalizing the operation.',
  },
  INTERNAL_ERROR: {
    code: 'auth/internal-error',
    message: 'An internal error has occurred.',
  },
};

export function createAuthError(code: string, message?: string, details?: any): AuthErrorImpl {
  const errorDef = Object.values(AuthErrors).find((e) => e.code === code);
  return new AuthErrorImpl(code, message || errorDef?.message || 'Unknown error', details);
}
