'use server';
import { CreatePostRequest } from '@/features/post/types';
import { updatePost } from '@/features/post/lib/updatePost';
import { createPost } from '@/features/post/lib/createPost';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function submitPostAction(
  mode: 'create' | 'edit',
  post: CreatePostRequest,
  postId?: number,
) {
  try {
    if (mode === 'create') {
      await createPost(post);

      revalidatePath('/post', 'page');
    } else {
      await updatePost(postId!, post);

      revalidateTag(`post-${postId}`);
      revalidatePath('/post', 'page');
    }
    return {
      success: true,
      message: '게시물이 성공적으로 저장되었습니다.',
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: '에러가 발생했습니다.',
      error: error?.toString(),
    };
  }
}
