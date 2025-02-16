import { PostTable } from '@/db/schema';
import { db } from '@/db/drizzle';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function deletePost(postId: number): Promise<void> {
  await db.delete(PostTable).where(eq(PostTable.id, postId));

  revalidatePath('/post', 'page');
}
