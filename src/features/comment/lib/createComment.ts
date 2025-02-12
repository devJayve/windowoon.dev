import { db } from '@/db/drizzle';
import { CommentTable } from '@/db/schema';

interface CreateCommentParams {
  postId: number;
  userId: string;
  content: string;
  parentId?: number;
}

export async function createComment({ postId, userId, content, parentId }: CreateCommentParams) {
  const [newComment] = await db
    .insert(CommentTable)
    .values({
      postId,
      userId,
      content,
      parentId: parentId || null,
    })
    .returning();

  return newComment;
}
