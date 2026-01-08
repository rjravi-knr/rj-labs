import { z } from '@hono/zod-openapi';

export const LoginSchema = z.object({
  email: z.string().email().openapi({ example: 'admin@acme-corp.com' }),
  password: z.string().min(1).openapi({ example: 'password123' }),
  tenantId: z.string().min(1).default('acme-corp').openapi({ example: 'acme-corp' })
});

export const SignupSchema = z.object({
  email: z.string().email().openapi({ example: 'newuser@acme-corp.com' }),
  password: z.string().min(6).openapi({ example: 'secret123' }),
  tenantId: z.string().openapi({ example: 'acme-corp' }),
  name: z.string().optional().openapi({ example: 'New User' })
});

export const UserResponseSchema = z.object({
    id: z.string().openapi({ example: '1' }),
    email: z.string().openapi({ example: 'admin@acme-corp.com' }),
    tenantId: z.string().openapi({ example: 'acme-corp' }),
    isSuperAdmin: z.boolean().optional().openapi({ example: true })
});

export const LoginResponseSchema = z.object({
  token: z.string().openapi({ example: 'acme-corp.token123' }),
  user: UserResponseSchema
});

export const ErrorSchema = z.object({
    error: z.string(),
    code: z.string().optional()
});
