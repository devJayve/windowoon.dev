'use server';
import { revalidateTag } from 'next/cache';

import { db } from '@/db/drizzle';
import { CommentTable, UserTable } from '@/db/schema';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/features/auth/config';
import { ServerActionState } from '@/features/comment/types';
import bcrypt from 'bcrypt';
import { sendCommentNotification } from '@/features/comment/lib/sendCommentNotification';

export async function submitCommentAction(
  postId: number,
  parentId: number | undefined,
  prevState: ServerActionState<null> | null,
  formData: FormData,
): Promise<ServerActionState<null>> {
  try {
    const session = await getServerSession(authOptions);
    const content = formData.get('content')?.toString();
    let userId = session?.user?.id;

    if (!content) {
      return {
        message: '댓글 내용을 입력해주세요',
        success: false,
      };
    }

    if (!postId) {
      return {
        message: '문제가 발생했어요.\n나중에 다시 시도해주세요.',
        success: false,
      };
    }

    // 게스트 유저일 경우
    if (!userId) {
      const username = formData.get('username')!.toString();
      const password = formData.get('password')!.toString();

      const hashedPassword = await bcrypt.hash(password!, 10);

      const [guestUser] = await db
        .insert(UserTable)
        .values({
          name: username,
          role: 'guest',
          password: hashedPassword,
        })
        .returning();

      await db.insert(CommentTable).values({
        postId: Number(postId),
        userId: guestUser.id,
        parentId: Number(parentId) || null,
        content: content,
      });

      userId = guestUser.id;
    }

    await db.insert(CommentTable).values({
      postId: Number(postId),
      userId: userId,
      parentId: Number(parentId) || null,
      content: content,
    });

    setTimeout(async () => {
      await sendCommentNotification(postId, userId, content);
    }, 0);

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
