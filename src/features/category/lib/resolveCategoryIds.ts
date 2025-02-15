import { CategoryTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { db } from '@/db/drizzle';

export async function resolveCategoryIds(categoryNames: string[], tx: typeof db) {
  return Promise.all(
    categoryNames.map(async (categoryName: string) => {
      const [existingCategory] = await tx
        .select()
        .from(CategoryTable)
        .where(eq(CategoryTable.name, categoryName));

      if (existingCategory) {
        return existingCategory.id;
      }

      const [newCategory] = await tx
        .insert(CategoryTable)
        .values({ name: categoryName })
        .returning();

      return newCategory.id;
    }),
  );
}
