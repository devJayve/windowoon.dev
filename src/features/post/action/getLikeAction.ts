'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/features/auth/config';
import { db } from '@/db/drizzle';
import { AnonymousPostReactionTable, PostReactionTable } from '@/db/schema';
import { and, eq } from 'drizzle-orm';
import { LikeState } from '@/features/post/components/PostLikeButton';
import { cookies } from 'next/headers';

export async function getLikeAction(postId: number): Promise<LikeState> {
  const session = await getServerSession(authOptions);

  const userId = session?.user?.id;

  const count = await db.transaction(async tx => {
    // 로그인 사용자 좋아요 수 쿼리
    const userLikes = await tx
      .select()
      .from(PostReactionTable)
      .where(eq(PostReactionTable.postId, postId));

    // 익명 사용자 좋아요 수 쿼리
    const anonymousLikes = await tx
      .select()
      .from(AnonymousPostReactionTable)
      .where(eq(AnonymousPostReactionTable.postId, postId));

    return userLikes.length + anonymousLikes.length;
  });

  if (!userId) {
    const cookieStore = cookies();
    let anonymousId = cookieStore.get('anonymous_id')?.value;

    if (!anonymousId) {
      anonymousId = `anon_${crypto.randomUUID()}`;
      cookieStore.set('anonymous_id', anonymousId, {
        maxAge: 60 * 60 * 24 * 365,
        path: '/',
        sameSite: 'lax',
        httpOnly: true,
      });
    }
    const [isLiked] = await db
      .select()
      .from(AnonymousPostReactionTable)
      .where(
        and(
          eq(AnonymousPostReactionTable.postId, postId),
          eq(AnonymousPostReactionTable.userId, anonymousId),
        ),
      )
      .limit(1);

    return {
      count,
      isLiked: !!isLiked,
    };
  } else {
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
}
