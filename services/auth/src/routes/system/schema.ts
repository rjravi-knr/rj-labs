import { z } from '@hono/zod-openapi';

export const DebugResponseSchema = z.object({
    status: z.string(),
    uptime: z.number(),
    env: z.any(),
    dbStatus: z.string()
});
