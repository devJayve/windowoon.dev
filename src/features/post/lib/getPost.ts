import { Post } from '@/features/post/types';
import { ApiResponse } from '@/shared/types/response';
import { BASE_URL } from '@/shared/config/api';

export async function getPost(id: number): Promise<Post> {
  const response = await fetch(`${BASE_URL}/api/post/${id}`, {
    next: { revalidate: 0 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch post ${id}`);
  }

  const result = (await response.json()) as ApiResponse<Post>;

  if (result.error) {
    throw new Error(result.error || `Failed to fetch post ${id}`);
  }

  return result.data!;
}
