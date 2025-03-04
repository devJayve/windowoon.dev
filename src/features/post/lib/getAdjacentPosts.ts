import { Post } from '@/features/post/types';
import { PostTable } from '@/db/schema';
import { db } from '@/db/drizzle';
import { and, asc, desc, eq, gt, lt } from 'drizzle-orm';
import { unstable_cache } from 'next/cache';

export type AdjacentPost = Pick<Post, 'id' | 'title' | 'slug'> | null;

export async function getAdjacentPosts(currentPost: Post) {
  return unstable_cache(
    async () => {
      const previousPost: AdjacentPost = await db
        .select({
          id: PostTable.id,
          title: PostTable.title,
          slug: PostTable.slug,
        })
        .from(PostTable)
        .where(and(lt(PostTable.id, currentPost.id), eq(PostTable.viewMode, 'public')))
        .orderBy(desc(PostTable.createdAt))
        .limit(1)
        .then(res => res[0] || null);

      const nextPost: AdjacentPost = await db
        .select({
          id: PostTable.id,
          title: PostTable.title,
          slug: PostTable.slug,
        })
        .from(PostTable)
        .where(and(gt(PostTable.id, currentPost.id), eq(PostTable.viewMode, 'public')))
        .orderBy(asc(PostTable.createdAt))
        .limit(1)
        .then(res => res[0] || null);

      return {
        previousPost,
        nextPost,
      };
    },
    [`adjacent-post-${currentPost.id}`],
    {
      revalidate: process.env.NODE_ENV === 'development' ? 1 : false,
      tags: [`post-${currentPost.id}`],
    },
  )();
}
