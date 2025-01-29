import { CreatePostRequest, Post } from '@/features/post/types';
import { ApiResponse } from '@/shared/types/response';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function createPost(post: CreatePostRequest): Promise<Post> {
  const response = await fetch(`${BASE_URL}/api/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  });

  const result = (await response.json()) as ApiResponse<Post>;

  if (!response.ok || result.error) {
    throw new Error(result.error || 'Failed to create post');
  }

  return result.data!;
}
