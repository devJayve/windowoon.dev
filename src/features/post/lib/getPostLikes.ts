import { db } from '@/db/drizzle';
import { PostReactionTable } from '@/db/schema';
import { and, eq } from 'drizzle-orm';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/features/auth/config';
import { unstable_cache } from 'next/cache';

export async function getPostLikes(postId: number) {
  const session = await getServerSession(authOptions);

  return unstable_cache(
    async () => {
      const count = await db
        .select()
        .from(PostReactionTable)
        .where(eq(PostReactionTable.postId, parseInt(String(postId))))
        .then(result => result.length);

      if (!session || !session.user.id) {
        return {
          count,
          isLiked: false,
        };
      }

      const [isLiked] = await db
        .select()
        .from(PostReactionTable)
        .where(
          and(
            eq(PostReactionTable.postId, parseInt(String(postId))),
            eq(PostReactionTable.userId, session.user.id),
          ),
        )
        .limit(1);

      return {
        count,
        isLiked: !!isLiked,
      };
    },
    [`post-likes-${postId}`],
    {
      revalidate: process.env.NODE_ENV === 'development' ? 1 : false,
      tags: [`post-likes-${postId}`],
    },
  )();
}
