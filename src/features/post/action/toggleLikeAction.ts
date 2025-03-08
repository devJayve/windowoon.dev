'use server';
import { db } from '@/db/drizzle';
import { PostReactionTable } from '@/db/schema';
import { and, eq } from 'drizzle-orm';

export async function toggleLikeAction(postId: number, userId: string) {
  const [existingLike] = await db
    .select()
    .from(PostReactionTable)
    .where(and(eq(PostReactionTable.postId, postId), eq(PostReactionTable.userId, userId)))
    .execute();

  if (existingLike) {
    await db
      .delete(PostReactionTable)
      .where(and(eq(PostReactionTable.postId, postId), eq(PostReactionTable.userId, userId)));
  } else {
    await db.insert(PostReactionTable).values({
      postId,
      userId,
    });
  }
}
