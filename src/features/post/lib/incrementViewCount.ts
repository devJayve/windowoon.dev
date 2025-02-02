import { headers } from 'next/headers';
import { hashIP } from '@/shared/lib/hash';
import { db } from '@/db/drizzle';
import { PostTable, PostViewTable } from '@/db/schema';
import { and, eq, gte, sql } from 'drizzle-orm';
export async function incrementViewCount(postId: number): Promise<void> {
  try {
    const headersList = headers();
    const ip = headersList.get('x-next-ip');

    if (!ip) return;

    const hash = hashIP(ip);
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    const [existingView] = await db
      .select()
      .from(PostViewTable)
      .where(
        and(
          eq(PostViewTable.postId, postId),
          eq(PostViewTable.hash, hash),
          gte(PostViewTable.viewedAt, oneDayAgo),
        ),
      )
      .limit(1)
      .execute();

    if (!existingView) {
      await db.transaction(async tx => {
        await tx
          .update(PostTable)
          .set({
            views: sql`${PostTable.views} + 1`,
          })
          .where(eq(PostTable.id, postId));

        await tx.insert(PostViewTable).values({
          postId,
          hash,
        });
      });
    }
  } catch (error) {
    console.error(error);
  }
}
