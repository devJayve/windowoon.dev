import { db } from '@/db/drizzle';
import { BookTable } from '@/db/schema';

export async function getAllBooks() {
  const books = await db
    .select({
      id: BookTable.id,
      title: BookTable.title,
      thumbnail: BookTable.thumbnail,
      description: BookTable.description,
      shortContent: BookTable.shortContent,
    })
    .from(BookTable)
    .orderBy(BookTable.createdAt);

  return { books };
}
