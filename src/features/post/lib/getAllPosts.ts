import { PostMeta } from '@/features/post/types';
import { db } from '@/db/drizzle';
import { PostTable } from '@/db/schema';
import { desc, eq, or } from 'drizzle-orm';

export async function getAllPosts(): Promise<PostMeta[]> {
  const isDevelopment = process.env.NODE_ENV === 'development';

  const viewModeCondition = isDevelopment
    ? or(eq(PostTable.viewMode, 'public'), eq(PostTable.viewMode, 'development'))
    : eq(PostTable.viewMode, 'public');

  return db
    .select({
      id: PostTable.id,
      title: PostTable.title,
      description: PostTable.description,
      slug: PostTable.slug,
      views: PostTable.views,
      viewMode: PostTable.viewMode,
      createdAt: PostTable.createdAt,
      updatedAt: PostTable.updatedAt,
      categories: PostTable.categories,
    })
    .from(PostTable)
    .where(viewModeCondition)
    .orderBy(desc(PostTable.createdAt));
}
