'use server';
import { db } from '@/db/drizzle';
import { PostReactionTable } from '@/db/schema';
import { and, eq } from 'drizzle-orm';
import { revalidateTag } from 'next/cache';

export async function toggleLikeAction(postId: number, userId: string) {
  const [existingLike] = await db
    .select()
    .from(PostReactionTable)
    .where(and(eq(PostReactionTable.postId, postId), eq(PostReactionTable.userId, userId)))
    .execute();

  // 이미 좋아요를 누른 경우 좋아요 해제
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

  revalidateTag(`post-likes-${postId}`);
}
