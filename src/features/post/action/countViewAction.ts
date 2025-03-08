'use server';

import { headers } from 'next/headers';
import { hashIP } from '@/shared/lib/hash';
import { db } from '@/db/drizzle';
import { PostTable, PostViewTable } from '@/db/schema';
import { and, eq, gte, sql } from 'drizzle-orm';
import { NEXT_IP_KEY } from '@/shared/constants';
export async function countViewAction(postId: number): Promise<void> {
  try {
    const headersList = headers();
    const ip = headersList.get(NEXT_IP_KEY);

    if (!ip || process.env.NODE_ENV === 'development') return;

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
