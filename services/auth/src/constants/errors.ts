import { BaseAuthErrorCodes, BaseAuthErrorMessages } from '@labs/auth';

export const AuthErrorCodes = {
    ...BaseAuthErrorCodes,
    
    // Service Specific
    CREATION_FAILED: 'USER_CREATION_FAILED',
    INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
    CONFIG_NOT_FOUND: 'CONFIG_NOT_FOUND',
    CONFIG_UPDATE_FAILED: 'CONFIG_UPDATE_FAILED',
    UNAUTHORIZED: 'UNAUTHORIZED',
    FORBIDDEN: 'FORBIDDEN',
} as const;

export const AuthErrorMessages = {
    ...BaseAuthErrorMessages,
    
    [AuthErrorCodes.CREATION_FAILED]: 'Failed to create user account.',
    [AuthErrorCodes.INTERNAL_SERVER_ERROR]: 'An unexpected error occurred.',
    [AuthErrorCodes.CONFIG_NOT_FOUND]: 'Configuration not found.',
    [AuthErrorCodes.CONFIG_UPDATE_FAILED]: 'Failed to update configuration.',
    [AuthErrorCodes.UNAUTHORIZED]: 'Unauthorized access.',
    [AuthErrorCodes.FORBIDDEN]: 'Access forbidden.',
} as const;
