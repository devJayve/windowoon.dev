import { cookies } from 'next/headers';
import { getViewCookieKey } from '@/middleware';
import { db } from '@/db/drizzle';
import { PostTable } from '@/db/schema';
import { eq, sql } from 'drizzle-orm';

export async function incrementPostView(postId: number): Promise<void> {
  try {
    const cookieStore = cookies();
    const viewCookieKey = getViewCookieKey(String(postId));
    if (cookieStore.has(viewCookieKey)) {
      return;
    }

    await db
      .update(PostTable)
      .set({
        views: sql`${PostTable.views} + 1`,
      })
      .where(eq(PostTable.id, postId))
      .returning({ views: PostTable.views });
  } catch (error) {
    console.error(error);
  }
}
