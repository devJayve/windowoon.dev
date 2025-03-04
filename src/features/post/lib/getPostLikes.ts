import { db } from '@/db/drizzle';
import { PostReactionTable } from '@/db/schema';
import { and, eq } from 'drizzle-orm';
import { unstable_cache } from 'next/cache';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/features/auth/config';

export async function getPostLikes(postId: number) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  return unstable_cache(
    async () => {
      const count = await db
        .select()
        .from(PostReactionTable)
        .where(eq(PostReactionTable.postId, parseInt(String(postId))))
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
        .where(
          and(
            eq(PostReactionTable.postId, parseInt(String(postId))),
            eq(PostReactionTable.userId, userId),
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
