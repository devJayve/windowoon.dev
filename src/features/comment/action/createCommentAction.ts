'use server';
import { revalidateTag } from 'next/cache';

import { db } from '@/db/drizzle';
import { CommentTable } from '@/db/schema';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/features/auth/config';
import { ServerActionState } from '@/features/comment/types';

export async function createCommentAction(
  postId: number,
  parentId: number | undefined,
  prevState: ServerActionState<null> | null,
  formData: FormData,
): Promise<ServerActionState<null>> {
  try {
    const session = await getServerSession(authOptions);

    const content = formData.get('content')?.toString();
    const userId = session?.user?.id;

    if (!content) {
      return {
        message: '댓글 내용을 입력해주세요',
        success: false,
      };
    }

    if (!postId || !userId) {
      return {
        message: '문제가 발생했어요.\n나중에 다시 시도해주세요.',
        success: false,
      };
    }

    await db.insert(CommentTable).values({
      postId: Number(postId),
      userId: userId,
      parentId: Number(parentId) || null,
      content: content,
    });

    revalidateTag(`comment-${postId}`);

    return {
      message: '댓글이 등록되었어요',
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
