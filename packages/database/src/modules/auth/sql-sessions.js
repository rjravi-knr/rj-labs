import { pgTable, uuid, varchar, timestamp, text, bigint } from 'drizzle-orm/pg-core';
import { users } from './sql-users';
/**
 * Sessions table - stores user session data
 */
export const sessions = pgTable('sessions', {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: bigint('user_id', { mode: 'number' }).references(() => users.id, { onDelete: 'cascade' }).notNull(),
    token: varchar('token', { length: 255 }).unique().notNull(),
    ipAddress: varchar('ip_address', { length: 45 }),
    userAgent: text('user_agent'),
    expiresAt: timestamp('expires_at').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});
