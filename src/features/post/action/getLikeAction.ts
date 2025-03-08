'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/features/auth/config';
import { db } from '@/db/drizzle';
import { PostReactionTable } from '@/db/schema';
import { and, eq } from 'drizzle-orm';
import { LikeState } from '@/features/post/components/PostLikeButton';

export async function getLikeAction(postId: number): Promise<LikeState> {
  const session = await getServerSession(authOptions);

  const userId = session?.user?.id;

  const count = await db
    .select()
    .from(PostReactionTable)
    .where(eq(PostReactionTable.postId, postId))
    .then(result => result.length);

  if (!userId) {
    return {
      count,
      isLiked: false,
    };
  }

  const [isLiked] = await db
    .select()
    .from(PostReactionTable)
    .where(and(eq(PostReactionTable.postId, postId), eq(PostReactionTable.userId, userId)))
    .limit(1);

  return {
    count,
    isLiked: !!isLiked,
  };
}
