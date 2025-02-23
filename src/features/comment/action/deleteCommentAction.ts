'use server';
import { ServerActionState } from '@/features/comment/types';
import { CommentTable } from '@/db/schema';
import { and, eq } from 'drizzle-orm';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/features/auth/config';
import { db } from '@/db/drizzle';
import { revalidateTag } from 'next/cache';

export async function deleteCommentAction(commentId: number): Promise<ServerActionState<null>> {
  try {
    const session = await getServerSession(authOptions);

    const userId = session?.user?.id;

    if (!userId) {
      return {
        message: '로그인이 필요해요',
        success: false,
      };
    }

    const [existingComment] = await db
      .select()
      .from(CommentTable)
      .where(and(eq(CommentTable.id, commentId), eq(CommentTable.userId, userId)))
      .limit(1);

    if (!existingComment) {
      return {
        message: '삭제 권한이 없어요',
        success: false,
      };
    }

    await db
      .update(CommentTable)
      .set({ status: 'deleted', updatedAt: new Date() })
      .where(and(eq(CommentTable.id, commentId), eq(CommentTable.userId, userId)));

    revalidateTag(`comment-${existingComment.postId}`);

    return {
      message: '댓글이 삭제되었어요',
      success: true,
    };
  } catch (error) {
    console.error(error);
    return {
      message: '문제가 발생했어요.\n나중에 다시 시도해주세요.',
      success: false,
    };
  }
}
