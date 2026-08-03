// Re-export everything from the Prisma client & types
export { PrismaClient } from '@prisma/client';
export type * from '@prisma/client';

// DB Client (Supabase REST based ORM layer)
export { db, supabase } from './db';
