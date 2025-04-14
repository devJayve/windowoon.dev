import { db } from '@/db/drizzle';
import { AnonymousPostReactionTable } from '@/db/schema';
import { and, eq } from 'drizzle-orm';

export async function toggleAnonymousLike(postId: number, anonymousId: string) {
  const [existingLike] = await db
    .select()
    .from(AnonymousPostReactionTable)
    .where(
      and(
        eq(AnonymousPostReactionTable.postId, postId),
        eq(AnonymousPostReactionTable.userId, anonymousId),
      ),
    )
    .execute();

  if (existingLike) {
    await db
      .delete(AnonymousPostReactionTable)
      .where(
        and(
          eq(AnonymousPostReactionTable.postId, postId),
          eq(AnonymousPostReactionTable.userId, anonymousId),
        ),
      );
  } else {
    await db.insert(AnonymousPostReactionTable).values({
      postId,
      userId: anonymousId,
    });
  }
}
