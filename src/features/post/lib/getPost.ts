import { Post } from '@/features/post/types';
import { db } from '@/db/drizzle';
import { PostTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { unstable_cache } from 'next/cache';

export async function getPost(id: number): Promise<Post> {
  return unstable_cache(
    async () => {
      const [post] = await db
        .select()
        .from(PostTable)
        .where(eq(PostTable.id, parseInt(String(id))))
        .limit(1);

      return post;
    },
    [`post-${id}`],
    {
      tags: [`post-${id}`],
    },
  )();
}
