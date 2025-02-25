import { BookCategoryTable, BookReactionTable, BookTable, CategoryTable } from '@/db/schema';
import { db } from '@/db/drizzle';
import { eq } from 'drizzle-orm';

export async function getBookDetail(bookId: number) {
  const [book] = await db.select().from(BookTable).where(eq(BookTable.id, bookId)).limit(1);

  if (!book) {
    return null;
  }

  const categories = await db
    .select({ name: CategoryTable.name })
    .from(BookCategoryTable)
    .innerJoin(CategoryTable, eq(BookCategoryTable.categoryId, CategoryTable.id))
    .where(eq(BookTable.id, bookId));

  const reactionCount = await db
    .select({ count: BookReactionTable })
    .from(BookReactionTable)
    .where(eq(BookReactionTable.bookId, bookId))
    .then(result => result.length);

  return {
    ...book,
    categories,
    reactionCount,
  };
}
