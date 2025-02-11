import { drizzle } from 'drizzle-orm/neon-serverless';
import { Pool } from '@neondatabase/serverless';
import { withReplicas } from 'drizzle-orm/pg-core';

// 쓰기용 데이터베이스
const primary = drizzle(
  new Pool({
    connectionString: process.env.DATABASE_URL!,
  }),
);

// 읽기용 데이터베이스 복제본
const read = drizzle(
  new Pool({
    connectionString: process.env.READ_DATABASE_URL!,
  }),
);

export const db = withReplicas(primary, [read]);
