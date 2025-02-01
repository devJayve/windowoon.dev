import { drizzle } from 'drizzle-orm/neon-serverless';
import { Pool } from '@neondatabase/serverless';
import { withReplicas } from 'drizzle-orm/pg-core';

const primary = drizzle(
  new Pool({
    connectionString: process.env.DATABASE_URL!,
  }),
);

const read = drizzle(
  new Pool({
    connectionString: process.env.READ_DATABASE_URL!,
  }),
);

export const db = withReplicas(primary, [read]);
