import { z } from "zod";

export const UserSchema = z.object({
  id: z.string(),
  tenantId: z.string(),
  email: z.string().email(),
  passwordHash: z.string().nullable().optional(),
  emailVerified: z.boolean().default(false),
  name: z.string().nullable().optional(),
  image: z.string().nullable().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type User = z.infer<typeof UserSchema>;

export const SessionSchema = z.object({
  id: z.string(),
  userId: z.string(),
  expiresAt: z.date(),
  token: z.string(),
  ipAddress: z.string().nullable().optional(),
  userAgent: z.string().nullable().optional(),
});

export type Session = z.infer<typeof SessionSchema>;

export const AccountSchema = z.object({
  id: z.string(),
  userId: z.string(),
  providerId: z.string(),
  accountId: z.string(),
  accessToken: z.string().nullable().optional(),
  refreshToken: z.string().nullable().optional(),
  expiresAt: z.date().nullable().optional(),
  passwordHash: z.string().nullable().optional(),
});

export type Account = z.infer<typeof AccountSchema>;

export interface AuthConfig {
  adapter: Adapter;
  providers: ProviderConfig[];
  callbacks?: {
    session?: (session: Session, user: User) => Promise<Session | null>;
    signIn?: (user: User, account: Account | null) => Promise<boolean>;
  };
}

export interface ProviderConfig {
  id: string;
  name: string;
  type: "email" | "oauth" | "oidc" | "credentials";
}

// Circular dependency solution or separate interface file needed for Adapter
import type { Adapter } from "./adapter";
