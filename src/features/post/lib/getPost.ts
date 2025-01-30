import { Post } from '@/features/post/types';
import { db } from '@/db/drizzle';
import { PostTable } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function getPost(id: number): Promise<Post> {
  const [post] = await db
    .select()
    .from(PostTable)
    .where(eq(PostTable.id, parseInt(String(id))))
    .limit(1);
  return post;
}
