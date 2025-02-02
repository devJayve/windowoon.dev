import { Category } from '@/features/write/types';
import { db } from '@/db/drizzle';
import { CategoryTable } from '@/db/schema';
import { desc } from 'drizzle-orm';

export async function getCategories(): Promise<Category[]> {
  return db.select().from(CategoryTable).orderBy(desc(CategoryTable.createdAt));
}
