import { PostMeta } from '@/features/post/types';
import { db } from '@/db/drizzle';
import { PostTable } from '@/db/schema';
import { desc } from 'drizzle-orm';

export async function getAllPosts(): Promise<PostMeta[]> {
  return db
    .select({
      id: PostTable.id,
      title: PostTable.title,
      description: PostTable.description,
      slug: PostTable.slug,
      views: PostTable.views,
      createdAt: PostTable.createdAt,
      updatedAt: PostTable.updatedAt,
      categories: PostTable.categories,
    })
    .from(PostTable)
    .orderBy(desc(PostTable.createdAt));
}
