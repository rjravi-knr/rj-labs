import { z } from '@hono/zod-openapi';

export const UserQuerySchema = z.object({
  tenantId: z.string().openapi({ example: 'acme-corp' })
});

export const UserIdParamSchema = z.object({
    userId: z.string().openapi({ example: '123' })
});

export const UserListSchema = z.array(z.object({
    id: z.string(),
    email: z.string(),
    fullName: z.string().nullable(),
    isSuperAdmin: z.boolean(),
    isActive: z.boolean(),
    createdAt: z.string(),
    emailVerified: z.boolean(),
    provider: z.string().nullable()
}));

export const UserDetailSchema = z.object({
    user: z.object({
        id: z.string(),
        email: z.string(),
        fullName: z.string().nullable(),
        username: z.string().nullable().optional(),
        displayName: z.string().nullable().optional(),
        firstName: z.string().nullable().optional(),
        lastName: z.string().nullable().optional(),
        memberCode: z.string().nullable().optional(),
        isSuperAdmin: z.boolean(),
        isActive: z.boolean(),
        createdAt: z.string(),
        emailVerified: z.boolean(),
        phoneVerified: z.boolean(),
        userVerified: z.boolean(),
        provider: z.string().nullable(),
        emailVerifiedTimestamp: z.string().nullable().optional(),
        phoneVerifiedTimestamp: z.string().nullable().optional(),
        userVerifiedTimestamp: z.string().nullable().optional(),
    }),
    sessions: z.array(z.object({
        id: z.string(),
        ipAddress: z.string().nullable(),
        userAgent: z.string().nullable(),
        createdAt: z.string(),
        expiresAt: z.string()
    }))
});

export const CreateUserBodySchema = z.object({
    email: z.string().email(),
    fullName: z.string().optional(),
    isSuperAdmin: z.boolean().optional(),
    password: z.string().min(6).optional()
});

export const CreateUserResponseSchema = z.object({
     id: z.string(), 
     email: z.string() 
});
