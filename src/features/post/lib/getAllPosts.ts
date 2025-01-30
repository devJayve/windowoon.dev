import { PostMeta } from '@/features/post/types';
import { ApiResponse } from '@/shared/types/response';
import { BASE_URL } from '@/shared/config/api';

export async function getAllPosts(): Promise<PostMeta[]> {
  const response = await fetch(`${BASE_URL}/api/post`, {
    next: { revalidate: 0 },
  });

  const result = (await response.json()) as ApiResponse<PostMeta[]>;

  if (!response.ok || result.error) {
    throw new Error(result.error || 'Failed to fetch posts');
  }

  return result.data!;
}
