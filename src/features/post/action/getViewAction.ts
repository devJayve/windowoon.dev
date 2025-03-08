'use server';

import { db } from '@/db/drizzle';
import { PostTable } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function getViewAction(postId: number) {
  const [post] = await db
    .select({ views: PostTable.views })
    .from(PostTable)
    .where(eq(PostTable.id, postId))
    .limit(1);

  return post.views;
}
