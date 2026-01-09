import { z } from '@hono/zod-openapi';

export const ConfigQuerySchema = z.object({
  tenantId: z.string().openapi({ example: 'acme-corp' })
});

export const ConfigResponseSchema = z.object({
    enabledProviders: z.array(z.string()).openapi({ example: ['email_password', 'google'] }),
    passwordPolicy: z.any().openapi({ example: { minLength: 8 } }),
    selfRegistrationEnabled: z.boolean().openapi({ example: true }),
    mfaEnabled: z.boolean().optional().openapi({ example: false }),
    providerConfig: z.any().optional(),
    otpPolicy: z.any().optional(),
    pinPolicy: z.any().optional(),
    loginMethods: z.any().optional(),
    emailPolicy: z.any().optional(),
    settings: z.any().optional(),
    name: z.string().optional().openapi({ example: 'Acme Corp' }),
    termsUrl: z.string().optional(),
    privacyUrl: z.string().optional(),
    redirectUrl: z.string().optional().openapi({ example: 'https://app.acme.com/callback' })
});

export const UpdateConfigBodySchema = z.object({
    enabledProviders: z.array(z.string()).optional(),
    passwordPolicy: z.any().optional(),
    name: z.string().optional(),
    selfRegistrationEnabled: z.boolean().optional(),
    mfaEnabled: z.boolean().optional(),
    providerConfig: z.any().optional(),
    otpPolicy: z.any().optional(),
    pinPolicy: z.any().optional(),
    loginMethods: z.any().optional(),
    termsUrl: z.string().optional(),
    privacyUrl: z.string().optional(),
    redirectUrl: z.string().optional(),
    emailPolicy: z.any().optional(),
    settings: z.record(z.any()).optional()
});

export const UpdateConfigResponseSchema = z.object({
    success: z.boolean(),
    id: z.string()
});
