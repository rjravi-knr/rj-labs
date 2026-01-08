export const BaseAuthErrorCodes = {
    // Core Auth
    INVALID_CREDENTIALS: 'AUTH_INVALID_CREDENTIALS',
    USER_NOT_FOUND: 'AUTH_USER_NOT_FOUND',
    TOKEN_MISSING: 'AUTH_TOKEN_MISSING',
    TOKEN_INVALID: 'AUTH_TOKEN_INVALID',
    UNAUTHORIZED: 'AUTH_UNAUTHORIZED',
    FORBIDDEN: 'AUTH_FORBIDDEN',
    
    // Core User
    USER_ALREADY_EXISTS: 'USER_ALREADY_EXISTS',
    REGISTRATION_DISABLED: 'USER_REGISTRATION_DISABLED',
    
    // Core Validation
    VALIDATION_ERROR: 'VALIDATION_ERROR',
    PASSWORD_TOO_WEAK: 'PASSWORD_TOO_WEAK',
} as const;

export const BaseAuthErrorMessages = {
    [BaseAuthErrorCodes.INVALID_CREDENTIALS]: 'Invalid email or password.',
    [BaseAuthErrorCodes.USER_NOT_FOUND]: 'User not found.',
    [BaseAuthErrorCodes.TOKEN_MISSING]: 'Authentication token is required.',
    [BaseAuthErrorCodes.TOKEN_INVALID]: 'Invalid authentication token.',
    [BaseAuthErrorCodes.UNAUTHORIZED]: 'You are not authorized to perform this action.',
    [BaseAuthErrorCodes.FORBIDDEN]: 'Access denied.',
    
    [BaseAuthErrorCodes.USER_ALREADY_EXISTS]: 'An account with this email already exists.',
    [BaseAuthErrorCodes.REGISTRATION_DISABLED]: 'New user registration is disabled.',
    
    [BaseAuthErrorCodes.VALIDATION_ERROR]: 'Validation failed.',
    [BaseAuthErrorCodes.PASSWORD_TOO_WEAK]: 'Password does not meet complexity requirements.',
} as const;
