'use server';
import { ServerActionState } from '@/features/comment/types';
import { CommentTable, UserTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/features/auth/config';
import { db } from '@/db/drizzle';
import { revalidateTag } from 'next/cache';
import bcrypt from 'bcrypt';

export async function deleteCommentAction(
  commentId: number,
  password?: string,
): Promise<ServerActionState<null>> {
  try {
    const session = await getServerSession(authOptions);

    const [comment] = await db
      .select()
      .from(CommentTable)
      .where(eq(CommentTable.id, commentId))
      .limit(1);

    const [writer] = await db
      .select()
      .from(UserTable)
      .where(eq(UserTable.id, comment.userId))
      .limit(1);

    if (writer.role === 'guest') {
      const hashedPassword = writer.password;

      const isMatch = await bcrypt.compare(password!, hashedPassword!);

      if (!isMatch) {
        return {
          message: '비밀번호가 일치하지 않아요',
          success: false,
        };
      }
    } else {
      if (!session || (session.user.role !== 'admin' && session.user.id !== comment.userId)) {
        return {
          message: '삭제 권한이 없어요',
          success: false,
        };
      }
    }

    await db
      .update(CommentTable)
      .set({ status: 'deleted', updatedAt: new Date() })
      .where(eq(CommentTable.id, commentId));

    revalidateTag(`comment-${comment.postId}`);

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
